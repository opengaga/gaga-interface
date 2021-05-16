import type { TransactionResponse, Web3Provider } from '@ethersproject/providers'

import { tokens } from '@/utils/constants'
import { BigNumber } from '@ethersproject/bignumber'
import { Contract } from '@ethersproject/contracts'
import { useWallet } from './useWallet'
import { parseEther } from '@ethersproject/units'

const abi = [
  {
    constant: false,
    inputs: [{ name: 'wad', type: 'uint256' }],
    name: 'withdraw',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [],
    name: 'deposit',
    outputs: [],
    payable: true,
    stateMutability: 'payable',
    type: 'function'
  }
]

export const useWethDepositCallback = () => {
  const { active, getProvider } = useWallet()

  // amount unit is wei
  const deposit = async (amount: number) => {
    if (!active?.value) {
      return
    }

    const contract = new Contract(tokens.weth, abi, (getProvider() as Web3Provider).getSigner())

    const transaction: TransactionResponse = await contract.deposit({
      value: parseEther(amount.toString())
    })

    return transaction
  }
  return { deposit }
}

// amount unit is eth
export const useWethWithdrawCallback = () => {
  const { active, getProvider } = useWallet()

  // amount unit is wei
  const withdraw = async (amount: BigNumber) => {
    if (!active?.value) {
      return
    }

    const contract = new Contract(tokens.weth, abi, (getProvider() as Web3Provider).getSigner())

    const transaction: TransactionResponse = await contract.withdraw(amount)

    return transaction
  }
  return { withdraw }
}
