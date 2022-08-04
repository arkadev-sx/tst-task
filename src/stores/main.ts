import { defineStore } from 'pinia'
import getRandomArbitrary from '../helpers/getRandomArbitrary.js'
import parseX from '../helpers/parseData.js'
import { updateGoods, updateNames } from './modules/grid.js'

export const useMainStore = defineStore('main', {
  state: () => ({
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
        //сбор карточек товаров по категориям просиходит в методе parseX
        this.collection = parseX(goods, names)
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
    updateItem(itemID: string, categoryID: string, quantity: number) {
      const item = this.findItem(itemID)

      if (item) {
        if (quantity === 0) {
          this.removeItem(item)
        } else {
          this.setItemQty(item, quantity)
        }
      } else {
        if (quantity === 0) {
          return
        } else {
          this.createItem(itemID, categoryID, quantity)
        }
      }
    },
    findItem(desired) {
      return this.cart.find((el) => el.itemID === desired)
    },
    setItemQty(item: object, quantity: number) {
      item.quantity = quantity
    },
    createItem(id: string, catID: string, quantity: number) {
      const item = {
        itemID: id,
        categoryID: catID,
        quantity: quantity,
      }
      this.cart.push(item)
    },
    removeItem(item: object) {
      const index = this.cart.indexOf(item)
      this.cart.splice(index, 1)
    },
  },
})
