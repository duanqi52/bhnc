<template>
  <div id="bhncSupplier">
    <div class="header_search">
      <!-- <el-input
                placeholder="请输入内容"
                v-model="input"
                class="search"
                clearable>
      </el-input>-->
      <!-- <el-button type="primary" icon="el-icon-search" class="search_btn" @click="getSearch()">搜索</el-button> -->
      <div class="header_search clearfix">
        <div class="searchBox">
          <div class="inputBox">
            <input type="text" placeholder="请输入内容" class="searchInput" v-model="input" />
            <i class="el-icon-search" @click="getSearch"></i>
            <!-- <input type="button" value="搜索" @click="getSearch()"> -->
          </div>
          <!-- <div class="collection">
            <input type="button" value="收藏" @click="collection()" v-if="col" />
            <input type="button" value="全部供应商" @click="collection()" v-if="!col" />
          </div>-->
          <div class="selectBtn">
            <input type="button" value="筛选" @click="show3 = !show3" />
          </div>
        </div>
        <!-- <el-button type="primary" icon="el-icon-search" class="search_btn" >搜索</el-button> -->
        <!-- <div class="header_search_wei">
                <el-button type="danger" plain class="saixuan" @click.native="filtrateStatus">筛选</el-button>
        </div>-->
      </div>
      <div class="header_search_wei">
        <!-- <el-button type="warning" class="warning" @click="collection()" v-if="col">收藏</el-button>
                <el-button type="warning" class="warning" @click="collection()" v-if="!col">全部供应商</el-button>
        <el-button type="danger" plain class="saixuan" @click="show3 = !show3">筛选</el-button>-->
        <div class="tangchu">
          <el-collapse-transition>
            <div v-show="show3" style="padding: 13px; border: 1px solid #fc9263;">
              <div>
                <p class="region">地区</p>
                <el-cascader
                  v-bind:options="options"
                  v-model="option"
                  style="width: 100%;"
                  placeholder="请选择地区"
                  :props="{ checkStrictly: true }"
                  clearable
                ></el-cascader>
              </div>
              <!-- <div>
                <p class="region_a">经营方式</p>
                <el-checkbox-group v-model="checkList">
                  <el-checkbox label="生产加工"></el-checkbox>
                  <el-checkbox label="批发代理"></el-checkbox>
                </el-checkbox-group>
              </div> -->
              <div>
                <p class="region_a">采购商分类</p>
                <el-checkbox
                  :indeterminate="isIndeterminate"
                  v-model="checkAll"
                  @change="handleCheckAllChange"
                >全选</el-checkbox>
                <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                  <el-checkbox v-for="(city,index) in cities" :label="city" :key="index">{{city}}</el-checkbox>
                </el-checkbox-group>
              </div>
              <div class="but_que">
                <el-button @click="show3 = !show3" type="info">取消</el-button>
                <el-button @click="show3 = !show3;scopeSearch()" type="warning">确定</el-button>
              </div>
            </div>
          </el-collapse-transition>
        </div>
      </div>
    </div>

    <div class="order-list">
      <el-table
        stripe
        :data="supplierList"
        style="width: 100%"
        :header-cell-style="{background:'#F7F7F7',color:'#606266',fontWeight:'bold'}"
        :row-class-name="tableRowClassName"
        align="center"
      >
        <!-- <el-table-column label="供应商ID" prop="id" align="center"></el-table-column> -->
        <el-table-column label="名称" prop="company_name" align="center"></el-table-column>
        <el-table-column label="地区" prop="region" align="center"></el-table-column>
        <el-table-column label="经营方式" prop="pattern" align="center"></el-table-column>
        <!-- <el-table-column label="经营范围" prop="scope" align="center">
          <template slot-scope="scope">
            <span v-for="(item,index) in scope.row.scope" :key="index">
              {{item}}
              <span v-if="index != scope.row.scope.length-1">、</span>
            </span>
          </template>
        </el-table-column>-->
        <el-table-column label="业务联系人" prop="linkman" align="center"></el-table-column>
        <el-table-column label="业务手机号码" prop="phone" align="center"></el-table-column>
        <el-table-column label="固定电话" prop="isphone" align="center"></el-table-column>
        <el-table-column label="QQ号码" prop="qq" align="center"></el-table-column>
        <el-table-column label="合作情况" prop="partner" align="center"></el-table-column>
        <!-- <el-table-column label="联系地址" prop="address" align="center"></el-table-column> -->
        <el-table-column label="收藏" prop="collection" align="center">
          <template slot-scope="scope">
            <div>
              <!-- <i @click="star(scope.row.id,'0')" class="el-icon-star-off" style="font-size: 30px;color: yellow" v-if="scope.row.collect == '1'"></i>
              <i @click="star(scope.row.id,'1')" class="el-icon-star-off" style="font-size: 30px;" v-else></i>-->
              <i
                @click="star(scope.row.id,'0')"
                class="iconfont"
                style="font-size: 30px;color: #e6424f; cursor:pointer"
                v-if="scope.row.collection"
              >&#xe668;</i>
              <i
                @click="star(scope.row.id,'1')"
                class="iconfont"
                style="font-size: 30px; color:#e6424f; cursor:pointer"
                v-else
              >&#xe669;</i>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="see">
          <template slot-scope="scope">
            <!-- <div v-if="scope.row.is_look == '0'" class="payment">
              <el-button size="mini" @click="open(scope.row.id)">查看</el-button>
              <br />
              <span style="font-size:12px;color:#f40;" v-if="currentLevel<2">(级别不足)</span>
              <span style="font-size:12px;color:#f40;" v-if="currentLevel>=2">(级别满足)</span>
            </div>
            <el-button size="mini" v-if="scope.row.is_look == '1'" disabled>已查看</el-button>-->
            <button
              class="seedetails"
              @click="toDetails('/supplierDetail?index=0&id='+scope.row.id)"
            >查看详情</button>
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
      z
      style="text-align: center;margin: 30px;"
    ></el-pagination>
  </div>
