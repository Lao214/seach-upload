<template>
  <div class="body">
    
    <el-form ref="form" :model="form" label-width="91px" :style="'margin:70px '+ widthWindow * 0.27 +'px;'">
      <el-form-item label="工号：">
        <p style="margin: 0;color:lightseagreen;font-weight: 600;font-size: 21px;">{{ userinfo.username }}</p>
      </el-form-item>
      
      <el-form-item label="密码：">
        <div class="inputGroup">
          <input v-model="form.password" type="text" required="" autocomplete="off">
        </div>
      </el-form-item>

      <el-form-item label="新密码：">
        <div class="inputGroup">
          <input v-model="form.newPwd" type="text" required="" autocomplete="off">
        </div>
      </el-form-item>

      <el-form-item>
        <el-button class="el-button--goon" @click="summit()">确认修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import userApi from '@/api/user'

export default {
  data() {
    return {
      userinfo: {},
      form: {},
      widthWindow: window.innerWidth
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    getUserInfo() {
      userApi.getUserInfo().then(res=> {
        if(res.data.code === 200) {
          console.log(res.data.data)
          this.userinfo = res.data.data.userInfo
        }
      })
    },
    summit() {
      this.form.id = this.userinfo.id
      this.form.username = this.userinfo.username
      userApi.updatePassword(this.form).then(res => {
        if(res.data.code === 200) {
          this.$message({
            type: 'success',
            message: '修改密码成功，请重新登录'
          })
        this.logout()
        }
      })
    },
    logout() {
        localStorage.clear()
				sessionStorage.clear()
        this.$router.push({ path:'/login' })
      }
  }
}
</script>

<style scoped>
.body{

}

.inputGroup {
  font-family: 'Segoe UI', sans-serif;
  margin: 0em 0 0em 0;
  max-width: 297px;
  position: relative;
}

.inputGroup input {
  font-size: 100%;
  padding: 0.8em;
  outline: none;
  border: 2px solid rgb(200, 200, 200);
  background-color: transparent;
  border-radius: 7px;
  width: 100%;
}

.inputGroup :is(input:focus, input:valid)~label {
  transform: translateY(-50%) scale(.9);
  margin: 0em;
  margin-left: 1.3em;
  padding: 0.4em;
  background-color: #e8e8e8;
}

.inputGroup :is(input:focus, input:valid) {
  border-color: lightseagreen;
}

.card{
  margin: 27px auto;
  width: 500px;
  height: 500px;
  /* display: flex; */
}

/* 按钮风格重定义 */
.el-button--goon {
    color: #ffffff;
    background-color: #13c2c2;
    border-color: #13c2c2;
    height: 34px;
    line-height: 34px;
    padding: 0 20px;
  }
  .el-button--goon:focus, .el-button--goon:hover {
    color: rgb(245, 245, 245);
    background-color: #0e9a9a;
    border-color: #0e9a9a;
    height: 34px;
    line-height: 34px;
    padding: 0 20px;
  }
  .el-button--goon:active {
    color:  #ffffff;
    background-color: #13c2c2;
    border-color: #13c2c2;
    height: 34px;
    line-height: 34px;
    padding: 0 20px;
  }
/* 按钮风格重定义 */

</style>