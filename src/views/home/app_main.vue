<template>
	<section class="app-main">
		<transition name="fade-transform" mode="out-in">
			<router-view />
		</transition>
	</section>
</template>

<script type="text/babel">
	export default {
		name: 'appMain',
		data () {
			return {

			}
		}
	}
</script>

<style type="text/css" rel="stylesheet/scss" lang="scss" scoped>
	.app-main {
		width: 100%;
		margin-top: 20px;
		height: calc(100% - 100px);
	}
	.fade-enter-active, .fade-leave-active {
	  	transition: opacity 0.28s;
	}

	.fade-enter, .fade-leave-active {
	  	opacity: 0;
	}

	/*fade-transform*/
	.fade-transform-leave-active, .fade-transform-enter-active {
	  	transition: all .5s;
	}
	.fade-transform-enter {
	  	opacity: 0;
	  	transform: translateX(-30px);
	}
	.fade-transform-leave-to {
	  	opacity: 0;
	  	transform: translateX(30px);
	}

</style>