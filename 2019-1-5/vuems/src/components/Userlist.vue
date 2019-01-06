<template lang="html">
  <div class="userlist">
    <Home/>
    <el-card class="box-card">
        <span>账号信息</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
    </el-card>
    <el-table
      :data="tableData"
      stripe
      style="width: 100%">
      <el-table-column
        prop="username"
        label="用户账号"
        width="180"
        contentEditable=true>
      </el-table-column>
      <el-table-column
        prop="rellname"
        label="真实姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="age"
        label="用户年龄"
        width="180">
      </el-table-column>
      <el-table-column
        prop="password"
        label="用户密码"
        width="180">
      </el-table-column>
      <el-table-column
        prop="userid"
        label="用户id"
        width="180">
      </el-table-column>
      <el-table-column
        prop="job"
        label="工作">
      </el-table-column>
      <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="handleEixtk(scope.row.userid)" type="text" size="small">修改</el-button>
          <el-button @click="handleDel(scope.row.userid)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {mapState } from 'vuex'
import Home from './Home'
export default {
  name:'userlist',
  components:{
    Home,
  },
  data(){
    return{
      tableData:[]
    }
  },
  methods:{
    handleEixtk(a){
      console.log(a)
    },
    handleDel(a){
      console.log(a)
    }
  },
  created(){
    this.$store.dispatch('SAVE_USERLIST').then(()=>{
       this.tableData=this.$store.state.userlist.users
    })
  },
}
</script>

<style scoped>
.userlist{
  width: 100%;
}
/* .text {
    font-size: 14px;
  }
.item {
  margin-bottom: 18px;
} */
</style>
