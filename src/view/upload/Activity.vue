<template>
  <div style="margin: 9px;">
    <span>项目名称：<a style="margin-right:21px;color:lightseagreen;font-weight: 700;font-size: 21px;">{{ projectParam[1] }}</a></span>
    <span>培训时数：<a style="margin-right:21px;color:lightseagreen;font-weight: 700;font-size: 19px;">{{ projectParam[2] }}小时</a></span>
    <span>学分：<a style="margin-right:21px;color:lightseagreen;font-weight: 700;font-size: 19px;">{{ projectParam[3] }}</a></span>
    <!-- <a class="buttonDownload" @click="download()" style="margin-right: 7px;">导出</a> -->
    <!-- <a class="buttonDownload" :href="'http://10.130.143.52:9707/AU/sysActivity/downloadFormDataListPage/'+val2+'/'+ val +'?id='+ formQuery.id" style="margin-right: 7px;">导出当前页</a>
    <a class="buttonDownload" :href="'http://10.130.143.52:9707/AU/sysActivity/downloadFormDataListAll/' +'?id='+ formQuery.id" style="margin-right: 7px;">导出全部</a> -->
    <a class="buttonDownload" :href="'http://lcoalhost:9707/AU/sysActivity/downloadFormDataListPage/'+val2+'/'+ val +'?id='+ formQuery.id" style="margin-right: 7px;">导出当前页</a>
    <a class="buttonDownload" :href="'http://lcoalhost:9707/AU/sysActivity/downloadFormDataListAll/' +'?id='+ formQuery.id" style="margin-right: 7px;">导出全部</a>
    <router-link :to="'/myProject'">
      <a class="buttonNorm">返回</a>
    </router-link>
    <!-- <el-button class="el-button--goon">添加</el-button> -->
    <el-divider></el-divider>
    <el-table :span-method="objectSpanMethod" :data="tableData" border style="width: 100%" :max-height="innerHeight*0.7">
      <el-table-column label="录入组" width="497" prop="enterId">
        <template slot-scope="scope">
          <p style="font-weight: 700;font-size:17px;">录入ID: {{ scope.row.enterId }}</p>
          <p style="font-weight: 700;font-size:17px;">录入人员: {{ scope.row.enterJobNo }}</p>
          <p style="font-weight: 700;font-size:17px;">录入时间: {{ scope.row.enterTime }}</p>
          <p style="font-weight: 700;font-size:17px;">起始时间: {{ scope.row.beginTime }} ～ {{ scope.row.endTime }}</p>
          <el-button class="el-button--goon" size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">修改起始时间</el-button>
          <el-button class="el-button--goon" size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
      <!-- <el-table-column label="操作" width="147" prop="enterId">
      </el-table-column> -->
      <el-table-column label="参与者工号" width="147">
        <template slot-scope="scope">
          <span style="margin-left: 10px;font-weight: 700;font-size:17px;">{{ scope.row.jobNo }}</span>
        </template>
      </el-table-column>
      <el-table-column label="参与者姓名" width="127">
        <template slot-scope="scope">
          <span style="margin-left: 10px;font-weight: 700;font-size:17px;" >{{ scope.row.participantName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="获得证书名称" width="197">
        <template slot-scope="scope">
          <span style="margin-left: 10px;font-weight: 700;font-size:17px;">{{ scope.row.certificate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="获得证书时间" width="227">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px;font-weight: 700;font-size:17px;">{{ scope.row.beRewardedTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="97">
        <template slot-scope="scope">
          <span v-if="scope.row.status === 0" style="margin-left: 10px;font-weight: 700;font-size:17px;">未审核</span>
          <span v-if="scope.row.status === 1" style="margin-left: 10px;font-weight: 700;font-size:17px;">已通过</span>
          <span v-if="scope.row.status === 2" style="margin-left: 10px;font-weight: 700;font-size:17px;">已驳回</span>
        </template>
      </el-table-column>
      <el-table-column label="审核员">
        <template slot-scope="scope">
          <!-- <span style="margin-left: 10px">{{ scope.row.auditUserName }}</span> -->
          <el-popover trigger="hover" placement="top">
          <p>审核时间: {{ scope.row.auditTime }}</p>
          <p>审核人员ID: {{ scope.row.auditUserId }}</p>
          <div slot="reference" class="name-wrapper">
            <span style="margin-left: 10px">{{ scope.row.auditUserName }}</span>
          </div>
        </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button class="el-button--goon" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button class="el-button--goon" size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="block">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 5, 15, 20, 25, 30]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>

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
      projectParam: [],
      pageSize: 10,
      currentPage: 1,
      val: 10,
      val2: 1,
      //合并表格
      columnArr: ["enterId"],
      spanArr: [], //临时组
      spanData: [], // 组合的合并组
    }
  },
  created() {
    this.projectParam = JSON.parse(this.$route.query.par)
    console.log(this.projectParam)
    this.formQuery['id'] = this.projectParam[0]
    this.getform(1,10)
  },
  methods: {
    // 计算需要合并的单元格
    getSpanData(data) {
      this.spanData = [];
      this.columnArr.forEach((element) => {
        let contactDot = 0;
        this.spanArr = [];
        data.forEach((item, index) => {
          if (index === 0) {
            this.spanArr.push(1);
          } else {
            if (item[element] === data[index - 1][element]) {
              this.spanArr[contactDot] += 1;
              this.spanArr.push(0);
            } else {
              contactDot = index;
              this.spanArr.push(1);
            }
          }
        });
        this.spanData.push(this.spanArr);
      });
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (this.columnArr.includes(column.property)) {
        if (this.spanData[columnIndex][rowIndex]) {
          return {
            rowspan: this.spanData[columnIndex][rowIndex],
            colspan: 1,
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0,
          };
        }
      }
    },
    getform(current, limit) {
      activityApi.getProjectActivityListPage(current, limit, this.formQuery).then(res => {
        if (res.data.code === 200) {
          this.tableData = res.data.data.list
          this.total = res.data.data.total
          console.log(this.tableData)
          this.getSpanData(this.tableData)
        }
      })
    },
    handleChange(file, fileList) {
      this.form.file = file.raw
      // console.log(this.form)
    },
    handleSizeChange(val) {
      this.getform(1,val)
      this.val = val
    },
    handleCurrentChange(val) {
      this.getform(val,this.val)
      this.val2 = val
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