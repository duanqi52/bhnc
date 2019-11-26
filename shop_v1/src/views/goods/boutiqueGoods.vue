<template>
  <div>
    <div class="hadeer_tou">
      <div class="hadeer_tou_can cans">
        <span class="filtrate">
          <button @click="grade()" :class="gradeActive ? 'priceSort active':'priceSort'">
            综合排序
            <i :class="gradeSort ? 'iconfont icon-paixushengxu' : 'iconfont icon-paixujiangxu'"></i>
          </button>

          <button
            @click="sell()"
            :class="sellActive ? 'priceSort active':'priceSort'"
            style="margin-left:20px;"
          >
            销量排序
            <i :class="sellSort ? 'iconfont icon-paixushengxu' : 'iconfont icon-paixujiangxu'"></i>
          </button>

          <button @click="price()" :class="priceActive ? 'priceSort active':'priceSort'">
            价格排序
            <i :class="pricesort ? 'iconfont icon-paixushengxu' : 'iconfont icon-paixujiangxu'"></i>
          </button>
        </span>
        <span style="margin-left: 10px;">起订量：</span>
        <div class="header_search">
          <el-input placeholder="起始数量" v-model="searchMap.start_quantity" type="gradeber" clearable></el-input>
        </div>
        <!-- <el-cascader
          v-bind:options="options"
          clearable
          style="width: 230px;"
          v-model="option"
          placeholder="请选择地区"
          @change="scopeSearch()"
        ></el-cascader> -->
        <el-cascader
          v-bind:options="options"
          v-model="option"
          style="width: 230px;"
          type="button"
          placeholder="请选择地区"
          :props="{ checkStrictly: true }"
          @change="scopeSearch()"
          clearable
        ></el-cascader>
        <span style="margin-left: 10px;">关键词：</span>
        <div class="header_search">
          <el-input placeholder="请输入内容" v-model="input" clearable></el-input>
        </div>
        <div class="header_search_wei">
          <el-button type="danger" plain class="saixuan" @click="currentPage=1;search()">筛选</el-button>
        </div>
      </div>
    </div>
    <div class="hadeer_tou_can" v-if="goodsList">
      <ul class="catalogue" v-if="goodsList.length>0">
        <li v-for="(goods,index) in goodsList" :key="index"  @click="toDetail(goods)">
          <div class="catalogue_li">
            <img :src="goods.img[0]" alt class="catalogue_img" />
            <p>
              <span>￥{{goods.price}}/支</span>起
              <span style="float: right;color: white;font-size: 12px;">销量{{goods.sell_count}}</span>
            </p>
          </div>
          <label>
            <span>{{goods.title}}</span>
          </label>
        </li>
      </ul>
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
import citys from "../../components/citys.json";
import url from "@/serverAPI.config.js";
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
      options: [], //所有城市
      option: null,
      pricesort: true,
      sellSort: true,
      gradeSort: true,
      sellActive: false,
      gradeActive: true,
      priceActive: false,
      img_url: "../../../static/img/floor-1-b02.png",
      input: "",
      inputs: "",
      currentPage: 1, //初始页
      pagesize: 10, //    每页的数据
      total: 0,
      searchMap: {
        SKU: "sku_img"
      },
      goodsList: []
    };
  },
  created() {
    this.options = citys;
    this.getActivityGoods(this.currentPage, this.pagesize);
  },
  components: {},
  methods: {
    //初始化currentPage,初始每页数据pagesize和数据data
    handleSizeChange(size) {
      this.pagesize = size;
      this.search();
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage; // 点击第几页
      this.search();
    },
    grade() {
      this.active = name;
      this.gradeSort = !this.gradeSort;
      this.sellActive = false;
      this.gradeActive = true;
      this.priceActive = false;
    },
    sell() {
      this.sellSort = !this.sellSort;
      this.sellActive = true;
      this.gradeActive = false;
      this.priceActive = false;
    },
    price() {
      this.pricesort = !this.pricesort;
      this.sellActive = false;
      this.gradeActive = false;
      this.priceActive = true;
    },
    getActivityGoods(page, size) {
      this.$http({
        url: `${url.activityGoods}/4/${page}/${size}`,
        method: "post",
        data: this.searchMap
      }).then(res => {
        if (res.data.code == 20000) {
          this.goodsList = res.data.data.rows;
          if(this.goodsList)
          this.goodsList.map(item => {
            item.img = JSON.parse(item.img);
            item.sku = JSON.parse(item.sku);
          });
          this.total = res.data.data.total;
        }
      });
    },
    search() {
      if (this.input == "" || !this.input) {
        this.searchMap.SKU = "sku_img";
        this.searchMap.title = this.input;
      } else {
        this.searchMap.SKU = this.input;
        this.searchMap.title = this.input;
      }
      this.getActivityGoods(this.currentPage, this.pagesize);
    },
    grade() {
      this.active = name;
      this.gradeSort = !this.gradeSort;
      this.sellActive = false;
      this.gradeActive = true;
      this.priceActive = false;
      if (!this.gradeSort) {
        this.searchMap.grade_desc = "active";
        this.searchMap.grade_asc = null;
        this.searchMap.sell_desc = null;
        this.searchMap.sell_asc = null;
        this.searchMap.price_desc = null;
        this.searchMap.price_asc = null;
      } else {
        this.searchMap.grade_desc = null;
        this.searchMap.grade_asc = "active";
        this.searchMap.sell_desc = null;
        this.searchMap.sell_asc = null;
        this.searchMap.price_desc = null;
        this.searchMap.price_asc = null;
      }
      this.search();
    },
    sell() {
      this.sellSort = !this.sellSort;
      this.sellActive = true;
      this.gradeActive = false;
      this.priceActive = false;
      if (!this.sellSort) {
        this.searchMap.grade_desc = null;
        this.searchMap.grade_asc = null;
        this.searchMap.sell_desc = "active";
        this.searchMap.sell_asc = null;
        this.searchMap.price_desc = null;
        this.searchMap.price_asc = null;
      } else {
        this.searchMap.grade_desc = null;
        this.searchMap.grade_asc = null;
        this.searchMap.sell_desc = null;
        this.searchMap.sell_asc = "active";
        this.searchMap.price_desc = null;
        this.searchMap.price_asc = null;
      }
      this.search();
    },
    price() {
      this.pricesort = !this.pricesort;
      this.sellActive = false;
      this.gradeActive = false;
      this.priceActive = true;
      if (!this.pricesort) {
        this.searchMap.grade_desc = null;
        this.searchMap.grade_asc = null;
        this.searchMap.sell_desc = null;
        this.searchMap.sell_asc = null;
        this.searchMap.price_desc = "active";
        this.searchMap.price_asc = null;
      } else {
        this.searchMap.grade_desc = null;
        this.searchMap.grade_asc = null;
        this.searchMap.sell_desc = null;
        this.searchMap.sell_asc = null;
        this.searchMap.price_desc = null;
        this.searchMap.price_asc = "active";
      }
      this.search();
    },
    scopeSearch() {
      this.currentPage = 1;
      this.searchMap.region = "";
      if (this.option != null && this.option.length >= 1) {
        this.searchMap.region =
          (this.option[0] ? CodeToText[this.option[0]]+"-" : "") +
          (this.option[1] ? CodeToText[this.option[1]]+"-" : "") +
          (this.option[2] ? CodeToText[this.option[2]]+"" : "");
      }
      this.search();
    },
    // toDetail(goods){
    //   if(goods.is_pay == '1'){
    //     this.$router.push({ path: "/detail", query: { id: goods.id} });
    //   }else{
    //     this.$router.push({ path: "/detailSimple", query: { id: goods.id} });
    //   }
      
    // }
        toDetail(goods) {
          this.utils.toDetailsss(goods);
    },
  }
};
</script>
<style>
.cans .el-input__inner {
  height: 28px !important;
  border: 1px solid #3D91E7;
  line-height: 28px;

}
</style>