</template>

<script>
import url from "../../serverAPI.config.js";
import citys from "../../components/citys.json";
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
      input: "",
      options: [], //所有城市
      option: null,
      show3: false,
      checkAll: false,
      checkedCities: [],
      cities: [],
      isIndeterminate: true,
      supplierList: [], //供应商列表
      checkList: [],
      isActive: true,
      hasError: false,
      currentIntegral: "", //积分
      currentLevel: "", //等级
      lookProvider: "", //查看供应商消耗积分
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIxIiwic3ViIjoiMTM0MzMxNTcxNDciLCJpYXQiOjE1NjAzMzQzNTEsInJvbGVzIjoidXNlciJ9.cpLQ0B-asQpLawZ_uoEi0VkMlfbVWgWO4rxKtKeD404"
      },
      searchMap: {
        dealer:"1",
        id: "",
        region: "",
        address: "",
        scopeList: [],
        scope: "",
        linkman: "",
        phone: "",
        company_name: "",
        collect: "",
        is_look: "",
        pattern: []
      },
      col: true,
      currentPage: 1, //初始页
      pagesize: 10, //    每页的数据
      activeName: "first",
      tableData: [],
      total: 0,
      userName: ""
    };
  },

  components: {},
  mounted() {
    this.options = citys;
    this.userName = localStorage.getItem("username") || localStorage.getItem("siteName");
    this.search(this.currentPage, this.pagesize);
  },
  methods: {
    toDetails(url){  
      
    this.$router.push(url);
    },
    //初始化currentPage,初始每页数据pagesize和数据data
    handleSizeChange(size) {
      this.pagesize = size;
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage; // 点击第几页
      this.search(this.currentPage, this.pagesize);
    },
    star(pid, collect) {
      if (collect == 1) {
        this.$http({
          method: "get",
          url: `${url.addCollect}/${localStorage.getItem("ID")}/${pid}/1`
        }).then(res => {
          this.$message.success("收藏成功");
          this.search(this.currentPage, this.pagesize);
        });
      } else {
        this.$http({
          method: "delete",
          url: `${url.deleteCollect}/${localStorage.getItem("ID")}/${pid}/1`
        }).then(res => {
          this.$message.error("已取消收藏");

          this.search(this.currentPage, this.pagesize);
        });
      }
    },
    //隔行变色
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 == 1) {
        return "warning-row";
      } else {
        return "success-row";
      }
    },
    handleCheckAllChange(val) {
      this.checkedCities = val ? this.cities : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
    },
    //点击查看
    open(pid) {
      //级别不足查看
      if (this.currentLevel == "1") {
        this.$confirm(
          "您的级别没有权限查看供应商信息，请充值积分达到2级会员！",
          "提示",
          {
            confirmButtonText: "去充值",
            cancelButtonText: "取消",
            type: "warning",
            center: true
          }
        )
          .then(() => {
            this.$router.push("/recharge");
          })
          .catch(() => {});
      } else {
        //级别满足查看
        this.$confirm(
          `本次查看供应商信息将消耗${this.lookProvider}积分，是否继续查看？`,
          "提示",
          {
            confirmButtonText: "确认",
            cancelButtonText: "取消",
            type: "warning",
            center: true
          }
        )
          .then(() => {
            this.$http({
              method: "put",
              url: url.Supplier_a + `${pid}/0`
              //headers: this.headers  //请求头里会添加Authorization属性为'code_bunny'
            }).then(res => {
              this.search(this.currentPage, this.pagesize);
            });
          })
          .catch(() => {});
      }
    },
    //搜索
    search(page, size) {
      var username = this.userName;
      this.searchMap.dealer_type = JSON.stringify(this.checkedCities);
      this.searchMap.pattern = JSON.stringify(this.checkList);
      this.$http({
        method: "post",
        url: url.Supplier_b + `${page}/${size}`,
        // headers: this.headers,  //请求头里会添加Authorization属性为'code_bunny'
        data: this.searchMap
      }).then(res => {
        if (res.data.code == 20000) {
          this.supplierList = res.data.data.data.rows;
          for (var i = 0; i < this.supplierList.length; i++) {
            if (this.supplierList[i].is_look)
              this.supplierList[i].is_look = JSON.parse(
                this.supplierList[i].is_look
              );
            if (this.supplierList[i].scope)
              this.supplierList[i].scope = JSON.parse(
                this.supplierList[i].scope
              );
            if (this.supplierList[i].pattern)
              this.supplierList[i].pattern = JSON.parse(
                this.supplierList[i].pattern
              ).join("、");
            if (this.supplierList[i].is_look)
              this.supplierList[i].is_look.map(item => {
                if (item == username) {
                  this.supplierList[i].is_look = "1";
                  return;
                } else {
                  this.supplierList[i].is_look = "0";
                }
              });

            if (this.supplierList[i].fixphone)
              this.supplierList[i].fixphone = JSON.parse(
                this.supplierList[i].fixphone.join("、")
              );
            if (this.supplierList[i].qq)
              this.supplierList[i].qq = JSON.parse(
                this.supplierList[i].qq
              ).join("、");
            if (this.supplierList[i].partner) {
              this.supplierList[i].partner = "已合作";
            } else {
              this.supplierList[i].partner = "未合作";
            }
          }
          this.currentIntegral = res.data.data.currentIntegral;
          this.currentLevel = res.data.data.currentLevel;
          this.lookProvider = res.data.data.lookProvider;
          this.total = parseInt(res.data.data.data.total);
        }
      });
      this.cities = [];
      //this.getScope();
      this.getDealerScope();
    },
    //收藏
    collection() {
      this.currentPage = 1;
      var username = this.userName;
      if (this.col) {
        this.searchMap.collect = username;
        this.col = !this.col;
      } else {
        this.searchMap.collect = "";
        this.col = !this.col;
      }
      this.search(this.currentPage, this.pagesize);
    },
    //筛选
    scopeSearch() {
      this.currentPage = 1;
      this.searchMap.region = "";
      if (this.option != null && this.option.length >= 1) {
        this.searchMap.region =
          (this.option[0] ? CodeToText[this.option[0]] + "-" : "") +
          (this.option[1] ? CodeToText[this.option[1]] + "-" : "") +
          (this.option[2] ? CodeToText[this.option[2]] + "-" : "");
      }
      this.search(this.currentPage, this.pagesize);
    },
    //获取经营范围
    getScope() {
      this.$http({
        method: "get",
        url: `${url.scope}`
        // headers: this.headers,  //请求头里会添加Authorization属性为'code_bunny'
      }).then(res => {
        if (res.data.code == 20000) {
          res.data.data.map(item => {
            this.cities.push(item.name);
          });
        }
      });
    },
    //搜索按钮，搜索input
    getSearch() {    
      this.currentPage = 1;
      this.searchMap.address = this.input;
      this.searchMap.linkman = this.input;
      this.searchMap.phone = this.input;
      this.searchMap.company_name = this.input;
      this.search(this.currentPage, this.pagesize);
    },
    getDealerScope() {
      this.$http({
        url: `${url.dealerScope}`,
        method: "get"
      }).then(res => {
        if (res.data.code == 20000) {
          var dealerScopeList = res.data.data;
          dealerScopeList.map(item =>{
              this.cities.push(item.name)
          })
          
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
  }
};
</script>
<style lang="scss">
$color: #fc9263;
#bhncSupplier {
  tbody .el-table__row td {
    font-size: 12px;
    font-family: MicrosoftYaHei,微软雅黑;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
  }
   //复选框样式
  .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
    color: $color;
  }
  .el-checkbox__input.is-focus .el-checkbox__inner {
    border-color: $color;
    }
  .el-checkbox__inner:hover {
    border-color: $color;
  }
  .el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: $color;
  }
  .el-checkbox__input.is-checked .el-checkbox__inner,
  .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: #f6f6f6;
    border-color: #666666;
  }
  .el-checkbox__input.is-checked .el-checkbox__inner::after {
    -webkit-transform: none;
    transform: none;
    border: none;
  }
  .el-checkbox__inner::after {
    border: none;
    content: "✔";
    left: 1px;
    position: absolute;
    top: -1px;
  }
  .el-checkbox__input.is-checked+.el-checkbox__label {
    color: black;
  }
  .el-cascader .el-input .el-input__inner:focus, .el-cascader .el-input.is-focus .el-input__inner {
    border-color: $color;
  }
}
</style>

