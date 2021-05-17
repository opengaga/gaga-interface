<template>
  <div :class="['user-card', props.user?.border ? 'bord' : '']">
    <img class="user-avatr" src="@/assets/imgs/collect-avatar.png" />
    <div class="user-info">
      <div class="user-info-title">
        Put on sale 205 editions for <span class="user-charge">0.035ETH</span>
      </div>
      <div class="user-info-desc">
        <div
          >8 hours ago basis <span v-if="props.user?.amount" class="money-num">0.005WBNB</span>
          <span class="user-number">{{ $route.params.address }}</span></div
        >
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    props: {
      user: Object
    },
    setup(props) {
      return { props }
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
