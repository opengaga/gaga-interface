<template>
  <div class="bid-container">
    <div class="video-wrap">
      <div class="media-wrap">
        <token-image :src="info?.prop_image" />
      </div>
    </div>
    <div class="bid-information">
      <div class="bidinfo-container">
        <div class="top">
          <div class="top-title">{{ info?.prop_name }}</div>

          <like v-if="info" :bidData="info" />
          <div>
            <a-dropdown :trigger="['click']" placement="bottomRight">
              <img class="top-more" src="@/assets/imgs/more.svg" />
              <template #overlay>
                <a-menu>
                  <a-menu-item v-for="({ name, link }, index) in bidinfos" :key="index">
                    <router-link :to="{ path: link }">{{ name }}</router-link>
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </div>
        </div>
        <div class="headline">
          <span class="name"><format-balance :balance="info?.price" /></span>
          <span>US2,523.22</span>
          <span v-if="ownerInfo">{{ ownerInfo.own_supply_sell }} of {{ info?.supply }}</span>
        </div>
        <div class="icons">
          <a-button shape="round" type="primary">
            <img src="@/assets/imgs/dimond.svg" />Art
          </a-button>
          <a-button shape="round" type="primary">Unlockable</a-button>
        </div>
        <div class="articles">
          <read-more :text="description" />
          <div class="article-title">Creator</div>
          <div class="marginBtm">
            <address-cell v-if="info?.creator_address" :address="info.creator_address" />
          </div>
          <!-- <div class="article-title">Unlock once purchased:</div>
          <div class="marginBtm">-Avatar</div>
          <div class="marginBtm">-Wallpape</div>
          <div class="marginBtm">-Original GIF</div>
          <div class="marginBtm">-Twitter GIF</div> -->
        </div>
        <a-tabs v-model:activeKey="activeKey">
          <a-tab-pane class="pane" key="1" tab="Holder">
            <owner-card
              v-for="(item, idx) of owners"
              :key="idx"
              :owner="item"
              @select="
                $router.push(`/bidInfo/${info?.token}/${info?.token_id}/${item.user_address}`)
              "
            />
          </a-tab-pane>
          <!-- <a-tab-pane class="pane" key="2" tab="history">
            <bid-card v-for="(item, idx) in 5" :key="idx" :user="item" />
          </a-tab-pane> -->
          <a-tab-pane class="pane" key="3" tab="Details">
            <token-detail :owner="owner" :attributes="attributes" />
          </a-tab-pane>
          <a-tab-pane class="pane" key="4" tab="Bids" v-if="bids.length > 0">
            <bid-card
              v-for="(item, idx) of bids"
              :key="idx"
              :user="item.bid_user_address"
              :balance="item.bid_price"
              :orderData="item.bid_data"
              :address="tokenAddress"
              :tokenId="tokenId"
              :info="info"
            />
          </a-tab-pane>
        </a-tabs>
        <div class="bid-bottom">
          <div class="bid-bottom-btns">
            <span v-if="!!info" @click="showBid = true" class="btn">Place a bid</span>
            <span v-if="!!owner && info && !order && myHas" @click="showOrder = true" class="btn">
              Sell
            </span>
            <span
              v-if="!!owner && info && order && signature && !isMine"
              class="btn"
              @click="showCheckout = true"
            >
              Buy
            </span>
          </div>
          <div class="bid-bottom-tip">Item is not on sale, but you can place a bid</div>
        </div>
      </div>
    </div>
  </div>
  <checkout
    v-if="showCheckout && info && order && owner"
    :name="info.prop_name"
    :user="owner"
    :price="info.price"
    @submit="submitCheckout"
    @close="showCheckout = false"
  />
  <mask-layer
    v-if="!!owner && info && showSteps && order && signature"
    @closeBid="showSteps = false"
    title="Follow steps"
    :showFoot="false"
  >
    <steps @done="done">
      <purchase-step :order="order" :amount="amount" :signature="signature" />
    </steps>
  </mask-layer>
  <MakeBid
    v-if="showBid && tokenAddress && tokenId && info"
    :tokenAddress="tokenAddress"
    :tokenId="tokenId"
    :info="info"
    @close="showBid = false"
  />
  <MakeOrder
    v-if="showOrder && tokenAddress && tokenId && info"
    :tokenAddress="tokenAddress"
    :tokenId="tokenId"
    :info="info"
    @close="showOrder = false"
  />
