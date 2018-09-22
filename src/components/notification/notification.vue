<template>
	<transition name="notification-fade">
		<aside 
		  v-show="show" 
		  class="notification-wrap"
		  :class="[horizontalClass]"
		  :style="verticalPosition"
		  @click="handlerClick"
		>
			<i :style="{color: iconColor}" :class="[iconClass, defaultIconClass]" class="notification-icon-wrap" v-if="type || iconClass"></i>
			<div class="notification-content-wrap">
				<h3 class="notification-title" v-text="title"></h3>
				<p class="notification-content" v-if="isUseHTMLString" v-html="message"></p>
				<p class="notification-content" v-else> {{ message }}</p>
			</div>
			<span class="notification-close-btn" v-if="isShowCloseBtn">x</span>
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
				position: 'top-left',
				topOffset: 14,
				onClick: null,
				title: '提示',
				iconClass: '',
				iconColor: '',
				type: '',
				isShowCloseBtn: true,
				isUseHTMLString: false,
				message: ''
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
		methods: {
			handlerClick (ev) {
				if (typeof this.onClick === 'function') {
					this.onClick()
				}
			}
		}
	}
</script>

<style type="text/scss" lang="scss" scoped>
	$wrap-border-color: #ebeef5;
	$shadow-color: rgba(0, 0, 0, 0.2);

	.notification-wrap {
		position: fixed;
		border: 1px solid $wrap-border-color;
		box-shadow: 0 0 10px $shadow-color;
		padding: 12px 18px;
		min-width: 200px;
		max-width: 600px;
		overflow: hidden;
		box-sizing: border-box;
		transition: transform 0.3s;
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