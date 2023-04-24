<template>
  <div class="body">
    <div class="masthead segment">
      <div class="ui page grid">
        <div class="column">
          <div class="introduction">
            <h1 class="ui inverted header">
              <span class="text">Magic Tags</span>
            </h1>
            <div class="headers">
              <div style="width: 100%;">
                <button class="btn" style="margin: 4px;">
                  Add Tag
                </button>
                <button class="btn" style="margin: 4px;">
                  import Tags
                </button>
                <button class="btn" style="margin: 4px;">
                  download template
                </button>
              </div>
              <form class="search" action="">
                <input type="search" placeholder="Search here..." required>
                <button type="submit">Search Type</button>
              </form>
              <form class="search" action="">
                <input type="search" placeholder="Search here..." required>
                <button type="submit">Search Tags</button>
              </form>   
            </div>
            <div class="midbody">
              <div class="keywordbody">
                <div v-for="(item,index) in tags" :key="index" class="card">
                  <h1 style="margin:4px;color:green;">{{item.keywordCn}}</h1>
                  <h3 style="margin:4px;color:green;">{{item.keywordEn}}</h3>
                  <button class="btn2" style="margin-right: 10px;"><i class="el-icon-copy-document"></i></button>
                  <button class="btn2"><i class="el-icon-plus"></i></button>
                </div>
              </div>
              <div class="typebody">
                <el-button v-for="(item,index) in types" :key="index" class="el--button--echoes" style="margin: 7px;" >{{item.keywordCn}}</el-button>
              </div>
              <div class="copybody">
                <div class="copyH">
                  <button class="btn2" style="margin-right: 10px;"><i class="el-icon-delete"></i></button>
                  <button class="btn2"><i class="el-icon-copy-document"></i></button>
                </div>
                <div class="copyText">

                </div>
                <div class="copyBody">

                </div>
              </div>
            </div>
            <div class="ui hidden divider"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import tagApi from '@/api/tags'

export default {
  data() {
    return {
      tags: [],
      types: []
    }
  },
  created() {
    this.findAll()
  },
  methods: {
    findAll() {
      tagApi.findAll().then(res =>{
        if(res.data.code === 200) {
          // console.log(res.data.data)
          this.tags = res.data.data.tags
          this.types = res.data.data.type
        }
      })
    }
  }
}
</script>

<style scoped>

.body {
  position: relative;
  overflow: hidden;
  height: 100vh;
  background-size: cover;
  text-align: center;
  padding: 0em;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 0px;
  border-bottom: none;
  background-color: #00B5AD;
  background-image: -webkit-radial-gradient(farthest-corner, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.95));
  background-image: radial-gradient(farthest-corner, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.95));
}

.text {
  box-sizing: border-box;
  color: rgb(255, 255, 255);
  display: inline;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 30px;
  font-weight: normal;
  height: auto;
  text-align: center;
  text-shadow: rgba(0, 0, 0, 0.2) 0px 0px 10px;
  text-transform: none;
  width: auto;
  z-index: 10000;
}

.text a {
  color: aqua;
  font-weight: bold;
}

.body .grid {
  margin: 0em;
  padding: 1rem 0em;
}

.following.bar,
.body {
  -webkit-transform-style: preserve-3d;
  -moz-transform-style: preserve-3d;
  -o-transform-style: preserve-3d;
  -ms-transform-style: preserve-3d;
  transform-style: preserve-3d;
  -webkit-transform: translate3d(0, 0, 0);
  -moz-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
  -ms-transition: background-color 3s ease-in-out 2s;
  -moz-transition: background-color 3s ease-in-out 2s;
  -webkit-transition: background-color 3s ease-in-out 2s;
  transition: background-color 3s ease-in-out 2s;
  -webkit-perspective: 1000px;
  -moz-perspective: 1000px;
  -o-perspective: 1000px;
  -ms-perspective: 1000px;
  perspective: 1000px;
}

.following.bar iframe.github {
  margin-top: 0px;
}

.pushed .body,
.pushed .following.bar {
  -webkit-transform: translate3d(0, 0, 0);
  -moz-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}

