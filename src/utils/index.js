import Vue from 'vue'
import actions from '../vuex/actions'
import store from '../vuex'

export const show_message = function (data) {
	if (!data.is_show) {
		data.is_show = true
	}
	actions.show_notification(store, data)
}
