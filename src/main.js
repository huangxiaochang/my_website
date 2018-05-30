// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '@/assets/css/normalize.css'    // normalize重置浏览器样式
import * as utils from './utils/index.js' // 全局方法
import directives from './directives' // 注册全局指令
import './assets/css/common.less' // 引入公共样式t
import 'nprogress/nprogress.css' // 加载条的样式
import components from './components'
import store from './vuex'  // 引入状态管理

Vue.config.productionTip = false
Vue.prototype.utils = utils // 全局方法的定义
Vue.use(components)  // 注册全局组件

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
