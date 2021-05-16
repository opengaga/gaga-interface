import type { Signer } from '@ethersproject/abstract-signer'
import type { Provider } from '@ethersproject/abstract-provider'
import type { FeeType } from '../types'

import ABI from '../abis/VVMToken.json'
import { ERC1155 } from './ERC1155'
import { BigNumber } from '@ethersproject/bignumber'
import { splitSignature } from '@ethersproject/bytes'
import { TransactionResponse } from '@ethersproject/providers'
import { Signature } from 'ethers'
import { callMethod } from '../utils'

class VVMToken extends ERC1155 {
  constructor(address: string, provider: Signer | Provider) {
    super(address, provider, ABI)
  }

  mint(
    tokenId: BigNumber,
    signature: Signature | string,
    fees: FeeType[],
    amount: BigNumber,
    uri: string
  ): Promise<TransactionResponse> {
    signature = typeof signature === 'string' ? splitSignature(signature) : signature

    return callMethod(
      this.contract,
      'mint',
      tokenId,
      signature.v,
      signature.r,
      signature.s,
      fees,
      amount,
      uri
    )
  }
}

export { VVMToken }
