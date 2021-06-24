import type { Signer } from '@ethersproject/abstract-signer'
import type { Provider } from '@ethersproject/abstract-provider'

import { BigNumber, BigNumberish, Signature } from 'ethers'
import { TransactionResponse } from '@ethersproject/providers'
import { splitSignature } from 'ethers/lib/utils'
import { BaseContract } from './base'
import ABI from '../abis/Miner.json'
import { deployments } from '../constants'
import { callMethod } from '../utils'

export interface Balance {
  recipient: string
  value: BigNumberish
}

class Miner extends BaseContract {
  #isReadyPromise: Promise<Miner>

  constructor(provider: Signer | Provider) {
    super(deployments.Miner, provider, ABI)

    this.#isReadyPromise = new Promise((resolve) => resolve(this))
  }

  get isReady(): Promise<Miner> {
    return this.#isReadyPromise
  }

  public claim(_balances: Balance[], signature: Signature | string): Promise<TransactionResponse> {
    signature = typeof signature === 'string' ? splitSignature(signature) : signature

    return callMethod(this.contract, 'claim', _balances, signature.v, signature.r, signature.s)
  }

  public claimed(account: string): Promise<BigNumber> {
    return this.contract.claimed(account)
  }
}

export { Miner }
