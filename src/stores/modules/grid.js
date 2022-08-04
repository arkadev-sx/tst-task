export const updateGoods = async () => {
  const result = await fetch(`${process.env.MEOW_PATH_TO_GOODS}`)
  const output = await result.json()
  return output.Value.Goods
}
export const updateNames = async () => {
  const result = await fetch(`${process.env.MEOW_PATH_TO_NAMES}`)
  const output = await result.json()
  return output
}
