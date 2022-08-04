import { defineStore } from 'pinia'
import getRandomArbitrary from '../helpers/getRandomArbitrary.js'
import parseData from '../helpers/parseData.js'
import { updateGoods, updateNames } from './modules/grid.js'

export const useMainStore = defineStore('main', {
  state: () => ({
    // 'TODO: exchangeRate: { RUB: 20 },
    // currency: 'RUB',
    exchangeRate: 20,
    collection: {},
    cart: [],
  }),
  actions: {
    //обновление данных
    async updateAllData() {
      try {
        const goods = await updateGoods()
        const names = await updateNames()
        //сбор карточек товаров по категориям просиходит в методе parseData
        this.collection = parseData(goods, names)
      } catch (err) {
        throw new Error(err)
      }
      this.updateExchangeRate()
    },
    //обновление курса валют
    updateExchangeRate() {
      this.exchangeRate = getRandomArbitrary(20, 80).toFixed(2)
    },

    //методы корзины
    //обновление данных в корзине - контролирующий метод
    // TODO: renamce updateItemInCart

    // updateItemInCart(item: {itemID: string, categoryID: string, quantity: number}) {
    //   const {id, catId, quantity} = item;

    // },

    updateItemInCart(itemID: string, categoryID: string, quantity: number) {
      const item = this.findItemInCart(itemID)

      if (item) {
        if (quantity === 0) {
          this.removeItemFromCart(item.itemID)
        } else {
          this.setItemQtyInCart(item, quantity)
        }
      } else {
        if (quantity === 0) {
          return
        } else {
          this.createItemInCart(itemID, categoryID, quantity)
        }
      }
    },
    findItemInCart(expected: string) {
      return this.cart.find((el) => el.itemID === expected)
    },
    setItemQtyInCart(item: object, newQty: number) {
      item.quantity = newQty
    },
    // TODO: rename ID > Id cat > category
    // TODO: rename item.itemID > item.id
    createItemInCart(id: string, catID: string, quantity: number) {
      const item = {
        itemID: id,
        categoryID: catID,
        quantity: quantity,
      }
      this.cart.push(item)
    },
    removeItemFromCart(id: string) {
      const itemInCartIndex = this.cart.findIndex((item) => item.itemID === id)
      if (itemInCartIndex >= 0) {
        this.cart.splice(itemInCartIndex, 1)
      }
    },
  },
})
