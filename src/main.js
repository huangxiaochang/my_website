// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './vuex'
import 'nprogress/nprogress.css'
import 'assets/css/normalize.css'
import 'assets/css/common.scss'
import 'assets/font/iconfont.css'   // 引入字体样式
import * as utils from '@/utils/index.js'
import directives from './directives/index.js'
import components from '@/components/index.js'

Vue.config.productionTip = false
Vue.prototype.utils = utils
Vue.use(components)

Object.keys(directives).forEach((k) => {
	// arg: name , directive
	Vue.directive(k, directives[k])
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
