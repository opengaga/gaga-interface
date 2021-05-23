<template>
  <div class="user-card" @click="$emit('select')">
    <address-image class="user-avatr" :src="owner.user_address" />
    <div class="user-info">
      <div v-if="owner.saleable === 1" class="user-info-title">
        Put on sale {{ owner.own_supply }} editions for
        <span class="user-charge"><format-balance :balance="owner.sale_price" /></span>
      </div>
      <div v-else class="user-info-title"> Not for sale {{ owner.own_supply }} editions </div>
      <a-tooltip>
        <template #title>{{ owner.user_address }}</template>
        <div class="user-info-desc">
          <shorten-address :address="owner.user_address" />
        </div>
      </a-tooltip>
    </div>
  </div>
</template>
<script lang="ts">
  import { Owner } from '@/api/types'
  import { defineComponent, PropType } from 'vue'
  import AddressImage from './image/address-image'

  export default defineComponent({
    components: {
      AddressImage
    },
    props: {
      owner: {
        type: Object as PropType<Owner>,
        required: true
      }
    }
  })
</script>
<style scoped lang="scss">
  .bord {
    border-bottom: 1px solid #fff;
  }
  .user-card {
    width: 350px;
    display: flex;
    align-items: center;
    font-size: 14px;
    padding: 16px 0;

    cursor: pointer;

    :deep .user-avatr {
      width: 40px;
      height: 40px;
      margin-right: 16px;
      border-radius: 50%;
    }
    .user-info {
      width: 100%;

      overflow: hidden;

      &-title {
        margin-bottom: 6px;
      }
      .user-charge {
        font-weight: bold;
      }
      &-desc {
        font-size: 12px;
        color: #246cf6;

        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
</style>
