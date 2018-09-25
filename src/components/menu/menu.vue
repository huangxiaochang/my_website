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
				activeIndex: this.defaultActive,
				items: {},
				hasOpenSubmenus: []
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
			textColor: String,
			type: {
				type: String,
				default: 'vertical'
			},
			defaultActive: String,
			router: Boolean,
			openMenus: {
				type: Array,
				default () {
					return []
				}
			},
			uniqueOpened: {
				type: Boolean,
				default: false
			}
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
			},
			handlerSubmenuClick (isOpen, submenu) {
				if (isOpen) {
					this.$emit('open', submenu)
					if (this.uniqueOpened && submenu.$parent.$options.componentName === 'HMenu') {
						this.hasOpenSubmenus.forEach(sub => {
							sub.isOpen = false
						})
						this.hasOpenSubmenus.length = 0
						this.hasOpenSubmenus.push(submenu)
					}
				} else {
					this.$emit('close', submenu)
					this.hasOpenSubmenus.splice(this.hasOpenSubmenus.indexOf(submenu), 1)
				}
			},
			addItem (item) {
				this.$set(this.items, item.index, item)
			},
			removeItem (item) {
				delete this.items[item.index]
			}
		},
		created () {
			this.$on('item-click', this.handlerItemClick)
			this.$on('submenu-click', this.handlerSubmenuClick)
		},
		mounted () {
			console.log(this.hasOpenSubmenus)
		}
	}
</script>

<style type="text/scss" rel="stylesheet" lang="scss" scoped>
	$menu-bg: #4B4D4F;
	$default-width: 240px;

	.nav-menu {
		position: relative;;
		background-color: $menu-bg;
		margin: 0;
		padding: 0;
		list-style: none;
		width: $default-width;
	}
</style>