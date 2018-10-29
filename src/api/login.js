import axios from './index.js'

export function userLogin (user) {
	return axios.post(`/user_info/login/`, user).then(respone => respone.data)
}

export function getCaptcha () {
	return axios.get(`/user_info/login/`).then(respone => respone.data)
}

export function register (data) {
	return axios.post(`/user_info/register/`, data).then(respone => respone.data)
}

export function get_code (email) {
	return axios.get(`/user_info/register/?user_email=${email}`).then(respone => respone.data)
}

export function get_user_info () {
	return axios.get(`/user_info/get_user_info/`).then(respone => respone.data )
}

export function login_out () {
	return axios.get(`/user_info/login_out/`).then(respone => respone.data)
}

export function upload_avatar (data) {
	return axios.post(`/user_info/upload_avatar/`, data, { header: {'Content-Type': 'multipart/form-data'}}).then(respone => respone.data)
}

export function modify_user_info (data) {
	return axios.post(`/user_info/modify_user_info/`, data).then(respone => respone.data)
}