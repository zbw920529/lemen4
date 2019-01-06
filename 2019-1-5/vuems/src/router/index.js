import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'

Vue.use(Router)
const userlist=()=>import('@/components/Userlist')
const changepassword=()=>import('@/components/Changepassword')
const adduser=()=>import('@/components/Adduser.vue')
const home =()=>import('@/components/Home.vue')
export default new Router({
  routes: [
    {path: '/login',name: 'Login',component: Login},
    {path: '/',name: 'index',component:()=>import('@/components/Index'),redirect:'home',
  children:[
    {path:'/home',name:'home',component:home},
    {path:'/userlist',name:'userlist',component:userlist},
    {path:'/adduser',name:'adduser',component:adduser},
    {path:'/changepassword',name:'changepassword',component:changepassword},
  ]}
  ],
  mode:'history'
})
