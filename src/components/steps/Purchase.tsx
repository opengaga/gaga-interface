import type { TransactionResponse } from '@ethersproject/providers'

import { useApi, useApiNode } from '@/hooks/useApi'
import { Button } from 'ant-design-vue'
import { defineComponent, inject, PropType, Ref, ref } from 'vue'
import { useWallet } from '@/hooks/useWallet'
import { assert } from '@/utils/assert'
import Order from '@/vvm/Order'
import { useVVM } from '@/hooks/useVVM'
import { BigNumber } from '@ethersproject/bignumber'
import { SequenceOrderType } from '@/vvm/types'

const PurchaseStep = defineComponent({
  name: 'purchase-step',
  props: {
    step: {
      type: Number,
      required: true
    },
    token: {
      type: String,
      required: true
    },
    tokenId: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    order: {
      type: Object as PropType<SequenceOrderType>,
      required: true
    },
    signature: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const finishStep = inject<Ref<number>>('steps-finished', ref(0))
    const nextStep = inject<() => void>('steps-next')
    const loading = ref(false)
    const error = ref<Error | null>(null)
    const transaction = ref<TransactionResponse>()

    const { account, getSigner } = useWallet()
    const apiNode = useApiNode()
    const api = useApi()
    const vvm = useVVM()

    const exchange = async () => {
      const signer = getSigner()

      assert(signer)
      assert(account?.value)

      const order = Order.parse(props.order)

      const buyerFee = await apiNode.getBuyerFee({
        token: props.token,
        token_id: props.tokenId
      })

      transaction.value = await vvm.exchange(
        order,
        props.signature,
        BigNumber.from(buyerFee.buyFee),
        buyerFee.buyFeeSignature,
        BigNumber.from(props.order.selling),
        account.value
      )
    }

    const buy = async () => {
      assert(transaction.value)

      await api.buy({ tx_id: transaction.value.hash })
    }

    const start = async () => {
      loading.value = true

      try {
        if (!transaction.value) {
          await exchange()
        }

        await buy()

        assert(transaction.value)
        await transaction.value.wait()

        error.value = null
        nextStep?.()
      } catch (err) {
        error.value = err
        console.error(err)
      } finally {
        loading.value = false
      }
    }

    return () => (
      <div>
        <div>
          <h3>Sign sell order</h3>
          <p>Sign sell order using your wallet</p>
        </div>
        <Button
          size="large"
          type="primary"
          shape="round"
          loading={loading.value}
          disabled={finishStep.value !== props.step}
          onClick={start}
        >
          {finishStep.value > props.step
            ? 'Done'
            : loading.value
            ? 'In Progress...'
            : error.value
            ? 'Retry'
            : 'Start'}
        </Button>
      </div>
    )
  }
})

export default PurchaseStep
