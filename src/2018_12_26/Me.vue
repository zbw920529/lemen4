<template lang="html">
  <div class="">
    <Header title='我'/>
    <div class="container">
      <InfoCell :userInfo='userInfo'/>
    </div>
    <div class="btn_wrapper">
      <YButton @click='loginOut'>退出登录</YButton>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header'
import InfoCell from '../components/InfoCell'
import YButton from '../components/YButton'
export default {
  name:'me',
  data(){
    return{
      userInfo:{
        imgUrl:'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2331954524,2332888605&fm=27&gp=0.jpg',
        name:'想做大牛的菜鸟'
      }
    }
  },
  methods:{
    loginOut(){
      console.log(2)
      this.$router.push('/login')
    }
  },
  components:{
    Header,
    InfoCell,
    YButton
  }
}
</script>

<style scoped>
.mine {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.container {
  width: 100%;
  height: calc(100% - 50px);
  margin-top: 50px;
  box-sizing: border-box;
  padding: 16px 0;
  background-color: #f1f1f1;
}

.btn_wrapper {
  box-sizing: border-box;
  padding: 20px;
}
.button{
  position: absolute;
  bottom: 10rem;
}
</style>
