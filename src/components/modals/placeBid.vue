<template>
  <mask-layer title="Place a bid">
    <div class="pay-num"> You are about to place a bid for NFTP by Charmin / #005 by Charmin</div>
    <div class="boldFont bid-ipt-title">Place a bid</div>
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
      const closeBid = () => {
        context.emit('closeBid')
      }
      return {
        closeBid
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
    width: 90%;
  }
  .bid-ipt-title {
    margin: 20px 0 4px;
  }
  .bnb-iptwrap {
    display: flex;
    margin-bottom: 20px;
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
    margin-bottom: 18px;
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
