import { useApi } from '@/hooks/useApi'
import { BigNumber } from '@ethersproject/bignumber'
import { Button, Alert } from 'ant-design-vue'
import { defineComponent, inject, PropType, Ref, ref } from 'vue'
import { useWallet } from '@/hooks/useWallet'
import Order from '@/vvm/Order'
import { assert } from '@/utils/assert'
import { Asset } from '@/vvm/types'
import { randomHex } from '@/utils/crypto'

const OrderStep = defineComponent({
  name: 'order-step',
  props: {
    step: {
      type: Number,
      required: true
    },
    sellAsset: Object as PropType<Asset>,
    buyAsset: Object as PropType<Asset>,
    price: Object as PropType<BigNumber>,
    supply: {
      type: [String, Object] as PropType<string | BigNumber>,
      default: '1'
    },
    isBid: {
      type: Boolean,
      default: () => false
    }
  },
  setup(props) {
    const finishStep = inject<Ref<number>>('steps-finished', ref(0))
    const nextStep = inject<() => void>('steps-next')
    const loading = ref(false)
    const error = ref<Error | null>(null)

    const { account, getSigner } = useWallet()
    const api = useApi()

    const start = async () => {
      const signer = getSigner()

      loading.value = true

      try {
        assert(signer)
        assert(account?.value)
        assert(props.sellAsset)
        assert(props.buyAsset)
        assert(props.price)

        const order = new Order(
          account.value,
          props.sellAsset,
          props.buyAsset,
          BigNumber.from(props.supply),
          props.price.mul(props.supply),
          randomHex(32)
        )
        const signature = await order.sign(signer)

        if (props.isBid) {
          await api.createBid({ order: order.sequence(), signature })
        } else {
          await api.changeSale({
            token: props.sellAsset.token,
            token_id: props.sellAsset.tokenId.toString(),
            sale: 1
          })

          await api.createOrder({ order: order.sequence(), signature })
        }

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
          {error.value && <Alert message={error.value?.message || 'Error'} showIcon />}
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

export default OrderStep
