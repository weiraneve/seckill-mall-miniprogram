<template>
	<view>
		<scroll-view class="top-tab-bar" scroll-x="true" style="::-webkit-scrollbar { display: none; }">
			<view class="top-tab" v-for="(item, index) in tabList" :key="index"
				:class="{ 'active': currentTabIndex === index }" @click="switchTab(index)">
				{{ item.name }}
			</view>
		</scroll-view>
		<view class="tab-content" v-show="currentTabIndex === 0">
			<goods-card v-for="(goodsItem, index) in goodsList" :key="index" :goods_name="goodsItem.goods_name"
				:goods_image="goodsItem.goods_image" :goods_title="goodsItem.goods_title"
				:goods_price="goodsItem.goods_price" @buy="fetchData" />
		</view>
		<view class="tab-content" v-show="currentTabIndex === 1">
			<goods-card :goods_name="'商品2'" :goods_image="'/static/logo.png'" :goods_title="'商品2业务'"
				:goods_price="'¥200'" @buy="fetchData"></goods-card>
		</view>
		<view class="tab-content" v-show="currentTabIndex === 2" />
		<view class="tab-content" v-show="currentTabIndex === 3" />
	</view>
</template>

<script>
	import GoodsCard from '@/pages/component/goodsCard/goodsCard';
	import api from '@/common/api.js';

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
				],
				goodsList: [{
						goods_name: '商品1',
						goods_image: '/static/logo.png',
						goods_title: '商品1业务',
						goods_price: '¥100'
					},
					{
						goods_name: '商品2',
						goods_image: '/static/logo.png',
						goods_title: '商品2业务',
						goods_price: '¥200'
					},
					{
						goods_name: '商品3',
						goods_image: '/static/logo.png',
						goods_title: '商品3业务',
						goods_price: '¥300'
					},
					{
						goods_name: '商品4',
						goods_image: '/static/logo.png',
						goods_title: '商品4业务',
						goods_price: '¥400'
					}
				]
			};
		},
		methods: {
			switchTab(index) {
				this.currentTabIndex = index;
			},
			fetchData() {
				api.get('/')
					.then(response => {
						console.log('成功获取数据:', response);
					})
					.catch(error => {
						console.log('请求失败:', error);
					});
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