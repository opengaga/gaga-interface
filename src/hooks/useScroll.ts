import { ScrollState } from '@/components/types'
import { inject } from '@vue/runtime-core'

export const useScroll = (): ScrollState => {
  const state = inject<ScrollState>('scroll-state', {
    scrollTop: 0,
    scrollLeft: 0,
    scrollTopOffset: 0,
    scrollLeftOffset: 0
  })

  return state
}
