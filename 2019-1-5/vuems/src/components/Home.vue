<template lang="html">
  <div class="home">
    <el-header style="text-align: right; font-size: 12px">
    <el-dropdown>
      <i class="el-icon-setting"
        @click="logOut"
        style="margin-right: 15px"></i>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>个人信息</el-dropdown-item>
        <el-dropdown-item
          >
          退出系统
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <span>{{username}}</span>
  </el-header>
  <el-card class="box-card" v-if="this.$route.name=='home'">
    <div slot="header" class="clearfix">
      <span>用户详情</span>
      <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
    </div>
    <div class="text item">
      用户账号：{{userinfo.username}}
    </div>
    <div class="text item">
      用户姓名：{{userinfo.rellname}}
    </div>
    <div class="text item">
      用户年龄：{{userinfo.age}}
    </div>
    <div class="text item">
      用户工作：{{userinfo.job}}
    </div>
    <div class="text item">
      用户&nbsp;&nbsp;&nbsp;&nbsp;ID：{{userinfo.userid}}
    </div>
  </el-card>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name:'home',
  computed:{
    ...mapState({
      userinfo:state=>state.userinfo,
      username:state=>state.userinfo.username
    })
  },
  methods:{
    logOut(){
      console.log(this)
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }
  .home{
    width: 100%;
  }
</style>
