<template>
  <div class="user-card">
    <address-image class="user-avatr" :src="user" />
    <div class="user-info">
      <div class="user-info-title">
        <span class="user-charge"><format-balance :balance="balance" /></span> for
        {{ amount }} editions
      </div>
      <div class="user-info-desc">
        <div>
          By <span class="money-num"><shorten-address :address="user" /></span>
        </div>
      </div>
    </div>
    <enable-button v-if="myAmount >= Number(amount)" type="primary" @click="accept">
      Accept
    </enable-button>
  </div>
  <mask-layer
    v-if="showSteps && order && signature"
    @closeBid="showSteps = false"
    title="Follow steps"
    :showFoot="false"
  >
    <steps @done="done">
      <approval-for-all-step :operator="operator" :address="address" />
      <purchase-step :order="order" :amount="order.selling" :signature="signature" :isBid="true" />
    </steps>
  </mask-layer>
</template>
<script lang="ts">
  import { AssetType, SequenceOrderType } from '@/vvm/types'

  import { BigNumber } from '@ethersproject/bignumber'
  import { computed, defineComponent, PropType, ref, watchEffect } from 'vue'
  import AddressImage from './image/address-image'
  import EnableButton from '@/components/button/enable-button'
  import maskLayer from '@/components/modals/maskLayer.vue'
  import Steps from '@/components/steps'
  import ApprovalForAllStep from '@/components/steps/ApprovalForAllStep'
  import PurchaseStep from '@/components/steps/Purchase'
  import { deployments } from '@/vvm/constants'
  import { ItemType } from '@/api/types'
  import { useWallet } from '@/hooks/useWallet'
  import { ERC721 } from '@/vvm/contracts/ERC721'
  import { ERC1155 } from '@/vvm/contracts/ERC1155'

  export default defineComponent({
    props: {
      user: String,
      balance: [String, Object] as PropType<string | BigNumber>,
      orderData: {
        type: String,
        required: true
      },
      address: {
        type: String
      },
      tokenId: {
        type: String
      },
      info: Object as PropType<ItemType>
    },
    components: {
      ApprovalForAllStep,
      AddressImage,
      EnableButton,
      maskLayer,
      Steps,
      PurchaseStep
    },
    setup(props) {
      const order = ref<SequenceOrderType>(JSON.parse(props.orderData).order)
      const signature = ref<string>(JSON.parse(props.orderData).signature)
      const showSteps = ref<boolean>(false)
      const myAmount = ref<number>(0)
      const { account, getProvider } = useWallet()

      watchEffect(() => {
        if (!props.info || !props.address || !props.tokenId || !account?.value) return

        const provider = getProvider()

        if (props.info.asset_id === AssetType.ERC721) {
          const erc721 = new ERC721(props.address, provider, '')

          erc721
            .ownerOf(BigNumber.from(props.tokenId))
            .then((data) => {
              myAmount.value = data ? 1 : 0
            })
            .catch(console.error)
        } else {
          const erc1155 = new ERC1155(props.address, provider)

          erc1155
            .balanceOf(account.value, BigNumber.from(props.tokenId))
            .then((data) => {
              myAmount.value = data.toNumber()
            })
            .catch(console.error)
        }
      })

      const amount = computed(() => {
        return order.value.buying
      })

      const done = () => {
        showSteps.value = false
      }

      const accept = () => {
        showSteps.value = true
      }

      return {
        order,
        signature,
        done,
        amount,
        showSteps,
        operator: deployments.TransferProxy,
        accept,
        myAmount
      }
    }
  })
</script>
<style scoped lang="scss">
  .bord {
    border-bottom: 1px solid #fff;
  }
  .user-card {
    display: flex;
    width: 350px;
    font-size: 14px;
    padding: 16px 0;
    align-content: center;

    .user-avatr {
      width: 40px;
      height: 40px;
      margin-right: 16px;
      border-radius: 50%;
    }
    .user-info {
      width: 100%;
      margin-left: 1em;

      &-title {
        margin-bottom: 6px;
      }
      .user-charge {
        font-weight: bold;
      }
      &-desc {
        font-size: 12px;
        .money-num {
          font-weight: bold;
        }
        .user-number {
          color: #246cf6;
          width: 150px;
          display: inline-block;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          vertical-align: text-top;
        }
      }
    }
  }
</style>
