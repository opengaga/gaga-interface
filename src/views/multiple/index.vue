<template>
  <div class="collectible-wrap">
    <back-btns text="Manage collectible type" link="create" />
    <div class="page-title">{{ $t('Create multiple collectible') }}</div>
    <div class="single-wrap">
      <mint-form :isMulti="true" :state="form" @submit="submit" />
      <div class="preview-wrap">
        <div class="preview-title">Preview</div>
        <div class="preview-info">
          <div v-if="form.preview">
            <img class="logo" src="@/assets/imgs/brandLogo.png" />
            <img class="preview-img" :src="form.preview" />
            <div
              ><span class="bold600">{{ $t('Auction') }}</span>
              <span class="opa05">1 of 1</span></div
            >
            <div class="wallet-bid">{{ $t('Place a bid') }}</div>
          </div>
          <div v-else> {{ $t('Preview of your new collectible') }} </div>
        </div>
      </div>
    </div>
    <a-modal
      :visible="visible"
      :title="$t('Follow steps')"
      :footer="null"
      :maskClosable="false"
      :destroyOnClose="true"
      @cancel="visible = false"
    >
      <steps @done="done">
        <approval-for-all-step v-if="form.sale" :operator="operator" :address="address" />
        <mint-step
          :image="form.file"
          :name="form.name"
          :desc="form.desc"
          :properties="form.properties"
          :multiple="true"
          :supply="form.supply"
          :fee="form.point"
          @done="mintDone"
        />
        <order-step
          v-if="form.sale"
          :supply="form.supply"
          :sellAsset="sellAsset"
          :buyAsset="buyAsset"
          :price="price"
        />
      </steps>
    </a-modal>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import MintForm from '@/components/mint/mint-form.vue'
  import { useMintForm } from '@/components/mint/useMintForm'
  import Steps from '@/components/steps'
  import ApprovalForAllStep from '@/components/steps/ApprovalForAllStep'
  import MintStep from '@/components/steps/Mint'
  import OrderStep from '@/components/steps/Order'
  import { deployments } from '@/vvm/constants'
  import { Asset, AssetType } from '@/vvm/types'
  import { EMPTY_ADDRESS } from '@/utils/constants'
  import { BigNumber } from '@ethersproject/bignumber'
  import { parseEther } from '@ethersproject/units'

  export default defineComponent({
    name: 'Multiple',
    components: { MintForm, Steps, ApprovalForAllStep, MintStep, OrderStep },
    setup() {
      const { form } = useMintForm()
      const visible = ref(false)
      const tokenId = ref<string>()
      const buyAsset = ref<Asset>()
      const sellAsset = ref<Asset>()
      const price = ref<BigNumber>()

      const mintDone = (_tokenId: string) => {
        tokenId.value = _tokenId
        price.value = parseEther(form.price + '')
        buyAsset.value = {
          token: EMPTY_ADDRESS,
          tokenId: BigNumber.from(0),
          assetType: AssetType.ETH
        }
        sellAsset.value = {
          token: deployments.VVMToken,
          tokenId: BigNumber.from(_tokenId),
          assetType: AssetType.ERC1155
        }
      }

      const submit = async () => {
        visible.value = true
      }

      const done = () => {
        visible.value = false
      }

      return {
        form,
        submit,
        visible,
        tokenId,
        operator: deployments.TransferProxy,
        address: deployments.VVMToken,
        sellAsset,
        buyAsset,
        mintDone,
        done,
        price
      }
    }
  })
</script>
<style scoped lang="scss">
  @import './index.scss';

  .collectible-wrap {
    color: #fff;
    width: 900px;
    margin: auto;
    padding: 80px 30px;
    font-family: Verdana;
    .page-title {
      font-size: 28px;
      font-weight: bold;
      margin-bottom: 18px;
    }
  }
</style>
