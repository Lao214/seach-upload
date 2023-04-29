<template>
  <div class="body">
    <div class="head">
      <button class="button">
        <span><i class="el-icon-plus"></i>添加</span>
      </button>
      <button class="button">
        <span><i class="el-icon-plus"></i>批量添加</span>
      </button>
    </div>
    <el-divider></el-divider>
    <div class="table">
      <el-table :data="tableData" style="width: 100%" row-key="id" border lazy :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
        <el-table-column prop="department" label="部门" width="180"></el-table-column>
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="date" label="日期" width="180"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          id: 1,
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          department: '富士康大学(总部)'
        },
        {
          id: 2,
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
          department: '富士康大学(总部)'
        },
        {
          id: 3,
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          department: '富士康大学(总部)',
          children: [
            {
              id: 31,
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄',
              department: 'AI大数据中心'
            }, 
            {
              id: 32,
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄', 
              department: 'AI大数据中心'
            }
          ]
        }, 
        {
          id: 4,
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
          department: '富士康大学(总部)'
        }
      ],
    }
  }
}
</script>

<style scoped>
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

</style>