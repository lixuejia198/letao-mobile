import cookieparser from "cookieparser"
export const state = () => {
  return {
    token: ""
  }
}

export const mutations = {
  // 存储token(这种方式一刷新页面就没了)
  setToken(state, payload) {
    state.token = payload
  }
}

export const actions = {
  // 只在服务端执行一次 路由切换不会执行
  // nuxtServerInit这个函数只能写在store/index.js中的actions中
  // 第一个参数context是为前端服务 第二个参数context是为服务端服务 
  nuxtServerInit({ commit }, { req }) {
    let token = "";
    if (req.headers.cookie) {
      // 使用cookieparser解构出cookie中的token
      let parser = cookieparser.parse(req.headers.cookie);
      // console.log(parser, "parser");
      token = parser.token;
    }
    // 永久存储token(一直存在 除非你手动删除)
    commit('setToken', token)
  }
}