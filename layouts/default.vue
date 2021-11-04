<template>
  <div class="container">
    <div class="header">
      <van-nav-bar :title="title" left-text="返回" left-arrow>
        <template #right>
          <van-icon name="search" size="18" />
        </template>
      </van-nav-bar>
    </div>
    <div class="main">
      <Nuxt></Nuxt>
    </div>
    <div class="footer">
      <van-tabbar v-model="active">
        <van-tabbar-item name="index" icon="home-o" to="/">
          首页
        </van-tabbar-item>
        <van-tabbar-item name="category" icon="bag-o" to="/category">
          分类
        </van-tabbar-item>
        <van-tabbar-item name="cart" icon="shopping-cart-o" to="/cart">
          购物车
        </van-tabbar-item>
        <van-tabbar-item name="my" icon="friends-o" to="/my">
          我的
        </van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: this.$route.name,
      title: "",
    };
  },
  methods: {
    // 设置导航标题
    refreshTitle() {
      this.title = {
        index: "乐淘-首页",
        category: "乐淘-分类",
        cart: "乐淘-购物车",
        my: "乐淘-我的",
      }[this.$route.name];
    },
  },
  mounted() {
    this.refreshTitle();
  },
  watch: {
    // 监听路由变化
    $route() {
      // console.log(this.$route);
      this.refreshTitle();
    },
  },
};
</script>

<style>
</style>