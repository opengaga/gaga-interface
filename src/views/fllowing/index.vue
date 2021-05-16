<template>
  <div>
    <no-list
      :showThunder="wallet"
      :btnMsg="btnMsg"
      :titleMsg="titleMsg"
      :headlineMsg="headlineMsg"
      v-if="!wallet || list.length < 1"
    />
    <div class="expolre-cnt" v-if="wallet && list.length > 0">
      <bid-cell v-for="(item, idx) in list" :key="idx" :data="item" />
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import bidCell from '@/components/browse/bid-cell.vue'
  import noList from '@/components/noList.vue'
  import { useApi } from '@/hooks/useApi'
  import { useWallet } from '@/hooks/useWallet'
  import { useFollowList } from '@/hooks/useFollowList'
  import { FollowerType } from '@/api/types'
  export default defineComponent({
    name: 'home',
    components: {
      bidCell,
      noList
    },
    setup() {
      const { account } = useWallet()

      const api = useApi()
      const wallet = ref<boolean>(false)
      const btnMsg = ref<string>('')
      const titleMsg = ref<string>('')
      const headlineMsg = ref<string>('')

      const { list, loadMore } = useFollowList<FollowerType>(
        1,
        account?.value ?? '',
        (page, address) =>
          api.getFollowerList({ page, address }).then((res) => {
            return res.list
          })
      )
      if (!wallet.value) {
        btnMsg.value = 'Connect wallet'
        titleMsg.value = 'Nothing to look at'
        headlineMsg.value = 'You must connect wallet to see NFTs from your favorite artists'
      } else if (list.value.length < 1) {
        btnMsg.value = 'Browse marketplace'
      }

      return {
        list,
        loadMore,
        wallet,
        btnMsg,
        headlineMsg,
        titleMsg
      }
    }
  })
</script>
<style scoped lang="scss">
  .expolre-cnt {
    display: flex;
    flex-wrap: wrap;
    padding: 30px;
    align-content: center;
  }
</style>
