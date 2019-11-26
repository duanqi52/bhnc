<template>
  <div>
    <div>
      <div class="header">
        <a>
          <img
            src="../../static/img/hade_logo.png"
            @click="handleChange($event, { name: '首页', url: 'index', active: false },0)"
            alt
            class="head_img"
          />
        </a>
        <!-- 头部导航栏 -->
        <div class="header_nav">
          <ul class="clearfix">
            <li
              v-for="(item,index) in navList "
              :key="index"
              :class="item.active ? 'active':''"
              @click="handleChange($event,item,index)"
            >
              <a>{{item.name}}</a>
              <i class="el-icon-caret-bottom" v-show="index==1?true:false"></i>
            </li>
          </ul>
        </div>
        <!-- 商品类型 -->
        <div class="shopClassifyBox" v-show="toggle" @click.stop="cancelBuble">
          <div class="shopClassify">
            <div class="shopClassTitle">
              <p
                class="shopClassify_ttile"
                v-for="(tabItem,tabIndex) in searchList"
                :key="tabIndex"
                @click="handleTab(tabItem,tabIndex)"
                :class="{'tabActive':tabShow==tabIndex}"
              >{{tabItem }}</p>
            </div>
            <div class="shopClassify_content">
              <ul>
                <li
                  v-for="(scope,index) in scopeList"
                  :key="index"
                  @click="searchScop(scope.name)"
                >{{scope.name}}</li>
              </ul>
            </div>
          </div>
          <!-- <div class="shopClassify">
            <p class="shopClassify_ttile">笔芯</p>
            <div class="shopClassify_content">
              <ul>
                <li v-for="(cartridge,index) in cartridgeList" :key="index">{{cartridge}}</li>
              </ul>
            </div>
          </div>-->
        </div>
        <!-- 登录注册 -->
        <div class="fr" v-if="!username">
          <router-link to="login" class="auth">登录</router-link>
          <router-link to="dealersAndSu" class="auth">注册</router-link>
        </div>
        <div class="fr" v-else>
          您好,{{username}}
          <a @click="toUserInfo()" class="auth">用户中心</a>
          <a to class="auth" @click="exit()">注销</a>
        </div>
        <!-- 搜索和二维码、购物车 -->
        <div class="header_search">
          <div class="header_searchs">
            <input type="text" placeholder="请输入关键词" v-model="input" class="searchInput" />
            <button class="searchBtn el-icon-search" @click="search()"></button>
            <label class="labelTest">
              <input type="file" class="uploading_s" accept="image/*" @change="imgUpload($event)" />
              <i class="el-icon-camera uploading"></i>
            </label>
          </div>
          <img
            src="../../static/img/hade_logo _er.png"
            alt
            @mouseover="toggleShow()"
            @mouseout="toggleShow()"
          />
          <img
            src="../../static/img/yard.png"
            alt
            style="position: absolute;right: 15px;top: 30px;z-index: 99999;"
            v-show="show2"
          />
          <a @click="toShoppingTrolley()" style="display: inherit;">
            <img src="../../static/img/hade_logo _car.png" alt />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import url from "@/serverAPI.config.js";
