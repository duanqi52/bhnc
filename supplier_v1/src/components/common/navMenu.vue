<template>
  <div class="clearfix" style="height: 100%;" id="clearfix">
    <div class="nav-menu" style="width:53.5%;float:left;" id="firstBox">
      <div class="nav-box">
        <ul>
          <div v-for="(nav,index) in list" :key="index">
            <li
              @click="handleFirstNav(nav,index)"
              :style=" index == twoIndex?'background: #FC9263;color:#FFFFFF':'color:#666666'"
              style="height: 47px;cursor: pointer;"
              v-if="nav.isRoles"
            >
              <i :class="nav.icon" class="iconfont" style="padding-right:20px;"></i>
              <!-- <span slot="title" style="padding-left:21px;text-align:left;width:100px;">{{nav.name}}</span> -->
              {{nav.name}}
            </li>
          </div>
        </ul>
      </div>
    </div>
    <div
      class="nav-menu subMenu"
      id="twoNav"
      style="width:46.5%;float:right;background:#fafafa;"
      v-if="twoList[twoIndex].length > 0"
    >
      <div class="nav-box">
        <ul>
          <div v-for="(nav,index) in twoList[twoIndex]" :key="index"> 
            <li
              v-if="nav.isRoles"
              @click="twoActiveIndex = index;$router.push(nav.url)"
              :style=" index == twoActiveIndex?'color:#FC9263':'color:#666666'"
              style="height: 47px;cursor: pointer;padding-left:0;    text-align: center;"
            >
              <span>{{nav.name}}</span>
            </li>
          </div>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import url from "@/serverAPI.config.js";
