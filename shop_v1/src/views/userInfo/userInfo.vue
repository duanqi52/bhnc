<template>
  <div>
    <!-- 头部 -->
    <Headers></Headers>
    <div class="userBox clearfix">
      <div class="w">
        <div class="userBoxLeft">
          <div class="userLeftTitle">
            <h3>用户资料</h3>
          </div>
          <div class="userNav">
            <el-menu router align="center" border="1px solid #fff" class="el-menu-vertical-demo">
              <el-menu-item
                v-for="(nav,index) in list"
                :key="index"
                @click="initActive = false"
                :class="(initIndex == index && initActive) ?'is-active':''"
                :index="nav.url"
              >
                <span
                  slot="title"
                  style="padding-left:21px;text-align:left;width:100px;"
                >{{nav.name}}</span>
              </el-menu-item>
            </el-menu>
          </div>
        </div>
        <div class="userBoxRight">
          <router-view></router-view>
        </div>
      </div>
    </div>
    <Footer style="margin: unset;"></Footer>
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
      //   用户导航栏
      list: [
        {
          name: "个人中心",
          url: "/userCenter"
        },
        {
          name: "我的求购信息",
          url: "/buyInfo"
        },
        {
          name: "我的足迹",
          url: "/myFootprint"
        },
        {
          name: "收藏夹",
          url: "/userFavorite"
        }
      ],
      currentMenu: "1",
      initActive: true,
      initIndex: 0
    };
  },
  components: {
    Headers,
    Footer
  },
  created() {
    if (location.href.indexOf("userCenter") > -1) {
      this.initIndex = 0;
    }
    if (location.href.indexOf("buyInfo") > -1) {
      this.initIndex = 1;
    }
    if (location.href.indexOf("myFootprint") > -1) {
      this.initIndex = 2;
    }
    if (location.href.indexOf("userFavorite") > -1) {
      this.initIndex = 3;
    }
  },
  mounted() {
    //   console.log(document.getElementById('active0'))
    //   document.getElementById('active0').click();
  },
  methods: {}
};
</script>


<style  lang="scss">
.header_tab .el-table th .cell {
  font-weight: bold !important;
  color: #666666 !important;
}
.header_tab .el-table th,
.el-table tr {
  border-bottom: 2px solid !important;
}

.userBox {
  .userNav {
    .el-menu {
      height: 100%;
      background-color: transparent;
      li:hover {
        background-color: #f3bea8;
      }
    }
    .el-menu-item {
      height: 48px;
      line-height: 48px;
      text-align: left;
      font-size: 16px;
      font-family: MicrosoftYaHei, 微软雅黑;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      padding: 0 27px;
      transition: none;
    }
    .is-active {
      background-color: #fc9263;
      color: #fff;
    }
  }
}
</style>

<style lang="scss" socped>
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
        margin-bottom: 10px;
      }
    }
    .userNav {
      height: 663px;
      background-color: #f8f8f8;
    }
  }
  .userBoxRight {
    float: left;
    width: 928px;
  }
}
</style>



