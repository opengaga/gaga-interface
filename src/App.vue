<template>
  <Provide>
    <Updater />
    <Heades />
    <div class="website-container">
      <router-view />
    </div>
    <Footes v-if="currentPath" />
  </Provide>
</template>
<script lang="ts">
  import { useRouter } from 'vue-router'
  import Heades from '@/components/heades/index.vue'
  import Footes from '@/components/footes/index.vue'
  import Provide from './Provide.vue'
  import Updater from './Updater'
  import { defineComponent, ref, watchEffect } from 'vue'

  export default defineComponent({
    components: {
      Heades,
      Footes,
      Provide,
      Updater
    },

    setup() {
      const router = useRouter()
      const currentPath = ref<boolean>(false)
      watchEffect(() => {
        currentPath.value = router.currentRoute.value.name === 'BidInfo' ? false : true
      })

      return { currentPath }
    }
  })
</script>

<style lang="scss">
  $a: 100vh;
  $b: 80px;
  #app {
    font-family: Verdana, PingFangSC, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: $inputTip;
    min-height: 100vh;
    width: 100vw;
    overflow: hidden;
    background: #0b0e11;
  }
  ::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 2px;
  }
  ::-webkit-scrollbar-thumb {
    background: #bfbfbf;
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #333;
  }
  ::-webkit-scrollbar-corner {
    background: #179a16;
  }
  .ant-btn-primary {
    color: #fff;
    background: linear-gradient(138deg, #db30ff 0%, #4768ff 100%);
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
    opacity: 1;
    border: none;
    border-radius: 24px;

    transition: all 0.3s;

    &:hover,
    &:focus {
      background: linear-gradient(138deg, #4768ff 0%, #db30ff 100%) !important;
      color: #fff;
    }
  }
  .ant-btn-primary-disabled,
  .ant-btn-primary.disabled,
  .ant-btn-primary[disabled],
  .ant-btn-primary-disabled:hover,
  .ant-btn-primary.disabled:hover,
  .ant-btn-primary[disabled]:hover,
  .ant-btn-primary-disabled:focus,
  .ant-btn-primary.disabled:focus,
  .ant-btn-primary[disabled]:focus,
  .ant-btn-primary-disabled:active,
  .ant-btn-primary.disabled:active,
  .ant-btn-primary[disabled]:active,
  .ant-btn-primary-disabled.active,
  .ant-btn-primary.disabled.active,
  .ant-btn-primary[disabled].active {
    background: linear-gradient(138deg, #4768ff 0%, grey 50%, #db30ff 100%) !important;
    color: #fff !important;
  }

  .website-container {
    width: 1500px;
    margin: auto;
    min-height: calc(#{$a} - #{$b});
  }
  @media screen and (max-width: 1600px) {
    .website-container {
      width: 1160px;
    }
  }
  @media screen and (max-width: 1200px) {
    .website-container {
      width: 952px;
    }
  }
  @media screen and (max-width: 992px) {
    .website-container {
      width: 728px;
    }
  }
  @media screen and (max-width: 768px) {
    .website-container {
      width: 536px;
      min-height: auto;
    }
  }
  @media screen and (max-width: 576px) {
    .website-container {
      width: 100%;
    }
    ::-webkit-scrollbar {
      width: 0 !important;
      height: 1px !important;
    }
  }

  input {
    outline: none;
  }

  p {
    margin: 0;
    padding: 0;
  }

  .icon-btn-gb {
    color: $globalBackground;
  }

  #nav {
    padding: 30px;

    a {
      font-weight: bold;
      color: #2c3e50;

      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
</style>
