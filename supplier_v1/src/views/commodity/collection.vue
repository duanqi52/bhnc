<template>
  <div id="bhncMyFootprint">
    <div class="header_search">
      <div class="header_search_wei">
        <span>收藏的商品</span>
        
      </div>
      <button @click="deleteMore()">取消收藏</button>
      <!-- <button class="warning">删除</button> -->
    </div>
    <ul class="print_list" v-if="goodsList.length > 0">
      <li v-for="(goods,index) in goodsList" :key="index">
        <label>
          <img :src="goods.img[0]" alt @click.stop="toDetail(goods)"/>
          <p>{{goods.title}}</p>
          <div class="print_time">
            <!-- <span>{{item.date}}</span> -->
            <input type="checkbox" :id="goods.id" @click="selectGoods($event,goods)" />
          </div>
        </label>
      </li>
    </ul>
    <ul class="print_list" v-else>
      <p style="text-align: center;padding-top: 30px;">暂无收藏</p>
    </ul>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[24, 32, 40]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      style="text-align: center;margin-top: 10px;height: 52px;"
    ></el-pagination>
  </div>
</template>

<script>
import url from "@/serverAPI.config.js";
export default {
  data() {
    return {
      currentPage: 1, //初始页
      pagesize: 24, //    每页的数据
      searchMap: {
        SKU: "sku_img"
      },
      goodsList: [],
      total: 0,
      ids: []
    };
  },
  components: {
   
  },
  created() {
    this.getCollectionList();
  },
  updated() {
    this.goodsList.map(item => {
      if(this.ids.indexOf(item.id) > -1){
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
      this.getGoods(this.currentPage, this.pagesize);
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage; // 点击第几页
      this.getGoods(this.currentPage, this.pagesize);
    },
    //获取收藏的gids
    getCollectionList() {
      this.$http({
        url: `${url.getCollectionList}/${localStorage.getItem("username") || localStorage.getItem("siteName")}`,
        method: "get"
      }).then(res => {
        if (res.data.code == 20000) {   
         if(res.data.data.length==0){
             return
          } 
          this.searchMap.collectionIds = JSON.stringify(res.data.data);          
          this.getGoods(this.currentPage, this.pagesize);         
        }
      });
    },
    getGoods(page, size) {
      this.searchMap.p_id = localStorage.getItem("ID");
      this.$http({
        //url:'http://172.16.0.138:8080/goods/search/'+page+"/"+size,
        url: `${url.Goods}/search/${page}/${size}`,
        method: "post",
        data: this.searchMap
      }).then(res => {   
        if (res.data.code == 20000) {
          this.goodsList = res.data.data.rows;
          this.goodsList.map(item => {
            item.title = item.title ? item.title : "　 ";
            item.img = JSON.parse(item.img);
          });
          this.total = res.data.data.total;
        }
      });
    },

    selectGoods($event, item) {  
      if ($event.target.checked) {
        this.ids.push(item.id);
      } else {
        this.ids.splice(this.ids.indexOf(item.id), 1);
      }
    },

    deleteMore() {
      if(this.ids.length < 1){
        if(document.getElementsByClassName("el-message").length == 0)
        this.$message.error("请选择商品再操作!");
        return;
      }
      this.$confirm("是否真的要取消收藏选中的商品?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      }).then(() => {
        this.$http({
          url: `${url.deleteMoreCollection}/${localStorage.getItem("username") || localStorage.getItem("siteName")}`,
          method: "post",
          data: this.ids
        })
          .then(res => {
             if( this.goodsList.length>0){
              for (let i = 0; i < this.ids.length; i++) {
                for (let index = 0; index < this.goodsList.length; index++) {
                    if(this.ids[i]==this.goodsList[index].id){
                        this.goodsList.splice(index,1);
                    }          
                }        
              }            
            }
             this.ids=[];   
          })
          .catch(err => {
            console.log(err);
          });
      });   
    },
    toDetail(goods) {
      window.open(`${url.detailUrl}/details?id=` + goods.id);
    }
  }
};
</script>

<style lang="scss" scoped>
#bhncMyFootprint {
  background-color: white;
  .header_search {
    line-height: 68px;
    height: 68px;
    background: rgba(255,255,255,1);
    box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.04);
    border-bottom: 1px solid #E8E8E8;
    .header_search_wei {
      display: inline-block;
      span {
        margin-left: 48px;
        font-size:20px;
        font-family:MicrosoftYaHeiLight;
        font-weight:bold;
        color:rgba(102,102,102,1);
        }
      }
     button{
        width:80px;
        height:36px;
        background:rgba(210,53,61,1);
        border-radius:8px;
        font-size:16px;
        font-family:MicrosoftYaHei;
        font-weight:400;
        color:rgba(255,255,255,1);
        margin-right: 32px;
        margin-top: 16px;
        float: right;
        line-height: 36px;
      }
    .warning {
      width: 100px;
      height: 28px;
      background: rgba(252, 146, 99, 1);
      border-radius: 8px;
      font-size: 14px;
      font-family: MicrosoftYaHei,微软雅黑;
      font-weight: 400;
      color: rgba(248, 248, 248, 1);
      margin-right: 20px;
      margin-top: 14px;
      float: right;
    }
  }
  .print_list {
    min-height:855px;
    background:rgba(255,255,255,1);
    box-shadow:0px 1px 4px 0px rgba(0, 0, 0, 0.04);
    li {
        cursor: pointer;
        display: inline-block;
        text-align: center;
        width: 203px;
        height: 247px;
        padding: 12px 14px;
        margin: 14px 27px;
        background: rgba(255,255,255,1);
        box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.08);
      img {
        width: 175px;
        height: 175px;
        display: inline-block;
        cursor: pointer;

      }
      p {
        font-size: 16px;
        font-family: MicrosoftYaHei,微软雅黑;
        font-weight: 400;
        color: rgba(102,102,102,1);
        margin: 5px 0;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        width: 150px;
        display: inline-block;
        cursor: pointer;

      }
      .print_time {
        display: inline-block;
        float: right;
        margin-top: 7px;
        span {
            font-size:14px;
            font-family:MicrosoftYaHei;
            font-weight:400;
            color:rgba(153,153,153,1);
        }
        input[type="checkbox"] {
          width: 16px;
          height: 16px;
          display: inline-block;
          text-align: center;
          vertical-align: middle;
          line-height: 15px;
          position: relative;
          cursor: pointer;
        }
        input[type="checkbox"]::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          background: #fff;
          width: 100%;
          height: 100%;
          border: 1px solid #d9d9d9;
          cursor: pointer;
        }
        input[type="checkbox"]:checked::before {
          content: "\2713";
          background-color: #fff;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          border: 1px solid #e50232;
          color: #e50232;
          font-size: 15px;
          font-weight: bold;
          cursor: pointer;
        }
      }
    }
  }
}
</style>