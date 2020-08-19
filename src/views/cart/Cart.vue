<template>
  <div class="cart">
    <nav-bar class="nav-bar"><div slot="center">购物车({{cartCount}})</div></nav-bar>
    <cart-list :cart-list="cartList"></cart-list>
    <bottom-bar/>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar"
  import CartList from './childComps/CartList'
  import BottomBar from './childComps/BottomBar'

    export default {
      name: "Cart",
      components: {
        NavBar,
        CartList,
        BottomBar
      },
      computed: {
        cartList() {
          return this.$store.getters.cartList
        },
        cartCount() {
          return this.$store.getters.cartCount
        }
      }
    }
</script>

<style scoped>
  .cart {
    position: relative;
    /*z-index: 1;*/
    background-color: #fff;
    height: 100vh;
  }
  /*.nav-bar {*/
  /*  position: relative;*/
  /*  background-color: #fff;*/
  /*  z-index: 10;*/
  /*}*/
  .cart-list {
    background-color: #fff;
    height: 100%;
  }
</style>
