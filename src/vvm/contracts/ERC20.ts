import type { Signer } from '@ethersproject/abstract-signer'
import type { Provider } from '@ethersproject/abstract-provider'

import { BigNumber } from 'ethers'
import { TransactionResponse } from '@ethersproject/providers'
import { formatUnits } from 'ethers/lib/utils'
import ABI from '../abis/ERC20.json'
import { BaseContract } from './base'
import { callMethod } from '../utils'

class ERC20 extends BaseContract {
  #isReadyPromise: Promise<ERC20>

  public symbol: string
  public decimals = 18

  constructor(address: string, provider: Signer | Provider, symbol = '', abi = ABI) {
    super(address, provider, abi)
    this.symbol = symbol

    this.#isReadyPromise = Promise.all([this.contract.symbol(), this.contract.decimals()])
      .then(([symbol, decimals]: [string, number]) => {
        this.symbol = symbol
        this.decimals = decimals
        return this
      })
      .catch((error) => {
        console.error(error)
        return this
      })
  }

  get isReady(): Promise<ERC20> {
    return this.#isReadyPromise
  }

  totalSupply(): Promise<BigNumber> {
    return this.contract.totalSupply()
  }

  balanceOf(account: string): Promise<BigNumber> {
    return this.contract.balanceOf(account)
  }

  transfer(recipient: string, amount: BigNumber): Promise<TransactionResponse> {
    return callMethod(this.contract, 'transfer', recipient, amount)
  }

  allowance(owner: string, spender: string): Promise<BigNumber> {
    return this.contract.allowance(owner, spender)
  }

  approve(spender: string, amount: BigNumber): Promise<TransactionResponse> {
    return callMethod(this.contract, 'approve', spender, amount)
  }

  transferFrom(sender: string, recipient: string, amount: BigNumber): Promise<TransactionResponse> {
    return callMethod(this.contract, 'transferFro', sender, recipient, amount)
  }

  async displayedBalanceOf(account: string): Promise<string> {
    const balance = await this.balanceOf(account)
    return formatUnits(balance, this.decimals)
  }

  async displayedTotalSupply(): Promise<string> {
    const supply = await this.totalSupply()
    return Number(formatUnits(supply, this.decimals)).toFixed(0)
  }
}

export { ERC20 }
