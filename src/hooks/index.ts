import { isMobile } from 'mobile-device-detect'
import { injectedConnector } from '@/connectors'
import { ref } from '@vue/reactivity'
import { watchEffect } from '@vue/runtime-core'
import { useWallet } from './useWallet'

export function useEagerConnect() {
  const { active, activate } = useWallet()

  const tried = ref(false)

  watchEffect(() => {
    injectedConnector.isAuthorized().then((isAuthorized) => {
      if (isAuthorized) {
        activate?.(injectedConnector, true).catch(() => {
          tried.value = true
        })
      } else {
        if (isMobile && window.ethereum) {
          activate?.(injectedConnector, true).catch(() => {
            tried.value = true
          })
        } else {
          tried.value = true
        }
      }
    })
  }) // intentionally only running on mount (make sure it's only mounted once :))

  // if the connection worked, wait until we get confirmation of that to flip the flag
  watchEffect(() => {
    if (active) {
      tried.value = true
    }
  })

  return tried
}
