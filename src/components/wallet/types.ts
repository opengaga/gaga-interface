import type { AbstractConnector } from '@web3-react/abstract-connector'

export interface ConnectorUpdate<T = number | string> {
  provider?: any
  chainId?: T
  account?: null | string
}

export interface Web3ReactManagerState {
  connector?: AbstractConnector
  chainId?: number
  account?: null | string

  error?: Error
}

export enum ConnectorEvent {
  Update = 'Web3ReactUpdate',
  Error = 'Web3ReactError',
  Deactivate = 'Web3ReactDeactivate'
}

export type ActivateFunc = (connector: AbstractConnector, throwErrors?: boolean) => Promise<void>

export type Send = (request: {
  id?: string
  jsonrpc: '2.0'
  method: string
  params?: Array<any>
}) => Promise<any>
