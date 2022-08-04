//метод для сборки списка товаров
export const parseX = (goods, names) => {
  // const categoriesById = goods.reduce((acc, currGood) => {
  //   const { T: goodId, G: catId, C: priceUSD, P: quantity } = currGood
  //   const { G: catName, B: goodsRaw } = names[catId]
  //   const { N: goodName } = goodsRaw[goodId]

  //   return {
  //     ...acc,
  //     [catId]: {
  //       name: catName,
  //       goods: {
  //         ...(acc[catId] && acc[catId].goods),
  //         [goodId]: {
  //           name: goodName,
  //           priceUSD,
  //           quantity,
  //         },
  //       },
  //     },
  //   }
  // }, {})

  const categoriesById = Object.keys(names).reduce((acc, catId) => {
    const { G: catName, B: itemsRaw } = names[catId]
    const itemsFormattedById = Object.keys(itemsRaw).reduce((acc, itemId) => {
      const { N: itemName } = itemsRaw[itemId]
      const extraItemData = goods.find(({ T }) => T.toString() === itemId.toString())

      if (!extraItemData) {
        return acc
      }

      const { C: priceUSD, P: quantity } = extraItemData

      return {
        ...acc,
        [itemId]: {
          name: itemName,
          priceUSD,
          quantity,
        },
      }
    }, {})

    return {
      ...acc,
      [catId]: {
        name: catName,
        goods: itemsFormattedById,
      },
    }
  }, {})

  return categoriesById
}

export default parseX
