<template>
  <div class="bid-wrap">
    <div class="bid-modal">
      <div class="title">
        <span>{{ props.title }}</span>
        <img @click="closeBid" src="@/assets/imgs/close.svg" />
      </div>
      <slot></slot>
      <div v-if="props.showFoot">
        <a class="submit-btn place">{{ props.confirmBtn ?? 'Place a bid' }}</a>
        <a class="submit-btn cancel">{{ props.cancelBtn ?? 'Cancel' }}</a>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    props: {
      title: {
        type: String,
        required: true
      },
      confirmBtn: String,
      cancelBtn: String,

      showFoot: {
        type: Boolean,
        default() {
          return true
        }
      }
    },
    setup(props: any, context) {
      const closeBid = () => {
        context.emit('closeBid')
      }
      return {
        props,
        closeBid
      }
    }
  })
</script>
<style scoped lang="scss">
  @media screen and (max-width: 600px) {
    .bid-modal {
      width: 90% !important;
    }
  }
  .bid-wrap {
    width: 100%;
    height: 100vh;
    margin: auto;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 101;
    background-color: rgba(0, 0, 0, 0.8);
  }
  .bid-modal {
    width: 400px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 102;
    border: 1px solid #d9d9d9;
    border-radius: 16px;
    padding: 20px;
    text-align: left;
    background: #fff;
    color: $globalBackground;
    .title {
      display: flex;
      justify-content: space-between;
      font-size: 26px;
      font-weight: 600;
    }

    .submit-btn {
      font-size: 18px;
      width: 85%;
      display: block;
      margin: 14px auto;
      line-height: 40px;
      text-align: center;
      border-radius: 20px;
    }
    .place {
      color: $globalBackground;
      background: $fontIconBtn;
    }
    .cancel {
      color: #fff;
      background: #b6b6b6;
    }
  }
</style>
