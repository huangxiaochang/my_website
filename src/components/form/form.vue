<template>
	<form class="form-wrap">
		<slot></slot>
	</form>
</template>

<script type="text/babel">
	export default {
		name: 'FormWrap',
		data () {
			return {

			}
		},
		provide () {
			return {
				FormWrap: this
			}
		},
		props: {
			model: Object,
			inline: Boolean,
			rules: Object,
			labelWidth: String,
			labelPosition: String
		}
	}
</script>

<style type="text/scss" lang="scss" scoped>
	$form-width: 400px;
	$shadow-cr: #C0C4CC;
	
	.form-wrap {
		width: $form-width;
		box-shadow: 0 0 8px $shadow-cr;
	}
</style>