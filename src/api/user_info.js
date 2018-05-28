import axios from './index.js'

export function userRegister (data) {
	return axios.post(`/register/`, data).then((response) => response)
}

export function getCode (email) {
	return axios.get(`/register/?email=${email}`).then((response) => response)
}