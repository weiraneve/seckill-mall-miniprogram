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
              >每个账号仅需登录1次，
              后续每次进入页面即可自动拉取用户信息。</text
            >
          </view>
        </block>
        <block v-if="hasLogin === false">
          <view class="uni-h3 uni-center uni-common-mt">未登录</view>
          <view class="uni-hello-text uni-center"> 请点击按钮登录 </view>
        </block>
      </view>
      <view class="uni-btn-v uni- uni-common-mt">
        <button type="primary" class="page-body-button" @tap="userLogin">
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
    ...mapState([
      "hasLogin",
      "isUniverifyLogin",
      "univerifyErrorMsg",
      "userInfo",
    ]),
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
    ...mapMutations(["login", "setUserInfo"]),
    Toast(data, duration = 1000) {
      uni.showToast(
        Object.assign({}, data, {
          duration,
        })
      );
    },
    userLogin() {
      this.login();
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
