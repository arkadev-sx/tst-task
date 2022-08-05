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
      const { id, quantity } = itemToProcess
      const itemSelected = this.selectItemInCartById(id)

      if (itemSelected) {
        if (quantity === 0) {
          this.removeItemFromCart(id)
        } else {
          this.setItemQtyInCart(itemSelected, quantity)
        }
      } else {
        if (quantity > 0) {
          this.createItemInCart(itemToProcess)
        }
      }
    },
    selectItemInCartById(id: string) {
      return this.cart.find((item: IItem) => item.id === id)
    },
    selectItemIndexInCartById(id: string) {
      return this.cart.findIndex((item: IItem) => item.id === id)
    },
    setItemQtyInCart(item: IItem, newQty: number) {
      item.quantity = newQty
    },
    createItemInCart(itemToProcess: IItem) {
      const cartUpdated: IItem[] = this.cart
      cartUpdated.push(itemToProcess)
    },

    removeItemFromCart(id: string) {
      const itemInCartIndex = this.selectItemIndexInCartById(id)
      if (itemInCartIndex >= 0) {
        this.cart.splice(itemInCartIndex, 1)
      }
    },
  },
})
