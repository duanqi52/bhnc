<!-- 组件说明 -->
<template>
  <div id="bhncCollection">
    <div class="commodity">
      <!-- <div class="title clearfix">
                <div class="title-left">
                    <div class="search">
                        <el-input type="text" v-model="input"></el-input>
                        <el-button type="primary" @click="getSearch()">搜索</el-button>
                    </div>
                </div>

                <div class="title-right">
                    <div class="operation">
                        <el-button  type="success" plain @click="addInventory()">增加库存</el-button>
                        <el-button type="success" plain @click="postTrade()">发布新产品</el-button>
                    </div>
                </div>

      </div>-->
      <div class="header_search clearfix">
        <div class="searchBox">
          <div class="inputBox">
            <input type="text" placeholder="请输入内容" class="searchInput" v-model="input" />
            <i class="el-icon-search" @click="getSearch"></i>
            <!-- <input type="button" value="搜索" @click="getSearch()"> -->
          </div>
        </div>
      </div>
      <!-- 搜索结束 -->
      <!-- <div class="add-operation" v-if="operation">
        <div class="item">
          <el-table :data="goodsAddList">
            <el-table-column prop="title" label="商品" align="center"></el-table-column>
            <el-table-column prop="style_number" label="款号" align="center"></el-table-column>
            <el-table-column label="颜色" align="center">
              <template slot-scope="scope">
                <div v-for="(item,index) in scope.row.sku" :key="index">{{item.color}}</div>
              </template>
            </el-table-column>
            <el-table-column label="增加库存" align="center">
              <template slot-scope="scope">
                <div v-for="(item,index) in scope.row.sku" :key="index">
                  <el-input v-model="item.inventory"></el-input>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <div class="btn-box">
            <el-button type="info" plain @click="hide()">取消</el-button>
            <el-button type="success" plain @click="updateInventory()">确定</el-button>
          </div>
        </div>
      </div> -->

      <div class="product">
        <div class="product-title clearfix">
          <div class="product-left">
            <div class="filtrate">
              <el-select
                v-model="searchMap.scope"
                placeholder="商品分类"
                @change="getGoods(currentPage,pageSize);timeActive=false;numActive=false;priceActive=false;"
              >
                <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
              <button
                @click="time()"
                :class="timeActive ? 'priceSort active':'priceSort'"
                style="margin-left:20px;"
              >
                发布时间
                <i :class="timeSort ? 'iconfont icon-paixushengxu' : 'iconfont icon-paixujiangxu'"></i>
              </button>

              <button @click="num()" :class="numActive ? 'priceSort active':'priceSort'">
                起订量
                <i :class="numSort ? 'iconfont icon-paixushengxu' : 'iconfont icon-paixujiangxu'"></i>
              </button>

              <button @click="price()" :class="priceActive ? 'priceSort active':'priceSort'">
                价格
                <i :class="pricesort ? 'iconfont icon-paixushengxu' : 'iconfont icon-paixujiangxu'"></i>
              </button>

              <!-- <el-button type="primary">筛选</el-button> -->
            </div>
          </div>
          <div class="product-right">
            <el-button type="danger" plain @click="deleteMore()" style="float: right;">删除</el-button>
          </div>
        </div>
        <div class="product-list clearfix">
          <div class="product-item" v-for="item in goodsList" :key="item.id">
            <label :for="gernerateId(item.id)">
              <img :src="item.img[0]" alt @click.stop="toDetail(item)" />
              <!-- <div class="product-price">
                <p>
                  <span>{{formatPrice(item.price)}}/支</span>
                  {{item.startQuantity}}起
                </p>
              </div> -->
              <div class="product-inventory">{{item.title}}</div>
            </label>
            <p class="cksBottom clearfix">
              <span>库存：{{item.total_inventory}}</span>
              <input type="checkbox" @click="selectGoods($event,item)" :id="gernerateId(item.id)" />
            </p>
            <div class="status" v-if="item.status == '0' || item.status == '2' ? true : false">
              <li v-if="item.status == '0' ? true : false" class="shenhezhong">审核中</li>
              <li disabled v-if="item.status == '2' ? true : false" class="yixiajia">已下架</li>
            </div>
          </div>
        </div>
        <div class="page">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[20, 30,50]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import x from ''
