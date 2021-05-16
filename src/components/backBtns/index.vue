<template>
  <div class="back-btn" @click="$router.go(-1)">
    <img class="back-icon" src="@/assets/imgs/arrow-right.svg" />
    <router-link :to="{ path: props.link }">{{ props.text }}</router-link>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({
    props: {
      link: String,
      text: String
    },
    setup(props) {
      return { props }
    }
  })
</script>
<style scoped lang="scss">
  @media screen and (max-width: 750px) {
    .back-btn {
      margin-left: -20px !important;
    }
  }
  .back-btn {
    width: 130px;
    margin-left: -46px;
    font-size: 20px;
    display: flex;
    margin-bottom: 20px;
    align-content: center;
    a {
      color: #fff;
    }
    .back-icon {
      width: 34px;
      margin-right: 10px;
      transform: rotate(180deg);
    }
  }
</style>
