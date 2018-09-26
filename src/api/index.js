import config from './config.js'
import axios from 'axios'
import NProgress from 'nprogress'
import Notification from '@/components/notification/notification.js'

axios.defaults.xsrfHeaderName = 'X-CSRFToken'
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.withCredentials = true
axios.defaults.baseURL = config.baseURL
// axios.defaults.baseURL = ''
// axios.defaults.headers.common['Authorization'] = config.token

// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
// axios.defaults.headers.common['Access-Control-Allow-Methods'] = 'PUT,POST,GET,DELETE,OPTIONS'
// axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Content-Type'
// axios.defaults.headers.common['Content-Type'] = 'application/json;charset=utf-8'


// 添加请求拦截器
axios.interceptors.request.use(function (config) {
	// 在发送请求之前进行加载条效果
	NProgress.start()
	return config
}, (error) => {
	console.log('请求错误:', error)
	new Notification({
		type: 'error',
		message: error
	})
	return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 关闭加载条加载的效果
    NProgress.done()
    // 请求成功，返回结果
	return response
}, (error) => {
	let type = 'error'
	let msg = ''
	// 服务器发生错误，进行错误集中处理
	if (error.response) {
		// 请求已发出，但服务器响应的状态码不在 2xx 范围内
		let status = error.response.status
		type = status >= 555 && status < 1000 ? 'warning' : 'error'
		msg = `${status}：${error.response.data.msg}`
	} else {
		// Something happened in setting up the request that triggered an Error
		type = 'error'
		msg = error.message === 'Network Error' ? '网络错误！请检查网络是否正常' : error.message
	}
	// 提示错误信息
	NProgress.done()
	new Notification({
		type: type,
		message: msg
	})
	console.log('服务器错误:', error)
	return Promise.reject(error)
})

export default axios