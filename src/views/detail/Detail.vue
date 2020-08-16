<template>
  <div class="main-detail">
    <detail-nav-bar/>
    <scroll class="detail-content" :probe-type="3" ref="scrollComp">
      <detail-swiper :detail-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo"/>
      <detail-param-info :param-info="itemParams"/>
      <detail-comment-info :comment-info="commentInfo"/>
<!--      <detail-recommend-info :recommend-list="recommendInfo"/>-->
      <goods-list :goods="recommendInfo"/>
    </scroll>
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
  // import DetailRecommendInfo from "./childComps/DetailRecommendInfo";
  import GoodsList from "components/content/goods/GoodsList";
  import {debounce} from '@/common/utils';



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
      // DetailRecommendInfo
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
        // console.log('homeimageload');
      }
      this.$bus.$on('detailItemImageLoad', this.itemImageListener)
        // console.log('homeimageload');
    },
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
    height: calc(100% - 44px);
  }
</style>
