<!-- 组件说明 -->
<template>
  <div id="bhncAmendPassword">
    <div class="amend-password" v-if="open">
      <div class="password-box">
        <div class="mask">
          <p class="title">密码修改</p>
          <p>
            <label for="old-password">原始密码：</label>
            <input type="password" v-model="password" id="old-password" @blur="checkInput()" />
          </p>
          <p>
            <label for="new-password">新密码：</label>
            <input
              type="password"
              v-model="newPassword"
              id="new-password1"
             
              @blur="checkInput()"
            />
          </p>
          <p>
            <label for="new-password">再次输入：</label>
            <input
              type="password"
              v-model="newPasswordCheck"
              id="new-password2"
              @blur="checkInput()"
            />
          </p>
          <p
            style="font-size:20px;
font-family:Microsoft YaHei;
font-weight:400;
color:rgba(192,192,192,1);"
          >
            <label>&nbsp;&nbsp;手机号：</label>
            <input
              type="text"
              v-model="userAccounts.phone"
              readonly
              style="border:none;font-size:inherit;color:inherit"
            />
          </p>
          <!-- <p>
            <button
              type="button"
              :disabled="disabled"
              @click="handleCheckNum()"
              class="security"
            >{{checkVal}}</button>
          </p> -->
          <p style="margin-bottom: 64px;">
            <label for="code">验证码：</label>
            <span>
            <input
              type="text"
              v-model="code"
              id="code"
              style="width:160px;margin-right:16px;"
              @blur="checkInput()"
            />
            <button
                type="button"
                :disabled="disabled"
                @click="handleCheckNum()"
                class="security"
                style
              >{{checkVal}}</button>
            </span>
          </p>
          <hr style="width:90%;" color="#F0F0F0" />
          <p class="btn-box" style="margin-bottom:0;padding-bottom: 36px;">
            <button @click="close" style="margin-right: 36px;">取消</button>
            <button @click=" updatePassword()" style="background:#FC9263">确认</button>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import url from "@/serverAPI.config.js";
export default {
  props: {
    open: {
      type: Boolean,
      required: false
    }
  },
  components: {},
  data() {
    return {
      checkVal: "发送验证码",
      userAccounts: {},
      phone: "",
      password: "",
      newPassword: "",
      newPasswordCheck: "",
      code: "",
      disabled: false,
      passwordWarn: "",
      newPasswordWarn: "",
      newPasswordCheckWarn: "",
      codeWarn: ""
    };
  },
  computed: {},
  methods: {
    amendPassword(id) {
      this.$http({
        url: `${url.amendUser}/${id}`,
        method: "put",
        data: this.userAccounts
      }).then(res => {
        console.log(res);
      });
    },
    checkInput() {
      if (this.password) {
        this.passwordWarn = "";
      } else {
        this.passwordWarn = "red";
      }

      if (this.newPassword) {
        this.newPasswordWarn = "";
      } else {
        this.newPasswordWarn = "red";
      }

      if (this.newPasswordCheck) {
        if (this.newPasswordCheck == this.newPassword) {
          this.newPasswordCheckWarn = "";
        } else {
          this.newPasswordCheckWarn = "red";
        }
      } else {
        this.newPasswordCheckWarn = "red";
      }

      if (this.code) {
        this.codeWarn = "";
      } else {
        this.codeWarn = "red";
      }
    },
    getUserMsg() {
      this.$http
        .get(url.getUserMsg)
        .then(res => {
          this.userAccounts = res.data.data;
          this.phone = this.userAccounts.phone;      
        })
        .catch(err => {
          console.log(err);
        });
    },
    updatePassword() {
      if (
        this.passwordWarn == "red" ||
        this.newPasswordWarn == "red" ||
        this.newPasswordCheckWarn == "red" ||
        this.codeWarn == "red"
      ) {
        if (document.getElementsByClassName("el-message").length == 0)
          this.$message.error("请输入完整");
        return;
      }
      this.$http({
        url: `${url.updatePassword}`,
        method: "post",
        data: {
          username: localStorage.getItem("siteName"),
          phone: this.phone,
          password: this.password,
          code: this.code,
          newPassword: this.newPassword
        }
      }).then(res => {
        if (res.data.code === 20000) {
          this.$router.push("/index");
        } else {
          this.$message({
            message: res.data.message,
            type: "warning"
          });
        }
      });
    },

    // 发送验证码
    handleCheckNum() {
      if(this.newPasswordCheck == this.newPassword){
        this.$http({
        url: `${url.sendCode}`,
        method: "post",
        data: {
          phone: this.phone
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
    }else{
      if (document.getElementsByClassName("el-message").length == 0)
          this.$message.error("新密码和再次输入不一致");
        return;
    }
      
    },
    close() {
      this.$emit("close", false); //这里是通过emit把值传给父组件
    }
  },
  created() {
    this.getUserMsg();
  }
};
</script>

<style lang='scss' scoped>
#bhncAmendPassword {
  //@import url()
  .password-box {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    background: rgba(0, 0, 0, 0.69);
    .mask {
      width: 720px;
      //   height: 540px;
      background: #fff;
      margin: 250px auto;
      font-size: 16px;
      font-family: MicrosoftYaHeiLight;
      color: rgba(102, 102, 102, 1);
      border-radius: 8px;
      .title {
        text-align: left;
        font-size: 24px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(252, 146, 99, 1);
        padding-left: 55px;
        padding-top: 36px;
      }
      p {
        width: 100%;
        margin: 24px 0;
        // padding-left: 65px;
        text-align: center;
        font-size: 20px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        label{
          width: 100px;
          display: inline-block;
        }
        input {
          width: 296px;
          height: 40px;
          background: rgba(255, 255, 255, 1);
          border: 1px solid rgba(192, 192, 192, 1);
          border-radius: 8px;
          text-indent: 16px;
        }
        button {
          width: 100px;
          height: 40px;
          background: rgba(192, 192, 192, 1);
          border-radius: 8px;
          font-size: 16px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          
        }
        .security {
          width: 120px;
          height: 40px;
          background: rgba(252, 146, 99, 1);
          border-radius: 8px;
        }
      }
    }
  }
}
</style>