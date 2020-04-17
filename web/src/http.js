import axios from 'axios'
import Vue from 'vue'
import router from "./router";


const http=axios.create({
    baseURL:process.env.VUE_APP_API_URL||'/web/api'
    // baseURI:'http://localhost:3000/web/api'
})

//拦截器
http.interceptors.response.use(res => {
    return res
},err => {
    if (err.response.data.message) {
        Vue.prototype.$message({
            type: 'error',
            message: err.response.data.message
        })

        if (err.response.status === 401) {
            router.push('/login')
        }
    }
    return Promise.reject(err)
})

//加请求头
http.interceptors.request.use(function (config) {
    if (sessionStorage.token){
        config.headers.Authorization = 'Bearer ' + sessionStorage.token
    }
    return config
},function (error) {
    return Promise.reject(error)
})

export default http
