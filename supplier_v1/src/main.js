// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import "babel-polyfill";
import "es6-promise/auto";
import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store/store";
import axios from "axios";
import http from "./api/api";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./assets/css/reset.css";
import "./assets/icon/iconfont.css";
import VueQuillEditor from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import "./assets/iconfont/iconfont.css";
import "./assets/iconfont/iconfont.js";

Vue.use(VueQuillEditor);
Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.prototype.$http = axios;

const token = localStorage.getItem("Authorization");
if (token) {
  Vue.prototype.$http.defaults.headers.common["Authorization"] = token;
}

//只能输入正整数及小数 包含小数点
Vue.directive("enterNumber2", {
  inserted: function(el) {
    el.addEventListener("keypress", function(e) {
      e = e || window.event;
      let charcode = typeof e.charCode == "number" ? e.charCode : e.keyCode;
      let re = /\d/;
      if (
        el.value.indexOf(".") != -1 &&
        el.value.length - el.value.indexOf(".") > 2
      ) {
        e.preventDefault();
      }
      if (charcode == 46) {
        if (el.value.includes(".")) {
          e.preventDefault();
        }

        return;
      } else if (
        !re.test(String.fromCharCode(charcode)) &&
        charcode > 9 &&
        !e.ctrlKey
      ) {
        if (e.preventDefault) {
          e.preventDefault();
        } else {
          e.returnValue = false;
        }
      }
    });
  }
});

// 只能输入正整数
Vue.directive("fixnumber", {
inserted: function (el) {
    el.addEventListener("keypress",function(e){
      e = e || window.event;
      let charcode = typeof e.charCode == 'number' ? e.charCode : e.keyCode;
      let re = /\d/;
      if(!re.test(String.fromCharCode(charcode)) && charcode > 9 && !e.ctrlKey){
          if(e.preventDefault){
              e.preventDefault();
          }else{
              e.returnValue = false;
          }                            
      }
    });
  }


});

/* eslint-disable no-new */
new Vue({
  store: store, //ʹ��store
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});
