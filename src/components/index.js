import collapseTransition from './collapse_transition.js'
import menu from './menu/menu.vue'
import menuItem from './menu/menu_item.vue'
import MyForm from './form/form.vue'

const install = (Vue) => {
	Vue.component(collapseTransition.name, collapseTransition)
	Vue.component(menu.name, menu)
	Vue.component(menuItem.name, menuItem)
	Vue.component(MyForm.name, MyForm)
}

export default install