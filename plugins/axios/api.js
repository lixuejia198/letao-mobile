export default ({ $request }, inject) => {
  inject("api", {
    /**
     * 轮播图接口
     * @returns 
     */
    indexBanners() {
      return $request.$get("/banners")
    },
    /**
     * 宫格接口
     * @returns 
     */
    indexGridlist() {
      return $request.$get("/gridlist")
    },
    /**
     * 运动专区接口
     * @returns 
     */
    indexSports() {
      return $request.$get("/sports")
    },
    /**
     * 一级分类接口
     * @returns 
     */
    oneCategory() {
      return $request.$get("/oneCategory")
    },
    /**
     * 二级分类接口
     * @param {*} id 
     * @returns 
     */
    twoCategory(id) {
      return $request.$get(`/twoCategory?id=${id}`)
    },
    /**
     * 发送短信接口
     * @param {*} mobile 
     * @returns 
     */
    sendSms(mobile) {
      return $request.$post("/sendsms", { mobile })
    },
    /**
     * 注册用户接口
     * @param {*} username 
     * @param {*} password 
     * @param {*} mobile 
     * @returns 
     */
    userRegister(username, password, mobile) {
      return $request.$post("/users/register", { username, password, mobile })
    },
    /**
     * 用户登录接口
     * @param {*} username 
     * @param {*} password 
     * @returns 
     */
    userLogin(username, password) {
      return $request.$post("/users/login", { username, password })
    }
  })
}