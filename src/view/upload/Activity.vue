<template>
  <div style="margin: 9px;">
    <span>项目名称：<a style="margin-right:21px;color:lightseagreen;font-weight: 700;font-size: 21px;">{{ projectParam[1] }}</a></span>
    <span>培训时数：<a style="margin-right:21px;color:lightseagreen;font-weight: 700;font-size: 19px;">{{ projectParam[2] }}小时</a></span>
    <span>学分：<a style="margin-right:21px;color:lightseagreen;font-weight: 700;font-size: 19px;">{{ projectParam[3] }}</a></span>
    <a class="buttonDownload" style="margin-right: 7px;">导出</a>
    <router-link :to="'/myProject'">
      <a class="buttonNorm">返回</a>
    </router-link>
    <!-- <el-button class="el-button--goon">添加</el-button> -->
    <el-divider></el-divider>
    <el-table :data="tableData" border style="width: 100%" :max-height="innerHeight*0.7">
      <el-table-column label="参与者工号" width="147">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.jobNo }}</span>
        </template>
      </el-table-column>
      <el-table-column label="参与者姓名" width="127">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.participantName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="获得证书名称" width="177">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.certificate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="获得证书时间" width="197">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.beRewardedTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="开始时间" width="197">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.beginTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="结束时间" width="197">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.endTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="录入人员" width="127">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.enterJobNo }}</span>
        </template>
      </el-table-column>
      <el-table-column label="录入时间">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.endTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="97">
        <template slot-scope="scope">
          <span v-if="scope.row.status === 0" style="margin-left: 10px">未审核</span>
          <span v-if="scope.row.status === 1" style="margin-left: 10px">已通过</span>
          <span v-if="scope.row.status === 2" style="margin-left: 10px">已驳回</span>
        </template>
      </el-table-column>
      <el-table-column label="审核员">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.auditUserName }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button class="el-button--goon" size="mini" @click="toAssignRole(scope.$index, scope.row)">分配角色</el-button>
          <el-button class="el-button--goon" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button class="el-button--goon" size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column> -->
    </el-table>
  </div>
</template>

<script>
import activityApi from '@/api/activity'

export default {
  data() {
    return {
      tableData: [],
      innerHeight: window.innerHeight,
      formQuery: {},
      total: 0,
      projectParam: []
    }
  },
  created() {
    this.projectParam = JSON.parse(this.$route.query.par)
    console.log(this.projectParam)
    this.formQuery['id'] = this.projectParam[0]
    this.getform(1,10)
  },
  methods: {
    getform(current, limit) {
      activityApi.getProjectActivityListPage(current, limit, this.formQuery).then(res => {
        if (res.data.code === 200) {
          this.tableData = res.data.data.list
          this.total = res.data.data.total
        }
      })
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

.buttonDownload {
 display: inline-block;
 position: relative;
 padding: 10px 25px;
 background-color: lightseagreen;
 color: white;
 font-family: sans-serif;
 text-decoration: none;
 font-size: 0.9em;
 text-align: center;
 text-indent: 15px;
 border: none;
 cursor: pointer;
}

.buttonDownload:hover {
 background-color: rgb(25, 142, 136);
 color: white;
}

.buttonDownload:before, .buttonDownload:after {
 content: ' ';
 display: block;
 position: absolute;
 left: 15px;
 top: 52%;
}

.buttonDownload:before {
 width: 10px;
 height: 2px;
 border-style: solid;
 border-width: 0 2px 2px;
}

.buttonDownload:after {
 width: 0;
 height: 0;
 margin-left: 3px;
 margin-top: -7px;
 border-style: solid;
 border-width: 4px 4px 0 4px;
 border-color: transparent;
 border-top-color: inherit;
 animation: downloadArrow 1s linear infinite;
 animation-play-state: paused;
}

.buttonDownload:hover:before {
 border-color: #cdefbd;
}

.buttonDownload:hover:after {
 border-top-color: #cdefbd;
 animation-play-state: running;
}

.buttonNorm {
 display: inline-block;
 position: relative;
 padding: 10px 25px;
 background-color: lightseagreen;
 color: white;
 font-family: sans-serif;
 text-decoration: none;
 font-size: 0.9em;
 text-align: center;
 /* text-indent: 15px; */
 border: none;
 cursor: pointer;
}

.buttonNorm:hover {
 background-color: rgb(25, 142, 136);
 color: white;
}
</style>