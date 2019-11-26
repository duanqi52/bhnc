// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'
import axios from 'axios'
import 'babel-polyfill'//支持ie9兼容
import 'es6-promise/auto'//axios 对 promise进行兼容
import http from './api/api';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/reset.css'
import './icons'
import './assets/iconfont/iconfont.css'
import './assets/iconfont/iconfont.js'
import VueQuillEditor  from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import Share from 'vue-social-share';
import 'vue-social-share/dist/client.css';


Vue.use(Share)
Vue.use(VueQuillEditor);
Vue.use(ElementUI)
Vue.prototype.$http = axios


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    store:store,//使用store
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})
