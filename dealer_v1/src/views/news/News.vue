<template>
  <div id="bhncNews">
    <div class="header_search clearfix">
      <div class="searchBox">
        <div class="inputBox">
          <input type="text" placeholder="请输入内容" class="searchInput" v-model="input" />
          <i class="el-icon-search" @click="getSearch()"></i>
        </div>
      </div>
    </div>
    <el-tabs v-model="activeName" type="border-card" class="labelPage">
      <span class="warning" @click="deleteMulti()">
        <i class="iconfont icon-shanchu"></i>
        删除所选
      </span>
      <el-tab-pane label="供应商消息" name="first" @click="news()" class="labelPage_a">
        <el-table
          stripe
          ref="multipleTable"
          :data="newData.slice((newsCurrentPage-1)*newsPagesize,newsCurrentPage*newsPagesize)"
          tooltip-effect="dark"
          style="width: 100%;cursor: pointer;"
          @row-click="News_details"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" align="center" @click.stop></el-table-column>
          <el-table-column
            prop="title"
            label="全选"
            align="left"
            show-overflow-tooltip
            style="color:red;"
          ></el-table-column>
          <el-table-column prop="c_name" label width="500" align="center"></el-table-column>
          <el-table-column prop="send_date" label width="300" align="center"></el-table-column>
          <!-- <el-table-column label="" align="center" width="100">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click.stop="handleDelete(scope.$index, scope.row)"
              >删除</el-button>
            </template>
          </el-table-column>-->
        </el-table>
        <el-pagination
          class="fy"
          layout="total,prev, pager, next"
          @current-change="newsCurrentChange"
          :total="newsTotal"
          background
        ></el-pagination>
      </el-tab-pane>

      <el-tab-pane label="系统消息" name="second" @click="notice()" class="labelPage_b">
        <el-table
          stripe
          ref="multipleTable"
          :data="noticeData.slice((noticeCurrentPage-1)*noticePagesize,noticeCurrentPage*noticePagesize)"
          tooltip-effect="dark"
          style="width: 100%;cursor: pointer;"
          @row-click="News_details"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" align="center" @click.stop></el-table-column>
          <el-table-column prop="title" label="全选" align="left" show-overflow-tooltip></el-table-column>
          <el-table-column prop="send_date" label width="300" align="center"></el-table-column>
          <!-- <el-table-column label="" align="center" width="100">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click.stop="handleDelete(scope.$index, scope.row)"
              >删除</el-button>
            </template>
          </el-table-column>-->
        </el-table>
        <el-pagination
          class="fy"
          layout="total, prev, pager, next"
          @current-change="noticeCurrentChange"
          :total="noticeTotal"
          background
        ></el-pagination>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import url from "../../serverAPI.config.js";
