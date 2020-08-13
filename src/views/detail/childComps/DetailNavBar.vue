<template>
  <div>
    <nav-bar>
      <div slot="left" @click="backClick" class="back">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="detail-title">
        <div v-for="(item, index) in title"
             @click="itemClick(index)"
             class="detail-title-item"
             :class="{active: index === currentIndex}">
          {{item}}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";

  export default {
    name: "DetailNavBar",
    components: {
      NavBar
    },
    data() {
      return {
        title: ['商品', '详情', '评论', '推荐'],
        currentIndex: 0
      }
    },
    methods: {
      itemClick(index) {
        this.currentIndex = index
      },
      backClick() {
        this.$router.back()
      }
    }
  }
</script>

<style scoped>
  .detail-title {
    display: flex;
  }
  .detail-title-item {
    flex: 1;
  }
  .active {
    color: var(--color-high-text);
  }
  .back img {
    margin-top: 12px;
  }
</style>