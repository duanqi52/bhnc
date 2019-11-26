<template>
  <div id="bhncBuyInfoDetail">
    <div class="header_search">
      <div class="header_search_wei">
        <span>求购信息详情</span>
      </div>
      <!-- <button class="warning">删除</button> -->
    </div>
    <div class="order-list">
      <div
        style="background-color: #FBFBFB;border-bottom: 12px solid rgb(240, 240, 240);box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.04);"
      >
        <div class="orderDetails" v-if="purchaseDetails.message.length!=0">
          <div class="title_home">报价信息</div>
          <div data-v-24ce75e4 class="title_heade">报价1</div>
          <el-table
            :data="purchaseDetails.message"
            style="width: 100%;font-size: 12px;box-shadow: 0px 3px 4px 0px rgba(0, 0, 0, 0.02);"
            :header-cell-style="{background:'#FFFFFF',color:'#606266',fontWeight:'bold'}"
            align="center"
          >
            <!-- <el-table-column label align="center">
            <template slot-scope="scope">
              <div>
                <img :src="scope.row.img" alt width="100px" height="100px" />
                <p>{{scope.row.title}}</p>
              </div>
            </template>
            </el-table-column>-->

            <el-table-column label="单价" prop="price" align="center"></el-table-column>
            <el-table-column label="总价" prop="totalMoney" align="center"></el-table-column>
            <el-table-column label="公司名称" prop="name" align="center"></el-table-column>
            <el-table-column label="联系人" prop="linkMan" align="center"></el-table-column>
            <el-table-column label="移动电话" prop="linkPhone" align="center"></el-table-column>
            <el-table-column label="联系地址" prop="address" align="center"></el-table-column>
            <el-table-column label="报价时间" prop="offerDate" align="center"></el-table-column>
            <!-- <el-table-column label="操作" align="center" width="100">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="warning"
                @click.stop="details(scope.$index, scope.row)"
              >去采购</el-button>
            </template>
            </el-table-column>-->
          </el-table>
          <div class="clarification">
            <span>报价说明：</span>
            报价信息说明 报价信息说明 报价信息说明 报价信息说明 报价信息说明 报价信息说明 报价信息说明 报价信息说明 报价信息说明 报价信息说明 报价信息说明 报价信息说明 报价信息说明 报价信息说明 报价信息说明 报
          </div>
          <div data-v-24ce75e4 class="title_heade">报价2</div>

          <el-table
            :data="purchaseDetails.message"
            style="width: 100%;font-size: 12px;box-shadow: 0px 3px 4px 0px rgba(0, 0, 0, 0.02);"
            :header-cell-style="{background:'#FFFFFF',color:'#606266',fontWeight:'bold'}"
            align="center"
          >
            <el-table-column label="单价" prop="price" align="center"></el-table-column>
            <el-table-column label="总价" prop="totalMoney" align="center"></el-table-column>
            <el-table-column label="公司名称" prop="name" align="center"></el-table-column>
            <el-table-column label="联系人" prop="linkMan" align="center"></el-table-column>
            <el-table-column label="移动电话" prop="linkPhone" align="center"></el-table-column>
            <el-table-column label="联系地址" prop="address" align="center"></el-table-column>
            <el-table-column label="报价时间" prop="offerDate" align="center"></el-table-column>
          </el-table>
          <div class="clarification">
            <span>报价说明：</span>
            报价信息说明 报价信息说明 报价信息说明 报价信息说明 报价信息说明 报价信息说明 报价信息说明 报价信息说明 报价信息说明 报价信息说明 报价信息说明 报价信息说明 报价信息说明 报价信息说明 报价信息说明 报
          </div>
          <!-- 采购需求 -->
          <!-- <el-table
          :data="tableData"
          :header-cell-style="{background:'#eef1f6',color:'#606266',fontWeight:'bold'}"
          align="center"
          style="width: 100%;border:1px solid rgba(240,240,240,1);margin-top: 30px;"
        >
          <el-table-column prop="type" label="商品分类" align="center"></el-table-column>
          <el-table-column prop="offer_count" label="采购数量" align="center"></el-table-column>
          <el-table-column prop="delivery_date" align="center" label="交货时间"></el-table-column>
          <el-table-column align="center" prop="send_man" label="发布人"></el-table-column>
          <el-table-column prop="c_name" align="center" label="公司"></el-table-column>
          <el-table-column prop="link_phone" align="center" label="联系电话"></el-table-column>
          <el-table-column prop="link_address" align="center" label="联系地址"></el-table-column>
          </el-table>-->
        </div>
        <div v-else>
          <img src="../../../static/img/wubaojia.png" alt />
        </div>
      </div>
      <div class="weitu">
        <!-- <el-container>
          <el-main style="height: unset;" v-html="purchaseDetails.content_img"></el-main>
        </el-container>-->
        <div class="weitu_title">标题：{{purchaseDetails.title}}</div>
        <div class="weitu_xiang">
          <p>{{purchaseDetails.content_img.content}}</p>
          <img
            :src="item.img"
            alt
            v-for="(item,index) in purchaseDetails.content_img.imgs"
            :key="index"
          />
        </div>
        <div style="text-align: center;margin-bottom: 30px;">
          <el-button style="margin: 30px;" @click="purchase" type="warning">返回</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import url from "../../serverAPI.config.js";
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
      purchaseDetails: {
        message: [],
        content_img: {
          content: ""
        }
      }, //数据
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIxIiwic3ViIjoiMTM0MzMxNTcxNDciLCJpYXQiOjE1NjAzMzQzNTEsInJvbGVzIjoidXNlciJ9.cpLQ0B-asQpLawZ_uoEi0VkMlfbVWgWO4rxKtKeD404"
      },
      tableData: [],
      content: "",
      userName: ""
    };
  },
  components: {},
  mounted() {
    this.userName = localStorage.getItem("siteName");
    this.getPurchaseDetails(this.$route.query.id);
  },
  methods: {
    purchase() {
      this.$router.go(-1);
    },
    getPurchaseDetails(id) {
      var username = this.userName;
      this.$http({
        url: `${url.Purchase_details}/${id}`,
        // headers:this.headers,
        method: "get"
      }).then(res => {
        if (res.data.code == 20000) {
          this.purchaseDetails = res.data.data;
          var message = [];
          this.purchaseDetails.message = message;
          this.purchaseDetails.content_img = JSON.parse(
            this.purchaseDetails.content_img
          );
          this.purchaseDetails.delivery_date =
            this.purchaseDetails.delivery_date + "天";
          this.purchaseDetails.send_date = this.resolvingDate(
            this.purchaseDetails.send_date
          );
          this.purchaseDetails.last_date = this.resolvingDate(
            this.purchaseDetails.last_date
          );
          this.tableData.push(this.purchaseDetails);
        }
      });
    },
    isE(array, item) {
      var i1 = null;
      for (var i = 0; i < array.length; i++) {
        if (item.pid == array[i].pid) {
          i1 = i;
        }
      }
      return i1;
    },
    //时间格式转化
    resolvingDate(date) {
      var dateee = new Date(date).toJSON();
      return new Date(+new Date(dateee) + 8 * 3600 * 1000)
        .toISOString()
        .replace(/T/g, " ")
        .replace(/\.[\d]{3}Z/, "");
    }
  }
};
</script>
<style lang="scss">
#bhncBuyInfoDetail {
  .el-table__footer-wrapper,
  .el-table__header-wrapper {
    overflow: hidden;
    box-shadow: 0px 1px 8px 0px rgba(0, 0, 0, 0.12);
  }
}
</style>

