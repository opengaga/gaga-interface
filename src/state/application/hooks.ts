import { inject, Ref } from '@vue/runtime-core'

export const useBlockNumber = () => {
  const blockNumber = inject<Ref<number>>('application-blockNumber')

  return blockNumber
}
