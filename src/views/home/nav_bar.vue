<template>
	<div class="nav-bar">
		<p v-for="menu in menus">
			<slot class="more_btn_slot" :children="menu"></slot>
		</p>
		<!-- <el-breadcrumb class="breadcrumb" separator="/">
		  	<transition-group name="breadcrumb">
		  		<el-breadcrumb-item :to="item.path" v-for="item in matched" :key="item.path"> {{ item.name }}</el-breadcrumb-item>
		  	</transition-group>
		</el-breadcrumb> -->
	</div>
</template>

<script type="text/babel">
	export default {
		name: 'navBar',
		data () {
			return {
				matched: [],
				// menu_list: menus
			}
		},
		props: {
			menus: {
				type: Array
			}
		},
		watch: {
			$route () {
				this.matched = this.$route.matched.filter(item => item.name)
			}
		},
		mounted () {
			console.log(this.menus)
			// 刷新时， 默认为当前路径
			this.matched = this.$route.matched.filter(item => item.name)
		}
	}
</script>

<style type="text/css" rel="stylesheet/scss" lang="scss" scoped>
	.nav-bar {
		width: 100%;
		height: 30px;
		line-height: 30px;
		position: relative;
		.breadcrumb {
			margin-left: 50px;
			height: 30px;
			line-height: 30px;
		}
	}
	/*breadcrumb transition*/
	.breadcrumb-enter-active, .breadcrumb-leave-active {
	  	transition: all .5s;
	}

	.breadcrumb-enter, .breadcrumb-leave-active {
	  	opacity: 0;
	  	transform: translateX(20px);
	}

	.breadcrumb-move {
	  	transition: all .5s;
	}

	.breadcrumb-leave-active {
	  	position: absolute;
	}
</style>