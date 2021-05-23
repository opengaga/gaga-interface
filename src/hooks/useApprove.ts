import { Contract } from '@ethersproject/contracts'
import { computed, Ref, ref, watchEffect } from '@vue/runtime-core'
import { useWallet } from './useWallet'
import ERC20_ABI from '@/vvm/abis/ERC20.json'
import { UINT256_MAX } from '@/utils/constants'
import { BigNumber } from '@ethersproject/bignumber'
import { useBlockNumber } from '@/state/application/hooks'

export const useApprove = (
  address: Ref<string>,
  spender: Ref<string>,
  amount = ref(UINT256_MAX.div(BigNumber.from(2)))
) => {
  const { getProvider, getSigner, account } = useWallet()

  let contract = new Contract(address.value, ERC20_ABI, getProvider())
  const allowance = ref<BigNumber>(BigNumber.from('0'))
  const blockNumber = useBlockNumber()

  const isApproved = computed(() => allowance.value.gte(amount.value))

  watchEffect(() => {
    const signer = getSigner()

    if (signer) {
      contract = new Contract(address.value, ERC20_ABI, signer)
    }
  })

  watchEffect(() => {
    if (!account?.value) {
      return
    }

    blockNumber
    contract.allowance(account.value, spender.value).then((_allowance: BigNumber) => {
      allowance.value = _allowance
    })
  })

  const approve = async () => {
    const transaction = await contract.approve(spender.value, UINT256_MAX)

    await transaction.wait()

    return transaction
  }

  return {
    allowance,
    isApproved,
    approve
  }
}
