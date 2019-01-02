import axios from 'axios'
import router from './router'
axios.interceptors.request.use(config=>{
  if(localStorage.wxpyqToken){
    config.headers.Authorization=localStorage.wxpyqToken
  }
  return config;
},error=>{
  const { status} =error.response;
  if(status==401){
    alert('token过期,请重新登陆')
    //清除token
    router.push('/login')
  }else{
    alert(error.response.data)
  }
  return Promise.reject(error)
});

//响应拦截
axios.interceptors.response.use(response=>{
  return response;
},error=>{
  //错误提醒
  alert(error.response.data);
  return Promise.reject(error)
})
export default axios;
