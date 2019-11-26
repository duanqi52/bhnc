<template>
  <div id="bhncNews_mydetails">
    <div class="hader_bor">
      <!-- <div class="news_de">消息详情</div> -->
      <p class="order_title">标题：{{purchaseDetails.title}}</p>
      <div class="hader_bor_a">
        <span>收件人：{{names.join("、")}}</span>
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
import { log } from 'util';
export default {
  data() {
    return {
      purchaseDetails: {}, //数据
      searchMap: {
        id: this.$route.query.id,
        send_date: "-"
      },
      names:[],
      id:this.$route.query.id
    };
  },
  components: {},
  mounted() {
    this.NewsDetails();
  },
  methods: {
   changeTime(time){//904
    var commonTime = "";
    if(time){     
        var unixTimestamp = new Date(time*1);
        var year=unixTimestamp.getFullYear();
        var month=(unixTimestamp.getMonth()+1)<10?"0"+(unixTimestamp.getMonth()+1):unixTimestamp.getMonth()+1;
        var day=unixTimestamp.getDate()<10?"0"+unixTimestamp.getDate():unixTimestamp.getDate();        
        var date =[year,month,day].join('-');
        var hours =unixTimestamp.getHours()<10?"0"+unixTimestamp.getHours():unixTimestamp.getHours();
        var minutes =unixTimestamp.getMinutes()<10?"0"+unixTimestamp.getMinutes():unixTimestamp.getMinutes();
        var seconds =unixTimestamp.getSeconds()<10?"0"+unixTimestamp.getSeconds():unixTimestamp.getSeconds();
         commonTime=date+" "+hours+":"+minutes+":"+seconds;     
    }
     return commonTime;
  },
    news() {
      this.$router.go(-1);
    },
    NewsDetails() {
      this.$http({
        //url:'http://localhost:8080/advices/findSupplierByIdDetails/'+this.$route.query.id,
        url: `${url.findSupplierByIdDetails}/${this.id}`,
        method: "get"
      }).then(res => {
        if (res.data.code == 20000) {     
          this.purchaseDetails = res.data.data;  
          if(this.purchaseDetails.d_id){
            this.names=JSON.parse(this.purchaseDetails.d_id);           
          }        
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
    findNamesById(ids) {
      this.$http({
        url: `${url.findNamesById}`,
        data: ids,
        method: "post"
      }).then(res => {
        if (res.data.code == 20000) {
          res.data.data.map(item=>{
            this.names.push(item.company_name)
          })
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
#bhncNews_mydetails {
   .weitu {
    padding: 50px 0px 0 50px;
    background: url("../../../static/img/newsDetails.png") no-repeat right;
    background-size: 100%;
    background-size: 45% 800px;
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
    background-color: white;
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
        font-family: MicrosoftYaHei, 微软雅黑;
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
    font-family: MicrosoftYaHei, 微软雅黑;
    font-weight: 400;
    color: #666666;
    margin-bottom: 30px;
  }
}
</style>