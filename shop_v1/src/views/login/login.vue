<template>
  <div class="shopLogin">
    <Headers></Headers>
    <!-- <div
      id="login"
      v-loading="loading"
      element-loading-text="登陆中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    ></div>-->
    <div class="shopFomr">
      <div class="bg_box w" id="loginPage">
        <div class="formBox">
          <div class="form-box">
            <el-form
              ref="loginForm"
              :model="loginForm"
              auto-complete="on"
              :rules="loginRules"
              label-position="middle"
              label-width="left"
            >
              <el-form-item prop="username">
                <span class="svg-container">
                  <i class="iconfont icon-yonghu"></i>
                </span>
                <el-input
                  v-model="loginForm.username"
                  name="username"
                  type="text"
                  tabindex="1"
                  auto-complete="off"
                  placeholder="请输入手机号码"
                />
              </el-form-item>

              <el-form-item prop="password">
                <span class="svg-container">
                  <i class="iconfont icon-yidongduanicon-"></i>
                </span>
                <el-input
                  v-model="loginForm.password"
                  :type="passwordType"
                  ref="password"
                  name="password"
                  tabindex="2"
                  auto-complete="on"
                  placeholder="请输入密码"
                  @keyup.enter.native="handleLogin"
                />
                <span class="show-pwd" @click="showPwd">
                  <i
                    :class="passwordType === 'password' ? 'iconfont icon-yanjing' : 'iconfont icon-yanjing1'"
                  ></i>
                </span>
              </el-form-item>
              <div class="remember-password">
                <div class="remember">
                  <input type="checkbox" v-model="loginForm.rememberPassword" id="remberPass" />
                  <label for="remberPass">记住密码</label>
                </div>
                <div class="linkOther">
                  <span
                    href="javascript:"
                    @click="forgetPaaaword()"
                    style="padding-right:13px;"
                  >忘记密码?</span>
                  <span @click="$router.push('/register')">立即注册</span>
                </div>
              </div>
              <div id="slideBar"></div>

              <el-button
                :loading="loading"
                type="primary"
                style="width:100%;margin-bottom:12px;background-color:#d21d27;border:none"
                @click.native.prevent="handleLogin"
              >登录</el-button>
            </el-form>

            <input hidden id="isPassCheck" style="color:red" />
          </div>
        </div>
        <div class="codeandfont">
          <div style>
            <p
              style="font-size:48px;font-family:Source Han Sans CN,微软雅黑;font-weight:400;color:rgba(255,255,255,1);margin-bottom:28px;"
            >
              <span style="margin-right:26px;">中国制笔</span>
              <span>第一平台</span>
            </p>
            <p
              style="font-size:16px;font-family:Source Han Sans CN,微软雅黑;font-weight:400;color:rgba(255,255,255,1);padding-bottom:95px;"
            >
              找笔、找买家、找卖家、
              <span style="color:#C8B83D;">一站搞定</span>
            </p>
          </div>
          <div class="codeBox">
            <div>
              <img src="../../../static/img/yard.png" alt class="fl" />
              <div class="fl">
                <p>扫一扫关注官方微信</p>
                <p>更多惊喜等着你 ！</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footers style="margin-top:0;"></Footers>
  </div>
</template>

<script>
import url from "@/serverAPI.config.js";
import { validUserEmail, isPassword } from "@/utils/validate";
import { mapMutations } from "vuex";
import Headers from "../../components/headers";
import Footers from "../../components/footers";

// 滑动拼图方法开始

