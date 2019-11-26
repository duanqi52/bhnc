<template>
  <div class="register" style="background:#f8f8f8">
    <!-- 遮罩层弹窗 -->
    <div class="popup" ref="mask" v-show="isShow">
      <div class="popup_view">
        <div>
          <span style="display: inline-block;">注册协议</span>
          <i class="iconfont icon-guanbi2fill" id="fork_cha" @click="cancel()"></i>
        </div>
        <el-divider></el-divider>
        <div style="margin-top: 30px;line-height: 25px;">
          【 审慎阅读 】您在申请注册流程中点击同意前，应当认真阅读以下协议。请您务必审慎阅读、充分理解协
议中相关条款内容，其中包括：
        </div>
        <ul style="margin-top: 20px;">
          <li style="margin-top: 10px;">1、与您约定免除或限制责任的条款；</li>
          <li style="margin-top: 10px;">2、与您约定法律适用和管辖的条款；</li>
          <li style="margin-top: 10px;">3、其他以粗体下划线标识的重要条款。</li>
        </ul>
        <p style="margin-top: 40px;">如您对协议有任何疑问，可向平台客服咨询。</p>
        <p style="margin-top: 10px;line-height: 25px;">【 特别提示 】当您按照注册页面提示填写信息、阅读并同意协议且完成全部注册程序后，即表示您已充分
阅读、理解并接受协议的全部内容。</p>
        <p style="margin-top: 40px;">阅读协议的过程中，如果您不同意相关协议或其中任何条款约定，您应立即停止注册程序。</p>
        <ul style="margin-top: 20px;color:rgba(210,29,39,1);cursor: pointer;">
          <router-link to="/rules" style="color:rgba(210,29,39,1);">
          <li style="margin-top: 10px;">《 笔海弄潮总则 》</li>
          </router-link>
          <router-link to="/agreementRegister" style="color:rgba(210,29,39,1);">
            <li style="margin-top: 10px;">《 笔海弄潮注册协议 》</li>
          </router-link>
          <router-link to="/privacy" style="color:rgba(210,29,39,1);">
          <li style="margin-top: 10px;">《 笔海弄潮隐私声明 》</li>
          </router-link>
          <router-link to="/service" style="color:rgba(210,29,39,1);">
          <li style="margin-top: 10px;">《 笔海弄潮服务条款 》</li>
          </router-link>
        </ul>
        <div style="text-align: center;">
          <button @click="consent()">同意并继续</button>
        </div>
      </div>
    </div>
    <!-- 引用头部公共组件 -->
    <Headers></Headers>
    <!-- 标题 -->
    <div class="register_form">
      <!-- 表单 -->
      <div class="w register_form_content">
        <div class="registerLogo">帐号信息</div>
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="140px"
          class="demo-ruleForm selfStyle"
        >
          <el-form-item label="登录帐号:" prop="username">
            <el-input v-model="ruleForm.username" autocomplete="off" placeholder="请输入登录帐号"></el-input>
            <p
              style="font-size:12px;line-height:1.2;color:#999;padding-top:7px;"
            >6~18个字符，可使用字母、数字、下划线，需以字母开头</p>
          </el-form-item>
          <!-- <el-form-item label="用户昵称:" prop="nikename">
            <el-input v-model="ruleForm.nikename" autocomplete="off" placeholder="请输入昵称"></el-input>
            <p style="font-size:12px;line-height:1.2;color:#b5b5b5;">6~18个字符，可使用中文、英文、数字</p>
          </el-form-item>-->
          <el-form-item label="手机号码:" prop="phone">
            <el-input v-model="ruleForm.phone" autocomplete="off" placeholder="请输入手机号码进行注册"></el-input>
          </el-form-item>

          <el-form-item label="验证码:" prop="num" style="width:415px;position:relative">
            <el-input v-model="ruleForm.num" placeholder="请输入验证码"></el-input>
            <button
              type="button"
              :disabled="disabled"
              @click="handleCheckNum()"
              class="checkbtn"
            >{{checkVal}}</button>
          </el-form-item>
          <el-form-item label="登录密码:" prop="pass">
            <el-input
              type="password"
              v-model="ruleForm.pass"
              autocomplete="new-password"
              placeholder="请输入登录密码"
              id="password"
            ></el-input>
            <p
              style="font-size:12px;line-height:1.2;color:#999;padding-top:7px;"
            >6~18个字符，可使用字母、数字、需以字母开头、不包含特殊字符</p>

            <div class="safeBox" v-if="ruleForm.pass && safeStrIndex != -1">
              <ul class="safeUl clearfix">
                <li class="safeLi">
                  <i :style="safeStrIndex >= 0?'background:#00D55E':''"></i>
                </li>
                <li class="safeLi">
                  <i :style="safeStrIndex >= 1?'background:#00D55E':''"></i>
                </li>
                <li class="safeLi" style="margin-right:14px;">
                  <i :style="safeStrIndex >= 2?'background:#00D55E':''"></i>
                </li>
                <li>安全性:{{safeStr[safeStrIndex]}}</li>
              </ul>
            </div>
          </el-form-item>
          <el-form-item label="确认密码:" prop="checkPass">
            <el-input type="password" v-model="ruleForm.checkPass" placeholder="请再次输入登录密码"></el-input>
          </el-form-item>
          <!-- <div style="text-align: center;">
            <input id="checkbox" type="checkbox" v-model="isOk" />
            <label for="checkbox">
              阅读并同意
              <router-link to="/agreementRegister">
                <a style="color:#d21d27;text-decoration: none;">《笔海弄潮用户协议》</a>
              </router-link>
            </label>
          </div> -->
          <el-form-item style="margin-top: 30px;">
            <input type="button" @click="resetForm('ruleForm')" class="form_cancle" value="取消" />
            <!-- <el-button type="primary" @click="submitForm('ruleForm')" class="registerBtn">注册
            </el-button>-->
            <input type="button" @click="submitForm('ruleForm')" class="registerBtn" value="注册" />
          </el-form-item>
        </el-form>
      </div>
    </div>
    <Footers></Footers>
  </div>
