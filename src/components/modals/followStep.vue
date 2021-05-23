<template>
  <mask-layer :showFoot="false" title="Follow steps">
    <div class="step-modal">
      <a-spin></a-spin>
      <div class="step-desc">
        <p class="step-title">Convert ZTB to WZTB</p>
        <p>Send transaction with your wallet</p>
      </div>
    </div>
    <span class="progress-btn">In progress...</span>
  </mask-layer>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import maskLayer from './maskLayer.vue'
  export default defineComponent({
    components: { maskLayer },
    name: 'follow-step',
    setup() {
      const visible = ref<boolean>(true)

      const showModal = () => {
        visible.value = true
      }

      const handleOk = (e: MouseEvent) => {
        console.log(e)
        visible.value = false
      }
      return {
        visible,
        showModal,
        handleOk
      }
    }
  })
</script>
<style lang="scss">
  .follow-modal {
    border-radius: 8px;
  }
  .step-modal {
    display: flex;
    padding-top: 10px;
    align-content: center;
    .step-desc {
      margin-left: 20px;
      .step-title {
        font-weight: bold;
        margin-bottom: 0;
        margin-top: -10px;
      }
    }
  }

  .progress-btn {
    display: block;
    border-radius: 20px;
    text-align: center;
    width: 90%;
    color: #fff;
    line-height: 30px;
    margin: 20px auto;
    background: #b6b6b6;
  }
</style>
