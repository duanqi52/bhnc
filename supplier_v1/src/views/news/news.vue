<template>
  <div id="bhncNews">
    <div class="header_search clearfix">
      <div class="searchBox">
        <div class="inputBox">
          <input type="text" placeholder="请输入内容" class="searchInput" v-model="input" />
          <i class="el-icon-search" @click="getSearch()"></i>
        </div>
        <el-button
          type="info"
          round
          style="margin-left: 10%;background-color: #fc9263;border-color: #fc9263;"
          @click="broadcastNews()"
        >发布广播消息</el-button>
      </div>
    </div>
    <el-tabs v-model="activeName" type="border-card" class="labelPage">
      <span class="warning" @click="deleteMulti()">
        <i class="iconfont icon-shanchu"></i>
        选中后删除
      </span>
      <el-tab-pane label="我发的消息" name="first" class="labelPage_a">
        <el-table
          stripe
          ref="multipleTable"
          :data="newData.slice((newsCurrentPage-1)*newsPagesize,newsCurrentPage*newsPagesize)"
          tooltip-effect="dark"
          style="width: 100%;cursor: pointer;"
          @row-click="myNewsDetails"
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
          <el-table-column  label width="300" align="left" >
              <template slot-scope="item">
                  <span style="dispaly:inline-block;width:300px;text-overflow: ellipsis;white-space: nowrap;text-align: left;overflow: hidden;">
                    收件人:{{item.row.names.join("、")}}</span>
              </template>
          </el-table-column>
          <el-table-column prop="sendDate" label width="200" align="center"></el-table-column>     
        </el-table>
        <el-pagination
          class="fy"
          layout="total,prev, pager, next"
          @current-change="newsCurrentChange"
          :total="newsTotal"
          background
        ></el-pagination>
      </el-tab-pane>

      <el-tab-pane label="系统消息"  class="labelPage_b">
        <el-table
          stripe
          ref="multipleTable"
          :data="noticeData.slice((noticeCurrentPage-1)*noticePagesize,noticeCurrentPage*noticePagesize)"
          tooltip-effect="dark"
          style="width: 100%"
          @row-click="News_details"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" align="center" @click.stop></el-table-column>
          <el-table-column prop="title" label="全选" align="left" show-overflow-tooltip></el-table-column>
          <el-table-column prop="sendDate" label width="200" align="center"></el-table-column>
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
import url from "@/serverAPI.config.js";
import { log } from 'util';
export default {
  data() {
    return {
      newsTotal: 0,
      noticeTotal: 0,
      newData: [],
      noticeData: [],
      searchNewsMap: {
        title: "",
        p_id: ""
      },
      searchNoticeMap: {
        id: "",
        title: "",
        type: "1",
        p_id: "",
        role:'2'
      },
      input: "",
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
    this.searchNewsMap.p_id = localStorage.getItem("ID");
    this.searchNoticeMap.d_id = localStorage.getItem("ID");
    this.getNews(this.newsPagesize * this.newsCurrentPage);
    this.getNotice(this.noticeCurrentPage * this.noticePagesize);
    this.userName = localStorage.getItem("username") || localStorage.getItem("siteName");
  },
  methods: {
    broadcastNews() {
      this.$router.push("./broadcastNews");
    },
    News_details(row) {     
      this.$router.push({ path: "./News_details", query: { id: row.id } });
    },
    myNewsDetails(row) {
      this.$router.push({ path: "./myNewsDetails", query: { id: row.id } });
    },
    Notice_details(row) {
      this.$router.push({ path: "./Notice_details", query: { id: row.id } });
    },
    handleClick(tab, event) {},
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
        //url:'http://localhost:8080/advices/findSupplierSendMessage/'+page+'/'+size,
        url: `${url.findSupplierSendMessage}/${page}/${size}`,
        // headers:this.headers,
        data: this.searchNewsMap,
        method: "post"
      }).then(res => {
        if (res.data.code == 20000) {
             this.newData = res.data.data.rows;
          for (var i = 0; i < this.newData.length; i++) {
              if(this.newData[i].d_id){
                  var names=JSON.parse(this.newData[i].d_id);                    
              this.newData[i].names=names;
              }                           
          }    
           for(var i = 0;i<this.newData.length-1;i++) {   
            for(var j = 0;j<this.newData.length-i-1;j++){
                if(new Date(this.newData[j].sendDate)<new Date(this.newData[j+1].sendDate)){              
                    var swap = this.newData[j];
                    this.newData[j] = this.newData[j+1];
                    this.newData[j+1] = swap;
                }
            }
        }          
          this.newsTotal = parseInt(res.data.data.total);
        }
      });
    },
    getNotice(size) {  
      var page = 1;
      this.$http({
        //url:'http://localhost:8080/advices/findSupplierSysMessage/'+page+'/'+size,
       url: `${url.findSupplierSysMessage}/${page}/${size}`,
        // headers:this.headers,
        data: this.searchNoticeMap,
        method: "post"
      }).then(res => {
        if (res.data.code == 20000) {
          this.noticeData = res.data.data.rows;          
          this.noticeTotal = parseInt(res.data.data.total);
        }
      });
    },
    getSearch() {     
      if (this.input == "" || !this.input) {
        this.searchNewsMap = {
          id: "",
          title: "",
          d_id: "",      
          p_id: localStorage.getItem("ID")
        };
        this.searchNoticeMap = {
          id: "",
          title: "",
          d_id: localStorage.getItem("ID"),
          type: "1",

        };
      } else {     
         this.searchNewsMap.title = this.input;
         this.searchNewsMap.d_id= this.input;
     
          
       
        this.searchNoticeMap.title = this.input;
        this.searchNoticeMap.type = "1";
      
      }
     this.getNews(this.newsPagesize * this.newsCurrentPage);
      this.getNotice(this.noticeCurrentPage * this.noticePagesize);
    },
    findNamesById(ids) {
      var names = [];
      this.$http({
        url: `${url.findNamesById}`,
        data: ids,
        method: "post"
      }).then(res => {
        if (res.data.code == 20000) {
          res.data.data.map(item => {
            names.push(item.company_name);
          });
        }
      });
       return names;
    },
    //时间格式转化
    resolvingDate(date) {
      var dateee = new Date(date).toJSON();
      return new Date(+new Date(dateee))
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
    .el-table tr{
        cursor: pointer;
    }
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
        font-family: MicrosoftYaHei, 微软雅黑;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        cursor: pointer;
      }
    }
  }
}
</style>