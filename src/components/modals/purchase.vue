<template>
  <mask-layer title="Checkout" confirmBtn="Proceed to payment" cancelBtn="Convert">
    <div class="pay-num"> You are about to purchase Inner Storm (exclusive) from N274</div>
    <div class="bnb-iptwrap">
      <input placeholder="Enter an amount" />
      <div class="bnb-icon">BNB</div>
    </div>
    <div class="fee-wrap">
      <div class="fee-item">
        <span>Your balance</span>
        <span class="fee">0.001 BNB</span>
      </div>
      <div class="fee-item">
        <span>Your balance</span>
        <span class="fee">0.001 BNB</span>
      </div>
      <div class="fee-item">
        <span>Your balance</span>
        <span class="fee">0.001 BNB</span>
      </div>
    </div>
  </mask-layer>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  import maskLayer from './maskLayer.vue'

  export default defineComponent({
    components: { maskLayer },
    setup(_, context) {
      const closePurchase = () => {
        context.emit('closePurchase')
      }
      return {
        closePurchase
      }
    }
  })
</script>
<style scoped lang="scss">
  @media screen and (max-width: 750px) {
    .bid-wrap * {
      font-size: 14px !important;
    }
  }
  .boldFont {
    font-size: 20px;
    font-weight: 600;
  }

  .pay-num {
    font-size: 16px;
    font-weight: 500;
    margin-top: 20px;
  }
  .bid-ipt-title {
    margin: 20px 0 4px;
  }
  .bnb-iptwrap {
    display: flex;
    margin: 40px 0 30px;
    border-bottom: 1px solid #d9d9d9;
    input {
      flex: 1;
      border: none;
      outline: none;
    }
    .bnb-icon {
      font-weight: 600;
      font-size: 18px;
      span {
        margin-left: 6px;
      }
    }
  }
  .fee-wrap {
    margin-bottom: 20px;
    .fee-item {
      display: flex;
      justify-content: space-between;
      align-content: center;
      font-size: 16px;
      font-weight: 500;
      margin-bottom: 10px;
      .fee {
        font-weight: 600;
      }
    }
  }
</style>
