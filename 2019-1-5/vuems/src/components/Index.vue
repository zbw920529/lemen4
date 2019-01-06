<template lang="html">
  <div class="index">
    <el-container style="height: 500px; border: 1px solid #eee" >
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="['1', '3']" router>
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>账号管理</template>
            <el-menu-item-group>
              <el-menu-item index="userlist">账号列表</el-menu-item>
              <el-menu-item index="adduser">添加账号</el-menu-item>
            </el-menu-item-group>
              <el-menu-item index="changepassword">修改密码</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-menu"></i>导航二</template>
            <el-menu-item-group>
              <el-menu-item index="2-1">选项1</el-menu-item>
              <el-menu-item index="2-2">选项2</el-menu-item>
            </el-menu-item-group>
              <el-menu-item index="2-3">选项3</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-setting"></i>导航三</template>
            <el-menu-item-group>
              <el-menu-item index="3-1">选项1</el-menu-item>
              <el-menu-item index="3-2">选项2</el-menu-item>
            </el-menu-item-group>
              <el-menu-item index="3-3">选项3</el-menu-item>
            </el-submenu>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- <vue-router></vue-router> -->
      <router-view></router-view>
      </el-container>
  </div>
</template>

<script>
export default {
  name:'index',
  data() {
    return{
      tableData:[{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }]
      }
  }
}
</script>

<style>
.el-header {
  background-color: #B3C0D1;
  color: #fff;
  line-height: 60px;
}

html, body, #app, .index{
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0
}
.el-container{
  height: 100%!important;
}
</style>
