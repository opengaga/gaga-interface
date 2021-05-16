<template>
  <ScrollProvide>
    <WalletProvide>
      <ApplicationProvide>
        <slot></slot>
      </ApplicationProvide>
    </WalletProvide>
  </ScrollProvide>
</template>
<script lang="ts">
  import WalletProvide from '@/components/wallet/wallet-provide'
  import ScrollProvide from '@/components/scroll-provide.vue'
  import ApplicationProvide from '@/state/application'

  export default {
    components: {
      ApplicationProvide,
      WalletProvide,
      ScrollProvide
    }
  }
</script>
