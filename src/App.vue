<template>
  <div id="app">
    <router-view/>
    <notification v-if="notification_option.is_show" :options="notification_option"></notification>
  </div>
</template>

<script type="text/babel">
	import { mapGetters } from 'vuex'

	export default {
		name: 'App',
		computed: {
			...mapGetters([
				'notification_option'
			])
		}
	}
</script>

