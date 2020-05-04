<template>
  <div class="container">
    <h1>{{ initData }}</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      initData: "vue开发环境运行成功11",
    };
  },
};
</script>

<style lang="less" scoped>
.container {
  color: red;
  display: flex;
}
</style>
