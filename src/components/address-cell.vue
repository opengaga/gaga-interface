<template>
  <p>
    <router-link :to="`/myItems/${address}`"><address-image :src="address" /></router-link>
    <a-tooltip>
      <template #title>{{ address }}</template>
      <span><shorten-address :address="address" /></span>
    </a-tooltip>
  </p>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  import AddressImage from './image/address-image'

  export default defineComponent({
    components: {
      AddressImage
    },
    props: {
      address: {
        type: String,
        required: true
      },
      icon: {
        type: String
      }
    }
  })
</script>
<style scoped lang="scss">
  p {
    display: flex;
    align-items: center;

    font-size: 12px;
    font-weight: bold;
    line-height: 16px;
    color: #246cf6;

    :deep svg {
      margin-right: 16px;
    }

    span {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
</style>
