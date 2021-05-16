import type { ActivateFunc, Web3ReactManagerState } from '@/components/wallet/types'
import { defaultProvider } from '@/utils/constants'
import { Signer } from '@ethersproject/abstract-signer'
import type { Provider } from '@ethersproject/providers'

import { ComputedRef, ToRefs } from '@vue/reactivity'

import { inject } from 'vue'

export const useWallet = () => {
  const state = inject<ToRefs<Web3ReactManagerState>>(
    'wallet-state',
    {} as ToRefs<Web3ReactManagerState>
  )
  const active = inject<ComputedRef<boolean>>('wallet-active')
  const activate = inject<ActivateFunc>('wallet-activate')
  const getProvider = inject<() => Provider>('wallet-get-provider', () => defaultProvider)
  const getSigner = inject<() => Signer | null>('wallet-get-signer', () => null)

  return {
    ...state,
    getProvider,
    getSigner,
    activate,
    active
  }
}
