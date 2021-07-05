<template>
  <make-bid :name="info.prop_name" @submit="submitOrder" @close="$emit('close')" />
  <mask-layer v-if="showSteps" @closeBid="showSteps = false" title="Follow steps" :showFoot="false">
    <steps @done="done">
      <approval-for-all-step :operator="operator" :address="address" />
      <order-step
        :supply="sellAmount"
        :sellAsset="sellAsset"
        :buyAsset="buyAsset"
        :price="buyAmount"
      />
    </steps>
  </mask-layer>
</template>
<script lang="ts">
  import { ItemType } from '@/api/types'

  import maskLayer from '@/components/modals/maskLayer.vue'
  import MakeBid from '@/components/modals/MakeOrder.vue'
  import { computed, defineComponent, PropType, ref } from 'vue'
  import { Asset, AssetType } from '@/vvm/types'
  import Steps from '@/components/steps'
  import ApprovalForAllStep from '@/components/steps/ApprovalForAllStep'
  import OrderStep from '@/components/steps/Order'
  import { deployments } from '@/vvm/constants'
  import { BigNumber } from '@ethersproject/bignumber'
  import { EMPTY_ADDRESS } from '@/utils/constants'
  import { parseEther } from '@ethersproject/units'

  export default defineComponent({
    name: 'bidInfo',
    components: {
      maskLayer,
      Steps,
      ApprovalForAllStep,
      OrderStep,
      MakeBid
    },
    props: {
      tokenAddress: {
        type: String,
        required: true
      },
      tokenId: {
        type: String,
        required: true
      },
      info: {
        type: Object as PropType<ItemType>,
        required: true
      }
    },
    setup(props, context) {
      const showSteps = ref<boolean>(false)
      const amount = ref<string | null>(null)
      const sellAsset = ref<Asset>()
      const buyAsset = ref<Asset>()
      const sellAmount = ref<BigNumber>()
      const buyAmount = ref<BigNumber>()

      const done = () => {
        showSteps.value = false
        context.emit('close')
      }

      const submitOrder = (_price: string, _amount: string) => {
        sellAmount.value = BigNumber.from(_amount)
        buyAsset.value = {
          token: EMPTY_ADDRESS,
          tokenId: BigNumber.from(0),
          assetType: AssetType.ETH
        }
        sellAsset.value = {
          token: deployments.MintableToken,
          tokenId: BigNumber.from(props.tokenId),
          assetType: props.info.asset_id
        }
        buyAmount.value = parseEther(_price)

        showSteps.value = true
      }

      const address = computed(() =>
        props.info.asset_id === AssetType.ERC1155 ? deployments.VVMToken : deployments.MintableToken
      )

      return {
        showSteps,
        operator: deployments.TransferProxy,
        address,
        amount,
        done,
        submitOrder,
        sellAsset,
        buyAsset,
        sellAmount,
        buyAmount
      }
    }
  })
</script>
