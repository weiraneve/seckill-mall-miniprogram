<template>
	<view>
		<scroll-view class="top-tab-bar" scroll-x="true" style="::-webkit-scrollbar { display: none; }">
			<view class="top-tab" v-for="(item, index) in tabList" :key="index"
				:class="{ 'active': currentTabIndex === index }" @click="switchTab(index)">
				{{ item.name }}
			</view>
		</scroll-view>
		<view class="tab-content" v-show="currentTabIndex === 0">
			<goods-card :goods_name="'商品1'" :goods_image="'/static/logo.png'" :goods_title="'商品1业务'"
				:goods_price="'¥100'" @buy="handleBuy"></goods-card>
		</view>
		<view class="tab-content" v-show="currentTabIndex === 1">
			<goods-card :goods_name="'商品2'" :goods_image="'/static/logo.png'" :goods_title="'商品2业务'"
				:goods_price="'¥200'" @buy="handleBuy"></goods-card>
		</view>
		<view class="tab-content" v-show="currentTabIndex === 2" />
		<view class="tab-content" v-show="currentTabIndex === 3" />
	</view>
</template>

<script>
	import GoodsCard from '../../component/goodsCard/goodsCard';

	export default {
		data() {
			return {
				currentTabIndex: 0,
				tabList: [{
						name: '已经开始'
					},
					{
						name: '今天已经开始'
					},
					{
						name: '未来即将开始'
					},
					{
						name: '已结束'
					},
				]
			};
		},
		methods: {
			switchTab(index) {
				this.currentTabIndex = index;
			},
			handleBuy(item) {
				console.log('购买了', item);
			}
		},
		components: {
			'goods-card': GoodsCard
		}
	};
</script>

<style>
	.top-tab-bar {
		display: flex;
		overflow-x: auto;
		white-space: nowrap;
		border-bottom: 1px solid #e5e5e5;
	}

	.top-tab-bar::-webkit-scrollbar {
		display: none;
	}

	.top-tab-bar {
		-ms-overflow-style: none;
		scrollbar-width: none;
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

	.tab-content {}
</style>