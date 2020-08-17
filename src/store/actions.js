export default {
  addCart(context, payload) {
    // console.log(info);
    // 1.查看是否添加过
    const oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

    // 2.+1或者新添加
    if (oldProduct) {
      // oldInfo.count += 1
      context.commit('addCounter', oldProduct)
    } else {
      payload.count = 1
      // payload.checked = true
      context.commit('addToCart', payload)
    }
  }
}




// const actions = {
//
// }
//
// export default actions

