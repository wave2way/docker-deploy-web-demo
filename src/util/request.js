import axios from 'axios'
import { message } from 'antd'

axios.defaults.timeout = 3000 * 10

// 发送请求之前所做的操作
axios.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    return Promise.reject(error);
})

// 请求接收之后所做的操作
axios.interceptors.response.use(function (response) {
    if(response.data && response.data.code > 0) {
        message.info(response.data.message && response.data.message.length > 0 ? response.data.message : "未知错误")
        return Promise.reject()
    }
    message.info(response.data.message)
    return response.data;
}, function (error) {
    if(error.response && error.response.status === 401) {
        message.info("请登录")
    } else if (error.response && error.response.status === 500) {
        let data = error.response.data ? error.response.data : null
        message.error(data === null ? "未知错误" : data.message)
    } else {
        message.error("请联系管理员")
    }
    return Promise.reject(error);
})

export default axios