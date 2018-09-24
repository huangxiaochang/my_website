<script type="text/jsx">
	import emitter from 'utils/emitter.js'
	import CollapseTransition from '@/components/collapse_transition.js'

	export default {
		name: 'HSubMenu',
		componentName: 'HSubMenu',
		render (h) {
			const component = (
				<ul class="subMenu-wrap">
					<span 
					  ref="subMenuTitle"
					  class="subMenu-title"
					  on-click={ this.showMoreItem }
					  on-mouseenter={ this.handlerMouseEnter }
					  on-mouseleave={ this.handlerMouseLeave }
					 >
						{ this.$slots.title }
					</span>
					<span class={['open-btn', this.isShow ? 'is-open' : '']} on-click={ this.showMoreItem }>
						{ this.$slots.openIcon }
						<span v-show={ !this.$slots.openIcon }>></span>
					</span>
					<collapse-transition>
						<div class="subMenu-content" v-show={ this.isShow }>
							{ this.$slots.default }
						</div>
					</collapse-transition>
				</ul>
			)
			return component
		},
		inject: ['rootMenu'],
		props: {
			backgroundColor: {
				type: String,
				default: ''
			},
			hoverColor: String
		},
		data () {
			return {
				isShow: false
			}
		},
		methods: {
			showMoreItem () {
				this.isShow = !this.isShow
			},
			handlerMouseEnter () {
				this.$refs.subMenuTitle.style.background = this.hoverColor || this.rootMenu.hoverColor
			},
			handlerMouseLeave () {
				this.$refs.subMenuTitle.style.background = this.backgroundColor || this.rootMenu.backgroundColor
			}
		},
		mounted () {
			console.log(88)
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
			padding: 0 20px;
			box-sizing: border-box;
			&:hover {
				cursor: pointer;
			}
		}
		.open-btn {
			position: absolute;
			width: 20px;
			height: 20px;
			right: 14px;
			top: 15px;
			color: #909399;
			cursor: pointer;
		}
		.is-open {
			transform: rotate(180deg);
		}
		.subMenu-content {
			padding: 0 14px;
		}
	}
</style>