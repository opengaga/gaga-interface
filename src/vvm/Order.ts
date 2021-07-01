import type { Asset, OrderKey, OrderType, SequenceOrderType } from './types'

import { BigNumber } from '@ethersproject/bignumber'
import { defaultAbiCoder, ParamType } from '@ethersproject/abi'
import { keccak256 } from '@ethersproject/keccak256'
import { Signer } from 'ethers'
import { randomHex } from '@/utils/crypto'

const defaultFee = BigNumber.from(100)

export const AssetTypeComponents = [
  {
    name: 'token',
    type: 'address'
  },
  {
    name: 'tokenId',
    type: 'uint256'
  },
  {
    name: 'assetType',
    type: 'uint8'
  }
]

export const OrderKeyComponents = [
  {
    name: 'owner',
    type: 'address'
  },
  {
    name: 'salt',
    type: 'uint256'
  },
  {
    components: AssetTypeComponents,
    name: 'sellAsset',
    type: 'tuple'
  },
  {
    components: AssetTypeComponents,
    name: 'buyAsset',
    type: 'tuple'
  }
]

export const OrderComponents = [
  {
    name: 'key',
    type: 'tuple',
    components: OrderKeyComponents
  },
  {
    name: 'selling',
    type: 'uint256'
  },
  {
    name: 'buying',
    type: 'uint256'
  },
  {
    name: 'sellerFee',
    type: 'uint256'
  }
]

export default class Order {
  public key: OrderKey
  public sellAmount: BigNumber
  public buyAmount: BigNumber
  public sellerFee: BigNumber

  public static parse(_order: SequenceOrderType): Order {
    const owner = _order.key.owner
    const sellAsset: Asset = {
      token: _order.key.sellAsset.token,
      tokenId: BigNumber.from(_order.key.sellAsset.tokenId),
      assetType: _order.key.sellAsset.assetType
    }
    const buyAsset: Asset = {
      token: _order.key.buyAsset.token,
      tokenId: BigNumber.from(_order.key.buyAsset.tokenId),
      assetType: _order.key.buyAsset.assetType
    }
    const sellAmount: BigNumber = BigNumber.from(_order.selling)
    const buyAmount: BigNumber = BigNumber.from(_order.buying)
    const sellerFee: BigNumber = BigNumber.from(_order.sellerFee)

    return new Order(owner, sellAsset, buyAsset, sellAmount, buyAmount, _order.key.salt, sellerFee)
  }

  constructor(
    owner: string,
    sellAsset: Asset,
    buyAsset: Asset,
    sellAmount: BigNumber,
    buyAmount: BigNumber,
    saltStr?: string,
    sellerFee = defaultFee
  ) {
    const salt = BigNumber.from(saltStr ?? randomHex(32))
    const key: OrderKey = {
      owner,
      salt,
      sellAsset,
      buyAsset
    }
    this.key = key
    this.sellAmount = sellAmount
    this.buyAmount = buyAmount
    this.sellerFee = sellerFee
  }

  public toJson(): OrderType {
    return {
      key: this.key,
      selling: this.sellAmount,
      buying: this.buyAmount,
      sellerFee: this.sellerFee
    }
  }

  public sequence(): SequenceOrderType {
    return {
      key: {
        salt: this.key.salt.toString(),
        owner: this.key.owner,
        sellAsset: {
          token: this.key.sellAsset.token,
          tokenId: this.key.sellAsset.tokenId.toString(),
          assetType: this.key.sellAsset.assetType
        },
        buyAsset: {
          token: this.key.buyAsset.token,
          tokenId: this.key.buyAsset.tokenId.toString(),
          assetType: this.key.buyAsset.assetType
        }
      },
      selling: this.sellAmount.toString(),
      buying: this.buyAmount.toString(),
      sellerFee: this.sellerFee.toString()
    }
  }

  public toKeccak256String(): string {
    const order = this.toJson()

    const orderParam = ParamType.fromObject({
      name: 'order',
      type: 'tuple',
      components: OrderComponents
    })

    return keccak256(defaultAbiCoder.encode([orderParam], [order])).slice(2)
  }

  public async sign(signer: Signer): Promise<string> {
    const message = this.toKeccak256String()

    const signature = await signer.signMessage(message)

    return signature
  }
}
