import collapseTransition from './collapse_transition.js'
import HMenu from './menu/menu.vue'
import HSubMenu from './menu/sub_menu.vue'
import HMenuItem from './menu/menu_item.vue'
import HForm from './form/form.vue'
import HFormItem from './form/form_item.vue'
import HInput from './input/input.vue'
import HButton from './button/button.vue'
import HNotification from './notification/notification.js'
import HUploadFile from './file_upload/upload_file.vue'

const install = (Vue) => {
	Vue.component(collapseTransition.name, collapseTransition)
	Vue.component(HMenu.name, HMenu)
	Vue.component(HSubMenu.name, HSubMenu)
	Vue.component(HMenuItem.name, HMenuItem)
	Vue.component(HForm.name, HForm)
	Vue.component(HFormItem.name, HFormItem)
	Vue.component(HInput.name, HInput)
	Vue.component(HButton.name, HButton)
	Vue.component(HUploadFile.name, HUploadFile)
	// 通知类，定义在vue的全局prototype属性上单程全局方法来使用
	Vue.prototype.$notify = HNotification
}

export default install