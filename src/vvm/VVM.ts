import type { TransactionResponse } from '@ethersproject/providers'

import { Provider } from '@ethersproject/providers'
import { Signer } from '@ethersproject/abstract-signer'

import { BigNumber, Contract, Signature } from 'ethers'

import { deployments } from './constants'
import { AssetType, FeeType } from './types'

import { VVMToken } from './contracts/VVMToken'
import { MintableToken } from './contracts/MintabeToken'
import { ExchangeV1 } from './contracts/ExchangeV1'
import Order from './Order'
import { Miner } from './contracts/Miner'
import { ERC20 } from './contracts/ERC20'

class VVM {
  public erc20TransferProxyAddress: string
  public transferProxyAddress: string
  public transferProxyForDeprecatedAddress: string
  public tokenAddress: string

  public vvmToken: VVMToken
  public mintableToken: MintableToken
  public exchangeV1: ExchangeV1
  public token: ERC20

  public miner: Miner

  public provider: Provider

  constructor(_provider: Provider) {
    this.provider = _provider

    this.erc20TransferProxyAddress = deployments.ERC20TransferProxy
    this.transferProxyAddress = deployments.TransferProxy
    this.transferProxyForDeprecatedAddress = deployments.TransferProxyForDeprecated
    this.tokenAddress = deployments.Token

    this.vvmToken = new VVMToken(deployments.VVMToken, _provider)
    this.mintableToken = new MintableToken(deployments.MintableToken, _provider)
    this.exchangeV1 = new ExchangeV1(deployments.ExchangeV1, _provider)
    this.token = new ERC20(deployments.Token, _provider)

    this.miner = new Miner(_provider)
  }

  connect(signerOrProvider: Signer | Provider): void {
    this.vvmToken.connect(signerOrProvider)
    this.mintableToken.connect(signerOrProvider)
    this.exchangeV1.connect(signerOrProvider)
    this.miner.connect(signerOrProvider)
  }

  public async approve(
    contract: Contract,
    asset: AssetType.ERC20,
    amount: BigNumber
  ): Promise<TransactionResponse>
  public async approve(
    contract: Contract,
    asset: AssetType.ERC1155 | AssetType.ERC721 | AssetType.ERC721Deprecated,
    approve: boolean
  ): Promise<TransactionResponse>
  public async approve(
    contract: Contract,
    asset: AssetType,
    amountOrApprove: boolean | BigNumber
  ): Promise<TransactionResponse> {
    let operator: string
    if (asset === AssetType.ERC1155 || asset === AssetType.ERC721) {
      operator = this.transferProxyAddress
    } else if (asset === AssetType.ERC721Deprecated) {
      operator = this.transferProxyForDeprecatedAddress
    } else if (asset === AssetType.ERC20) {
      operator = this.erc20TransferProxyAddress
    } else {
      throw new Error(`Not support AssetType ${asset}`)
    }

    if (typeof amountOrApprove === 'boolean') {
      return contract.setApprovalForAll(operator, amountOrApprove)
    } else {
      return contract.approve(operator, amountOrApprove)
    }
  }

  public async isApproved(
    contract: Contract,
    asset: AssetType.ERC20,
    account: string,
    amount: BigNumber
  ): Promise<boolean>
  public async isApproved(
    contract: Contract,
    asset: AssetType.ERC1155 | AssetType.ERC721 | AssetType.ERC1155,
    account: string
  ): Promise<boolean>
  public async isApproved(
    contract: Contract,
    asset: AssetType,
    account: string,
    amount?: BigNumber
  ): Promise<boolean> {
    let operator: string
    if (asset === AssetType.ERC1155 || asset === AssetType.ERC721) {
      operator = this.transferProxyAddress
    } else if (asset === AssetType.ERC721Deprecated) {
      operator = this.transferProxyForDeprecatedAddress
    } else if (asset === AssetType.ERC20) {
      operator = this.erc20TransferProxyAddress
    } else {
      throw new Error(`Not support AssetType ${asset}`)
    }

    if (amount) {
      const allowance: BigNumber = await contract.allowance(account, operator)
      return allowance.gte(amount)
    } else {
      const isApproval: boolean = await contract.isApprovedForAll(account, operator)
      return isApproval
    }
  }

  public async exchange(
    order: Order,
    signature: Signature | string,
    buyFee: BigNumber,
    buyFeeSignature: Signature | string,
    amount: BigNumber,
    account: string
  ): Promise<TransactionResponse> {
    return this.exchangeV1.exchange(
      order.toJson(),
      signature,
      buyFee,
      buyFeeSignature,
      amount,
      account
    )
  }

  public async mintErc721(
    tokenId: BigNumber,
    signature: Signature | string,
    fees: FeeType[],
    uri: string
  ): Promise<TransactionResponse> {
    return this.mintableToken.mint(tokenId, signature, fees, uri)
  }

  public async mintErc1155(
    tokenId: BigNumber,
    signature: Signature | string,
    fees: FeeType[],
    amount: BigNumber,
    uri: string
  ): Promise<TransactionResponse> {
    return this.vvmToken.mint(tokenId, signature, fees, amount, uri)
  }
}

export { VVM }
