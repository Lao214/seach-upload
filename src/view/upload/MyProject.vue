<template>
  <div class="body">
    <a class="buttonDownload" href="/Template.xlsx" download="Template.xlsx">下载模版</a>
    <!-- <a class="button">上传资料</a> -->
    <a @click="createProject()" class="buttonNorm" style="margin-left: 7px;"><i class="el-icon-plus"></i>添加培训项目</a>
    <el-divider></el-divider>

    <div class="cardTable">
      <div v-for="(item, index) in tableData" :key="index">
        <el-tooltip placement="top">
          <div slot="content">培训时数：{{ item.hours }}h<br/>学分：{{ item.credit }}</div>
          <div class="card" @click="toEditAndWatch(item.id, item.name, item.credit, item.hours, item.beginTime, item.endTime)">
            <i class="el-icon-close" style="position:absolute; right:0%;top: 0%;font-size: 21px;margin: 7px;cursor: pointer;" @click.stop="deleteProject(item.id,item.name)" />
            <div style="color:lightseagreen;width: 100%;text-align: center;font-size: 47px;">
              <i class="el-icon-folder"></i>
            </div>
            <h3 style="color:lightseagreen;margin: 0;text-align: center;">{{ item.name }}</h3>
            <div style="width: 100%;text-align: center;margin: 0;">
              <el-tooltip content="编辑该项目" placement="bottom">
                <i class="el-icon-edit-outline" style="font-size: 27px;margin: 7px;cursor: pointer;" @click.stop="updateThisProject(item.id, item.name, item.credit, item.hours, item.beginTime, item.endTime)"></i>
              </el-tooltip>
              <el-tooltip content="添加单条记录到该项目" placement="bottom">
                <i class="el-icon-folder-add" style="font-size: 27px;margin: 7px;cursor: pointer;" @click.stop="insertToThisProject(item.id, item.name, item.credit, item.hours, item.beginTime, item.endTime)"></i>
              </el-tooltip>
              <el-tooltip content="上传execl资料到该项目" placement="bottom">
                <i class="el-icon-upload2" @click.stop="uploadToThisProject(item.id, item.name, item.credit, item.hours, item.beginTime, item.endTime)" style="font-size: 27px;margin: 7px;cursor: pointer;"></i>
              </el-tooltip>
            </div>
          </div>
        </el-tooltip>
      </div>
    </div>

    <div class="block">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[10, 5, 15]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>

    <el-dialog title="创建项目" :close-on-click-modal="false" :visible.sync="dialogVisible" width="580px" style="color:aquamarine;">
      <el-form :model="projectForm">
        <el-form-item label="项目名称" :label-width="formLabelWidth2">
          <div class="inputGroup">
            <input v-model="projectForm.name" type="text" required="" autocomplete="off">
          </div>
        </el-form-item>
        <el-form-item label="学分" :label-width="formLabelWidth2">
          <div class="inputGroup">
            <input v-model="projectForm.credit" type="number" min="0" placeholder="请输入整数或小数" required="" autocomplete="off">
          </div>
        </el-form-item>
        <el-form-item label="培训时数" :label-width="formLabelWidth2">
          <div class="inputGroup">
            <input v-model="projectForm.hours" type="number" min="0" placeholder="请输入整数或小数" required="" autocomplete="off">
          </div>
        </el-form-item>
        <el-form-item label="项目起止时间：" :label-width="formLabelWidth2">
          <!-- <el-date-picker v-model="dateBeginToEnd" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker> -->
          <el-date-picker v-model="dateBeginToEnd" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy - MM - dd" value-format="yyyy-MM-dd">
        </el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button class="el-button--goon" @click="dialogVisible = false">取 消</el-button>
        <el-button class="el-button--goon" type="primary" @click="confirmCreate()">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="编辑项目" :close-on-click-modal="false" :visible.sync="dialogVisibleUpdate" width="580px" style="color:aquamarine;">
      <el-form :model="projectFormUpdate">
        <el-form-item label="项目名称" :label-width="formLabelWidth2">
          <div class="inputGroup">
            <input v-model="projectFormUpdate.name" type="text" required="" autocomplete="off">
          </div>
        </el-form-item>
        <el-form-item label="学分" :label-width="formLabelWidth2">
          <div class="inputGroup">
            <input v-model="projectFormUpdate.credit" type="text" required="" autocomplete="off">
          </div>
        </el-form-item>
        <el-form-item label="培训时数" :label-width="formLabelWidth2">
          <div class="inputGroup">
            <input v-model="projectFormUpdate.hours" type="text" required="" autocomplete="off">
          </div>
        </el-form-item>
        <el-form-item label="项目起止时间：" :label-width="formLabelWidth2">
          <el-date-picker v-model="dateBeginToEndU" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy - MM - dd" value-format="yyyy-MM-dd" @change="changeTimeForUpdate">
        </el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button class="el-button--goon" @click="dialogVisible = false">取 消</el-button>
        <el-button class="el-button--goon" type="primary" @click="confirmUpdate()">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog :title="'上传资料到【'+selectProject + '】'" :close-on-click-modal="false" :visible.sync="dialogVisibleUpload" width="580px" style="color:aquamarine;">
      <el-form :model="form">
        <el-form-item label="项目名称：" :label-width="formLabelWidth2">
          <!-- <div class="inputGroup"> -->
            <!-- <input v-model="form.uploadActivityDTO.name" type="text" required="" autocomplete="off" disabled="disabled"> -->
            <p style="margin: 0;color:lightseagreen;font-weight: 600;font-size: 17px;">{{ form.uploadActivityDTO.name }}</p>
          <!-- </div> -->
        </el-form-item>
        <el-form-item label="学分：" :label-width="formLabelWidth2">
          <p style="margin: 0;color:lightseagreen;font-weight: 600;font-size: 17px;">{{ form.uploadActivityDTO.credit }}</p>
        </el-form-item>
        <el-form-item label="培训时数(h)：" :label-width="formLabelWidth2">
          <p style="margin: 0;color:lightseagreen;font-weight: 600;font-size: 17px;">{{ form.uploadActivityDTO.hours }}</p>
        </el-form-item>
        <!-- <el-form-item label="录入人员ID：" :label-width="formLabelWidth2">
          <p style="margin: 0;color:lightseagreen;font-weight: 600;font-size: 17px;">{{ form.uploadActivityDTO.enterUserId }}</p>
        </el-form-item> -->
        <el-form-item label="录入人员工号：" :label-width="formLabelWidth2">
          <p style="margin: 0;color:lightseagreen;font-weight: 600;font-size: 17px;">{{ form.uploadActivityDTO.enterJobNo }}</p>
        </el-form-item>
        <el-form-item label="录入人员姓名：" :label-width="formLabelWidth2">
          <div class="inputGroup">
            <p style="margin: 0;color:lightseagreen;font-weight: 600;font-size: 17px;">{{ form.uploadActivityDTO.enterUserName }}</p>
          </div>
        </el-form-item>
        <el-form-item label="开始时间：" :label-width="formLabelWidth2">
          <div class="inputGroup">
            <p style="margin: 0;color:lightseagreen;font-weight: 600;font-size: 17px;">{{ form.uploadActivityDTO.beginTime }}</p>
          </div>
        </el-form-item>
        <el-form-item label="结束时间：" :label-width="formLabelWidth2">
          <div class="inputGroup">
            <p style="margin: 0;color:lightseagreen;font-weight: 600;font-size: 17px;">{{ form.uploadActivityDTO.endTime }}</p>
          </div>
        </el-form-item>
        <!-- <el-form-item label="项目起止时间：" :label-width="formLabelWidth2">
          <el-date-picker v-model="dateBeginToEnd" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
        </el-form-item> -->

        <!-- <el-form-item label="上传表格：" :label-width="formLabelWidth2">
          <el-upload class="upload-demo" ref="upload" action="http://localhost:9707/AU/sysActivity/upload" :on-preview="handlePreview" :on-remove="handleRemove" :on-change="handleChange" :file-list="form.uploadActivityDTO.file" :http-request="uploadFile" :auto-upload="false">
            <el-button class="el-button--goon" slot="trigger" size="small" type="primary">选取文件</el-button>
            <div slot="tip" class="el-upload__tip">建议上传XLSX文件</div>
          </el-upload>
        </el-form-item> -->

        <el-form-item label="上传表格：" :label-width="formLabelWidth2">
          <el-upload class="upload-demo" ref="upload" action="http://10.134.149.211:9707/AU/sysActivity/upload" :on-preview="handlePreview" :on-remove="handleRemove" :on-change="handleChange" :file-list="form.uploadActivityDTO.file" :http-request="uploadFile" :auto-upload="false">
            <el-button class="el-button--goon" slot="trigger" size="small" type="primary">选取文件</el-button>
            <div slot="tip" class="el-upload__tip">建议上传XLSX文件,且一次上传一个文件，文件大小限制目前为30MB</div>
          </el-upload>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button class="el-button--goon" @click="dialogVisibleUpload = false">取 消</el-button>
        <el-button class="el-button--goon" type="primary" @click="confirmUpload()">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog :title="'添加资料到【'+selectProject + '】'" :close-on-click-modal="false" :visible.sync="dialogVisibleInsert" width="580px" style="color:aquamarine;">
      <el-form :model="insertActivityDTO">
        <el-form-item label="项目名称：" :label-width="formLabelWidth2">
            <p style="margin: 0;color:lightseagreen;font-weight: 600;font-size: 17px;">{{ insertActivityDTO.name }}</p>
        </el-form-item>
        <el-form-item label="学分：" :label-width="formLabelWidth2">
          <p style="margin: 0;color:lightseagreen;font-weight: 600;font-size: 17px;">{{ insertActivityDTO.credit }}</p>
        </el-form-item>
        <el-form-item label="培训时数(h)：" :label-width="formLabelWidth2">
          <p style="margin: 0;color:lightseagreen;font-weight: 600;font-size: 17px;">{{ insertActivityDTO.hours }}</p>
        </el-form-item>
        <!-- <el-form-item label="录入人员ID：" :label-width="formLabelWidth2">
          <p style="margin: 0;color:lightseagreen;font-weight: 600;font-size: 17px;">{{ insertActivityDTO.enterUserId }}</p>
        </el-form-item> -->
        <el-form-item label="录入人员工号：" :label-width="formLabelWidth2">
          <p style="margin: 0;color:lightseagreen;font-weight: 600;font-size: 17px;">{{ insertActivityDTO.enterJobNo }}</p>
        </el-form-item>
        <el-form-item label="开始时间：" :label-width="formLabelWidth2">
            <p style="margin: 0;color:lightseagreen;font-weight: 600;font-size: 17px;">{{ insertActivityDTO.beginTime }}</p>
        </el-form-item>
        <el-form-item label="结束时间：" :label-width="formLabelWidth2">
            <p style="margin: 0;color:lightseagreen;font-weight: 600;font-size: 17px;">{{ insertActivityDTO.endTime }}</p>
        </el-form-item>
        <el-form-item label="参与人员工号：" :label-width="formLabelWidth2">
          <div class="inputGroup">
            <input v-model="insertActivityDTO.jobNo" type="text" required="" autocomplete="off">
          </div>
        </el-form-item>
        <el-form-item label="参与人员姓名：" :label-width="formLabelWidth2">
          <div class="inputGroup">
            <input v-model="insertActivityDTO.participantName" type="text" required="" autocomplete="off">
          </div>
        </el-form-item>
        <el-form-item label="获得证书名称：" :label-width="formLabelWidth2">
          <div class="inputGroup">
            <input v-model="insertActivityDTO.certificate" type="text" required="" autocomplete="off">
          </div>
        </el-form-item>
        <el-form-item label="证书获得时间：" :label-width="formLabelWidth2">
          <div class="inputGroup">
            <el-date-picker v-model="insertActivityDTO.beRewardedTime" type="date" placeholder="选择日期时间" format="yyyy - MM - dd" value-format="yyyy-MM-dd"></el-date-picker>
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button class="el-button--goon" @click="dialogVisibleInsert = false">取 消</el-button>
        <el-button class="el-button--goon" type="primary" @click="confirmInsert(insertActivityDTO.enterProjectId,insertActivityDTO.name,insertActivityDTO.credit,insertActivityDTO.hours,insertActivityDTO.beginTime,insertActivityDTO.endTime)">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="删除项目" :close-on-click-modal="false" :visible.sync="dialogVisibleDelete" width="580px" style="color:aquamarine;">
      <p style="margin: 0;color:lightseagreen;font-weight: 600;font-size: 17px;">确定要删除名为【{{ deleteName }}】的项目吗</p>
      <span slot="footer" class="dialog-footer">
        <el-button class="el-button--goon" @click="dialogVisibleDelete = false">取 消</el-button>
        <el-button class="el-button--goon" type="primary" @click="confirmDelete()">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import projectAPi from '@/api/project'
