import { Ref, ref } from '@vue/reactivity'
import { computed, watchEffect } from '@vue/runtime-core'

interface FetchFunc<T> {
  (page: number, address: string): Promise<T[]>
}

export const useFollowList = <T>(_page = 1, _address = '', fetch: FetchFunc<T>) => {
  const list: Ref<T[]> = ref([])
  const page = ref(_page)
  const address = ref(_address)
  const total = ref(0)

  watchEffect(() => {
    fetch(page.value, address.value).then((data) => {
      list.value.push(...data)
    })
  })

  const loadMore = async () => {
    page.value++
  }
  const count = computed(() => list.value.length)

  return {
    list,
    page,
    address,
    total,
    count,
    loadMore
  }
}
