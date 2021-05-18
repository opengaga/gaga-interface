<template>
  <div class="banner-wrap">
    <div class="title">THE LARGEST NFT MARKETPLACE ON ZSC</div>
    <div class="info">buy,sell,and discover rare digital items</div>
    <div class="btn-items">
      <router-link to="browse">Browse</router-link>
      <router-link to="create">Create</router-link>
    </div>
  </div>
  <div class="account-wrap">
    <div class="title">Meet GAGA-OpenGaga Governance Token</div>
    <div class="desc">
      We think that the best way to align platform development with customers' interests is to
      empower the ones who actively interact with protocol: creators and collectors
    </div>
    <div class="connect-wrap" v-if="!active">
      <span class="text"
        ><span class="cnt-text">Connect your wallet to</span> check your eligibility</span
      >
      <span class="link">Connect wallet</span>
    </div>
    <div v-else class="connect-balance">
      <div>
        <span class="title">Your Balance</span>
        <span class="line"></span>
        <span class="num">1000 GAGA</span>
      </div>
      <div>
        <span class="title">Available for claim</span>
        <span class="line"></span>
        <span class="num">1000 GAGA</span>
      </div>
    </div>
    <router-link to="about" class="about-concat">
      Learn more about GAGA token
      <img class="anticon-right" src="@/assets/imgs/learn-arow.svg" alt="" />
    </router-link>
  </div>
  <convert @closeConvert="showConvert = false" v-if="showConvert" />
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { useWallet } from '@/hooks/useWallet'
  import convert from '@/components/modals/convert.vue'
  export default defineComponent({
    name: 'home',
    components: { convert },
    setup() {
      const { active } = useWallet()
      const showConvert = ref<boolean>(false)

      const onSearch = (e: unknown) => {
        console.log(e)
      }
      return { onSearch, active, showConvert }
    }
  })
</script>
<style scoped lang="scss">
  @import './index.scss';
</style>
