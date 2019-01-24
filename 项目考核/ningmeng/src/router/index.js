import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import admin from '@/components/admin'
import user from '@/components/sys/user'
import role from '@/components/sys/role'
import menu from '@/components/sys/menu'
import schedule from '@/components/sys/schedule'
import config from '@/components/sys/config'
import log from '@/components/sys/log'
import oss from '@/components/sys/oss'
import home from '@/components/home'


Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/admin',
      name: 'admin',
      component: admin,
      meta:{
        auth_login:true
      },
      children:[
        {
          path:'sys/user',
          name:'adminUser',
          component:user
        },
        {
          path:'sys/role',
          name:'adminRole',
          component:role
        },
        {
          path:'home',
          name:'home',
          component:home
        },
        {
          path:'sys/menu',
          name:'adminMenu',
          component:menu
        },
        {
          path:'job/schedule',
          name:'adminSchedule',
          component:schedule
        },
        {
          path:'sys/config',
          name:'adminConfig',
          component:config
        },
        {
          path:'sys/log',
          name:'adminLog',
          component:log
        },
        {
          path:'oss/oss',
          name:'adminOss',
          component:oss
        }
      ]     
    },
    // {
    //   path:'/home',
    //   name:'home',
    //   component:home
    // }

  ]
})
