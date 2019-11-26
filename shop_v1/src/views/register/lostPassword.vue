<template>
  <div class="register" style="background:#f8f8f8">
    <!-- 引用头部公共组件 -->
    <Headers></Headers>
    <!-- 标题 -->
    <div class="register_form">
      <!-- 表单 -->
      <div class="w register_form_content">
        <div class="registerLogo">忘记密码</div>
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="140px"
          class="demo-ruleForm selfStyle"
        >
          <el-form-item label="手机号码:" prop="phone">
            <el-input v-model="ruleForm.phone" autocomplete="off" placeholder="请输入手机号码"></el-input>
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
          <el-form-item label="新密码:" prop="pass">
            <el-input
              type="password"
              v-model="ruleForm.pass"
              autocomplete="new-password"
              placeholder="请输入新密码"
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
            <el-input
              type="password"
              v-model="ruleForm.checkPass"
              autocomplete="new-password"
              placeholder="请再次输入密码"
            ></el-input>
          </el-form-item>
          <el-form-item style="margin-top: 30px;">
            <input type="button" @click="resetForm('ruleForm')" class="form_cancle" value="取消" />
            <input type="button" @click="submitForm('ruleForm')" class="registerBtn" value="确定" />
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
  components: {},
  data() {
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号码不能为空"));
      }
      setTimeout(() => {
        if (
          !/^(((13[0-9])|(14[5-7])|(15[0-9])|(17[0-9])|(18[0-9]))+\d{8})$/.test(
            value
          )
        ) {
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
    return {
      ruleForm: {
        pass: "",
        checkPass: "",
        num: "",
        phone: ""
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        phone: [{ validator: checkPhone, trigger: "blur" }],
        num: [{ validator: validateCode, trigger: "blur" }]
      },
      disabled: false,
      checkVal: "发送验证码",
      isOk: false,
      safeStr: ["低", "中", "高"],
      safeStrIndex: -1
    };
  },
  computed: {},
  created() {
    setInterval(() => {
      this.checkPassword();
    }, 10);
  },
  methods: {
    checkPassword() {
      if (!this.ruleForm.pass) {
        return;
      }
      var regNum = new RegExp("[0-9]");
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
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$http({
            url: `${url.forgetPassword}`,
            method: "post",
            data: {
              phone: this.ruleForm.phone,
              password: this.ruleForm.pass,
              code: this.ruleForm.num
            }
          }).then(res => {
            if (res.data.code === 20000) {
              this.$http
                .post(url.login, {
                  username: this.ruleForm.phone,
                  password: this.ruleForm.pass
                })
                .then(res => {
                  if (res.data.code == 20000) {
                    localStorage.Authorization =
                      "Bearer " + res.data.data.token;
                    localStorage.username = res.data.data.username;
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
              this.$message({
                message: "修改成功",
                type: "success"
              });
              this.$router.push("/index");
            } else {
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
      this.$router.push("/");
    },
    // 发送验证码
    handleCheckNum() {
      if (!this.ruleForm.phone) {
        this.$message({
          message: "手机号不能为空",
          type: "warning"
        });
        return;
      }

      if (
        !/^(((13[0-9])|(14[5-7])|(15[0-9])|(17[0-9])|(18[0-9]))+\d{8})$/.test(
          this.ruleForm.phone
        )
      ) {
        this.$message({
          message: "请输入正确手机号",
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
  components: {
    Headers,
    Footers
  }
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
    left: 0;
    content: "";
    width: 20px;
    height: 20px;
    border: 1px solid;
    margin-right: 40px;
  }
  input[type="checkbox"] {
    display: none;
  }
  input[type="checkbox"]:checked + label::before {
    content: "✔";
    text-align: center;
    line-height: 20px;
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
}
</style>
