<template>
	<view>
		<view class="order-card" v-for="(order, index) in orderList" :key="index">
			<text class="order-goods-name">{{ order.goods_name }}</text>
			<text class="order-create-time">创建时间: {{ order.create_time }}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderList: [{
						goods_name: '商品A',
						create_time: '2023-11-01 08:00:00'
					},
					{
						goods_name: '商品B',
						create_time: '2023-11-02 09:00:00'
					},
				],
			};
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