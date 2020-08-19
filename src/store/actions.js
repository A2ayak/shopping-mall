export default {
  addCart(context, payload) {
    // console.log(info);
    return new Promise((resolve, reject) => {
      // 1.查看是否添加过
      const oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
      // 2.+1或者新添加
      if (oldProduct) {
        // oldInfo.count += 1
        context.commit('addCounter', oldProduct)
        resolve('商品数量+1')
      } else {
        payload.count = 1
        // payload.checked = true
        context.commit('addToCart', payload)
        resolve('添加了新的商品')
      }
    })
  }
}




// const actions = {
//
// }
//
// export default actions