// 滑动拼图方法结束
export default {
    metaInfo: {
    title: '笔海弄潮——制笔行业企业上云综合服务平台', // set a title
    meta: [{                 // set meta
      name: 'keyWords',
      content: '制笔行业、制笔厂家、礼品笔、学生笔、中性笔、圆珠笔、钢笔、墨水、笔芯、制笔机械及零部件；'
    },
    {
        name:"description",
        content: '笔海弄潮，连接制笔行业采购商和供应商的智慧化数字平台，帮制笔行业采购商寻找各种笔类产品，帮制笔行业厂家寻找各类采购商，为厂商企业管理提供企业上云的管理服务。',
    }],
  },
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
      passwordType: "password",
      checkOptions: {},
      isPassCheck: false,
      imgInit: 0
    };
  },
  components: {
    Headers,
    Footers
  },
  beforeCreate(){
    if(!this.$route.query.init){
          location.href="/web/shop/login?init=1"
      }
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
      if (document.getElementById("isPassCheck").style.color != "blue") {
        if (this.checkOptions.fail() == false) {
          document.getElementById("slideBlock").style.left = "2px";
          document.getElementById("slideBlock").style.transition = "left 0.6s";
          // 错误弹出的图标
          document.getElementById("slideIcon").style.backgroundPosition =
            "0 -1229px";
          document.getElementById("slideType").className =
            "slide-text-type redColor";
          document.getElementById("slideType").innerHTML = "验证失败:";
          document.getElementById("slideContent").innerHTML =
            "拖动滑块将悬浮图像正确拼合";
        //   console.log(document.getElementById("slideContent").innerHTML);
          // 设置样式
          document.getElementById("slideHintInfo").style.height = "22px";
          setTimeout(function() {
            document.getElementById("slideHintInfo").style.height = "0px";
          }, 1300);
          document.getElementById("slideBtn").style.backgroundPosition =
            "0 -84px";
          document.getElementById("slideBtn").style.left = "0";
          document.getElementById("slideBtn").style.transition = "left 0.6s";
          document.getElementById("slideHint").style.opacity = "1";
          return;
        }
      }
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          //检验成功才把账号密码写入localStorage
          if (this.loginForm.rememberPassword == true) {
            this.$http
              .post(url.login, this.loginForm)
              .then(res => {
                if (res.data.code == 20000) {
                  if (res.data.data.status.indexOf("0") != -1) {
                    localStorage.status = res.data.data.status;
                  }
                  if (res.data.data.type) {
                    if (res.data.data.type == "0") {
                      localStorage.roles = "dealer";
                    }

                    if (res.data.data.type == "1") {
                      localStorage.roles = "provider";
                    }
                  } else {
                    localStorage.roles = res.data.data.roles;
                  }

                  localStorage.Authorization = "Bearer " + res.data.data.token;
                  localStorage.username = res.data.data.username;
                  localStorage.siteName = res.data.data.username;
                  localStorage.expireTime = res.data.data.expireTime;
                  localStorage.ID = res.data.data.id;
                  localStorage.remember = "1";
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
                  this.loading = true;
                  setTimeout(() => {
                    this.$router.push("/main");
                  }, 500);
                } else {
                  alert(res.data.message);
                  this.loading = false;
                }
              })
              .catch(err => {
                alert("网络异常");
                // ;
                this.loading = false;
              });
          } else {
            // localStorage.clear();
            localStorage.removeItem('siteName');
            localStorage.removeItem('sitePassword');

          }
        } else {
          this.loading = false;
        //   console.log("error");
          return false;
        }
      });
    },
    //往localStorae里存入账号 密码
    setlocalStorage(name, password) {
      localStorage.username = name;
      localStorage.password = password;
    },
    //把localStroage的账号密码赋值给输入框
    getlocalStorage() {
      this.loginForm.username = localStorage.getItem("siteName");
      this.loginForm.password = localStorage.getItem("sitePassword");
    },
    //忘记密码
    forgetPaaaword() {
      this.setlocalStorage("", "");
      this.$router.push("/lostPassword");
    }
  },
  mounted() {
    // location.reload();
    //当页面刷新时重新获取local里的账号密码
    this.getlocalStorage();

    (function(window, document) {
      var SliderBar = function(targetDom, options) {
        // 判断是用函数创建的还是用new创建的。这样我们就可以通过MaskShare("dom")
        if (!(this instanceof SliderBar))
          return new SliderBar(targetDom, options);
        // 参数
        this.options = this.extend(
          {
            dataList: []
          },
          options
        );
        // 获取dom
        this.targetDom = document.getElementById(targetDom);
        var dataList = this.options.dataList;
        if (dataList.length > 0) {
          var html =
            "<div class='slide-box'><div class='slide-img-block'>" +
            "<div class='slide-loading'></div><div class='slide-img-border'>" +
            "<div class='scroll-background slide-top'></div><div class='slide-img-div'>" +
            "<div class='slide-img-nopadding'><img class='slide-img' id='slideImg' src='' />" +
            "<div class='slide-block' id='slideBlock'></div><div class='slide-box-shadow' id='cutBlock'></div></div>" +
            "<div class='scroll-background  slide-img-hint-info' id='slideHintInfo'>" +
            "<div class='slide-img-hint'><div class='scroll-background slide-icon' id='slideIcon'></div>" +
            "<div class='slide-text'><span class='slide-text-type' id='slideType'></span>" +
            "<span class='slide-text-content' id='slideContent'></span></div></div></div></div>" +
            "<div class='scroll-background slide-bottom'>" +
            "<div class='scroll-background slide-bottom-refresh' id='refreshBtn' title='更换图片'></div>" +
            "<div class='slide-bottom-no-logo'></div></div></div></div>" +
            "<div class='scroll-background scroll-bar'>" +
            "<div class='scroll-background slide-btn' id='slideBtn'></div>" +
            "<div class='slide-title' id='slideHint'> 按住滑块，拖动完成上面拼图</div></div></div>";
          this.targetDom.innerHTML = html;
          this.slideBtn = document.getElementById("slideBtn"); // 拖拽按钮
          this.refreshBtn = document.getElementById("refreshBtn"); // 换图按钮
          this.slideHint = document.getElementById("slideHint"); // 提示名称
          this.slideImg = document.getElementById("slideImg"); // 图片
          this.cutBlock = document.getElementById("cutBlock"); // 裁剪区域
          this.slideBlock = document.getElementById("slideBlock"); // 裁剪的图片
          this.slideIcon = document.getElementById("slideIcon"); // 正确、失败的图标
          this.slideType = document.getElementById("slideType"); // 正确、失败
          this.slideContent = document.getElementById("slideContent"); // 正确、失败的正文
          this.slideHintInfo = document.getElementById("slideHintInfo"); // 弹出
          this.resultX = 0;
          this.startX = 0;
          this.timer = 0;
          this.startTamp = 0;
          this.endTamp = 0;
          this.x = 0;
          this.imgWidth = 0;
          this.imgHeight = 0;
          this.imgList = [];
          this.isSuccess = true;
          for (var i = 1; i < 10; i++) {
            this.imgList.push(i + ".jpg");
          }
        }

        this.init();
      };
      SliderBar.prototype = {
        init: function() {
          this.event();
        },
        extend: function(obj, obj2) {
          for (var k in obj2) {
            obj[k] = obj2[k];
          }
          return obj;
        },
        event: function() {
          var _this = this;
          _this.reToNewImg();
          _this.slideBtn.onmousedown = function(event) {
               if (document.getElementById("isPassCheck").style.color == "blue") {
            return;
          }
            _this.mousedown(_this, event);
          };
          _this.slideBtn.onclick = function(event) {
               if (document.getElementById("isPassCheck").style.color == "blue") {
            return;
          }
            _this.bClick(_this, event);
          };
          window.onload = function() {
            document.getElementById("slideBtn").click();
          };
          // setTimeout(res => {
          //   document.getElementById("slideBtn").click();
          // }, 1000);
          _this.refreshBtn.onclick = function() {
            _this.refreshBtnClick(_this);
          };
        },
        refreshBtnClick: function(_this) {
          if (document.getElementById("isPassCheck").style.color == "blue") {
            return;
          }
          _this.isSuccess = true;
          _this.slideBlock.style.cssText = "";
          _this.cutBlock.style.cssText = "";
          _this.reToNewImg();
          _this.cutImg();
        },
        reToNewImg: function() {
          var _this = this;
          var index = Math.round(Math.random() * 8); // 该方法有等于0 的情况
          var imgSrc = "/web/shop/static/images/" + _this.imgList[index] + "";
          _this.slideImg.setAttribute("src", imgSrc);
          _this.slideBlock.style.backgroundImage = "url(" + imgSrc + ")";
          _this.slideImg.onload = function(e) {
            e.stopPropagation();
            _this.imgWidth = _this.slideImg.offsetWidth; // 图片宽
            _this.imgHeight = _this.slideImg.offsetHeight; // 图片高
          };
        },
        cutImg: function() {
          var _this = this;
          _this.cutBlock.style.display = "block";
          var cutWidth = _this.cutBlock.offsetWidth; // 裁剪区域宽
          var cutHeight = _this.cutBlock.offsetHeight; // 裁剪区域高
          // left
          _this.resultX = Math.floor(
            Math.random() * (_this.imgWidth - cutWidth * 2 - 4) + cutWidth
          );
          // top
          var cutTop = Math.floor(
            Math.random() * (_this.imgHeight - cutHeight * 2) + cutHeight
          );
          // 设置样式
          _this.cutBlock.style.cssText =
            "top:" +
            cutTop +
            "px;" +
            "left:" +
            _this.resultX +
            "px; display: block;";
          _this.slideBlock.style.top = cutTop + "px";
          _this.slideBlock.style.backgroundPosition =
            "-" + _this.resultX + "px -" + cutTop + "px";
          _this.slideBlock.style.opacity = "1";
        },
        bClick: function(_this, e) {
          e.preventDefault();
          _this.startX = e.clientX;
          _this.startTamp = new Date().valueOf();
          var target = e.target;
          target.style.backgroundPosition = "0 -216px";
          _this.slideHint.style.opacity = "0";
          if (_this.isSuccess) {
            _this.cutImg();
          }
        },
        mousedown: function(_this, e) {
          e.preventDefault();
          _this.startX = e.clientX;
          _this.startTamp = new Date().valueOf();

          _this.slideHint.style.opacity = "0";

          document.addEventListener("mousemove", mousemove);
          document.addEventListener("mouseup", mouseup);

          // 拖拽
          function mousemove(event) {
            _this.x = event.clientX - _this.startX;
            if (_this.x < 0) {
              _this.slideBtn.style.left = "0px";
              _this.slideBlock.style.left = "2px";
            } else if (_this.x >= 0 && _this.x <= 217) {
              _this.slideBtn.style.left = _this.x + "px";
              _this.slideBlock.style.left = _this.x + "px";
            } else {
              _this.slideBtn.style.left = "217px";
              _this.slideBlock.style.left = "217px";
            }
            _this.slideBtn.style.transition = "none";
            _this.slideBlock.style.transition = "none";
          }
          //   图片初始化函数
          function initImg() {
            _this.slideBtn.style.left = "0px";
            _this.slideBlock.style.left = "2px";
          }

          // 鼠标放开
          function mouseup() {
            document.removeEventListener("mousemove", mousemove);
            document.removeEventListener("mouseup", mouseup);
            var left = _this.slideBlock.style.left;
            left = parseInt(left.substring(0, left.length - 2));
            if (_this.resultX > left - 2 && _this.resultX < left + 2) {
              _this.isSuccess = true;
              _this.endTamp = new Date().valueOf();
              _this.timer = ((_this.endTamp - _this.startTamp) / 1000).toFixed(
                1
              );
              // 裁剪图片(拼图的一块)
              //_this.slideBlock.style.opacity = "0";
              //_this.slideBlock.style.transition = "opacity 0.6s";
              // 裁剪的区域(黑黑的那一块)
              //_this.cutBlock.style.opacity = "0";
              //_this.cutBlock.style.transition = "opacity 0.6s";
              // 正确弹出的图标
              _this.slideIcon.style.backgroundPosition = "0 -1207px";
              _this.slideType.className = "slide-text-type greenColor";
              _this.slideType.innerHTML = "验证通过:";
              document.getElementById("isPassCheck").style.color = "blue";
              _this.slideContent.innerHTML = "用时" + _this.timer + "s";

              setTimeout(res => {
                document.getElementById("cutBlock").style.display = "none";
              }, 5); // 裁剪区域
              document.getElementById("slideBlock").style.display = "none";
              _this.slideBtn = _this.slideBlock; // 裁剪的图片
              _this.refreshBtn = _this.slideBlock;
              setTimeout(res => {
                _this.slideHintInfo = _this.slideBlock;
              }, 5); // 裁剪区域

              //   setTimeout(function() {
              //     _this.cutBlock.style.display = "none";
              //     _this.slideBlock.style.left = "2px";
              //     _this.reToNewImg();
              //   }, 600);
              //_this.options.success && _this.options.success();
            } else {
              _this.isSuccess = false;
              // 设置样式
              // 裁剪图片(拼图的一块)
              _this.slideBlock.style.left = "2px";
              _this.slideBlock.style.transition = "left 0.6s";
              // 错误弹出的图标
              _this.slideIcon.style.backgroundPosition = "0 -1229px";
              _this.slideType.className = "slide-text-type redColor";
              _this.slideType.innerHTML = "验证失败:";
              document.getElementById("isPassCheck").style.color = "red";

              _this.slideContent.innerHTML = "拖动滑块将悬浮图像正确拼合";
              _this.options.fail && _this.options.fail();
              _this.slideBtn.style.backgroundPosition = "0 -84px";
              _this.slideBtn.style.left = "0";
              _this.slideBtn.style.transition = "left 0.6s";
              _this.slideHint.style.opacity = "1";
              if (_this.isSuccess == false) {
                _this.refreshBtnClick(_this);
              }
            }
            //设置样式

            _this.slideHintInfo.style.height = "22px";
            setTimeout(function() {
              _this.slideHintInfo.style.height = "0px";
            }, 1300);
          }
        }
      };
      window.SliderBar = SliderBar;
    })(window, document);

    var dataList = ["0", "1"];
    var options = {
      dataList: dataList,
      success: function() {
        return true;
      },
      fail: function() {
        return false;
      }
    };
    this.checkOptions = options;
    SliderBar("slideBar", options);
    var bodyHeight = window.screen.height;
    document.getElementById("loginPage").style.minHeight =
      bodyHeight - 282 - 120 + "px";
  }
};
</script>

