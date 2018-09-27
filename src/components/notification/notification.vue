<template>
	<transition name="notification-fade">
		<aside 
		  v-show="show" 
		  class="notification-wrap"
		  :class="[horizontalClass]"
		  :style="verticalPosition"
		  @click="handlerClick"
		  @mouseenter="clearTimer"
		  @mouseleave="startTimer"
		>
			<i :style="{color: iconColor}" :class="[iconClass, defaultIconClass]" class="notification-icon-wrap" v-if="type || iconClass"></i>
			<div class="notification-content-wrap">
				<h3 class="notification-title" v-text="title"></h3>
				<p class="notification-content" v-if="isUseHTMLString" v-html="message"></p>
				<p class="notification-content" v-else> {{ message }}</p>
			</div>
			<i class="notification-close-btn iconfont icon-guanbi" @click="close" v-if="isShowCloseBtn"></i>
		</aside>
	</transition>
</template>

<script type="text/babel">
	const icoMapType = {
		'info': 'iconfont icon-info notification-info',
		'success': 'iconfont icon-success notification-success',
		'warning': 'iconfont icon-warning notification-warning',
		'error': 'iconfont icon-error notification-error'
	}

	export default {
		name: 'HNotification',
		data () {
			return {
				show: false,
				position: 'top-right',
				topOffset: 14, 
				onClick: null,
				onClose: null, // 组件内部的关闭之后的回调函数
				title: '提示',
				iconClass: '',
				iconColor: '',
				type: '',
				isShowCloseBtn: true,
				isUseHTMLString: false,
				message: '',
				hasClosed: false,
				autoClose: true, // 是否自动关闭
				duration: 3000, // 默认显示的时间
				timer: null
			}
		},
		computed: {
			horizontalClass () {
				return this.position.indexOf('right') !== -1 ? 'right' : 'left'
			},
			verticalClass () {
				return /^top-/.test(this.position) ? 'top' : 'bottom'
			},
			verticalPosition () {
				return {
					[this.verticalClass]: `${ this.topOffset }px`
				}
			},
			defaultIconClass () {
				return this.type && icoMapType[this.type] ? icoMapType[this.type]: ''
			}
		},
		watch: {
			hasClosed (newVal, oldVal) {
				if (newVal) {
					this.show = false
					// 动画结束之后， 移除模板元素， 不然的话，还会占用位置
					this.$el.addEventListener('transitionend', this.destoryElement)
				}
			}
		},
		methods: {
			destoryElement () {
				this.$el.removeEventListener('transitionend', this.destoryElement)
				this.$destroy(true)
				this.$el.parentNode.removeChild(this.$el)
				this.clearTimer()
			},
			handlerClick (ev) {
				if (typeof this.onClick === 'function') {
					this.onClick()
				}
			},
			close () {
				this.hasClosed = true
				if (typeof this.onClose === 'function') {
					// 调用组件内部定义的回调函数， onClose()方法具体在notification.js中定义，
					this.onClose()
				}
			},
			clearTimer () {
				clearTimeout(this.timer)
			},
			startTimer () {
				if (this.autoClose) {
					this.timer = setTimeout(() => {
						if (!this.hasClosed) {
							this.close()
						}
					}, this.duration)
				}
			}
		},
		mounted () {
			this.startTimer()
		}
	}
</script>

<style type="text/scss" lang="scss" scoped>
	$wrap-border-color: #ebeef5;
	$shadow-color: rgba(0, 0, 0, 0.2);

	.notification-wrap {
		position: fixed;
		border: 1px solid $wrap-border-color;
		border-radius: 10px;
		background: #fff;
		box-shadow: 0 0 10px $shadow-color;
		padding: 12px 18px;
		min-width: 300px;
		max-width: 600px;
		overflow: hidden;
		box-sizing: border-box;
		transition: transform 0.3s, opacity 0.3s, top 0.3s, bottom 0.3s, left 0.3s, right 0.3s;
		&.right {
			right: 14px;
		}
		&.left {
			left: 14px;
		}
		.notification-content-wrap {
			display: inline-block;
			vertical-align: top;
			margin-right: 10px;
		}
		.notification-title {
			margin: 0;
		}
		.notification-content {
			margin-top: 8px;
			margin-bottom: 0;
		}
		.notification-close-btn {
			position: absolute;
			right: 10px;
			top: 12px;
			cursor: pointer;
		}
		.notification-icon-wrap {
			display: inline-block;
			vertical-align: top;
			font-size: 26px;
			margin-right: 4px;
			&.notification-info {
				color: #909399;
			}
			&.notification-success {
				color: #67C23A;
			}
			&.notification-warning {
				color: #E6A23C;
			}
			&.notification-error {
				color: #F56C6C;
			}
		}
	}
	.notification-fade-enter {
		&.right {
			right: 0;
			transform: translateX(100%);
		}
		&.left {
			left: 0;
			transform: translateX(-100%);
		}
	}
	.notification-fade-leave-active {
		opacity: 0;
	}
</style>