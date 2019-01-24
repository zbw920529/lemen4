// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import store from './store'
Vue.use(iView)

router.beforeEach((to, from, next) => {
  /**
   * 1. to 到哪去
   * 2. from 从哪来
   * 3. next 要不要放行
   */
  
  // 是否需要验证登录
  if (to.meta.auth_login) {
    // 验证登录
    if (localStorage.getItem('token')) {
      next()
    } else {
      next({
        path: '/'
      })
    }
  } else {
    next()
  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
