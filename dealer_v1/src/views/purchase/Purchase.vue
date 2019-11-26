<template>
  <div id="bhncPurchase">
    <!-- <div class="header_search">
            <el-input
                placeholder="请输入内容"
                v-model="input"
                class="search"
                clearable>
            </el-input>
            <el-button type="primary" icon="el-icon-search" class="search_btn" @click="getSearch()">搜索</el-button>
            <div class="header_search_wei">
                <button  class="warning"  @click="pur_release">发布新采购需求</button>
            </div>
    </div>-->
    <div class="header_search clearfix">
      <div class="searchBox">
        <!-- <div class="inputBox">
          <input type="text" placeholder="请输入内容" class="searchInput" v-model="input" />
          <i class="el-icon-search" @click="getSearch()"></i>
        </div>-->
        <div class="header_search_wei">
          <button class="warning" @click="pur_release">发布求购</button>
        </div>
      </div>
    </div>
    <div class="order-list">
      <el-table
        stripe
        :data="purchaseList"
        style="width: 100%;cursor: pointer;"
        :header-cell-style="{background:'#F7F7F7',color:'#606266',fontWeight:'bold',borderTop:'1px solid#E2E2E2'}"
        align="center"
        @row-click="pur_details"
      >
        <el-table-column label="标题" prop="title" align="center"></el-table-column>
        <!-- <el-table-column label="商品分类" prop="type" align="center"></el-table-column> -->
        <el-table-column label="求购数量" prop="offer_count" align="center"></el-table-column>
        <!-- <el-table-column label="交货时间" prop="delivery_date" align="center"></el-table-column> -->
        <el-table-column label="发布时间" prop="send_date" align="center"></el-table-column>
        <el-table-column label="报价次数" prop="pcount" align="center"></el-table-column>
        <el-table-column label="最后一次报价" prop="last_date" align="center"></el-table-column>
        <el-table-column label="状态" prop="state" align="center">
          <template slot-scope="scope">
            <span> {{scope.row.status == 0?"审核中":""}}{{scope.row.status == 1?"已发布":""}}{{scope.row.status == 2?"被驳回":""}}</span>
          </template>
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
      style="text-align: center;margin: 30px;"
    ></el-pagination>
  </div>
</template>

<script>
import url from "../../serverAPI.config.js";
export default {
  data() {
    return {
      purchaseList: [], //全部列表
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIxIiwic3ViIjoiMTM0MzMxNTcxNDciLCJpYXQiOjE1NjAzMzQzNTEsInJvbGVzIjoidXNlciJ9.cpLQ0B-asQpLawZ_uoEi0VkMlfbVWgWO4rxKtKeD404"
      },
      input: "",
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
      },
      currentPage: 1, //初始页
      pagesize: 10, //    每页的数据
      activeName: "first",
      total: 0,
      userName: ""
    };
  },
  mounted() {
    this.userName = localStorage.getItem("siteName");
    this.getPurchase(this.currentPage, this.pagesize);
  },
  components: {},
  methods: {
    //初始化currentPage,初始每页数据pagesize和数据data
    handleSizeChange(size) {
      this.pagesize = size;
      this.getPurchase(this.currentPage, this.pagesize);
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage; // 点击第几页
      this.getPurchase(this.currentPage, this.pagesize);
    },
    pur_details(row) {
      this.$router.push({ path: "./pur_details", query: { id: row.id } });
    },
    pur_release() {
      this.$router.push("./pur_release");
    },
    getPurchase(page, size) {
      var username = this.userName;
      this.searchMap.d_name = localStorage.getItem("ID");
      this.$http({
        url: `${url.purchaseSearchShow}/${page}/${size}/${localStorage.getItem(
          "ID"
        )}`,
        data: this.searchMap,
        method: "post"
      }).then(res => {
        if (res.data.code == 20000) {
          this.purchaseList = res.data.data.rows;
          for (var i = 0; i < this.purchaseList.length; i++) {
            this.purchaseList[i].pcount = this.purchaseList[i].pcount
              ? this.purchaseList[i].pcount
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
    getSearch() {
      if (this.input == "" || !this.input) {
        this.searchMap = {
          id: "",
          title: "",
          type: "",
          delivery_date: "",
          send_date: "-",
          offer_count: "",
          last_date: "",
          message: "",
          p_id: ""
        };
      } else {
        this.searchMap = {
          title: this.input,
          type: this.input,
          delivery_date: this.input,
          send_date: this.input,
          offer_count: this.input,
          last_date: this.input
        };
      }

      this.getPurchase(this.currentPage, this.pagesize);
    }
  }
};
</script>

<style lang="scss" scoped>
#bhncPurchase {
  .header_search {
    padding: 20px 50px 20px 20px;
    position: relative;
    .search {
      width: 60%;
    }
    .search_btn {
    }
    .header_search_wei {
      display: inline-block;
      float: right;
      .warning {
        width: 100px;
        height: 36px;
        background: rgba(252, 146, 99, 1);
        border-radius: 8px;
        font-size: 16px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
      }
      .saixuan {
      }
    }
  }
  // 搜索框内容
  .searchBox {
    float: right;
    display: flex;
    .inputBox {
      display: flex;
      width: 460px;
      height: 40px;
      line-height: 40;
      padding: 0 20px;
      border: 1px solid rgba(61, 145, 231, 1);
      border-radius: 8px;
      margin-right: 17px;
      .searchInput {
        width: 95%;
        font-size: 14px;
      }
      i {
        display: inline-block;
        width: 24px;
        height: 24px;
        padding-top: 7px;
        cursor: pointer;
        font-size: 24px;
      }
    }
    .selectBtn {
      input {
        width: 100px;
        height: 40px;
        background: rgba(61, 145, 231, 1);
        border-radius: 8px;
        line-height: 40px;
        font-size: 16px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        cursor: pointer;
      }
    }
  }
}
</style>