<template>
	<div class="recommend">
		<scroll ref="scroll" class="recommend-content">
			<div>
				<div v-if="recommends.length" class="slider-wrapper" ref="sliderWrapper">
					<slider>
						<div v-for="item in recommends">
							<a :href="item.linkUrl">
								<img :src="item.picUrl" class="needsClick">
							</a>
						</div>
					</slider>
				</div>
				<!--歌单推荐数据列表 未完-->
				<div class="recommend-list">
					<h1 class="list-title">热门歌单推荐</h1>
					<ul>
						<li @click="selectItem(item)" v-for="item in discList" class="item">
							<div class="icon">
								<img width="60" height="60" v-lazy="item.imgUrl"
							</div>
							<div class="text">
								<h2 class="name" v-html="item.creator.name"></h2>
								<p class="desc" v-html="item.dissname"></p>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</scroll>
	</div>
</template>

<script type="text/ecmascript-6">
	import Scroll from 'base/scroll/scroll'
	import Slider from 'base/slider/slider'
	import {getRecommend, getDiscList} from 'api/recommend'
	import {ERR_OK} from 'api/config'

	export default {
		data() {
			return {
				recommends: [],
				discList: []
			}
		},
		created() {
			this._getRecommend()

			this._getDiscList
		},
		methods: {
			selectItem(item) {
				this.$router.push({
					path: `/recommend/${item.dissid}`
				})
				this.setDisc(item)
			},
			_getRecommend() {
				getRecommend().then((res) => {//此处不能少() getRecommend()
					if (res.code == ERR_OK) {
						this.recommends = res.data.slider
					}
				})
			},
			_getDiscList() {
				getDiscList().then((res) => {
					if (res.code === ERR_OK) {
						this.discList = res.data.list
					}
				})
			}
		},
		components: {
			Scroll,
			Slider
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>