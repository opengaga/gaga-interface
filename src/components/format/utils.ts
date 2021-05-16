export const formatDisplay = (value: string, decimal = 3) => {
  if (value.includes('.')) {
    const [pre, suf] = value.split('.')

    return pre + '.' + suf.slice(0, decimal)
  } else {
    return value
  }
}
