import Vue from 'vue'
import Vuex from 'vuex'
import ajax from '@/utils/myAxios'
Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        user:{},
        menuList:{}
    },
    getters:{
        getUser(state){
           return state.user
        },
        menuList(state){
            return state.menuList
        }
    },
    mutations:{
        setUser(state,data){
            state.user = data
        },
        setMenuList(state,data){
            state.menuList = data
        }
    },
    actions:{
        // SET_USER({commit}){
        //     return commit('setUser','lishi')
        // },
        SET_USER_INFO({commit}){
            ajax.get('/sys/user/info').then(({data}) => {
                const { code, user } = data
                if(code == 0){
                    commit('setUser',user)
                }
            })
        },
        GET_MENU_LIST({commit}){
            ajax.get('/sys/menu/list').then(({data}) => {
                commit('setMenuList',data)
            })  
        }
    },
    modules:{

    }

})
