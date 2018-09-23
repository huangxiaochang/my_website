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
	let id = `notification_${count++}`
	let position = options.position || 'top-right'
	// 缓存用户自定的关闭的回调函数，因为组件内部的也定义了同名回调函数，并且需要在这里重写
	let useOnClose = options.onClose 

	// 重写内部onClose函数， 进行从instances中移除和offsetHeight的重新计算
	options.onClose = function () {
		Notification.close(id, useOnClose)
	}

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
	instance.vm.$el.style.zIndex = 3000
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

// 支持使用this.$notify.success(options)等方式进行创建实例
const type_list = ['success', 'warning', 'info', 'error']
type_list.forEach(type => {
	Notification[type] = options => {
		if (typeof options === 'string') {
			options = {
				message: options
			}
		}
		options.type = type
		return new Notification(options)
	}
})
// 直接使用实例调用close方法，同时组件内部的onClose回调函数也会调用该方法
Notification.close = function (id, useOnClose) {
	// 从instances中移除并且调用用户定义的回调函数
	let pos = -1
	let instance = null
	let length = instances.length
	instances.some((item, index) => {
		if (item.id === id) {
			pos = index
			instance = item
			return true
		}
	})
	if (pos === -1) { return }
	instances.splice(pos, 1)
	if (typeof useOnClose === 'function') {
		useOnClose(instance)
	}
	// 进行剩下的实例的top/bottom的计算
	if (length <= 1) { return }
	let position = instance.position
	let removeHeight = instance.vm.$el.offsetHeight // 移动的距离为移除的模板的offsetHeight
	for (let i = pos; i < length - 1; i++) {
		// 只移动同种位置类型的实例
		if (instances[i].position === position) {
			// 设置top/bottom
			instances[i].vm.$el.style[instance.verticalClass] = parseInt(instances[i].vm.$el.style[instance.verticalClass]) - removeHeight - 14 + 'px'
		}
	}
}

// 可以调用实例的clearAll()方法移除所以的Notification实例,或者移除指定位置的所有实例
Notification.clearAll = function (position) {
	if (!position) {
		instances.forEach(instance => {
			// 这里是先调用notification.vue中close()方法，再有它调用Notification.close()
			instance.close()
		})
	} else {
		instances.forEach(instance => {
			if (instance.position === position) {
				instance.close()
			}
		})
	}
}

export default Notification