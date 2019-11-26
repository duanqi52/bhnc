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
      :page-sizes="[24, 32, 40]"
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
  data() {
    return {
      currentPage: 1, //初始页
      pagesize: 24,
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
      window.open(`${url.detailUrl}/details?id=` + goods.id);
    }
  }
};
</script>


<style lang="scss">
  #bhncMyFootprint  .el-pager li.active {
    color: #fc9263;
}
</style>

<style lang="scss" scoped>
#bhncMyFootprint {
  background-color: white;
  .header_search {
    line-height: 68px;
    height: 68px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.04);
    border-bottom: 1px solid #e8e8e8;
    .header_search_wei {
      display: inline-block;
      span {
        margin-left: 48px;
        font-size: 20px;
        font-family: MicrosoftYaHeiLight;
        font-weight: bold;
        color: rgba(102, 102, 102, 1);
      }
    }
    .warning {
      width: 100px;
      height: 28px;
      background: rgba(252, 146, 99, 1);
      border-radius: 8px;
      font-size: 14px;
      font-family: MicrosoftYaHei,微软雅黑;
      font-weight: 400;
      color: rgba(248, 248, 248, 1);
      margin-right: 20px;
      margin-top: 14px;
      float: right;
    }
  }
  .print_list {
    min-height: 855px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.04);
    li {
      display: inline-block;
      text-align: center;
      width: 203px;
      height: 247px;
      padding: 12px 14px;
      margin: 14px 27px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.08);
      cursor: pointer;

      img {
        width: 175px;
        height: 175px;
        display: inline-block;
        cursor: pointer;

      }
      p {
        font-size: 16px;
        font-family: MicrosoftYaHei,微软雅黑;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        margin: 5px 0;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        cursor: pointer;

      }
      .print_time {
        display: inline-block;
        span {
          font-size: 14px;
          font-family: MicrosoftYaHei,微软雅黑;
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