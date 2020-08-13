<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: "Scroll",
    data() {
      return {
        scroll: null,
      }
    },
    props: {
      probeType:{
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    mounted() {
      if(this.probeType ===2 || this.probeType === 3) {
        this.scroll = new BScroll(this.$refs.wrapper, {
          click: true,
          probeType: this.probeType,
          pullUpLoad: this.pullUpLoad
        });
      }
      //监听滚动位置
      this.scroll.on('scroll', (position) => {
        this.$emit('scroll', position)
      });
      if(this.pullUpLoad) {
        this.scroll.on('pullingUp', () => {
          this.$emit('pullingUp')
        })
      }
    },
    methods: {
      scrollTo(x, y , time = 800) {
        this.scroll && this.scroll.scrollTo(x, y ,time)
      },
      oFinishPullUp() {
        this.scroll && this.scroll.finishPullUp()
      },
      oRefresh() {
        this.scroll && this.scroll.refresh();
        // console.log('-----');
      },
      getScrollY() {
        return this.scroll ? this.scroll.y : 0
      },
    }
  }
</script>

<style scoped>

</style>
