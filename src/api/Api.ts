import type {
  AddItemRequest,
  AddItemResponse,
  Config,
  CreateOrderRequest,
  CreateOrderResponse,
  GetFollowerResponse,
  GetItemInfoResponse,
  GetItemResponse,
  NewTokenIdResponse,
  UploadResponse,
  UserInfo,
  ItemsStoreRequest,
  GetOrderResponse,
  GetOwnersResponse,
  EditUserRequest,
  ServerResponse,
  OwnerInfo,
  ActivityType,
  GetActivityListResponse,
  GetBidListResponse
} from './types'

import { Request, combineConfig, combineURL } from './request'
import { toFormData } from './utils'

export class Api extends Request {
  constructor(baseURL: string, config: Config = {}, version = 'v1', _lang = 'en') {
    super(
      combineURL(baseURL, version),
      combineConfig(config, {
        mode: 'cors',
        headers: {
          lange: _lang
        }
      })
    )
  }

  async upload(file: Blob): Promise<UploadResponse> {
    const formData = new FormData()
    formData.append('file', file)

    const res = await this.post<UploadResponse>('/upload/file', {
      body: formData
    })

    return res
  }

  async newTokenId(address: string): Promise<NewTokenIdResponse> {
    const res = await this.post<NewTokenIdResponse>('/tokenid/new', {
      body: toFormData({
        address
      })
    })

    return res
  }

  async addItem(body: AddItemRequest): Promise<AddItemResponse> {
    return this.post<AddItemResponse>('/item/add', { body })
  }

  // follow
  async follow(body: { user_addr: string; follow_addr: string }) {
    return this.post<ServerResponse<undefined>>('/user/follow', {
      body: {
        ...body,
        state: 1
      }
    })
  }

  // unfollow
  async unfollow(body: { user_addr: string; follow_addr: string }) {
    return this.post<ServerResponse<undefined>>('/user/follow', {
      body: {
        ...body,
        state: 0
      }
    })
  }

  // follower list
  async getFollowerList(
    params: { page?: number; address?: string } = { page: 1, address: '0123' }
  ): Promise<GetFollowerResponse> {
    return this.get<GetFollowerResponse>('/user/following/list', { params })
  }

  // user info
  async getUserInfo(params: { address?: string } = { address: '0123' }): Promise<UserInfo> {
    return this.get<UserInfo>('/user', { params })
  }
  // edit userInfo
  async editUserInfo(body: EditUserRequest) {
    return this.post('/user/edit', { body })
  }

  // top hot
  async getHotList() {
    return this.get('/hot/list')
  }
  // top user
  async topUser(params: { user: string }) {
    return this.get('/user/top', { params })
  }
  // collection top
  async collectionTop() {
    return this.get('/collection/top')
  }
  // hot collection
  async getHotCollection(
    params: { page?: number; size?: number } = { page: 1, size: 10 }
  ): Promise<GetItemResponse> {
    return this.get<GetItemResponse>('/collection/list', {
      params
    })
  }
  async itemsTagsList(params: { address: string }) {
    return this.get('/user/count', {
      params
    })
  }
  async getItems(
    params: { page?: number; size?: number } = { page: 1, size: 10 }
  ): Promise<GetItemResponse> {
    return this.get<GetItemResponse>('/explore/list', {
      params
    })
  }
  // my items cells
  async getItemsList(params: { address: string; filter: string }) {
    return this.get('/item/list', {
      params
    })
  }
  // item like
  async switchLike(body: { token: string; state: number | string; address: string }) {
    return this.post('/item/like', {
      body: toFormData(body)
    })
  }
  // real-time price
  async currentPrice(params: { symbol: string }) {
    return this.get('/symbol/price', {
      params
    })
  }

  // get items owner list
  async itemsOwnerList(params: { token: string; token_id: string }) {
    return this.get('/item/owner', {
      params
    })
  }
  // get items props
  async itemsProps(params: { token: string; token_id: string }) {
    return this.get('/item/prop', {
      params
    })
  }
  // post items sale
  async itemsSaleStatus(body: { form: any; token: string; token_id: string; sale: number }) {
    return this.post('/item/sale', {
      body
    })
  }
  //  items store
  async itemsStore(body: ItemsStoreRequest) {
    return this.post('/item/store', {
      body
    })
  }
  //  generate nonce
  async generateNonce(body: { addres: string }) {
    return this.post('/nonce/new', {
      body
    })
  }
  //  generate nonce
  async itemInfo(params: { token: string; token_id: string }) {
    return this.get('/item/info', {
      params
    })
  }

  async getItemInfo(params: { token: string; token_id: string }): Promise<GetItemInfoResponse> {
    return this.get<GetItemInfoResponse>('/item/info', {
      params
    })
  }

  // change sale status
  async changeSale(body: { token: string; token_id: string; sale: 0 | 1 }) {
    return this.post<ServerResponse<undefined>>('/item/sale', { body })
  }

  // create order
  async createOrder(body: CreateOrderRequest): Promise<CreateOrderResponse> {
    return this.post<CreateOrderResponse>('/order/create', { body })
  }

  // get order
  async getOrder(params: {
    token: string
    token_id: string
    address: string
  }): Promise<GetOrderResponse> {
    return this.get<GetOrderResponse>('/order/info', {
      params
    })
  }

  // get owners
  async getOwners(params: { token: string; token_id: string }) {
    return this.get<GetOwnersResponse>('/item/owner', { params })
  }

  // get owner info
  async getOwnerInfo(params: { token: string; token_id: string; address: string }) {
    return this.get<ServerResponse<{ data: OwnerInfo }>>('/item/owner/info', { params })
  }

  // buy handler
  async buy(body: { tx_id: string }) {
    return this.post<ServerResponse<undefined>>('/buy/tx_id', {
      body: toFormData(body)
    })
  }

  // get activity list
  async getActivityList(params: { filters: ActivityType[]; address?: string }) {
    return this.get<GetActivityListResponse>('/activity/list', {
      params: {
        ...params
      }
    })
  }

  // create bid
  async createBid(body: CreateOrderRequest) {
    return this.post<ServerResponse<any>>('/item/bids/create', {
      body
    })
  }

  // get bids
  async getBids({ page = 1, token, token_id }: { page?: number; token: string; token_id: string }) {
    return this.get<GetBidListResponse>('/item/bids/list', {
      params: {
        page,
        token,
        token_id
      }
    })
  }

  // get miner claim signature
  async getClaimSignature(params: { address: string }) {
    return this.get<ServerResponse<{ signature: string }>>('/miner/claim', {
      params
    })
  }

  // get miner claim amount
  async getClaim(params: { address: string }) {
    return this.get<ServerResponse<{ data: { total: number } }>>('/user/balance', {
      params
    })
  }
}

export class ApiNode extends Request {
  constructor(baseURL: string, config: Config = {}) {
    super(
      baseURL,
      combineConfig(config, {
        mode: 'cors'
      })
    )
  }

  // get buyer fee
  async getBuyerFee(params: { token: string; token_id: string }) {
    return this.get<
      ServerResponse<{
        buyFee: number
        buyFeeSignature: string
      }>
    >('/chain/prepare/buyerfeemessage', { params })
  }
}
