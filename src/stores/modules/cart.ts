export const findItemInCart = (expected: string) => {
  return this.cart.find((el: IItem) => el.id === expected)
}
