import config from 'api/config.js'

// post 的方式进行导表
export const downLoadFile = function (url, options = {}) {
	let form = document.createElement('form')
	form.style.display = 'none'
	form.action = `${url}`
	form.method = 'post'
	document.body.appendChild(form)
	for (let key in options) {
		let input = document.createElement('input')
		input.type = 'hidden'
		input.name = key
		input.value = options[key]
		form.appendChild(input)
	}
	form.submit()
	document.body.removeChild(form)
}

// get 方式导表
export const exportFile = function (url) {
	let method = `${config.baseURL}${url}`
	let a = document.createElement('a')
	a.href = method
	document.body.appendChild(a)
	a.click()
	document.body.removeChild(a)
}

// 去除字符串的空格
// type: left, right, all,
// left: remove left space of a string
// right: remove right space of a string
// left_right: remove left an right space of a string
// all remove all space of a string
export const removeSpace = function (str, type) {
	let st = str
	switch(type) {
		case 'left':
			st = str.replace(/^\s*/g, '')
			break
		case 'right':
			st = str.replace(/\s*$/g, '')
			break
		case 'left_right':
			st = str.replace(/^\s*|\s*$/g, '')
			break
		case 'all':
			st = str.replace(/\s+/g, '')
			break
		default:
			break
	}
	return st
}

export function hasClass(el, cls) {
  if (!el || !cls) return false;
  if (cls.indexOf(' ') !== -1) throw new Error('className should not contain space.');
  if (el.classList) {
    return el.classList.contains(cls);
  } else {
    return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1;
  }
}

// add className to an el
export const addClass = function (el, className) {
	if (!el) { return }
	let curCls = el.className
	const clss = (className || '').split(' ')
	for (let i = 0; i < clss.length; i++) {
		let cl = clss[i]
		if (!cl) { continue }
		if (el.classList) {
			el.classList.add(cl)
		} else {
			curCls += ' ' + cl
		}
	}
	if (!el.classList) {
		el.className = curCls
	}
}

// remove a className from an el
export const removeClass = function (el, className) {
	if (!el) { return }
	let curCls = el.className
	const clss = (className || '').split(' ')
	for (let i = 0; i < clss.length; i++) {
		let cl = clss[i]
		if (!cl) { continue }
		if (el.classList) {
			el.classList.remove(cl)
		} else {
			let reg = `/\b${cl}\b/`
			curCls.replace(reg, ' ')
		}
	}
	if (!el.classList) {
		el.className = curCls.removeSpace(curCls, 'left_right')
	}
}

// get server path
export const server_path = function () {
	return config.baseURL
}

// cookie manage
class Cookie {
	// 注意，对于过期的cookie浏览器会自动清掉
	get_cookie (name = 'user_cookie') {
		let cookies = document.cookie.split(';')
		let res = null
		for (let i = 0 ; i < cookies.length; i++) {
			let cookie = cookies[i].split('=')
			if (removeSpace(cookie[0], 'left_right') !== name) {
				continue
			} else {
				res = cookie[1]
				break
			}
		}
		return res
	}

	/*
		@params {string} name 键名
		@params {string} value 键值
		@params {int} time cookie周期, 单位h
	*/
	set_cookie (name, value, time) {
		let expires = ''
		if (time) {
			let now = new Date
			now.setTime(now.getTime() + time * 60 * 60 * 1000)
			expires = now.toGMTString()
		}
		document.cookie = `${name}=${value};expires=${expires}`
	}

	del_cookie (name) {
		this.set_cookie(name, '', -1)
	}
}

export const cookie_mange = new Cookie()

// 判断是否是纯对象
export const isPlainObject = function (obj) {
	return toString.call(obj) === '[object Object]'
}

