import type { BigNumber } from '@ethersproject/bignumber'

export enum AssetType {
  ETH = 1,
  ERC20 = 2,
  ERC1155 = 3,
  ERC721 = 4,
  ERC721Deprecated = 5
}

export type Asset = {
  token: string
  tokenId: BigNumber
  assetType: AssetType
}

export type OrderKey = {
  owner: string
  salt: BigNumber
  sellAsset: Asset
  buyAsset: Asset
}

export interface OrderType {
  key: OrderKey
  selling: BigNumber
  buying: BigNumber
  sellerFee: BigNumber
}

export interface SequenceOrderType {
  key: {
    salt: string
    owner: string
    sellAsset: {
      token: string
      tokenId: string
      assetType: AssetType
    }
    buyAsset: {
      token: string
      tokenId: string
      assetType: AssetType
    }
  }
  selling: string
  buying: string
  sellerFee: string
}

export interface FeeType {
  recipient: string
  value: number
}
