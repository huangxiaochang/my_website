import { addClass, removeClass } from 'utils/index.js'

// 除了要进行高度的动画，当children的元素设置了padding-top/bottom的时候，会出现抖动，所以也要对
// padding-top/bottom进行过度效果

const Collapse = function (direction = 'vertical') {
	return {
		beforeEnter (el) {
			// before transiton , save old padding-top/bottom. and then set to zero
		    if (!el.dataset) el.dataset = {}
		    if (direction === 'vertical') {
		    	addClass(el, 'collapse-transition')	
		    	el.dataset.oldPaddingTop = el.style.paddingTop
		    	el.dataset.oldPaddingBottom = el.style.paddingBottom
		    	el.style.height = '0'
			    el.style.paddingTop = 0
			    el.style.paddingBottom = 0
		    } else {
		    	addClass(el, 'collapse-horizontal-transition')
		    	el.dataset.oldPaddingLeft = el.style.paddingLeft
		    	el.dataset.oldPaddingRight = el.style.paddingRight
		    	el.style.width = '0'
			    el.style.paddingLeft = 0
			    el.style.paddingRight = 0
		    }
		},

		enter (el) {
			// save child el overflow setting
			el.dataset.oldOverflow = el.style.overflow
		    
		    if (direction === 'vertical') {
		    	el.scrollHeight !== 0 ? el.style.height = el.scrollHeight + 'px' : el.style.height = ''
			    el.style.paddingTop = el.dataset.oldPaddingTop
			    el.style.paddingBottom = el.dataset.oldPaddingBottom
		    } else {
		    	el.scrollWidth !== 0 ? el.style.width = el.scrollWidth + 'px' : el.style.width = ''
			    el.style.paddingLeft = el.dataset.oldPaddingLeft
			    el.style.paddingRight = el.dataset.oldPaddingRight
		    }

		    el.style.overflow = 'hidden'
		},

		afterEnter (el) {
			if (direction === 'vertical') {
				removeClass(el, 'collapse-transition')
				el.style.height = ''
			} else {
				removeClass(el, 'collapse-horizontal-transition')
				el.style.width = ''
			}
			
		    el.style.overflow = el.dataset.oldOverflow
		},

		beforeLeave (el) {
			if (!el.dataset) el.dataset = {}
			el.dataset.oldOverflow = el.style.overflow

			if (direction === 'vertical') {
				el.dataset.oldPaddingTop = el.style.paddingTop
			    el.dataset.oldPaddingBottom = el.style.paddingBottom
			    el.style.height = el.scrollHeight + 'px'
			} else {
				el.dataset.oldPaddingLeft = el.style.paddingLeft
			    el.dataset.oldPaddingRight = el.style.paddingRight
			    el.style.width = el.scrollWidth + 'px'
			}
		    
		    el.style.overflow = 'hidden'
		},

		leave (el) {
			
			if (direction === 'vertical') {
				if (el.scrollHeight !== 0) {
					addClass(el, 'collapse-transition')
			      	el.style.height = 0
			      	el.style.paddingTop = 0
			      	el.style.paddingBottom = 0
				}
			} else {
				if (el.scrollWidth !== 0) { 
					addClass(el, 'collapse-horizontal-transition')
			      	el.style.width = 0
			      	el.style.paddingLeft = 0
			      	el.style.paddingRight = 0
			    }
		    }
		},

		afterLeave (el) {
			if (direction === 'vertical') {
				removeClass(el, 'collapse-transition')
				el.style.height = ''
			    el.style.overflow = el.dataset.oldOverflow
			    el.style.paddingTop = el.dataset.oldPaddingTop
			    el.style.paddingBottom = el.dataset.oldPaddingBottom
			} else {
				removeClass(el, 'collapse-horizontal-transition')
				el.style.width = ''
			    el.style.overflow = el.dataset.oldOverflow
			    el.style.paddingLeft = el.dataset.oldPaddingLeft
			    el.style.paddingRight = el.dataset.oldPaddingRight
			}	
		}
	}
}

export default {
	name: 'CollapseTransition',
	functional: true,
	render(h, { children, data }) {
		let direction = data.attrs && data.attrs.direction ? data.attrs.direction : 'vertical'
		let type = data.attrs && data.attrs.type ? data.attrs.type : 'signe'
		let conf = {
			on: Collapse(direction)
		}
		// 这里的data就是render函数的第二个参数的配置
		if (type === 'group') {
			for (let i = 0; i < children.length; i++) {
				let child = children[i]
				if (!child.key) { 
					child.key = `${i+1}`
				}
			}
			return h('transition-group', conf, children)
		} else {	
			return h('transition', conf, children)
		}
	}
}