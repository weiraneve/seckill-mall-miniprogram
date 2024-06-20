<template>
  <view>
    <scroll-view
      class="top-tab-bar"
      scroll-x="true"
      style="
        ::-webkit-scrollbar {
          display: none;
        }
      "
    >
      <view
        class="top-tab"
        v-for="(item, index) in tabList"
        :key="index"
        :class="{ active: currentTabIndex === index }"
        @click="switchTab(index)"
      >
        {{ item.name }}
      </view>
    </scroll-view>
    <view v-if="currentTabGoods.length > 0" class="tab-content">
      <goods-card
        v-for="(goodsItem, index) in currentTabGoods"
        :key="index"
        :goods_name="goodsItem.goods_name"
        :goods_image="goodsItem.goods_image"
        :goods_title="goodsItem.goods_title"
        :goods_price="goodsItem.goods_price"
        @buy="seckill"
      />
    </view>
    <view v-else class="tab-content">暂无商品</view>
  </view>
</template>

<script>
import GoodsCard from "@/components/goodsCard";
import api from "@/network/api.js";

export default {
  data() {
    return {
      currentTabIndex: 0,
      tabList: [
        { name: "已经开始" },
        { name: "今天已经开始" },
        { name: "未来即将开始" },
        { name: "已结束" },
      ],
      goodsList: [],
    };
  },
  computed: {
    currentTabGoods() {
      const currentDate = new Date().getTime();
      if (this.currentTabIndex === 0) {
        return this.goodsList.filter(
          (item) =>
            new Date(item.goods.startTime).getTime() <= currentDate &&
            new Date(item.goods.endTime).getTime() >= currentDate
        );
      } else if (this.currentTabIndex === 1) {
        const todayStart = new Date(new Date().setHours(0, 0, 0, 0)).getTime();
        return this.goodsList.filter(
          (item) =>
            new Date(item.goods.startTime).getTime() <= todayStart &&
            new Date(item.goods.endTime).getTime() >= todayStart
        );
      } else if (this.currentTabIndex === 2) {
        const tomorrowStart =
          new Date(new Date().setHours(0, 0, 0, 0)).getTime() +
          24 * 60 * 60 * 1000;
        return this.goodsList.filter(
          (item) => new Date(item.goods.startTime).getTime() >= tomorrowStart
        );
      } else if (this.currentTabIndex === 3) {
        return this.goodsList.filter(
          (item) => new Date(item.goods.endTime).getTime() < currentDate
        );
      } else {
        return [];
      }
    },
  },
  methods: {
    switchTab(index) {
      this.currentTabIndex = index;
    },
    getGoodsList() {
      api
        .get("/mission/goods/getGoodsList")
        .then((response) => {
          if (response.success) {
            this.goodsList = response.data || [];
          } else {
            this.goodsList = [];
            throw new Error("请求数据失败");
          }
        })
        .catch(() => {
          this.goodsList = [];
          uni.showToast({
            title: "请求数据失败",
            icon: "none",
            duration: 2000,
          });
        });
    },
    seckill() {
      api
        .get("/mission/seckill/getPath?goodsId=1")
        .then((response) => {
          if (response.success) {
            const path = response.data;
            return api.get(`/mission/seckill?goodsId=1&path=${path}`);
          } else {
            throw new Error("获取路径失败");
          }
        })
        .then(() => {
          uni.showToast({
            title: "秒杀成功",
            icon: "success",
            duration: 2000,
          });
        })
        .catch(() => {
          uni.showToast({
            title: "秒杀失败，请重试",
            icon: "none",
            duration: 2000,
          });
        });
    },
  },
  components: {
    "goods-card": GoodsCard,
  },
  mounted() {
    this.getGoodsList();
  },
  onShow() {
    this.getGoodsList();
  },
};
</script>

<style scoped>
.top-tab-bar {
  display: flex;
  overflow-x: auto;
  white-space: nowrap;
  border-bottom: 1px solid #e5e5e5;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.top-tab-bar::-webkit-scrollbar {
  display: none;
}

.top-tab {
  display: inline-block;
  padding: 10px 15px;
  font-size: 16px;
  color: #666;
}

.top-tab.active {
  color: #007aff;
  border-bottom: 2px solid #007aff;
}

.tab-content {
  opacity: 1; /* 占位 */
}
</style>
