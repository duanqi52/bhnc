<template>
  <div id="bhncMainindex">
    <!-- 遮罩层 -->
    <!-- <div id="mask" ref="mask" v-show="isShow" @touchmove.prevent>
      <div class="payImg">
        <span>到期时间:{{expireTime}}</span>
      </div>
    </div>-->
    <div class="hader clearfix">
      <div class="grade fl gradeLeval">
        <div class="gradeNumBox">
          <!-- <span>V</span> -->
          <i>{{currentLevel}}</i>
        </div>
        <div
          style="font-size:18px;color:rgba(102,102,102,1);margin-top: 265px;text-align: right;padding-right: 30px;"
          v-if="isHasExpireTime"
        >
          <span>
            试用期将于
            <span style="font-size:24px;color:#D23A43;">{{outTime}}天</span>后到期
          </span>
          <br />
          <span style="font-size:14px;color:rgba(153,153,153,1);">请联系客服尽快审核</span>
        </div>
      </div>
      <div class="grade fr gradeCurrent">
        <div class="gradeNumBox">
          <i style="font-size:48px;">{{currentIntegral}}</i>
        </div>
      </div>
    </div>
    <div class="max_supplier clearfix">
      <div class="supplier">
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span>供应商消息</span>
          </div>
          <div class="marquee">
            <div class="marquee_box">
              <ul class="marquee_list" :class="{marquee_top:animate}">
                <li
                  v-for="(item,index) in marqueeList"
                  :key="index"
                  class="list_xin"
                  @click="goADetails(item.id)"
                >{{item.title}}</li>
              </ul>
            </div>
          </div>
        </el-card>
      </div>

      <div class="caigou">
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span>我发布的求购信息</span>
          </div>
          <div class="marquee">
            <div class="marquee_box">
              <ul class="marquee_list" :class="{marquee_top:animatePurchase}">
                <li
                  v-for="(item,index) in purchaseList"
                  :key="index"
                  class="list_xin"
                  @click="goPDetails(item.id)"
                >{{item.title}}</li>
              </ul>
            </div>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template> 
