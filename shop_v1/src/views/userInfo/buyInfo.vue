<template>
  <div id="bhncBuyInfo">
    <div class="header_search">
      <div class="header_search_wei">
        <span>我的求购信息</span>
      </div>
      <button class="warning" @click="$router.push('./userPublish')">发布需求</button>
    </div>
    <div class="order-list" style="min-height: 621px;">
      <el-table
        :data="purchaseList"
        style="width: 100%;font-size: 12px !important;background-color: #FBFBFB;"
        :header-cell-style="{background:'#E6E6E6',color:'#606266',fontWeight:'bold'}"
        align="center"
        @row-click="pur_details"
      >
        <el-table-column
          label="标题"
          prop="title"
          align="center"
          style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;"
        ></el-table-column>
        <!-- <el-table-column label="商品分类" prop="type" align="center"></el-table-column> -->
        <el-table-column label="采购数量" prop="offer_count" align="center"></el-table-column>
        <!-- <el-table-column label="交货时间" prop="delivery_date" align="center"></el-table-column> -->
        <el-table-column label="发布时间" prop="sendDate" align="center"></el-table-column>
        <el-table-column label="报价次数" prop="p_count" align="center"></el-table-column>
        <el-table-column label="最后一次报价" prop="last_date" align="center"></el-table-column>
        <el-table-column label="状态" prop="state" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.status == 0?"审核中":""}}{{scope.row.status == 1?"已发布":""}}{{scope.row.status == 2?"已驳回":""}}</span>
          </template>
          <!-- <template>
            <span v-if="status==1">已发布</span>
            <span v-if="status==0">已发布</span>
          </template>-->
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 20, 40]"
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
      purchaseList: [], //全部列表
      currentPage: 1, //初始页
      pagesize: 10, //    每页的数据
      total: 10,
      username: "",
      searchMap: {
        id: "",
        title: "",
        type: "",
        delivery_date: "",
        send_date: "-",
        offer_count: "",
        last_date: "",
        message: "",
        p_id: ""
      }
    };
  },
  components: {},
  created() {
    this.username = localStorage.getItem("username");
    this.getPurchase(this.currentPage, this.pagesize);
  },
  methods: {
    //初始化currentPage,初始每页数据pagesize和数据data
    handleSizeChange(size) {
      this.pagesize = size;
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage; // 点击第几页
      this.getPurchase(this.currentPage, this.pagesize);
    },
    getPurchase(page, size) {
      var username = this.username;
      this.searchMap.d_name = localStorage.getItem("ID");
      this.$http({
        url: `${url.purchaseSearchShow}/${page}/${size}/${localStorage.getItem(
          "ID"
        )}`,
        // headers:this.headers,
        data: this.searchMap,
        method: "post"
      }).then(res => {
        if (res.data.code == 20000) {
          this.purchaseList = res.data.data.rows;
          for (var i = 0; i < this.purchaseList.length; i++) {
            this.purchaseList[i].p_count = this.purchaseList[i].p_count
              ? this.purchaseList[i].p_count
              : 0;
            this.purchaseList[i].delivery_date =
              this.purchaseList[i].delivery_date + "天";
            this.purchaseList[i].sendDate = this.resolvingDate(
              this.purchaseList[i].sendDate
            );
            this.purchaseList[i].last_date = this.resolvingDate(
              this.purchaseList[i].last_date
            );
          }
          this.total = parseInt(res.data.data.total);
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
    pur_details(row) {
      this.$router.push({ path: "./buyInfoDetail", query: { id: row.id } });
    }
  }
};
</script>

<style lang="scss" scoped>
#bhncBuyInfo {
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
}
</style>

<style lang="scss">
#bhncBuyInfo {
  .el-table .cell {
    box-sizing: border-box;
    word-break: break-all;
    line-height: 23px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
}
</style>

