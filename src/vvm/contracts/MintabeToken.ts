import type { Signer } from '@ethersproject/abstract-signer'
import type { Provider } from '@ethersproject/abstract-provider'
import type { FeeType } from '../types'

import ABI from '../abis/MintableToken.json'
import { ERC721 } from './ERC721'
import { BigNumber } from '@ethersproject/bignumber'
import { splitSignature } from '@ethersproject/bytes'
import { TransactionResponse } from '@ethersproject/providers'
import { Signature } from 'ethers'
import { callMethod } from '../utils'

class MintableToken extends ERC721 {
  constructor(address: string, provider: Signer | Provider) {
    super(address, provider, 'MintableToken', ABI)
  }

  mint(
    tokenId: BigNumber,
    signature: Signature | string,
    fees: FeeType[],
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
      uri
    )
  }
}

export { MintableToken }
