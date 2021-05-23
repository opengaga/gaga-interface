import { chainId } from '@/utils/constants'
import { InjectedConnector } from './injected-connector'

export const injectedConnector = new InjectedConnector({
  supportedChainIds: [chainId]
})
