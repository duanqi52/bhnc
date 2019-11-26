<template>
  <div>
    <header>
      <span
        style="border-right: 4px solid #E3E3E3;display: inline-block;cursor: pointer;height: 64px;line-height: 64px;float: left;"
      >
        <i
          @click="show()"
          class="iconfont icon-shouqi"
          style="font-size: 26px;color: #999999;margin: 18px 0px;padding: 0 25px;"></i>
      </span>

      <img src="../../../static/img/hade_logo.png" alt id="logo" />
      <ul class="navigation">
        <li @click="toHref('')">
          <span>首页</span>
        </li>
        <li @click="toHref('brandLobby')">
          <span>品牌大厅</span>
        </li>
        <li @click="toHref('spotGoodsLobby')">
          <span>现货大厅</span>
        </li>
        <li @click="toHref('purchase')">
          <span>求购信息</span>
        </li>
        <li @click="toHref('proInof')">
          <span>供应信息</span>
        </li>
        <li @click="toHref('customerService')">
          <span>网站客服</span>
        </li>
      </ul>
      <ul class="used_id">
        <!-- <li @click="toHref('')">
          <i class="iconfont icon-shouye" style="color:#c0c0c0"></i>
          <span>首页</span>
        </li>
        <li @click="toHref('brandLobby')">
          <i class="iconfont icon-jifen"></i>
          <span>品牌大厅</span>
        </li>
        <li @click="toHref('spotGoodsLobby')">
          <i class="iconfont icon-xianhuo"></i>
          <span>现货大厅</span>
        </li>
        <a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=958022159&site=qq&menu=yes" style>
          <li>
            <i>
              <img src="../../../static/img/penguin.png" alt />
            </i>
            <span>客服QQ</span>
          </li>
        </a> -->
        <li @click="toProvider()">
          <i class="iconfont icon-qiehuan"></i>
          <span>供应商</span>
        </li>
        <li>
          <i class="iconfont icon-yonghufill"></i>
          <span>{{names.company_name}}</span>
        </li>
        <li @click="exit()">
          <i class="iconfont icon-tuichuzhuxiao"></i>
          <span>注销</span>
        </li>
      </ul>
    </header>
    <popup style="display:none" :wenz="wenz" :urls="urls" id="popup"></popup>
  </div>
</template>
<script>
import url from "@/serverAPI.config.js";
import popup from "../../components/popup/popup.vue";
export default {
  data() {
    return {
      // imgUrl:require('../../../static/img/header.png'),
      exitImg: require("../../../static/img/exit.png"),
      userName: "",
      userMsg: {},
      wenz:
        "亲爱的 用户，您还不是我们的供应商会员，申请成为供应商会员之后，介意查看平台上所有经销商的信息和进行采购报价，快来申请吧~",
      urls: `${url.shopUrl}/supIntroduce`,
      names: {}
    };
  },
  mounted() {
    this.userName = localStorage.getItem("siteName");
  },
  created() {
    this.getUserNames();
    //this.getUserMsg();
  },
  components: {
    popup
  },
  methods: {
    show() {
      if (document.getElementById("content").style.width == "97%") {
        if (document.getElementById("twoNav")) {
          document.getElementById("navBox").style.width = "17.63%";
          document.getElementById("content").style.width = "82.39%";
          document.getElementById("firstBox").style.width = "53.5%";
          document.getElementById("twoNav").style.width = "46.5%";
        } else {
          document.getElementById("navBox").style.width = "9.44%";
          document.getElementById("content").style.width = "90.56%";
          document.getElementById("firstBox").style.width = "100%";
          document.getElementById("twoNav").style.width = 0;
        }
      } else {
        document.getElementById("content").style.width = "97%";
        document.getElementById("navBox").style.width = "3%";
        document.getElementById("navBox").style.overflow = "hidden";
        document.getElementById("firstBox").style.width = "100%";
        document.getElementById("twoNav").style.width = 0;
      }
    },
    exit() {
      let _that = this;
      this.$confirm("是否退出?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "退出成功!"
          });
          localStorage.clear();
          location.href = `${url.dealerUrl}/shopAutomaticLogout`;
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    toProvider() {
      if (localStorage.roles.indexOf("provider") != -1) {
        var username = localStorage.getItem("siteName");
        var roles = localStorage.getItem("roles");
        var Authorization = localStorage.getItem("Authorization");
        var id = localStorage.getItem("ID");
        var href = `${url.supplierUrl}/jump?Authorization=${Authorization}&a=${username}&roles=${roles}&id=${id}`;
        window.open(href);
      } else {
        // this.$message.error("您还不是供应商");
        document.getElementById("popup").style.display = "";
      }
    },
    toShop() {
      // location.href = `http://182.61.148.122:30/index`;
      location.href = `${url.shopUrl}/index`;
    },
    getUserNames() {
      this.$http
        .get(`${url.getUserNames}/${localStorage.getItem("ID")}`)
        .then(res => {
          if (res.data.code == 20000) {
            this.names = res.data.data;
            localStorage.names = JSON.stringify(res.data.data);
          }
        });
    },
    getUserMsg() {
      this.$http
        .get(url.getUserMsg)
        .then(res => {
          this.userMsg = res.data.data;
          this.roles = res.data.data.roles;
          this.userMsg.other = JSON.parse(this.userMsg.other_img);
          this.userMsg.scope = JSON.parse(this.userMsg.scope);
          this.userMsg.fixPhone = JSON.parse(this.userMsg.fixPhone);
          this.userMsg.pattern = JSON.parse(this.userMsg.pattern);
          //this.UserID = res.data.data.id  用户ID
          this.userMsg.roles.map(item => {
            if (item.id == 1) {
              this.dealer = true;
            } else if (item.id == 2) {
              this.provider = true;
            }
          });
        })
        .catch(err => {
          console.log(err);
        });
    },

    toHref(urler) {
      var href = `${url.shopUrl}/` + urler;
      window.open(href);
    }
  }
};
</script>

<style lang="scss" scoped>
$red: #f00;
header {
  height: 64px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 1px 6px 0px rgba(0, 0, 0, 0.12);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  // background-image: url("../../../static/img/headerBgc@2x.png");
  // border-bottom: 20px rgba(61, 145, 231, 1) solid;
  // box-shadow: 0px 3px 7px 0px rgba(0, 0, 0, 0.28);
  // background-color: #3c597c;
}
#logo {
  // width: 184px;
  // height: 117px;
  margin-left: 65px;
  width: 165px;
  height: 35px;
  margin-top: 10px;
}
.used_id {
  list-style-type: none;
  padding: 0;
  display: inline-block;
  margin: 0;
  position: absolute;
  right: 50px;
  bottom: 0;
  height: 60px;
  line-height: 60px;
}
.used_id li {
  display: inline-flex;
  align-items: center;
  vertical-align: middle;
  margin: 0 10px;
  color: #fff;
  cursor: pointer;
  font-size: 14px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: #999999 !important;
  .exitImg {
    width: 25px;
    vertical-align: middle;
  }
  i {
    font-size: 25px;
    margin-right: 10px;
    color: #999999 !important;
  }
}

.bottom_border {
  margin-top: 60px;
  height: 20px;
  background: rgba(61, 145, 231, 1);
  box-shadow: 0px 3px 7px 0px rgba(0, 0, 0, 0.28);
}
.navigation{
  display: inline-block;
  margin-left: 50px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  li{
    display: inline-block;
    font-size:14px;
    font-family:Microsoft YaHei;
    font-weight:400;
    color:rgba(102,102,102,1);
    cursor: pointer;
    margin: 0 20px;
  }
}
</style>