<template>
	<view>
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="item in bannerList" :key='item.goods_id'>
				<view class="swiper-item">
					<image :src="item.image_src" @click="gotoGood(item.goods_id)"></image>
				</view>
			</swiper-item>
		</swiper>
		<view class="nav-list">
			<view @click="goTab(item)" v-for="item,index in catItems" :key="index">
				<image class="nav-img" :src="item.image_src"></image>
			</view>
		</view>
		<!-- 楼层区域 -->
		<view class="floor-list">
			<!-- 楼层 item 项 -->
			<view class="floor-item" v-for="(item,index) in floorList" :key="index">
				<!-- 楼层标题 -->
				<image :src="item.floor_title.image_src" class="floor-title"></image>

				<!-- 楼层图片区域 -->
				<view class="floor-img-box">
					<!-- 左侧大图片的盒子 -->
					<navigator :url="item.product_list[0].url" class="left-img-box">
						<image class="left-img" :src="item.product_list[0].image_src"
							:style="{width: item.product_list[0].image_width + 'rpx'}"></image>
					</navigator>
					<!-- 右侧 4 个小图片的盒子 -->
					<view class="right-img-box">
						<navigator :url="item2.url" class="right-img-item" v-for="(item2, i2) in item.product_list" :key="i2" v-if="i2 !== 0">
							<image :src="item2.image_src" mode="widthFix" :style="{width: item2.image_width + 'rpx'}">
							</image>
						</navigator>
					</view>
				</view>


			</view>
		</view>

	</view>
</template>

<script>
	import {
		getBanners,
		getCatItems,
		getfloor
	} from '@/api/home.js'
	import toast from '@/utils/toast.js'
	export default {
		data() {
			return {
				bannerList: [],
				catItems: [],
				floorList: []
			};
		},
		methods: {
			// 获取楼层列表
			async getfloor() {
				try {
					const res = await getfloor()
					res.message.forEach(floor => {
						floor.product_list.forEach(prod => {
							prod.url = '/subpkg/goods_list/goods_list?' + prod.navigator_url.split('?')[1]
						})
					})
					this.floorList = res.message
				} catch (e) {
					toast.error('获取失败', 2000)
				}
			},
			// 获取轮播图图片
			async getBanners() {
				try {
					const res = await getBanners()
					this.bannerList = res.message
				} catch (e) {
					toast.error('获取失败', 2000)
				}
			},
			//获取菜单图片
			async getCatItems() {
				try {
					const res = await getCatItems()
					this.catItems = res.message

				} catch (e) {
					toast.error('获取失败', 2000)
				}
			},
			goTab(item) {
				if (item.name === '分类') {
					uni.switchTab({
						url: '/pages/cate/cate'
					})
				}
			},

			gotoGood(id) {
				uni.navigateTo({
					url: '/subpkg/goods-detail/goods-detail?id=' + id
				})
			}
		},
		onLoad() {
			this.getBanners()
			this.getCatItems()
			this.getfloor()
		}

	}
</script>

<style lang="scss">
	swiper {
		height: 330rpx;

		.swiper-item,
		image {
			width: 100%;
			height: 100%;
		}
	}

	.nav-list {
		display: flex;
		justify-content: space-around;
		margin: 15px 0;

		.nav-img {
			width: 128rpx;
			height: 140rpx;
		}
	}

	.floor-title {
		height: 60rpx;
		width: 100%;
		display: flex;
	}

	.right-img-box {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
	}

	.floor-img-box {
		display: flex;
		padding-left: 10rpx;

		.left-img {
			height: 392rpx !important;
		}
	}
</style>
