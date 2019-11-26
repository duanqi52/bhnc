<template>
  <div id="bhncPur_details">
    <div class="order-list">
      <p class="order_title">求购信息详情</p>
      <div style="background-color: #FBFBFB;border-bottom: 12px solid rgb(240, 240, 240);box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.04);" v-if="quotationList.length > 0">
        <div class="orderDetails">
          <div class="title_home">报价信息</div>
          <div v-for="(item,index) in quotationList" :key="index">
            <div data-v-24ce75e4 class="title_heade">报价{{index + 1 }}</div>
            <el-table
              :data="info[index]"
              style="width: 100%;    box-shadow: 0px 3px 4px 0px rgba(0, 0, 0, 0.02);margin-top: 30px;"
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
              <el-table-column label="总价" prop="total_price" align="center"></el-table-column>
              <el-table-column label="公司名称" prop="c_name" align="center"></el-table-column>
              <el-table-column label="联系人" prop="send_man" align="center"></el-table-column>
              <el-table-column label="移动电话" prop="link_phone" align="center"></el-table-column>
              <el-table-column label="联系地址" prop="address" align="center"></el-table-column>
              <el-table-column label="报价时间" prop="date" align="center"></el-table-column>
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
              {{item.explain}}
            </div>
          </div>
        </div>
      </div>
      <div style="background-color: #FBFBFB;border-bottom: 12px solid rgb(240, 240, 240);box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.04);text-align: center;" v-else>
        <div class="orderDetails">
          <div class="title_home">报价信息</div>
          <img src="../../../static/img/NoQuotation_a.png" alt="">
        </div>
      </div>
      <!-- 标题图文 -->
      <div class="weitu" v-if="purchaseDetails">
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
        <div style="text-align: center;">
          <el-button style="margin: 100px;" @click="purchase" type="warning">返回</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import url from "../../serverAPI.config.js";
export default {
  data() {
    return {
      purchaseDetails: null, //数据
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIxIiwic3ViIjoiMTM0MzMxNTcxNDciLCJpYXQiOjE1NjAzMzQzNTEsInJvbGVzIjoidXNlciJ9.cpLQ0B-asQpLawZ_uoEi0VkMlfbVWgWO4rxKtKeD404"
      },
      tableData: [],
      content: "",
      userName: "",
      quotationList: [],
      info: []
    };
  },
  components: {},
  mounted() {
    this.userName = localStorage.getItem("siteName");
    this.getPurchaseDetails(this.$route.query.id);
    this.getQuotations();
  },
  methods: {
    getQuotations() {
      this.$http({
        url: `${url.getQuotations}/${this.$route.query.id}`,
        method: "get"
      }).then(res => {
        if (res.data.code == 20000) {
          var quotationList = res.data.data;
          this.info = [];
          quotationList.map(item => {
            this.info.push([item]);
          });
          this.quotationList = quotationList;
        }
      });
    },
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
          this.purchaseDetails.message = JSON.parse(
            this.purchaseDetails.message
          );
          var message = [];
          this.purchaseDetails.message.map(item => {
            var i = this.isE(message, item);
            if (i != null) {
              message.splice(i, 1);
            }
            message.push(item);
          });
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
#bhncPur_details {
  .el-table__footer-wrapper,
  .el-table__header-wrapper {
    overflow: hidden;
    box-shadow: 0px 1px 8px 0px rgba(0, 0, 0, 0.12);
  }
}
</style>

<style lang="scss" scoped>
#bhncPur_details {
  .weitu {
    width: 100%;
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
      }
      .saixuan {
      }
    }
  }
  .orderDetails {
    width: 1500px;
    margin: 0 auto;
    padding-bottom: 30px;
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
    font-size: 15px;
    font-family: MicrosoftYaHei;
    font-weight: bold;
    color: #333333;
    padding-top: 30px;
    margin-bottom: 20px;
  }
  .title_home {
    position: relative;
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    color: #fc9263;
    padding-top: 35px;
  }
  .title_home::after {
    position: absolute;
    top: 75%;
    right: 29%;
    width: 250px;
    height: 2px;
    background: #fc9263;
    display: inline-block;
    content: "";
  }
  .title_home::before {
    position: absolute;
    top: 75%;
    left: 29%;
    width: 250px;
    height: 2px;
    background: #fc9263;
    display: inline-block;
    content: "";
  }
  .clarification {
    background-color: #ffffff;
    padding: 37px;
    box-shadow: 0px 3px 4px 0px rgba(0, 0, 0, 0.02);
    line-height: 25px;
    span {
      color: #666666;
      font-weight: bold;
    }
  }
  .weitu_title {
    height: 73px;
    line-height: 65px;
    background: rgba(248, 248, 248, 1);
    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.06);
    font-size: 18px;
    text-indent: 43px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    border-bottom: 8px solid #f0f0f0;
  }
  .weitu_xiang {
    padding: 70px;
    p {
      width: 70%;
      margin-bottom: 30px;
    }
    img {
      width: 60%;
    }
  }
}
</style>