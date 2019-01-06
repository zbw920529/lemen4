// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import store from './store/store.js'
import echarts from 'echarts'//引入echarts
Vue.prototype.$echarts = echarts //全局注册使用
//挂载在Vue原型上
Vue.prototype.axios=axios
Vue.config.productionTip = false
Vue.use(ElementUI);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store:store,
  router,
  components: { App },
  template: '<App/>'
})
