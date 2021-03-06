<template>
  <div class="collectible-wrap">
    <back-btns text="Manage collectible type" link="create" />
    <div class="page-title">{{ $t('Create single collectible') }}</div>
    <div class="single-wrap">
      <mint-form :isMulti="false" :state="form" @submit="submit" />
      <div class="preview-wrap">
        <div class="preview-title">{{ $t('Preview') }}</div>
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
          :multiple="false"
          :supply="form.supply"
          :fee="form.point"
          :sale="form.sale"
          @done="mintDone"
        />
        <order-step
          v-if="form.hasPrice"
          :selling="form.supply"
          :sellAsset="sellAsset"
          :buyAsset="buyAsset"
          :buying="price"
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
  import { BigNumber } from '@ethersproject/bignumber'
  import { Asset, AssetType } from '@/vvm/types'
  import { EMPTY_ADDRESS } from '@/utils/constants'
  import { deployments } from '@/vvm/constants'
  import { parseEther } from '@ethersproject/units'

  export default defineComponent({
    name: 'Single',
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
        price.value = parseEther(form.price + '').mul(BigNumber.from(form.supply))
        buyAsset.value = {
          token: EMPTY_ADDRESS,
          tokenId: BigNumber.from(0),
          assetType: AssetType.ETH
        }
        sellAsset.value = {
          token: deployments.MintableToken,
          tokenId: BigNumber.from(_tokenId),
          assetType: AssetType.ERC721
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
        address: deployments.MintableToken,
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
</style>
