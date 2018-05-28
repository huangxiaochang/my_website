import axios from './index.js'

export function userRegister (data) {
	return axios.post(`/register/`, data).then((response) => response)
}