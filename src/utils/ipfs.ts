export const getIpfsUrl = (ipfs: string): string => {
  if (!ipfs.startsWith('ipfs://')) {
    return ipfs
  }
  return ipfs.replace('ipfs://ipfs', '')
}
