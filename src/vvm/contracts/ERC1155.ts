import type { Signer } from '@ethersproject/abstract-signer'
import type { Provider } from '@ethersproject/abstract-provider'

import { BigNumber, BytesLike } from 'ethers'
import { TransactionResponse } from '@ethersproject/providers'
import { hexValue } from '@ethersproject/bytes'
import ABI from '../abis/ERC1155.json'
import { BaseContract } from './base'
import { callMethod } from '../utils'

class ERC1155 extends BaseContract {
  #isReadyPromise: Promise<ERC1155>

  constructor(address: string, provider: Signer | Provider, abi = ABI) {
    super(address, provider, abi)

    this.#isReadyPromise = Promise.resolve(this)
  }

  get isReady(): Promise<ERC1155> {
    return this.#isReadyPromise
  }

  uri(tokenId: BigNumber): Promise<string> {
    return this.contract.uri(tokenId)
  }

  balanceOf(account: string, id: BigNumber): Promise<BigNumber> {
    return this.contract.balanceOf(account, id)
  }

  isApprovedForAll(account: string, operator: string): Promise<boolean> {
    return this.contract.isApprovedForAll(account, operator)
  }

  setApprovalForAll(operator: string, approved: boolean): Promise<TransactionResponse> {
    return callMethod(this.contract, 'setApprovalForAll', operator, approved)
  }

  safeTransferFrom(
    from: string,
    to: string,
    id: BigNumber,
    amount: BigNumber,
    data: BytesLike = hexValue([])
  ): Promise<TransactionResponse> {
    return callMethod(this.contract, 'safeTransferFrom', from, to, id, amount, data)
  }
}

export { ERC1155 }
