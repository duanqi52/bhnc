<template>
  <div>
    <div class="consen" style="x">
      <div class="hader_bor">
        <!-- <div class="news_de">公告详情</div> -->
        <p>{{noticeDetails.title}}</p>
        <div class="hader_bor_a">
          <!-- <span>发送人: {{noticeDetails.send_man}}</span> -->
          <span class="hader_bor_time">{{noticeDetails.send_date}}</span>
        </div>
      </div>
      <div class="weitu">
        <el-container>
          <el-main style="height: unset;" v-html="noticeDetails.content"></el-main>
        </el-container>
        <br />
      </div>
      <div style="text-align: center;">
        <!-- <el-button style="margin: 100px;" @click="news()" type="primary">返回</el-button> -->
      </div>
    </div>
  </div>
</template>

<script>
import url from "../../serverAPI.config.js";
export default {
       metaInfo: {
    title: '笔海弄潮——制笔行业企业上云综合服务平台', // set a title
    meta: [{                 // set meta
      name: 'keyWords',
      content: '制笔行业、制笔厂家、礼品笔、学生笔、中性笔、圆珠笔、钢笔、墨水、笔芯、制笔机械及零部件；'
    },
    {
        name:"description",
        content: '笔海弄潮，连接制笔行业采购商和供应商的智慧化数字平台，帮制笔行业采购商寻找各种笔类产品，帮制笔行业厂家寻找各类采购商，为厂商企业管理提供企业上云的管理服务。',
    }],
  },
  data() {
    return {
      noticeDetails: {} //数据
    };
  },
  components: {},
  mounted() {
    this.getDetails();
  },
  methods: {
    news() {
      this.$router.go(-1);
    },
    getDetails() {
      this.$http({
        url: `${url.noticeDetails}/${this.$route.query.id}`,
        method: "get"
      }).then(res => {
        if (res.data.code == 20000) {
          this.noticeDetails = res.data.data;
          var date = new Date(
            +new Date(new Date(this.noticeDetails.sendDate).toJSON())
          )
            .toISOString()
            .replace(/T/g, " ")
            .replace(/\.[\d]{3}Z/, "");
          var dateArray1 = date.split("-");
          var dateArray2 = dateArray1[2].split(" ");
          this.noticeDetails.sendDate =
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

<style lang="scss">
  
    .consen {
        .el-main{
            p{
                text-align: left;
                color: #666;
                font-size: 16px;
                line-height: 1.8;
                padding-bottom: 36px;
                img{
                  max-width: 910px;
                }
            }
        }
    }
</style>
<style lang="scss" scoped>
.consen {
  width: 1200px;
  margin: 0 auto;
  background-color: white;
 

  .weitu {
      width: 938px;
      margin: auto;
  }
  .el-container {
    width: 100%;
    display: inline-block;
    text-align: center;
  }

  .el-main {
    background-color: white;
    color: #333;
    // line-height: 60px;
   
  }
  .hader_bor {
    padding: 40px 40px 0 40px;
      width: 938px;
      margin: auto;

    border-bottom: 8px solid #E0E0E0;
    p {
      text-align: center;
      font-size: 20px;
      font-family: Microsoft YaHei,微软雅黑;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
    }
    .hader_bor_a {
      margin: 20px;
      text-align: center;

      .hader_bor_time {
        font-size: 16px;
        font-family: Microsoft YaHei,微软雅黑;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
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
    font-family: MicrosoftYaHei,微软雅黑;
    font-weight: 400;
    color: rgba(61, 145, 231, 1);
    margin-bottom: 30px;
  }
}
</style>