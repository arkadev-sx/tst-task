import { defineStore } from 'pinia'
import getRandomArbitrary from '../helpers/getRandomArbitrary.js'
import parseData from '../helpers/parseData.js'
import { updateGoods, updateNames } from './modules/grid.js'
import { IItem } from './modules/interafaces'

export const useMainStore = defineStore('main', {
  state: () => ({
    /** @type {number} */
    exchangeRate: 20,
    /** @type {{ name: string, priceUSD: number, quantity: number }} */
    collection: {},
    /** @type {{ id: string, categoryId: string, quantity: number }[]} */
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

    updateItemInCart(itemToProcess: IItem) {
      const foundItem = this.findItemInCart(itemToProcess.id)

      if (foundItem) {
        if (itemToProcess.quantity === 0) {
          this.removeItemFromCart(itemToProcess.id)
        } else {
          this.setItemQtyInCart(foundItem, itemToProcess.quantity)
        }
      } else {
        if (itemToProcess.quantity > 0) {
          this.createItemInCart(itemToProcess)
        }
      }
    },
    findItemInCart(expected: string) {
      return this.cart.find((el: IItem) => el.id === expected)
    },
    setItemQtyInCart(item: IItem, newQty: number) {
      item.quantity = newQty
    },
    createItemInCart(itemToProcess: IItem) {
      const cartUpdated: IItem[] = this.cart
      cartUpdated.push(itemToProcess)
    },
    removeItemFromCart(id: string) {
      const itemInCartIndex = this.cart.findIndex((item) => item.id === id)
      if (itemInCartIndex >= 0) {
        this.cart.splice(itemInCartIndex, 1)
      }
    },
  },
})
