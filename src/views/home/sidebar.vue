<template>
	<nav-menu :collapse="isCollapse">
		<menu-item></menu-item>
	</nav-menu>
	<!-- <el-menu router class="aside-sidebar" :default-active="$route.path" :collapse="isCollapse" background-color="#304156" text-color="#bfcbd9" active-text-color="#ffd04b">
		<el-menu-item :index="item.path" v-for="(item, index) in menus" v-if="item.children.length === 0" :key="item.path">
			<i :class="item.icon"></i>
			<span slot="title">{{ item.name }}</span>
		</el-menu-item>
		<el-submenu :index="item.path" v-else :key="item.path">
			<template slot="title">
				<i :class="item.icon"></i>
				<span slot="title">{{ item.name }}</span>
			</template>
			<el-menu-item :index="child.path" v-for="child in item.children" :key="child.path">
				<i :class="child.icon"></i>
				<span slot="title">{{ child.name }}</span>
			</el-menu-item>
		</el-submenu>
	</el-menu> -->
</template>

<script type="text/babel">
	import menus from '@/data/menus.js'

	export default {
		name: 'sidebar',
		props: {
			isCollapse: {
				type: Boolean,
				default () {
					return false
				}
			}
		},
		data () {
			return {
				menus: menus
			}
		}
	}
</script>

<style type="text/css" rel="stylesheet/scss" lang="scss" scoped>
	$sidebar-width: 220px;
	$menu-item-bgcolor: #1f2d3d;
	$menuHover: #001528;
	.aside-sidebar {
		display: inline-block;
	    height: 100%;
	    overflow-y: auto;
	    z-index: 200;
	    .el-submenu .el-submenu__title, .el-submenu .el-menu-item {
			background-color: $menu-item-bgcolor !important;
			&:hover {
				background-color: $menuHover !important;
			}
		}
		&::-webkit-scrollbar {
		  width: 6px;
		}
		&::-webkit-scrollbar-button {
		  display: none;
		}
		&::-webkit-scrollbar-track-piece, ::-webkit-scrollbar-track {
		  background: rgba(0,0,0, 0.67);
		}
	}
	.aside-sidebar:not(.el-menu--collapse) {
		display: inline-block;
	    width: $sidebar-width;
	    height: 100%;
	    overflow-y: auto;
	}
	
</style>