import url from "@/serverAPI.config.js";
export default {
  data() {
    return {
      input: "",
      username: "",
      pricesort: true,
      timeSort: true,
      numSort: true,
      timeActive: false,
      numActive: false,
      priceActive: false,
      options: [],

      statusList: [
        { value: "", label: "全部" },
        { value: "0", label: "审核中" },
        { value: "1", label: "已通过" },
        { value: "2", label: "已下架" }
      ],
      filtrate: {
        classify: "",
        prices: "",
        inventory: "",
        status: ""
      },
      goodsList: [],
      currentPage: 1,
      pageSize: 50,
      total: 0,
      addOperation: [
        { id: 1, name: "1111", styleNumber: "222", color: "333", add: 312312 }
      ],
      operation: false,
      searchMap: {
        SKU: "sku_img"
      },
      ids: [],
      goodsSoldOutList: [],
      goodsAddList: []
    };
  },
  computed: {},

  methods: {
    addInventory() {
      this.operation = true;
    },
    hide() {
      this.operation = false;
    },
    num() {
      this.active = name;
      this.numSort = !this.numSort;
      this.timeActive = false;
      this.numActive = true;
      this.priceActive = false;
      if (!this.numSort) {
        this.searchMap.start_quantity_desc = "active";
        this.searchMap.start_quantity_asc = null;
        this.searchMap.date_desc = null;
        this.searchMap.date_asc = null;
        this.searchMap.price_desc = null;
        this.searchMap.price_asc = null;
      } else {
        this.searchMap.start_quantity_desc = null;
        this.searchMap.start_quantity_asc = "active";
        this.searchMap.date_desc = null;
        this.searchMap.date_asc = null;
        this.searchMap.price_desc = null;
        this.searchMap.price_asc = null;
      }
      this.getGoods(this.currentPage, this.pageSize);
    },
    time() {
      this.timeSort = !this.timeSort;
      this.timeActive = true;
      this.numActive = false;
      this.priceActive = false;
      if (!this.timeSort) {
        this.searchMap.start_quantity_desc = null;
        this.searchMap.start_quantity_asc = null;
        this.searchMap.date_desc = "active";
        this.searchMap.date_asc = null;
        this.searchMap.price_desc = null;
        this.searchMap.price_asc = null;
      } else {
        this.searchMap.start_quantity_desc = null;
        this.searchMap.start_quantity_asc = null;
        this.searchMap.date_desc = null;
        this.searchMap.date_asc = "active";
        this.searchMap.price_desc = null;
        this.searchMap.price_asc = null;
      }
      this.getGoods(this.currentPage, this.pageSize);
    },
    price() {
      this.pricesort = !this.pricesort;
      this.timeActive = false;
      this.numActive = false;
      this.priceActive = true;
      if (!this.pricesort) {
        this.searchMap.start_quantity_desc = null;
        this.searchMap.start_quantity_asc = null;
        this.searchMap.date_desc = null;
        this.searchMap.date_asc = null;
        this.searchMap.price_desc = "active";
        this.searchMap.price_asc = null;
      } else {
        this.searchMap.start_quantity_desc = null;
        this.searchMap.start_quantity_asc = null;
        this.searchMap.date_desc = null;
        this.searchMap.date_asc = null;
        this.searchMap.price_desc = null;
        this.searchMap.price_asc = "active";
      }
      this.getGoods(this.currentPage, this.pageSize);
    },
    postTrade() {
      this.$router.push("/postTrade");
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getGoods(this.currentPage, this.pageSize);
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getGoods(this.currentPage, this.pageSize);
      console.log(`当前页: ${val}`);
    },
    //动态生成id
    gernerateId(index) {
      return "imgChecked" + index;
    },
    getGoods(page, size) {
      if (this.searchMap.scope != null && this.searchMap.scope == "全部") {
        this.searchMap.scope = "";
      }
      this.searchMap.p_id = localStorage.getItem("siteName");
      this.$http({
        url: `${url.Goods}/search/${page}/${size}`,
        method: "post",
        data: this.searchMap
      }).then(res => {
        if (res.data.code == 20000) {
          //console.log(res.data.data);
          this.goodsList = res.data.data.rows;
          this.goodsList.map(item => {
            item.title = item.title ? item.title : "　 ";
            item.img = JSON.parse(item.img);
          });
          this.total = res.data.data.total;
        }
      });
    },
    //获取收藏的gids
    getCollectionList() {
      this.$http({
        url: `${url.getCollectionList}/${localStorage.getItem("siteName")}`,
        method: "get"
      }).then(res => {
        if (res.data.code == 20000) {
          this.searchMap.collectionIds = JSON.stringify(res.data.data);
          console.log(this.searchMap.collectionIds);
          this.getGoods(this.currentPage, this.pageSize);
        }
      });
    },

    //获取经营范围
    getScope() {
      this.$http({
        url: `http://182.61.148.51:9008/scope`,
        method: "get"
      })
        .then(res => {
          this.options = res.data.data;
          this.options.unshift({ id: "chen", name: "全部" });
        })
        .catch(err => {
          console.log(err);
        });
    },

    getSearch() {
      if (this.input == "" || !this.input) {
        this.searchMap.SKU = "sku_img";
        this.searchMap.title = this.input;
      } else {
        this.searchMap.SKU = this.input;
        this.searchMap.title = this.input;
      }
      this.getGoods(this.currentPage, this.pageSize);
    },
    selectGoods($event, item) {
      var goodsSoldOut = JSON.parse(JSON.stringify(item));
      goodsSoldOut.status = "2";
      goodsSoldOut.img = JSON.stringify(goodsSoldOut.img);
      goodsSoldOut.sku = JSON.stringify(goodsSoldOut.sku);

      if ($event.target.checked) {
        this.ids.push(item.id);
        this.goodsSoldOutList.push(goodsSoldOut);
        this.goodsAddList.push(JSON.parse(JSON.stringify(item)));
      } else {
        this.ids.splice(this.ids.indexOf(item.id), 1);
        this.goodsSoldOutList.splice(
          this.goodsSoldOutList.indexOf(goodsSoldOut),
          1
        );
        this.goodsAddList.splice(
          this.goodsSoldOutList.indexOf(JSON.parse(JSON.stringify(item))),
          1
        );
      }
    },
    deleteMore() {
      this.$http({
        url: `${url.deleteMoreCollection}/${localStorage.getItem("siteName")}`,
        method: "post",
        data: this.ids
      })
        .then(res => {
          location.reload(true);
        })
        .catch(err => {
          console.log(err);
        });
    },
    formatPrice(str) {
      return parseFloat(str).toFixed(2);
    },
    toDetail(goods) {
      window.open(`${url.detailUrl}details?id=` + goods.id);
    }
  },
  created() {
    this.getCollectionList();
    this.getScope();
    (this.username = localStorage.getItem("siteName")),
      (this.searchMap.p_id = this.username);
  }
};
</script>

