<script type="text/jsx">

	export default {
		name: 'HMenu',
		componentName: 'HMenu',
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
		provide() {
			return {
				rootMenu: this
			}
		},
		data () {
			return {
				activeIndex: this.defaultActive
			}
		},
		props: {
			collapse: Boolean,
			backgroundColor: String,
			activeColor: {
				type: String,
				default: 'rgb(255, 208, 75)'
			},
			activeBackground: {
				type: String,
				default: ''
			},
			hoverColor: {
				type: String,
				default: '#5E5E60'
			},
			menuItemColor: String,
			type: {
				type: String,
				default: 'vertical'
			},
			defaultActive: String,
			router: Boolean
		},
		methods: {
			handlerItemClick (menuItem) {
				const { index, route } = menuItem
				const oldActiveIndex = this.activeIndex
				this.activeIndex = index
				this.$emit('select', index, menuItem)
				if (this.router) {
					let r = route || index
					this.$router.push(r, () => {}, (error) => {
						console.error(error)
					})
				}
			}
		},
		created () {
			this.$on('item-click', this.handlerItemClick)
		}
	}
</script>

<style type="text/css" rel="stylesheet" lang="scss" scoped>
	$menu-bg: #4B4D4F;
	$default-width: 220px;

	.nav-menu {
		position: relative;;
		background-color: $menu-bg;
		margin: 0;
		padding: 0;
		list-style: none;
		width: $default-width;
	}
</style>