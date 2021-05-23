<template>
  <span v-if="address" class="address">{{ value }}</span>
</template>
<script lang="ts">
  import { isAddress } from '@ethersproject/address'
  import { computed, defineComponent } from 'vue'

  export default defineComponent({
    name: 'shorten-address',
    props: {
      address: String
    },
    setup(props) {
      const value = computed(() => {
        if (props.address) {
          if (isAddress(props.address)) {
            return props.address.slice(0, 6) + '...' + props.address.slice(-4)
          } else {
            return props.address
          }
        } else {
          return ''
        }
      })

      return { value }
    }
  })
</script>
