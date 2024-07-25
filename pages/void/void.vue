<template>
  <view class="container">
    <view class="return-button" @click="goBack">返回</view>
  </view>
</template>

<script>
export default {
  methods: {
    goBack() {
      uni.navigateBack()
    }
  }
}
</script>

<style>
.container {
  position: relative;
  width: 100%;
  height: 100vh;
}

.return-button {
  position: absolute;
  top: 40px;
  left: 15px;
  padding: 5px 10px;
  background-color: #f0f0f0;
  border-radius: 5px;
  font-size: 14px;
}
</style>