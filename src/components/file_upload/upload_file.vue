<template>
	<div class="file_upload_wrap">
		<form ref="form" :action="action" method="POST" enctype="multipart/form-data">
			<input 
				ref="input"
				class="file_input" 
				type="file"
				:accept="accept"
				:name="name"
				:multiple="multiple"
				@change="handlerInputChange">
		</form>
		<div @click="selectFile"><slot name="trigger"></slot></div>
		<slot></slot>
		<div class="upload_tip"><slot name="tip"></slot></div>
	</div>
</template>
<script type="text/babel">
	export default {
		name: 'HUploadFile',
		props: {
			action: String,
			accept: String,
			multiple: Boolean,
			drag: Boolean,
			autoUpload: Boolean,
			name: {
				type: String,
				default: 'file'
			}
		},
		data () {
			return {

			}
		},
		methods: {
			selectFile () {
				this.$refs.input.click()
			},
			handlerInputChange (ev) {
				let files = ev.target.files
				if (!files) { return }
				console.log(files)
			}
		}
	}
</script>
<style type="text/less" lang="scss" scoped>
	.file_upload_wrap {
		display: inline-block;
		.file_input {
			display: none;
		}
		.upload_tip {
			font-size: 14px;
		}
	}
</style>