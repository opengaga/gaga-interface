<template>
  <div class="hotbids-wrap">
    <div class="item-title">
      Expolre <img src="@/assets/imgs/expolre.svg" />
      <a-button
        v-for="(item, idx) in expolreTags"
        :key="idx"
        :class="['expolre-btns', selectedExpolre === idx ? 'selected-expolre' : '']"
        @click="selectedExpolre = idx"
        ><template #icon> <img src="@/assets/imgs/starB.svg" /> </template>{{ item }}</a-button
      >
      <a-button
        :class="['expolre-btns', selectedExpolre === 6 ? 'selected-expolre' : '']"
        @click="selectedExpolre = 6"
      >
        <template #icon> <SortAscendingOutlined /></template>Filter&Sort
      </a-button>
    </div>
    <a-row type="flex" class="expolre-cnt" :gutter="[16, 16]">
      <a-col
        v-for="(item, idx) in list"
        :key="idx"
        :xs="24"
        :sm="12"
        :md="8"
        :lg="6"
        :xl="4"
        :xxl="4"
      >
        <bid-cell :data="item" />
      </a-col>
    </a-row>
    <scroll-view @load-more="loadMore" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import bidCell from '@/components/browse/bid-cell.vue'
  import { SortAscendingOutlined } from '@ant-design/icons-vue'
  import { useApi } from '@/hooks/useApi'
  import { useList } from '@/hooks/useList'
  import { ItemType } from '@/api/types'
  import ScrollView from '@/components/scroll-view.vue'

  export default defineComponent({
    components: { bidCell, SortAscendingOutlined, ScrollView },
    setup() {
      const selectedExpolre = ref(1)
      const expolreTags = ref(['ALL', 'Art', 'Photo', 'Games', 'Music'])
      const api = useApi()

      const { list, loadMore } = useList<ItemType>(1, 20, (page, size) =>
        api.getItems({ page, size }).then((res) => {
          return res.list
        })
      )

      return {
        selectedExpolre,
        expolreTags,
        list,
        loadMore
      }
    }
  })
</script>
<style lang="scss" scoped>
  @import './index.scss';

  .expolre-cnt {
    display: flex;
    flex-wrap: wrap;
    align-content: center;
  }
</style>