</template>

<script>
import url from "@/serverAPI.config.js";
import Headers from "@/components/headers";
import Footers from "@/components/footers";

export default {
  metaInfo: {
    title: "笔海弄潮——制笔行业企业上云综合服务平台", // set a title
    meta: [
      {
        // set meta
        name: "keyWords",
        content:
          "制笔行业、制笔厂家、礼品笔、学生笔、中性笔、圆珠笔、钢笔、墨水、笔芯、制笔机械及零部件；"
      },
      {
        name: "description",
        content:
          "笔海弄潮，连接制笔行业采购商和供应商的智慧化数字平台，帮制笔行业采购商寻找各种笔类产品，帮制笔行业厂家寻找各类采购商，为厂商企业管理提供企业上云的管理服务。"
      }
    ]
  },
  data() {
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号码不能为空"));
      }
      setTimeout(() => {
        if (!/^\d{11}$/.test(value)) {
          callback(new Error("请输入正确的手机号码"));
        } else {
          callback();
        }
      }, 1000);
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!/^[a-zA-z]\w{5,17}$/.test(value)) {
        callback(new Error("请输入正确的登录密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var validateCode = (rule, value, callback) => {
      if (!value) {
        callback(new Error("验证码不能为空"));
      } else {
        callback();
      }
    };
    // 确认用户名
    var checkUserName = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入登录帐号"));
      } else if (!/^[a-zA-z_]\w{5,17}$/.test(value)) {
        callback(new Error("请输入正确的登录帐号"));
      } else {
        callback();
      }
    };
    // 确认昵称
    var checkNikeName = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入昵称"));
      } else if (!/^[\u4E00-\u9FA5A-Za-z0-9]{0,17}$/.test(value)) {
        callback(new Error("请输入正确的昵称"));
      } else {
        callback();
      }
    };
    return {
      isShow: true,
      ruleForm: {
        pass: "",
        checkPass: "",
        num: "",
        phone: "",
        username: "",
        nikename: ""
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        phone: [{ validator: checkPhone, trigger: "blur" }],
        num: [{ validator: validateCode, trigger: "blur" }],
        username: [{ validator: checkUserName, trigger: "blur" }],
        nikename: [{ validator: checkNikeName, trigger: "blur" }]
      },
      disabled: false,
      checkVal: "发送验证码",
      isOk: false,
      safeStr: ["低", "中", "高"],
      safeStrIndex: -1
    };
  },
  computed: {},
  components: {
    Headers,
    Footers
  },
  updated() {
    // ruleForm
    if (this.ruleForm.username) {
      sessionStorage.setItem("registerName", this.ruleForm.username);
    }
    if (this.ruleForm.phone) {
      sessionStorage.setItem("registerPhone", this.ruleForm.phone);
    }
    if (this.ruleForm.num) {
      sessionStorage.setItem("registerNum", this.ruleForm.num);
    }
    if (this.ruleForm.pass) {
      sessionStorage.setItem("registerPass", this.ruleForm.pass);
    }
    if (this.ruleForm.checkPass) {
      sessionStorage.setItem("registerCheckPass", this.ruleForm.checkPass);
    }
  },
  created() {
    setInterval(() => {
      this.checkPassword();
    }, 10);
    var isCheck = this.$route.query.isCheck;
    if (isCheck) {
      this.isOk = isCheck;
      if (sessionStorage.getItem("registerName")) {
        this.ruleForm.username = sessionStorage.getItem("registerName");
      }
      if (sessionStorage.getItem("registerPhone")) {
        this.ruleForm.phone = sessionStorage.getItem("registerPhone");
      }
      if (sessionStorage.getItem("registerNum")) {
        this.ruleForm.num = sessionStorage.getItem("registerNum");
      }
      if (sessionStorage.getItem("registerPass")) {
        this.ruleForm.pass = sessionStorage.getItem("registerPass");
      }
      if (sessionStorage.getItem("registerCheckPass")) {
        this.ruleForm.checkPass = sessionStorage.getItem("registerCheckPass");
      }
    }
  },
  mounted() {
    // console.log(this.isShow)
    this.$refs.mask.style.height =
      document.getElementById("app").clientHeight + "px";
    if (this.isShow == false) {
      document.body.style.overflow = "visible";
    }
  },
  methods: {
    //关闭弹窗
    consent(){
        this.isShow = false;
      },
    //返回上一页
    cancel(){
        this.$router.push('./index')
      },
    checkPassword() {
      if (!this.ruleForm.pass) {
        return;
      }
      var regNum = new RegExp("[0-9]");
      // var regLetter = new RegExp("[A-Za-z]");
      // var regOther = new RegExp("[^A-Z^a-z^0-9]");
      var regLetter = new RegExp("[a-z]");
      var regOther = new RegExp("[A-Z]");
      var isEN = false;
      var isEL = false;
      var isEO = false;
      if (!/^[a-zA-z]\w{5,17}$/.test(this.ruleForm.pass)) {
        this.safeStrIndex = -1;
        return;
      }
      if (regNum.test(this.ruleForm.pass)) {
        isEN = true;
      }
      if (regLetter.test(this.ruleForm.pass)) {
        isEL = true;
      }
      if (regOther.test(this.ruleForm.pass)) {
        isEO = true;
      }
      if (isEN || isEL || isEO) {
        this.safeStrIndex = 0;
      }

      if ((isEN && isEL) || (isEN && isEO) || (isEO && isEL)) {
        this.safeStrIndex = 1;
      }

      if (isEN && isEL && isEO) {
        this.safeStrIndex = 2;
      }
    },
    //   提交表单
    submitForm(formName) {
      // if (!this.isOk) {
      //   if (document.querySelectorAll(".el-message--error").length < 1) {
      //     this.$message.error("请先阅读确认协议后提交");
      //   }
      //   return;
      // }
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$http({
            url: `${url.register}`,
            method: "post",
            data: {
              phone: this.ruleForm.phone,
              password: this.ruleForm.pass,
              code: this.ruleForm.num,
              username: this.ruleForm.username,
              nickname: this.ruleForm.nikename
            }
          }).then(res => {
            if (res.data.code === 20000) {
              this.$http
                .post(url.login, {
                  username: this.ruleForm.username,
                  password: this.ruleForm.pass
                })
                .then(res => {
                  if (res.data.code == 20000) {
                    localStorage.Authorization =
                      "Bearer " + res.data.data.token;
                    localStorage.username = res.data.data.username;
                    localStorage.siteName = res.data.data.username;
                    localStorage.roles = res.data.data.roles;
                    localStorage.ID = res.data.data.id;
                    localStorage.remember = "1";
                  } else {
                    if (
                      document.querySelectorAll(".el-message--error").length < 1
                    ) {
                      this.$message.error(res.data.message);
                    }
                  }
                });
              this.$router.push("/supAndDis");
            } else {
              if (document.querySelectorAll(".el-message").length == 0)
                this.$message({
                  message: res.data.message,
                  type: "warning"
                });
            }
          });
        } else {
          return false;
        }
      });
    },
    // 取消表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
      sessionStorage.removeItem("registerName");
      sessionStorage.removeItem("registerPhone");
      sessionStorage.removeItem("registerNum");
      sessionStorage.removeItem("registerPass");
      sessionStorage.removeItem("registerCheckPass");

      this.$router.push("/");
    },
    // 发送验证码
    handleCheckNum() {
      if (!this.ruleForm.phone) {
        if (document.querySelectorAll(".el-message").length == 0)
          this.$message({
            message: "手机号不能为空",
            type: "warning"
          });
        return;
      }
      this.$http({
        url: `${url.sendCode}`,
        method: "post",
        data: {
          phone: this.ruleForm.phone
        }
      }).then(res => {
        if (res.data.code === 20000) {
          this.disabled = true;
          var num = 59;
          var _this = this;
          var timer = setInterval(() => {
            num--;
            _this.checkVal = `${num}s`;
            if (num === 0) {
              this.disabled = false;
              clearInterval(timer);
              _this.checkVal = "发送验证码";
            }
          }, 1000);
        }
      });
    },
    // 判断密码强度
    judgeSafe() {
      console.log(1);
    }
  },

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.register {
  .selfStyle {
    .el-form-item__label {
      width: 125px;
      height: 20px;
      font-size: 16px;
      font-family: MicrosoftYaHeiLight, 微软雅黑;
      font-weight: bold;
      color: #666;
    }
    .el-input__inner {
      height: 36px;
      border: 1px solid #999;
      font-size: 16px;
      font-family: MicrosoftYaHei, 微软雅黑;
      font-weight: 400;
      color: #000;
    }
  }
  .el-divider--horizontal {
    display: block;
    height: 2px;
    margin: 10px 0;
}
}
</style>

