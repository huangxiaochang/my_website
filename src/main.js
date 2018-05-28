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

Vue.config.productionTip = false
// 全局方法的定义
Vue.prototype.utils = utils

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
