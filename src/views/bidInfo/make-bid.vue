<template>
  <place-bid :name="info.prop_name" @submit="submitBid" @close="$emit('close')" />
  <mask-layer v-if="showSteps" @closeBid="showSteps = false" title="Follow steps" :showFoot="false">
    <steps @done="done">
      <approve-step :spender="spender" :address="address" />
      <order-step
        :selling="sellAmount"
        :sellAsset="sellAsset"
        :buyAsset="buyAsset"
        :buying="buyAmount"
        :isBid="true"
      />
    </steps>
  </mask-layer>
</template>
<script lang="ts">
  import { ItemType } from '@/api/types'

  import maskLayer from '@/components/modals/maskLayer.vue'
  import PlaceBid from '@/components/modals/placeBid.vue'
  import { defineComponent, PropType, ref } from 'vue'
  import { Asset } from '@/vvm/types'
  import Steps from '@/components/steps'
  import ApproveStep from '@/components/steps/Approve'
  import OrderStep from '@/components/steps/Order'
  import { deployments } from '@/vvm/constants'
  import { BigNumber } from '@ethersproject/bignumber'
  import { useWallet } from '@/hooks/useWallet'
  import { assert } from '@/utils/assert'
  import { tokens } from '@/utils/constants'

  export default defineComponent({
    name: 'bidInfo',
    components: {
      maskLayer,
      Steps,
      ApproveStep,
      OrderStep,
      PlaceBid
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
      const { account } = useWallet()
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

      const submitBid = (_sellAsset: Asset, _sellAmount: BigNumber, _buyAmount: BigNumber) => {
        assert(account?.value)

        sellAsset.value = _sellAsset
        sellAmount.value = _sellAmount
        buyAmount.value = _buyAmount

        buyAsset.value = {
          token: props.tokenAddress,
          tokenId: BigNumber.from(props.tokenId),
          assetType: props.info.asset_id
        }

        showSteps.value = true
      }

      return {
        showSteps,
        spender: deployments.ERC20TransferProxy,
        address: tokens.weth,
        amount,
        done,
        submitBid,
        sellAsset,
        buyAsset,
        sellAmount,
        buyAmount
      }
    }
  })
</script>
