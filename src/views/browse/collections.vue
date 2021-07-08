<template>
  <div class="collect-wrap">
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
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, onMounted, onUnmounted } from 'vue'
  import { useCarsoul } from '@/hooks/useCarsoul'
  import { useApi } from '@/hooks/useApi'
  import bidCell from '@/components/browse/bid-cell.vue'

  export default defineComponent({
    components: { bidCell },
    setup() {
      const listArray = new Array(10)
      let list: any = ref([])
      let width = ref(0)
      const api = useApi()
      api
        .collectionTop()
        .then((res: any) => {
          if (res.list) {
            list.value = res.list
          }
        })
        .catch((err) => {
          console.log(err.msg)
        })
      const onResize = () => {
        width.value = document.body.offsetWidth
        if (width.value > 750) {
          list.value = useCarsoul(listArray, 5)
        } else {
          list.value = useCarsoul(listArray, 3)
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
        list
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
