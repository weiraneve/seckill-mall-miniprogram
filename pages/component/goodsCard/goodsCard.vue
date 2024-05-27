<template>
	<view class="card">
		<image :src="goods_image" class="goods-image"></image>
		<view class="card-body">
			<view class="goods-info">
				<view class="goods-name">{{ goods_name }}</view>
				<view class="goods-title">{{ goods_title }}</view>
				<view class="goods-price">{{ goods_price }}</view>
			</view>
			<button class="buy-btn" @click="handleBuyClick">即刻购买</button>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'GoodsCard',
		props: {
			goods_name: String,
			goods_image: String,
			goods_title: String,
			goods_price: String,
		},
		methods: {
			handleBuyClick() {
				this.$emit('buy', {
					goods_name: this.goods_name,
					goods_image: this.goods_image,
					goods_title: this.goods_title,
					goods_price: this.goods_price
				});
			}
		}
	}
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
	.goods-price {
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