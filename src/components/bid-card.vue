<template>
  <div class="user-card">
    <address-image class="user-avatr" :src="user" />
    <div class="user-info">
      <div class="user-info-title">
        <span class="user-charge"><format-balance :balance="balance" /></span>
      </div>
      <div class="user-info-desc">
        <div>
          By <span class="money-num"><shorten-address :address="user" /></span>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { BigNumber } from '@ethersproject/bignumber'
  import { defineComponent, PropType } from 'vue'
  import AddressImage from './image/address-image'

  export default defineComponent({
    props: {
      user: String,
      balance: [String, Object] as PropType<string | BigNumber>
    },
    components: {
      AddressImage
    },
    setup(props) {
      return { props }
    }
  })
</script>
<style scoped lang="scss">
  .bord {
    border-bottom: 1px solid #fff;
  }
  .user-card {
    display: flex;
    width: 350px;
    font-size: 14px;
    padding: 16px 0;
    align-content: center;

    .user-avatr {
      width: 40px;
      height: 40px;
      margin-right: 16px;
      border-radius: 50%;
    }
    .user-info {
      width: 100%;

      &-title {
        margin-bottom: 6px;
      }
      .user-charge {
        font-weight: bold;
      }
      &-desc {
        font-size: 12px;
        .money-num {
          font-weight: bold;
        }
        .user-number {
          color: #246cf6;
          width: 150px;
          display: inline-block;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          vertical-align: text-top;
        }
      }
    }
  }
</style>
