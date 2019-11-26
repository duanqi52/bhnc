<template>
  <div id="bhncAfterOrder">
    <div class="order">
      <div class="header_search clearfix">
        <div class="searchBox">
          <div class="inputBox">
            <input type="text" placeholder="请输入内容" class="searchInput" v-model="input" />
            <i class="el-icon-search" @click="getSearch()"></i>
          </div>
        </div>
      </div>
      <div class="order-list">
        <el-table
          :data="orderList"
          style="width: 100%"
          :header-cell-style="{background:'#eef1f6',color:'#606266',fontWeight:'bold'}"
          :row-class-name="tableRowClassName"
          align="center"
        >
          <el-table-column label="关联订单ID" prop="o_id" align="center"></el-table-column>
          <el-table-column label="申请时间" prop="date" align="center"></el-table-column>
          <el-table-column label="退款金额" prop="total_money" align="center"></el-table-column>
          <el-table-column label="商品" prop="product" align="center">
            <template slot-scope="scope">
              <div v-for="(item,index) in scope.row.product" :key="index">
                <p
                  v-for="(items,index) in item.goods"
                  :key="index"
                  style="margin: 10px 0;height: 45px;"
                >
                  <img :src="items.img" alt class="img_url" />
                  <span class="commodity">{{items.name}}</span>
                </p>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="款号" prop="styleNumber" align="center">
            <template slot-scope="scope">
              <div v-for="(item,index) in scope.row.product" :key="index">
                <p
                  v-for="(items,index) in item.goods"
                  :key="index"
                  style="height: 45px;margin: 10px 0;"
                >{{items.style_number}}</p>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="颜色" prop="color" align="center">
            <template slot-scope="scope">
              <div v-for="(item,index) in scope.row.product" :key="index">
                <p
                  v-for="(items,index) in item.goods"
                  :key="index"
                  style="height: 45px;margin: 10px 0;"
                >{{items.color}}</p>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="商品单价" prop="price" align="center">
            <template slot-scope="scope">
              <div v-for="(item,index) in scope.row.product" :key="index">
                <p
                  v-for="(items,index) in item.goods"
                  :key="index"
                  style="height: 45px;margin: 10px 0;"
                >{{items.prices}}</p>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="数量" prop="num" align="center">
            <template slot-scope="scope">
              <div v-for="(item,index) in scope.row.product" :key="index">
                <p
                  v-for="(items,index) in item.goods"
                  :key="index"
                  style="height: 45px;margin: 10px 0;"
                >{{items.count}}</p>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="订单状态" align="center">
            <!-- <template  >
                        <el-input
                            v-model="search"
                            size="mini"
                            placeholder="输入关键字搜索"/>
            </template>-->
            <template slot-scope="scope">
              <el-button size="mini" v-if="scope.row.status === '0'" type="danger">待审核</el-button>
              <el-button size="mini" v-if="scope.row.status === '1'" type="primary">退款中</el-button>
              <el-button size="mini" v-if="scope.row.status === '2'" type="success">已退款</el-button>
              <el-button size="mini" v-if="scope.row.status === '3'" type="info">已驳回</el-button>
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
  </div>
</template>

<script>
import url from "@/serverAPI.config.js";
export default {
  data() {
    return {
      commodityChange: [],
      orderList: [],
      currentPage: 1, //初始页
      pagesize: 10, //    每页的数据
      total: 0,
      searchMap: {
        id: null,
        total_money: null,
        product: ".", // 搜索框
        status: null,
        d_id: null,
        batches_id: null,
        startMoney: "",
        endMoney: "",
        times: "",
        selectStatus: ""
      },
      status: "",
      filtrateShow: false,
      filtrate: {
        times: ["2019-01-01 08:00:00", "2019-01-01 08:00:00"]
      },
      selectStatus: [],
      startMoney: "",
      endMoney: "",
      input: ""
    };
  },
  components: {},
  watch: {},
  methods: {
    //筛选
    filtrateStatus() {
      this.filtrateShow = true;
    },
    filtrateHiddle() {
      this.filtrateShow = false;
    },
    handleSizeChange(size) {
      this.pagesize = size;
      this.getOrder(this.currentPage, this.pagesize);
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage; // 点击第几页
      this.getOrder(this.currentPage, this.pagesize);
    },
    //隔行变色
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 == 1) {
        return "warning-row";
      } else {
        return "success-row";
      }
    },
    //获取所有订单
    getAfterOrder(page, size) {
      this.searchMap.u_name = localStorage.getItem("siteName");
      this.$http({
        url: `${url.getOrder}/searchAfterSalesOrder/${page}/${size}`,
        method: "post",
        data: this.searchMap
      }).then(res => {
        if (res.status == 200) {
          this.orderList = res.data.data.rows;
          this.orderList.map(item => {
            item.date = this.resolvingDate(item.date);
            item.product = JSON.parse(item.product);
            item.total_money = this.formatPrice(item.total_money) + "元";
          });

          this.total = parseInt(res.data.data.total);
        } else {
        }
      });
    },
    //转换时间
    resolvingDate(date) {
      var dateee = new Date(date).toJSON();
      return new Date(+new Date(dateee) + 8 * 3600 * 1000)
        .toISOString()
        .replace(/T/g, " ")
        .replace(/\.[\d]{3}Z/, "");
    },
    inArray(arr, item) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] == item) {
          return true;
        }
      }
      return false;
    },
    getSearch() {
      if (this.input == "" || !this.input) {
        this.searchMap = {
          id: null,
          product: "." // 搜索框
        };
      } else {
        this.searchMap.product = this.input;
        this.searchMap.id = this.input;
      }
      this.getAfterOrder(this.currentPage, this.pagesize);
    },
    formatPrice(str) {
      return parseFloat(str).toFixed(2);
    }
  },
  mounted() {
    this.getAfterOrder(this.currentPage, this.pagesize);
  }
};
</script>

<style scoped lang="scss">
#bhncAfterOrder {
  .header_search {
    padding: 20px 50px 20px 20px;
    position: relative;
    .search {
      width: 60%;
    }
    .header_search_wei {
      display: inline-block;
      float: right;
    }
  }
  .el-table .warning-row {
    background: #f7faff;
  }
  .el-table .success-row {
    background: #ebf1fb;
  }
  .cell {
    display: flex;
    justify-content: space-around;
  }
  .filtrate-box {
    width: 380px;
    height: 380px;
    background: #fff;
    border: 1px solid #e6e6e6;
    line-height: 40px;
    padding: 20px 15px;
    position: absolute;
    top: 145px;
    right: 45px;
    z-index: 50;
    border-radius: 10px;
    box-shadow: 0 0 18px #e6e6e6;
    .status {
      display: flex;
      justify-content: space-between;
      font-size: 14px;
    }
    .prices {
      display: flex;
      justify-content: space-between;
      input {
        border: 1px solid #e6e6e6;
        height: 30px;
        padding-left: 15px;
      }
    }
    .btn-box {
      text-align: center;
      margin: 15px 0;
      button {
        width: 100px;
      }
    }
  }
  .img_url {
    width: 45px;
    height: 45px;
    display: inline-block;
    float: left;
  }
  .commodity {
    overflow: hidden;
    text-align: left;
    padding-left: 10px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
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