</template>
<script lang="ts">
  /* eslint-disable vue/no-unused-components */

  import like from '@/components/like/index.vue'
  import maskLayer from '@/components/modals/maskLayer.vue'
  import Checkout from '@/components/modals/checkout.vue'
  import { computed, defineComponent, ref, watchEffect } from 'vue'
  import bidCard from '@/components/bid-card.vue'
  import OwnerCard from '@/components/owner-card.vue'
  import TokenDetail from '@/components/token-detail.vue'
  import ReadMore from '@/components/read-more'
  import AddressCell from '@/components/address-cell.vue'
  import { useApi } from '@/hooks/useApi'
  import { useRoute } from 'vue-router'
  import { Bid, ItemType, Owner, OwnerInfo } from '@/api/types'
  import { useTokenURI } from '@/hooks/useTokenURI'
  import { AssetType, SequenceOrderType } from '@/vvm/types'
  import Steps from '@/components/steps'
  import PurchaseStep from '@/components/steps/Purchase'
  import MakeBid from './make-bid.vue'
  import MakeOrder from './make-order.vue'
  import { useWallet } from '@/hooks/useWallet'
  import { useBlockNumber } from '@/state/application/hooks'
  import { ERC721 } from '@/vvm/contracts/ERC721'
  import { ERC1155 } from '@/vvm/contracts/ERC1155'
  import { BigNumber } from '@ethersproject/bignumber'

  export default defineComponent({
    name: 'bidInfo',
    components: {
      bidCard,
      maskLayer,
      OwnerCard,
      TokenDetail,
      ReadMore,
      Steps,
      like,
      PurchaseStep,
      AddressCell,
      Checkout,
      MakeBid,
      MakeOrder
    },
    setup() {
      const activeKey = ref<string>('1')
      const bidinfos = ref([
        {
          name: 'Buy now',
          link: ''
        },
        {
          name: 'Place a bid',
          link: ''
        },
        {
          name: 'Share',
          link: ''
        },
        {
          name: 'Report',
          link: ''
        }
      ])
      const fullscreen = () => {
        let ele: any = document.documentElement
        if (ele.requestFullscreen) {
          ele.requestFullscreen()
        } else if (ele.mozRequestFullScreen) {
          ele.mozRequestFullScreen()
        } else if (ele.webkitRequestFullScreen) {
          ele.webkitRequestFullScreen()
        }
      }
      const blockNumber = useBlockNumber()
      const showSteps = ref<boolean>(false)
      const showCheckout = ref<boolean>(false)
      const showBid = ref<boolean>(false)
      const showOrder = ref<boolean>(false)
      const info = ref<ItemType>()
      const api = useApi()
      const route = useRoute()
      const tokenAddress = ref<string>()
      const tokenId = ref<string>()
      const assetType = ref<AssetType.ERC721 | AssetType.ERC1155>()
      const owners = ref<Owner[]>([])
      const ownerInfo = ref<OwnerInfo | null>(null)
      const order = ref<SequenceOrderType | null>(null)
      const signature = ref<string | null>(null)
      const amount = ref<string | null>(null)
      const bids = ref<Bid[]>([])
      const { account, getProvider } = useWallet()
      const myHas = ref<boolean>(false)

      const params = computed(() => {
        return route.params as {
          address?: string
          tokenId?: string
          seller?: string
        }
      })

      const owner = computed(
        () =>
          params.value.seller || (owners.value.length === 1 ? owners.value[0].user_address : null)
      )

      const isMine = computed(() => owner.value === account?.value)

      watchEffect(() => {
        blockNumber?.value
        if (!info.value || !tokenAddress.value || !tokenId.value || !account?.value) return

        const provider = getProvider()

        if (info.value.asset_id === AssetType.ERC721) {
          const erc721 = new ERC721(tokenAddress.value, provider, '')

          erc721
            .ownerOf(BigNumber.from(tokenId.value))
            .then((data) => {
              myHas.value = data === account.value
            })
            .catch(console.error)
        } else {
          const erc1155 = new ERC1155(tokenAddress.value, provider)

          erc1155
            .balanceOf(account.value, BigNumber.from(tokenId.value))
            .then((data) => {
              myHas.value = data.toNumber() > 0
            })
            .catch(console.error)
        }
      })

      watchEffect(() => {
        if (tokenAddress.value && tokenId.value) {
          api.getBids({ token: tokenAddress.value, token_id: tokenId.value }).then(({ list }) => {
            bids.value = list
          })
        }
      })

      watchEffect(() => {
        if (owner.value && tokenAddress.value && tokenId.value) {
          api
            .getOwnerInfo({
              token: tokenAddress.value,
              token_id: tokenId.value,
              address: owner.value
            })
            .then(({ data }) => {
              ownerInfo.value = { ...data }
            })
        }
      })

      watchEffect(() => {
        if (tokenAddress.value && tokenId.value && owner.value) {
          api
            .getOrder({
              token: tokenAddress.value,
              token_id: tokenId.value,
              address: owner.value
            })
            .then(({ data }) => {
              order.value = data.ord_data.order || null
              signature.value = data.ord_data.signature || null
            })
        }
      })

      watchEffect(() => {
        api
          .getItemInfo({
            token: params.value.address as string,
            token_id: params.value.tokenId as string
          })
          .then(({ data }) => {
            info.value = data
            tokenAddress.value = data.token
            tokenId.value = data.token_id
            assetType.value = data.asset_id
          })
      })

      watchEffect(() => {
        if (tokenAddress.value && tokenId.value) {
          api.getOwners({ token: tokenAddress.value, token_id: tokenId.value }).then(({ list }) => {
            owners.value = list
          })
        }
      })

      const { description, attributes } = useTokenURI(tokenAddress, tokenId, assetType)

      const done = () => {
        showSteps.value = false
      }

      const submitCheckout = (value) => {
        amount.value = value
        showCheckout.value = false
        showSteps.value = true
      }

      return {
        showSteps,
        showCheckout,
        showOrder,
        showBid,
        activeKey,
        myHas,
        fullscreen,
        bidinfos,
        info,
        description,
        owners,
        owner,
        ownerInfo,
        attributes,
        order,
        signature,
        amount,
        done,
        submitCheckout,
        tokenId,
        tokenAddress,
        bids,
        isMine
      }
    }
  })
</script>
<style scoped lang="scss">
  @import './index.scss';
</style>
