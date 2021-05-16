import type { Signer } from '@ethersproject/abstract-signer'
import type { Provider } from '@ethersproject/abstract-provider'
import { Signature, splitSignature } from '@ethersproject/bytes'
import type { TransactionResponse } from '@ethersproject/providers'

import { AssetType, OrderType } from '../types'

import { BigNumber } from '@ethersproject/bignumber'
import { BaseContract } from './base'
import ABI from '../abis/ExchangeV1.json'
import { callMethod } from '../utils'

class ExchangeV1 extends BaseContract {
  #isReadyPromise: Promise<ExchangeV1>

  constructor(address: string, provider: Signer | Provider) {
    super(address, provider, ABI)

    this.#isReadyPromise = Promise.resolve(this)
  }

  get isReady(): Promise<ExchangeV1> {
    return this.#isReadyPromise
  }

  async exchange(
    order: OrderType,
    signature: Signature | string,
    buyFee: BigNumber,
    buyFeeSignature: Signature | string,
    amount: BigNumber,
    account: string
  ): Promise<TransactionResponse> {
    const paying: BigNumber = order.buying
      .mul(amount)
      .div(order.selling)
      .mul(BigNumber.from(10000).add(buyFee))
      .div(BigNumber.from(10000))

    const options: Record<string, any> = {}
    if (order.key.buyAsset.assetType === AssetType.ETH) {
      options.value = paying
    }

    return callMethod(
      this.contract,
      'exchange',
      order,
      typeof signature === 'string' ? splitSignature(signature) : signature,
      buyFee,
      typeof buyFeeSignature === 'string' ? splitSignature(buyFeeSignature) : buyFeeSignature,
      amount,
      account,
      options
    )
  }
}

export { ExchangeV1 }
