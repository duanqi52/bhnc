<template>
  <div>
    <div style="border-bottom: 1px solid #FF0000;background-color: white;">
      <div style="height:31px;background:rgba(221,221,221,1);line-height: 31px;color:#666666;">
        <div style="width:1200px;margin:auto;font-size:12px;">
          <div style="display: inline-block;">
            <span style="cursor:default">笔海弄潮首页，欢迎来到笔海弄潮</span>
            <span
              style="margin: 0 30px;cursor: pointer;"
              @click="$router.push('/login')"
              v-if="!username"
            >请登录</span>
            <span style="cursor: pointer;" @click="toShopRegister" v-if="!username">免费注册</span>
            <span
              style="margin: 0 30px;cursor: pointer;"
              @click="toUserInfo()"
              v-else
            >您好,{{username}}</span>
          </div>
          <div style="display: inline-block;float: right;margin-right: 100px;" class="centerlist">
            <span style="margin-right: 50px;" @click="toDealerInfo()">采购中心</span>
            <span style="margin-right: 50px;" @click="toProviderInfo()">供应中心</span>
            <span style="margin-right: 50px;" @click="$router.push('/customerService')">客服中心</span>
            <span 
            @mousemove="siteNavigationShow($event)"
            @mouseout="siteNavigationHidden($event)" :class="{'active_site':NavigationShow}"
            ><i class="iconfont icon-sortlight" style="font-size: 12px;margin-right: 3px;"></i>网站导航<i class="el-icon-arrow-down el-icon--right"></i></span>
            <!-- 网站导航弹窗 -->
            <div class="siteNavigation" v-show="NavigationShow" @mousemove="siteNavigationShow()" @mouseout="siteNavigationHidden()">
              <div class="siteNavigation_a">
                <h4>特色市场</h4>
                <ul>
                  <li>钢笔</li>
                  <li>铅笔</li>
                  <li>毛笔</li>
                  <li>
                      塑料笔<img src="../../../static/img/H.gif" alt="">
                  </li>
                  <li>
                      金属笔<img src="../../../static/img/H.gif" alt="">
                  </li>
                  <li>
                      插套笔<img src="../../../static/img/H.gif" alt="">
                  </li>
                  <li>中性笔<img src="../../../static/img/H.gif" alt=""></li>
                  <li>圆珠笔<img src="../../../static/img/H.gif" alt=""></li>
                  <li>马克笔</li>
                  <li>宝珠笔</li>
                  <li>可擦笔</li>
                  <li>记号笔</li>
                  <li>白板笔</li>
                  <li>水彩笔</li>
                  <li>卡通笔</li>
                  <li>直杆笔</li>
                  <li>弹簧笔</li>
                  <li>单色笔</li>
                  <li>双色笔<img src="../../../static/img/H.gif" alt=""></li>
                  <li>三色笔</li>
                  <li>荧光笔</li>
                  <li>按动笔<img src="../../../static/img/H.gif" alt=""></li>
                  <li>扭扭笔<img src="../../../static/img/H.gif" alt=""></li>
                  <li>自动铅笔</li>
                </ul>
              </div>
              <div class="siteNavigation_b">
                <h4>特色栏目</h4>
                <ul>
                  <li @click="$router.push('./brandLobby')">品牌大厅</li>
                  <li @click="$router.push('./spotGoodsLobby')">现货大厅</li>
                  <li @click="toDealerInfo()">采购商中心</li>
                  <li @click="toProviderInfo()">供应商中心</li>
                  <li>关于我们</li>
                  <li>平台动态</li>
                  <li>帮助中心</li>
                  <li>联系我们</li>
                  <li>网站客服</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="header" style="width:1200px;margin:auto;">
        <a style="float: left;">
          <img
            src="../../../static/img/hade_logo.png"
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
            </li>
          </ul>
        </div>
        <div class="middle_hade">
          <!-- 搜索和二维码、购物车 -->
          <div class="header_search">
            <div class="header_searchs">
              <input
                type="text"
                placeholder="请输入关键词"
                v-model="input"
                class="searchInput"
                id="searchInput"
              />
              <button class="searchBtn" @click="search()">搜索</button>
            </div>
          </div>
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
      searchList: [],
      navList: [
        // { name: "首页", url: "index", active: false },
        // { name: "商品类型", url: "", active: false },
        // { name: "采购广场", url: "purchase", active: false },
        { name: "首页", url: "/", active: false },
        { name: "品牌大厅", url: "brandLobby", active: false },
        { name: "现货大厅", url: "spotGoodsLobby", active: false },
        { name: "求购信息", url: "purchase", active: false },
        { name: "供应信息", url: "proInof", active: false },
        { name: "网站客服", url: "customerService", active: false }
        // { name: "供应商会员简介", url: "supIntroduce", active: false },
        // { name: "经销商会员简介", url: "disIntroduce", active: false }
        // { name: "热销商品", url: "hotSellGoods", active: false },
        // { name: "最新商品", url: "newGoods", active: false },
        // { name: "精品仓", url: "boutiqueGoods", active: false }
      ],
      input: "",
      username: "",
      scopeList: [],
      cartridgeList: [],
      toggle: false,
      tabShow: 0,
      ids: [],
      imgUptime: false,
      imgUptimes: false,
      NavigationShow:false,
    };
  },
  computed: {},
  created() {
    setInterval(() => {
      this.username = localStorage.getItem("username");
    }, 10);

    if (localStorage.getItem("searchRecord"))
      this.searchList = JSON.parse(localStorage.getItem("searchRecord"));
    this.username = localStorage.getItem("username");
    this.getScope();
  },

  mounted() {
    var path = this.$route.path;
    this.navList.map(item => {
      if (path == item.url || (path == "/" + item.url && item.url)) {
        item.active = true;
      } else {
        item.active = false;
      }
      // if(item.url.indexOf("/") > -1){
      //   item.active = true;
      // }else{

      // }
    });
    document.addEventListener("click", e => {
      if (e.target.className != "shopClassifyBox") {
        this.toggle = false;
      }
    });
  },
  methods: {
    siteNavigationShow($event) {
      this.NavigationShow = true;
      $event.currentTarget.className="active_site"
    },
    siteNavigationHidden($event) {
      this.NavigationShow = false;
      $event.currentTarget.className=""
    },
    handleChange(event, item, index) {
      //   if (index == 1) {
      //     event.cancelBubble = true;
      //     this.toggle = !this.toggle;
      //     return;
      //   } else {
      //     this.navList[1].name = "商品类型";
      //   }
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
    search() {
      // this.navList.map(item => {
      //   if (item.name == this.navList[1].name) {
      //     item.active = true;
      //   } else {
      //     item.active = false;
      //   }
      // });
      // var scope = this.navList[1];
      // if (this.navList[1].name == "商品类型") {
      //   scope = "";
      // }
      if (this.searchList.indexOf(this.input) == -1 && this.input.length < 10)
        this.searchList.unshift(this.input);
      var searchRecord = [];
      for (var i = 0; i < 5; i++) {
        if (this.searchList[i]) searchRecord.push(this.searchList[i]);
      }
      this.searchList = searchRecord;
      localStorage.searchRecord = JSON.stringify(searchRecord);
      this.$router.push({
        path: "/springboard",
        query: { input: this.input, scope: "" }
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
        // url: `http://182.61.148.51:9008/scope`,
        url: `${url.scope}`,
        method: "get"
      })
        .then(res => {
          this.scopeList = res.data.data;
        })
        .catch(err => {
          console.log(err);
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
            console.log(err);
          });
      }

      if (index == "1") {
        this.$http({
          url: `${url.cartridgeScope}`,
          method: "get"
        })
          .then(res => {
            this.scopeList = res.data.data;
          })
          .catch(err => {
            console.log(err);
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
      if (
        localStorage.roles.indexOf("provider") != -1 &&
        this.$route.query.provideruserInfo != "1"
      ) {
        location.href = `${url.supplierUrl}/jump?Authorization=${Authorization}&a=${username}&roles=${roles}&id=${id}`;
        return;
      }
      if (localStorage.roles.indexOf("dealer") != -1) {
        location.href = `${url.dealerUrl}/jump?Authorization=${Authorization}&a=${username}&roles=${roles}&id=${id}`;
        return;
      }
      this.$router.push("/userInfo");
    },

    toDealerInfo() {
      var username = localStorage.getItem("username");
      var password = localStorage.getItem("password");
      var roles = localStorage.getItem("roles");
      var Authorization = localStorage.getItem("Authorization");
      var id = localStorage.getItem("ID");
      if (localStorage.roles.indexOf("dealer") != -1) {
        location.href = `${url.dealerUrl}/jump?Authorization=${Authorization}&a=${username}&roles=${roles}&id=${id}`;
        return;
      }
      this.$router.push("/disIntroduce");
    },

    toProviderInfo() {
      var username = localStorage.getItem("username");
      var password = localStorage.getItem("password");
      var roles = localStorage.getItem("roles");
      var Authorization = localStorage.getItem("Authorization");
      var id = localStorage.getItem("ID");
      if (localStorage.roles.indexOf("provider") != -1) {
        location.href = `${url.supplierUrl}/jump?Authorization=${Authorization}&a=${username}&roles=${roles}&id=${id}`;
        return;
      }

      this.$router.push("/supIntroduce");
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
      this.imgUptime = !this.imgUptime;
      var formData = new FormData();
      formData.append(`file`, event.target.files[0]);
      this.$http({
        url: `${url.searchGoods}`,
        method: "post",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" }
      }).then(res => {
        this.ids = JSON.stringify(res.data);
        setTimeout(() => {
          this.imgUptime = !this.imgUptime;
        }, 0);
        this.$router
          .push({
            path: "/springboard",
            query: { ids: this.ids }
          })
          .catch(err => {
            setTimeout(() => {
              this.imgUptimes = !this.imgUptimes;
            }, 0);
          });
      });
    },
    // 跳转商城注册页面
    toShopRegister(){
        location.href=`${url.shopUrl}/register`;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
$color: #d21d27;
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
    font-family: MicrosoftYaHei,微软雅黑;
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
        font-family: MicrosoftYaHei,微软雅黑;
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
  display: block;
  width: 100%;
  height: 36px;
  .header_searchs {
    width: 100%;
    height: 36px;
    background: white;
    border: 2px solid $color;
    border-radius: 4px;
    // display: inline-flex;
    position: relative;
    // align-items: center;
    .searchInput {
      margin-left: 16px;
      height: 30px;
      width: 70%;
    }
    .searchBtn {
      background: $color;
      width: 68px;
      height: 33px;
      color: white;
      position: absolute;
      right: 0px;
      top: 0px;
      font-size: 16px;
      z-index: 9999;
    }
    .uploading_s {
      position: absolute;
      opacity: 0;
      height: 100%;
      top: 0;
      width: 20px;
      right: 80px;
      z-index: 9;
      cursor: pointer !important;
    }
    .uploading {
      position: absolute;
      color: #999999;
      right: 80px;
      top: 7px;
      cursor: pointer !important;
      font-size: 20px;
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
  position: relative;
  height: 131px;
  .head_img {
    margin-top: 10px;
  }
}
.header_nav {
  display: inline-block;
  width: 48%;
  height: 36px;
  margin-top: 50px;
  margin-left: 25px;
  text-align: center;
  > ul {
    display: inline-block;
    font-size: 12px;
    font-family: MicrosoftYaHeiLight;
    font-weight: 300;
    color: rgba(51, 51, 51, 1);
    li {
      float: left;
      margin-right: 40px;
      cursor: pointer;
      font-size: 14px;
    }
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
.middle_hade {
  width: 350px;
  display: inline-block;
  margin-top: 40px;
  float: right;
}
.shoppingCart {
  position: absolute;
  width: 120px;
  height: 80px;
  background: #f8fbfe;
  border: 1px solid #e0edfb;
  border-radius: 8px;
  display: inline-block;
  right: 15px;
  top: 25px;
  span {
    font-size: 12px;
    font-family: MicrosoftYaHeiLight;
    font-weight: 300;
    color: rgba(102, 102, 102, 1);
  }
  img {
  }
}
.rests {
  margin: 10px 0;
  span {
    font-size: 12px;
    font-family: MicrosoftYaHeiLight;
    font-weight: 300;
    color: rgba(153, 153, 153, 1);
    margin-right: 10px;
  }
}
.centerlist {
    display: inline-block;
    float: right;
    margin-right: 100px;
    position: relative;
  span {
    cursor: pointer;
    height: 100%;
    display: inline-block;
    padding: 0 10px
  }
}
.allcategories {
  display: inline-block;
  width: 220px;
  height: 36px;
  background: rgba(210, 29, 39, 1);
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.16);
  border-radius: 2px 2px 0px 0px;
  position: relative;
  font-size: 12px;
  font-family: MicrosoftYaHei,微软雅黑;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 36px;
  cursor: pointer;
  .allcategories_i {
    position: absolute;
    left: 30%;
    transform: translateX(-50%);
    font-size: 14px;
  }
  span {
    position: absolute;
    left: 54%;
    transform: translateX(-50%);
  }
}
.ruzhu {
  display: inline-block;
  position: absolute;
  right: 15px;
  img {
    margin-left: 30px;
    cursor: pointer;
  }
}
//网站导航弹窗
.siteNavigation{
  width:852px;
  height:262px;
  background:rgba(246,246,246,1);
  // border-right: 1px solid #999999;
  // border-left: 1px solid #999999;
  // border-bottom: 1px solid #999999;
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.14);
  position: absolute;
  z-index: 999999;
  right: 0;
  padding: 20px;
    .siteNavigation_a{
      width: 48%;
      display: inline-block;
      border-right: 1px dashed #E0E0E0;
      height: 100%;
      h4{
        font-size:14px;
        font-family:MicrosoftYaHei,微软雅黑;
        font-weight:400;
        color:rgba(210,29,39,1);
      }
      ul{
        display: inline-block;
        li{
          display: inline-block;
          min-width: 15%;
          cursor: pointer;
          height: 40px;
          line-height: 50px;
        }
      }
    }
    .siteNavigation_b{
      width: 49%;
      display: inline-block;
      height: 100%;
      float: right;
      h4{
        font-size:14px;
        font-family:MicrosoftYaHei,微软雅黑;
        font-weight:400;
        color:rgba(210,29,39,1);
      }
      ul{
        display: inline-block;
        li{
          display: inline-block;
          margin-right: 28px;
          cursor: pointer;
          height: 40px;
          line-height: 50px;
        }
      }
    }
}
.active_site{
    background: #f6f6f6;
    // border-right: 1px solid #999999;
    // border-left: 1px solid #999999;
    box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.14);
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
