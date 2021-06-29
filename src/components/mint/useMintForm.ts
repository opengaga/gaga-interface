import type { FormState } from './types'

import { reactive, ref, unref } from '@vue/reactivity'
import { computed } from '@vue/runtime-core'
import { useApi } from '@/hooks/useApi'

export const useMintForm = () => {
  const api = useApi()

  const uploading = ref<boolean>(false)

  const form = reactive<FormState>({
    sale: false,
    hasPrice: false,
    price: 100,
    purchase: false,
    file: new Blob(),
    preview: '',
    name: '',
    desc: '',
    point: 10,
    supply: 1,
    properties: [['', '']]
  })

  const attributes = computed(() => {
    const _attributes: Record<string, string> = {}
    for (const [key, value] of form.properties) {
      if (key) {
        _attributes[key] = value
      }
    }
    return _attributes
  })

  const uploadImg = async () => {
    if (!form.file) {
      throw new Error('Can not fund image')
    }

    uploading.value = true

    const data = await api.upload(form.file)

    uploading.value = false

    return data.ipfs
  }

  const uploadJson = async (image: string) => {
    const json: Record<string, any> = {}

    json.name = form.name
    json.description = form.desc
    json.image = image

    json.attributes = { ...unref(attributes) }

    const blob = new Blob([JSON.stringify(json)], { type: 'application/json;charset=utf-8' })

    uploading.value = true

    const data = await api.upload(blob)

    uploading.value = false

    return data.ipfs.replace('ipfs://ipfs', '')
  }

  return {
    form,
    attributes,
    uploadImg,
    uploadJson,
    uploading
  }
}
