import axios from "axios";//引用axios
import router from "../router/index";//如果是没有登录权限的，需要跳回登录页面
import Element from "element-ui";//需要弹窗组件

//这是调用数据接口
// axios.defaults.baseURL = "http://35.194.242.66:8092"



//创建对象
const request = axios.create({
	timeout: 6000,// 请求超时时间
	headers: {
		'Content-Type': "application/json; charset=utf-8"//我们返回的是一个json数据
	},
	// baseURL:'https://okr1-api.foxconnedu.com'//api的url
	// baseURL: 'http://localhost:9707' //api的url
	baseURL: 'http://10.134.149.211:9707' //api的url
})

// 添加请求拦截器
// http request 拦截器（所有发送的请求都要从这儿过一次），通过这个，我们就可以把token传到后台，
request.interceptors.request.use(
	config => {
	// 在发送请求之前做些什么
  // 在请求头都带上jwt
		config.headers['satoken'] = localStorage.getItem("tokenValue")
		return config
}) 

// 添加响应拦截器
// http response 拦截器（所有接收到的请求都要从这儿过一次
request.interceptors.response.use(
	response => {

		console.log("response ->" + response)
		// 2xx 范围内的状态码都会触发该函数。
  	// 对响应数据做点什么
		let res = response.data

		if (res.code === 200) {
			return response
		} else if(res.code === 201) {
			Element.Message.error(!res.msg ? '系统异常' : res.msg)
			return
		} else if(res.code === 402) {
			Element.Message.error(!res.msg ? '系统异常' : res.msg)
			router.push("/login")
			return
		}
		 else {
			Element.Message.error(!res.msg ? '系统异常' : res.msg)
			return Promise.reject(response.data.msg)
		}
	},
	// 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
	error => {
		if(!localStorage.getItem('tokenValue')) {
			Element.Message.error('系统异常,您可能尚未登录过')
			router.push("/login")
			return
		}
		console.log(error)

		if (error.response.data) {
			Element.Message.error(error.response.data.msg)
			error.massage = error.response.data.msg
		}
    //401代表权限不够
		if (error.response.status === 401) {
			Element.Message.error('权限不足')
			router.push("/login")
		}
    //错误弹窗
		Element.Message.error(error.massage, {duration: 3000})
		return Promise.reject(error)
	}
)

export default request