import { log } from 'util';
export default {
  name: "aaa",
  data() {
    return {
      currentMenu: "",
      list: [
        {
          name: "主页",
          url: "/",
          icon: "icon-home_light",
          isRoles: true
        },
        {
          name: "采购商",
          url: "/supplier",
          icon: "icon-wuliu",
          isRoles: false
        },
        {
          name: "求购信息",
          url: "/purchase",
          icon: "icon-cart_light",
          isRoles: false
        },
        {
          name: "供应信息",
          url: "/provisionInfo",
          icon: "icon-gongying",
          isRoles: false
        },
        {
          name: "商品",
          url: "/commodity",
          icon: "icon-shop",
          isRoles: false
        },
        {
          name: "积分",
          url: "/integral",
          icon: "icon-album",
          isRoles: false
        },
        {
          name: "账号",
          url: "/user",
          icon: "icon-my_light",
          isRoles: false
        },
        {
          name: "营销工具",
          url: "/marketingEnter",
          icon: "icon-moneybag",
          isRoles: false
        },
        {
          name: "消息中心",
          url: "/news",
          icon: "el-icon-chat-line-round",
          isRoles: false
        }
      ],
      twoList: [
        [],
        [
          {
            name: "全部采购商",
            pid: 11,
            id: 1,
            url: "/supplier",
            icon: "icon-home_light",
            isRoles: false
          },
          {
            name: "合作的采购商",
            pid: 11,
            id: 2,
            url: "/cooperativeDealer",
            icon: "icon-home_light",
            isRoles: false
          },
          {
            name: "收藏的采购商",
            pid: 11,
            id: 3,
            url: "/conllectionDealer",
            icon: "icon-home_light",
            isRoles: false
          }
        ],
        [
          //   {
          //     name: "我的求购信息",
          //     pid: 11,
          //     id: 1,
          //     url: "/purchase",
          //     icon: "icon-home_light"
          //   },
          //   {
          //     name: "发布求购信息",
          //     pid: 11,
          //     id: 2,
          //     url: "/pur_release",
          //     icon: "icon-home_light"
          //   }
        ],
        [],
        [
          {
            name: "我的商品",
            url: "/commodity",
            icon: "icon-home_light",
            isRoles: false
          },
        //   {
        //     name: "已发布商品",
        //     url: "/releasedCmd",
        //     icon: "icon-home_light",
        //     isRoles: false
        //   },
        //   {
        //      name: "未上架商品",
        //      url: "/notPutaWay",
        //      icon: "icon-home_light",
        //      isRoles: false
        //   },
		    //  {
		    //     name: "现货商品",
		    //     url: "/spotCommodity",
		    //     icon: "icon-home_light",
		    //     isRoles: false
		    //  },
          {
            name: "收藏的商品",
            pid: 11,
            id: 1,
            url: "/collection",
            icon: "icon-home_light",
            isRoles: false
          },
          {
            name: "我的足迹",
            pid: 11,
            id: 2,
            url: "/myFootprint",
            icon: "icon-home_light",
            isRoles: false
          },
          // {
          //   name: "草稿箱",
          //   url: "/drafts",
          //   icon: "icon-home_light",
          //   isRoles: false
          // }
        ],
        [
          {
            name: "积分",
            url: "/Integral",
            isRoles: false
          },
          {
            name: "会员等级",
            url: "/upVip",
            isRoles: false
          },
          {
            name: "充值",
            url: "/recharge",
            isRoles: false
          },
          {
            name: "卡券",
            url: "/coupon",
            isRoles: false
          }
        ],
        [
          {
            name: "企业信息",
            url: "/user",
            isRoles: false
          },
          {
            name: "我的品牌",
            url: "/myBrand",
            isRoles: false
          },
          {
            name: "子账号",
            url: "/subAccountList",
            isRoles: false
          },
          {
            name: "职位管理",
            url: "/positionManagment",
            isRoles: false
          }
        ],
        [],
        []
      ],
      twoIndex: 0,
      twoActiveIndex: 0
    };
  },
  watch: {
    $route(to, from) {
      //this.getPath();
    },


  },
  computed: {

  },
  mounted() {
    this.handleNav();
  },
  created() {
    this.handleNav();
    this.rolesUrl();
    this.getUserLoginInfo();
  },
  updated() {
    this.rolesUrl();
  },
  methods: {
    handleFirstNav(nav, index) {   
      this.twoIndex = index;
      this.twoActiveIndex = 0;
      this.$router.push(nav.url);
    },
    rolesUrl() {
      var urls = localStorage.getItem("urls");    
      if (!urls) {
        return;
      }
      if (urls == "All") {    
        this.list.map(item => {
          item.isRoles = true;
        });
        this.twoList.map(item => {
          item.map(item1 => {
            item1.isRoles = true;
          });
        });        
        return;
      } else {
        var urls = JSON.parse(localStorage.getItem("urls"));
        urls.map(u => {

          this.list.map(item => {  
            if (item.url == u || "/" + item.url == u) {       
              item.isRoles = true;
            }
          });
          var i = 0;
          this.twoList.map(item => {
            var j = 0;
            item.map(item1 => {                   
              if (item1.url == u || "/" + item1.url == u) {

                item1.isRoles = true;
                if (!this.list[i].isRoles) {                  
                  this.list[i].isRoles = true;
                  this.list[i].url = u;                 
                }
              }
            });
            i++;
          });          
        });

      }
    },
    handleNav() {  
      for (var i = 0; i < this.list.length; i++) {           
        if (this.$route.path == this.list[i].url) {
          this.twoIndex = i;
        }
      }
      for (var i = 0; i < this.twoList.length; i++) {     
        if(this.twoList[i].length>0){      
          for (var j = 0; j < this.twoList[i].length; j++) {                              
                    if (this.$route.path == this.twoList[i][j].url) {                                 
                      this.twoIndex = i;
                      this.twoActiveIndex = j;
                    }
           }
        }      
      } 
    },
    getUserLoginInfo() {
      this.$http({
        url: `${url.getUserLoginInfo}`,
        method: "get"
      }).then(res => {
        if (res.data.code == 20000) {
          if (res.data.data.urls) {
            localStorage.urls = res.data.data.urls;
          } else {
            localStorage.removeItem("urls");
          }

          if (res.data.data.sonName) {
            localStorage.sonName = res.data.data.sonName;
          } else {
            localStorage.removeItem("sonName");
          }

          if (res.data.data.sonUsername) {
            localStorage.sonUsername = res.data.data.sonUsername;
          } else {
            localStorage.removeItem("sonUsername");
          }

          if (res.data.data.job) {
            localStorage.job = res.data.data.job;
          } else {
            localStorage.removeItem("job");
          }

          if (res.data.data.sonId) {
            localStorage.sonId = res.data.data.sonId;
          } else {
            localStorage.removeItem("sonId");
          }
          this.rolesUrl();
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
.nav-menu {
  //   position: absolute;
  //   top: 0;
  //   left: 0;
  width: 100%;
  height: 100%;
  .nav-box {
    width: 100%;
    height: 100%;

    ul {
      height: 100%;
      li {
        line-height: 47px;
        padding-left: 20px;
        font-family: MicrosoftYaHei,微软雅黑;
        font-weight: 400;
        // text-overflow: clip;
        overflow: hidden;
      }
    }
  }
}
.el-menu {
  border: none;
}
.subMenu .el-menu {
  background: transparent;
}
</style>

<style>
/* .nav-menu .el-menu-item{
 height: 75px;
    line-height: 75px;
} */
</style>
