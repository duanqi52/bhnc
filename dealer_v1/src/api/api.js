import axios from 'axios'
import router from '../router';

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

//请求拦截器
axios.interceptors.request.use(
    //给请求头部增加token
    config => {
      if (localStorage.getItem('Authorization')) {
        config.headers.Authorization = localStorage.getItem('Authorization');
      }
      return config;
    }, function (error) {
        return Promise.reject(error)
    }),
    //响应拦截器
    axios.interceptors.response.use(
        config => {
            return config;
        }
    ), error => {
        // 如果登录失败，则清除localStorage返回登录页面重新登录；
        if (error.response.status == 401) {
            localStorage.clear();
            router.currentRoute.path !== '/' &&
                router.replace({
                    path: '/',
                    query: { redirect: router.currentRoute.path },
                })
        }
        return Promise.reject(error)
    }



