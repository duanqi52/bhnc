<template>
  <div id="bhncUserCenter">
    <!-- 用户信息 -->
    <div class="bg_user">
      <div>
        <div class="user_info">
          <div class="user_info_con">
            <div class="user_info_con_news">
              <div class="user_info_con_a">
                <img :src="userInfo.head_img" alt class="user_info_con_img" />
              </div>
              <p class="user_info_con_news_a">
                <!-- <span class="user_info_con_name" v-show="!show_import">{{userInfo.nickname}}</span> -->
                <span class="user_info_con_name" v-show="!show_import">{{userInfo.phone}}</span>
                <!-- <el-input
                  v-model="userInfo.nickname"
                  placeholder="请输入新的用户昵称"
                  v-show="show_import"
                  style="margin-right: 20px;display: inline-block;width: 170px;"
                ></el-input>
                <i class="el-icon-edit" style="cursor:pointer;" @click="import_a"></i>-->
              </p>
              <div class="user_info_con_news_b">
                <!-- <span>{{userInfo.phone}}</span> -->
                <input type="button" value="修改密码" @click="show3 = !show3" />
                <el-collapse-transition>
                  <div class="changePass" v-show="show3">
                    <p>密码修改</p>
                    <div class="changePass_a">
                      <span>原始密码：</span>
                      <el-input
                        placeholder="请输入密码"
                        v-model="input"
                        show-password
                        style="width: unset;"
                      ></el-input>
                    </div>
                    <div class="changePass_a">
                      <span>新密码：</span>
                      <el-input
                        placeholder="请输入密码"
                        v-model="input1"
                        show-password
                        style="width: unset;"
                      ></el-input>
                    </div>
                    <div class="changePass_a">
                      <span>再次输入：</span>
                      <el-input
                        placeholder="请输入密码"
                        v-model="input2"
                        show-password
                        style="width: unset;"
                      ></el-input>
                    </div>
                    <div class="changePass_b">
                      <button @click="getCode($event)">获取验证码</button>
                      <el-input placeholder="请输入验证码" v-model="authCode" style="width: 208px;"></el-input>
                    </div>
                    <div>
                      <el-button @click="updatePassword">确认</el-button>
                      <el-button @click="show3 = !show3">取消</el-button>
                    </div>
                  </div>
                </el-collapse-transition>
              </div>
            </div>
            <div style="margin-left: 215px;padding-right: 5px;">
              <div class="user_jifen_bg">
                <p class="user_jifen_nub">{{userInfo.integral}}</p>
              </div>
            </div>
            <div class="user_st">
              <div
                class="user_info_con_b"
                style="cursor:pointer;margin-right: 5px;"
                @click="$router.push('/submitDataSupplier')"
              >
                <img src="../../../static/img/upSup.png" alt />
                <!-- <div class="zhong" style="font-size: 18px;font-weight: bold;">我的收藏</div> -->
              </div>
              <!-- <div class="user_bake">
                <div
                  class="user_info_con_c"
                  v-if="!isProvider && userInfo.status != '0' && userInfo.status != '2'"
                >
                  <img :src="img_application" alt @click="$router.push('/submitData')" />
                </div>
                <div class="user_info_con_c" v-if="!isProvider && userInfo.status == '2'">
                  <img :src="informationImg" alt @click="$router.push('/submitData')" />
                  <br />
                  <div
                    style="color:red;text-align: center;width: 173px;"
                    @mouseout="reason='详情'"
                    @mouseover="reason='驳回原因: '+userInfo.reason"
                  >
                    <a>{{reason}}</a>
                  </div>
                </div>
                <div class="user_info_con_c" v-if="isProvider">
                  <img :src="toProvider" alt @click="toProviderHttp()" />
                </div>
                <div class="user_info_con_c" v-if="!isProvider && userInfo.status == '0'">
                  <img :src="reviewImg" alt />
                  <br />
                </div>
              </div>-->
              <div
                class="user_info_con_b"
                style="cursor:pointer;"
                @click="$router.push('/submitDisData')"
              >
                <img src="../../../static/img/upPur.png" alt />
                <!-- <div class="zhong" style="font-size: 18px;font-weight: bold;">我的收藏</div> -->
              </div>
            </div>
            <div class="guessyou" v-if="guessLikeGoodsList.length > 0">
              <p>猜你喜欢</p>
              <ul class="clearfix">
                <li
                  v-for="(goods,index) in guessLikeGoodsList"
                  :key="index"
                  @click="toDetail(goods)"
                >
                  <img :src="goods.img[0]" alt />
                  <h3>{{goods.title}}</h3>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Headers from "@/components/headers";
