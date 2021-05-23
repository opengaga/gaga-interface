import { useBlockNumber } from '@/state/application/hooks'
import { ERC20 } from '@/vvm/contracts/ERC20'
import { BigNumber } from '@ethersproject/bignumber'
import { ref, Ref, watch, watchEffect } from '@vue/runtime-core'
import { useWallet } from './useWallet'

export const useBalance = (account?: Ref<string | null | undefined>) => {
  const { getProvider } = useWallet()
  const balance = ref<BigNumber>(BigNumber.from('0'))
  const blockNumber = useBlockNumber()

  watchEffect(() => {
    blockNumber
    const provider = getProvider()

    if (account?.value && provider) {
      provider.getBalance(account.value).then((_balance) => {
        balance.value = _balance
      })
    }
  })

  return balance
}

export const useErc20Balance = (
  address?: Ref<string | null | undefined>,
  account?: Ref<string | null | undefined>
) => {
  const { getProvider } = useWallet()
  const balance = ref<BigNumber>(BigNumber.from('0'))
  const blockNumber = useBlockNumber()

  watchEffect(() => {
    blockNumber
    const provider = getProvider()

    if (address?.value && account?.value && provider) {
      const erc20 = new ERC20(address.value, provider)

      erc20.balanceOf(account.value).then((value) => {
        balance.value = value
      })
    }
  })

  return balance
}