<style lang="scss" scoped>
.catalogue {
  padding: 50px 10px;
  li {
    display: inline-block;
    margin: 0px 25px;
    margin-top: 20px;
    .catalogue_li {
      position: relative;
      .catalogue_img {
        width: 180px;
        height: 200px;
        display: inline-block;
      }
      p {
        position: absolute;
        bottom: 5px;
        margin: 0;
        width: 100%;
        background-color: rgba(0, 0, 0, 0.2);
        color: white;
        font-size: 14px;
        span {
          color: red;
          margin-right: 5px;
        }
      }
    }
    label {
      display: inline-block;
      max-width: 100%;
      margin-bottom: 5px;
      font-weight: 700;
      font-size: 14px;
      span {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        width: 170px;
        display: inline-block;
        line-height: 15px;
      }
    }
  }
}
.active {
  color: #606266 !important;
  border: 1px solid #409eff;
}
.filtrate button {
  width: 120px;
  height: 38px;
  background: #fff;
  font-size: 14px;
  color: #c0c4cc;
  border-radius: 5px;
  margin-left: 5px;
}
.hadeer_tou {
  height: 70px;
  line-height: 70px;
  background-color: rgba(248, 248, 248, 1);
}
.hadeer_tou_can {
  width: 1200px;
  margin: 0 auto;
  position: relative;
}
.classify {
  margin-left: 80px;
  position: relative;
  cursor: pointer;
  .classify_a {
    border-bottom: 1px solid;
    width: 50px;
    text-align: center;
    line-height: 15px;
    display: inline-block;
  }
}
.period {
  display: inline-block;
  margin-left: 80px;
}
.header_search {
  display: inline-block;
  .el-input {
    display: inline-block;
    width: 150px;
  }
}
.header_search_wei {
  display: inline-block;
  margin-left: 0px;
  .saixuan {
    display: inline-block;
  }
}
</style>