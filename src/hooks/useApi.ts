import { Api, ApiNode } from '@/api/Api'

const base = 'https://bcat.me'

const api = new Api(base, {}, 'v1')
export const useApi = (): Api => {
  return api
}

const apiNode = new ApiNode(base, {})
export const useApiNode = (): ApiNode => {
  return apiNode
}
