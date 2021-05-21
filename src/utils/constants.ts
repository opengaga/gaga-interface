import { hexlify, hexZeroPad } from '@ethersproject/bytes'
import { JsonRpcProvider } from '@ethersproject/providers'
import { BigNumber } from 'ethers'

export const EMPTY_ADDRESS = hexZeroPad(hexlify(0), 20)
export const UINT256_MAX = BigNumber.from(2).pow(BigNumber.from(256)).sub(BigNumber.from(1))

export const ETHER = BigNumber.from('1000000000000000000') // 1 eth
export const BN_TEN = BigNumber.from('10')

export type CHAIN_ID = 56 | 97

export const chainId: CHAIN_ID = 97

export const rpc = 'https://data-seed-prebsc-1-s1.binance.org:8545'

export const defaultProvider = new JsonRpcProvider(rpc)

export const symbol = 'BNB'
export const wrapperSymbol = 'WBNB'

export const tokens = {
  weth: '0xae13d989dac2f0debff460ac112a837c89baa7cd'
}
