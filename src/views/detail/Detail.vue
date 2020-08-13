<template>
  <div>
    {{iid}}
  </div>
</template>

<script>
  export default {
    name: "Detail",
    data() {
      return {
        iid: null
      }
    },
    create() {
      this.iid = this.$router.params.iid
    }
  }
</script>

<style scoped>

</style>
