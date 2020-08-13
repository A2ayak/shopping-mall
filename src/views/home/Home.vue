<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control class="fake-tab-control"
                 :titles="['流行', '新款', '精选']"
                 @tabClick="tabClick"

                 ref="tabControl1"
                 v-show="isFakeShow"
    />

    <scroll class="content"
            ref="scrollComp"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners"
                    @swiperImageLoad="swiperImageLoad"></home-swiper>
      <home-recommend-view :recommends="recommends"/>
      <home-feature-view/>
      <tab-control :titles="['流行', '新款', '精选']"
                   @tabClick="tabClick"

                   ref="tabControl2"
      />
      <goods-list :goods="showGoods"/>
    </scroll>
    <back-top @click.native="backClick" v-show="isBackTopShow"/>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import HomeSwiper from './childComps/HomeSwiper'
  import HomeRecommendView from 'views/home/childComps/HomeRecommendView'
  import HomeFeatureView from "views/home/childComps/HomeFeatureView"
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import Scroll from 'components/common/scroll/Scroll'
  import BackTop from 'components/content/backTop/BackTop'


  import {getHomeMultidata, getHomeGoods} from 'network/home'
  import {debounce} from '@/common/utils'

  export default {
    name: "Home",
    components: {
      NavBar,
      HomeSwiper,
      HomeRecommendView,
      HomeFeatureView,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    data(){
      return{
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []},
        },
        currentType: 'pop',
        isBackTopShow: false,
        isFakeShow: false,
        tabOffsetTop: 0,
        saveY: 0           //记录离开页面时的滚动Y值
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    created() {
      this.getHomeMultidata();
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');

    },
    mounted() {
      const oRefresh = debounce(this.$refs.scrollComp.oRefresh, 100);
      this.$bus.$on('itemImageLoad', () => {
        oRefresh()
      })
    },
    destroyed(){
      console.log('destyoyed');
    },
    activated() {
      console.log('oooo');
      this.$refs.scrollComp.scrollTo(0, this.saveY, 0)
    },
    deactivated() {
      this.saveY = this.$refs.scrollComp.getScrollY();
      console.log(this.saveY)
    },

    methods: {
      //事件监听相关方法
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop';
            break;
          case 1:
            this.currentType = 'new';
            break;
          case 2:
            this.currentType = 'sell';
            break;
        }
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      },
      backClick() {
        this.$refs.scrollComp.scrollTo(0, 0, 500)
      },
      contentScroll(position) {
        this.isBackTopShow = (-position.y) > 5;
        this.isFakeShow = (-position.y) > this.tabOffsetTop
      },
      loadMore() {
        this.getHomeGoods(this.currentType)
      },
      swiperImageLoad() {
        // console.log('......');
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      },


      // 网络请求相关方法
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1;
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page += 1;
          this.$refs.scrollComp.oFinishPullUp();
        })
      }
    }
  }
</script>

<style scoped>
  #home{
    /*padding-top: 1px;*/
    /*position: relative;*/
    height: 100vh;

  }
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    /*position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 0;*/
    /*z-index: 9;*/
  }

  /*.tab-control {*/
  /*  position: sticky;*/
  /*  top: 44px;*/
  /*  z-index: 9;*/
  /*}*/
  .fake-tab-control {
    position: fixed;
    top: 44px;
    left: 0;
    right: 0;

    z-index: 10;
  }

  .content {
    position: absolute;
    overflow: hidden;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
    height: calc(100% - 93px);
    /*margin-top: 44px;*/
    /*z-index: 10;*/
  }
</style>
