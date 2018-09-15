<template>
	<div class="tag-views-wrap" id="tag-views-wrap" @mousewheel.prevent="handlerHorizontalWheel($event)">
		<div id="tag-views" class="tag-views" :style="{left: tagViewsLeft  + 'px'}">
			<!-- <el-tag
			  :key="tag.path"
			  v-for="(tag, index) in dynamicTags"
			  closable
			  size="medium"
			  :id="tag.path"
			  :disable-transitions="false"
			  @close="handleClose(tag, index)"
			  :color="`${tag.path === $route.path ? '#E6A23C' : '#fff'}`"
			  :class="`${tag.path === $route.path ? 'active_tag_item' : 'tag_item'}`">
			  <span @click="handlerTagClick(tag)" @contextmenu="handleRightKeyClick($event, tag, index)" style="padding: 8px 0 8px 8px;">{{ tag.meta.title }}</span>
			</el-tag> -->
		</div>
		<div class="rightKeyMenu" v-if="showRightMenu" @click="right_key_menu_click" :style="{left: left, top: top}">
			<span class="right-menu-item" id="close">close</span>
			<span class="right-menu-item" id="close_others">close others</span>
			<span class="right-menu-item" id="close_all">close all</span>
		</div>
		<div>
			{{ this.$slots.default }}
		</div>
	</div>
</template>

<script type="text/babel">
	export default {
		name: 'TagViews',
		data () {
			return {
				dynamicTags: [],
				showRightMenu: false,
				left: 0,
				top: 0,
				rightKeyClickTag: null,
				rightKeyClickIndex: 0,
				tagViewsWrap: null,
				tagViewsWrapLeft: 0,
				tagViewsWrapRight: 0,
				tagViewsWrapWidth: 0,
				tagViews: null,
				tagViewsLeft: 0
			}
		},
		watch: {
			$route () {
				this.addTagView()
			}
		},
		mounted () {
			// 刷新之后，默认选择当前页面路由
			// this.addTagView()
			// // 去除默认右键点击事件
			// this.tagViewsWrap = document.getElementById('tag-views-wrap')
			// let clientRect = this.tagViewsWrap.getBoundingClientRect()
			// this.tagViewsWrapLeft = clientRect.left
			// this.tagViewsWrapWidth = clientRect.width
			// this.tagViewsWrapRight = this.tagViewsWrapLeft + clientRect.width
			// this.tagViews = document.getElementById('tag-views')
			// this.tagViewsWrap.oncontextmenu = function (e) {
			// 	return false
			// }

			// document.body.addEventListener('click', (e) => {
			// 	this.showRightMenu = false
			// }, false)
		},
		methods: {
			addTagView () {
				let flag  = false
				flag = this.dynamicTags.some((item) => {
					if (this.$route.path === item.path) {
						return true
					}
				})
				!flag && this.dynamicTags.push(this.$route)
				this.$nextTick(() => {
					// 如果超出了范围，保持最后一个可见
					this.moveToView()
				})
			},
			moveToView () {
				let active_tag = document.getElementById(this.$route.path)
				let rect = active_tag.getBoundingClientRect()
				let rect_left = rect.left
				let rect_right = rect_left + rect.width
				if (rect_left < this.tagViewsWrapLeft) {
					this.tagViewsLeft += this.tagViewsWrapLeft - rect_left
				} 
				if (rect_right > this.tagViewsWrapRight) {
					this.tagViewsLeft -= rect_right - this.tagViewsWrapRight + 72
				}
			},
			handlerTagClick (tag) {
				if (this.$route.path === tag.path) {
					return
				}
				this.$router.push({
					path: tag.path
				})
			},
			handleRightKeyClick(ev, tag, index) {
				this.showRightMenu = true
				this.left = ev.screenX - this.tagViewsWrapLeft + 10 + 'px'
				this.top = 20 + 'px'
				this.rightKeyClickTag = tag
				this.rightKeyClickIndex = index
			},
			right_key_menu_click (ev) {
				let id = ev.target.id
				switch(id) {
					case 'close':
						this.handleClose(this.rightKeyClickTag, this.rightKeyClickIndex)
						break
					case 'close_others':
						this.closeOthersOrAll(this.rightKeyClickTag)
						break
					case 'close_all':
						this.closeOthersOrAll()
						break
					default: 
						break
				}
			},
			closeOthersOrAll (tag) {
				let url = '/home'
				this.dynamicTags = []
				if (tag) {
					url = tag.path
					this.dynamicTags.push(tag)
				}
				this.$router.push({
					path: url
				})
			},
			handleClose (tag, index) {
				this.dynamicTags.splice(index, 1)
				// 如果关闭的是当前的路由页，进行跳转当前页到默认(队列的最后)
				if (tag.path === this.$route.path) {
					let next_route = this.dynamicTags[this.dynamicTags.length - 1]
					let url = next_route ? next_route.path : '/home'
					this.$router.push({
						path: url
					})
					// 改变当前菜单的选中
					bus.$emit('changeActiveMenu', url)
				}
			},
			handlerHorizontalWheel (ev) {
				let clientRect = this.tagViews.getBoundingClientRect()
				let tagViewsLeft = clientRect.left
				let tagViewsWidth =  clientRect.width
				let tagViewsRight = tagViewsLeft + tagViewsWidth
				if (tagViewsRight === this.tagViewsWrapRight && tagViewsLeft === this.tagViewsWrapLeft) {
					return
				}
				if (ev.deltaY > 0) {
					// 右滚
					this.tagViewsLeft -= 80
					if (tagViewsLeft + tagViewsWidth <= this.tagViewsWrapRight) {
						this.tagViewsLeft = this.tagViewsWrapWidth - tagViewsWidth
					}
				} else {
					// 左滚
					this.tagViewsLeft += 80
					if (this.tagViewsLeft >= 0  ) {
						this.tagViewsLeft = 0	
					}
				}
			}
		}
	}
</script>

<style type="text/css" rel="stylesheet/scss" lang="scss" scoped>
	$border-color: #E4E7ED;

	.tag-views-wrap {
		width: 100%;
		height: 40px;
		line-height: 40px;
		margin-top: 10px;
		border-top: 1px solid $border-color;
		border-bottom: 1px solid $border-color;
		position: relative;
		.tag-views {
			min-width: 100%;
			display: inline-block;
			overflow-x: scroll;
			white-space: nowrap;
			overflow-y: hidden;
			position: absolute;
			&::-webkit-scrollbar {
			  display: none;
			}
		}
		.tag_item, .active_tag_item{
			margin-right: 10px;
			color: #000;
			cursor: pointer;
			padding-left: 0;
			padding-right: 10;
		}
		.active_tag_item {
			color: #fff;
		}
		.rightKeyMenu {
			position: absolute;
			z-index: 3000;
			box-shadow: 0 0 4px #E4E7ED;
			background-color: #F2F6FC;
			width: 120px;
			.right-menu-item {
				display: block;
				height: 30px;
				line-height: 30px;
				padding-left: 10px;
				&:hover {
					cursor: pointer;
					background-color: #E4E7ED;
				}
			}
		}
	}
</style>