<template>
	<section class="home">
		<h-menu router class="sidebar-wrap" :collapse="isCollapse">
			<template v-for="(menu, index) in get_menu_list">
				<h-menu-item v-if="menu.isShow && menu.children.length === 0" :index="menu.path" :key="menu.path">
					<i class="iconfont icon-success"></i>
					<span slot="title"> {{ menu.title || menu.name }}</span>
				</h-menu-item>
				<h-sub-menu v-if="menu.children.length !== 0" :index="`${index}`">
					<template slot="title">
						<span>{{ menu.title || menu.name }}</span>
					</template>
					<template v-for="(child, childIndex) in menu.children">
						<h-menu-item v-if="child.isShow && child.children.length === 0" :index="child.path" :key="child.path">
							<span slot="title"> {{ child.title || child.name }}</span>
						</h-menu-item>
						<h-sub-menu v-if="child.children.length !== 0" :index="`${index}-${childIndex}`">
							<template slot="title">
								<span>{{ child.title || child.name }}</span>
							</template>
							<h-menu-item v-for="item in child.children" v-if="item.isShow" :index="item.path" :key="item.path">
								<span slot="title"> {{ item.title || item.name }}</span>
							</h-menu-item>
						</h-sub-menu>
					</template>
				</h-sub-menu>
			</template>
		</h-menu>
		<div :class="{'main-container': true, 'main-container-collapse': isCollapse}">
			weqe
			<h-upload-file>
				<button slot="trigger">上传</button>
				<span slot="tip">2222</span>
			</h-upload-file>
		</div>
	</section>
</template>

<script type="text/babel">
	import AppMain from './app_main.vue'
	import NavBar from './nav_bar.vue'
	import TagViews from './tags_views.vue'
	import { mapGetters } from 'vuex'

	export default {
		name: 'home',
		components: {
			AppMain,
			NavBar,
			TagViews
		},
		data () {
			return {
				isCollapse: false,
				data_list: []
			}
		},
		computed: {
			...mapGetters([
				'get_menu_list'
			])
		},
		mounted () {
			
		}
	}
</script>

<style type="text/css" rel="stylesheet/scss" lang="scss" scoped>
	.home {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		overflow: hidden;
		font-size: 0;
		.sidebar-wrap {
			font-size: 16px;
			vertical-align: top;
			height: 100%;
		}
		.main-container {
			display: inline-block;
			height: 100%;
			width: calc(100% - 240px);
			vertical-align: top;
			font-size: 16px;
			padding: 10px 0 10px 10px;
			box-sizing: border-box;
			&.main-container-collapse {
				width: calc(100% - 42px);
			}
			.more_btn {
				font-size: 28px;
				position: absolute;
				left: 0;
				top: 0;
				transform: rotateZ(180deg);
				cursor: pointer;
				&.hidle-more-btn {
					transition: all 0.5;
					transform: rotateZ(360deg);
				}
			}
		}
	}
</style>