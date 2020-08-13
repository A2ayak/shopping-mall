<template>
  <div class="goods-item" @click="itemClick">
    <img :src="goodsItem.show.img"  @load="imageLoad">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "GoodsListItem",
    props: {
      goodsItem: {
        type: Object,
        default(){
          return {}
        }
      }
    },
    methods: {
      imageLoad() {
        this.$bus.$emit('itemImageLoad')
      },
      itemClick() {
        this.$router.push('/detail/' + this.goodsItem.iid)
      }
    }
  }
</script>

<style scoped>
  .goods-item {
    padding-bottom: 40px;
    /* 子绝父相 */
    position: relative;
    width: 48%;
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    /*
    * background的简写 background: [background-color] [background-image] [background-repeat] [background-attachment] [background-position] / [background-size] [background-origin] [background-clip]
    * background-color
    * background-image
    * background-repeat 如何重复背景图片
    * background-attachment 背景图片固定或者是随着页面的其他部分滚动
    * background-position 背景图像的位置
    * 以下为CSS3属性
    * background-size 背景图片的尺寸
    * background-origin 背景图片的定位区域 该属性指定background-position属性相对于border-box还是content-box。
    * background-clip 背景的绘制区域 也是content-box、padding-box之类的
    */
    background: url('~assets/img/common/collect.svg') 0 0/14px 14px;
  }
</style>
