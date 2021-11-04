<template>
  <van-form @submit="onSubmit">
    <van-field
      v-model="username"
      name="username"
      label="用户名"
      placeholder="用户名"
      :rules="[{ required: true, message: '请填写用户名' }]"
    />
    <van-field
      v-model="password"
      type="password"
      name="password"
      label="密码"
      placeholder="密码"
      :rules="[{ required: true, message: '请填写密码' }]"
    />
    <div style="margin: 16px">
      <van-button round block type="info" native-type="submit">登录</van-button>
    </div>
    <div style="margin: 16px">
      <van-button
        round
        block
        plain
        type="info"
        native-type="button"
        @click="toRegister"
      >
        没注册？去注册
      </van-button>
    </div>
  </van-form>
</template>

<script>
import { verify } from "../../utils/index";
import { Toast } from "vant";
import { mapMutations } from "vuex";
import Cookie from "js-cookie";
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    ...mapMutations(["setToken"]),
    async onSubmit(values) {
      // 进行表单校验
      const msg =
        verify.username(this.username) || verify.password(this.password);
      // console.log(msg);
      // 表单校验不通过 提示错误信息
      if (msg) {
        Toast(msg);
        return;
      }
      // 用户登录
      const { status, token } = await this.$api.userLogin(
        this.username,
        this.password
      );
      // 用户登录成功
      if (status == 200) {
        // 设置token
        this.setToken(token);
        // console.log(this.$store.state.token, "token");
        // 把token存到cookie中
        Cookie.set("token", token);
        // 跳转到我的页面
        this.$router.push("/my");
      }
      // console.log("submit", values);
    },
    // 没注册 跳转到注册页面
    toRegister() {
      this.$router.push("/my/register");
    },
  },
};
</script>

<style>
</style>