import Footer from "../../components/footers.vue";
import url from "@/serverAPI.config.js";

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
  // 数据
  data() {
    return {
      isProvider: false,
      nickname: "",
      show_import: false,
      show3: false,
      input: "",
      input1: "",
      input2: "",
      checkList: [],
      img_info: "../../static/img/user_info.png",
      img_log: "../../static/img/hade_logo.jpg",
      img_application: "../../static/img/application.png",
      toProvider: "../../static/img/toProvider.png",
      reviewImg: "../../static/img/review.png",
      informationImg: "../../static/img/information.png",
      orderList: [],
      userInfo: {},
      currentPage: 1, //初始页
      pagesize: 10, //    每页的数据
      total: 0,
      multipleSelection: [],
      username: "",
      reason: "详情",
      guessLikeGoodsList: [],
      authCode: ""
    };
  },
  components: {
    Headers,
    Footer
  },
  created() {
    this.getGuessYouLike();
    if (localStorage.roles.indexOf("provider") != -1) {
      this.isProvider = true;
    }

    if (
      localStorage.roles.indexOf("provider") != -1 &&
      this.$route.query.provideruserInfo != "1"
    ) {
      var username = localStorage.getItem("username");
      var password = localStorage.getItem("password");
      location.href = `${url.supplierUrl}/?username=${username}&password=${password}`;
      return;
    }
    if (localStorage.roles.indexOf("dealer") != -1) {
      var username = localStorage.getItem("username");
      var password = localStorage.getItem("password");
      location.href = `${url.dealerUrl}/?username=${username}&password=${password}`;
      return;
    }
    this.username = localStorage.getItem("username");
    this.getUserInfo(this.currentPage, this.pagesize);
  },
  methods: {
    getGuessYouLike() {
      var username = localStorage.getItem("username");
      this.$http({
        url: `${url.guessYouLike}/${username}`,
        method: "get"
      }).then(res => {
        if (res.data.code == 20000) {
          this.guessLikeGoodsList = res.data.data;
          this.guessLikeGoodsList = res.data.data.splice(0, 12);
          this.guessLikeGoodsList.map(item => {
            item.img = JSON.parse(item.img);
          });
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    import_a() {
      this.show_import = !this.show_import;
    },
    //初始化currentPage,初始每页数据pagesize和数据data
    handleSizeChange(size) {
      this.pagesize = size;
      this.getUserInfo(this.currentPage, this.pagesize);
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage; // 点击第几页
      this.getUserInfo(this.currentPage, this.pagesize);
    },
    getUserInfo(page, size) {
      this.$http({
        url: `${url.userInfo}/${this.username}`,
        method: "get"
      }).then(res => {
        if (res.data.code == 20000) {
          this.userInfo = res.data.data;
        }
      });
    
    },
    //时间格式转化
    resolvingDate(date) {
      var dateee = new Date(date).toJSON();
      return new Date(+new Date(dateee) + 8 * 3600 * 1000)
        .toISOString()
        .replace(/T/g, " ")
        .replace(/\.[\d]{3}Z/, "");
    },
    //精度转换
    parseNumber(str) {
      return parseFloat(str).toFixed(2);
    },

    toDetail(goods) {
      this.utils.toDetailsss(goods);
    },
    // 获取验证码
    getCode(e) {
      e.target.disabled = true;
      this.$http({
        url: `${url.sendCode}`,
        method: "post",
        data: {
          phone: this.userInfo.phone
        }
      }).then(res => {
        if (res.data.code === 20000) {
          var num = 60;
          var timer = setInterval(() => {
            num--;
            e.target.innerText = num + "s";
            if (num == 0) {
              clearInterval(timer);
              e.target.innerText = "获取验证码";
              e.target.disabled = false;
            }
          }, 1000);
        }
      });
    },
    // 更新密码
    updatePassword() {
      // this.show3 = !this.show3;
      if (!this.input || !this.input1 || !this.input2 || !this.authCode) {
        if (document.querySelectorAll(".el-message").length == 0)
          this.$message.error("请输入完整");
        return;
      }
      if (this.input1 != this.input2) {
        if (document.querySelectorAll(".el-message").length == 0)
          this.$message.error("前后密码不一致");
        return;
      }
      this.$http({
        url: `${url.updatePassword}`,
        method: "post",
        data: {
          username: localStorage.getItem("username"),
          phone: this.userInfo.phone,
          password: this.input,
          code: this.authCode,
          newPassword: this.input1
        }
      }).then(res => {
        if (res.data.code === 20000) {
          this.$router.go(0);
        } else {
          this.$message({
            message: res.data.message,
            type: "warning"
          });
        }
      });
    }
  }
};
</script>


<style lang="scss">
#bhncUserCenter {
  .header_tab .el-table th .cell {
    font-weight: bold !important;
    color: #666666 !important;
  }
  .header_tab .el-table th,
  .el-table tr {
    border-bottom: 2px solid !important;
  }
}
</style>

<style lang="scss" socped>
#bhncUserCenter {
  .header_tab {
    width: 90%;
    margin: 0 auto;
  }
  .w {
    width: 1200px;
    margin: auto;
  }
  .header {
    width: 1200px;
    margin: 0 auto;
    position: relative;
    .head_img {
    }
  }
  h3 {
    font-family: MicrosoftYaHei-Bold, 微软雅黑;
    font-weight: bold;
    color: rgba(61, 145, 231, 1);
  }

  // 用户界面模板
  .userBox {
    min-height: 830px;
    background: #f2f2f2;
    padding-top: 20px;
    .userBoxLeft {
      float: left;
      width: 260px;
      height: 100px;
      margin-right: 10px;
      .userLeftTitle {
        h3 {
          height: 56px;
          line-height: 56px;
          text-align: center;
          background: rgba(255, 255, 255, 0.48);
          box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.14);
          font-size: 22px;
          font-family: MicrosoftYaHei, 微软雅黑;
          font-weight: bold;
          color: rgba(131, 131, 131, 1);
        }
      }
    }
    .userBoxRight {
      float: left;
      width: 928px;
      height: 100px;
    }
  }

  //用户信息
  .user_info {
    .user_info_con {
      .user_info_con_b {
        border-radius: 6px;
        display: inline-block;
        color: #3d91e7;
        width: 49.3%;
        height: 157px;
        box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.2);
        text-align: center;
        .zhong {
          line-height: 30px;
          color: #f38aa9;
        }
      }
      .user_info_con_c {
        display: inline-block;
        img {
          cursor: pointer;
          margin-top: 30px;
        }
      }
    }
    .user_info_con_news {
      display: inline-block;
      text-align: center;
      width: 212px;
      height: 185px;
      float: left;
      background: rgba(255, 255, 255, 0.68);
      box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.2);
      .user_info_con_news_a {
        margin: 10px 0;
        .user_info_con_name {
          font-size: 16px;
          font-family: MicrosoftYaHei, 微软雅黑;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
        }
        i {
          margin-left: 20px;
        }
      }
    }
  }
  // 修改密码
  .changePass {
    width: 400px;
    display: inline-block;
    position: absolute;
    padding: 30px;
    border: 1px solid;
    border-radius: 6px;
    z-index: 9999;
    background-color: white;
    left: 0;
    top: 30px;
    z-index: 999;
    p {
      font-weight: bold;
      margin-bottom: 20px;
    }
    .changePass_a {
      margin-bottom: 10px;
      span {
        float: left;
        width: 100px;
      }
      .el-input {
      }
    }
    .changePass_b {
      text-align: left;
      margin-bottom: 20px;

      button {
        width: 100px;
        margin-right: 10px;
        background-color: #3d91e7;
        color: white;
        border-radius: 3px;
        padding: 10px;
      }
    }
  }
  //收件信息
  .shoujian {
    display: table;
    height: 150px;
    border-bottom: 1px solid #cccccc;
    border-top: 1px solid #cccccc;
    padding: 20px 10px;
    h3 {
      padding-bottom: 20px;
    }
    .shou_a {
      display: flex;
      justify-content: space-around;
      align-items: center;
      color: #666666;
      margin-bottom: 50px;
    }
  }

  // 我的订单
  .info_shi {
    width: 1200px;
    margin: 0 auto;
    h3 {
      text-indent: 10px;
      padding: 20px 0;
    }
  }
  .img_url {
    width: 45px;
    height: 45px;
    display: inline-block;
    float: left;
  }
  .commodity {
    overflow: hidden;
    text-align: left;
    padding-left: 10px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
  .el-checkbox {
    margin-right: 0;
    display: block;
  }
  .money {
    font-size: 16px;
    font-family: MicrosoftYaHei-Bold, 微软雅黑;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
  }

  .user_info_title {
    height: 80px;
    -webkit-box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.14);
    box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.14);
    display: flex;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.48);
  }
  .user_info_con_a {
    display: inline-block;
    margin-top: 20px;
    text-align: center;
    .user_info_con_img {
      border-radius: 50%;
      border: 1px solid #fd7f28;
      width: 84px;
      height: 84px;
    }
  }
  .user_info_con_news_b {
    position: relative;
    span {
      font-family: MicrosoftYaHei, 微软雅黑;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
    }
    input {
      font-family: MicrosoftYaHei, 微软雅黑;
      font-weight: 400;
      color: #fc7036;
      cursor: pointer;
      background-color: white;
    }
  }
  .user_jifen_bg {
    background: url("../../../static/img/userInfo_bg_tow.png") no-repeat;
    background-size: cover;
    height: 185px;
    overflow: hidden;
    margin-left: 7px;
    box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.2);
  }
  .user_jifen_nub {
    font-size: 33px;
    font-family: MicrosoftYaHei, 微软雅黑;
    font-weight: 400;
    color: #fd7e27;
    text-align: center;
    margin-top: 70px;
    text-indent: -30px;
  }
  .user_st {
    margin: 10px 0;
  }
  .user_bake {
    width: 49.3%;
    height: 157px;
    background: rgba(255, 255, 255, 0.7);
    box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.2);
    text-align: center;
    display: inline-block;
    float: right;
  }
  .guessyou {
    width: 928px;
    height: 359px;
    background: rgba(255, 255, 255, 0.7);
    box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.2);
    padding: 23px;
    p {
      font-size: 16px;
      font-family: MicrosoftYaHei, 微软雅黑;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
    }
    .clearfix {
      padding-left: 25px;
      li {
        float: left;
        width: 16%;
        margin-top: 20px;
        cursor: pointer;
        img {
          display: block;
          margin: auto;
          width: 100px;
          height: 87px;
        }
        h3 {
          padding: 7px 32px;
          font-size: 12px;
          font-family: MicrosoftYaHei, 微软雅黑;
          font-weight: 400;
          color: #999;
          text-overflow: ellipsis;
          white-space: nowrap;
          text-align: center;
          overflow: hidden;
        }
      }
    }
  }
}
</style>



