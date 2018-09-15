<template>
	<div class="form-item">
		<label class="item-wrap">
			<span class="item-label" >{{ label }}</span><slot></slot>
		</label>
	</div>
</template>

<script type="text/babel">
	export default {
		name: 'FormItem',
		inject: ['FormWrap'],
		props: {
			label: String
		},
		data () {
			return {
				
			}
		}
	}
</script>

<style type="test/scss" lang="scss" scoped>
	.form-item {
		padding: 8px 0;
		margin-bottom: 22px;
	}
	.item-wrap {
		.item-label {
			display: inline-block;
			width: 60px;
		}
	}
</style>