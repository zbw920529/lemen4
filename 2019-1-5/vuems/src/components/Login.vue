<template>
<div class="login">
  <!-- 登陆表单 -->
  <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" label-width="100px" class="demo-ruleForm">
    <h1 class="title"><span class="el-icon-loading"></span> Ms管理系统</h1>
    <el-form-item label="账号" prop="username">
      <el-input type="text" v-model="loginForm.username" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('loginForm')">提交</el-button>
      <el-button @click="resetForm('loginForm')">重置</el-button>
    </el-form-item>
  </el-form>
</div>
</template>
<script>
export default {
  name: 'login',
  data() {
    return {
      loginForm: {
        password: '',
        username: '',
      },
      rules: {
        username: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            { min: 5, max:18, message: '长度在 5 到 18 个字符', trigger: 'blur' }
          ],
        password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min:5, max: 18, message: '长度在 5 到 18 个字符', trigger: 'blur' }
          ],
        }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let _this=this
          // 收集用户名和密码
          this.axios.get('http://localhost:8080/static/checklogin.json',{
            username:_this.loginForm.username,
            password:_this.loginForm.password
          })
            .then(res=>{
              const {data}=res
               const newres=data.users.filter((item)=>{
                    return item.username==_this.loginForm.username && item.password==_this.loginForm.password
               })

            if(newres.length!=0){
              _this.$message({
                message: '恭喜你，登陆成功',
                type: 'success'
              });
              _this.$store.commit('SAVE_USERINFO',newres[0])
              this.$router.push('/')
            }else{
              this.$message.error('登陆失败，请重新登陆');
            }
            })
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
html,body,#app, .login{
  width: 100%;
  height: 100%;
  margin: 0;
  background: #ddd;
}
.login{
  display: flex;
  justify-content: center;
  align-items: center;

}
.el-form{
  padding: 2rem 4rem 2rem 0rem ;
  background: #fff;
  border: 0.2rem solid #fdf;
}
.el-form .title{
  box-sizing: border-box;
  width: 100%;
  padding-left: 4rem;
  height: 3rem;
  font-size: 24px;
  text-align: center;
}
</style>
