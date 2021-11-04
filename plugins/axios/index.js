import { Toast } from "vant"
const { httpcode } = require("./httpcode")
export default ({ $axios, store, redirect }, inject) => {
  // 请求拦截
  $axios.onRequest(config => {
    // 在请求头中要设置 token
    // 已登录
    if (store.state.token) {
      // 后端有开启JWT校验，前端调用接口，需要设置token
      $axios.setHeader('Authorization', `Bearer ${store.state.token}`)
    }
    // console.log("onRequest", config.url, config.headers.common);
    return config
  })
  // 响应拦截
  $axios.onResponse(res => {
    // console.log("============================");
    // console.log(res);
    // 服务端响应状态码
    const { status, msg } = res.data;
    // console.log(status, msg);
    switch (status) {
      case 0:
        Toast(msg);
        redirect("/my/login");
        break;
    }
  })
  // 错误拦截
  $axios.onError(error => {
    // http错误码
    const code = parseInt(error.response && error.response.status)
    // 提示错误信息
    Toast(httpcode[code])
    // 错误处理
    if (code == 404) {
      redirect('404')
    } else if (code == 401) {
      redirect('/my/login')
    }
  })
  // 封装请求方法
  let requestMethod = {};
  // ['get', 'post', 'delete', 'put'].forEach(method => {
  //   // 区分请求参数是params还是data
  //   let paramsOrData = method == 'get' || method == 'delete' ? 'params' : 'data';
  //   console.log(paramsOrData, "paramsOrData");
  //   requestMethod[method] = (url, data) => {
  //     return $axios({
  //       method,
  //       url,
  //       [paramsOrData]: data
  //     })
  //   }
  // });
  ['$get', '$post', '$delete', '$put'].forEach(method => {
    requestMethod[method] = (url, data) => {
      return $axios[method](
        url, data,
      )
    }
  });
  // console.log('**********************');
  // console.log(requestMethod);
  inject('request', requestMethod)
}