<script>
import url from "@/serverAPI.config.js";
import { setTimeout } from 'timers';
export default {
  data() {
    return {
      animate: false,
      animateOrder: false,
      animatePurchase: false,
      marqueeList: [],
      purchaseList: [],
      currentIntegral: "", //积分
      currentLevel: "", //等级
      lookProvider: "", //查看供应商消耗积分,
      isShow: false,
      expireTime: "1",
      outTime: "1",
      isHasExpireTime: false,
      setLevel: []
    };
  },
  created() {
    setInterval(this.showMarquee, 2000);
     this.getSetLevel();
    if (localStorage.getItem("status")) {
      localStorage.status = "";
      this.isShow = true;
      this.expireTime = localStorage.getItem("expireTime");
    }
  },
  mounted() {
    this.id = localStorage.getItem("ID");
    this.getExpireTime();
    this.getNews();
    this.getPurchase();
    this.getUserInFo();
    

    //   点击空白以为的消失遮罩层
    document.addEventListener("click", e => {
      if (e.target.className != "priceList") {
        this.isShow = false;
      }
    });
    var bodyHeight = window.screen.height;
    document.getElementById("bhncMainindex").style.minHeight =
      bodyHeight + "px";
  },
  methods: {
    getExpireTime() {
      this.$http({
        url: `${url.getExpireTime}/${localStorage.getItem("ID")}`,
        method: "get"
      }).then(res => {
        if (res.data.code == 20000) {
          //会员到期时间
          var expireTime = res.data.data;
          if (!expireTime) {
            this.isHasExpireTime = false;
          } else {
            this.isHasExpireTime = true;
            var timeC = new Date(expireTime) - new Date();
            this.outTime = Math.ceil(timeC / (1000 * 60 * 60 * 24));
          }      
        }
      });
    },
    goADetails(id) {
      var data={};
      data.s_id=id;
      data.u_id=localStorage.getItem("ID");
        this.$http({
        //url:'http://172.16.0.138:9001/advices/addPurchaseLookAdvices',
        url: `${url.addPurchaseLookAdvices}`,
        data:data,
        method: "post"
      }).then(res => {
        if (res.data.code == 20000) {
        
        }
      });  
      this.$router.push({ path: "./News_details", query: { id: id } });
    },
    goODetails(id) {
      this.$router.push({ path: "./details", query: { id: id } });
    },
    goPDetails(id) {
      this.$router.push({ path: "./pur_details", query: { id: id } });
    },
    showMarquee: function() {
      this.animate = this.marqueeList.length > 11? true:false;
      this.animatePurchase = this.purchaseList.length > 11? true:false;
      if (this.marqueeList.length > 11)
        setTimeout(() => {
          this.marqueeList.push(this.marqueeList[0]);
          this.marqueeList.shift();
          this.animate = false;
        }, 500);
      if (this.purchaseList.length > 11)
        setTimeout(() => {
          this.purchaseList.push(this.purchaseList[0]);
          this.purchaseList.shift();
          this.animatePurchase = false;
        }, 500);
    },
    //供应商消息
    getNews() {
      this.$http({
        // url: 'http://172.16.0.138:9001/advices/purchaseFindByIdSupplyInfoMgs/'+this.id,
        url: `${url.purchaseFindByIdSupplyInfoMgs}/${this.id}`,
        method: "get"
      }).then(res => {
        if (res.data.code == 20000) {     
          this.marqueeList = res.data.data;
        }
      });
    },
 
    //求购消息
    getPurchase() {
      this.$http({
        url: `${url.findDealerIndexPurchase}/${this.id}`,
        method: "get"
      }).then(res => {
        if (res.data.code == 20000) {  
          this.purchaseList = res.data.data;
        }
      });
    },
      getSetLevel(){
       this.$http({
         //url:'http://localhost:8080/integralRecord/getSetLevel',
        url: `${url.getSetLevel}`,
        method: "get"
      }).then(res => {
        if (res.data.code == 20000) {
         this.setLevel=res.data.data;
        }
      });
    },
    getUserInFo() {
      this.$http({
        url: `${url.amendUser}/getUserInfo`,
       //url:'http://172.16.0.138:8080/user/getUserInfo',
        // headers:this.headers,
        method: "get"
      }).then(res => {
        if (res.data.code == 20000) {  
          this.currentIntegral = res.data.data.current_integral;      
          this.currentLevel = res.data.data.current_level;             
          if(this.currentLevel == '88'|| this.currentLevel=='100'){
            this.currentLevel = '至尊VIP会员';
          }else if(this.currentLevel == '2'){
            this.currentLevel = '黄金会员';
          }else if(this.currentLevel == '1'){
            this.currentLevel = '白银会员';
          } else if(this.currentLevel == '89'){  
               for (var i = 0; i < this.setLevel.length; i++) {
                    if(this.currentIntegral>=this.setLevel[i].start_integral){
                        this.currentLevel=this.setLevel[i].name;
                    }         
                }
          }
          this.lookProvider = res.data.data.lookProvider;
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
#bhncMainindex {
  background-color: #f0f0f0;
  height: 940px;

  .fr {
    float: right;
  }
  .fl {
    float: left;
  }

  .hader {
    .gradeLeval {
      position: relative;
      background-image: url("../../../static/img/indexbgone.png");
      background-size: cover;
      background-repeat: no-repeat;
    }
    .gradeCurrent {
      position: relative;
      background-image: url("../../../static/img/indexbgtwo.png");
      background-size: cover;
      background-repeat: no-repeat;
    }
    .grade {
      width: 49.5%;
      height: 318px;
      .gradeNumBox {
        text-align: center;
        font-size: 0;
        color: rgba(252, 146, 99, 1);
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        i {
          font-size: 109px;
          font-family: Adobe Heiti Std R;
          font-weight: normal;
          font-size: 52px;
        }
        span {
          font-weight: 1000;
          padding-right: 5px;
        }
      }
    }
    .integral {
      display: inline-block;
      h3 {
        width: 160px;
        height: 27px;
        line-height: 27px;
        font-size: 28px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(61, 145, 231, 1);
      }
    }
  }
  .list_xin {
    text-overflow: ellipsis; //文字溢出隐藏多余的 ... 代替
    overflow: hidden; //文字溢出隐藏
    white-space: nowrap; //关于文字内容溢出
    width: 95%;
    display: inline-block;
    cursor: pointer;
  }
  .max_supplier {
    margin-top: 13px;
    width: 100%;

    text-align: center;
  }
  .supplier {
    float: left;
    width: 49.5%;
  }
  .caigou {
    float: right;
    width: 49.5%;
  }
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both;
  }

  .box-card {
    width: 100%;
    display: inline-block;
    // height: 500px;
  }
  .marquee {
    width: 100%;
    align-items: center;
    color: #3a3a3a;
    background-color: white;
    display: flex;
    box-sizing: border-box;
    overflow: hidden;
  }

  .marquee_title {
    padding: 0 20px;
    height: 21px;
    font-size: 14px;
    border-right: 1px solid #d8d8d8;
    align-items: center;
  }

  .marquee_box {
    display: block;
    //   background-color: rgb(238, 241, 246);

    position: relative;
    width: 100%;
    height: 395px;
    overflow: hidden;
  }

  .marquee_list {
    display: inline-block;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }

  .marquee_top {
    transition: all 0.5s;
    margin-top: -30px;
  }

  .marquee_list li {
    height: 30px;
    line-height: 30px;
    padding-left: 24px;
    font-size: 16px;
    font-family: Adobe Heiti Std R;
    font-weight: normal;
    color: rgba(102, 102, 102, 1);
  }

  .marquee_list li span {
    padding: 0 2px;
  }
}
</style>

<style lang="scss">
#bhncMainindex {
  .el-card__body {
    padding: 0;
  }
  .supplier,
  .caigou {
    .box-card {
      .el-card__header {
        background: #fff;
        box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.04);
        border: none;
        font-size: 20px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        text-align: left;
        text-indent: 40px;
        border-bottom: 2px solid #f0f0f0;
      }
    }
  }

  // 遮罩层

  #mask {
    width: 100%;
    //   opacity: 0.6;
    background-color: rgba(102, 102, 102, 0.2);
    bottom: 0;
    left: 0;
    position: fixed;
    z-index: 998;
  }

  .payImg {
    position: fixed;
    width: 400px;
    height: 200px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
  }
}
</style>

