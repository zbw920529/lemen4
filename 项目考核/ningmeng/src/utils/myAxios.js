import axios from 'axios'
import router from '@/router'

const http = axios.create({
        baseURL:'/myApi',
        timeout:3000,
        headers:{
            token:localStorage.getItem('token')
        }

})

http.interceptors.response.use((res) => { //响应拦截器
    // if(res.data.code === 401){
    //     router.replace({name:'login'})
    // }
    return res
})

export default http