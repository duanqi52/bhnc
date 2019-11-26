<template>
  <div id="bhncNews_details">
    <div class="hader_bor">
      <div class="news_de">消息详情</div>
      <p style="width: 80%;">{{purchaseDetails.title}}</p>
      <div class="hader_bor_a">
        <span>发件人：{{purchaseDetails.c_name}}</span>
        <span class="hader_bor_time">发送时间：{{purchaseDetails.send_date}}</span>
      </div>
    </div>
    <div class="weitu">
      <el-container>
        <el-main style="height: unset;" v-html="purchaseDetails.content"></el-main>
      </el-container>
      <br />
    </div>
    <div style="text-align: center;">
      <el-button style="margin: 100px;" @click="news()" type="warning">返回</el-button>
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
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIxIiwic3ViIjoiMTM0MzMxNTcxNDciLCJpYXQiOjE1NjAzMzQzNTEsInJvbGVzIjoidXNlciJ9.cpLQ0B-asQpLawZ_uoEi0VkMlfbVWgWO4rxKtKeD404"
      }
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
        // headers:this.headers,
        data: this.searchMap,
        method: "post"
      }).then(res => {
        if (res.data.code == 20000) {
          this.purchaseDetails = res.data.data.rows[0];
          var date = new Date(
            +new Date(new Date(this.purchaseDetails.send_date).toJSON()) +
              8 * 3600 * 1000
          )
            .toISOString()
            .replace(/T/g, " ")
            .replace(/\.[\d]{3}Z/, "");
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
        }
      });
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
    padding: 40px 40px 0 40px;
    border-bottom: 1px solid #ccc;
  }
  .el-container {
    width: 80%;
    display: inline-block;
  }
  .el-main {
    background-color: white;
    color: #333;
    line-height: 60px;
  }
  .hader_bor {
    padding: 40px 40px 0 40px;
    border-bottom: 1px solid #ccc;
    p {
    }
    .hader_bor_a {
      margin: 80px 0 20px 0;
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