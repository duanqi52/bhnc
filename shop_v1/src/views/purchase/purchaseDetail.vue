<template>
  <div id="bhncProInofDetail">
    <div class="w">
      <div class="baojiaBox">
        <h4>{{purchaseDetails.title}}</h4>
        <el-table
          :data="rowData"
          style="width: 100%;padding: 0 20px;margin: 4px 0;"
          :header-cell-style="{background:'#fff',color:'#666',}"
          align="center"
        >
          <!-- <el-table-column label="商品单价" prop="price" align="center" ></el-table-column> -->
          <el-table-column label="求购数量" prop="count" align="center"></el-table-column>
          <el-table-column label="发布人" prop="sendman" align="center"></el-table-column>
          <el-table-column label="移动电话" prop="phone" align="center"></el-table-column>
          <el-table-column label="固定电话" prop="fixPhone" align="center"></el-table-column>
          <el-table-column label="QQ" prop="qq" align="center"></el-table-column>
          <el-table-column label="联系地址" prop="address" align="center"></el-table-column>
          <el-table-column label align="center">
            <template>
              <button class="chakan" @click.stop="toQuote(purchaseDetails.id)">立即报价</button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="weitu">
        <div class="weituDetails">
          <div class="weituTitle">{{detailTitle}}</div>
          <div class="weituImg">
            <img :src="item.img" v-for="(item,index) in imgList" :key="index" />
          </div>
        </div>
        <!-- <div style="padding:20px 0;text-align: center;">
          <button
            style="width:88px;
                height:35px;
                background:rgba(210,29,39,1);
                border-radius:4px;
                font-size:16px;
                font-family:MicrosoftYaHei,微软雅黑;
                font-weight:400;
                color:rgba(255,255,255,1);"
            @click="purchase"
          >返回</button>
        </div>-->
      </div>
      <div class="order-list">
        <p class="more_xin">更多求购信息</p>
        <el-table
          stripe
          :data="purchaseList"
          style="width: 100%"
          :header-cell-style="{background:'#F7F7F7',color:'#606266',fontWeight:'bold',borderTop:'1px solid#E2E2E2'                                                                                                                                                                                                                                                                                                                                                                                                                                                                               }"
          align="center"
        >
          <el-table-column label="标题" prop="title" align="center"></el-table-column>
          <el-table-column label="求购数量" prop="offer_count" align="center"></el-table-column>
          <el-table-column label="发布时间" prop="send_date" align="center"></el-table-column>
          <el-table-column label prop="id" align="center">
            <template slot-scope="scope">
              <button class="see_des" @click="toDetails(scope.row.id)">查看详情 >></button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <popup style="display:none" :wenz="wenz" :urls="urls" id="popup"></popup>
  </div>
</template>

