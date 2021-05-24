<template>
  <div class="connect-wrap">
    <div class="connect-left"> </div>
    <div class="connect-right">
      <back-btns text="Go back" link="create" />
      <div class="title">Connect your wallet</div>
      <div class="desc"
        >Connect with one of available wallet providers or create a new wallet.
        <span class="explain">What is wallet?</span></div
      >
      <walletLink
        :img="require('@/assets/imgs/brandLogo.png').default"
        @click="connect"
        text="Metamask"
        link=""
      />

      <walletLink
        :img="require('@/assets/imgs/brandLogo.png').default"
        text="Binance Chain Wallet"
        link=""
      />
      <walletLink :img="require('@/assets/imgs/brandLogo.png').default" text="Trust" link="" />
      <div class="connect-bottom"
        >We do not own your private keys and cannot access your funds without your
        confirmation.</div
      >
    </div>
  </div>
</template>
<script lang="ts">
  import { useWallet } from '@/hooks/useWallet'
  import backBtns from '@/components/backBtns/index.vue'
  import walletLink from '@/components/wallet/walletLink.vue'
  import { defineComponent } from 'vue'
  import { injectedConnector } from '@/connectors'

  export default defineComponent({
    components: { backBtns, walletLink },
    setup() {
      const { activate } = useWallet()
      return { activate }
    },
    methods: {
      async connect(): Promise<void> {
        await this.activate?.(injectedConnector)
      }
    }
  })
</script>
<style scoped lang="scss">
  @import './index.scss';
</style>
