<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
    
  },
  created() {
    const head = document.getElementsByTagName('head')[0]
    head.addEventListener('DOMNodeInserted', e => {
      // 获取标签名
      const type = e.target.tagName
      // 获取资源路径
      const url = e.target.src
      if (type === 'SCRIPT' && url) { 
        // 创建请求，如果需要低版本浏览器兼容的，请注意
        let xhr = new XMLHttpRequest()
        xhr.open('get', url)
        xhr.onload = () => {
          const text = xhr.responseText
          if (text.indexOf('<') === 0) {
            this.$modal.info({
              title: '检测到有新的版本发布，需要刷新页面以访问最新内容',
              width: 350,
              okText: '确定',
              onOk() {
                location.reload()
              }
            })
          }
        }
        xhr.send()
      }
    })
  }
}
</script>

<style>
  body {
    margin: 0;
  }
</style>
