<template>
  <div class="banner-wrap">
    <div class="title">{{ $t('THE LARGEST NFT MARKETPLACE ON ZSC') }}</div>
    <div class="info">{{ $t('buy,sell,and discover rare digital items') }}</div>
    <div class="btn-items">
      <router-link to="browse">{{ $t('Browse') }}</router-link>
      <router-link to="create">{{ $t('Create') }}</router-link>
    </div>
  </div>
  <div class="account-wrap">
    <div class="title">{{ $t('Meet GAGA-OpenGaga Governance Token') }}</div>
    <div class="desc">
      {{
        $t(
          "We think that the best way to align platform development with customers' interests is to empower the ones who actively interact with protocol: creators and collectors"
        )
      }}
    </div>
    <div class="connect-wrap" v-if="!active">
      <span class="text"
        ><span class="cnt-text">{{ $t('Connect your wallet') }}{{ $t('to') }}</span
        >{{ $t('check your eligibility') }}</span
      >
      <span class="link">{{ $t('Connect wallet') }}</span>
    </div>
    <div v-else class="connect-balance">
      <div>
        <span class="title">{{ $t('Your Balance') }}</span>
        <span class="line"></span>
        <span class="num">0 GAGA</span>
      </div>
      <div>
        <span class="title">{{ $t('Available for claim') }}</span>
        <span class="line"></span>
        <span class="num">0 GAGA</span>
      </div>
    </div>
    <router-link to="about" class="about-concat">
      {{ $t('Learn more about GAGA Token') }}
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
