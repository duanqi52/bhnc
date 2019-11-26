<!-- 组件说明 -->
<template>
  <div class="commodity-box" id="bhncCommodity" @click="operation=false">
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
        <div class="headerTitle">我的商品</div>
        <div class="searchBox">
          <div class="inputBox">
            <input type="text" placeholder="请输入内容" class="searchInput" v-model="input" />
            <i class="el-icon-search" @click="getSearch"></i>
            <!-- <input type="button" value="搜索" @click="getSearch()"> -->
          </div>
          <!-- <div class="collection">
            <input type="button" value="增加库存" @click.stop="addInventory()" />
          </div> -->
          <div class="collection">
            <input
              type="button"
              value="发布新商品"
              @click="postTrade()"
              style="width: 125px;background: red;"
            />
          </div>
          <!-- <div class="selectBtn">
            <input type="button" value="我的收藏" @click="$router.push('/collection')" />
          </div>-->
        </div>
      </div>
      <!-- 搜索结束 -->
      <div id="kucunMask" v-if="operation">
        <div class="add-operation" id="addOperation" @click.stop>
          <div class="title">
            <p
              style="font-size:24px;font-family:Microsoft YaHei;font-weight:400;color:rgba(252,146,99,1);text-align:left;padding-left:48px;"
            >增加库存</p>
          </div>
          <div class="item">
            <el-table :data="goodsAddList">
              <el-table-column prop="title" label="商品" align="center"></el-table-column>
              <el-table-column prop="style_number" label="款号" align="center"></el-table-column>
              <!-- <el-table-column label="颜色" align="center">
                    <template slot-scope="scope">
                        <div v-for="(item,index) in scope.row.sku" :key="index">{{item.color}}</div>
                    </template>
              </el-table-column>-->
              <el-table-column label="增加库存" align="center">
                <template slot-scope="scope">
                  <i style="font-size: 14px;">&nbsp;原库存:{{scope.row.total_inventory}}</i>
                  <el-input v-model="scope.row.newAddInventory" style="width: 80px;" type="tel" min=1 v-fixnumber></el-input> 
                  <p style="font-size: 14px;color: red">{{mgs}}</p>               
                </template>
              </el-table-column>
            </el-table>
            <div class="btn-box">
              <el-button
                type="info"
                @click="hide()"
                style="width: 80px;height: 35px;background: rgba(192,192,192,1);border-radius: 8px;border: none;"
              >取消</el-button>
              <el-button
                type="success"
                @click="updateInventory()"
                style="width:80px;height:35px;background:rgba(252,146,99,1);border-radius:8px;  border: none;"
              >确定</el-button>
            </div>
          </div>
        </div>
      </div>

      <div class="product">
        <div class="product-title clearfix">
          <div class="product-left">
            <div class="filtrate">
              <!-- <el-select
                v-model="searchMap.scope"
                placeholder="商品分类"
                @change="getGoods(currentPage,pageSize);timeActive=false;numActive=false;priceActive=false;"
                style="border:none;"
              >
                <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>-->
              <el-select
                v-model="searchMap.status"
                placeholder="商品状态"
                @change="getGoods(currentPage,pageSize);timeActive=false;numActive=false;priceActive=false;"
              >
                <el-option
                  v-for="item in statusList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <button
                @click="time()"
                :class="timeActive ? 'priceSort active':'priceSort'"
                style="padding-left:20px;border-left:1px solid #d0d0d0;border-radius:unset"
              >
                发布时间
                <i
                  :class="timeSort ? 'iconfont icon-paixushengxu' : 'iconfont icon-paixu-shuliangshengxu'"
                ></i>
              </button>

              <!-- <button @click="num()" :class="numActive ? 'priceSort active':'priceSort'">
                起订量
                <i
                  :class="numSort ? 'iconfont icon-paixushengxu' : 'iconfont icon-paixu-shuliangshengxu'"
                ></i>
              </button>

              <button @click="price()" :class="priceActive ? 'priceSort active':'priceSort'">
                价格
                <i
                  :class="pricesort ? 'iconfont icon-paixushengxu' : 'iconfont icon-paixu-shuliangshengxu'"
                ></i>
              </button>-->

              <!-- <el-button type="primary">筛选</el-button> -->
            </div>
          </div>
          <div class="product-right">
            <el-button type="danger" plain @click="deleteSoldOut()">清空已下架</el-button>
            <el-button type="danger" plain @click="soldOut()">
              <i class="iconfont icon-pick"></i> 下架
            </el-button>
            <el-button type="danger" plain @click="deleteMore()">删除</el-button>
          </div>
        </div>
        <div class="product-list clearfix">
          <div class="product-item" v-for="item in goodsList" :key="item.id">
            <img :src="item.img[0]" alt @click.stop="toDetail(item)" />
            <!-- <div class="product-price">
              <p>
                <span>{{item.price}}/支</span>
                {{item.startQuantity}}起
              </p>
            </div>-->
            <p
              class="cksBottom"
              style="font-size:16px;padding-top:12px;text-align:center"
            >{{item.title}}</p>
            <div class="product-inventory clearfix">
              <span class="fl">库存：{{item.total_inventory}}</span>
              <div class="fr">
                <input type="checkbox" @click="selectGoods($event,item)" :id="gernerateId(item.id)" />
                <label :for="gernerateId(item.id)"></label>
              </div>
            </div>

            <div class="status" v-if="item.status == '0' || item.status == '2' || item.status == '3' ? true : false">
              <li v-if="item.status == '0' ? true : false" class="shenhezhong">审核中</li>
              <li disabled v-if="item.status == '2' ? true : false" class="yixiajia">已下架</li>
              <li disabled v-if="item.status == '3' ? true : false" class="yixiajia">已下架</li>
            </div>
          </div>
        </div>
        <div class="page">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[18,24,30]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </div>
    </div>
    <popups style="display:none" :wenz="wenz" id="popups"></popups>
  </div>
