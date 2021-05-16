export const toFormData = (data: Record<string, any>): FormData => {
  const formData = new FormData()

  Object.keys(data).forEach((key) => {
    formData.append(key, data[key])
  })

  return formData
}

export class RequestError extends Error {
  public code: number

  constructor(code: number, message: string) {
    super(message)
    this.code = code
  }
}

export class RequestTimeoutError extends Error {
  constructor() {
    super('Request timeout, Please check your network')
  }
}

export class RequestInternetError extends Error {
  constructor() {
    super('Internet error, Please check your network')
  }
}
