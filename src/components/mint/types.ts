export interface FormState {
  sale: boolean
  hasPrice: boolean
  price: number
  purchase: boolean
  file: Blob | null
  preview: string | null
  name: ''
  desc: ''
  point: number
  supply?: number
  properties: [string, string][]
}
