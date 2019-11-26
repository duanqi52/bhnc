<template>
  <div>
    <div id="bhncPurchase">
      <div class="header_search clearfix">
        <div class="searchBox">
          <div class="inputBox">
            <input type="text" placeholder="请输入内容" class="searchInput" v-model="input" />
            <i class="el-icon-search" @click="getSearch()"></i>
          </div>
          <div class="header_search_wei">
            <button class="warning" v-if="offer" @click="getIsOffer()">已报价</button>
            <button class="warning" v-else @click="getNotOffer();">全部采购</button>
          </div>
        </div>
      </div>
      <div class="order-list">
        <el-table
          :data="purchaseList"
          style="width: 100%;cursor: pointer;"
          :header-cell-style="{background:'#F7F7F7',color:'#606266',fontWeight:'bold',borderTop:'1px solid#E2E2E2'}"
          align="center"
          @row-click="pur_details"
        >
          <el-table-column label="标题" prop="title" align="center"></el-table-column>
          <!-- <el-table-column label="商品分类" prop="type" align="center"></el-table-column> -->
          <el-table-column label="采购数量" prop="offer_count" align="center"></el-table-column>
          <!-- <el-table-column label="交货时间" prop="delivery_date" align="center"></el-table-column> -->
          <!-- <el-table-column label="发布人" prop="send_man" align="center"></el-table-column> -->
          <el-table-column label="发布时间" prop="send_date" align="center"></el-table-column>
          <el-table-column label="报价次数" prop="pcount" align="center"></el-table-column>
          <el-table-column label="最后一次报价" prop="last_date" align="center"></el-table-column>
          <el-table-column label="我的报价" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.quotation">已报价</span>
              <span v-else>未报价</span>
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
      purchaseList: [], //全部列表
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIxIiwic3ViIjoiMTM0MzMxNTcxNDciLCJpYXQiOjE1NjAzMzQzNTEsInJvbGVzIjoidXNlciJ9.cpLQ0B-asQpLawZ_uoEi0VkMlfbVWgWO4rxKtKeD404"
      },
      input: "",
      searchMap: {
        title: "",
        p_id: "",
        status:"1"
      },
      currentPage: 1, //初始页
      pagesize: 10, //    每页的数据
      activeName: "first",
      total: 0,
      userName: "",
      offer: true
    };
  },
  mounted() {
    this.getPurchase(this.currentPage, this.pagesize);
    this.userName = localStorage.getItem("username") || localStorage.getItem("siteName");
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

    getPurchase(page, size) {
      this.$http({
        //url:'http://172.16.0.138:8080/purchase/searchShow/'+page+"/"+size+"/"+localStorage.getItem("ID"),
        url: `${url.purchaseSearchShow}/${page}/${size}/${localStorage.getItem("ID")}`,
        // headers:this.headers,
        data: this.searchMap,
        method: "post"
      }).then(res => {
        if (res.data.code == 20000) {
          this.purchaseList = res.data.data.rows;    
          for (var i = 0; i < this.purchaseList.length; i++) {
            this.purchaseList[i].pcount = this.purchaseList[i].pcount? this.purchaseList[i].pcount:0           
            this.purchaseList[i].send_date = this.resolvingDate(this.purchaseList[i].send_date);
            this.purchaseList[i].last_date = this.resolvingDate(this.purchaseList[i].last_date);
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
      this.searchMap.title = this.input;
      this.getPurchase(this.currentPage, this.pagesize);
    },
    getIsOffer() {
      this.offer = false;
      this.searchMap.isOffer = localStorage.getItem("ID");
      this.getSearch();
    },
    getNotOffer() {
      this.offer = true;
      this.searchMap.isOffer = null;
      this.getSearch();
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
        width:100px;
        height:36px;
        background:rgba(252,146,99,1);
        border-radius:8px;
        font-size:16px;
        font-family:MicrosoftYaHei;
        font-weight:400;
        color:rgba(255,255,255,1);
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
      border: 1px solid #fc9263;
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
        color: #fc9263;
      }
    }
    .selectBtn {
      input {
        width: 100px;
        height: 40px;
        background: #fc9263;
        border-radius: 8px;
        line-height: 40px;
        font-size: 16px;
        font-family: MicrosoftYaHei,微软雅黑;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        cursor: pointer;
      }
    }
  }
}
</style>