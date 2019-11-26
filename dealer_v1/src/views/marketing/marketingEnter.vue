<template>
  <div id="bhncMarketingEnter">
    <div class="marketingEnter clearfix">
      <!-- <img src="../../../static/img/marketingBg.png" alt class="bgImg" /> -->
      <div class="topBox clearfix">
        <div class="checkBox fl">
          <div class="checkMarketing" @click="$router.push('/shareJump?id='+username)"></div>
          <div class="editMarketing" @click="$router.push('/marketing')"></div>
          <div class="eidtTime">
            上一次编辑：
            <span v-if="date">{{date}}</span>
          </div>
        </div>
        <div class="marketTitle fr clearfix">
          <p class="titleMarket">笔海弄潮企业营销目录</p>
          <p class="yindaoyu">您的私人企业宣传</p>
          <hr style="width:70px;float:right" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import url from "@/serverAPI.config.js";
export default {
  data() {
    return {
      date: null,
      username: ""
    };
  },
  created() {
    this.username = localStorage.getItem("siteName");
    this.findMarketingToolEditDate();
  },
  methods: {
    findMarketingToolEditDate() {
      this.$http({
        url: `${url.findMarketingToolEditDate}/${localStorage.getItem("ID")}`,
        method: "get"
      }).then(res => {
        if (res.data.code == 20000) {     
          if (res.data.data) {
            this.date = this.formatDate(res.data.data.edit_date);
          }                  
        }
      });
    },

    //时间格式转化
    formatDate(date) {
      //date = date - 8*60*60*1000;
      var time = new Date(date);
      var timeStr =
        time.getFullYear() +
        "-" +
        (time.getMonth() + 1) +
        "-" +
        time.getDate() +
        " " +
        ((time.getHours() + "").length == 1
          ? "0" + time.getHours()
          : time.getHours()) +
        ":" +
        ((time.getMinutes() + "").length == 1
          ? "0" + time.getMinutes()
          : time.getMinutes()) +
        ":" +
        ((time.getSeconds() + "").length == 1
          ? "0" + time.getSeconds()
          : time.getSeconds());

      return timeStr;
    }
  },
  mounted() {
    var screenHeight = window.screen.height;
    document.getElementById("bhncMarketingEnter").style.height =
      screenHeight + "px";
  }
};
</script>
<style lang="scss" scoped>
#bhncMarketingEnter {
  width: 100%;
  background-image: url("../../../static/img/marketingBg.png");
  background-size: auto 100%;
  background-repeat: no-repeat;
  background-position: top right;
  .fl {
    float: left;
  }
  .fr {
    float: right;
  }
  .topBox {
    width: 78%;
    padding-left: 110px;
    padding-top: 190px;
  }

  .marketingEnter {
    min-height: 500px;

    .checkBox {
    }
    .bgImg {
      position: absolute;
      right: 0;
      z-index: -1;
      width: 734px;
    }
    .checkMarketing {
      width: 397px;
      height: 214px;
      background: url("../../../static/img/lookMarketimg.png") no-repeat;
      margin-bottom: 30px;
      cursor: pointer;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
    }

    .editMarketing {
      width: 395px;
      height: 213px;
      background: url("../../../static/img/editMarket.png") no-repeat;
      cursor: pointer;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
    }
    .eidtTime {
      width: 372px;
      padding-top: 20px;
      text-align: center;
      font-size: 16px;
      color: #666;
      font-family: MicrosoftYaHei;
    }
  }

  .marketTitle {
    font-size: 24px;
    font-family: MicrosoftYaHei;
    font-weight: normal;
    color: #666666;
    text-align: right;
    .titleMarket {
      padding-bottom: 15px;
    }
    .yindaoyu {
      font-size: 18px;
    }
  }
}
</style>