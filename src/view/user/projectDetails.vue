<template>
  <div style="margin: 9px;">
    <span>项目名称：<a style="margin-right:21px;color:lightseagreen;font-weight: 700;font-size: 21px;">{{ projectParam[1] }}</a></span>
    <span>培训时数：<a style="margin-right:21px;color:lightseagreen;font-weight: 700;font-size: 19px;">{{ projectParam[3] }}小时</a></span>
    <span>学分：<a style="margin-right:21px;color:lightseagreen;font-weight: 700;font-size: 19px;">{{ projectParam[2] }}</a></span>
    <span>起始时间：<a style="margin-right:21px;color:lightseagreen;font-weight: 700;font-size: 19px;">{{ projectParam[4] }} ～ {{ projectParam[5] }}</a></span>
    <br>
    <div style="margin-top: 11px;">
      <a class="buttonDownload" :href="'http://10.134.149.211:9707/AU/sysActivity/downloadFormDataListPage/'+val2+'/'+ val +'?id='+ formQuery.id" style="margin-right: 7px;">导出当前页</a>
      <a class="buttonDownload" :href="'http://10.134.149.211:9707/AU/sysActivity/downloadFormDataListAll/' +'?id='+ formQuery.id" style="margin-right: 7px;">导出全部</a>
      <a class="buttonDownload" href="/Template.xlsx" download="Template.xlsx" style="margin-right: 7px;">下载导入模版</a>
      <a class="buttonNorm" style="margin-right: 7px;" @click="addActivity()">添加单条数据</a>
      <a class="buttonNorm" style="margin-right: 7px;"  @click="uploadActivity()">导入数据</a>
      <!-- <a class="buttonDownload" :href="'http://lcoalhost:9707/AU/sysActivity/downloadFormDataListPage/'+val2+'/'+ val +'?id='+ formQuery.id" style="margin-right: 7px;">导出当前页</a>
      <a class="buttonDownload" :href="'http://lcoalhost:9707/AU/sysActivity/downloadFormDataListAll/' +'?id='+ formQuery.id" style="margin-right: 7px;">导出全部</a> -->
      <router-link :to="'/allProject'">
        <a class="buttonNorm">返回</a>
      </router-link>
    </div>
    <el-divider></el-divider>
    <el-table :span-method="objectSpanMethod" :data="tableData" border :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}" style="width: 100%" :max-height="innerHeight*0.7" >
      <el-table-column label="录入组" width="327" prop="enterId">
        <template slot-scope="scope">
          <!-- <p style="font-weight: 700;font-size:17px;">录入ID: {{ scope.row.enterId }}</p> -->
          <p style="font-weight: 700;font-size:17px;">录入人员: {{ scope.row.enterJobNo }}</p>
          <p style="font-weight: 700;font-size:17px;">录入时间: {{ scope.row.enterTime }}</p>
          <el-button class="el-button--goon" size="mini" type="danger" @click="deleteEnter(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
      <el-table-column label="参与者工号" width="187">
        <template slot-scope="scope">
          <span style="margin-left: 10px;font-weight: 700;font-size:17px;">{{ scope.row.jobNo }}</span>
        </template>
      </el-table-column>
      <el-table-column label="参与者姓名" width="187">
        <template slot-scope="scope">
          <span style="margin-left: 10px;font-weight: 700;font-size:17px;" >{{ scope.row.participantName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="获得证书名称" width="217">
        <template slot-scope="scope">
          <span style="margin-left: 10px;font-weight: 700;font-size:17px;">{{ scope.row.certificate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="获得证书时间">
        <template slot-scope="scope">
          <!-- <i class="el-icon-time"></i> -->
          <div v-if="scope.row.beRewardedTime && parseInt(scope.row.beRewardedTime.slice(0,4)) > 2000">
            <span style="margin-left: 10px;font-weight: 700;font-size:17px;">{{ scope.row.beRewardedTime.slice(0,10) }}</span>
          </div>
        </template>
      </el-table-column>
      <!-- <el-table-column label="操作" width="207">
        <template slot-scope="scope">
          <el-button class="el-button--goon" size="mini" @click="editActivity(scope.$index, scope.row)">编辑</el-button>
          <el-button class="el-button--goon" size="mini" type="danger" @click="deleteActivity(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column> -->
    </el-table>

    <div class="block">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 5, 15, 20, 25, 30, 40, 50, 999999]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>

    <!-- 添加单条数据 -->
    <el-dialog :title="'添加资料到【'+projectParam[1] + '】'" :close-on-click-modal="false" :visible.sync="dialogVisible" width="580px" style="color:aquamarine;">
      <el-form :model="formInsert">
        <el-form-item label="项目名称：" :label-width="formLabelWidth2">
          <p style="margin: 0;color:lightseagreen;font-weight: 600;font-size: 17px;">{{ projectParam[1] }}</p>
        </el-form-item>
        <el-form-item label="学分：" :label-width="formLabelWidth2">
          <p style="margin: 0;color:lightseagreen;font-weight: 600;font-size: 17px;">{{ projectParam[3] }}</p>
        </el-form-item>
        <el-form-item label="培训时数(h)：" :label-width="formLabelWidth2">
          <p style="margin: 0;color:lightseagreen;font-weight: 600;font-size: 17px;">{{ projectParam[2]}}</p>
        </el-form-item>
        <el-form-item label="录入人员工号：" :label-width="formLabelWidth2">
          <p style="margin: 0;color:lightseagreen;font-weight: 600;font-size: 17px;">{{ formInsert.enterJobNo }}</p>
        </el-form-item>
        <el-form-item label="录入人员姓名：" :label-width="formLabelWidth2">
          <div class="inputGroup">
            <p style="margin: 0;color:lightseagreen;font-weight: 600;font-size: 17px;">{{ formInsert.enterUserName }}</p>
          </div>
        </el-form-item>
        <el-form-item label="参与人员工号：" :label-width="formLabelWidth2">
          <div class="inputGroup">
            <input v-model="formInsert.jobNo" type="text" required="" autocomplete="off">
          </div>
        </el-form-item>
        <el-form-item label="参与人员姓名：" :label-width="formLabelWidth2">
          <div class="inputGroup">
            <input v-model="formInsert.participantName" type="text" required="" autocomplete="off">
          </div>
        </el-form-item>
        <el-form-item label="获得证书名称：" :label-width="formLabelWidth2">
          <div class="inputGroup">
            <input v-model="formInsert.certificate" type="text" required="" autocomplete="off">
          </div>
        </el-form-item>
        <el-form-item label="证书获得时间：" :label-width="formLabelWidth2">
          <div class="inputGroup">
            <el-date-picker v-model="formInsert.beRewardedTime" type="date" placeholder="选择日期时间" format="yyyy - MM - dd" value-format="yyyy-MM-dd"></el-date-picker>
          </div>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button class="el-button--goon" @click="dialogVisible = false">取 消</el-button>
        <el-button class="el-button--goon" type="primary" @click="confirmInsert()">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog :title="'上传资料到【'+projectParam[1] + '】'" :close-on-click-modal="false" :visible.sync="dialogVisibleUpload" width="580px" style="color:aquamarine;">
      <el-form :model="form">
        <el-form-item label="项目名称：" :label-width="formLabelWidth2">
          <p style="margin: 0;color:lightseagreen;font-weight: 600;font-size: 17px;">{{ form.uploadActivityDTO.name }}</p>
        </el-form-item>
        <el-form-item label="学分：" :label-width="formLabelWidth2">
          <p style="margin: 0;color:lightseagreen;font-weight: 600;font-size: 17px;">{{ form.uploadActivityDTO.credit }}</p>
        </el-form-item>
        <el-form-item label="培训时数(h)：" :label-width="formLabelWidth2">
          <p style="margin: 0;color:lightseagreen;font-weight: 600;font-size: 17px;">{{ form.uploadActivityDTO.hours }}</p>
        </el-form-item>
        <el-form-item label="录入人员工号：" :label-width="formLabelWidth2">
          <p style="margin: 0;color:lightseagreen;font-weight: 600;font-size: 17px;">{{ form.uploadActivityDTO.enterJobNo }}</p>
        </el-form-item>
        <el-form-item label="录入人员姓名：" :label-width="formLabelWidth2">
          <div class="inputGroup">
            <p style="margin: 0;color:lightseagreen;font-weight: 600;font-size: 17px;">{{ form.uploadActivityDTO.enterUserName }}</p>
          </div>
        </el-form-item>


        <el-form-item label="上传表格：" :label-width="formLabelWidth2">
          <el-upload class="upload-demo" ref="upload" action="http://10.134.149.211:9707/AU/sysActivity/upload" :on-preview="handlePreview" :on-remove="handleRemove" :on-change="handleChange" :file-list="form.uploadActivityDTO.file" :http-request="uploadFile" :auto-upload="false">
            <el-button class="el-button--goon" slot="trigger" size="small" type="primary">选取文件</el-button>
            <div slot="tip" class="el-upload__tip">建议上传XLSX文件,且一次上传一个文件</div>
          </el-upload>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button class="el-button--goon" @click="dialogVisibleUpload = false">取 消</el-button>
        <el-button class="el-button--goon" type="primary" @click="confirmUpload()">确 定</el-button>
      </span>
    </el-dialog>


    <el-dialog title="删除录入记录" :close-on-click-modal="false" :visible.sync="dialogVisibleDeleteEnter" width="580px" style="color:aquamarine;">
      <p style="margin: 0;color:lightseagreen;font-weight: 600;font-size: 17px;">该录入记录ID为{{ chooseEnterId }}，确定要删除吗？<br>该录入记录下的活动资料也会被删除</p>
      <span slot="footer" class="dialog-footer">
        <el-button class="el-button--goon" @click="dialogVisibleDeleteEnter = false">取 消</el-button>
        <el-button class="el-button--goon" type="primary" @click="confirmDelete(chooseEnterId)">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="删除活动资料" :close-on-click-modal="false" :visible.sync="dialogVisibleDeleteActivity" width="580px" style="color:aquamarine;">
      <p style="margin: 0;color:lightseagreen;font-weight: 600;font-size: 17px;">确定要删除参与工号为{{ chooseActivityJobNo }}的活动资料吗？</p>
      <span slot="footer" class="dialog-footer">
        <el-button class="el-button--goon" @click="dialogVisibleDeleteActivity = false">取 消</el-button>
        <el-button class="el-button--goon" type="primary" @click="confirmDeleteActivity(chooseActivityId)">确 定</el-button>
      </span>
    </el-dialog>


    <el-dialog title="编辑活动资料" :close-on-click-modal="false" :visible.sync="dialogVisibleUpdate" width="580px" style="color:aquamarine;">
     
      <el-form :model="formUpdate">
        <el-form-item label="获得证书时间：" :label-width="formLabelWidth2">
          <div class="inputGroup">
            <el-date-picker v-model="time" type="date" placeholder="选择日期时间" @change="changeTime" format="yyyy - MM - dd" value-format="yyyy-MM-dd"></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="获得证书名称：" :label-width="formLabelWidth2">
          <div class="inputGroup">
            <input v-model="formUpdate.certificate" type="text" required="" autocomplete="off">
          </div>
        </el-form-item>
        <el-form-item label="参与者工号：" :label-width="formLabelWidth2">
          <div class="inputGroup">
            <input v-model="formUpdate.jobNo" type="text" required="" autocomplete="off">
          </div>
        </el-form-item>
        <el-form-item label="参与者姓名：" :label-width="formLabelWidth2">
          <div class="inputGroup">
            <input v-model="formUpdate.participantName" type="text" required="" autocomplete="off">
          </div>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button class="el-button--goon" @click="dialogVisibleUpdate = false">取 消</el-button>
        <el-button class="el-button--goon" type="primary" @click="confirmUpdate()">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import activityApi from '@/api/activity'
import userApi from '@/api/user'

export default {
  data() {
    return {
      tableData: [],
      innerHeight: window.innerHeight,
      chooseActivityJobNo: '',
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
      spanData: [], // 组合的合并组,
      dialogVisible: false,
      dialogVisibleUpload: false,
      dialogVisibleUpdate: false,
      dialogVisibleDeleteEnter: false,
      formInsert: {},
      formUpdate: {},
      formLabelWidth2: '117px',
      dateBeginToEnd: '',
      dateBeginToEndUpload: '',
      form: {
        uploadActivityDTO: {
          enterProjectId: 0,
          name: '',
          credit: 0,
          hours: 0,
          enterUserId:0,
          enterJobNo: '',
          enterUserName:'',
          beginTime: '',
          endTime: ''
        },
        file: {}
      },
      chooseEnterId: '',
      chooseActivityId: '',
      dialogVisibleDeleteActivity: false,
      time: '',
      countUploadBefore: 0,
      countUploadAfter: 0
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
    addActivity() {
      this.formInsert.enterProjectId = this.projectParam[0]
      this.formInsert.name = this.projectParam[1]
      this.formInsert.hours = this.projectParam[2]
      this.formInsert.credit = this.projectParam[3]
      userApi.getUserInfo().then(res => {
        if(res.data.code === 200) {
          this.formInsert.enterUserId = res.data.data.userInfo.id
          this.formInsert.enterJobNo = res.data.data.userInfo.username
          this.formInsert.enterUserName = res.data.data.userInfo.realName
          this.dialogVisible = true 
        }
      })
    },
    uploadActivity() {
      this.form.uploadActivityDTO.enterProjectId = this.projectParam[0]
      this.form.uploadActivityDTO.name = this.projectParam[1]
      this.form.uploadActivityDTO.hours = this.projectParam[2]
      this.form.uploadActivityDTO.credit = this.projectParam[3]
      userApi.getUserInfo().then(res => {
        if(res.data.code === 200) {
          this.form.uploadActivityDTO.enterUserId = res.data.data.userInfo.id
          this.form.uploadActivityDTO.enterJobNo = res.data.data.userInfo.username
          this.form.uploadActivityDTO.enterUserName = res.data.data.userInfo.realName
          this.dialogVisibleUpload = true 
        }
      })
      this.countUploadBefore = this.total
    },
    editActivity(index, row) {
      this.dialogVisibleUpdate = true

      this.time = new Date(Date.parse(row.beRewardedTime.replace(/-/g, "/")));
      this.formUpdate.id = row.id
      this.formUpdate.certificate = row.certificate
      this.formUpdate.participantName = row.participantName
      this.formUpdate.jobNo = row.jobNo
      this.formUpdate.beRewardedTime = row.beRewardedTime
    },
    changeTime() {
      this.formUpdate.beRewardedTime = this.time
      console.log(this.formUpdate)
    },
    deleteEnter(index, row) {
      this.chooseEnterId = row.enterId
      this.dialogVisibleDeleteEnter = true
    },
    deleteActivity(index, row) {
      this.chooseActivityJobNo = row.jobNo
      this.chooseActivityId = row.id
      this.dialogVisibleDeleteActivity = true
    },
    confirmDelete(enterId) {
      activityApi.deleteEnter(enterId).then(res => {
        if(res.data.code === 200) {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.getform(1,10)
          this.dialogVisibleDeleteEnter = false
        }
      })
    },
    confirmDeleteActivity(id) {
      activityApi.deleteActivity(id).then(res => {
        if(res.data.code === 200) {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.getform(1,10)
          this.dialogVisibleDeleteActivity = false
        }
      })
    },
    confirmUpload() {
      this.$refs.upload.submit()
    },
    confirmUpdate() {
      activityApi.updateActivity(this.formUpdate).then(res => {
        if(res.data.code === 200) {
          this.$message({
            type: 'success',
            message: '修改成功'
          })
          this.getform(1,10)
          this.dialogVisibleUpdate = false
        }
      })
    },
    uploadFile() {
      const formData = new FormData()

      formData.append('file', this.form.file)

      this.form.uploadActivityDTO.beginTime = this.dateBeginToEndUpload[0]
      this.form.uploadActivityDTO.endTime = this.dateBeginToEndUpload[1]

      let uploadActivityDTO = JSON.stringify(this.form.uploadActivityDTO)

      formData.append('uploadActivityDTO', new Blob([uploadActivityDTO], {type: 'application/json'}));

      // console.log(this.form.uploadActivityDTO.beginTime)

      activityApi.upload(formData).then(res => {
        if(res.data.code === 200 ){
          this.dialogVisibleUpload = false
          this.$refs.upload.clearFiles()
          activityApi.getProjectActivityListPage(1, 10, this.formQuery).then(res => {
            if (res.data.code === 200) {
              this.tableData = res.data.data.list
              this.total = res.data.data.total
              this.getSpanData(this.tableData)
              this.countUploadAfter = this.total
              this.$message({
                message: '导入前有'+ this.countUploadBefore + '条数据,成功导入'+(this.countUploadAfter-this.countUploadBefore)+'条数据,现该项目有' + this.countUploadAfter + '条数据',
                type: 'success'
              })
            }
          })
        }
      })
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    confirmInsert() {
      this.formInsert.beginTime = this.dateBeginToEnd[0]
      this.formInsert.endTime = this.dateBeginToEnd[1]
      activityApi.insert(this.formInsert).then(res => {
        if (res.data.code === 200) {
          this.dialogVisible = false
          this.$message({
            message: '添加成功',
            type: 'success'
          })
          this.getform(1,10)
        }
      })
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