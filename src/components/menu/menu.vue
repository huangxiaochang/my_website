<script type="text/jsx">

	export default {
		name: 'NavMenu',
		render(h) {
			const component = (
				<ul 
				role="menu"
				class="nav-menu"
				style={{ backgroundColor: this.backgroundColor || '' }}
				>
					{ this.$slots.default }
				</ul>
			)
			if (this.collapse) {
				return (
					<collapse-transition>{ component }</collapse-transition>
				)
			} else {
				return component
			}
		},
		props: {
			collapse: Boolean,
			backgroundColor: String
		},
		mounted () {
			console.log(888)
		}
	}
</script>

<style type="text/css" rel="stylesheet" lang="scss" scoped>
	$menu-bg: #4B4D4F;
	.nav-menu {
		background-color: $menu-bg;
		margin: 0;
	}
</style>