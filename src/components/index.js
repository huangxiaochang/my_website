import notification from './notification.vue'

const install = Vue => {
	Vue.component(notification.name, notification)
}

export default install