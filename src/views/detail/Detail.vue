<template>
  <div class="main-detail">
    <detail-nav-bar @itemClick="titleClick" ref="nav"/>
    <scroll class="detail-content"
            :probe-type="3"
            ref="scrollComp" @scroll="contentScroll">
<!--      <div>{{$store.state.cartList.length}}</div>-->
      <detail-swiper :detail-images="topImages"/>
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" ref="goodsInfo"/>
      <detail-param-info :param-info="itemParams" ref="paramsInfo"/>
      <detail-comment-info :comment-info="commentInfo" ref="commentInfo"/>
<!--      <detail-recommend-info :recommend-list="recommendInfo"/>-->
      <goods-list :goods="recommendInfo" ref="recommendInfo"/>
    </scroll>
    <back-top @click.native="backClick" v-show="isBackTopShow"/>
    <detail-bottom-bar @selected="addToStore" class="bottom-bar"/>
  </div>
</template>

<script>
  import Scroll from "../../components/common/scroll/Scroll";

  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";
  import DetailBottomBar from "./childComps/DetailBottomBar";
  import BackTop from "components/content/backTop/BackTop";
  // import DetailRecommendInfo from "./childComps/DetailRecommendInfo";
  import GoodsList from "components/content/goods/GoodsList";

  import { debounce } from '@/common/utils';
  import { mapActions } from 'vuex'



  import {getDetail, Goods, Shop, GoodsParam, getRecommend} from "network/detail";

  export default {
    name: "Detail",
    components: {
      Scroll,
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,

      BackTop,
      GoodsList

    },
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        itemParams: {},
        commentInfo: {},
        recommendInfo: [],
        themeTops: [],
        getTopY: null,
        isBackTopShow: false,

        itemImageListener: null,
        newRefresh: null
      }
    },
    created() {
      // console.log(this.$route.params);
      this.iid = this.$route.params.iid
      getDetail(this.iid).then(res => {
        // console.log(res);
        const data = res.result;
        this.topImages = data.itemInfo.topImages;

        //获取并保存商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);
        //获取店铺信息
        this.shop = new Shop(data.shopInfo);
        //获取商品详情
        this.detailInfo = data.detailInfo;
        //获取商品尺码等参数
        this.itemParams = new GoodsParam(data.itemParams.info, data.itemParams.rule);
        //获取评论信息
        if(data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0];
        }
      })
      getRecommend().then(res => {
        // console.log(res);
        this.recommendInfo = res.data.list
      })
    },
    mounted() {
      this.newRefresh = debounce(this.$refs.scrollComp.oRefresh, 300);
      this.itemImageListener = () => {
        this.newRefresh()
        this.getTopY()  //imageLoad之后获取每个地方的Y值
        // console.log('detailimageload');
      }
      this.$bus.$on('detailItemImageLoad', this.itemImageListener)
        // console.log('homeimageload');
      // this.itemImageListener
    },
    updated() {
      // this.getOffsetTops()
      this.getTopY = debounce(() => {
        this.getOffsetTops()
      }, 500)
    },
    methods: {
      ...mapActions(['addCart']), //方法从vuex映射
      titleClick(index) {
        this.$refs.scrollComp.scrollTo(0, -this.themeTops[index], 300)
      },
      getOffsetTops() {
        if(this.$refs.paramsInfo && this.$refs.commentInfo && this.$refs.recommendInfo){
          this.themeTops = []
          this.themeTops.push(0)
          this.themeTops.push(this.$refs.paramsInfo.$el.offsetTop)
          this.themeTops.push(this.$refs.commentInfo.$el.offsetTop)
          this.themeTops.push(this.$refs.recommendInfo.$el.offsetTop)
          this.themeTops.push(Number.MAX_VALUE)
          // console.log('‘溜了溜了’');
        }
      },
      contentScroll(position) {
        //完成滑动距离与标题联动
        this.isBackTopShow = (-position.y) > 5; //滚动控制返回顶部图标是否出现
        let posY = -position.y
        for(let i = 0; i < this.themeTops.length-1; i++){
          // let layer = this.themeTops[i]
          if(posY >= this.themeTops[i] && posY <= this.themeTops[i+1]){
            if(this.currentIndex !== i) {
              this.currentIndex = i;
              // console.log(this.currentIndex);
              this.$refs.nav.currentIndex = this.currentIndex;
            }
          }
        }
      },
      backClick() {
        this.$refs.scrollComp.scrollTo(0, 0, 500)
      },
      addToStore() {
        // console.log('sjdj ');
        const selectedGoods = {}
        // 2.对象信息
        selectedGoods.iid = this.iid;
        selectedGoods.imgURL = this.topImages[0]
        selectedGoods.title = this.goods.title
        selectedGoods.desc = this.goods.desc;
        selectedGoods.newPrice = this.goods.nowPrice;
        // 3.添加到Store中
        // 3.1 映射方法写法用vuex的mapActions
        this.addCart(selectedGoods).then(res => {
          this.$toast.show(res, 2000)
        })
        // 3.2 通常dispatch的方法传到action
        // this.$store.dispatch('addCart', selectedGoods).then(res => {
        //   console.log(res);
        // })
      }
    }
  }
</script>

<style scoped>
  .main-detail {
    position: relative;
    z-index: 1;
    background-color: #fff;
    height: 100vh;
  }
  .detail-content {
    background-color: #fff;
    height: calc(100% - 44px - 49px);
  }
  /*.bottom-bar {*/
  /*  z-index: 2;*/
  /*}*/
</style>
