<template>
  <div class="seller-cell">
    <span class="index">{{ index + 1 }}</span>
    <router-link
      class="img-router"
      :to="{ path: '/myItems', query: { address: data.user_address } }"
    >
      <token-image class="seller-cell-img" :src="data.user_cover" />
    </router-link>
    <div class="seller-cell-info">
      <router-link class="img-router" to="myItems">
        <span class="title">{{ data.user_name }}</span>
      </router-link>
      <span class="num">{{ data.balance }}</span>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  import tokenImage from '@/components/image/token-image'

  export default defineComponent({
    components: { tokenImage },
    props: {
      data: {
        type: Object,
        default: function () {
          return {}
        }
      },
      index: {
        type: Number,
        default: function () {
          return 0
        }
      }
    }
  })
</script>

<style lang="scss">
  @media screen and (max-width: 750px) {
    .seller-cell * {
      font-size: 12px !important;
      .title,
      .item-title {
        font-size: 14px !important;
      }
    }
  }
  .img-router {
    display: inline-block;
  }
  .seller-cell {
    width: 200px;
    margin-bottom: 25px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    .index {
      margin-right: 16px;
    }
    .seller-cell-img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      vertical-align: middle;
      margin-right: 8px;
    }
    .seller-cell-info {
      display: inline-block;
      vertical-align: middle;
      span {
        display: block;
      }
      .title {
        font-weight: 600;
        font-size: 16px;
      }
      .num {
        font-size: 12px;
      }
    }
  }
</style>
