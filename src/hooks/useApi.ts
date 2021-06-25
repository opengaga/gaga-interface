import { Api } from '@/api/Api'

const base = 'https://api.gaganft.vip'

const api = new Api(base, {}, 'v1')
export const useApi = (): Api => {
  return api
}
