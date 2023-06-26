<template>
    <div class="body">
      <div class="masthead segment">
        <div class="ui page grid">
          <h1>DataEase课件：</h1><a class="button" style="margin: 0 auto;color: white;" href="/DataEase.rar" download="DataEase.rar" ><span class="button__text">点击下载</span>
            <span class="button__icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35 35" id="bdd05811-e15d-428c-bb53-8661459f9307" data-name="Layer 2" class="svg"><path d="M17.5,22.131a1.249,1.249,0,0,1-1.25-1.25V2.187a1.25,1.25,0,0,1,2.5,0V20.881A1.25,1.25,0,0,1,17.5,22.131Z"></path><path d="M17.5,22.693a3.189,3.189,0,0,1-2.262-.936L8.487,15.006a1.249,1.249,0,0,1,1.767-1.767l6.751,6.751a.7.7,0,0,0,.99,0l6.751-6.751a1.25,1.25,0,0,1,1.768,1.767l-6.752,6.751A3.191,3.191,0,0,1,17.5,22.693Z"></path><path d="M31.436,34.063H3.564A3.318,3.318,0,0,1,.25,30.749V22.011a1.25,1.25,0,0,1,2.5,0v8.738a.815.815,0,0,0,.814.814H31.436a.815.815,0,0,0,.814-.814V22.011a1.25,1.25,0,1,1,2.5,0v8.738A3.318,3.318,0,0,1,31.436,34.063Z"></path></svg>
            </span></a>
          <h1>上课环境：</h1><a class="button" style="margin: 0 auto;color: white;" href="http://10.134.149.213:8778/" target="_blank"><span class="button__text">点击跳转</span>
            <span class="button__icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path fill="currentColor" d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"></path>
              </svg>
            </span>
          </a>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  data() {
    return {

    }
  }
}
</script>

<style scoped>
.copyH {
  margin: 10px;
}

.dialog {
  position: absolute;
  z-index: 7;
  width: 1280px;
  height: 727px;
  left: 50%;
  transform: translateX(-50%);
  top: 10%;
  background: #044a3ade;
  display: flex;
  flex-wrap: wrap;
}

.dialogLevel1 {
  display: flex;
  height: 15%;
  width: 100%;
  align-items: center;
}

.dialogLevel2 {
  display: flex;
  height: 60%;
  width: 100%;
  flex-wrap: wrap;
}

.dialogLevel3 {
  display: flex;
  justify-content: flex-end;
  height: 20%;
  width: 100%;
  padding: 20px;
}

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

i:hover {
  color: #eefffe;
  transform: scale(1.2);
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


.button {
  position: relative;
  width: 150px;
  height: 40px;
  cursor: pointer;
  display: flex;
  align-items: center;
  border: 1px solid #17795E;
  background-color: #209978;
  overflow: hidden;
}

.button, .button__icon, .button__text {
  transition: all 0.3s;
}

.button .button__text {
  transform: translateX(22px);
  color: #fff;
  font-weight: 600;
}

.button .button__icon {
  position: absolute;
  transform: translateX(109px);
  height: 100%;
  width: 39px;
  background-color: #17795E;
  display: flex;
  align-items: center;
  justify-content: center;
}

.button .svg {
  width: 20px;
  fill: #fff;
}

.button:hover {
  background: #17795E;
}

.button:hover .button__text {
  color: transparent;
}

.button:hover .button__icon {
  width: 148px;
  transform: translateX(0);
}

.button:active .button__icon {
  background-color: #146c54;
}

.button:active {
  border: 1px solid #146c54;
}
</style>