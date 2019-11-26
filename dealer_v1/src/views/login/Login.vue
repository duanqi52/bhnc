<template>
  <div id="bhncLogin">
    <div
      id="login"
      v-loading="loading"
      element-loading-text="登陆中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <div class="bg_box">
        <a href="http://182.61.148.122:30/" class="toIndex"></a>
        <div class="borderLeft"></div>
        <div class="form-box">
          <el-form
            ref="loginForm"
            :model="loginForm"
            auto-complete="on"
            :rules="loginRules"
            label-position="middle"
            label-width="left"
          >
            <!-- <div class="title-container">
                        <img :src="logoImg" alt="LOGO" class="logo">
            </div>-->
            <el-form-item prop="username">
              <span class="svg-container">
                <svg-icon icon-class="user" />
              </span>
              <el-input
                v-model="loginForm.username"
                name="username"
                type="text"
                tabindex="1"
                auto-complete="off"
                placeholder="请输入手机号"
              />
            </el-form-item>

            <el-form-item prop="password">
              <span class="svg-container">
                <svg-icon icon-class="password" />
              </span>
              <el-input
                v-model="loginForm.password"
                :type="passwordType"
                ref="password"
                name="password"
                tabindex="2"
                auto-complete="on"
                placeholder="请输入6位密码"
                @keyup.enter.native="handleLogin"
              />
              <span class="show-pwd" @click="showPwd">
                <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
              </span>
            </el-form-item>
            <div class="remember-password">
              <div class="remember">
                <input type="checkbox" v-model="loginForm.rememberPassword" />
                <span>记住密码</span>
              </div>
              <div class="forget-password">
                <a href="javascript:" @click="forgetPaaaword()">忘记密码?</a>
              </div>
            </div>

            <el-button
              :loading="loading"
              type="primary"
              style="width:100%;margin-bottom:30px;"
              @click.native.prevent="handleLogin"
            >登陆</el-button>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import url from "@/serverAPI.config.js";
import { validUserEmail, isPassword } from "@/utils/validate";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      logoImg: require("../../../static/img/logo.jpg"),
      loginForm: {
        username: "",
        password: "",
        rememberPassword: true
      },
      userToken: "",
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validUserEmail }
        ],
        password: [{ required: true, trigger: "blur", validator: isPassword }]
      },
      loading: false,
      passwordType: "password"
    };
  },
  updated() {
    if (this.$route.query.username) {
      this.loginForm.username = this.$route.query.username;
      if (this.$route.query.password) {
        this.loginForm.password = this.$route.query.password;
        this.handleLogin();
      }
    }
  },
  methods: {
    ...mapMutations(["changeLogin"]), // 从vuex里引入方法
    //显示密码
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    //登录
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          //检验成功才把账号密码写入localStorage
          if (this.loginForm.rememberPassword == true) {
            this.$http.post(url.toLogin+"/0", this.loginForm).then(res => {
              if (res.data.code == 20000) {
                if (res.data.data.roles.indexOf("dealer") == -1) {
                  alert("此账号不是经销商");
                  this.loading = false;
                  return;
                }
                
                if (res.data.data.type && res.data.data.type != "0") {
                  alert("此子账号没有经销商权限");
                  this.loading = false;
                  return;
                }
                if (res.data.data.status.indexOf("0") != -1) {
                  localStorage.status = res.data.data.status;
                }
                this.setlocalStorage(
                  res.data.data.username,
                  this.loginForm.password
                );
                if (res.data.data.type) {
                  localStorage.roles = "dealer";
                } else {
                  localStorage.roles = res.data.data.roles;
                }

                localStorage.expireTime = res.data.data.expireTime;
                localStorage.ID = res.data.data.id;
                if (res.data.data.urls) {
                  localStorage.urls = res.data.data.urls;
                }

                if (res.data.data.sonName) {
                  localStorage.sonName = res.data.data.sonName;
                }

                if (res.data.data.sonUsername) {
                  localStorage.sonUsername = res.data.data.sonUsername;
                }

                if (res.data.data.job) {
                  localStorage.job = res.data.data.job;
                }

                if (res.data.data.sonId) {
                  localStorage.sonId = res.data.data.sonId;
                }
                this.userToken = "Bearer " + res.data.data.token; // token
                this.changeLogin({ Authorization: this.userToken }); // 存取token到vuex，
                this.loading = true;
                setTimeout(() => {
                  this.$router.push("/main");
                }, 500);
              } else {
                alert(res.data.message);
                this.loading = false;
              }
            });
          } else {
            localStorage.clear();
          }
        } else {
          this.loading = false;
          console.log("error");
          return false;
        }
      });
    },
    //往localStorae里存入账号 密码
    setlocalStorage(name, password) {
      localStorage.siteName = name;
      localStorage.sitePassword = password;
    },
    //把localStroage的账号密码赋值给输入框
    getlocalStorage() {
      this.loginForm.username = localStorage.getItem("siteName");
      this.loginForm.password = localStorage.getItem("sitePassword");
    },
    //忘记密码
    forgetPaaaword() {
      this.setlocalStorage("", "");
      this.$router.push("/forget");
    }
  },
  //当页面刷新时重新获取local里的账号密码
  mounted() {
    this.getlocalStorage();
  }
};
</script>

<style lang="scss" scope>
$bodyBackground: #2d3a4b;
#bhncLogin {
  #login {
    position: fixed;
    top: 0px;
    width: 100%;
    min-height: 100%;
    background: $bodyBackground;
    // display: flex;
    // justify-content: center;
    // align-items: center;
  }
  .bg_box {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 736px;
    height: 367px;
    background-image: url("../../../static/img/login@2x.png");
    background-repeat: no-repeat;
  }
  .toIndex {
    position: absolute;
    top: 32%;
    left: 12%;
    width: 140px;
    height: 160px;
  }
  .borderLeft {
    position: absolute;
    left: 40%;
    top: 14%;
    width: 1px;
    height: 276px;
    border: 1px dashed rgba(255, 255, 255, 1);
  }
  .form-box {
    position: absolute;
    left: 67%;
    top: 55%;
    transform: translate(-50%, -50%);
    width: 300px;
    margin: auto;
    .title-container {
      text-align: center;
      padding: 20px 0;
      .logo {
        width: 200px;
        border-radius: 10px;
      }
      h3 {
        font-size: 26px;
        padding: 6px 5px 6px 15px;
        vertical-align: middle;
        -webkit-text-fill-color: transparent;
        -webkit-text-stroke: 1px blueviolet;
      }
    }
    .el-form-item {
      background: rgba(0, 0, 0, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.1);
      span {
        color: #889aa4;
        padding: 6px 5px 6px 15px;
        vertical-align: middle;
        width: 30px;
        display: inline-block;
      }
      .el-input {
        width: 70%;
      }
      .el-input__inner {
        background: transparent;
        color: #fff;
        font-size: 14px;
        border: none;
        padding: 0;
      }
    }
    .remember-password {
      margin-bottom: 20px;
      display: flex;
      justify-content: space-between;
      span {
        color: #fff;
        font-size: 12px;
      }
      a {
        color: #fff;
        font-size: 12px;
      }
    }
  }

  .form-box .el-form-item .el-input {
    width: 60%;
  }
}
</style>


<style lang="scss">
#bhncLogin {
  .has-gutter .el-table thead {
    font-size: 14px;
    font-family: MicrosoftYaHei-Bold;
    font-weight: bold;
    color: rgba(102, 102, 102, 1);
  }
  tbody {
    font-size: 12px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
  }
}
</style>

