import { Ref, ref } from '@vue/reactivity'
import { computed, watchEffect } from '@vue/runtime-core'

interface FetchFunc<T> {
  (page: number, size: number): Promise<{ data: T[]; total: number }>
}

export const useList = <T>(_page = 1, _size = 10, fetch: FetchFunc<T>) => {
  const list: Ref<T[]> = ref([])
  const page = ref(_page)
  const size = ref(_size)
  const total = ref(0)
  const hasMore = ref(true)
  const loading = ref(false)

  watchEffect(() => {
    const _page = page.value
    const _size = size.value
    loading.value = true
    fetch(_page, _size)
      .then(({ data, total }) => {
        if (_page * _size >= total) {
          hasMore.value = false
        }
        list.value.push(...data)
      })
      .finally(() => {
        loading.value = false
      })
  })

  const loadMore = async () => {
    if (hasMore.value) {
      page.value++
    }
  }
  const count = computed(() => list.value.length)

  return {
    list,
    page,
    size,
    total,
    count,
    loadMore,
    loading
  }
}
