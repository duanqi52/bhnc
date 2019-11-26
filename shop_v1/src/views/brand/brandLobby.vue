<template>
  <div>
    <div class="head_classify">
      <div class="head_classify_all">
        <span style="width: 80px;display: inline-block;text-indent: 10px;">所有类目</span>
        <div style="width: 85%;display: inline-block;">
          <div class="classify_list" v-for="(item,index) in selectedGoodSpes" :key="index">
            <span style="color:#D21D27">{{item.name}}</span>
            <i class="iconfont icon-roundclose fork" @click="deleteSpe(item.showIndex,index)"></i>
          </div>
        </div>
        <button class="reset" @click="resetSelected()">重置</button>
      </div>
      <div v-for="goodsSpe in goodsSpeList " :key="goodsSpe.param_name">
        <div class="classify_a">
          <span class="text_tou">{{goodsSpe.name}}：</span>
          <ul style="width: 90%;display: inline-block;">
            <li v-for="item in goodsSpe.goods_specification_values" :key="item.id">
              <span
                :style="item.active ? 'color: #3d91e7;':''"
                @click="selectSpe(goodsSpe.param_name, item.name)"
              >{{item.name}}</span>
            </li>
          </ul>
        </div>

      </div>
      <div style="text-align: right;margin-top: 15px;">
        <input type="button" class="reset_a" @click="toogleUnfold()" :value="unfold ? '展开更多' : '收起'">
      </div>
    </div>

    <div class="hadeer_tou">
      <div class="hadeer_tou_can cans" style="background: rgba(246,246,246,1);">
        <span class="filtrate">
          <button @click="grade()" :class="gradeActive ? 'priceSort active':'priceSort'">
            综合排序
            <i :class="gradeSort ? 'iconfont icon-paixushengxu' : 'iconfont icon-paixujiangxu'"></i>
          </button>

          <!-- <button @click="sell()" :class="sellActive ? 'priceSort active':'priceSort'">
            销量排序
            <i :class="sellSort ? 'iconfont icon-paixushengxu' : 'iconfont icon-paixujiangxu'"></i>
          </button>

          <button @click="price()" :class="priceActive ? 'priceSort active':'priceSort'">
            价格排序
            <i :class="pricesort ? 'iconfont icon-paixushengxu' : 'iconfont icon-paixujiangxu'"></i>

          </button>-->
        </span>
        <!-- <span style="margin-left: 10px;">起订量：</span>
        <div class="header_search">
          <el-input placeholder="起始数量" v-model="searchMap.start_quantity" type="gradeber" clearable></el-input>

        </div>-->
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
          <el-input placeholder="请输入关键词" v-model="input" clearable></el-input>
        </div>
        <div class="header_search_wei">
          <button class="saixuan" @click="currentPage=1;search()">筛选</button>
        </div>
      </div>
    </div>
    <div class="hadeer_tou_can" v-if=" goodsList">
      <ul class="catalogue" v-if=" goodsList.length>0">
        <li v-for="(goods,index) in goodsList" :key="index" @click="toDetail(goods)">
          <div class="catalogue_li">
            <img :src="goods.img[0]" alt class="catalogue_img" />
          </div>
          <!-- <p>
            <span style="color: red !important;font-size: 14px;">￥</span>
            <span>{{goods.price}}</span>/支起

          </p>-->
          <label>
            <span>{{goods.title}}</span>
          </label>
          <!-- <p style="border-top: 1px solid #EBEBEB;">销量{{goods.sell_count}}</p> -->
        </li>
      </ul>
    </div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[28, 40,52,64]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      style="border-bottom: 1px solid #f2f2f2;text-align: center;padding: 30px;width: 1200px;margin: 0 auto;background-color: white;"
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
      metaInfo: {
    title: '笔海弄潮品牌大厅，全面展示制笔行业知名品牌产品，推介源头品牌供应商', // set a title
    meta: [{                 // set meta
      name: 'keyWords',
      content: '制笔行业知名品牌、国际品牌、优秀品牌、笔海弄潮品牌城'
    },
    {
        name:"description",
        content: '笔海弄潮提供制笔行业各类品牌供应商联系方式和产品高清图片，派克、万宝龙、施耐德、晨光、真彩、宝克、毕加索、周鲁白等品牌系列产品，免费收录，欢迎前来查询。',
    }],
  },
  data() {
    return {
      options:regionData, //所有城市
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
      pagesize: 28, //    每页的数据
      total: 0,
      searchMap: {
        SKU: "sku_img",
        brandLobby: "1",
        searchData:"",
        statusActivity:'1',
        ids:""
      },
      goodsList: [],
      orginGoodsSpeList: [],
      selectedGoodSpes: [],
      initIndex: 0,
      initSelected: "",
      pageNo: 1,
      start: true,
      end: false,
      goodsStart: false,
      unfold:true
    };
  },
  created() {
    this.initIndex = this.$route.query.initIndex;
    this.initSelected = this.$route.query.initSelected;
    if (this.initIndex && this.initSelected) {
      this.selectedGoodSpes.push({
        showIndex: this.initIndex,
        name: this.initSelected
      });
    }
    let ids = this.$route.query.ids;
    if (!ids) {
      if (this.$route.query.input) {
        this.input = this.$route.query.input;
      }
      if (this.$route.query.scope) {
        this.searchMap.scope = this.$route.query.scope;
      }
    } else {
      this.searchMap.ids = this.$route.query.ids;
    }
    if (this.$route.query.pid) {
      this.searchMap.p_id = this.$route.query.pid;
    }
    this.options = regionData;
    this.searchMap.SKU = null;

    this.getGoodsSpe()
    this.search()
  },
  updated() {
    if (!this.$route.query.ids) $("#searchInput").val(this.input);
    if (!this.goodsStart) {
      return;
    }
    this.start = true;
  },
  mounted(){

  },
  components: {},
  computed: {
    goodsSpeList() {
      const data = this.orginGoodsSpeList.filter(item =>
        !this.selectedGoodSpes.some(spe => spe.showIndex === item.param_name)
      )
      return this.unfold ? data.slice(0, 4) : data
    }
  },
  methods: {
    //展开更多
    toogleUnfold(){
      this.unfold = !this.unfold
    },
    //初始化currentPage,初始每页数据pagesize和数据data
    handleSizeChange(size) {
      this.pagesize = size;
      this.search();
         window.scrollTo(0,0);

    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage; // 点击第几页
      this.search();
         window.scrollTo(0,0);

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
    fetchActivityGoods(page, size) {
      const typeData = this.selectedGoodSpes.reduce((init, next) => {
        init[next.showIndex] = next.name
        return init
      }, {})
      const data = { ...this.searchMap, ...typeData }
      return this.$http.post(`${url.activityGoods}/${page}/${size}`, data)
    },
    getActivityGoods(page, size) { 
      this.fetchActivityGoods(page, size)
        .then(res => {
          if (res.data.code === 20000) {
            this.goodsList = res.data.data.rows || [];
            this.goodsList.map(item => {
              item.img = JSON.parse(item.img);
            });
            this.total = res.data.data.total;
            this.goodsStart = true;
          }
        })
    },
    search() {
      if (this.input == "" || !this.input) {
        this.searchMap.SKU = "sku_img";
        this.searchMap.title = this.input;
      } else {
        this.searchMap.SKU = this.input;
        this.searchMap.title = this.input;
      }
      if (this.$route.query.scope) {
        this.searchMap.scope = this.$route.query.scope;
      }
      this.end = false;
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
          (this.option[0] ? CodeToText[this.option[0]] + "-" : "") +
          (this.option[1] ? CodeToText[this.option[1]] + "-" : "") +
          (this.option[2] ? CodeToText[this.option[2]] + "" : "");
      }
      this.search();
    },
    toDetail(goods) {
      this.utils.toDetailsss(goods);
    },
    //获取商品规格
    getGoodsSpe() {
      this.$http.get(url.GoodsSpecification).then(res => {
        if (res.data.code === 20000) {
          this.orginGoodsSpeList = res.data.data || [];
        }
      })
    },
    selectSpe(paramName, name) {
      this.selectedGoodSpes.push({ showIndex: paramName, name });
      this.end = false;
      this.getActivityGoods(this.currentPage, this.pagesize);
    },

    deleteSpe(showIndex) {
      this.end = false;
      this.selectedGoodSpes = this.selectedGoodSpes.filter(item => item.showIndex !== showIndex)
      this.getActivityGoods(this.currentPage, this.pagesize);
    },
    resetSelected() {
      this.selectedGoodSpes = [];
      this.end = false;
      this.getActivityGoods(this.currentPage, this.pagesize);
    }
  }
};
</script>
<style lang="scss">
$color: #d21d27;
.cans .el-input__inner {
  height: 28px !important;
  border: 1px solid $color;
  line-height: 28px;
}
</style>

