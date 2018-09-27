<template>
	<button 
	  class="button-wrap"
	  @click="handleClick"
	  :autofocus="autofocus"
	  :disabled="disabled"
	  :style="{borderRadius: radius}"
	  :class="[
	  	type ? 'button-' + type : '',
	  	disabled ? 'button-disabled': ''
	  ]"
	>
		<slot></slot>
	</button>
</template>

<script type="text/babel">
	export default {
		name: 'HButton',
		data () {
			return {
			}
		},
		props: {
			type: {
				type: String,
				default: 'default'
			},
			disabled: Boolean,
			autofocus: Boolean,
			radius: {
				type: String,
				default: '4px'
			}
		},
		methods: {
			handleClick (ev) {
				this.$emit('click', ev)
			}
		}
	}
</script>

<style type="text/scss" lang="scss" scoped>
	$bg-default: #ffffff;
	$bg-primary: #409EFF;
	$bg-success: #67C23A;
	$bg-warn: #E6A23C;
	$bg-danger: #F56C6C;
	$bg-info: #909399;
	$font-default-color: #fff;
	$base-color: #ffffff;

	@mixin generate_bg_color($bg-color, $base-color, $hover-color) {
		background: $bg-color;
		&:hover, &:focus {
			background: $hover-color;
		}
		&.button-disabled  {
			&, &:hover, &:focus {
				cursor: not-allowed;
				background-color: mix($bg-color, $base-color, 50%);
				border-color: mix($bg-color, $base-color, 50%)
			}
		}
	}

	.button-wrap {
		display: inline-block;
		overflow: hidden;
		white-space: nowrap;
		outline: none;
		padding: 8px 14px;
		cursor: pointer;
		margin: 0;
		color: $font-default-color;
		border: 1px solid #dcdfe6;
		margin-left: 10px;

		&.button-default {
			@include generate_bg_color($bg-default, #E0EAF9, #E0EAF9);
			color: #606266;
			&:hover, &:focus {
				border-color: #409EFF;
			}
		}
		&.button-primary {
			@include generate_bg_color($bg-primary, $base-color, #62ACFB);
		}
		&.button-success {
			@include generate_bg_color($bg-success, $base-color, #79D04D);
		}
		&.button-warn {
			@include generate_bg_color($bg-warn, $base-color, #F2B75F);
		}
		&.button-danger {
			@include generate_bg_color($bg-danger, $base-color, #F29797);
		}
		&.button-info {
			@include generate_bg_color($bg-info, $base-color, #AEB0B4);
		}
		&.button-text {
			background: none;
			border: none;
			color: #409EFF;
			&:hover, &:focus {
				color: #79B9FC;
			}
			&.button-disabled  {
				&, &:hover, &:focus {
					cursor: not-allowed;
					color: #C0C4CC;
				}
			}
		}
	}
</style>