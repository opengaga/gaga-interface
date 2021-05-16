<template>
  <div class="collectible-wrap">
    <back-btns text="Go back" link="/" />
    <div class="title">Create collectible</div>
    <div class="desc"
      >Choose “Single” if you want your collectible to be one of a kind or “Multiple” if you want to
      sell one collectible multiple times</div
    >
    <div class="models">
      <div class="model" @click="toRouter('single')">
        <img src="@/assets/imgs/single_create.png" />
        <div>Single</div>
      </div>
      <div class="model" @click="toRouter('multiple')">
        <img src="@/assets/imgs/mutiple_create.png" />
        <div>Multiple</div>
      </div>
    </div>
    <div class="reason"
      >We do not own your private keys and cannot access your funds without your confirmation</div
    >
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  import router from '@/router'
  import backBtns from '@/components/backBtns/index.vue'
  export default defineComponent({
    name: 'Create',
    components: { backBtns },
    setup() {
      const toRouter = (path: string) => {
        router.push(path)
      }
      return {
        toRouter
      }
    }
  })
</script>
<style scoped lang="scss">
  @media screen and (max-width: 750px) {
    .collectible-wrap {
      width: 94% !important;
      padding: 30px 12px !important;
      .title {
        font-size: 14px !important;
      }
      .desc,
      .reason {
        font-size: 12px !important;
      }
      .model {
        width: 48% !important;
        height: 160px !important;
        padding-top: 20px !important;
        font-size: 14px !important;
        img {
          width: 50% !important;
          height: 100px;
          margin-bottom: 4px !important;
        }
      }
    }
  }
  .collectible-wrap {
    color: #fff;
    width: 700px;
    margin: auto;
    padding: 80px 30px;
    font-family: Verdana;
    .title {
      font-size: 28px;
      font-weight: bold;
    }
    .desc {
      font-size: 20px;
      line-height: 26px;
      margin: 10px 0 40px;
    }
    .models {
      display: flex;
      justify-content: space-between;
      .model {
        width: 220px;
        height: 250px;
        text-align: center;
        font-size: 20px;
        background: #fff;
        color: $globalBackground;
        border-radius: 8px;
        padding-top: 30px;
        font-weight: bold;
        img {
          width: 80px;
          margin-bottom: 20px;
        }
      }
    }
    .reason {
      margin-top: 40px;
      font-size: 20px;
    }
  }
</style>
