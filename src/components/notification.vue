<template>
	<transition name="bounce">
	  	<div class="notification_wrap">
		    <h4 class="title"><span :class="notification_icon[options.type]"></span>{{options.title}}<span class="close_btn" @click="close">x</span></h4>
		    <div class="content" v-html="options.content"></div>
	  	</div>
	</transition>
</template>

<script type="text/babel">
	import { mapActions } from 'vuex'

	export default {
	  	name: 'notification',
		props: {
		  	options: {
		  		type: Object
		  	}
		},
	  	data () {
	    	return {
	      		notification_icon: {
	      			success: 'success_icon',
	      			warning: 'warning_icon',
	      			error: 'error_icon',
	      			info: 'info_icon'
	      		}
	    	}
	  	},
	  	mounted () {
	  		if (this.options.is_auto_close) {
	  			let timer = setTimeout(() => {
		  			this.close()
		  			clearTimeout(timer)
		  		}, this.options.auto_close_time)
	  		}
	  	},
	  	methods: {
	    	...mapActions([
	            'close_notification'
	        ]),
	    	close () {
	    		this.close_notification(false)
	    	}
	    }
	}
</script>

<style type="text/less" lang="less" scoped>
	.notification_wrap {
		position: fixed;
		top: 10px;
		right: -418px;
		width: 360px;
		box-shadow: 0 0 20px #E4E7ED;
		padding: 14px 18px;
		animation: bouncein .4s forwards;
		z-index: 1000;
		.title {
			margin: 0;
			.close_btn {
				float: right;
				font-size: 20px;
				color: #C0C4CC;
				cursor: pointer;
				margin-top: -4px;
			}
			.success_icon, .warning_icon, .error_icon, .info_icon {
				display: inline-block;
				margin-right: 10px;
				width: 26px;
				height: 26px;
				line-height: 26px;
				text-align: center;
				border-radius: 100%;
				color: #fff;
			}
			.success_icon {
				background-color: #67C23A;
			}
			.warning_icon {
				background-color: #E6A23C;
			}
			.error_icon {
				background-color: #F56C6C;
			}
			.info_icon {
				background-color: #909399;
			}
			.success_icon:before {
				content: '√';
			}
			.warning_icon:before {
				content: '!';
			}
			.error_icon:before {
				content: 'X';
			}
			.info_icon:before {
				content: 'i';
			}
		}
		.content {
			margin-top: 10px;
			color: #909399;
		}
	}
	.bounce-leave-active {
		animation: bounceout .3s;
	}
	@keyframes bouncein {
		0% {
			right: -418px;
		}
		100% {
			right: 10px;
		}
	}
	@keyframes bounceout {
		0% {
			right: 10px;
		}
		100% {
			right: -418px;
		}
	}
</style>