export default {
  data() {
    return {
      newsTotal: 0,
      noticeTotal: 0,
      newData: [],
      noticeData: [],
      searchNewsMap: {
        title: "",
        type: "0",
      },
      searchNoticeMap: {   
        title: "",    
        type: "1",
        role:"1"
      },
      input: "",
      //headers:{"Authorization":"Bearer eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIxIiwic3ViIjoiMTM0MzMxNTcxNDciLCJpYXQiOjE1NjAzMzQzNTEsInJvbGVzIjoidXNlciJ9.cpLQ0B-asQpLawZ_uoEi0VkMlfbVWgWO4rxKtKeD404"} ,
      multipleSelection: [], // 全选数据
      ids: [],
      currentPage: 1, //初始页
      pagesize: 10, //    每页的数据
      newsCurrentPage: 1, //初始页
      newsPagesize: 10, //    每页的数据
      noticeCurrentPage: 1, //初始页
      noticePagesize: 10, //    每页的数据
      activeName: "first",
      userName: ""
    };
  },
  mounted() {
    this.getNews(this.newsPagesize * this.newsCurrentPage);
    this.getNotice(this.noticeCurrentPage * this.noticePagesize);
    this.userName = localStorage.getItem("siteName");
  },
  methods: {
    News_details(row) {
      this.$router.push({ path: "./News_details", query: { id: row.id } });
    },
    Notice_details(row) {
      this.$router.push({ path: "./Notice_details", query: { id: row.id } });
    },

    //这里会把全选的数据放进 multipleSelection里
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.ids = [];
      this.multipleSelection.map(item => {
        this.ids.push(item.id);
      });
    },
    //删除
    handleDelete($index, row) {
      this.$confirm("是否要删除？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        this.$http({
          url: `${url.DeleteNews}/${row.id}`,
          // headers:this.headers,
          method: "delete"
        }).then(res => {
          if (res.data.code == 20000) {
            this.getNews(this.newsPagesize * this.newsCurrentPage);
            this.getNotice(this.noticeCurrentPage * this.noticePagesize);
          }
        });
      });
    },
    //初始化currentPage,初始每页数据pagesize和数据data
    handleSizeChange(size) {
      this.pagesize = size;
    },
    handleCurrentChange(currentPage) {
      this.getNews(this.newsPagesize * this.newsCurrentPage);
      this.getNotice(this.noticeCurrentPage * this.noticePagesize);
    },
    handleTableList() {
      /*
      this.$http.get('http://localhost:3000/userList').then(res => {  //这是从本地请求的数据接口，
          this.tableData = res.body
      })
      */
    },
    onSearch() {
      const loading = this.$loading({
        lock: true,
        text: "加载中",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
        target: document.querySelector("body")
      });
      setTimeout(() => {
        loading.close();
      }, 500);
    },
    getNews(size) {
      var page = 1;
      this.$http({
        url: `${url.purchaseReceiveSupplyInfoMgs}/${localStorage.getItem("ID")}/${page}/${size}`,
         //url: 'http://172.16.6.49:8080/advices/purchaseReceiveSupplyInfoMgs/'+localStorage.getItem("ID")+"/"+page+"/"+size,
        data: this.searchNewsMap,
        method: "post"
      }).then(res => {
        if (res.data.code == 20000) {
          this.newData = res.data.data.rows;  
          this.newsTotal = parseInt(res.data.data.total);
        }
      });
    },
    getNotice(size) {
      var page = 1;
      this.$http({
        url: `${url.purchaseReceiveSystemMgs}/${localStorage.getItem("ID")}/${page}/${size}`,
        // url: `http://172.16.6.49:8080/advices/findShow/${page}/${size}`,
        data: this.searchNoticeMap,
        method: "post"
      }).then(res => {
        if (res.data.code == 20000) {
          this.noticeData = res.data.data.rows;
          // for (var i = 0; i < this.noticeData.length; i++) {
          //   this.noticeData[i].sendDate = this.resolvingDate(
          //     this.noticeData[i].sendDate
          //   );
          // }
          this.noticeTotal = parseInt(res.data.data.total);
        }
      });
    },
    getSearch() {
 
        this.searchNewsMap.title = this.input;
        this.searchNewsMap.type = "0";

        this.searchNoticeMap.title = this.input;
        this.searchNoticeMap.type = "1";
      
      this.getNews(this.newsPagesize * this.newsCurrentPage);
      this.getNotice(this.noticeCurrentPage * this.noticePagesize);
    },
    //时间格式转化
    resolvingDate(date) {
      var dateee = new Date(date).toJSON();
      return new Date(new Date(dateee))
        .toISOString()
        .replace(/T/g, " ")
        .replace(/\.[\d]{3}Z/, "");
    },
    deleteMulti() {
      this.$confirm("是否要删除已选中？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        this.$http({
          url: `${url.DeleteNews}/deleteMulti`,
          // headers:this.headers,
          data: this.ids,
          method: "delete"
        }).then(res => {
          if (res.data.code == 20000) {
            this.getNews(this.newsPagesize * this.newsCurrentPage);
            this.getNotice(this.noticeCurrentPage * this.noticePagesize);
          }
        });
      });
    },
    newsCurrentChange: function(currentPage) {
      this.newsCurrentPage = currentPage;
      this.getNews(this.newsPagesize * this.newsCurrentPage);
    },
    noticeCurrentChange: function(currentPage) {
      this.noticeCurrentPage = currentPage;
      this.getNotice(this.noticeCurrentPage * this.noticePagesize);
    }
  },
  watch: {
    multipleSelection(newValue, old) {}
  }
};
</script>

<style lang="scss">
$color: #fc9263;
#bhncNews {
  .labelPage .el-table td,
  .el-table th {
    padding: 30px 0;
  }
  .labelPage .el-table th > .cell {
    color: $color;
  }
  .labelPage .el-tabs__item {
    padding: 0 50px !important;
    font-weight: bold;
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

<style scoped lang="scss">
$color: #fc9263;
#bhncNews {
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
      .saixuan {
      }
    }
  }
  .warning {
    position: absolute;
    right: 150px;
    z-index: 999;
    color: #f37e79;
    cursor: pointer;
    top: 40px;
    font-weight: 600;
    font-size: 15px;
  }
  .fy {
    margin: 50px;
  }
  .el-table {
    th {
      text-align: center;
    }
  }
  .el-pagination {
    text-align: center;
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
        color: #fc9263;
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
