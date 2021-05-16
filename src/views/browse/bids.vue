<template>
  <div class="carousel-wrap">
    <a-carousel arrows :dots="false">
      <template #nextArrow>
        <div class="custom-slick-arrow">
          <img class="right-arow" src="@/assets/imgs/learn-arow.svg" alt="" />
        </div>
      </template>
      <div v-for="(items, idx) in result" :key="idx"
        ><bid-cell v-for="(item, id) in items" :key="id"
      /></div>
    </a-carousel>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, onMounted, onUnmounted } from 'vue'
  import bidCell from '@/components/browse/bid-cell.vue'
  import { useApi } from '@/hooks/useApi'
  import { useList } from '@/hooks/useList'
  import { useCarsoul } from '@/hooks/useCarsoul'
  import { ItemType } from '@/api/types'
  export default defineComponent({
    components: { bidCell },
    setup() {
      const selectedExpolre = ref(1)
      const expolreTags = ref(['ALL', 'Art', 'Photo', 'Games', 'Music'])
      const api = useApi()
      const listArray = new Array(10)
      let result: any = ref([])
      let width = ref(0)
      function onResize() {
        width.value = document.body.offsetWidth
        if (width.value > 750) {
          result.value = useCarsoul(listArray, 5)
        } else {
          result.value = useCarsoul(listArray, 2)
        }
      }

      onMounted(() => {
        window.addEventListener('resize', onResize)
        onResize()
      })

      onUnmounted(() => {
        window.removeEventListener('resize', onResize)
      })

      const { list, loadMore } = useList<ItemType>(1, 20, (page, size) =>
        api.getItems({ page, size }).then((res) => {
          return res.list
        })
      )

      return {
        result,
        selectedExpolre,
        expolreTags,
        list,
        loadMore
      }
    }
  })
</script>
<style lang="scss">
  .carousel-wrap {
    white-space: nowrap;
  }

  .custom-slick-arrow {
    right: 6px !important;
    transform: translateY(-86%);
    img {
      width: 50px;
    }
  }

  .ant-carousel :deep(.slick-slide) {
    text-align: center;
    height: 160px;
    line-height: 160px;
    background: #364d79;
    overflow: hidden;
  }

  .ant-carousel :deep(.slick-slide h3) {
    color: #fff;
  }
  .ant-carousel .slick-list .slick-slide {
    background-color: $globalBackground;
  }
</style>
