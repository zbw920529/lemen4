<template lang="html">
  <div class="register">
    <div class="header">
      <button @click="$router.go(-1)">取消</button>
    </div>
    <div class="container">
      <div class="title">注册账户</div>
      <div class="content">
        <!--表单-->
        <form>
          <InputGroup
            label='昵称'
            placeholder='例如：Iwen'
            v-model='user.name'
          />
          <InputGroup
            label='账号'
            placeholder='请填写邮箱'
            v-model='user.email'
          />
          <InputGroup
            label='密码'
            placeholder='请设置密码'
            v-model='user.password'
            type='password'
          />
          <InputGroup
            label='确认密码'
            placeholder='请确认密码'
            v-model='user.password2'
            type='password'
          />
        </form>
        <YButton
          :disabled='isDisabled'
          @click='registerClick'
        >注册</YButton>
      </div>
    </div>
  </div>
</template>

<script>
import InputGroup from '../components/InputGroup.vue'
import YButton from '../components/YButton.vue'
export default {
  name:'index',
  data(){
    return{
      user:{
        name:'',
        email:'',
        password:'',
        password2:''
      }
    }
  },
  components:{
    InputGroup,
    YButton
  },
  methods:{
    registerClick(){
      var reg=/^([a-zA-Z0-9._-])+@([a-zA-Z0-9])+(\.[a-zA-Z])+/;
      if(!reg.test(this.user.email)){
        alert('请输入合法的邮箱地址')
        return
      }
      if(this.user.password!==this.user.password2) return alert('两次输入密码不一致')
      // this.$axios.post('/api/users/register',this.users)
      //   .then(res=>{
      //     //注册成功
      //     alert('注册成功')
      //     this.$router.push('/login');
      //   })
        this.$axios.post('/api/users/login',this.users)
        .then((res)=>{
          alert('注册成功')
          this.$router.push('/login')
        })
    }
  },
  computed:{
    isDisabled(){
      if(this.user.email && this.user.password && this.user.name && this.user.password2)return false
      else return true
    }
  }
}
</script>

<style lang="css">
.register{
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.header{
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 0 10px;
  line-height: 50px
}
.header button{
  border: none;
  outline: none;
  background-color: transparent;
  font-size: 16px;
  color: #20af0e;
}
.container{
  width: 100%;
  padding: 16px;
  box-sizing: border-box;
}
.title{
  margin-top: 30px;
  font-size: 22px;
  text-align: center;
}
</style>
