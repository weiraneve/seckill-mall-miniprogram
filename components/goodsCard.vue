<template>
  <div class="card">
    <img :src="goods_image" class="goods-image"  alt=""/>
    <div class="card-body">
      <div class="goods-info">
        <div class="goods-name">{{ goods_name }}</div>
        <div class="goods-title">{{ goods_title }}</div>
        <div class="goods-price">价格: {{ goods_price }}</div>
        <div class="goods-stock">还剩: {{ goods_stock }}</div>
      </div>
      <button class="buy-btn" @click="handleBuyClick">即刻购买</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsCard",
  props: {
    goods_name: String,
    goods_image: String,
    goods_title: String,
    goods_price: String,
    goods_stock: String,
  },
  methods: {
    handleBuyClick() {
      this.$emit("buy");
    },
  },
};
</script>

<style>
.card {
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #eaeaea;
  margin: 10px;
  display: flex;
  flex-direction: column;
  background-color: #fff;
}

.goods-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.card-body {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px;
}

.goods-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.goods-name,
.goods-title,
.goods-price,
.goods-stock {
  margin-bottom: 1px;
}

.buy-btn {
  background-color: #1890ff;
  color: #fff;
  border: none;
  outline: none;
  padding: 3px 12px;
  text-align: center;
  font-size: 16px;
  border-radius: 4px;
  margin-right: 10px;
}
</style>
