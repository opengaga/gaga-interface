<template>
  <slot></slot>
</template>
<script lang="ts">
  import { reactive } from '@vue/reactivity'
  import { defineComponent, onBeforeUnmount, onMounted, provide } from 'vue'

  import { ScrollState } from './types'

  const getScrollTop = () => {
    return Math.max(document.body.scrollTop, document.documentElement.scrollTop)
  }

  const getScrollLeft = () => {
    return Math.max(document.body.scrollLeft, document.documentElement.scrollLeft)
  }

  export default defineComponent({
    name: 'wallet-provide',
    setup() {
      const state = reactive<ScrollState>({
        scrollTop: 0,
        scrollLeft: 0,
        scrollTopOffset: 0,
        scrollLeftOffset: 0
      })

      const onScroll = () => {
        const _scrollTop = getScrollTop()
        const _scrollLeft = getScrollLeft()

        state.scrollTopOffset = _scrollTop - state.scrollTop
        state.scrollLeftOffset = _scrollLeft - state.scrollLeft

        state.scrollTop = _scrollTop
        state.scrollLeft = _scrollLeft
      }

      onMounted(() => {
        window.addEventListener('scroll', onScroll)
      })

      onBeforeUnmount(() => {
        window.removeEventListener('scroll', onScroll)
      })

      provide('scroll-state', state)
    }
  })
</script>
