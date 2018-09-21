import collapseTransition from './collapse_transition.js'
import menu from './menu/menu.vue'
import menuItem from './menu/menu_item.vue'
import HForm from './form/form.vue'
import HFormItem from './form/form_item.vue'
import HInput from './input/input.vue'
import HButton from './button/button.vue'

const install = (Vue) => {
	Vue.component(collapseTransition.name, collapseTransition)
	Vue.component(menu.name, menu)
	Vue.component(menuItem.name, menuItem)
	Vue.component(HForm.name, HForm)
	Vue.component(HFormItem.name, HFormItem)
	Vue.component(HInput.name, HInput)
	Vue.component(HButton.name, HButton)
}

export default install