// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "babel-polyfill";
import "es6-promise/auto";
import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./stroe/store";
import axios from "axios";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./assets/icon/iconfont.css";
import "./assets/icons/iconfont.css";
import "./assets/css/reset.css";
import "./api/api";
import $ from "jquery";
import VueLazyload from 'vue-lazyload'
import VueMeta from 'vue-meta'
import utils from '../static/js/utils.js'    

import infiniteScroll from "vue-infinite-scroll";

Vue.prototype.utils = utils;
// 图片资源懒加载
Vue.use(VueLazyload);
Vue.use(infiniteScroll);
Vue.use(ElementUI);
Vue.use(VueMeta, {
    // optional pluginOptions
    refreshOnceOnNavigation: true
  })
Vue.config.productionTip = false;
Vue.prototype.$http = axios;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  store: store,
  router,
  components: { App },
  template: "<App/>",
});
