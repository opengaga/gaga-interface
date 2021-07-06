<template>
  <div class="collect-cell">
    <token-image :src="props.collect.prop_image" class="cell-banner"></token-image>
    <token-image class="cell-avatar" :src="props.collect.own_user_cover" />
    <div class="cell-desc">
      <div class="name bold500">{{ props.collect.prop_name }}</div>
      <div class="text">{{ props.collect.asset_type }}</div>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  import tokenImage from '@/components/image/token-image'
  export default defineComponent({
    props: {
      collect: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    components: { tokenImage },
    setup(props) {
      return { props }
    }
  })
</script>

<style lang="scss">
  @media screen and (max-width: 750px) {
    .collect-cell {
      width: 29% !important;
      height: 120px !important;
    }
  }

  .collect-cell {
    display: inline-block;
    width: 19%;
    height: 200px;
    margin-right: 10px;
    border-radius: 8px;
    position: relative;
    background: #fff;
    overflow: hidden;
    .ant-image {
      position: static !important;
    }
    .cell-banner {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100px;
      z-index: 2;
      background-position: center;
      background-size: cover;
    }
    .cell-avatar {
      width: 46px;
      height: 46px;
      position: absolute;
      left: 50%;
      top: 50%;
      z-index: 9;
      border-radius: 50%;
      border: 1px solid #ddd;
      transform: translate(-50%, -50%);
    }
    .cell-desc {
      position: absolute;
      bottom: 20px;
      text-align: center;
      width: 100%;
      .text {
        margin-top: 2px;
        font-size: 12px;
      }
    }
  }
</style>