.colored.following.bar,
.body.colored {
  -webkit-animation-name: colors;
  -moz-animation-name: colors;
  -o-animation-name: colors;
  animation-name: colors;
  -webkit-animation-delay: 0s;
  -moz-animation-delay: 0s;
  -ms-animation-delay: 0s;
  -o-animation-delay: 0s;
  animation-delay: 0s;
  -webkit-animation-duration: 120s;
  -moz-animation-duration: 120s;
  -ms-animation-duration: 120s;
  -o-animation-duration: 120s;
  animation-duration: 120s;
  -webkit-animation-fill-mode: both;
  -moz-animation-fill-mode: both;
  -ms-animation-fill-mode: both;
  -o-animation-fill-mode: both;
  animation-fill-mode: both;
  animation-timing-function: linear;
  -webkit-animation-timing-function: linear;
  -webkit-animation-iteration-count: infinite;
  -moz-animation-iteration-count: infinite;
  -ms-animation-iteration-count: infinite;
  -o-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
}

.body:after {
  position: absolute;
  z-index: -1;
  width: 135%;
  height: 135%;
  top: 18%;
  left: 0px;
  content: '';
  background: url(https://semantic-ui.com/images/ui.png);
  -moz-transform-origin: 50% 50%;
  -o-transform-origin: 50% 50%;
  -ms-transform-origin: 50% 50%;
  transform-origin: 50% 50%;
  -webkit-transform-style: preserve-3d;
  -moz-transform-style: preserve-3d;
  -o-transform-style: preserve-3d;
  -ms-transform-style: preserve-3d;
  transform-style: preserve-3d;
  -webkit-animation-name: splash;
  -moz-animation-name: splash;
  -o-animation-name: splash;
  animation-name: splash;
  -ms-transition: opacity 3s ease-in-out, transform 5s ease-in-out;
  -webkit-transition: opacity 3s ease-in-out, transform 5s ease-in-out;
  -moz-transition: opacity 3s ease-in-out, transform 5s ease-in-out;
  transition: opacity 3s ease-in-out, transform 5s ease-in-out;
  opacity: 0.06;
  -webkit-animation-duration: 15s;
  -moz-animation-duration: 15s;
  -ms-animation-duration: 15s;
  -o-animation-duration: 15s;
  animation-duration: 15s;
  -webkit-animation-fill-mode: both;
  -moz-animation-fill-mode: both;
  -ms-animation-fill-mode: both;
  -o-animation-fill-mode: both;
  animation-fill-mode: both;
  animation-timing-function: linear;
  -webkit-animation-timing-function: linear;
  -webkit-animation-iteration-count: infinite;
  -moz-animation-iteration-count: infinite;
  -ms-animation-iteration-count: infinite;
  -o-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
  -webkit-transform: rotateX(50deg) rotateZ(0deg) rotateY(0deg) translateY(-14%) translateX(-14%) translateZ(370px);
  -moz-transform: rotateX(50deg) rotateZ(0deg) rotateY(0deg) translateY(-14%) translateX(-14%) translateZ(370px);
  transform: rotateX(50deg) rotateZ(0deg) rotateY(0deg) translateY(-14%) translateX(-14%) translateZ(370px);
}

.fixed.following.bar {
  background-image: none;
}

.fixed.following.bar {
  position: fixed;
  top: 0px;
  padding: 1em 0em;
  background-color: #FFFFFF;
}

.fixed.light.following.bar {
  background-color: #FFFFFF;
  border-bottom: 1px solid #DDDDDD;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.04);
}

@keyframes splash {
  0% {
    background-position: 0% 0%;
  }
  100% {
    background-position: 0% -475px;
  }
}

@-moz-keyframes splash {
  0% {
    background-position: 0% 0%;
  }
  100% {
    background-position: 0% -475px;
  }
}

@-webkit-keyframes splash {
  0% {
    background-position: 0% 0%;
  }
  100% {
    background-position: 0% -475px;
  }
}

@-ms-keyframes splash {
  0% {
    background-position: 0% 0%;
  }
  100% {
    background-position: 0% -475px;
  }
}

@-o-keyframes splash {
  0% {
    background-position: 0% 0%;
  }
  100% {
    background-position: 0% -475px;
  }
}

/* 上面是背景的css 不要去动它 */

.btn {
  padding: 10px 20px;
  text-transform: uppercase;
  border-radius: 8px;
  font-size: 17px;
  font-weight: 500;
  color: #ffffff80;
  text-shadow: none;
  background: transparent;
  box-shadow: transparent;
  border: 1px solid #ffffff80;
  transition: 0.5s ease;
  user-select: none;
  cursor: pointer;
}

.btn:hover {
  color: #ffffff;
  background: #1dbe99;
  border: 1px solid #1dbe99;
  text-shadow: 0 0 5px #e3e3e3,
              0 0 10px #e3e3e3,
              0 0 20px #e3e3e3;
  box-shadow: 0 0 5px #1dbe99,
              0 0 20px #1dbe99,
              0 0 50px #1dbe99,
              0 0 100px #1dbe99;
}

.headers {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.midbody {
  display: flex;
  justify-content: center;
}
.keywordbody {
 width: 52%;
 margin: 0 10px;
 border-radius: 10px;
 background: #283237;
 height: auto;
 display: flex;
}
/* 卡片 */
.card {
 width: 190px;
 height: auto;
 min-height: 174px;
 margin: 4px;
 background-color: #011522;
 border-radius: 8px;
 z-index: 1;
}

.typebody {
  width: 20%;
  border-radius: 10px;
  margin: 0 10px;
  background: #283237;
  height: auto;
  display: flex;
}
.copybody {
 width: 15%;
 margin: 0 10px;
 border-radius: 10px;
 background: #283237;
 height: auto;
}
/* 按钮2 */
.btn2 {
 padding: 0.2em 0.75em;
 background-color: transparent;
 border-radius: 6px;
 border: .3px solid #00A97F;
 transition: .5s;
 position: relative;
 overflow: hidden;
 cursor: pointer;
 z-index: 1;
 font-weight: 300;
 font-size: 17px;
 font-family: 'Roboto', 'Segoe UI', sans-serif;
 text-transform: uppercase;
 color: #00A97F;
}

.btn:active {
 filter: brightness(.7);
 transform: scale(.98);
}

/* 搜索框 */
.search {
  width: 500px;
  height: 40px;
  margin: 10px 20px;
  background: #ffffff80;
  background: rgba(0, 0, 0, 0.323);
  border-radius: 3px;
  border: 1px solid #ffffff80;
}
.search input {
  width: 370px;
  padding: 10px 5px;
  float: left;
  color: #ffffff80;
  border: 0;
  background: transparent;
  border-radius: 3px 0 0 3px;
}
.search input:focus {
  outline: 0;
  background: transparent;
}
.search button {
  position: relative;
  float: right;
  border: 0;
  padding: 0;
  cursor: pointer;
  height: 40px;
  width: 120px;
  color: #ffffff80;
  background: transparent;
  border-left: 1px solid #ffffff80;
  border-radius: 0 3px 3px 0;
}
.search button:hover {
  background: #1dbe99;
  color: #444;
}
.search button:active {
  box-shadow: 0px 0px 12px 0px #ffffff80;
}
.search button:focus {
  outline: 0;
}


/* 按钮风格重定义 */
.el--button--echoes {
  color: green;
  background-color: #011522;
  border-color: #011522;
  height: 34px;
  line-height: 34px;
  padding: 0 20px;
}
.el--button--echoes:focus, .el--button--echoes:hover {
  color: #00d427;
  background-color: #1a5d7c;
  border-color: #1a5d7c;
  height: 34px;
  line-height: 34px;
  padding: 0 20px;
}
.el--button--echoes:active {
  color:  #07bc5e;
  background-color: #066794;
  border-color: #066794;
  height: 34px;
  line-height: 34px;
  padding: 0 20px;
}
/* 按钮风格重定义 */
</style>