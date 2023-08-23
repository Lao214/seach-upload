import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import axios from './utils/request'
import 'element-ui/lib/theme-chalk/index.css';
import store from './store/index'


Vue.prototype.$axios = axios //全局可以使用axios这个库
Vue.config.productionTip = false

Vue.use(ElementUI);

// 监听全局错误
window.onerror = function (message, source, lineno, colno, error) {
  // 判断错误消息中是否包含 "Unexpected token '<'"
  if (message.includes("Unexpected token '<'")) {
      // 强制刷新页面
      ElementUI.Message.warning("检测到新版本，帮您刷新页面")
      window.location.reload();
  }
};


new Vue({
  store,
  axios,
  router,
  render: h => h(App),
}).$mount('#app')
