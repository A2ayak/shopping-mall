<template>
  <div id="tab-bar">
    <slot></slot>
<!--    <div class="tab-bar-item"><i class="iconfont">&#xe605;</i><div>首页</div></div>-->
<!--    <div class="tab-bar-item"><i class="iconfont">&#xe7f9;</i><div>分类</div></div>-->
<!--    <div class="tab-bar-item"><i class="iconfont">&#xe664;</i><div>购物车</div></div>-->
<!--    <div class="tab-bar-item"><i class="iconfont">&#xe62f;</i><div>我的</div></div>-->
  </div>
</template>

<script>
    export default {
        name: "TabBar"
    }
</script>

<style scoped>
  #tab-bar{
    display: flex;
    background-color: #f6f6f6;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    box-shadow: 0 -3px 1px rgba(100,100,100,.2);
  }

</style>
