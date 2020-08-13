<template>
  <div>
    <detail-nav-bar></detail-nav-bar>
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import {getDetail} from "network/detail";

  export default {
    name: "Detail",
    components: {
      DetailNavBar
    },
    data() {
      return {
        iid: null
      }
    },
    created() {
      // console.log(this.$route.params);
      this.iid = this.$route.params.iid
      getDetail(this.iid).then(res => {
        console.log(res);
      })
    }
  }
</script>

<style scoped>

</style>
