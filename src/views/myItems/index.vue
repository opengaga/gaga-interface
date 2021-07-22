<template>
  <div class="myitems-wrap">
    <div class="myitems-banner"></div>
    <div class="myitems-info">
      <token-image v-if="userData?.user_cover" class="user-avatar" :src="userData?.user_cover" />
      <address-image v-else class="user-avatar" :src="userData?.user_address" />
      <div class="name-wrap">
        <div class="user-name">{{ userData?.user_name }}</div>
        <div class="copyable-link-wrap">
          <paragraph class="name-detail" copyable>{{ userData?.user_address }}</paragraph>
        </div>
        <div class="share-link-wrap">
          <div class="user-sign">{{ userData?.user_desc }}</div>
          <div class="user-link">{{ userData?.user_website }} </div>
          <div class="user-share">
            <div><img src="@/assets/imgs/twitter.svg" alt="" /> {{ userData?.user_twitter }}</div>
            <div><img src="@/assets/imgs/ins.svg" alt="" /> {{ userData?.user_short_url }}</div>
          </div>
        </div>
      </div>
      <div class="myitems-links">
        <a-button v-if="isMine" shape="round" type="primary" size="large">
          <router-link to="profile">{{ $t('Edit profile') }}</router-link>
        </a-button>
        <img @click="showShareModal = true" src="@/assets/imgs/link-icon.svg" />
        <img class="more" src="@/assets/imgs/more.svg" />
      </div>
    </div>
    <div class="myitems-tags">
      <div
        :class="['item-tag', selectedItems === idx ? 'selected-items' : '']"
        v-for="(item, idx) in itemTags"
        @click="toggleTag(item, idx)"
        :key="idx"
        >{{ item.name }}
        <div class="item-tag-num" v-if="itemsTagsList[item.name] > 0">{{
          itemsTagsList[item.name]
        }}</div>
      </div>
    </div>
    <div class="no-list" v-if="false">
      <p class="no-list-title">No items found</p>
      <p class="no-list-desc">{{
        $t('Come back soon! Or try to browse something for you on our marketplace')
      }}</p>
      <market-btn />
    </div>
    <a-row type="flex" class="item-card-wrap" :gutter="[16, 16]">
      <a-col
        v-for="(item, id) in list"
        :key="id"
        :xs="24"
        :sm="12"
        :md="8"
        :lg="6"
        :xl="4"
        :xxl="4"
      >
        <bid-cell :data="item" />
      </a-col>
    </a-row>
  </div>
  <share-modal @closeModal="closeModal" v-if="showShareModal" />
</template>
<script lang="ts">
  import AddressImage from '@/components/image/address-image'
  import { computed, defineComponent, ref, watchEffect } from 'vue'
  import shareModal from './shareModal.vue'
  import marketBtn from '@/components/backBtns/market-btn'
  import { useApi } from '@/hooks/useApi'
  import { useWallet } from '@/hooks/useWallet'
  import bidCell from '@/components/browse/bid-cell.vue'
  import { useRoute } from 'vue-router'
  import tokenImage from '@/components/image/token-image'

  export default defineComponent({
    components: { shareModal, marketBtn, AddressImage, bidCell, tokenImage },
    name: 'myitems',
    setup() {
      const selectedItems = ref<number>(0)
      const showShareModal = ref<boolean>(false)
      const itemTags = ref([
        {
          name: 'onsale'
        },
        {
          name: 'collection'
        },
        {
          name: 'created'
        },
        {
          name: 'liked'
        },
        {
          name: 'following'
        },
        {
          name: 'follow'
        },
        {
          name: 'own'
        }
      ])
      const closeModal = () => {
        showShareModal.value = false
      }

      const route = useRoute()
      const selectedTag = ref<string>('onsale')
      const { account } = useWallet()
      const api = useApi()
      const userData = ref({})
      const list = ref([])
      const itemsTagsList = ref({})

      const toggleTag = (item, idx) => {
        selectedItems.value = idx
        selectedTag.value = item.name
      }

      const address = computed(() => {
        return (route.query as { address?: string }).address || account?.value
      })

      const isMine = computed(() => address.value === account?.value)

      const getMyItemsLists = () => {
        if (!address.value) return
        api.getItemsList({ address: address.value, filter: selectedTag.value }).then((res: any) => {
          list.value = res.list
        })
      }

      watchEffect(() => {
        if (!address.value) return

        api.getUserInfo({ address: address.value }).then((res) => {
          userData.value = res.data
        })
      })
      watchEffect(() => {
        if (!address.value) return

        api.itemsTagsList({ address: address.value }).then((res: any) => {
          itemsTagsList.value = res.data
        })
      })

      watchEffect(() => {
        if (!address.value) return
        let name = selectedTag.value
        if (name === 'own') {
          name = 'owner'
        }
        api.getItemsList({ address: address.value, filter: name }).then((res: any) => {
          list.value = res.list
        })
      })

      return {
        toggleTag,
        userData,
        selectedItems,
        itemTags,
        showShareModal,
        closeModal,
        isMine,
        itemsTagsList,
        list
      }
    }
  })
</script>
<style lang="scss">
  @import './index.scss';
</style>
