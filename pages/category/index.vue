<template>
  <div>
    <van-tree-select
      :items="oneCategoryList"
      :main-active-index.sync="activeIndex"
      @click-nav="getIndex"
    >
      <template #content>
        <van-row>
          <van-col span="8" v-for="item in twoCategoryList" :key="item.id">
            <div class="item-cate">
              <van-image :src="item.brandLogo" />
              <p>{{ item.brandName }}</p>
            </div>
          </van-col>
        </van-row>
      </template>
    </van-tree-select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: 0,
    };
  },
  async asyncData({ $api }) {
    let activeIndex = 0;
    // 获取一级分类数据
    let { oneCategoryList } = await $api.oneCategory();
    // 处理一级分类数据
    oneCategoryList = oneCategoryList.map((item) => {
      return {
        id: item.id,
        text: item.categoryName,
      };
    });
    // console.log(oneCategoryList);
    // console.log(activeIndex);
    // 获取二级分类数据
    let { twoCategoryList } = await $api.twoCategory(
      oneCategoryList[activeIndex].id
    );
    // console.log(twoCategoryList);
    return {
      oneCategoryList,
      twoCategoryList,
    };
  },
  methods: {
    async getIndex(index) {
      // console.log(index);
      // console.log(this.oneCategoryList[index].id);
      let { twoCategoryList } = await this.$api.twoCategory(
        this.oneCategoryList[index].id
      );
      // console.log(twoCategoryList)
      this.twoCategoryList = twoCategoryList;
    },
  },
};
</script>

<style scoped>
.item-cate {
  text-align: center;
}
</style>