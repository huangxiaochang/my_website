export default {
	get_user_info: (state) => state.user.user_info,
	get_async_routes: state => state.route.async_role_list,
	get_menu_list: state => state.route.menu_list
}