<script>
import url from "../../serverAPI.config.js";
import popup from "../../components/popup/popup.vue";
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
      rowData: [],
      purchaseDetails: {}, //数据
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIxIiwic3ViIjoiMTM0MzMxNTcxNDciLCJpYXQiOjE1NjAzMzQzNTEsInJvbGVzIjoidXNlciJ9.cpLQ0B-asQpLawZ_uoEi0VkMlfbVWgWO4rxKtKeD404"
      },
      tableData: [],
      content: "",
      userName: "",
      //   图文标题
      detailTitle: "",
      imgList: [],
      table: [
        {
          price: "0.5/支",
          totalMoney: "100000.00",
          name: "广州周鲁白文具有限公司",
          linkMan: "王大锤",
          linkPhone: "13828465848 13828465848 13828465848 020-89657896",
          address: "广东省广州市海珠区工业大道 北1号艺丰大厦806",
          offerDate: "2019-05-31   19:43"
        },
        {
          price: "0.5/支",
          totalMoney: "100000.00",
          name: "广州周鲁白文具有限公司",
          linkMan: "王大锤",
          linkPhone: "13828465848,13828465848,13828465848",
          address: "广东省广州市海珠区工业大道 北1号艺丰大厦806",
          offerDate: "2019-05-31   19:43"
        },
        {
          price: "0.5/支",
          totalMoney: "100000.00",
          name: "广州周鲁白文具有限公司",
          linkMan: "王大锤",
          linkPhone: "13828465848,13828465848,13828465848",
          address: "广东省广州市海珠区工业大道 北1号艺丰大厦806",
          offerDate: "2019-05-31   19:43"
        }
      ],
      purchaseList: [],
      searchMap: {
        id: "",
        title: "",
        type: "",
        delivery_date: "",
        send_date: "-",
        offer_count: "",
        last_date: "",
        message: "",
        p_id: ""
      },
      wenz:
        "亲爱的 周鲁白 会员，您还不是我们的供应商会员，申请成为供应商会员之后，介意查看平台上所有经销商的信息和进行采购报价，快来申请吧~",
      urls: "/supIntroduce"
    };
  },
  components: {
    popup
  },
  mounted() {
    this.userName = localStorage.getItem("siteName");
    this.getPurchaseDetails(this.$route.query.id);
    this.getPurchase(1, 6);
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

          // this.purchaseDetails.content_img = JSON.parse(this.purchaseDetails.content_img);
          this.purchaseDetails.send_date = this.resolvingDate(
            this.purchaseDetails.send_date
          );
          this.purchaseDetails.last_date = this.resolvingDate(
            this.purchaseDetails.last_date
          );
          this.tableData.push(this.purchaseDetails);
          this.purchaseDetails.content_img = JSON.parse(
            this.purchaseDetails.content_img
          );
          this.detailTitle = this.purchaseDetails.content_img.content;
          var imgListModel = this.purchaseDetails.content_img.imgs;
          imgListModel.splice(imgListModel.length - 1, 1);
          this.imgList = imgListModel;
          this.rowData = [
            {
              count: this.purchaseDetails.offer_count,
              sendman: "***",
              phone: "***********",
              fixPhone: "**********",
              qq: "********",
              address: "**************"
            }
          ];
        }
      });
    },

    getPurchase(page, size) {
      this.searchMap.status="1";
      var username = localStorage.getItem("username");
      this.$http({
        url: `${url.purchase}/search/${page}/${size}`,
        // headers:this.headers,
        data: this.searchMap,
        method: "post"
      }).then(res => {
        if (res.data.code == 20000) {
          this.purchaseList = res.data.data.rows;
          for (var i = 0; i < this.purchaseList.length; i++) {
            this.purchaseList[i].message = JSON.parse(
              this.purchaseList[i].message
            );
            this.purchaseList[i].message = this.purchaseList[i].message
              ? this.purchaseList[i].message.length
              : "0";
            this.purchaseList[i].delivery_date =
              this.purchaseList[i].delivery_date + "天";
            this.purchaseList[i].send_date = this.resolvingDate(
              this.purchaseList[i].send_date
            );
            this.purchaseList[i].last_date = this.resolvingDate(
              this.purchaseList[i].last_date
            );
            this.purchaseList[i].imgs = [];
            this.purchaseList[i].content = "";
            this.purchaseList[i].content_img = JSON.parse(
              this.purchaseList[i].content_img
            );
          }

          this.total = parseInt(res.data.data.total);
          this.updateCount = 0;
        }
      });
    },
    //立即报价
    toQuote(qid) {
      if (!localStorage.getItem("username")) {
        this.$message.error("请登录后再报价");
        return;
      }
      var username = localStorage.getItem("username");
      if (localStorage.getItem("roles").indexOf("provider") == -1) {
        // this.$message.error("您的身份还不是供应商,未能报价");
        // console.log(document.getElementById('app').style.height);
        this.wenz =
          "亲爱的 " +
          (username ? username : "用户") +
          "，您还不是我们的供应商会员，申请成为供应商会员之后，介意查看平台上所有经销商的信息和进行采购报价，快来申请吧~";
        document.getElementById("popup").style.display = "";
        return;
      }
      var username = localStorage.getItem("username");
      var password = localStorage.getItem("password");
      var roles = localStorage.getItem("roles");
      var Authorization = localStorage.getItem("Authorization");
      var id = localStorage.getItem("ID");
      var expireTime = localStorage.getItem("expireTime");

      var href =
        `${url.supplierUrl}/jump?Authorization=${Authorization}&a=${username}&roles=${roles}&id=${id}&quote=` +
        qid;
      window.open(href);
    },

    toDetails(id) {
      this.$router.push("/purchaseDetail?id=" + id);
      location.reload();
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

<style lang="scss" scoped>
#bhncProInofDetail {
  .w {
    width: 1200px;
    margin: 0 auto;
  }
  .chakan {
    width: 92px;
    height: 30px;
    background: rgba(210, 29, 39, 1);
    box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.24);
    border-radius: 8px;
    font-size: 12px;
    font-family: MicrosoftYaHei, 微软雅黑;
    font-weight: 400;
    color: rgba(255, 254, 254, 1);
  }
  .baojiaBox {
    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.04);
    h4 {
      height: 67px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.06);
      line-height: 67px;
      text-indent: 34px;
      margin-top: 8px;
      font-size: 16px;
      font-family: MicrosoftYaHeiLight, 微软雅黑;
      font-weight: bold;
      color: rgba(102, 102, 102, 1);
    }
  }
  .weitu {
    min-height: 825px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.04);
    .weituDetails {
      .weituTitle {
        width: 710px;
        margin: 0px auto;
        padding: 30px 0;
      }
      .weituImg {
        width: 710px;
        margin: 0 auto;
        img {
          width: 710px;
          height: 640px;
        }
      }
    }
  }
  .see_des {
    width: 94px;
    height: 26px;
    background: rgba(255, 255, 255, 0.28);
    border: 1px solid rgba(241, 145, 73, 1);
    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.12);
    opacity: 0.6;
    border-radius: 8px;
    font-size: 12px;
    font-family: MicrosoftYaHei, 微软雅黑;
    font-weight: 400;
    color: rgba(252, 146, 99, 1);
  }
  .more_xin {
    height: 67px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.06);
    line-height: 67px;
    text-indent: 34px;
    margin-top: 8px;
    font-size: 16px;
    font-family: MicrosoftYaHeiLight, 微软雅黑;
    font-weight: bold;
    color: rgba(102, 102, 102, 1);
  }
}
</style>