<style lang="scss"  scoped>
.w {
  width: 1200px;
  margin: auto;
}

.register {
  .form_cancle {
    width: 88px;
    height: 32px;
    line-height: 32px;
    background: rgba(153, 153, 153, 1);
    border-radius: 4px;
    font-size: 16px;
    font-family: MicrosoftYaHei, 微软雅黑;
    font-weight: bold;
    color: rgba(255, 255, 255, 1);
    margin-right: 44px;
    cursor: pointer;
  }
  .registerBtn {
    width: 88px;
    height: 32px;
    background: rgba(210, 29, 39, 1);
    border-radius: 4px;
    font-size: 16px;
    font-family: MicrosoftYaHei, 微软雅黑;
    font-weight: bold;
    color: rgba(255, 255, 255, 1);
    cursor: pointer;
  }

  .el-form-item__content {
    line-height: 1;
  }

  .register_title {
    height: 70px;
    line-height: 70px;
    > h3 {
      text-align: left;
      font-size: 28px;
      font-family: MicrosoftYaHei-Bold, 微软雅黑;
      font-weight: bold;
      color: rgba(102, 102, 102, 1);
    }
  }

  .registerLogo {
    padding-left: 35px;
    height: 80px;
    line-height: 80px;
    background: rgba(255, 255, 255, 0.48);
    box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.14);
    font-size: 22px;
    margin-bottom: 10px;
    font-family: MicrosoftYaHei, 微软雅黑;
    font-weight: bold;
    color: rgba(131, 131, 131, 1);
  }
  .register_form {
    background-image: url("../../../static/img/register_bg.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    border-bottom: 1px solid #ff0000;
  }

  .register_form_content {
    background: rgba(255, 255, 255, 0.41);
    padding-top: 20px;
  }

  .demo-ruleForm {
    margin: auto;
    width: 540px;
    padding-top: 130px;
    padding-bottom: 200px;
  }

  .checkbtn {
    position: absolute;
    top: 5px;
    left: 300px;
    width: 100px;
    height: 32px;
    background: #fc7336;
    color: #fff;
    border-radius: 6px;
    font-size: 14px;
  }

  label {
    display: inline-block;
    position: relative;
    padding-left: 40px;
    cursor: pointer;
  }
  label::before {
    display: inline-block;
    position: absolute;
    left: 16px;
    top: 3px;
    content: "";
    width: 16px;
    height: 15px;
    border: 1px solid;
    margin-right: 40px;
  }
  input[type="checkbox"] {
    display: none;
  }
  input[type="checkbox"]:checked + label::before {
    content: "✔";
    text-align: center;
    line-height: 15px;
  }

  .safeBox {
    .safeUl {
      li {
        float: left;
        color: #666666;
      }
      .safeLi i {
        display: inline-block;
        width: 30px;
        height: 6px;
        background: #999;
        margin-right: 4px;
      }
    }
  }
  .popup{
  width: 100%;
  background-color: rgba(102, 102, 102, 0.2);
  bottom: 0;
  left: 0;
  position: fixed;
  z-index: 998;
  min-height: 2000px;
  font-size:16px;
  font-family:Microsoft YaHei;
  font-weight:bold;
  color:rgba(102,102,102,1);
}
.popup_view{
    position: fixed;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    z-index: 1000;
    background-color: white;
    width:820px;
    height:650px;
    background:rgba(255,255,255,1);
    border:4px solid rgba(210,29,39,1);
    border-radius:4px;
    padding: 28px;
    button{
      width:160px;
      height:36px;
      background:rgba(210,29,39,1);
      border-radius:4px;
      font-size:15px;
      font-family:MicrosoftYaHeiLight;
      font-weight:bold;
      color:rgba(255,255,255,1);
      margin-top: 20px;
    }
}
#fork_cha{
      font-size: 26px;
      opacity: 0.5;
      cursor: pointer;
      position: absolute;
      right: 28px;
      top: 23px;
  }
}
</style>
