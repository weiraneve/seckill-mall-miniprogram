<template>
  <view>
    <view class="uni-padding-wrap">
      <view style="background: #fff; padding: 40rpx">
        <block v-if="hasLogin === true">
          <view class="uni-h3 uni-center uni-common-mt">已登录 </view>
          <view class="uni-hello-text uni-center">
            <text
              >每个账号仅需登录1次，后续每次进入页面即可自动拉取用户信息。</text
            >
          </view>
        </block>
        <block v-if="hasLogin === false">
          <view class="uni-h3 uni-center uni-common-mt">未登录</view>
          <view class="uni-hello-text uni-center"> 请点击按钮登录 </view>
        </block>
      </view>
      <view class="button-wrapper">
        <view class="uni-btn-v uni- uni-common-mt button-flex-container">
          <!-- #ifdef MP-WEIXIN || MP-BAIDU || MP-QQ  || MP-JD -->
          <button type="primary" open-type="getUserInfo" @getuserinfo="login">
            登录
          </button>
          <button type="primary" @tap="logout">注销</button>
          <button
            type="primary"
            open-type="getPhoneNumber"
            @getphonenumber="getPhoneNumber"
          >
            获取手机号
          </button>
          <!-- #endif -->
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      title: "login",
      univerifyBtnLoading: false,
    };
  },
  computed: {
    ...mapState(["hasLogin", "univerifyErrorMsg", "userInfo"]),
  },
  onLoad() {},
  methods: {
    ...mapMutations(["login", "logout", "getPhoneNumber"]),
  },
};
</script>

<style>
button {
  background-color: #007aff;
  color: #ffffff;
}
.button-flex-container {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}
</style>
