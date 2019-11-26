<template>
  <div id="bhncCatalogue">
    <div class="cataloguePage">
      <!-- 头部搜索部分 -->
      <div class="header_search clearfix">
        <div class="searchBox">
          <div class="inputBox">
            <input type="text" placeholder="请输入内容" class="searchInput" />
            <i class="el-icon-search"></i>
          </div>
          <div class="selectBtn">
            <input type="button" value="确定" @click="postShop" />
          </div>
        </div>
      </div>
      <!-- 选择地区和商品分类部分 -->
      <div class="selectPart">
        <ul>
          <li>
            <!-- <el-cascader
              v-bind:options="options"
              v-model="option"
              style="width: 100%;"
              placeholder="选择地区"
              :props="{ checkStrictly: true }"
              clearable
            ></el-cascader>-->
          </li>
          <li>
            <!-- <el-select v-model="purchase.type" filterable placeholder="商品分类">
              <el-option
                v-for="item in optionsManage"
                :key="item.id"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>-->
          </li>
        </ul>
      </div>
      <!-- 商品列表部分 -->
      <div class="shopList">
        <ul class="clearfix">
          <li v-for="(item,index) in goodsList" :key="index">
            <div class="liChild">
              <img @click.stop="toDetail(item)" :src="item.img[0]" alt />
              <div class="bottom_content">
                <!-- <p>
                        <span>￥</span>
                        <i>{{formatPrice(item.price)}}</i>起
                </p>-->
                <div class="checkboxs clearfix">
                  <span class="fl">{{item.title}}</span>
                  <div class="checkboxRight fr">
                    <input type="checkbox" @click="selectGoods($event,item.id)" :id="item.id" />
                    <label :for="item.id"></label>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[6, 12, 18, 24]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        style="text-align: center;margin: 30px;"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import citys from "../../components/citys.json";
import url from "../../serverAPI.config.js";

import {
  provinceAndCityData,
  regionData,
  provinceAndCityDataPlus,
  regionDataPlus,
  CodeToText,
  TextToCode
} from "element-china-area-data";
export default {
  data() {
    return {
      makeValue: "",
      goodsList: [],
      goodsIdList: [],
      options: [], //所有城市
      option: null,
      purchase: {
        title: "",
        type: null,
        delivery_date: "",
        offer_count: "",
        content_img: ""
      },
      optionsManage: [], //商品分类
      currentPage: 1, //初始页
      pagesize: 18, //    每页的数据
      total: 0
    };
  },
  mounted() {
    this.options = citys;
    this.getScope();
    this.getMarketingGoods(this.currentPage, this.pagesize);
  },
  updated() {
    this.goodsList.map(item => {
      if(this.goodsIdList.indexOf(item.id) > -1){
        document.getElementById(item.id).checked = true;
      }else{
        document.getElementById(item.id).checked = false;
      }
      
    });
  },
  methods: {
    //初始化currentPage,初始每页数据pagesize和数据data
    handleSizeChange(size) {
      this.pagesize = size;
      this.getMarketingGoods(this.currentPage, this.pagesize);
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage; // 点击第几页
      this.getMarketingGoods(this.currentPage, this.pagesize);
    },

    //获取经营范围
    getScope() {
      this.$http({
        url: `${url.scope}`,
        method: "get"
      })
        .then(res => {
          this.optionsManage = res.data.data;
        })
        .catch(err => {});
    },

    getMarketingGoods(page, size) {
      this.$http
        .get(
          `${url.getMarketingToolGoods}/${localStorage.getItem("username") || localStorage.getItem("siteName")}/${page}/${size}`
        )
        .then(res => {
          if (res.data.code == 20000) {
            this.goodsList = res.data.data.rows;
            this.goodsList.map(item =>{
              item.img = JSON.parse(item.img);
            })
            this.total = res.data.data.total;
          }
        });
    },
    postShop() {
      this.$http({
        url: `${url.saveMarketingToolGoods}/${localStorage.getItem("username") || localStorage.getItem("siteName")}`,
        method: "post",
        data: this.goodsIdList
      }).then(res => {
        if (res.data.code == 20000) {
          this.$router.push("marketing");
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    selectGoods(event, id) {
      if (event.target.checked) {
        this.goodsIdList.push(id);
      } else {
        this.goodsIdList.splice(this.goodsIdList.indexOf(id), 1);
      }
    },
    formatPrice(str) {
      return parseFloat(str).toFixed(2);
    },
    toDetail(goods) {
      window.open(`${url.detailUrl}/details?id=` + goods.id);
    }
  }
};
</script>

<style lang="scss">
#bhncCatalogue {
  .selectPart .el-input--suffix .el-input__inner {
    border: none !important;
    background: #f7f7f7 !important;
    text-align: center;
  }
  .selectPart .el-input--suffix input::-webkit-input-placeholder {
    color: #fc9263;
  }
  .el-pager li.active {
    color: #fc9263;
  }
}
</style>


<style scoped lang="scss">
#bhncCatalogue {
  // 搜索框内容
  .searchBox {
    margin-top: 6px;
    margin-right: 24px;
    padding-bottom: 8px;
    float: right;
    display: flex;
    padding: 12px 20px;
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
  // 选择地区部分
  .selectPart {
    ul {
      display: flex;
      background: rgba(247, 247, 247, 1);
      box-shadow: 0px 1px 8px 0px rgba(0, 0, 0, 0.12);
      li {
        width: 250px;
        height: 42px;
        line-height: 42px;
        text-align: center;
        // border-right: 1px solid rgba(240, 240, 240, 1);
        // font-size: 14px;
        // font-family: MicrosoftYaHei;
        // font-weight: 400;
        // color: rgba(61, 145, 231, 1);
        // cursor: pointer;
      }
    }
  }
  // 商品列表部分
  .shopList {
    ul {
      padding-left: 3%;
      li {
        width: 16%;
        float: left;
        margin-top: 40px;
        font-family: MicrosoftYaHei,微软雅黑;
        // padding-bottom: 15px;
        .liChild {
          width: 84%;
          margin: auto;
          cursor: pointer;
          border: 1px solid #ebebeb;
          img {
            padding-top: 8px;
            display: block;
            margin: 0 auto;
            width: 90%;
            height: 204px;
          }
          .bottom_content {
            padding-top: 16px;
            padding-bottom: 12px;
            p {
              padding: 8px;
              color: #999999;
              font-size: 10px;
              span {
                font-size: 10px;
                color: #ff0303;
              }
              i {
                font-size: 14px;
                color: #ff0303;
              }
            }
            .checkboxs {
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 0 8px;
              span {
                font-size: 12px;
                font-family: MicrosoftYaHei,微软雅黑;
                font-weight: 400;
                color: #666;
                text-overflow: ellipsis;
                /* overflow-wrap: break-word; */
                white-space: nowrap;
                display: inline-block;
                width: 80%;
                overflow: hidden;
                text-align: center;
              }
              label {
                display: inline-block;
                position: relative;
                // padding-left: 40px;
                cursor: pointer;
                height: 14px;
              }
              label::before {
                display: inline-block;
                position: absolute;
                left: 0;
                content: "";
                width: 14px;
                height: 14px;
                border: 1px solid #fc9263;
                margin-right: 40px;
              }
              input[type="checkbox"] {
                display: none;
              }
              input[type="checkbox"]:checked + label::before {
                content: "✔";
                text-align: center;
                line-height: 13px;
                color: #fc9263;
              }
            }
          }
        }
      }
    }
  }
}
</style>


