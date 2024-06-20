<template>
  <view>
    <view class="order-card" v-for="(order, index) in orderList" :key="index">
      <text class="order-goods-name">{{ order.goodsName }}</text>
      <text class="order-create-time"
        >创建时间: {{ formatTime(order.createdAt) }}</text
      >
    </view>
  </view>
</template>

<script>
import api from "@/network/api.js";

export default {
  data() {
    return {
      orderList: [],
    };
  },
  methods: {
    getOrders() {
      api
        .get("/mission/order")
        .then((response) => {
          if (response.success) {
            this.orderList = response.data || [];
          } else {
            this.orderList = [];
            console.log("请求失败")
            throw new Error("请求数据失败");
          }
        })
        .catch(() => {
          uni.showToast({
            title: "请求数据失败",
            icon: "none",
            duration: 2000,
          });
        });
    },
    formatTime(timeStr) {
      const date = new Date(timeStr);
      return date.toLocaleString();
    },
  },
  mounted() {
    this.getOrders();
  },
  onShow() {
    this.getOrders();
  },
};
</script>

<style>
.order-card {
  margin: 10px 5px;
  padding: 10px;
  background-color: #ffffff;
  border-radius: 5px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.order-goods-name {
  font-size: 16px;
  margin-right: 5px;
  color: #333;
}

.order-create-time {
  font-size: 12px;
  color: #666;
}
</style>
