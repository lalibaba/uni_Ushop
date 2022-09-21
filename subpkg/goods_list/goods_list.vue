<template>
	<view>
		<view class="goods-list">
			<block v-for="(item, i) in goodsList" :key="i">
				<navigator :url="'/subpkg/goods-detail/goods-detail?id='+item.goods_id" >
				<goodItem :item="item"></goodItem>
				</navigator>
			</block>
		</view>
	</view>
</template>

<script>
	import {
		getSearchGoods
	} from '@/api/goods.js'
	import toast from "@/utils/toast.js"
	export default {
		data() {
			return {
				isLoading: false,
				query: {
					query: '',
					cid: '',
					pagenum: 1,
					pagesize: 10
				},
				// 商品列表的数据
				goodsList: [],
				// 总数量，用来实现分页
				total: 0
			};
		},
		methods: {
			async getSearchGoods(cb) {
				try {
					this.isLoading = true
					uni.showLoading({
						title: '正在加载中...',
						mask: false
					});
					const {
						message: {
							goods,
							pagenum,
							total
						}
					} = await getSearchGoods(this.query)
					this.goodsList = [...this.goodsList, ...goods]
					this.total = total
				} catch (e) {
					//TODO handle the exception
				} finally {
					this.isLoading = false
					uni.hideLoading()
					cb&&cb()
				}

			}
		},
		onLoad(option) {
			this.query.query = option.query
			this.getSearchGoods()
		},
		onPullDownRefresh() {
			this.query = {
					query: '',
					cid: '',
					pagenum: 1,
					pagesize: 10
				},
			this.goodsList = [],
			this.getSearchGoods(()=>{
				uni.stopPullDownRefresh();
			})
		},
		onReachBottom() {
			if (this.query.pagenum * this.query.pagesize >= this.total) {
				return toast('数据加载完了~', 'none', 2000)
			}
			if (this.isLoading){ return}
			 ++this.query.pagenum,
				this.getSearchGoods()
		}
	}
</script>

<style lang="scss" scoped>
	.goods-item {
		display: flex;
		padding: 10px 5px;
		border-bottom: 1px solid #f0f0f0;

		.goods-item-left {
			margin-right: 5px;

			.goods-pic {
				width: 100px;
				height: 100px;
				display: block;
			}
		}

		.goods-item-right {
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.goods-name {
				font-size: 13px;
			}

			.goods-price {
				font-size: 16px;
				color: #c00000;
			}
		}
	}
</style>
