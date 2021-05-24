<template>
  <div class="bid-cell">
    <div class="cell-title">
      <div class="head-imgs">
        <img v-for="i in num" :key="i" src="@/assets/imgs/brandLogo.png" />
      </div>
      <a-dropdown :trigger="['click']" placement="bottomRight">
        <span class="ant-dropdown-link" @click.prevent> ... </span>
        <template #overlay>
          <a-menu>
            <a-menu-item>
              <a href="javascript:;" @click="showPlaceBid">Place a bid</a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;" @click="showPurchase">View on BlackCat</a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;" @click="showReport">Report</a>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
    <div @click="$router.push(`/bidInfo/${data?.token}/${data?.token_id}`)">
      <token-image class="cell-banner" :src="data?.prop_image || data?.user_cover" />
    </div>
    <div class="cell-desc">
      <p class="bold500">{{ data?.prop_name || data?.user_name }}</p>
      <p><span class="bold500">Action</span> 1 of 1</p>
      <div class="desc-bottom">
        <span v-if="data?.price">
          Price
          <span class="mount-num">
            <format-balance :balance="data.price" />
          </span>
        </span>
        <span v-else-if="data?.saleable === 1">
          <a>Place a bid</a>
        </span>
        <span v-else>Not sell</span>
        <like :bidData="data" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { computed, defineComponent } from 'vue'
  import bus from '@/bus'
  import like from '@/components/like/index.vue'
  import TokenImage from '../image/token-image'
  //import { ItemType } from '@/api/types'

  import FormatBalance from '@/components/format/FormatBalance'

  export default defineComponent({
    props: {
      data: {
        type: Object as any,
        required: false
      }
    },
    components: {
      TokenImage,
      FormatBalance,
      like
    },
    setup(props) {
      const num = computed(() => Math.min(5, Number(props.data?.supply ?? 0)))
      return { num, props }
    },
    methods: {
      showPlaceBid() {
        bus.emit('showPlaceBid')
      },
      showPurchase() {
        bus.emit('showPurchase')
      },
      showReport() {
        bus.emit('showReport')
      }
    }
  })
</script>

<style lang="scss">
  @media screen and (max-width: 750px) {
    .bid-cell {
      height: 240px !important;
      padding: 4px 8px !important;
    }
    .cell-banner {
      height: 120px !important;
    }
  }
  .bid-cell {
    border: 1px solid #ddd;
    display: inline-block;
    width: 100%;
    height: 100%;
    padding: 10px 10px;
    border-radius: 8px;
    background: #fff;
    .cell-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .head-imgs {
        padding-left: 15px;
        font-size: 20px;
        white-space: nowrap;
        img {
          width: 30px;
          height: 30px;
          display: inline-block;
          margin-left: -15px;
          border: 1px solid #ddd;
          border-radius: 50%;
          background: #fff;

          object-fit: cover;
          object-position: center;
        }
      }
    }
    .cell-banner {
      width: 100%;
      height: 140px;
      margin: 8px auto;
    }
    .cell-desc {
      font-size: 12px;

      color: $globalBackground;
      p {
        margin: 0;
        padding: 0;
        letter-spacing: -0.5px;
      }
      .desc-bottom {
        display: flex;
        white-space: nowrap;
        justify-content: space-between;
        &-text {
          white-space: nowrap;
        }
      }
      .mount-num {
        color: #246cf6;
        margin-right: 3px;
      }
      .like-icon {
        width: 20px;
        display: inline-block;
        vertical-align: bottom;
      }
    }
  }
  .ant-dropdown-link {
    font-size: 22px;
    color: $globalBackground;
  }
  .bold500 {
    font-weight: 600;
    font-size: 14px;
  }
</style>
