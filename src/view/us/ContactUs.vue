<template>
  <div>
    <div class="container">
      <div class="row">
        <h1>{{ contactUs }}</h1>
      </div>
      <div class="row">
        <h4 style="text-align:center"> {{ text1 }} <br>{{ text2 }}</h4>
      </div>
      <div class="row input-container">
          <!-- <div class="col-xs-12">
            <div class="styled-input wide">
              <input type="text" required />
              <label>Name</label> 
            </div>
          </div> -->
          <div class="col-md-6 col-sm-12">
            <div class="styled-input">
              <input type="text" required v-model="nameValue" />
              <label>{{ name }}</label> 
            </div>
          </div>
          <div class="col-md-6 col-sm-12">
            <!-- <el-tooltip content="不要修改" placement="top"> -->
              <div class="styled-input" style="float:right;">
                <input type="text" required v-model="jobnoValue" />
                <label>{{ jobno }}</label> 
              </div>
            <!-- </el-tooltip> -->
          </div>
          <div class="col-xs-12">
            <div class="styled-input wide">
              <textarea required v-model="messageValue"></textarea>
              <label>{{ message }}</label>
            </div>
          </div>
          <div class="col-xs-12">
            <div class="btn-lrg submit-btn" @click="summit">{{ send }}</div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import userApi from '@/api/user'
import messageApi from '@/api/message'

export default {
  data() {
    return {
      // What do you need us to improve.
      // We'd love to hear from you!
      contactUs: '联系我们',
      text1: '请问您有什么需要我们改进的地方',
      text2: '我们很乐意听取您的意见！',
      send: '发送',
      name: '姓名',
      jobno: '工号',
      message: '内容',
      nameValue: '',
      jobnoValue: '',
      messageValue: ''
    }
  },
  created() {
    userApi.getUserInfo().then(res => {
      if(res.data.code === 200) {
        // console.log(res.data.data.userInfo)
        this.nameValue = res.data.data.userInfo.realName
        this.jobnoValue = res.data.data.userInfo.username
      }
    })
  },
  methods: {
    summit() {
      const form = {
        'message': this.messageValue,
        'jobNo' : this.jobnoValue,
        'name' : this.nameValue
      }
      messageApi.summit(form).then(res => {
        if(res.data.code === 200) {
          this.$message({
            message: '发送成功',
            type: 'success'
          })
        }
      })
    }
  }
}
</script>

<style scoped>
body {
    background-color: #444442;
    padding-top: 85px;
}

h1 {
    font-family: 'Poppins', sans-serif, 'arial';
    font-weight: 600;
    font-size: 61px;
    margin: 21px;
    color: lightseagreen;
    text-align: center;
}

h4 {
    font-family: 'Roboto', sans-serif, 'arial';
    font-weight: 400;
    font-size: 20px;
    color: #9b9b9b;
    line-height: 1.5;
}

/* ///// inputs /////*/

input:focus ~ label, textarea:focus ~ label, input:valid ~ label, textarea:valid ~ label {
    font-size: 0.75em;
    color: #999;
    top: -5px;
    -webkit-transition: all 0.225s ease;
    transition: all 0.225s ease;
}

.styled-input {
    float: left;
    width: 293px;
    margin: 1rem 0;
    position: relative;
    border-radius: 4px;
}

@media only screen and (max-width: 768px){
    .styled-input {
        width:100%;
    }
}

.styled-input label {
    color: #999;
    padding: 1.3rem 30px 1rem 30px;
    position: absolute;
    top: 10px;
    left: 0;
    -webkit-transition: all 0.25s ease;
    transition: all 0.25s ease;
    pointer-events: none;
}

.styled-input.wide { 
    width: 650px;
    max-width: 100%;
}

input,
textarea {
    padding: 30px;
    border: 0;
    width: 100%;
    font-size: 1rem;
    background-color: #cfcfcf;
    color: lightseagreen;
    border-radius: 4px;
}

input:focus,
textarea:focus { outline: 0; }

input:focus ~ span,
textarea:focus ~ span {
    width: 100%;
    -webkit-transition: all 0.075s ease;
    transition: all 0.075s ease;
}

textarea {
    width: 100%;
    min-height: 15em;
}

.input-container {
    width: 650px;
    max-width: 100%;
    margin: 20px auto 25px auto;
}

.submit-btn {
    float: right;
    padding: 7px 35px;
    border-radius: 60px;
    display: inline-block;
    background-color: lightseagreen;
    color: white;
    font-size: 18px;
    cursor: pointer;
    box-shadow: 0 2px 5px 0 rgba(0,0,0,0.06),
              0 2px 10px 0 rgba(0,0,0,0.07);
    -webkit-transition: all 300ms ease;
    transition: all 300ms ease;
}

.submit-btn:hover {
    transform: translateY(1px);
    box-shadow: 0 1px 1px 0 rgba(0,0,0,0.10),
              0 1px 1px 0 rgba(0,0,0,0.09);
}

@media (max-width: 768px) {
    .submit-btn {
        width:100%;
        float: none;
        text-align:center;
    }
}

input[type=checkbox] + label {
  color: #ccc;
  font-style: italic;
} 

input[type=checkbox]:checked + label {
  color: #f00;
  font-style: normal;
}
</style>