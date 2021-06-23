export const getIpfsUrl = (ipfs: string): string => {
  if (!ipfs.startsWith('ipfs://')) {
    return ipfs
  }
  // return ipfs.replace('ipfs://ipfs/', 'https://ipfs.io/ipfs/')
  return ipfs.replace('ipfs://ipfs/', 'http://api.opengaga.io/v1/upload/view?hash=')
}
