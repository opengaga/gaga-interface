import type { Ref } from '@vue/reactivity'

export type RefObj<T> = {
  [P in keyof T]-?: Ref<T[P]>
}
