<template>
  <mask-layer title="Why are you reporting?">
    <div class="pay-num"> Describe why you think this item should be removed from marketplace</div>
    <div class="boldFont report-ipt-title">Message</div>
    <div class="bnb-iptwrap">
      <input placeholder="Tell us some details" />
    </div>
  </mask-layer>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  import maskLayer from './maskLayer.vue'

  export default defineComponent({
    components: { maskLayer },
    setup(_, context) {
      const closeReport = () => {
        context.emit('closeReport')
      }
      return {
        closeReport
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
  .report-ipt-title {
    margin: 20px 0 4px;
  }
  .bnb-iptwrap {
    display: flex;
    margin-bottom: 50px;
    border-bottom: 1px solid #d9d9d9;
    input {
      flex: 1;
      border: none;
      outline: none;
    }
  }
</style>
