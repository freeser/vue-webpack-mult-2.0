const cartProducts = state => state.cart.added.map(({ id, quantity }) => {
  const product = state.products.all.find(p => p.id === id)
  return {
    title: product.title,
    price: product.price,
    quantity
  }
})

export default {
  cartProducts
}
