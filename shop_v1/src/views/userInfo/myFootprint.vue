<template>
  <div id="bhncMyFootprint">
    <div class="header_search">
      <div class="header_search_wei">
        <span>我的足迹</span>
      </div>
      <!-- <button class="warning">删除</button> -->
    </div>
    <ul class="print_list" v-if="footprintList.length > 0">
      <li v-for="(item,index) in footprintList" :key="index">
        <label>
          <img :src="item.img[0]" alt @click.stop="toDetail(item)" />
          <p>{{item.title}}</p>
          <div class="print_time">
            <span>{{item.date}}</span>
            <!-- <input type="checkbox" /> -->
          </div>
        </label>
      </li>
    </ul>
    <ul class="print_list" v-else>
      <p style="text-align: center;padding-top: 30px;">暂无足迹</p>
    </ul>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 15]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      style="text-align: center;margin-top: 10px;height: 52px;"
    ></el-pagination>
  </div>
</template>

<script>
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
  data() {
    return {
      currentPage: 1, //初始页
      pagesize: 15,
      total: 0, //    每页的数据
      footprintList: []
    };
  },
  components: {},
  created() {
    this.getMyFootprintList(this.currentPage, this.pagesize);
  },
  methods: {
    //初始化currentPage,初始每页数据pagesize和数据data
    handleSizeChange(size) {
      this.pagesize = size;
      this.getMyFootprintList(this.currentPage, this.pagesize);
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage; // 点击第几页
      this.getMyFootprintList(this.currentPage, this.pagesize);
    },
    getMyFootprintList(page, size) {
      var uId = localStorage.getItem("ID");
      this.$http({
        url: `${url.findMyFootprint}/${uId}/${page}/${size}`,
        method: "get"
      }).then(res => {
        if (res.data.code == 20000) {
          var data = res.data.data.rows;
          data.map(item => {
            item.img = JSON.parse(item.img);
            item.date = this.formatDate(item.date);
          });
          this.footprintList = data;
          this.total = parseInt(res.data.data.total);
        }
      });
    },
    //时间格式转化
    formatDate(date) {
      var time = new Date(parseFloat(date));
      var timeStr =
        time.getFullYear() +
        "-" +
        (time.getMonth() + 1) +
        "-" +
        time.getDate() +
        " " +
        ((time.getHours() + "").length == 1
          ? "0" + time.getHours()
          : time.getHours()) +
        ":" +
        ((time.getMinutes() + "").length == 1
          ? "0" + time.getMinutes()
          : time.getMinutes()) +
        ":" +
        ((time.getSeconds() + "").length == 1
          ? "0" + time.getSeconds()
          : time.getSeconds());

      return timeStr;
    },
    toDetail(goods) {
      this.utils.toDetailsss(goods);
    }
  }
};
</script>

<style lang="scss" scoped>
#bhncMyFootprint {
  background-color: white;
  height: 729px;
  .header_search {
    background-color: #fbfbfb;
    line-height: 56px;
    height: 56px;
    .header_search_wei {
      display: inline-block;
      span {
        font-size: 16px;
        font-family: MicrosoftYaHei, 微软雅黑;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        border-left: 2px solid #fc7336;
        margin-left: 36px;
        padding-left: 11px;
      }
    }
    .warning {
      width: 100px;
      height: 28px;
      background: rgba(252, 146, 99, 1);
      border-radius: 8px;
      font-size: 14px;
      font-family: MicrosoftYaHei, 微软雅黑;
      font-weight: 400;
      color: rgba(248, 248, 248, 1);
      margin-right: 20px;
      margin-top: 14px;
      float: right;
    }
  }
  .print_list {
    min-height: 621px;
    background-color: #fbfbfb;
    li {
      display: inline-block;
      text-align: center;
      width: 152px;
      height: 175px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.04);
      padding: 10px;
      margin: 10px 16px;
      img {
        width: 132px;
        height: 116px;
        display: inline-block;
      }
      p {
        font-size: 14px;
        font-family: MicrosoftYaHei, 微软雅黑;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      .print_time {
        display: inline-block;
        span {
          font-size: 12px;
          font-family: MicrosoftYaHei, 微软雅黑;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
        }
        input[type="checkbox"] {
          width: 16px;
          height: 16px;
          display: inline-block;
          text-align: center;
          vertical-align: middle;
          line-height: 15px;
          position: relative;
          cursor: pointer;
        }
        input[type="checkbox"]::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          background: #fff;
          width: 100%;
          height: 100%;
          border: 1px solid #d9d9d9;
          cursor: pointer;
        }
        input[type="checkbox"]:checked::before {
          content: "\2713";
          background-color: #fff;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          border: 1px solid #e50232;
          color: #e50232;
          font-size: 15px;
          font-weight: bold;
          cursor: pointer;
        }
      }
    }
  }
}
</style>