</template>

<script>
//import x from ''
import url from "@/serverAPI.config.js";
import popups from "../../components/popup/popup_a.vue";
import { parse } from 'path';
export default {
  components: {
    popups
  },
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
      mgs:"",

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
      pageSize: 18,
      total: 0,
      addOperation: [
        { id: 1, name: "1111", styleNumber: "222", color: "333", add: 312312 }
      ],
      operation: false,
      searchMap: {
        SKU: "sku_img",
        status: ""
      },
      ids: [],
      goodsSoldOutList: [],
      goodsAddList: [],
      wenz: "商品提交成功，请耐心等候客服人员审核"
    };
  },
  beforeUpdate() {
    var isShow = this.$route.query.isShow;
    if (isShow) {
      document.getElementById("popups").style.display = "";
    }
    this.$router.push("/commodity")
  },
  computed: {},
  methods: {
    addInventory() {
         if (this.goodsAddList.length < 1) {
        if (document.getElementsByClassName("el-message").length == 0)
          this.$message.error("请选择商品");
        return;
      }
      if (this.goodsAddList.length != 1) {
        if (document.getElementsByClassName("el-message").length == 0)
          this.$message.error("库存只能单选!");
        return;
      }
      var isXH = true;
      this.goodsAddList.map(item => {
        if (item.spot_goods == "1") {
          isXH = true;
        } else {
          isXH = false;
        }
      });
      if (!isXH) {
        if (document.getElementsByClassName("el-message").length == 0)
          this.$message.error("此商品非现货!");
        return;
      }
      this.operation = true;
    },
    hide() {
    for (let i = 0; i < this.goodsAddList.length; i++) {
     if (this.goodsAddList[i].newAddInventory) {            
         delete this.goodsAddList[i].newAddInventory;
       }   
    }
      this.mgs="";
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
     
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getGoods(this.currentPage, this.pageSize);
      
    },
    //动态生成id
    gernerateId(index) {
      return "imgChecked" + index;
    },
    getGoods(page, size) {    
      if (this.searchMap.type != null && this.searchMap.type == "全部") {
        this.searchMap.type = "";
      }
      this.searchMap.p_id = localStorage.getItem("siteName");
      this.$http({
        //url:'http://172.16.0.138:9009/goods/search/'+page+"/"+size,
        url: `${url.Goods}/search/${page}/${size}`,
        method: "post",
        data: this.searchMap
      }).then(res => {
        if (res.data.code == 20000) {     
          this.goodsList = res.data.data.rows;      
          this.goodsList.map((item, index) => {
            item.title = item.title ? item.title : "　 ";
            item.img = JSON.parse(item.img);
          });
          this.total = res.data.data.total;
        }
      });
    },

    //获取经营范围
    getScope() {
      this.$http({
        url: `${url.scope}`,
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
      //var goodsSoldOut = JSON.parse(JSON.stringify(item));
      //   goodsSoldOut.status = "2";
      //   goodsSoldOut.img = JSON.stringify(goodsSoldOut.img);
      //   goodsSoldOut.sku = JSON.stringify(goodsSoldOut.sku);

      if ($event.target.checked) {
        this.ids.push(item.id);
        this.goodsSoldOutList.push(item);

        this.goodsAddList.push(item);
      } else {
        this.ids.splice(this.ids.indexOf(item.id), 1);
        this.goodsSoldOutList.splice(this.goodsSoldOutList.indexOf(item), 1);
        this.goodsAddList.splice(this.goodsSoldOutList.indexOf(item), 1);
      }
    },

    soldOut() {
      var ids = [];
      this.goodsSoldOutList.map(item => {
        ids.push(item.id);
      });
      this.$http({
        url: `${url.soldOutGoods}`,
        method: "put",
        data: ids
      })
        .then(res => {
          if (res.data.code == 20000) {
            location.reload(true);
          }
        })
        .catch(err => {
        });
    },

    deleteMore() {
      this.$http({
        url: `${url.Goods}/deleteMore`,
        method: "delete",
        data: this.ids
      })
        .then(res => {
          location.reload(true);
        })
        .catch(err => {
          console.log(err);
        });
    },
    deleteSoldOut() {
      var ids = [];
      
      this.goodsList.map(item => {
        if (item.status == "2" ||item.status=="3") {
          ids.push(item.id);         
        }
      });
      this.$http({
        url: `${url.Goods}/deleteMore`,
        method: "delete",
        data: ids
      })
        .then(res => {
          location.reload(true);
        })
        .catch(err => {
          console.log(err);
        });
    },
    updateInventory() {
     var str = /^([1-9]{1}\d*)$/;     
    for (let i = 0; i < this.goodsAddList.length; i++) {
     if (this.goodsAddList[i].newAddInventory) {            
          if(!str.test(this.goodsAddList[i].newAddInventory)){
               this.mgs="库存只能填写整数,且大于0";
               return;  
                 
          }else{
            this.mgs="";
          }
          var j = parseInt(this.goodsAddList[i].newAddInventory);
         this.goodsAddList[i].total_inventory=(j+this.goodsAddList[i].total_inventory)+"";     
         this.goodsAddList[i].newAddInventory="";
       }   
    }
      this.$http({
        //url:'http://172.16.0.138:9009/goods/updateInventory',
        url: `${url.updateInventory}`,
        method: "put",
        data: this.goodsAddList
      })
        .then(res => {
          if (res.data.code == 20000) {
            location.reload(true);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    toDetail(goods) {
      window.open(`${url.detailUrl}/details?id=` + goods.id);
    }
  },
  created() {
    this.getGoods(this.currentPage, this.pageSize);
    this.getScope();
    (this.username = localStorage.getItem("siteName")),
      (this.searchMap.p_id = this.username);
  }
};
</script>

<style lang="scss">
/* 重置饿了么样式 */
#bhncCommodity {
  .commodity .filtrate .el-select .el-input--suffix .el-input__inner {
    /* border: none; */
    height: 21px;
    line-height: 21px;
    color: #fc9263;
    background: transparent;
    padding-right: 0px;
    border: none;
  }

  .product-right .el-button {
    padding: 5px 20px;
  }
  .filtrate .el-input__suffix {
    right: -12px;
  }
  .el-pager li.active {
    color: #fc9263;
  }
  #addOperation {
    .el-table th > .cell {
      font-size: 20px;
      font-family: Microsoft YaHei,微软雅黑;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
    }

    .el-table__body-wrapper .cell {
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      white-space: nowrap;
      word-break: break-word;
      font-size: 20px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
    }
  }
}

.el-select-dropdown__item.selected {
  color: #fc9263;
  font-weight: 700;
}
</style>



<style lang='scss' scoped>
#bhncCommodity {
  //@import url()
  .fl {
    float: left;
  }
  .fr {
    float: right;
  }
  .commodity {
    .headerTitle {
      float: left;
      font-size: 20px;
      font-family: MicrosoftYaHeiLight;
      font-weight: bold;
      color: rgba(102, 102, 102, 1);
      line-height: 2;
      padding-left: 30px;
    }

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
    #kucunMask {
      width: 100%;
      position: fixed;
      top: 0;
      left: 0;
      height: 100%;
      background: rgba(0, 0, 0, 0.69);
      z-index: 6667;

      .add-operation {
        width: 652px;
        height: 324px;
        border: 1px solid #e6e6e6;
        overflow: auto;
        position: absolute;
        top: 50%;
        right: 50%;
        background: #fff;
        z-index: 6666;
        border-radius: 10px;
        padding: 0 15px;
        margin-top: -150px;
        margin-right: -326px;
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
        float: left;
        .filtrate {
          div {
            margin: 0 40px;
            width: 86px;
          }
          button {
            width: 105px;
            // height: 21px;
            background: transparent;
            font-size: 14px;
            color: #666666;
            border-radius: 5px;
            //   margin-left: 5px;
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
        // width: 12.5%;
        width: 184px;
        margin-bottom: 20px;
        position: relative;
        margin: 20px 28px;
        float: left;
        border: 1px solid #ebebeb;
        .product-price {
          // position: absolute;
          // bottom: 20px;
          // left: 0;
          // color: #fff;
          font-size: 12px;
          font-family: MicrosoftYaHei,微软雅黑;
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
          font-family: MicrosoftYaHei,微软雅黑;
          font-weight: 400;
          color: #999999;
          padding: 0 12px;
          line-height: 2;
          padding-top: 5px;
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
            font-family: MicrosoftYaHei,微软雅黑;
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
      //   .product-item:nth-child(6n) {
      //     margin-right: 0;
      //   }
      img {
        display: block;
        margin: 0 auto;
        margin-top: 8px;

        width: 90%;
        height: 158px;
        object-fit: cover;
      }
      p {
        font-size: 12px;
        //   width: 140px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding: 0 10px;
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
    border: none;
  }
  .header_search {
    padding: 12px 20px;
    position: relative;
    // cursor: pointer;
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
    .collection {
      margin-right: 17px;
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

  //
  .product-right {
    float: right;
    padding-right: 34px;
    label {
      display: inline-block;
      width: 106px;
      height: 29px;
      background: rgba(243, 126, 121, 0.12);
      border: 1px solid rgba(243, 126, 121, 1);
      border-radius: 4px;
      font-size: 12px;
      font-family: MicrosoftYaHei,微软雅黑;
      font-weight: 400;
      color: rgba(243, 126, 121, 1);
    }
  }

  .cksBottom {
    font-size: 16px;
    font-family: MicrosoftYaHei,微软雅黑;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
  }

  // 复选框样式
  label {
    //   float: right;
    display: inline-block;
    position: relative;
    padding-left: 40px;
    cursor: pointer;
    height: 30px;
  }
  label::before {
    display: inline-block;
    position: absolute;
    right: 0;
    top: 5px;
    content: "";
    width: 18px;
    height: 18px;
    border: 1px solid;
    // margin-right: 40px;
  }
  input[type="checkbox"] {
    display: none;
  }
  input[type="checkbox"]:checked + label::before {
    content: "✔";
    text-align: center;
    line-height: 18px;
    //   color: #FC9263;
  }
}
</style>