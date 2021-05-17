<template>
  <div class="no-list">
    <ThunderboltFilled class="thunder" />
    <p class="no-list-title">{{ props.titleMsg }}</p>
    <p class="no-list-desc">{{ props.headlineMsg }}</p>
    <market-btn>{{ props.btnMsg }}</market-btn>
  </div>
</template>
<script lang="ts">
  import { ThunderboltFilled } from '@ant-design/icons-vue'
  import marketBtn from '@/components/backBtns/market-btn'
  import { defineComponent } from 'vue'
  export default defineComponent({
    components: {
      ThunderboltFilled,
      marketBtn
    },
    props: {
      btnMsg: String,
      headlineMsg: String,
      titleMsg: String
    },
    setup(props) {
      return { props }
    }
  })
</script>
<style scoped lang="scss">
  @media screen and (max-width: 750px) {
    .no-list {
      width: auto !important;
      &-title {
        font-size: 14px !important;
      }
      &-desc {
        font-size: 12px !important;
      }
    }
  }
  .no-list {
    width: 580px;
    padding: 50px 0;
    overflow: hidden;
    text-align: center;
    margin: auto;
    color: #fff;
    .thunder {
      font-size: 80px;
      color: #246cf6;
      margin-bottom: 30px;
    }

    &-title {
      font-size: 32px;
      margin-bottom: 10px;
    }
    &-desc {
      font-size: 20px;
      margin-bottom: 20px;
    }
  }
</style>
