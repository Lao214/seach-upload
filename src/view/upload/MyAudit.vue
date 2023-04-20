<template>
  <div class="body">
    <el-divider></el-divider>

    <el-table :data="tableData" border style="width: 100%" :max-height="innerHeight*0.7">
      <el-table-column label="录入编号" width="77">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span style="font-weight: 700;font-size:17px;">{{ scope.row.id }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="录入项目名称" width="197">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <p style="font-weight: 700;font-size:17px;">{{ scope.row.enterName }}</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="录入人员工号" width="147">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
          <p>录入人员姓名: {{ scope.row.enterUserName }}</p>
          <p>录入人员ID: {{ scope.row.enterUserId }}</p>
          <div slot="reference" class="name-wrapper">
            <span style="font-weight: 700;font-size:17px;">{{ scope.row.enterJobNo }}</span>
          </div>
        </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="活动起止时间" width="417">
        <template slot-scope="scope">   
          <div slot="reference" class="name-wrapper">
            <p style="font-weight: 700;font-size:17px;">{{ scope.row.beginTime }}—{{ scope.row.endTime }}</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="录入时间" width="217">
        <template slot-scope="scope">   
          <div slot="reference" class="name-wrapper">
            <p style="font-weight: 700;font-size:17px;">{{ scope.row.enterTime }}</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="审核人员" width="177">
        <template slot-scope="scope">   
          <div slot="reference" class="name-wrapper">
            <p style="font-weight: 700;font-size:17px;">{{ !scope.row.auditUserName ? '暂无' : scope.row.auditUserName }}</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="审核时间" width="207">
        <template slot-scope="scope">   
          <div slot="reference" class="name-wrapper">
            <p style="font-weight: 700;font-size:17px;">{{ !scope.row.auditTime ? '暂无' : scope.row.auditTime }}</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="91">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <p v-if="scope.row.status===0" style="font-weight: 700;font-size:17px;">未审核</p>
            <p v-if="scope.row.status===1" style="font-weight: 700;font-size:17px;">已通过</p>
            <p v-if="scope.row.status===2" style="font-weight: 700;font-size:17px;">已驳回</p>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button class="el-button--goon" size="mini" @click="toAudit(scope.row.id)">审核</el-button>
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

    <el-dialog title="审核录入组" :close-on-click-modal="false" :visible.sync="dialogVisible" width="670px" style="color:aquamarine;">
      <el-table :data="activityForm" :max-height="250" border style="width: 100%">
        <el-table-column prop="certificate" label="获得证书名称" width="180"></el-table-column>
        <el-table-column prop="beRewardedTime" label="获得证书时间" width="180"></el-table-column>
        <el-table-column prop="jobNo" label="参与人员工号" width="180"></el-table-column>
        <el-table-column prop="participantName" label="参与人员姓名"></el-table-column>
      </el-table>

      <div class="block">
        <el-pagination
          :page-size="10"
          layout="prev, pager, next"
          :total="total2">
        </el-pagination>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button class="el-button--goon" @click="dialogVisible = false">取 消</el-button>

        <!-- <a :href="'http://localhost:9701/AU/sysActivity/downloadAuditList?id='+ selectAuditId" style="margin-left: 7px;margin-right: 7px;">
          <el-button class="el-button--goon" type="primary">导 出 查 看</el-button>
        </a> -->

        <a :href="'http://10.130.143.52:9707/AU/sysActivity/downloadAuditList?id='+ selectAuditId" style="margin-left: 7px;margin-right: 7px;">
          <el-button class="el-button--goon" type="primary">导 出 查 看</el-button>
        </a>

        <el-button class="el-button--goon" type="primary" @click="auditEnter(2)">驳 回</el-button>
        <el-button class="el-button--goon" type="primary" @click="auditEnter(1)">通 过</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import activityApi from '@/api/activity'

export default {
  data() {
    return {
      tableData: [],
      formQuery: {
        status: 0
      },
      query: {},
      currentPage: 1,
      pageSize: 10,
      total: 0,
      innerHeight: window.innerHeight,
      activityForm: [],
      total2: 0,
      dialogVisible: false,
      selectAuditId: ''
    }
  },
  created() {
    this.getform(1,10)
  },
  methods: {
    getform(current, limit) {
      activityApi.getFormDataListPage(current, limit, this.formQuery).then(res => {
        if (res.data.code === 200) {
          this.tableData = res.data.data.rows
          this.total = res.data.data.total
        }
      })
    },
    getActivityList(current, limit) {
      activityApi.getAuditList(current, limit, this.query).then(res => {
        if (res.data.code === 200) {
          this.activityForm = res.data.data.rows
          this.total2 = res.data.data.total
          // console.log(this.activityForm)
        }
      })
    },
    handleSizeChange(val) {
      this.getform(1,val)
      this.val = val
    },
    handleCurrentChange(val) {
      this.getform(val,this.val)
    },
    toAudit(id) {
      this.activityForm = []
      this.selectAuditId = id
      this.query['id'] = id
      this.getActivityList(1,10)
      this.dialogVisible = true
    },
    auditEnter(status) {
      activityApi.auditEnter(this.selectAuditId,status).then(res => {
        if(res.data.code === 200) {
          this.$message({
            message: '审核成功',
            type: 'success'
          })
          this.dialogVisible = false
          this.getform(1,10)
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

i:hover {
  color: #0e9a9a;
}

</style>