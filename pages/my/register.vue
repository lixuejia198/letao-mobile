<template>
  <van-form @submit="onSubmit">
    <!-- 用户名 -->
    <van-field
      v-model="username"
      name="username"
      label="用户名"
      placeholder="用户名"
      :rules="[{ required: true, message: '请填写用户名' }]"
    />
    <!-- 密码 -->
    <van-field
      v-model="password"
      type="password"
      name="password"
      label="密码"
      placeholder="密码"
      :rules="[{ required: true, message: '请填写密码' }]"
    />
    <!-- 确认密码 -->
    <van-field
      v-model="repeatPassword"
      type="password"
      name="repeatPassword"
      label="确认密码"
      placeholder="确认密码"
      :rules="[{ required: true, message: '请再次填写密码' }]"
    />
    <!-- 手机号 -->
    <van-row>
      <van-col span="16">
        <van-field
          v-model="mobile"
          name="mobile"
          label="手机号"
          placeholder="手机号"
          :rules="[{ required: true, message: '请填写手机号' }]"
        />
      </van-col>
      <!-- 发送短信 -->
      <van-col span="5" offset="3">
        <van-button
          type="primary"
          size="small"
          @click="onsendSms"
          :disabled="isDisabled"
        >
          {{ sendsmstext }}
        </van-button>
      </van-col>
    </van-row>
    <!-- 验证码 -->
    <van-field
      v-model="smscode"
      name="smscode"
      label="验证码"
      placeholder="验证码"
      :rules="[{ required: true, message: '请填写验证码' }]"
    />
    <!-- 用户需知 -->
    <van-row>
      <van-col offset="1">
        <van-checkbox v-model="checked" shape="square">
          我同意《会员服务协议
        </van-checkbox>
      </van-col>
    </van-row>
    <div style="margin: 16px">
      <van-button round block type="info" native-type="submit">注册</van-button>
    </div>
  </van-form>
</template>

<script>
import { Toast } from "vant";
import { verify } from "../../utils/index";
export default {
  data() {
    return {
      username: "", // 用户名
      password: "", // 密码
      repeatPassword: "", // 确认密码
      mobile: "", // 手机号
      smscode: "", // 验证码
      smscodeserver: "", // 保存短信接口返回的短信
      checked: false, // 用户协议勾选
      isDisabled: false, // 发信短信是否禁用
      timer: null, // 定时器ID
      sendsmstext: "发送短信", // 发送短信按钮文字
    };
  },
  methods: {
    // 发送短信
    async onsendSms() {
      // 验证用户输入的手机号
      const msg = verify.mobile(this.mobile);
      // 手机号验证不通过 提示错误信息
      if (msg) {
        Toast(msg);
        return;
      }
      // 一般发送短信按钮不能有连续发送短信的功能 得隔一段时间之后才能发送短信
      this.isDisabled = true;
      let time = 30;
      // 发送短信验证码
      const { code } = await this.$api.sendSms(this.mobile);
      this.smscodeserver = code;
      this.timer = setInterval(() => {
        time--;
        this.sendsmstext = `倒计时${time}`;
        if (time == 0) {
          this.isDisabled = false;
          this.sendsmstext = "发送短信";
          clearInterval(this.timer);
        }
      }, 1000);
    },
    // 提交表单验证通过后的回调
    async onSubmit(values) {
      if (!this.checked) {
        Toast("请阅读会员协议，同意后才可注册");
        return;
      }
      // 验证信息
      const msg =
        verify.username(this.username) ||
        verify.password(this.password, this.repeatPassword) ||
        verify.mobile(this.mobile);
      // console.log(msg);
      // 验证不通过 提示错误信息
      if (msg) {
        Toast(msg);
        return;
      }
      if (this.smscode !== this.smscodeserver) {
        Toast("短信验证码有误，请重新输入");
        return;
      }
      // console.log("submit", values);
      // 解构用户注册需要传入的参数
      const { username, password, mobile } = values;
      // 进行用户注册
      const { status } = await this.$api.userRegister(
        username,
        password,
        mobile
      );
      // 用户注册成功 就进行页面跳转 跳转到登录页面
      if (status == 200) {
        this.$router.push("/my/login");
      }
    },
  },
};
</script>

<style scoped>
.van-col--offset-3 {
  margin-top: 6px;
}
</style>