import activityApi from '@/api/activity'
import userApi from '@/api/user'

export default {
  data() {
    return {
      dialogVisible: false,
      dialogVisibleDelete: false,
      dialogVisibleUpdate: false,
      dialogVisibleUpload: false,
      dialogVisibleInsert: false,
      projectForm: {},
      projectFormUpdate: {},
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
      insertActivityDTO: {},
      formLabelWidth: '87px',
      formLabelWidth2: '119px',
      formQuery: {},
      tableData: [],
      total: 0,
      currentPage4:0,
      pageSize: 10,
      selectProject: '',
      dateBeginToEnd: [],
      dateBeginToEndU: [],
      deleteId: '',
      deleteName: '',
      countUploadBefore: 0,
      countUploadAfter: 0,
      val: 10,
    }
  },
  created() {
    userApi.getUserInfo().then(res => {
      if(res.data.code === 200) {
        this.formQuery['id'] = res.data.data.userInfo.id
        this.getform(1,10)
      }
    })
  },
  methods: {
    createProject() {
      this.dialogVisible = true
      this.projectForm  = {}
    },
    confirmCreate() {
      this.projectForm.beginTime = this.dateBeginToEnd[0]
      this.projectForm.endTime = this.dateBeginToEnd[1]
      projectAPi.createProject(this.projectForm).then(res => {
        if(res.data.code === 200) {
          this.dialogVisible = false
          this.$message({
            message: '创建成功',
            type: 'success'
          })
          this.getform(1,10)
        }
      })
    },
    confirmInsert(id, name, credit, hours,beginTime, endTime) {
      // this.insertActivityDTO.beginTime = this.dateBeginToEnd[0]
      // this.insertActivityDTO.endTime = this.dateBeginToEnd[1]
      activityApi.insert(this.insertActivityDTO).then(res => {
        if (res.data.code === 200) {
          this.dialogVisibleInsert = false
          this.$message({
            message: '添加成功',
            type: 'success'
          })
          this.toEditAndWatch(id, name, credit, hours, beginTime, endTime)
        }
      })
    },
    getform(current, limit) {
      console.log(current)
      console.log(limit)
      projectAPi.getFormDataListPage(current, limit, this.formQuery).then(res => {
        if (res.data.code === 200) {
          this.tableData = res.data.data.rows
          this.total = res.data.data.total
        }
      })
    },
    uploadToThisProject(id, name, credit, hours, beginTime, endTime) {
      this.selectProject = name
      this.form.uploadActivityDTO.enterProjectId = id
      this.form.uploadActivityDTO.name = name
      this.form.uploadActivityDTO.credit = credit
      this.form.uploadActivityDTO.hours = hours
      this.form.uploadActivityDTO.beginTime = beginTime
      this.form.uploadActivityDTO.endTime = endTime
      userApi.getUserInfo().then(res => {
        if(res.data.code === 200) {
          this.form.uploadActivityDTO.enterUserId = res.data.data.userInfo.id
          this.form.uploadActivityDTO.enterJobNo = res.data.data.userInfo.username
          this.form.uploadActivityDTO.enterUserName = res.data.data.userInfo.realName
          this.dialogVisibleUpload = true 
        }
      })
      activityApi.getCount(id).then(res=> {
        if(res.data.code === 200) {
          this.countUploadBefore = res.data.data.count
        }
      })
    },
    insertToThisProject(id, name, credit, hours, beginTime, endTime) {
      this.insertActivityDTO = {}
      this.selectProject = name
      this.insertActivityDTO.enterProjectId = id
      this.insertActivityDTO.name = name
      this.insertActivityDTO.credit = credit
      this.insertActivityDTO.hours = hours
      this.insertActivityDTO.beginTime = beginTime
      this.insertActivityDTO.endTime = endTime
      userApi.getUserInfo().then(res => {
        if(res.data.code === 200) {
          this.insertActivityDTO.enterUserId = res.data.data.userInfo.id
          this.insertActivityDTO.enterJobNo = res.data.data.userInfo.username
          this.insertActivityDTO.enterUserName = res.data.data.userInfo.realName
          this.dialogVisibleInsert = true 
        }
      })
    },
    confirmUpload() {
      this.$refs.upload.submit()
    },
    handleChange(file, fileList) {
      this.form.file = file.raw
      // console.log(this.form)
    },
    handleSizeChange(val) {
      console.log(val,'val1')
      this.getform(1,val)
      this.val = val
    },
    handleCurrentChange(val) {
      console.log(val,'val2')
      this.getform(val,this.val)
    },
    uploadFile() {
      const formData = new FormData()
      // console.log(this.form.file)
      formData.append('file', this.form.file)

      // this.form.uploadActivityDTO.beginTime = this.dateBeginToEnd[0]
      // this.form.uploadActivityDTO.endTime = this.dateBeginToEnd[1]

      let uploadActivityDTO = JSON.stringify(this.form.uploadActivityDTO)

      formData.append('uploadActivityDTO', new Blob([uploadActivityDTO], {type: 'application/json'}));

      // console.log(this.form.uploadActivityDTO.beginTime)

      activityApi.upload(formData).then(res => {
        // console.log(res)
        if(res.data.code === 200 ) {
          this.dialogVisibleUpload = false
          this.$refs.upload.clearFiles()
          activityApi.getCount(this.form.uploadActivityDTO.enterProjectId).then(res =>{
            if(res.data.code === 200) {
              this.countUploadAfter = res.data.data.count
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
    toEditAndWatch(id, name, credit, hours, beginTime, endTime) {
      const data = []
      data.push(id)
      data.push(name)
      data.push(credit)
      data.push(hours)
      data.push(beginTime)
      data.push(endTime)
      this.$router.push({ path: '/activity', query: { par: JSON.stringify(data) }})
    },
    updateThisProject(id, name, credit, hours, beginTime, endTime) {
      this.dialogVisibleUpdate = true
      this.projectFormUpdate.id = id
      this.projectFormUpdate.name = name
      this.projectFormUpdate.credit = credit
      this.projectFormUpdate.hours = hours
      if(beginTime) {
        this.dateBeginToEndU[0] = beginTime
      }
      if(endTime) {
        this.dateBeginToEndU[1] = endTime
      }
    },
    confirmUpdate() {
      this.projectFormUpdate.beginTime = this.dateBeginToEndU[0]
      this.projectFormUpdate.endTime = this.dateBeginToEndU[1]
      projectAPi.updateProject(this.projectFormUpdate).then(res => {
        if(res.data.code === 200) {
          this.dialogVisibleUpdate = false
          this.$message({
            message: '创建成功',
            type: 'success'
          })
          this.getform(1,10)
        }
      })
    },
    changeTimeForUpdate() {

    },
    deleteProject(id,name) {
      this.deleteId = id 
      this.deleteName = name
      this.dialogVisibleDelete = true
    },
    confirmDelete() {
      projectAPi.deleteProject(this.deleteId).then(res => {
        if(res.data.code === 200) {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.getform(1,10)
          this.dialogVisibleDelete = false
        }
      })
    }
  }
}
</script>

<style scoped>
  .cardTable {
    display: flex;
    flex-wrap: wrap;
  }


  .body {
    margin: 9px;
  }
  i:hover {
    color: lightseagreen;  
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


.card {
  position: relative;
  width: 161px;
  height: 216px;
  border: #0e9a9a 2px solid;
  margin: 7px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  border-radius: 7px;
}

.card:hover {
  box-shadow: inset 0px 0px 7px #096464;
  cursor: pointer;
}

.number {
  position: absolute;
  left: 0%;
  top: 0%;
  border-radius: 4px 0 9px 0px;
  width: 40px;
  height: 40px;
  background: #0e9a9a;
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

.button{
 /* margin: 7px; */
 margin-left: 11px;
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


.button:before, .button:after {
 content: ' ';
 display: block;
 position: absolute;
 left: 15px;
 top: 52%;
}
.button:before {
 width: 10px;
 height: 2px;
 border-style: solid;
 border-width: 0 2px 2px;
}

.button:after {
 width: 0;
 height: 0;
 margin-left: 3px;
 margin-top: -7px;
 border-style: solid;
 border-width: 4px 4px 0px 4px;
 border-color: transparent;
 border-top-color: inherit;
 animation: uploadArrow 1s linear infinite;
 animation-play-state: paused;
 transform: rotate(180deg);
}

.button:hover {
 background-color: rgb(25, 142, 136);
 color: white;
}

.button:hover:before {
 border-color: #cdefbd;
}

.button:hover:after {
 border-top-color: #cdefbd;
 animation-play-state: running;
}


@keyframes downloadArrow {
 0% {
  margin-top: -7px;
  opacity: 1;
 }

 0.001% {
  margin-top: -15px;
  opacity: 0.4;
 }

 50% {
  opacity: 1;
 }

 100% {
  margin-top: 0;
  opacity: 0.4;
 }
}

@keyframes uploadArrow {
  0% {
    margin-top: -7px;
    opacity: 1;
  }

  0.001% {
    margin-top: 0;
    opacity: 0.4;
  }

  50% {
    opacity: 1;
  }

  100% {
    margin-top: -15px;
    opacity: 0.4;
  }
}

</style>