<style lang="scss" scoped>
#bhncSupplier {
  .but_que {
    display: flex;
    justify-content: space-evenly;
    margin: 20px 0 10px 0;
  }
  .el-checkbox {
    margin-top: 10px;
  }
  .tangchu {
    position: absolute;
    right: 15px;
    width: 400px;
    display: inline-block;
    z-index: 999;
    background-color: white;
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
  .region {
    margin-bottom: 10px;
  }
  .region_a {
    margin: 10px 0;
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
        background: #d2353d;
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
        background: rgba(235, 97, 0, 0.12);
        border: 1px solid rgba(235, 97, 0, 1);
        border-radius: 8px;
        line-height: 40px;
        font-size: 16px;
        font-family: MicrosoftYaHei,微软雅黑;
        font-weight: 400;
        color: rgba(230, 141, 87, 1);
        cursor: pointer;
      }
    }
  }
  .payment {
    .el-button {
      width: 52px;
      height: 26px;
      background: rgba(61, 145, 231, 0.12);
      border: 1px solid rgba(61, 145, 231, 1);
      border-radius: 8px;
      font-size: 12px;
      font-family: MicrosoftYaHei,微软雅黑;
      font-weight: 400;
      color: rgba(61, 145, 231, 1);
    }
  }
  .seedetails {
    width: 80px;
    height: 26px;
    background: rgba(252, 146, 99, 0.12);
    border: 1px solid rgba(252, 146, 99, 1);
    border-radius: 8px;
    font-size: 12px;
    font-family: MicrosoftYaHei,微软雅黑;
    font-weight: 400;
    color: rgba(252, 146, 99, 1);
  }
}
</style>



