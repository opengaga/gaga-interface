import { Ref, ref } from '@vue/reactivity'
import { computed, watchEffect } from '@vue/runtime-core'

interface FetchFunc<T> {
  (page: number, size: number): Promise<T[]>
}

export const useList = <T>(_page = 1, _size = 10, fetch: FetchFunc<T>) => {
  const list: Ref<T[]> = ref([])
  const page = ref(_page)
  const size = ref(_size)
  const total = ref(0)
  const hasMore = ref(true)

  watchEffect(() => {
    if (hasMore.value) {
      fetch(page.value, size.value).then((data) => {
        if (data.length === 0) {
          hasMore.value = false
        }
        list.value.push(...data)
      })
    }
  })

  const loadMore = async () => {
    page.value++
  }
  const count = computed(() => list.value.length)

  return {
    list,
    page,
    size,
    total,
    count,
    loadMore
  }
}
