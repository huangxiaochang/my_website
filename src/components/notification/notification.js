// 通过Vue.extend()来创建一个notification.vue的子类，然后再创建多个实例

import Vue from 'vue'
import notification from './notification.vue'

// notifivation子类构造函数
const NotificationConstructor = Vue.extend(notification)

let count = 1
const instances = []  // collect all notification instance

// 在项目中使用this.$notify()相当于调用了该函数, 因为把该函数定义在了Vue.prototype上
const Notification = function (options={}) {
	if (Vue.prototype.$isServer) { return }
	options = options || {}
	let id = `notification_${count}`
	let position = options.position || 'top-right'

	// 创建一个实例, 这里的data是子类的其他的配置信息
	let instance = new NotificationConstructor({
		data: options
	})

	instance.id = id
	/* Vue.$mount()返回实例自身，如果没有传入el,则会处于未挂载状态，没有关联的DOM元素， 
		模板将会渲染成文档之外的元素，然后可以使用原生的DOM API吧它插入文档中
	*/
	instance.vm = instance.$mount()
	// 手动插入文档中
	document.body.appendChild(instance.vm.$el) // instance.vm.$el = this.$el
	instance.vm.show = true
	// 计算同种类型的notification的纵向偏移之后的位置
	let offsetHeight = options.offset || 0
	// 计算之前的实例占用的高度
	instances.filter(item => item.position === position).forEach(item => {
		offsetHeight += item.$el.offsetHeight + 14
	})
	// 再加上默认的间隔
	offsetHeight += 14
	instance.vm.topOffset = offsetHeight
	instances.push(instance)

	return instance.vm
}



export default Notification