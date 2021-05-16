<template>
  <div class="collect-wrap">
    <a-carousel arrows>
      <template #nextArrow>
        <div class="custom-slick-arrow">
          <img class="right-arow" src="@/assets/imgs/learn-arow.svg" alt="" />
        </div>
      </template>
      <div v-for="(items, idx) in collectionList" :key="idx">
        <collect-cell v-for="(item, index) in items" :collect="item" :key="index" />
      </div>
    </a-carousel>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, onMounted, onUnmounted } from 'vue'
  import collectCell from '@/components/browse/collect-cell.vue'
  import { useCarsoul } from '@/hooks/useCarsoul'
  import { useApi } from '@/hooks/useApi'

  export default defineComponent({
    components: { collectCell },
    setup() {
      const listArray = new Array(10)
      let collectionList: any = ref([])
      let width = ref(0)
      const api = useApi()
      api
        .collectionTop()
        .then((res: any) => {
          if (res.list) {
            collectionList.value = res.list
          }
        })
        .catch((err) => {
          console.log(err.msg)
        })
      const onResize = () => {
        width.value = document.body.offsetWidth
        if (width.value > 750) {
          collectionList.value = useCarsoul(listArray, 5)
        } else {
          collectionList.value = useCarsoul(listArray, 3)
        }
      }

      onMounted(() => {
        window.addEventListener('resize', onResize)
        onResize()
      })

      onUnmounted(() => {
        window.removeEventListener('resize', onResize)
      })

      return {
        collectionList
      }
    }
  })
</script>
<style lang="scss">
  .bold500 {
    font-weight: 600;
    font-size: 14px;
  }
  .collect-wrap {
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
</style>
