<template>
  <a-modal
    :visible="true"
    :width="420"
    title="Share link to this page"
    :footer="null"
    @cancel="closeModal"
  >
    <div class="links-wrap">
      <div class="link-item">
        <img src="@/assets/imgs/twitter_blue.svg" alt="" />
        <span>Twitter</span>
      </div>
      <div class="link-item">
        <img src="@/assets/imgs/face_blue.svg" alt="" />
        <span>Facebook</span>
      </div>
      <div class="link-item">
        <img src="@/assets/imgs/ss_blue.svg" alt="" />
        <span>Telegram</span>
      </div>
      <div class="link-item">
        <img src="@/assets/imgs/email_blue.svg" alt="" />
        <span>E-mail</span>
      </div>
    </div>
  </a-modal>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({
    setup(props, context) {
      const closeModal = () => {
        context.emit('closeModal')
      }
      return {
        closeModal
      }
    }
  })
</script>
<style lang="scss">
  .links-wrap {
    display: flex;
    justify-content: space-between;
    align-content: center;
    padding: 10px 20px;
    text-align: center;
    img {
      width: 46px;
      display: block;
      border-radius: 50%;
      border: 1px solid $inputTip;
      margin: 10px auto;
    }
  }
</style>
