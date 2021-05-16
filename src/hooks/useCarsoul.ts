export const useCarsoul = (arr: Array<string | number>, num: any) => {
  const newArr = new Array(Math.ceil(arr.length / 2))
  for (let i = 0; i < newArr.length; i++) {
    newArr[i] = []
  }
  for (let i = 0; i < arr.length; i++) {
    const str = String(i / num)
    newArr[parseInt(str)][i % num] = arr[i]
  }
  return newArr
}
