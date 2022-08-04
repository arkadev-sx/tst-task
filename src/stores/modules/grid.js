export const updateGoods = async () => {
  const result = await fetch(
    'https://raw.githubusercontent.com/arkadev-sx/test-task_1/master/public/data.json'
  )
  const output = await result.json()
  return output.Value.Goods
}
export const updateNames = async () => {
  const result = await fetch(
    'https://raw.githubusercontent.com/arkadev-sx/test-task_1/master/public/names.json'
  )
  const output = await result.json()
  return output
}
