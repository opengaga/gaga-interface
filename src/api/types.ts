import { AssetType, SequenceOrderType } from '@/vvm/types'

export type MethodType = 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT'

export interface Config {
  method?: MethodType
  headers?: Record<string, string>
  params?: Record<string, any>
  body?: any
  timeout?: number
  cache?: 'default' | 'no-store' | 'reload' | 'no-cache' | 'force-cache' | 'only-if-cached'
  credentials?: 'omit' | 'same-origin' | 'include'
  mode?: 'navigate' | 'same-origin' | 'no-cors' | 'cors'
}

// Api response
export type ServerResponse<T> = {
  code: number
  msg?: string
} & T

export type ServerListResponse<T> = ServerResponse<{
  list: T[]
  pager: Page
}>

// page
export type Page = {
  page: number
  size: number
  total: number
}

// upload res
export type UploadResponse = ServerResponse<{
  path: string
  ipfs: string
}>

// newTokenId Res
export type NewTokenIdResponse = ServerResponse<{
  data: {
    signature: string
    tokenid: string
  }
}>

// add item
export type AddItemRequest = {
  tx_id: string
  asset_type: AssetType.ERC1155 | AssetType.ERC721
}
export type AddItemResponse = ServerResponse<{
  data: number
}>

// user follower
export type FollowerType = {
  user_address: string
  user_cover: string
  user_desc: string
  user_followers: number
  user_followings: number
  user_name: string
}
export type GetFollowerResponse = ServerListResponse<FollowerType>

export type UserInfo = ServerResponse<{
  data: {
    create_time: string
    update_time: string
    user_address: string
    user_cover: string
    user_desc: string
    user_followers: number
    user_followings: number
    user_id: number
    user_name: string
    user_pic: string
    user_short_url: string
    user_twitter: string
    user_version: number
    user_website: string
  }
}>
// item
export type ItemType = {
  asset_id: AssetType.ERC1155
  asset_type: string
  blacklisted: string | null
  coin_id: number
  coin_name: string
  coll_id: AssetType.ERC1155
  coll_name: string
  contract_addr: string | null
  create_time: string
  creator: string
  creator_address: string
  creator_cover: string | null
  creator_user_name: string | null
  item_id: number
  keystore: string
  likes: number | null
  own_address: string
  own_user_cover: string | null
  own_user_name: string | null
  price: string
  prop_image: string
  prop_name: string
  saleable: boolean
  sellers: string | null
  supply: string
  token: string
  token_id: string
  total_stock: null
  tx_id: string
  unlockable: null
  user_id: number
}

export type GetItemResponse = ServerListResponse<ItemType>

export type GetItemInfoResponse = ServerResponse<{ data: ItemType }>

// order
export type CreateOrderRequest = {
  order: SequenceOrderType
  signature: string
}
export type EditUserRequest = {
  username: string
  address: string
  cover: string
  desc: string
  short_url: string
  website: string
  twitter: string
  pic: string
}
export type CreateOrderResponse = ServerResponse<undefined>

export type GetOrderResponse = ServerResponse<{
  data: {
    coin_id: AssetType
    item_id: number
    ord_amount: number
    ord_cate: number
    ord_data: {
      order?: SequenceOrderType
      signature?: string
    }
    ord_id: number
    ord_price: string | null
    ord_result: number
    ord_time: string
    update_time: string | null
    user_id: number
  }
}>

export type ItemsStoreRequest = {
  tx_id: string
  asset_type: string
  coin_id: string
  coll_id: number
  price: string | number
  saleable: number
  keystore: string
}

export type Owner = {
  is_last: number
  item_id: number
  own_id: number
  own_supply: number
  own_time: string
  user_address: string
  user_cover: null
  user_id: number
  user_name: string | null
  sale_coin: string
  sale_coin_id: AssetType
  sale_price: string
  saleable: 1 | 0
}
export type OwnerInfo = {
  is_last: number
  item_id: number
  own_id: number
  own_supply: number
  own_time: string
  sale_coin: string
  sale_coin_id: AssetType
  sale_price: string
  saleable: 1 | 0
}

// activity
export enum ActivityType {
  'like' = 'like',
  'follow' = 'follow'
}
export type Activity = {
  ac_id: number
  ac_origin_id: number
  ac_time: string
  ac_type: ActivityType
  ac_type_name: string
  coll_cover: string | null
  coll_name: string
  creator: string
  user_address: string
  user_cover: string | null
  user_id: number
}
export type GetActivityListResponse = ServerListResponse<Activity>

export type Bid = {
  bid_data: string // SequenceOrderType json
  bid_fee: number
  bid_id: number
  bid_price: string
  bid_result: number
  bid_time: string
  bid_user_address: string
  bid_user_id: number
  coin_id: number
  coin_id_fee: number
  item_id: number
}
export type GetBidListResponse = ServerListResponse<Bid>

export type GetOwnersResponse = ServerListResponse<Owner>
