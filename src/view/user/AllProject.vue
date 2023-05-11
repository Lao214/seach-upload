<template>
  <div class="body">
    <div class="head">
      <button class="button">
        <span><i class="el-icon-plus"></i>添加</span>
      </button>
      <button class="button">
        <span><i class="el-icon-plus"></i>批量添加</span>
      </button>
      <el-input style="width: 300px;margin-right: 10px;" placeholder="根据姓名查找" v-model="realName" clearable></el-input>
      <el-input style="width: 300px;margin-right: 10px;" placeholder="根据工号查找" v-model="username" clearable></el-input>
      <div class="block">
        <span style="margin: 4px;">创建时间：</span>
        <el-date-picker v-model="DateBeginAndEnd" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
        <!-- <el-date-picker v-model="DateBeginAndEnd" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss">
        </el-date-picker> -->
      </div>
      <button class="button" @click="search()">
        <span><i class="el-icon-search"></i>搜索</span>
      </button>
    </div>
    <el-divider></el-divider>
    <div class="table">
      <el-table :header-cell-style="{'text-align':'center'}" :row-class-name="tableRowClassName" :max-height="innerHeight*0.7" :data="tableData" style="width: 100%" row-key="id" border default-expand-all lazy :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
        <el-table-column fixed="left" prop="department" label="部门" width="270"></el-table-column>
        <el-table-column prop="username" label="工号" width="180"></el-table-column>
        <el-table-column prop="realName" label="姓名" width="100"></el-table-column>
        <el-table-column prop="projectName" label="项目名称" width="240"></el-table-column>
        <el-table-column prop="hours" label="学时" width="100"></el-table-column>
        <el-table-column prop="credit" label="学分" width="100"></el-table-column>
        <el-table-column prop="numOfProject" label="人数" width="100"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="180"></el-table-column>
        <el-table-column prop="beginTime" label="开始时间" width="180"></el-table-column>
        <el-table-column prop="endTime" label="结束时间" width="180"></el-table-column>
        <el-table-column fixed="right" label="操作" width="180">
          <template slot-scope="scope">
            <el-button v-if="scope.row.level === 3" class="el-button--goon" size="mini"  @click="toWatch(scope.row.projectId, scope.row.projectName, scope.row.credit, scope.row.hours, scope.row.beginTime, scope.row.endTime)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import projectApi  from '@/api/project'

export default {
  data() {
    return {
      tableData: [],
      innerHeight: window.innerHeight,
      realName: '',
      username: '',
      DateBeginAndEnd: ''
    }
  },
  created() {
    this.getList()
  },
  methods: {
    toWatch(id, name, credit, hours, beginTime, endTime) {
      const data = []
      data.push(id)
      data.push(name)
      data.push(credit)
      data.push(hours)
      data.push(beginTime)
      data.push(endTime)
      this.$router.push( { path: '/projectDetails', query: { par: JSON.stringify(data) }})
    },
    tableRowClassName({row, rowIndex}) {
      if(row.level === 1) {
         return 'unit-row'
      } else if (row.level === 2) {
         return 'department-row'
      }
    },
    getList() {
      const formQuery = {
        realName: this.realName,
        username: this.username,
      }
      if(this.DateBeginAndEnd) {
        formQuery.beginTime = this.DateBeginAndEnd[0]
        formQuery.endTime = this.DateBeginAndEnd[1]
      }
      projectApi.findAllProject(formQuery).then(res => {
        if(res.data.code === 200) {
          this.tableData = res.data.data.list
          console.log(res.data.data)
        }
      })
    },
    search() {
      console.log(this.DateBeginAndEnd[0])
      console.log(this.DateBeginAndEnd[1])
      this.getList()
    }
  }
}
</script>

<style>
.el-table .unit-row {
  background: #f0f9eb;
}
.el-table .department-row {
  background: rgb(227, 239, 235);
}
</style>

<style scoped>
.table {
  margin: 4px;
}

.head {
  display: flex;
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
  margin: 0 7px;
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