<style lang="scss" scoped>
$color: #d21d27;
.catalogue {
  padding: 50px 10px;
  li {
    display: inline-block;
    margin: 0px 45px;
    margin-top: 20px;
    border: 1px solid rgba(235, 235, 235, 1);
    padding: 10px;
    cursor: pointer;
    .catalogue_li {
      position: relative;
      .catalogue_img {
        width: 180px;
        height: 180px;
        display: inline-block;
      }
    }
    label {
      display: inline-block;
      max-width: 100%;
      font-weight: 700;
      font-size: 14px;
      text-align: center;
      padding: 8px 0;
      span {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        width: 170px;
        display: inline-block;
        font-family: MicrosoftYaHei,微软雅黑;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
      }
    }
    p {
      padding-top: 5px;
      font-family: MicrosoftYaHei,微软雅黑;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      font-size: 14px;
      span {
        color: red !important;
        margin-right: 5px;
        font-size: 18px;
        font-family: MicrosoftYaHei,微软雅黑;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
      }
    }
  }
}
.active {
  font-family: MicrosoftYaHei-Bold,微软雅黑;
  font-weight: bold;
  color: $color !important;
}
.filtrate button {
  width: 120px;
  height: 38px;
  background: #fff;
  font-size: 15px;
  color: #c0c4cc;
  border-radius: 5px;
  margin-left: 5px;
  background: rgb(246, 246, 246);
}
.hadeer_tou {
  height: 70px;
  line-height: 70px;
  margin: 8px 0;
  margin-top: 2px;
}
.hadeer_tou_can {
  width: 1200px;
  margin: 0 auto;
  position: relative;
  background-color: white;
  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.12);
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
  float: right;
  margin-right: 10px;
  .saixuan {
    display: inline-block;
    height: 28px;
    width: 80px;
    background-color: $color;
    color: white;
    border-radius: 3px;
  }
}
.head_classify {
  width: 1200px;
  margin: 0 auto;
  background-color: white;
  //min-height: 434px;
  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.12);
  margin-top: 9px;
  font-size: 14px;
  padding: 0 12px 18px 12px;
}
.head_classify_all {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
}
.reset {
  width: 67px;
  height: 29px;
  background: $color;
  border-radius: 4px;
  font-size: 14px;
  font-family: MicrosoftYaHei,微软雅黑;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  display: inline-block;
}
.classify_list {
  display: inline-block;
  min-width: 128px;
  height: 29px;
  background: #f3f8fd;
  border: 1px solid rgba(210, 29, 39, 1);
  border-radius: 4px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-top: 5px;
  margin-right: 10px;
  padding: 0 10px;
}
.fork {
  font-size: 19px;
  color: #c0c0c0;
  cursor: pointer;
  margin-left: 10px;
}
.text_tou {
  //width: 80px;
  display: inline-block;
  color: #999999;
  text-indent: 10px;
  float: left;
  margin-top: 10px;
}
.classify_a {
  border: 1px solid rgba(240, 240, 240, 1);
  min-height: 46px;
  ul {
    li {
      display: inline-block;
      margin: 10px 20px;
      cursor: pointer;
    }
  }
}
.reset_a {
  width: 67px;
  height: 28px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(192, 192, 192, 1);
  border-radius: 4px;
  font-size: 14px;
  font-family: MicrosoftYaHei,微软雅黑;
  font-weight: 400;
  color: rgba(192, 192, 192, 1);
  cursor: pointer;
}
</style>
