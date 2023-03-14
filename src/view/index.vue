<template>
  <div class="body">
    <el-row>
      <el-col :span="3">
        <el-menu style="height: 100vh;" text-color="black" active-text-color="lightseagreen" :router="true"
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose">
            <el-submenu index="1" v-if="userList">
              <template slot="title">
                <i class="el-icon-user"></i>
                <span>用户管理</span>
              </template>
              <el-menu-item index="/user">用户列表</el-menu-item>
            </el-submenu>
            <el-menu-item index="/upload">
              <i class="el-icon-menu"></i>
              <span slot="title">上传活动资料</span>
            </el-menu-item>
          </el-menu>
      </el-col>
      <el-col :span="21">
        <div class="header"></div>
        <div class="main">
          <router-view/>
        </div>
      </el-col>
    </el-row>
</div>
</template>

<script>
import store from '@/store/index';
  export default { 
    data() {
      return {
        userList: false
      }
    },
    created() {
      if(store.state.permList.includes("user.list")){
        this.userList = true
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        // console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        // console.log(key, keyPath);
      }
    }
  }
</script>

<style scoped>
  .header {
    width: 100%;
    height: 70px;
    border-bottom: lightseagreen 1px solid;
  }
  .el-menu {
    border:  lightseagreen 1px solid;
    /* border-left: lightseagreen 1px solid; */
  }
</style>