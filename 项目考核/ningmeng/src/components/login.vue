<template>
  <div class="wrap">
    <div class="leftDiv">
        <img src="https://static.veer.com/veer/static/resources/FourPack/2019-01-23/10f8d549c6454e71997f389f186d8618.jpg">
    </div>
    <div class="rightDiv">
        <div class="login">
          <h1 style="margin-bottom:20px">MS后台管理系统</h1>
          <Form ref="form" :model="form" :rules="formRules">
              <FormItem prop="username">
                <Input type="text" prefix="md-person" v-model="form.username" clearable placeholder="请输入账号" style="width: 300px"/>
              </FormItem>
              <FormItem prop="password">
                <Input type="password" prefix="md-lock" v-model="form.password" clearable placeholder="请输入密码" style="width: 300px"/> 
              </FormItem>
              <FormItem prop="captcha">
                <Input type="text" prefix="md-image" v-model="form.captcha" clearable placeholder="请输入验证码" style="width: 150px"/>
                  <img :src="'/myApi/captcha.jpg?uuid='+form.uuid" style="float:right;width:120px;" @click="Refresh"/>
              </FormItem>
          </Form>
          <Button :loading = "loading" type="info" long @click="login">登录</Button>
        </div>
    </div>
  </div>
</template>

<script>
import ajax from '@/utils/myAxios'
import uuid from 'uuid'
export default {
      data() {
        return {
            form:{
              username: null,
              password: null,
              captcha: null,
              uuid: uuid()
            },
            loading:false,
            formRules:{
              username:[
                  {required:true,message:'账号必须',trigger:'blur'},
                  {max:12,min:5,message:'长度必须是5-12位',trigger:'blur'}
              ],
              password: [
                  {required:true,message:'密码必须',trigger:'blur'},
                  {max:18,min:5,message:'长度必须是5-18位',trigger:'blur'}
              ],
              captcha: [
                  {required:true,message:'验证码必须',trigger:'blur'},
                  {max:5,min:5,message:'长度必须是5位',trigger:'blur'}
              ],
            }
        }
      },
      created(){
         document.addEventListener('keydown',this.keyDown)
      },
      destroyed() {
        document.removeEventListener('keydown',this.keyDown)
      },
      methods:{
        keyDown(e){
          if(e.keyCode === 13){
              if(this.loading) return;
              this.login()
            }
        },
        async login(){
                const validate = await this.$refs['form'].validate()
                if(validate){
                    this.loading = true;
                    const result = await ajax.post('/sys/login',this.form)
                    const { code, msg, token } = result.data
                    if(code === 500){
                      this.$Notice.error({
                          title:'出错了',
                          desc:msg
                      });
                      this.Refresh()
                    }else if(code === 0){
                      // localStorage.removeItem('token')
                      localStorage.setItem('token',token)
                      this.$router.replace({name:'admin'})
                    }
                }
                this.loading = false;               
        },            
        Refresh(){
            this.form.uuid = uuid()
        }
      }
}
</script>

<style>
    .wrap .leftDiv{
      width: 70%;
      height: inherit;
      float: left;
    }
    .leftDiv img{
      width: 1430PX;
      height: 980px;
    }
     .wrap .rightDiv{
        min-width: 370px;
        width: 25%;
        height: 980px;
        float: right;
        background: white;
     }
     .rightDiv .login{
        width: 300px;
        height: 350px;
        margin: 200px auto;
     }
</style>
