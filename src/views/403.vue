<template>
<div>
你没有权限
<h-form>
	
<h-button style="width: 100px;" type="primary" @click="login">登录</h-button>
</h-form>
<h-button style="width: 100px;" type="primary" @click="login">登录</h-button>
<form>
	<h-button style="width: 100px;" type="primary" @click="login">登录</h-button>
</form>
</div>
</template>

<script type="text/babel">
	export default {
		name: 'noPermission',
		methods: {
			login () {
				console.log(88)
				return false
			}
		}
	}
</script>