<style lang="scss" scope>
$bodyBackground: #2d3a4b;
.w {
  width: 1200px;
  margin: auto;
}
.shopFomr {
  background-image: url("../../../static/img/loginsBG.png");
  background-repeat: no-repeat;
  background-size: cover;
}

.shopLogin {
  .codeandfont {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 15%;
  }

  .codeBox {
    padding: 13px 0;
    padding-left: 15px;
    width: 262px;
    height: 106px;
    background: rgba(255, 255, 255, 0.04);
    border-radius: 4px;
    font-size: 12px;
    font-family: SourceHanSansCN-Regular,微软雅黑;
    font-weight: 400;
    img {
      width: 85px;
      height: 80px;
      margin-right: 16px;
    }
    p {
      color: #fff;
      padding-bottom: 16px;
    }
  }
  .bg_box {
    position: relative;
    // min-height: 780px;

    .formBox {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 0;
      width: 410px;
      //   height: 320px;
      background: rgba(255, 255, 255, 0.6);
      box-shadow: 0px 3px 8px 0px rgba(0, 0, 0, 0.1);
      border-radius: 12px;
      label {
        display: inline-block;
        position: relative;
        padding-left: 25px;
        cursor: pointer;
        font-size: 12px;
        font-family: SourceHanSansCN-Regular,微软雅黑;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
      }
      label::before {
        display: inline-block;
        position: absolute;
        left: 0;
        content: "";
        width: 12px;
        height: 12px;
        border: 1px solid;
        margin-right: 4px;
      }
      input[type="checkbox"] {
        display: none;
      }
      input[type="checkbox"]:checked + label::before {
        content: "✔";
        text-align: center;
        line-height: 12px;
      }
    }
  }
  .linkOther {
    text-align: right;
    font-size: 12px;
    font-family: SourceHanSansCN-Regular,微软雅黑;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    padding-bottom: 16px;
    span {
      cursor: pointer;
    }
  }
  .form-box {
    padding-top: 52px;
    width: 300px;
    margin: auto;
    padding-bottom: 28px;
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
      width: 300px;
      height: 38px;
      line-height: 38px !important;
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(153, 153, 153, 0.8);
      border-radius: 4px;
      margin-bottom: 24px;
      span {
        color: #666;
        padding-left: 16px;
        vertical-align: middle;
        width: 30px;
        display: inline-block;
      }
      .el-input {
        width: 70%;
      }
      .el-input__inner {
        background: transparent;
        color: #000;
        font-size: 14px;
        border: none;
        padding: 0;
        line-height: normal;
        height: inherit;
      }
    }
    .remember-password {
      display: flex;
      justify-content: space-between;
      padding: 0 10px;
      span {
        color: #666;
        font-size: 12px;
      }
      a {
        color: #666;
        font-size: 12px;
      }
    }
  }

  .form-box .el-form-item .el-input {
    width: 60%;
  }

  .registerBoxes {
    text-align: center;
    font-size: 12px;
    font-family: SourceHanSansCN-Regular,微软雅黑;
    font-weight: 400;
    color: #ababab;
    cursor: pointer;
  }
  .registerBoxes span {
    padding-bottom: 2px;
    border-bottom: 1px solid #ababab;
  }

  .toIndex {
    width: 320px;
    height: 80px;
    cursor: pointer;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
}

