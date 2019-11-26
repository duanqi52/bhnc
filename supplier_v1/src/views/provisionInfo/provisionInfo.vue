<template>
  <div id="bhncProvisionInfo">
    <div class="header_search clearfix">
      <div class="searchBox">
        <div class="inputBox">
          <input type="text" placeholder="请输入内容" class="searchInput" v-model="input" />
          <i class="el-icon-search" @click="getSearch()"></i>
        </div>
        <div class="header_search_wei">
          <!-- <button class="soldOld" >下架</button> -->
          <button class="warning" @click="$router.push('./issueProvisionInfo')">发布供应信息</button>
        </div>
      </div>
    </div>
    <el-table
      stripe
      ref="multipleTable"
      :data="supplyInfoList"
      tooltip-effect="dark"
      style="width: 100%;cursor: pointer;"
      :header-cell-style="{background:'#F7F7F7',color:'#606266',fontWeight:'bold',borderTop:'1px solid#E2E2E2'}"
      align="center"
      @selection-change="handleSelectionChange"
      @row-click="provisionInfoDetails"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="标题" prop="title" align="center"></el-table-column>
      <el-table-column label="商品单价" prop="price" align="center"></el-table-column>
      <el-table-column label="供应数量" prop="count" align="center"></el-table-column>
      <el-table-column label="发布时间" prop="date" align="center"></el-table-column>
      <el-table-column label="查看次数" prop="look_count" align="center"></el-table-column>
      <el-table-column label="最后一次查看" prop="last_date" align="center"></el-table-column>
      <el-table-column label="状态" align="center">
        <template
          slot-scope="scope"
        >{{ scope.row.status =='0'?"审核中":"" }}{{ scope.row.status =='1'?"已发布":"" }}{{ scope.row.status =='2'?"已驳回":"" }}</template>
      </el-table-column>
    </el-table>
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
      tableData: [
        {
          title: "爱仕达",
          unit: "120.0",
          supplyNum: "12",
          issuedate: "2016-05-03",
          date: "2016-05-03",
          address: "上海市普陀区金沙江路 1518 弄",
          state: "已发布",
          number: "1"
        },
        {
          title: "爱仕达",
          unit: "120.0",
          supplyNum: "12",
          issuedate: "2016-05-03",
          date: "2016-05-03",
          address: "上海市普陀区金沙江路 1518 弄",
          state: "审核中",
          number: "1"
        },
        {
          title: "爱仕达",
          unit: "120.0",
          supplyNum: "12",
          issuedate: "2016-05-03",
          date: "2016-05-03",
          address: "上海市普陀区金沙江路 1518 弄",
          state: "已下架",
          number: "1"
        }
      ],
      supplyInfoList: [],
      multipleSelection: [],
      searchMap: {},
      currentPage: 1,
      pagesize: 10,
      total: 0,
      input: ""
    };
  },
  created() {
    this.searchMap.u_id = localStorage.getItem("ID");
    this.searchSupplyInfo(this.currentPage, this.pagesize);
  },
  methods: {
    handleSizeChange(size){
      this.pagesize = size;
      this.searchSupplyInfo(this.currentPage, this.pagesize);
    },
    handleCurrentChange(currentPage){
      this.currentPage = currentPage; // 点击第几页
      this.searchSupplyInfo(this.currentPage, this.pagesize);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    provisionInfoDetails(row) {
      this.$router.push({
        path: "./provisionInfoDetails",
        query: { id: row.id }
      });
    },
    searchSupplyInfo(page,size){
      var username = this.userName;
      this.$http({
        //url: 'http://127.16.0.124:9006/purchase/searchSupplylikeTitle/'+page+'/'+size,
        url: `${url.searchSupplylikeTitle}/${page}/${size}`,
        
        data: this.searchMap,
        method: "post"
      }).then(res => {
        if (res.data.code == 20000) {
          this.supplyInfoList = res.data.data.rows;
          this.total = res.data.data.total;
          this.supplyInfoList.map(item=>{
              // item.date=this.resolvingDate(item.date);
              // item.last_date=this.resolvingDate(item.last_date);

          })
        }
      });
    },
    getSearch(){
        if (this.input == "" || !this.input) {
        this.searchMap = {
            u_id:localStorage.getItem("ID")
        };
      } else {
        
        this.searchMap.title = this.input;
      }

     this.searchSupplyInfo(this.currentPage, this.pagesize);
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
    },
       //时间格式转化
    resolvingDate(date) {
      var dateee = new Date(date).toJSON();
      return new Date(+new Date(dateee) + 16 * 3600 * 1000)
        .toISOString()
        .replace(/T/g, " ")
        .replace(/\.[\d]{3}Z/, "");
    },

    }
  }
</script>
<style lang="scss" >
$color: #fc9263;
#bhncProvisionInfo {
  //复选框样式
  .el-checkbox__input.is-focus .el-checkbox__inner {
    border-color: $color;
  }
  .el-checkbox__inner:hover {
    border-color: $color;
  }
  .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
    color: $color;
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
}
</style>
<style lang="scss" scoped>
$color: #fc9263;
#bhncProvisionInfo {
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
        width: 120px;
        height: 36px;
        background: rgba(252, 146, 99, 1);
        border-radius: 8px;
        font-size: 16px;
        font-family: MicrosoftYaHei, 微软雅黑;
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
        font-family: MicrosoftYaHei, 微软雅黑;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        cursor: pointer;
      }
    }
  }
  .soldOld {
    width: 68px;
    height: 36px;
    background: rgba(252, 146, 99, 0.16);
    border: 1px solid rgba(252, 146, 99, 1);
    opacity: 0.68;
    border-radius: 8px;
    font-size: 16px;
    font-family: MicrosoftYaHei, 微软雅黑;
    font-weight: 400;
    color: rgba(252, 146, 99, 1);
  }
}
</style>