import { ref } from 'vue'

import { assert } from '@/utils/assert'
import { getIpfsUrl } from '@/utils/ipfs'
import { AssetType } from '@/vvm/types'
import { BigNumber } from '@ethersproject/bignumber'
import { Contract, ContractFunction } from '@ethersproject/contracts'
import { Ref, watchEffect } from '@vue/runtime-core'
import { useWallet } from './useWallet'

const erc721_abi = [
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256'
      }
    ],
    name: 'tokenURI',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  }
]
const erc1155_abi = [
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    name: 'uri',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  }
]

const useTokenURI = (
  address: Ref<string | undefined>,
  tokenId: Ref<string | undefined>,
  type: Ref<AssetType.ERC721 | AssetType.ERC1155 | undefined>
) => {
  const { getProvider } = useWallet()
  const name = ref<string>()
  const description = ref<string>()
  const image = ref<string>()
  const attributes = ref<Record<string, any>>()

  watchEffect(() => {
    try {
      assert(address.value)
      assert(tokenId.value)
      assert(type.value)

      const provider = getProvider()
      const contract = new Contract(
        address.value,
        type.value === AssetType.ERC1155 ? erc1155_abi : erc721_abi,
        provider
      )

      const method: ContractFunction<string> =
        type.value === AssetType.ERC1155 ? contract['uri'] : contract['tokenURI']

      method(BigNumber.from(tokenId.value))
        .then((data) => {
          const url = getIpfsUrl(data)

          return fetch(url)
        })
        .then((res) => res.json())
        .then((data) => {
          name.value = data.name
          description.value = data.description
          image.value = data.image
          attributes.value = data.attributes
        })
    } catch (error) {
      error
    }
  })

  return {
    name,
    description,
    image,
    attributes
  }
}

export { useTokenURI }
