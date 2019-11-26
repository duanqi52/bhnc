<template>
  <div id="bhncMyFootprint">
    <div class="header_search">
      <div class="header_search_wei">
        <span>收藏夹</span>
      </div>
      <button class="warning" @click="deleteMore()">取消收藏</button>
    </div>
    <ul class="print_list" v-if="goodsList.length > 0">
      <li v-for="(goods,index) in goodsList" :key="index">
        <label>
          <img :src="goods.img[0]" alt @click="toDetail(goods)" />
          <p>{{goods.title}}</p>
          <div class="print_time">
            <input type="checkbox" @click="selectGoods($event,goods)" />
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
      :page-sizes="[5, 10, 15]"
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
  metaInfo: {
    title: "笔海弄潮——制笔行业企业上云综合服务平台", // set a title
    meta: [
      {
        // set meta
        name: "keyWords",
        content:
          "制笔行业、制笔厂家、礼品笔、学生笔、中性笔、圆珠笔、钢笔、墨水、笔芯、制笔机械及零部件；"
      },
      {
        name: "description",
        content:
          "笔海弄潮，连接制笔行业采购商和供应商的智慧化数字平台，帮制笔行业采购商寻找各种笔类产品，帮制笔行业厂家寻找各类采购商，为厂商企业管理提供企业上云的管理服务。"
      }
    ]
  },
  data() {
    return {
      currentPage: 1, //初始页
      pagesize: 15, //    每页的数据
      searchMap: {
        SKU: "sku_img"
      },
      goodsList: [],
      total: 0,
      currentPage: 1,
      pageSize: 15,
      ids: []
    };
  },
  components: {},
  created() {
    this.getCollectionList();
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
        url: `${url.getCollectionList}/${localStorage.getItem("username")}`,
        method: "get"
      }).then(res => {
        if (res.data.code == 20000) {
          this.searchMap.collectionIds = JSON.stringify(res.data.data);
          console.log(this.searchMap.collectionIds);
          this.getGoods(this.currentPage, this.pageSize);
        }
      });
    },
    getGoods(page, size) {
      console.log(this.searchMap);
      this.searchMap.p_id = localStorage.getItem("ID");
      this.$http({
        url: `${url.goods}/search/${page}/${size}`,
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

    selectGoods($event, item) {
      if ($event.target.checked) {
        this.ids.push(item.id);
      } else {
        this.ids.splice(this.ids.indexOf(item.id), 1);
      }
    },

    deleteMore() {
      if (this.ids.length < 1) {
        if (document.getElementsByClassName("el-message").length == 0)
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
          url: `${url.deleteMoreCollection}/${localStorage.getItem(
            "username"
          )}`,
          method: "post",
          data: this.ids
        })
          .then(res => {
            this.getCollectionList();
          })
          .catch(err => {});
      });
    },

    toDetail(goods) {
      this.utils.toDetailsss(goods);
    }
  }
};
</script>

<style lang="scss" scoped>
#bhncMyFootprint {
  background-color: white;
  height: 729px;
  .header_search {
    background-color: #fbfbfb;
    line-height: 56px;
    height: 56px;
    .header_search_wei {
      display: inline-block;
      span {
        font-size: 16px;
        font-family: MicrosoftYaHei, 微软雅黑;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        border-left: 2px solid #fc7336;
        margin-left: 36px;
        padding-left: 11px;
      }
    }
    .warning {
      width: 100px;
      height: 28px;
      background: rgba(252, 146, 99, 1);
      border-radius: 8px;
      font-size: 14px;
      font-family: MicrosoftYaHei, 微软雅黑;
      font-weight: 400;
      color: rgba(248, 248, 248, 1);
      margin-right: 20px;
      margin-top: 14px;
      float: right;
    }
  }
  .print_list {
    min-height: 621px;
    background-color: #fbfbfb;
    li {
      display: inline-block;
      text-align: center;
      width: 152px;
      height: 175px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.04);
      padding: 10px;
      margin: 10px 16px;
      img {
        width: 132px;
        height: 116px;
        display: inline-block;
      }
      p {
        font-size: 14px;
        font-family: MicrosoftYaHei, 微软雅黑;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        width: 80%;
        display: inline-block;
      }
      .print_time {
        display: inline-block;
        float: right;
        span {
          font-size: 12px;
          font-family: MicrosoftYaHei, 微软雅黑;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
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