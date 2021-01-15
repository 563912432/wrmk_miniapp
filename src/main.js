// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
  //vuex为true的时候就会写入这些
import store from  './store'
import Axios from 'axios'
import cookies from 'js-cookie'
// import Mint from 'mint-ui';
// Vue.use(Mint);
import {Indicator, Toast} from 'mint-ui'
import 'mint-ui/lib/style.css'
window.host = 'https://www.wenyunjy.com/' //模考接口统一在 http://www.wenyunjy.com/ 上
window.loginHost = '/' //登陆接口地址访问各自地址 /

window.cookies = cookies
window.Promise = Promise
window.loadingTimes = 0
window.axios = Axios
// window.axios.defaults.baseURL = window.host
window.axios.defaults.onUploadProgress = null
window.axios.defaults.onDownloadProgress = null
window.axios.defaults.timeout = 4000
window.axios.defaults.retry = 1 // 重试次数
window.axios.defaults.retryDelay = 1000 // 重试延时
window.axios.defaults.shouldRetry = (error) => true // 重试条件，默认只要是错误都需要重试

window.axios.interceptors.request.use(config => {
  if (store.state.token !== '') {  // 判断是否存在token，如果存在的话，则每个http header都加上token
    config.headers.token = store.state.token;
  }
  //config.headers['Content-Type'] = 'multipart/form-data'
  Indicator.open({
    text: '加载中...',
    spinnerType: 'snake'
  })
  loadingTimes++
  return config
}, error => {
  Indicator.close()
  Toast({
    message: '加载超时',
    iconClass: 'mint-toast-icon mintui mintui-field-warning',
    duration: 1500
  })
  return Promise.reject(error)
})
window.axios.interceptors.response.use(function (response) {
  //关闭
  loadingTimes--
  if(loadingTimes == 0) {
    Indicator.close()
  }
  if (response.data.tokenError === 1) {   //登陆失效
    Indicator.close()
    Toast({
      message: '登陆超时或账号已在别处登陆',
      iconClass: 'mint-toast-icon mintui mintui-field-warning',
      duration: 1500
    })
    let that = this
    setTimeout(function () {
      store.commit('logout')
      router.push({
        path: '/login'
      })
    }, 1500)
    return false
  }
  return response
}, function (error) {
  loadingTimes--
  if(loadingTimes == 0) {
    Indicator.close()
  }
  // 重试条件是否满足
  let config = error.config
  if (!config || !config.retry || !config.shouldRetry || typeof config.shouldRetry != 'function' || !config.shouldRetry(error)) {
    Indicator.close()
    Toast({
      message: '错误：请求未响应',
      iconClass: 'mint-toast-icon mintui mintui-field-warning',
      duration: 1500
    })
    return Promise.reject(error)
  }

  // 设置重置次数，默认为0
  config.__retryCount = config.__retryCount || 0;

  // 判断是否超过了重试次数
  if (config.__retryCount >= config.retry) {
    Indicator.close()
    Toast({
      message: '错误：请求未响应',
      iconClass: 'mint-toast-icon mintui mintui-field-warning',
      duration: 1500
    })
    return Promise.reject(error);
  }
  //重试次数自增
  config.__retryCount += 1;
  //延时处理
  let backoff = new Promise(function (resolve) {
    setTimeout(function () {
      resolve();
    }, config.retryDelay || 1);
  });

  //重新发起axios请求
  return backoff.then(function () {
    return window.axios(config);
  });
})

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  store.commit('setLoginFromSession')
  if (to.meta.needLogin) {
    if (!window.cookies.get(store.state.tokenKey)) {  // sessionStorage.getItem('token')
      router.push({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
