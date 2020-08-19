<template>
  <div class="cart-list">
    <scroll class="cart-content" :probe-type="3">

        <cart-list-item v-for="item in cartList" :key="item.iid" :item-info="item"/>


    </scroll>
  </div>
</template>

<script>
  import Scroll from "components/common/scroll/Scroll";
  import CartListItem from './CartListItem'

	export default {
		name: "CartList",
    components: {
		  Scroll,
      CartListItem
    },
    props: {
		  cartList: {
		    type: Array,
        default() {
		      return []
        }
      }
    }
	}
</script>

<style scoped>
  .cart-list {
    height: calc(100% - 44px - 49px);
  }
  .cart-content {
    background-color: #fff;
    height: calc(100% - 44px - 49px - 44px);
    overflow: hidden;
  }
</style>
