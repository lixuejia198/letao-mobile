<template>
  <div>
    <!-- 轮播图组件 -->
    <indexSwiper :swipperList="swipperList"></indexSwiper>
    <!-- 宫格组件 -->
    <indexGridList :gridlist="gridlist"></indexGridList>
    <!-- 活动组件 -->
    <indexActive></indexActive>
    <!-- 品牌组件 -->
    <indexBrand></indexBrand>
    <!-- 运动专区组件 -->
    <indedxSport :sports="sports"></indedxSport>
  </div>
</template>

<script>
export default {
  async asyncData({ $api }) {
    // const [
    //   {
    //     data: { swipperList },
    //   },
    //   {
    //     data: { gridlist },
    //   },
    //   {
    //     data: { sports },
    //   },
    // ] = await Promise.all([
    //   $request.get("/banners"),
    //   $request.get("/gridlist"),
    //   $request.get("/sports"),
    // ]);
    // const [{ swipperList }, { gridlist }, { sports }] = await Promise.all([
    //   $request.$get("/banners"),
    //   $request.$get("/gridlist"),
    //   $request.$get("/sports"),
    // ]);
    const [{ swipperList }, { gridlist }, { sports }] = await Promise.all([
      $api.indexBanners(),
      $api.indexGridlist(),
      $api.indexSports(),
    ]);
    // console.log(swipperList, sports, gridlist);
    return {
      swipperList,
      sports,
      gridlist,
    };
  },
};
</script>

<style>
</style>