.shopLogin {
  .slide-box {
    display: block;
    position: relative;
  }
  .scroll-background {
    // background-image: url("./images/sprite.3.2.0.png");
    background-image: url("../../../static/images/sprite.3.2.0.png");

    background-repeat: no-repeat;
  }
  .scroll-bar {
    margin: 15px;
    width: 261px;
    background-position: 0 0;
    height: 28px;
    position: relative;
  }
  .slide-btn {
    height: 44px;
    width: 44px;
    background-position: 0 -84px;
    cursor: pointer;
    display: block;
    position: absolute;
    left: 0;
    top: -9px;
    -moz-box-shadow: none;
    box-shadow: none;
    border-radius: 13px;
    z-index: 399;
  }
  .slide-title {
    cursor: default;
    position: absolute;
    left: 35px;
    font-size: 12px !important;
    color: #486c80;
    opacity: 1;
    filter: alpha(opacity=100);
    height: 28px;
    line-height: 28px !important;
    text-align: center;
    width: 220px;
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-user-select: none;
    user-select: none;
  }
  .slide-img-div {
    width: 290px;
    height: 116px;
    padding: 0 15px 2px 13px;
    position: relative;
    background-color: #f2ece1;
    border-left: 1px solid #e4ddd1;
    border-right: 1px solid #e4ddd1;
  }
  .slide-img-div img {
    width: 100%;
    height: 100%;
  }
  .slide-top {
    height: 14px;
    width: 290px;
    background-position: 0 -1341px;
    position: relative;
  }
  .slide-bottom {
    height: 28px;
    width: 290px;
    background-position: 0 -56px;
    line-height: 14px !important;
    position: relative;
    text-align: left;
    overflow: visible;
  }
  .slide-bottom-no-logo {
    margin-right: 15px;
    width: 65px;
    height: 16px;
    position: absolute;
    right: 0;
    top: 6px;
    background-color: #f2ece1 !important;
    cursor: default;
  }
  .slide-bottom-refresh {
    overflow: visible;
    display: block;
    zoom: 1;
    display: inline-block;
    vertical-align: bottom;
    cursor: pointer;
    margin-right: 16px !important;
    background-color: #f1e9de;
    margin: 6px 0 0 18px !important;
    height: 14px;
    width: 14px;
    background-position: 0 -1179px;
  }

  .slide-box-shadow {
    display: none;
    position: absolute;
    width: 40px;
    height: 40px;
    border-radius: 4px;
    background-color: rgba(0, 0, 0, 0.2);
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5) inset;
  }
  .slide-block {
    opacity: 0;
    position: absolute;
    top: 0;
    left: 2px;
    width: 40px;
    height: 40px;
    border-radius: 4px;
    background-repeat: no-repeat;
    background-attachment: scroll;
    border: 1px solid rgba(255, 255, 0, 0.8);
    background-size: 260px 116px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.4), 0 0 10px 0 rgba(90, 90, 90, 0.4);
    box-sizing: border-box;
    z-index: 10;
  }
  .slide-img-nopadding {
    position: relative;
    width: 100%;
    height: 100%;
  }
  .slide-icon {
    float: left;
    height: 22px;
    width: 26px;
  }
  .slide-img-hint {
    -webkit-font-smoothing: subpixel-antialiased;
    font-size: 12px !important;
    line-height: 22px !important;
    margin: 0 auto;
    position: relative;
  }
  .slide-text {
    text-align: left !important;
    color: #4b3f33;
  }
  .slide-img-hint-info {
    height: 22px;
    width: 260px;
    background-position: 0 -674px;
    height: 0;
    overflow: hidden;
    position: absolute;
    bottom: 1px;
    transition: height 0.3s;
    z-index: 11;
  }
  .redColor {
    color: red;
  }
  .greenColor {
    color: green;
  }
  .slide-img-border {
    margin-bottom: 3px;
  }
}
</style>


<style lang="scss">
.shopLogin {
  .el-form-item__content {
    line-height: 38px;
  }

  .has-gutter .el-table thead {
    font-size: 14px;
    font-family: MicrosoftYaHei-Bold,微软雅黑;
    font-weight: bold;
    color: rgba(102, 102, 102, 1);
  }
  tbody {
    font-size: 12px;
    font-family: MicrosoftYaHei,微软雅黑;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
  }
}

/*-webkit-autofill用于覆盖chrome浏览器本身的背景颜色*/
input:-webkit-autofill {
  box-shadow: 0 0 0px 1000px #fff inset;
}
</style>


