interface Ethereum {
  send: unknown
  sendAsync: unknown
  request: unknown
  enable: () => Promise<string[]>
  on?: (method: string, listener: (...args: any[]) => void) => void
  removeListener?: (method: string, listener: (...args: any[]) => void) => void
  isMetaMask?: boolean
  autoRefreshOnNetworkChange?: boolean
}

interface Window {
  ethereum?: Ethereum
}
