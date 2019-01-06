import Vue from 'vue'
import Vuex from 'Vuex'
import axios from 'axios'
Vue.use(Vuex)
//状态
const state={
  userinfo:JSON.parse(localStorage.getItem('userinfo')),
  userlist:[]
}
//操作state
const mutations ={
  //保存用户数据
  SAVE_USERINFO(state,userinfo){
    //先把数据存入本地存储，再更新数据

    localStorage.setItem('userinfo',JSON.stringify(userinfo))
    state.userinfo = userinfo
    console.log(userinfo,'这个是传过来的值',state.userinfo,state.userinfo.username)
  },
  SAVE_USERLIST(state,payload){
    state.userlist=payload
  }
}
//定义异步
const actions={
  SAVE_USERLIST({commit}){
    return new Promise((resolve,reject)=>{
      axios.get('http://localhost:8080/static/checklogin.json')
      .then(res=>{
          commit('SAVE_USERLIST',res.data)
          resolve()
      })
    })
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})
