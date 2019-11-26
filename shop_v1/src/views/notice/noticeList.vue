<template>
  <div class="noticeList">
    <div class="siteNavTitle w">平台动态</div>
    <div class="siteNavContent w">
      <div
        class="listDetails"
        v-for="(item,index) in noticeList"
        :key="index"
        @click="toNoticeDetail(item.id)"
      >
        <h4>{{item.title}}</h4>
        <div class="noticeCon" v-html="item.content" style></div>
        <p class="noticeTime">{{item.send_date}}</p>
      </div>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[20, 40,60,80]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        style="border-bottom: 1px solid #f2f2f2;text-align: center;padding: 30px;width: 1200px;margin: 0 auto;background-color: white;"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import url from "@/serverAPI.config.js";

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
  // 数据
  data() {
    return {
      currentPage: 1,
      pagesize: 20,
      total: 0,
      noticeList: []
    };
  },
  methods: {
    handleSizeChange(size) {
      this.pagesize = size;
        this.getNoticeList(this.currentPage, this.pagesize);
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.getNoticeList(this.currentPage, this.pagesize);
    },
    getNoticeList(page, size) {
      this.$http({
        url: `${url.findNotices}/${page}/${size}`,
        method: "get"
      }).then(res => {
        if (res.data.code == 20000) {
          this.total = res.data.data.total;
          this.noticeList = res.data.data.rows;
        }
      });
    },
    toNoticeDetail(id) {
      this.$router.push({
        path: "/notice",
        query: { id: id }
      });
    },
  },
  // 组件
  components: {},

  created() {
    this.getNoticeList(1, 20);
  },
  mounted() {},

  updated() {}
};
</script>

<style lang="scss" scope>
// 域样式
.w {
  width: 1200px;
  margin: auto;
}
.fl {
  float: left;
}
.fr {
  float: right;
}
.noticeList {
  .siteNavTitle {
    height: 80px;
    line-height: 80px;
    padding-left: 35px;
    background: rgba(255, 255, 255, 0.48);
    box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.28);
    margin-top: 4px;
    margin-bottom: 12px;
    font-size: 22px;
    font-family: Microsoft YaHei, 微软雅黑;
    font-weight: bold;
    color: rgba(102, 102, 102, 1);
  }
  .siteNavContent {
    .listDetails {
      padding: 0 40px;
      padding-top: 26px;
      background-color: #f8f8f8;
      box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.14);
      margin-bottom: 4px;
      cursor: pointer;
      h4 {
        font-size: 20px;
        font-family: Microsoft YaHei, 微软雅黑;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        padding-bottom: 14px;
      }
      .noticeCon {
        width: 555px;
        font-size: 16px;
        font-family: Microsoft YaHei, 微软雅黑;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        padding-bottom: 46px;
        height: 18px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        > p {
          display: none;
        }
        > p:nth-child(1) {
          display: block;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
        img {
          display: none;
        }
      }
      .noticeTime {
        font-size: 16px;
        font-family: Microsoft YaHei, 微软雅黑;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        padding-bottom: 24px;
      }
    }
  }
}
</style>
<style lang="scss">
// 全局样式
</style>