<style lang="scss" scoped>
#bhncBuyInfoDetail {
  .header_search {
    background-color: #fbfbfb;
    line-height: 58px;
    height: 64px;
    border-bottom: 8px solid #f2f2f2;
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
  .weitu {
    width: 100%;
    background-color: white;
  }
  .el-container {
    width: 70%;
    display: inline-block;
    text-align: center;
  }
  .el-header {
    background-color: #e9eef3;
    color: #333;
    line-height: 30px;
  }

  .el-main {
    background-color: white;
    color: #333;
    line-height: 60px;
  }

  .orderDetails {
    padding: 27px;
  }
  .order_title {
    height: 76px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.04);
    line-height: 68px;
    font-size: 20px;
    font-weight: bold;
    color: rgba(102, 102, 102, 1);
    padding-left: 50px;
    border-bottom: 8px solid rgb(240, 240, 240);
  }
  .title_heade {
    font-size: 12px;
    font-family: MicrosoftYaHei, 微软雅黑;
    font-weight: bold;
    color: #333333;
    margin: 10px 0;
  }
  .title_home {
    position: relative;
    text-align: center;
    font-size: 14px;
    font-weight: bold;
    color: #fc9263;
  }
  .title_home::after {
    position: absolute;
    right: 29%;
    top: 50%;
    width: 145px;
    height: 2px;
    background: #fc9263;
    display: inline-block;
    content: "";
  }
  .title_home::before {
    position: absolute;
    left: 29%;
    top: 50%;
    width: 145px;
    height: 2px;
    background: #fc9263;
    display: inline-block;
    content: "";
  }
  .clarification {
    background-color: #ffffff;
    padding: 25px;
    box-shadow: 0px 3px 4px 0px rgba(0, 0, 0, 0.02);
    line-height: 25px;
    font-size: 12px;
    span {
      color: #666666;
      font-weight: bold;
    }
  }
  .weitu_title {
    height: 50px;
    line-height: 42px;
    background: rgba(248, 248, 248, 1);
    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.06);
    font-size: 14px;
    text-indent: 43px;
    font-family: MicrosoftYaHei, 微软雅黑;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    border-bottom: 8px solid #f0f0f0;
  }
  .weitu_xiang {
    padding: 50px;
    p {
      width: 70%;
      margin-bottom: 30px;
      font-size: 14px;
    }
    img {
      width: 60%;
    }
  }
}
</style>