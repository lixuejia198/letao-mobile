<template>
  <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
    <van-swipe-item v-for="item in swipperList" :key="item.id">
      <img :src="item.img_src" alt="" />
    </van-swipe-item>
  </van-swipe>
</template>

<script>
export default {
  props: ["swipperList"],
};
</script>

<style scoped>
.van-swipe-item img {
  width: 100%;
}
</style>