<style lang="scss">
/* 重置饿了么样式 */
#bhncCollection {
  .el-select .el-input--suffix .el-input__inner {
    border: none;
    height: 21px;
    line-height: 21px;
    color: #3d91e7;
    background: transparent;
    padding-right: 0px;
  }

  .product-right .el-button {
    padding: 5px 20px;
  }
}
</style>



<style lang='scss' scoped>
//@import url()
#bhncCollection {
  .commodity {
    .title {
      padding: 40px 0;
      .title-left {
        width: 80%;
        float: left;
        .search {
          display: flex;
          justify-content: space-between;
          width: 35%;
          margin: 0 auto;
          button {
            margin: 0 15px;
          }
        }
      }
      .title-right {
        width: 20%;
        float: left;
        button {
          width: 40%;
        }
      }
    }
    .add-operation {
      width: 500px;
      height: 300px;
      border: 1px solid #e6e6e6;
      overflow: auto;
      position: absolute;
      top: 85px;
      right: 35px;
      background: #fff;
      z-index: 2222;
      border-radius: 10px;
      padding: 0 15px;
      .title {
        text-align: center;
        font-weight: 600;
        padding: 20px 0;
      }
      table {
        width: 500px;
      }
      .btn-box {
        text-align: center;
        padding: 25px 0;
        button {
          width: 120px;
        }
      }
    }
    .product {
      // margin: 35px 0;
      .product-title {
        height: 42px;
        // background: #e6e6e6;
        line-height: 42px;
        // height:21px;
        background: rgba(247, 247, 247, 1);
        box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.12);
        // line-height: 21px;
      }
      .product-left {
        width: 70%;
        float: left;
        .filtrate {
          margin-left: 20px;
          div {
            width: 96px;
          }
          button {
            width: 120px;
            height: 21px;
            background: transparent;
            font-size: 14px;
            color: #666666;
            border-radius: 5px;
            margin-left: 5px;
          }
        }
      }

      button {
        width: 100px;
        margin-right: 15px;
      }
    }
    .product-list {
      border: 1px solid #e6e6e6;
      padding: 15px 20px;
      // display: flex;
      // justify-content: space-between;
      // flex-wrap:wrap;
      .product-item {
        width: 13.5%;
        margin-bottom: 20px;
        position: relative;
        margin: 5px 20px;
        float: left;
        border: 1px solid #ebebeb;
        .product-price {
          // position: absolute;
          // bottom: 20px;
          // left: 0;
          // color: #fff;
          font-size: 12px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
          span {
            color: red;
            font-size: 16px;
            display: inline-block;
            padding: 0 5px;
            font-weight: 600;
          }
        }
        .product-inventory {
          font-size: 12px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: #999999;
          padding: 3px 8px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          overflow: hidden;
        }
        .status {
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.4);
          position: absolute;
          top: 0;
          left: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          li {
            margin: 0;
            width: 100%;
            list-style: none;
            text-align: center;
            height: 40px;
            line-height: 40px;
            color: #ffffff;
            font-size: 18px;
            font-family: MicrosoftYaHei;
            font-weight: 400;
          }
          .yixiajia {
            background-color: #b5b5b5;
          }
          .shenhezhong {
            background-color: #f19149;
          }
        }
      }
      img {
        display: block;
        margin: 0 auto;
        margin-top: 8px;

        width: 90%;
        height: 204px;
        object-fit: cover;
      }
      p {
        font-size: 12px;
        //   width: 140px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding: 0 8px;
        input {
          vertical-align: middle;
        }
      }
    }
    .page {
      margin: 25px 0;
      text-align: center;
    }
  }
  .active {
    color: #606266 !important;
    border: 1px solid #409eff;
  }
  .header_search {
    padding: 12px 20px;
    position: relative;
    cursor: pointer;
    .search {
      width: 60%;
    }
    .search_btn {
    }
    .header_search_wei {
      display: inline-block;
      float: right;
      .warning {
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
    .collection {
      margin-right: 17px;
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

  //
  .product-right {
    label {
      display: inline-block;
      width: 106px;
      height: 29px;
      background: rgba(243, 126, 121, 0.12);
      border: 1px solid rgba(243, 126, 121, 1);
      border-radius: 4px;
      font-size: 12px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(243, 126, 121, 1);
    }
  }

  .cksBottom {
    font-size: 12px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    margin-bottom: 6px;
    input {
      float: right;
    }
  }
}
</style>