import type { TransactionResponse } from '@ethersproject/providers'

import { useApi } from '@/hooks/useApi'
import { useVVM } from '@/hooks/useVVM'
import { deployments } from '@/vvm/constants'
import { BigNumber } from '@ethersproject/bignumber'
import { Button, Alert } from 'ant-design-vue'
import { computed, defineComponent, inject, PropType, Ref, ref, unref } from 'vue'
import { useWallet } from '@/hooks/useWallet'
import { assert } from '@/utils/assert'
import { AssetType } from '@/vvm/types'

const MintStep = defineComponent({
  name: 'mint-step',
  props: {
    step: {
      type: Number,
      required: true
    },
    image: {
      type: Blob,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    desc: String,
    properties: {
      type: Array as PropType<[string, string][]>
    },
    multiple: Boolean,
    supply: {
      type: String,
      default: '1'
    },
    fee: Number
  },
  setup(props, context) {
    const finishStep = inject<Ref<number>>('steps-finished', ref(0))
    const nextStep = inject<() => void>('steps-next')
    const loading = ref(false)
    const error = ref<Error | null>(null)
    const uri = ref<string>()
    const transaction = ref<TransactionResponse>()
    const tokenId = ref<string>()

    const { account } = useWallet()
    const api = useApi()
    const vvm = useVVM()

    const attributes = computed(() => {
      const _attributes: Record<string, string> = {}
      for (const [key, value] of props.properties ?? []) {
        if (key) {
          _attributes[key] = value
        }
      }
      return _attributes
    })

    const uploadImg = async () => {
      const data = await api.upload(props.image)

      return data.ipfs
    }

    const uploadJson = async (image: string) => {
      const json: Record<string, any> = {}

      json.name = props.name
      json.description = props.desc
      json.image = image

      json.attributes = { ...unref(attributes) }

      const blob = new Blob([JSON.stringify(json)], { type: 'application/json;charset=utf-8' })

      const data = await api.upload(blob)

      return data.ipfs.replace('ipfs://ipfs', '')
    }

    const upload = async () => {
      assert(account?.value)

      const image = await uploadImg()
      uri.value = await uploadJson(image)
    }

    const send = async () => {
      assert(account?.value)
      assert(uri?.value)

      if (props.multiple) {
        const {
          data: { tokenid, signature }
        } = await api.newTokenId(deployments.VVMToken)
        tokenId.value = tokenid
        transaction.value = await vvm.mintErc1155(
          BigNumber.from(tokenid),
          signature,
          props.fee
            ? [
                {
                  recipient: account.value,
                  value: props.fee
                }
              ]
            : [],
          BigNumber.from(props.supply),
          uri.value
        )
      } else {
        const {
          data: { tokenid, signature }
        } = await api.newTokenId(deployments.MintableToken)
        tokenId.value = tokenid
        transaction.value = await vvm.mintErc721(
          BigNumber.from(tokenid),
          signature,
          props.fee
            ? [
                {
                  recipient: account.value,
                  value: props.fee
                }
              ]
            : [],
          uri.value
        )
      }
    }

    const addItem = async () => {
      assert(transaction.value)

      await api.addItem({
        tx_id: transaction.value.hash,
        asset_type: props.multiple ? AssetType.ERC1155 : AssetType.ERC721
      })
    }

    const start = async () => {
      loading.value = true

      try {
        if (!uri.value) {
          await upload()
        }
        if (!tokenId.value || !transaction.value) {
          await send()
        }
        await addItem()

        assert(transaction.value)

        const { status } = await transaction.value.wait()

        if (status !== 1) {
          throw new Error('Transaction error')
        }

        error.value = null

        nextStep?.()
        context.emit('done', tokenId.value)
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
          <h3>Upload files & Mint token</h3>
          <p>Call contract method</p>
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

export default MintStep
