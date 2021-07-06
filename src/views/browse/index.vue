<template>
  <div class="browse-container">
    <div class="top-imgs">
      <div
        class="wrap"
        v-for="(item, idx) in userData"
        :style="{ background: `url(${item.hot_url})` }"
        :key="idx"
      >
        <div class="wrap-title">{{ item.hot_title }}</div>
        <div class="wrap-headline"></div>
      </div>
    </div>
    <div class="sellers-wrap">
      <div class="hotbids-wrap">
        <div class="item-title"> Hot Recommend <img src="@/assets/imgs/hotcollect.svg" /> </div>
        <Collections />
      </div>
      <topsellers />
      <!-- <div class="hotbids-wrap">
        <div class="item-title"> Hot bids <img src="@/assets/imgs/hotbids.svg" /> </div>
        <Bids />
      </div> -->

      <Expolre />
    </div>
  </div>
  <placeBid v-if="showPlaceBid" @closeBid="showPlaceBid = false" />
  <report v-if="showReport" @closeReport="showReport = false" />
  <checkout v-if="showPurchase" @close="showPurchase = false" />
</template>
<script lang="ts">
  //import Bids from './bids.vue'
  import Collections from './collections.vue'
  import { defineComponent, ref, watchEffect } from 'vue'
  import Expolre from './expolre.vue'
  import topsellers from './topsellers.vue'
  import placeBid from '@/components/modals/placeBid.vue'
  import report from '@/components/modals/report.vue'
  import checkout from '@/components/modals/checkout.vue'
  import bus from '@/bus'

  import { useApi } from '@/hooks/useApi'
  export default defineComponent({
    name: 'Browse',
    components: {
      //Bids,
      Collections,
      Expolre,
      topsellers,
      placeBid,
      report,
      checkout
    },

    setup() {
      const api = useApi()
      let userData = ref<any>([])
      let showPlaceBid = ref<boolean>(false)
      let showReport = ref<boolean>(false)
      let showPurchase = ref<boolean>(false)
      bus.on('showPlaceBid', () => {
        showPlaceBid.value = true
      })
      bus.on('showPurchase', () => {
        showPurchase.value = true
      })
      bus.on('showReport', () => {
        showReport.value = true
      })

      watchEffect(() => {
        api
          .getHotList()
          .then((res: any) => {
            if (res?.list) {
              userData.value = res.list
            }
          })
          .catch((err) => {
            console.log(err.msg)
          })
      })

      return {
        userData,
        showPlaceBid,
        showReport,
        showPurchase
      }
    }
  })
</script>
<style scoped lang="scss">
  @import './index.scss';
</style>
