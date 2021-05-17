<template>
  <div class="wrapper">
    <div v-if="owner" key="owner" class="item">
      <h6>Owner</h6>
      <address-cell :address="owner" />
    </div>
    <div v-for="(item, idx) of properties" :key="idx" class="item">
      <h6>{{ item.key }}</h6>
      <p>{{ item.value }}</p>
    </div>
  </div>
</template>
<script lang="ts">
  import { computed, defineComponent } from 'vue'
  import AddressCell from './address-cell.vue'

  export default defineComponent({
    components: {
      AddressCell
    },
    props: {
      owner: {
        type: String
      },
      attributes: {
        type: Object
      }
    },
    setup(props) {
      const properties = computed<{ key: string; value: string }[]>(() => {
        if (!props.attributes) {
          return []
        }

        const _properties: { key: string; value: string }[] = []

        for (const key in props.attributes) {
          console.log(key)
          _properties.push({ key, value: props.attributes[key] })
        }

        return _properties
      })

      return { properties }
    }
  })
</script>
<style scoped lang="scss">
  .item {
    margin: 0 0 20px 0;

    h6 {
      margin: 0 0 10px 0;

      font-size: 14px;
      font-weight: 400;
      line-height: 25px;
      color: #fff;
    }

    :deep p {
      display: flex;
      justify-content: space-between;
      align-items: center;

      font-size: 12px;
      font-weight: bold;
      line-height: 16px;
      color: #246cf6;
    }
  }
</style>
