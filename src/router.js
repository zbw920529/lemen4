import Router from 'vue-router'
import Vue from 'vue'
import Index from './2018_12_26/Index'
import Instrument from './2018_12_26/Instrument'
import Me from './2018_12_26/Me.vue'
import Chats from './2018_12_26/Chats.vue'
import Contacts from './2018_12_26/Contacts.vue'
import Discover from './2018_12_26/Discover.vue'
import ChatsComponent from './components/ChatsComponent.vue'
// 注册路由
Vue.use(Router)
const router= new Router({
  routes: [
    {path:'/',component:Index,name:'indexLink',redirect:'/me',children:[
          {
            path:'/chats',name:'chats',component:()=>import('./2018_12_26/Chats.vue')
          },
          {
            path:'/me',name:'me',component:()=>import('./2018_12_26/Me.vue')
          },
          {
            path:'/contacts',name:'contacts',component:()=>import('./2018_12_26/Contacts.vue'),
          },
          {
            path:'/discover',name:'discover',component:()=>import('./2018_12_26/Discover.vue')
          },
          {
            path:'/infomation',name:'infomation',component:()=>import('./components/Infomation.vue')
          }
        ]},
    {path:'/instrument',component:Instrument,name:'InstrumentLink'},
    {path:'/login',component:()=>import('./2018_12_26/Login.vue'),name:'loginLink'},//component:()=>import('./2018_12_26/Login.vue')懒加载
    {path:'/register',component:()=>import('./2018_12_26/Register.vue'),name:'registerLink'},
    {path:'/infomation/dialog',component:ChatsComponent,name:'dialog'},
  ],
  mode:'history'
})
// router.beforeEach((to,from,next)=>{
//   const isLogin =localStorage.wxpyqToken?true:false;
//   if(to.path=='/login'||to.path=='/register'){
//     next();
//   }else{
//     isLogin ?next() :next('/login')
//   }
// })
export default router;
