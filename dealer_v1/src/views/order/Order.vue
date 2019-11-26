<template>
  <div id="bhncOrder">
    <div class="order">
      <div class="header_search clearfix">
        <div class="searchBox">
          <div class="inputBox">
            <input type="text" placeholder="请输入内容" class="searchInput" v-model="input" />
            <i class="el-icon-search" @click="getSearch()"></i>
            <!-- <input type="button" value="搜索" @click="getSearch()"> -->
          </div>
          <div class="selectBtn">
            <input type="button" value="筛选" @click="filtrateStatus" />
          </div>
        </div>
        <!-- <el-button type="primary" icon="el-icon-search" class="search_btn" >搜索</el-button> -->
        <!-- <div class="header_search_wei">
                <el-button type="danger" plain class="saixuan" @click.native="filtrateStatus">筛选</el-button>
        </div>-->
      </div>
      <div class="filtrate" v-if="filtrateShow">
        <div class="filtrate-box">
          <ul>
            <li>日期：</li>
            <li>
              <el-date-picker
                v-model="filtrate.times"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                size="mini"
                clearable
              ></el-date-picker>
            </li>
            <li>订单状态：</li>
            <li>
              <div class="status">
                <p>
                  <input type="checkbox" value="0" v-model="selectStatus" />未付款
                </p>
                <p>
                  <input type="checkbox" value="1" v-model="selectStatus" />发货中
                </p>
                <p>
                  <input type="checkbox" value="3" v-model="selectStatus" />已完成
                </p>
                <p>
                  <input type="checkbox" value="4" v-model="selectStatus" />作废
                </p>
              </div>
            </li>
            <li>订单金额：</li>
            <li>
              <div class="prices">
                <div class="start-price">
                  <input type="text" placeholder="请输入起始金额" v-model="startMoney" />
                </div>
                <div class="end-price">
                  <input type="text" placeholder="请输入结束金额" v-model="endMoney" />
                </div>
              </div>
            </li>
          </ul>
          <div class="btn-box">
            <el-button type="info" plain size="mini" @click="filtrateHiddle">取消</el-button>
            <el-button type="success" plain size="mini" @click="filtrateHiddle();filter()">确定</el-button>
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
          @row-click="openDetails"
        >
          <el-table-column label="订单ID" prop="id" align="center"></el-table-column>
          <el-table-column label="下单时间" prop="date" align="center"></el-table-column>
          <el-table-column label="订单金额" prop="total_money" align="center"></el-table-column>
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
              <div v-if="scope.row.status === '0'">
                <el-button size="mini" type="danger" plain>去付款</el-button>
                <el-button type="text" @click.stop="offOrder(scope.row.id)">取消下单</el-button>
              </div>

              <el-button
                size="mini"
                v-if="scope.row.status == '1' || scope.row.status == '2'"
                type="primary"
              >发货中</el-button>

              <div class="stocks" v-if="scope.row.status === '3'">
                <el-button size="mini" type="success" plain>已完成</el-button>
                <el-button type="text" v-if="scope.row.e_id">已评价</el-button>
                <el-button type="text" v-else>去评价</el-button>
              </div>
              <el-button size="mini" v-if="scope.row.status === '4'" type="info">作废</el-button>
              <el-button
                size="mini"
                type="text"
                @click.stop="serve(scope.row.id)"
                v-if="scope.row.status > 0 && scope.row.status < 4 && scope.row.is_after != '1'"
              >申请售后</el-button>
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
    openDetails(row) {
      this.$router.push({ path: "/details", query: { id: row.id } });
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
    getOrder(page, size) {
      this.searchMap.username = localStorage.getItem("siteName");
      this.$http({
        url: `${url.getOrder}/search/${page}/${size}`,
        method: "post",
        data: this.searchMap
      })
        .then(res => {
          if (res.status == 200) {
            this.orderList = res.data.data.rows;
            this.orderList.map(item => {
              return (item.date = this.resolvingDate(item.date));
            });
            this.orderList.map(item => {
              return (item.product = JSON.parse(item.product));
            });
            this.total = parseInt(res.data.data.total);
          } else {
          }
        })
        .catch(err => {});
    },
    offOrder(id) {
      this.$confirm(`是否真的要取消此订单？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "否",
        type: "warning",
        center: true
      })
        .then(() => {
          this.$http({
            method: "get",
            url: `${url.offOrder}/${id}`
          }).then(res => {
            this.getOrder(this.currentPage, this.pagesize);
          });
        })
        .catch(() => {});
    },
    //转换时间
    resolvingDate(date) {
      var dateee = new Date(date).toJSON();
      return new Date(+new Date(dateee) + 8 * 3600 * 1000)
        .toISOString()
        .replace(/T/g, " ")
        .replace(/\.[\d]{3}Z/, "");
    },
    serve(id) {
      this.$router.push("/serve?id=" + id);
    },
    selectStatusChange(status) {
      if (this.inArray(this.selectStatus, status)) {
        this.selectStatus.splice(this.selectStatus.indexOf(status), 1);
      } else {
        this.selectStatus.push(status);
      }
    },
    inArray(arr, item) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] == item) {
          return true;
        }
      }
      return false;
    },
    filter() {
      if (this.filtrate.times) {
        this.filtrate.times[0] = this.resolvingDate(this.filtrate.times[0]);
        this.filtrate.times[1] = this.resolvingDate(this.filtrate.times[1]);
      } else {
        this.searchMap.times = "";
      }
      this.searchMap.times = JSON.stringify(this.filtrate.times);
      this.searchMap.startMoney = this.startMoney;
      this.searchMap.endMoney = this.endMoney;
      this.searchMap.selectStatus = JSON.stringify(this.selectStatus);
      this.getSearch();
    },
    getSearch() {
      if (this.input == "" || !this.input) {
        this.searchMap.product = "."; // 搜索框
      } else {
        this.searchMap.product = this.input;
        this.searchMap.id = this.input;
      }
      this.getOrder(this.currentPage, this.pagesize);
    }
  },
  mounted() {
    this.getOrder(this.currentPage, this.pagesize);
    var date = new Date();
    var y = date.getFullYear();
    var M = date.getMonth() + 1;
    var d = date.getDate();
    var h = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();
    this.filtrate.times[0] = `1970-1-1 00:00:00`;
    this.filtrate.times[1] = `3990-1-1 00:00:00`;
  }
};
</script>

<style scoped lang="scss">
#bhncOrder {
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
