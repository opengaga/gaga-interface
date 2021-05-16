import { useBlockNumber } from '@/state/application/hooks'
import { ERC20 } from '@/vvm/contracts/ERC20'
import { BigNumber } from '@ethersproject/bignumber'
import { ref, Ref, watch } from '@vue/runtime-core'
import { useWallet } from './useWallet'

export const useBalance = (account?: Ref<string | null | undefined>) => {
  const { getProvider } = useWallet()
  const balance = ref<BigNumber>(BigNumber.from('0'))
  const blockNumber = useBlockNumber()

  watch(
    [() => account?.value, () => getProvider(), () => blockNumber?.value],
    ([account, provider]) => {
      if (account && provider) {
        provider.getBalance(account).then((_balance) => {
          balance.value = _balance
        })
      }
    }
  )

  return balance
}

export const useErc20Balance = (
  address?: Ref<string | null | undefined>,
  account?: Ref<string | null | undefined>
) => {
  const { getProvider } = useWallet()
  const balance = ref<BigNumber>(BigNumber.from('0'))
  const blockNumber = useBlockNumber()

  watch(
    [() => address?.value, () => account?.value, () => getProvider(), () => blockNumber?.value],
    ([address, account, provider]) => {
      if (address && account && provider) {
        const erc20 = new ERC20(address, provider)

        erc20.balanceOf(account).then((value) => {
          balance.value = value
        })
      }
    }
  )

  return balance
}
