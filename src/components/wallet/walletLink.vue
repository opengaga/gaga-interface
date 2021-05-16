<template>
  <router-link :to="{ path: props.link }" class="wallet-link-item">
    <img class="wallet-icon" :src="props.img" />
    {{ props.text }}
  </router-link>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({
    props: {
      img: String,
      text: String,
      link: String
    },
    setup(props) {
      return { props }
    }
  })
</script>
<style scoped lang="scss">
  .wallet-link-item {
    width: 290px;
    height: 44px;
    display: block;
    border-radius: 8px;
    padding: 4px;
    margin: 20px 0;
    color: $globalBackground;
    background-color: $fontIconBtn;
    .wallet-icon {
      width: 36px;
      height: 36px;
      border: 1px solid #ddd;
      border-radius: 4px;
      margin-right: 50px;
    }
  }
</style>
