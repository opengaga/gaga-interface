<template>
  <div class="item">
    <span class="item-span">{{ props.index }}</span>
    <div class="item-right">
      <div class="item-title">{{ props.ants.title }}</div>
      <div class="item-time">{{ props.ants.time }}</div>
      <div class="item-desc">{{ props.ants.desc }}</div>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({
    props: {
      ants: {
        type: Object,
        required: true
      },
      index: Number
    },
    setup(props) {
      return { props }
    }
  })
</script>
<style scoped lang="scss">
  @media screen and (max-width: 750px) {
    .item-title,
    .item-span {
      font-size: 14px !important;
    }
    .item {
      display: flex;
    }
    .item-right {
      flex: 1;
      margin-left: 10px;
    }
    .item-span {
      width: 20px !important;
      height: 20px !important;
      line-height: 20px !important;
    }
    .item-time,
    .item-desc {
      font-size: 12px !important;
    }
  }

  .item {
    margin: 30px 0;
    display: flex;
    justify-content: space-evenly;
    .item-span {
      display: block;
      width: 40px;
      height: 40px;
      line-height: 40px;
      border-radius: 50%;
      text-align: center;
      color: #246cf6;
      border: 1px solid $fontIconBtn;
    }
    .item-right {
      width: 620px;
      font-size: 12px;
      .item-title {
        font-size: 20px;
        margin-bottom: 4px;
        color: #246cf6;
      }
      .item-time {
        margin-bottom: 16px;
      }
    }
  }
</style>
