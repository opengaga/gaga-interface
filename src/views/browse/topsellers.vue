<template>
  <div class="dropdown-wrap">
    <a-dropdown :trigger="['click']" class="menu-link">
      <a class="ant-dropdown-link" @click.prevent>
        Top <span class="top-filter">{{ topStr }}</span>
        <DownOutlined />
      </a>
      <template #overlay>
        <a-menu>
          <a-menu-item key="0" class="com-link">
            <a href="javascript:;" @click="setTop('seller')"> sellers</a>
          </a-menu-item>
          <a-menu-item key="0" class="com-link">
            <a href="javascript:;" @click="setTop('buyer')"> buyers</a>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
    <a-dropdown :trigger="['click']" class="menu-link">
      <a class="ant-dropdown-link" @click.prevent>
        in <span class="top-filter">{{ topDay }}</span> days
        <DownOutlined />
      </a>
      <template #overlay>
        <a-menu>
          <a-menu-item key="0" class="com-link">
            <a href="javascript:;" @click="setDay('1')">1 weeks</a>
          </a-menu-item>
          <a-menu-item key="0" class="com-link">
            <a href="javascript:;" @click="setDay('7')">7 weeks</a>
          </a-menu-item>
          <a-menu-item key="0" class="com-link">
            <a href="javascript:;" @click="setDay('30')">30 weeks</a>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
  <div class="sellers-items">
    <sellCell v-for="(item, idx) in sellersList" :key="idx" :data="item" :index="idx" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, watchEffect } from 'vue'
  import { DownOutlined } from '@ant-design/icons-vue'
  import sellCell from '@/components/browse/sell-cell.vue'
  import { useApi } from '@/hooks/useApi'

  export default defineComponent({
    components: { DownOutlined, sellCell },
    setup() {
      const api = useApi()
      const topStr = ref<string>('seller')
      const topDay = ref<string>('1')
      const sellersList = ref([])
      const setTop = (str: string) => {
        topStr.value = str
      }
      const setDay = (str: string) => {
        topDay.value = str
      }

      watchEffect(() => {
        api
          .topUser({ user: topStr.value })
          .then((res: any): void => {
            sellersList.value = res.list
          })
          .catch((err) => {
            console.log(err.msg)
          })
      })

      return {
        sellersList,
        setTop,
        topStr,
        topDay,
        setDay
      }
    }
  })
</script>
<style lang="scss">
  .dropdown-wrap {
    margin-top: 20px;

    .menu-link {
      color: #fff;
      font-size: 20px;
      font-weight: 500;
      margin-right: 30px;
    }
  }
  .top-filter {
    color: $fontIconBtn;
  }
  .sellers-items {
    width: 100%;
    display: flex;
    max-height: 210px;
    overflow-x: scroll;
    flex-wrap: wrap;
    margin: 40px auto;
    flex-direction: column;
    justify-content: flex-start;
  }
</style>
