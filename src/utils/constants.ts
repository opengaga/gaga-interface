import { hexlify, hexZeroPad } from '@ethersproject/bytes'
import { JsonRpcProvider } from '@ethersproject/providers'
import { BigNumber } from 'ethers'

export const EMPTY_ADDRESS = hexZeroPad(hexlify(0), 20).toString()
export const UINT256_MAX = BigNumber.from(2).pow(BigNumber.from(256)).sub(BigNumber.from(1))

export const ETHER = BigNumber.from('1000000000000000000') // 1 eth
export const BN_TEN = BigNumber.from('10')

export type CHAIN_ID = 20212

export const chainId: CHAIN_ID = 20212

export const rpc = 'https://www.zsc.one/rpc'

export const defaultProvider = new JsonRpcProvider(rpc)

export const symbol = 'ZTB'
export const wrapperSymbol = 'WZTB'

export const tokens = {
  weth: '0x5562ced5cdD372ac0E1AEDab9E3525a8BC195e5E'
}

export const swapWethUrl = `https://www.tofuswap.top/#/swap?inputCurrency=ETH&outputCurrency=${tokens.weth}`
