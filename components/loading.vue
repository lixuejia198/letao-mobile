<template>
  <div>
    <van-overlay :show="loading" z-index="10" class="loading">
      <van-loading type="spinner" color="#1989fa" :vertical="true">
        加载中...
      </van-loading>
    </van-overlay>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    start() {
      this.loading = true;
    },
    finish() {
      this.loading = false;
    },
  },
};
</script>

<style scoped>
.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>