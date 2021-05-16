import { VVM } from '@/vvm/VVM'
import { defaultProvider } from '@/utils/constants'
import { Web3Provider } from '@ethersproject/providers'
import { useWallet } from './useWallet'
import { watchEffect } from '@vue/runtime-core'

const vvm = new VVM(defaultProvider)

export const useVVM = (): VVM => {
  const { active, getProvider } = useWallet()

  watchEffect(() => {
    if (active?.value) {
      vvm.connect((getProvider() as Web3Provider).getSigner())
    } else {
      vvm.connect(defaultProvider)
    }
  })

  return vvm
}
