<template>
  <div id="bhncNews_details">
    <div class="hader_bor">
      <p class="order_title">标题：{{purchaseDetails.title}}</p>
      <div class="hader_bor_a">
        <span>发件人：{{purchaseDetails.c_name}}</span>
        <span class="hader_bor_time">发送时间：{{purchaseDetails.send_date}}</span>
      </div>
    </div>
    <!-- 文图详情 -->
    <div class="weitu" v-if="dShow == '0'">
      <el-container>
        <el-main style="height: unset;" v-html="purchaseDetails.content"></el-main>
      </el-container>
      <br />
    </div>
    <!-- 通过审核 -->
    <div class="weitu"  v-if="dShow == '1' ">
        <div>
            <p class="respect">{{purchaseDetails.content}}</p> <br>
            <div class="respects">
                <span class="respect_a">" <span style="text-decoration:underline;cursor: pointer;"  @click=" toDetails()">{{purchaseDetails.url.title}}</span> "</span>
                <span class="respect_b">点击查看详情</span>
            </div> 
        </div>
    </div>
    <!-- 通过未审核 -->
    <div class="weitu" v-if="dShow == '2'">
        <div>
            <p class="respect">{{purchaseDetails.content}}</p> <br>
            <div class="respects">
                <span style="font-size:20px;">“”{{purchaseDetails.url.title}}“”</span>
            </div> 
        </div>
    </div>
    <div style="text-align: center;">
      <el-button style="margin: 50px;" @click="news()" type="warning">返回</el-button>
    </div>
  </div>
</template>

<script>
import url from "../../serverAPI.config.js";
export default {
  data() {
    return {
      purchaseDetails: {}, //数据
      searchMap: {
        id: this.$route.query.id,
        send_date: "-"
      },
      dShow: "0",
      detailsShow: "0",
      href:""
    };
  },
  components: {},
  mounted() {
    this.NewsDetails();
  },
  methods: {
    news() {
      this.$router.go(-1);
    },
    NewsDetails() {
      this.$http({
        url: `${url.News}/1/1`,
        // url:'http://172.16.0.138:9001/advices/search/1/1',
        // headers:this.headers,
        data: this.searchMap,
        method: "post"
      }).then(res => {
        if (res.data.code == 20000) {
          this.purchaseDetails = res.data.data.rows[0];
          var date = new Date(
            new Date(this.purchaseDetails.send_date) 
          )
            .toISOString()
            .replace(/T/g, " ")
            .replace(/\.[\d]{3}Z/, "");
            this.purchaseDetails.send_date = date;
          var dateArray1 = date.split("-");
          var dateArray2 = dateArray1[2].split(" ");
          this.purchaseDetails.send_date =
            dateArray1[0] +
            "年" +
            dateArray1[1] +
            "月" +
            dateArray2[0] +
            "日 " +
            dateArray2[1];
          if (this.purchaseDetails.url) {
            this.purchaseDetails.url = JSON.parse(this.purchaseDetails.url);
            var utype = this.purchaseDetails.url.type;
            var uId = this.purchaseDetails.url.id;
            var href = "";
            this.dShow = "0";
            var content = ""
            if (utype == "1") {
              var username = localStorage.getItem("siteName");
              var roles = localStorage.getItem("roles");
              var Authorization = localStorage.getItem("Authorization");
              var VISITOR = localStorage.VISITOR;
              var ID = localStorage.ID;
              // href = "http://182.61.148.122:40/saveParam.html?id=" + uId;
              href = `${url.detailUrl}/saveParam.html?id=`+ uId;
              if (username) {
                href += "&username=" + username;
              }
              if (roles) {
                href += "&roles=" + roles;
              }
              if (VISITOR) {
                href += "&VISITOR=" + VISITOR;
              }
              if (Authorization) {
                href += "&Authorization=" + Authorization;
              }
              if (ID) {
                href += "&UID=" + ID;
              }
              this.dShow = "1";
              this.detailsShow = "1";
               content = "尊敬的"+localStorage.getItem('siteName')+"会员，您发布的商品，已通过审核"
            }
            if (utype == "2") {
              href = `${url.shopUrl}/purchaseDetail?id=` + uId;
              this.dShow = "1";
              this.detailsShow = "1";
              content = "尊敬的"+localStorage.getItem('siteName')+"会员，您发布的求购信息，已通过审核"
            }
            if (utype == "3") {
              href = `${url.shopUrl}/proInofDetail?id=` + uId;
              this.dShow = "1";
              this.detailsShow = "1";
              content = "尊敬的"+localStorage.getItem('siteName')+"会员，您发布的供应信息，已通过审核"
            }
            if (href) {
                this.href = href; 
              this.purchaseDetails.content = content;
             
            } else {
              if (utype == "4") {
                this.dShow = "2";
                this.detailsShow = "0";
                content = "尊敬的"+localStorage.getItem('siteName')+"会员，您发布的商品未能通过审核"
              }
              if (utype == "5") {

                this.dShow = "2";
                this.detailsShow = "0";
                content = "尊敬的"+localStorage.getItem('siteName')+"会员，您发布的求购信息未能通过审核"
              }
              if (utype == "6") {
                this.dShow = "2";
                this.detailsShow = "0";
                content = "尊敬的"+localStorage.getItem('siteName')+"会员，您发布的供应信息未能通过审核"
              }

              this.purchaseDetails.content = content;
            }
          }
        }
      });
    },
    toDetails(){
        window.open(this.href);
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
#bhncNews_details {
  .weitu {
    padding: 50px 0px 0 50px;
    background: url("../../../static/img/newsDetails.png") no-repeat right;
    background-size: 100%;
    background-size: 45% 800px;
    min-height: 800px;
    .respect {
      font-size: 20px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      min-width: 400px;
      display: inline-block;
    }
    .respects {
      min-width: 400px;
      display: inline-block;
      text-align: center;
      margin-top: 50px;
      .respect_a {
        font-size: 28px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(252, 146, 99, 1);
        margin-right: 10px;
        cursor: pointer;
      }
      .respect_b {
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
      }
    }
  }
  .el-container {
    width: 80%;
    display: inline-block;
  }
  .el-main {
    color: #333;
    line-height: 60px;
  }
  .hader_bor {
    border-bottom: 1px solid #ccc;
    p {
      height: 76px;
      background: white;
      -webkit-box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.04);
      box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.04);
      line-height: 68px;
      font-size: 20px;
      font-weight: bold;
      color: #666666;
      padding-left: 50px;
      border-bottom: 8px solid #f0f0f0;
    }
    .hader_bor_a {
      padding: 28px 50px;
      .hader_bor_time {
        font-size: 12px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        margin-left: 80px;
      }
    }
  }
  .hader_img {
    text-align: center;
    padding: 40px 40px 0 40px;
    p {
      text-align: left;
      margin-bottom: 30px;
    }
    img {
      display: inline-block;
    }
  }
  .news_de {
    font-size: 24px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: #666666;
    margin-bottom: 30px;
  }
}
</style>