export default {
  components: {},
  data() {
    return {
      searchList: ["成品笔", "笔芯", "笔配件"],
      navList: url.navList,
      show2: false,
      input: "",
      username: "",
      scopeList: [],
      cartridgeList: [],
      toggle: false,
      tabShow: 0,
      ids: []
    };
  },
  computed: {},
  created() {
    this.username = localStorage.getItem("username");
    this.getScope();
  },
  mounted() {
    var path = location.href;
    this.navList.map(item => {
      if (path.toString().indexOf(item.url) > 0) {
        item.active = true;
      } else {
        item.active = false;
      }
    });
    document.addEventListener("click", e => {
      if (e.target.className != "shopClassifyBox") {
        this.toggle = false;
      }
    });
  },
  methods: {
    handleChange(event, item, index) {
      if (index == 1) {
        event.cancelBubble = true;
        this.toggle = !this.toggle;
        return;
      } else {
        this.navList[1].name = "商品类型";
      }
      this.navList.map(item1 => {
        if (item1.name == item.name) {
          item1.active = true;
        } else {
          item1.active = false;
        }
      });

      this.$router.push(item.url);
      this.$forceUpdate();
    },
    toShoppingTrolley() {
      this.navList.map(item => {
        item.active = false;
      });
      this.$router.push("shoppingTrolley");
    },
    toggleShow() {
      this.show2 = !this.show2;
    },
    search() {
      this.navList.map(item => {
        if (item.name == this.navList[1].name) {
          item.active = true;
        } else {
          item.active = false;
        }
      });
      var scope = this.navList[1];
      if (this.navList[1].name == "商品类型") {
        scope = "";
      }
      this.$router.push({
        path: "/springboard",
        query: { input: this.input, scope: scope }
      });
    },
    searchScop(scope, index) {
      this.navList.map(item => {
        this.toggle = false;
        if (item.name == this.navList[1].name) {
          item.name = scope;
          item.active = true;
        } else {
          item.active = false;
        }
      });
      this.$router.push({
        path: "/springboard",
        query: { scope: scope, input: "" }
      });
    },
    //获取经营范围
    getScope() {
      this.$http({
        url: `${url.scope}`,
        method: "get"
      })
        .then(res => {
          this.scopeList = res.data.data;
        })
        .catch(err => {
        });
    },

    changeType(index) {
      if (index == "2") {
        this.$http({
          url: `${url.mountingsScope}`,
          method: "get"
        })
          .then(res => {
            this.scopeList = res.data.data;
          })
          .catch(err => {
          });
      }

      if (index == "1") {
        this.$http({
          url: `${url.scope}/cartridgeScope`,
          method: "get"
        })
          .then(res => {
            this.scopeList = res.data.data;
          })
          .catch(err => {
          });
      }

      if (index == "0") {
        this.getScope();
      }
    },

    //退出
    exit() {
      this.$confirm("是否退出?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          localStorage.removeItem("ID");
          localStorage.removeItem("username");
          localStorage.removeItem("roles");
          localStorage.removeItem("remember");
          localStorage.removeItem("Authorization");
          this.$message({
            type: "success",
            message: "退出成功!"
          });
          location.reload();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    toUserInfo() {
      var username = localStorage.getItem("username");
      var password = localStorage.getItem("password");
      var roles = localStorage.getItem("roles");
      var Authorization = localStorage.getItem("Authorization");
      var id = localStorage.getItem("ID");
      var expireTime = localStorage.getItem("expireTime");
      if (!username) {
        this.getUserInfo();
        return;
      }
      if (
        localStorage.roles.indexOf("provider") != -1 &&
        this.$route.query.provideruserInfo != "1"
      ) {
        var href = `${url.supplierUrl}/jump?Authorization=${Authorization}&a=${username}&roles=${roles}&id=${id}&expireTime=${expireTime}`;
        window.open(href);
        return;
      }
      if (localStorage.roles.indexOf("dealer") != -1) {
        var href = `${url.dealerUrl}/jump?Authorization=${Authorization}&a=${username}&roles=${roles}&id=${id}&expireTime=${expireTime}`;
        window.open(href);
        return;
      }
      this.$router.push("/userInfo");
    },
    // 点击商品区域,阻止事件冒泡
    cancelBuble() {},
    //   点击商品标题实现tab栏切换
    handleTab(item, index) {
      this.tabShow = index;
      this.changeType(index);
    },
    //img
    imgUpload(event) {
      var formData = new FormData();
      formData.append(`file`, event.target.files[0]);
      this.$http({
        url: `${url.searchGoods}`,
        method: "post",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" }
      }).then(res => {
        this.ids = JSON.stringify(res.data.data);

        this.$router.push({
          path: "/springboard",
          query: {ids: res.data.data.length}
        });
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
$color: rgb(61, 145, 231);
.tabActive {
  color: rgba(61, 145, 231, 1);
}
.header {
  position: relative;
}
.shopClassifyBox {
  position: absolute;
  top: 150px;
  z-index: 100;
  display: flex;
  width: 100%;
  justify-content: space-around;
  background-color: #ffffff;
  text-align: center;
  padding-bottom: 30px;
  .shopClassify_ttile {
    margin: 20px 0;
    height: 45px;
    line-height: 45px;
    font-size: 20px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
  }
  > div {
    width: 100%;
    ul {
      display: flex;
      flex-wrap: wrap;

      li {
        width: 20%;
        height: 65px;
        line-height: 65px;
        cursor: pointer;
        font-size: 16px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
      }
    }
  }
  //   div:nth-child(1) p {
  //     border-right: 2px dashed rgb(102, 102, 102);
  //   }
}
.header_search {
  display: inline-flex;
  align-items: center;
  position: absolute;
  right: 0;
  bottom: 21px;
  padding-right: 20px;
  .header_searchs {
    width: 215px;
    height: 25px;
    background: white;
    border: 2px solid #3d91e7;
    border-radius: 18px;
    display: inline-block;
    margin-right: 20px;
    position: relative;
    .searchInput {
      margin-left: 16px;
    }
    .searchBtn {
      width: 20px;
      height: 20px;
      background: white;
      color: $color;
      font-weight: bold;
      position: absolute;
      right: 10px;
    }
    .uploading_s {
      position: absolute;
      opacity: 0;
      width: 15px;
      right: 35px;
      z-index: 9;
      cursor: pointer !important;
    }
    .uploading {
      position: absolute;
      color: #3d91e7;
      right: 35px;
      top: 2px;
      cursor: pointer !important;
    }
  }
  img {
    display: inline-block;
    margin-left: 20px;
    cursor: pointer;
  }
}
.fr {
  float: right;
  font-size: 14px;
  font-family: MicrosoftYaHeiLight;
  font-weight: 300;
  margin-top: 10px;
  padding-right: 20px;
  a {
    color: #cccccc !important;
    margin-left: 10px;
  }
}
.header {
  // width: 1200px;
  margin: 0 auto;
  position: relative;
  .head_img {
  }
}
.header_nav {
  display: inline-block;
  > ul > li {
    float: left;
    margin: 0 20px;
    font-size: 16px;
    font-family: MicrosoftYaHeiLight;
    font-weight: 300;
    color: rgba(51, 153, 255, 1);
    margin-left: 30px;
    cursor: pointer;
    line-height: 30px;
  }
}
.active {
  color: $color;
  border-bottom: 2px solid $color;
}

.shopClassTitle {
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid #ccc;
  p {
    width: 100px;
    cursor: pointer;
  }
}
.shopClassifyBox div:nth-child(1) p:nth-last-child(1) {
  // border: none;
}
</style>
<style>
.el-header {
  padding: 0;
}
.labelTest {
  cursor: pointer;
}
</style>
