<template>
  <view>
    <view class="uni-padding-wrap">
      <view style="background: #fff; padding: 40rpx">
        <block v-if="hasLogin === true">
          <view class="uni-h3 uni-center uni-common-mt"
            >已登录
            <text v-if="isUniverifyLogin" style="font-size: 0.8em">
              <i
                v-if="!phoneNumber.length"
                class="uni-icon_toast uni-loading"
              ></i>
              <i v-else>（{{ phoneNumber }}）</i>
            </text>
          </view>
          <view class="uni-hello-text uni-center">
            <text
              >每个账号仅需登录 1
              次，\n后续每次进入页面即可自动拉取用户信息。</text
            >
          </view>
        </block>
        <block v-if="hasLogin === false">
          <view class="uni-h3 uni-center uni-common-mt">未登录</view>
          <view class="uni-hello-text uni-center"> 请点击按钮登录 </view>
        </block>
      </view>
      <view class="uni-btn-v uni- uni-common-mt">
        <button type="primary" class="page-body-button" @click="tologin">
          微信登录
        </button>
      </view>
    </view>
  </view>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { config } from "../../env.js";

export default {
  data() {
    return {
      title: "login",
      phoneNumber: "",
      univerifyBtnLoading: false,
    };
  },
  computed: {
    ...mapState(["hasLogin", "isUniverifyLogin", "univerifyErrorMsg"]),
  },
  onLoad() {
    if (this.hasLogin && this.isUniverifyLogin) {
      this.getPhoneNumber(uni.getStorageSync("univerifyInfo")).then(
        (phoneNumber) => {
          this.phoneNumber = phoneNumber;
        }
      );
    }
  },
  methods: {
    ...mapMutations(["login", "setUniverifyLogin"]),
    Toast(data, duration = 1000) {
      uni.showToast(
        Object.assign({}, data, {
          duration,
        })
      );
    },
    tologin() {
      uni.login({
        provider: "weixin",
        success: async (res) => {
          console.log("login success:", res);
          this.Toast({
            title: "登录成功",
          });
          this.login("weixin");
          uni.login({
            provider: "weixin",
            success: (res) => {
              let appid = config.appid;
              let secret = config.secret;
              let appIdUrl =
                "https://api.weixin.qq.com/sns/jscode2session?appid=" +
                appid +
                "&secret=" +
                secret +
                "&js_code=" +
                res.code;
              uni.request({
                url: appIdUrl,
                success: (result) => {
                  this.openid = result.data.openid;
                  console.log("openid:", result.data.openid);
                },
              });
            },
          });
        },
        fail: (err) => {
          console.log("login fail:", err);
          uni.showModal({
            showCancel: false,
            title: "登录失败",
            content: JSON.stringify(err),
          });
        },
      });
    },
  },
};
</script>

<style>
button {
  background-color: #007aff;
  color: #ffffff;
}
</style>
