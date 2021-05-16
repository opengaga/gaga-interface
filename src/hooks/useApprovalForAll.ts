import { Contract } from '@ethersproject/contracts'
import { ref, watchEffect } from '@vue/runtime-core'
import { useWallet } from './useWallet'
import approval from '@/vvm/abis/approval.json'

export const useApprovalForAll = (address: string, operator: string, approved = true) => {
  const { getProvider, getSigner, account } = useWallet()

  let contract = new Contract(address, approval, getProvider())
  const isApprovalForAll = ref<boolean>(false)

  const getApproval = () => {
    if (account?.value) {
      contract.isApprovedForAll(account.value, operator).then((value) => {
        isApprovalForAll.value = value
      })
    }
  }

  watchEffect(() => {
    const signer = getSigner()

    if (signer) {
      contract = new Contract(address, approval, signer)
    }
  })

  watchEffect(() => {
    getApproval()
  })

  const setApprovalForAll = async () => {
    const transaction = await contract.setApprovalForAll(operator, approved)

    await transaction.wait()

    await getApproval()

    return transaction
  }

  return {
    isApprovalForAll,
    getApproval,
    setApprovalForAll
  }
}
