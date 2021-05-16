<template>
  <div style="height: 1px" ref="ele" />
</template>
<script lang="ts">
  import { useScroll } from '@/hooks/useScroll'
  import { defineComponent, ref, watchEffect } from 'vue'

  function isInViewPort(el: HTMLElement) {
    const viewPortHeight =
      window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    const top = el.getBoundingClientRect() && el.getBoundingClientRect().top

    return top <= viewPortHeight + 100
  }

  export default defineComponent({
    name: 'wallet-provide',
    props: {
      loading: Boolean
    },
    setup(props: { loading: boolean }, context) {
      const ele = ref<HTMLDivElement | null>(null)
      const state = useScroll()

      watchEffect(async () => {
        state.scrollTop
        if (ele.value && isInViewPort(ele.value) && !props.loading) {
          context.emit('load-more')
        }
      })

      return {
        ele
      }
    }
  })
</script>
