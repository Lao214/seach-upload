<template>
  <div class="body">
    <div class="head">
      <button class="button" @click="openDialog">
        <span><i class="el-icon-plus"></i>添加</span>
      </button>
    </div>
    <el-divider></el-divider>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column label="用户名" width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <!-- <p>姓名: {{ scope.row.name }}</p>
            <p>住址: {{ scope.row.address }}</p> -->
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.username }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="昵称" width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <!-- <p>姓名: {{ scope.row.name }}</p>
            <p>住址: {{ scope.row.address }}</p> -->
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.nickname }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="创建日期" width="217">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[10, 5, 15, 20, 25, 30]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>

    <!-- <el-dialog title="添加用户" :visible.sync="dialogVisible" width="30%" 
    :before-close="handleClose"
    > -->
    <el-dialog title="添加用户" :close-on-click-modal="false" :visible.sync="dialogVisible" width="30%" style="color:aquamarine;">
      <el-form :model="userForm">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <div class="inputGroup">
            <input v-model="userForm.username" type="text" required="" autocomplete="off">
          </div>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <div class="inputGroup">
            <input v-model="userForm.password" type="text" required="" autocomplete="off">
          </div>
        </el-form-item>
        <el-form-item label="昵称" :label-width="formLabelWidth">
          <div class="inputGroup">
            <input v-model="userForm.nickname" type="text" required="" autocomplete="off">
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button class="el-button--goon" @click="dialogVisible = false">取 消</el-button>
        <el-button class="el-button--goon" type="primary" @click="addUser()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import userApi from "@/api/user"

  export default {
    data() {
      return {
        dialogVisible: false,
        userForm: {
          username: '',
          password: '',
          nickname: '',
        },
        formLabelWidth: '87px',
        tableData: [],
        currentPage4: 6,
        pageSize: 100,
        total: 100,
        formQuery: {},
        val: 10
      }
    },
    created() {
      this.getform(1,10)
    },
    methods: {
      addUser() {
        userApi.addUser(this.userForm).then(res => {
          console.log(res)
          if(res.data.code === 200) {
            this.dialogVisible = false
            this.$message({
              message: '添加成功',
              type: 'success'
            })
            this.getform(1,this.val)
          }
        })
      },
      getform(current, limit) {
        userApi.getFormDataListPage(current, limit, this.formQuery).then(res => {
          if(res.data.code === 200){
            // console.log(res.data.data)
            this.tableData = res.data.data.rows
            this.total = res.data.data.total
          }
        })
      },
      openDialog() {
        this.dialogVisible = true
        this.userForm = {}
      },
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      handleSizeChange(val) {
        this.getform(1,val)
        this.val = val
      },
      handleCurrentChange(val) {
        this.getform(val,this.val)
      }
    }
  }
</script>

<style scoped>
::v-deep .el-table th{
    background-color: rgba(124, 182, 179, 0.342);
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

.body {
  margin: 7px;
}

.button {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background: lightseagreen;
  font-family: "Montserrat", sans-serif;
  box-shadow: 0px 6px 24px 0px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  border: none;
  cursor: pointer;
  padding: 7px 27px;
}

.button:after {
  content: " ";
  width: 0%;
  height: 100%;
  background: rgb(35, 175, 196);
  position: absolute;
  transition: all 0.4s ease-in-out;
  right: 0;
}

.button:hover::after {
  right: auto;
  left: 0;
  width: 100%;
}

.button span {
  text-align: center;
  text-decoration: none;
  width: 100%;
  /* padding: 11px 25px; */
  color: #fff;
  font-size: 1.125em;
  font-weight: 700;
  letter-spacing: 0.3em;
  z-index: 20;
  transition: all 0.3s ease-in-out;
}

.button:hover span {
  color: #183153;
  animation: scaleUp 0.3s ease-in-out;
}

@keyframes scaleUp {
 0% {
  transform: scale(1);
 }

 50% {
  transform: scale(0.95);
 }

 100% {
  transform: scale(1);
 }
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
</style>