<script type="text/jsx">
	import emitter from 'utils/emitter.js'
	import CollapseTransition from '@/components/collapse_transition.js'

	export default {
		name: 'HSubMenu',
		componentName: 'HSubMenu',
		render (h) {
			const component = (
				<ul class="subMenu-wrap" ref="subMenu">
					<span 
					  ref="subMenuTitle"
					  class={['subMenu-title', this.disabled ? 'is-disabled' : '']}
					  on-click={ this.showMoreItem }
					  on-mouseenter={ this.handlerMouseEnter }
					  on-mouseleave={ this.handlerMouseLeave }
					  style={{paddingLeft: this.paddingLeft + 'px', color: this.Color}}
					 >
						{ this.$slots.title }
					</span>
					<span 
					  class={['open-btn', this.isOpen ? 'is-open' : '', this.disabled ? 'is-disabled' : '']}
					  on-click={ this.showMoreItem }
					>
						{ this.$slots.openIcon }
						<i class="iconfont icon-jiantouarrow483" v-show={ !this.$slots.openIcon }></i>
					</span>
					<collapse-transition>
						<div 
						  style={{backgroundColor: this.backgroundClass}} 
						  v-show={ this.isOpen }
						>
							{ this.$slots.default }
						</div>
					</collapse-transition>
				</ul>
			)
			return component
		},
		inject: ['rootMenu'],
		mixins: [emitter],
		props: {
			backgroundColor: {
				type: String,
				default: ''
			},
			hoverColor: String,
			index: {
				type: String,
				required: true
			},
			disabled: Boolean,
			subBackgroundColor: {
				type: String,
				default: ''
			},
			subHoverColor: String,
			activeColor: String,
			textColor: String
		},
		data () {
			return {
				isOpen: false,
				paddingLeft: 20,
				items: {}
			}
		},
		computed: {
			backgroundClass () {
				return this.subBackgroundColor || this.$parent.subBackgroundColor || this.rootMenu.backgroundColor
			},
			Color () {
				return this.$parent.textColor || this.rootMenu.textColor
			}
		},
		methods: {
			showMoreItem () {
				if (this.disabled) { return }
				this.isOpen = !this.isOpen
				this.$emit('click', this.isOpen)
				this.dispatch('HMenu', 'submenu-click', [this.isOpen, this])
			},
			handlerMouseEnter (ev) {
				if (this.disabled) { return }
				this.$refs.subMenuTitle.style.background = this.hoverColor || this.$parent.subHoverColor || this.rootMenu.hoverColor
			},
			handlerMouseLeave (ev) {
				if (this.disabled) { return }
				this.$refs.subMenuTitle.style.background = this.backgroundColor || this.$parent.subBackgroundColor || this.rootMenu.backgroundColor
			},
			addItem (item) {
				this.$set(this.items, item.index, item)
			},
			removeItem (item) {
				delete this.items[item.index]
			}
		},
		created () {
			if (this.$parent.$options.componentName === 'HSubMenu') {
				this.paddingLeft += 20
			}
		},
		mounted () {
			this.rootMenu.addItem(this)
			if (this.$parent.$options.componentName === 'HSubMenu') {
				this.$parent.addItem(this)
				for (let key in this.items) {
					this.$parent.addItem(this.items[key])
				}
			}

			if (this.items.hasOwnProperty(this.rootMenu.activeIndex)) {
				this.isOpen = true
				if (this.rootMenu.uniqueOpened && this.$parent.$options.componentName === 'HMenu') {
					this.rootMenu.hasOpenSubmenus.push(this)
				}
			} else {
				// 默认打开的submenu
				!this.rootMenu.uniqueOpened && this.rootMenu.openMenus.some(index => {
					if (index === this.index || this.items.hasOwnProperty(index)) {
						this.isOpen = true
					}
				})
			}
		},
		beforeDestroy () {
			if (this.$parent.$options.componentName === 'HSubMenu') {
				for (let key in this.items) {
					this.$parent.removeItem(this.items[key])
				}
			}
		}
	}
</script>

<style type="text/scss" lang="scss" scoped>
	$defalut-height: 50px;

	.subMenu-wrap {
		list-style: none;
		margin: 0;
		padding: 0;
		position: relative;
		.subMenu-title {
			display: inline-block;
			height: $defalut-height;
			line-height: $defalut-height;
			font-size: 16px;
			color: white;
			width: 100%;
			box-sizing: border-box;
			&:hover {
				cursor: pointer;
			}
		}
		.open-btn {
			position: absolute;
			width: 16px;
			height: 16px;
			right: 14px;
			top: 15px;
			color: #909399;
			cursor: pointer;
			transition: transform 0.3s;
			transform-origin: 50% 50%;
		}
		.is-open {
			transition: transform 0.3s;
			transform: rotate(-180deg);
			transform-origin: 50% 50%;
		}
		.is-disabled {
			cursor: not-allowed!important;
			opacity: 0.5;
		}	}
</style>