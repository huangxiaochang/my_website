<template>
	<section class="home">
		<sidebar class="sidebar-wrap" :isCollapse="isCollapse"></sidebar>
		<!-- <div class="main-container" :class="{'hidle-wrap': isCollapse}">
			<nav-bar :menus="get_menu_list">
				<i class="iconfont icon-zhankai- more_btn" :class="{'hidle-more-btn': isCollapse}" @click="isCollapse = !isCollapse"></i>7777
				<template slot-scope="menu">
					<div v-for=" child in menu" v-if="menu.children && menu.children.length !== 0">
						{{child.name}}
						<p v-for="item in child.children"> {{item.name}}</p>
					</div>
				</template>
			</nav-bar>
			<tag-views>
				23332344444
			</tag-views>
			<app-main>sfg</app-main>
			777222
		</div> -->
	</section>
</template>

<script type="text/babel">
	import Sidebar from './sidebar.vue'
	import AppMain from './app_main.vue'
	import NavBar from './nav_bar.vue'
	import TagViews from './tags_views.vue'
	import { mapGetters } from 'vuex'

	export default {
		name: 'home',
		components: {
			Sidebar,
			AppMain,
			NavBar,
			TagViews
		},
		data () {
			return {
				isCollapse: false
			}
		},
		computed: {
			...mapGetters([
				'get_menu_list'
			])
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
		.sidebar-wrap {
			vertical-align: top;
		}
		.main-container {
			display: inline-block;
			height: 100%;
			width: calc(100% - 221px);
			vertical-align: top;
			font-size: 16px;
			padding: 10px 0 10px 10px;
			box-sizing: border-box;
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
			&.hidle-wrap {
				width: calc(100% - 65px);
			}
		}
	}
</style>