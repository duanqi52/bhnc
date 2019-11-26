<!-- 组件说明 -->
<template>
  <div id="bhncUp-vip">
    <div class="integral">
      <div class="bg_ji">
        <div class="integral-msg">
          <h4 style="font-size:24px;color:rgba(252,146,99,1);text-align: left;text-indent: 37px;margin-top: 33px;">会员等级</h4>
          <p>
            <span >{{level}}</span>          
          </p>
          <div style="font-size:18px;color:rgba(102,102,102,1);margin-top: 80px;text-align: right;padding-right: 30px;" v-if="isHasExpireTime">
            <span>试用期将于 <span style="font-size:24px;color:#D23A43;">{{outTime}}天</span> 后到期</span><br>
            <span style="font-size:14px;color:rgba(153,153,153,1);">请联系客服尽快审核</span>
          </div>
        </div>
        <div class="integral-msg_a">
          <div class="title_msg_a">会员介绍</div>
          <p>
            白银会员<br>
            用户注册成为“笔潮弄潮”的采购商会员、供应商会员，即自动成为白银会员。白银会员可在使用平台上大部分的功能，例如收藏商品、收藏采购商、收藏供应商、编辑发布企业营销目录，以及发布求购信息、供应信息等操作。<br>
            黄金会员<br>
            用户注册成为“笔潮弄潮”的采购商会员、供应商会员后，当积分累积达到2001分后，即自动成为黄金会员。
            黄金会员可在使用平台上全部的功能，包括但不限于收藏商品、收藏其他采购商、收藏其他供应商、编辑发布企业营销目录、查看目标采购商信息、查看目标供应商信息，以及回复求购信息报价、发布广播消息等操作，部分操作需要消耗积分。
          </p>
        </div>
      </div>
    </div>
    <div class="up-vip">
      <!-- 遮罩层 -->
      <!-- 遮罩层 -->
      <div id="mask" ref="mask" v-show="isShow" @touchmove.prevent>
        <!-- <div class="payImg" @click="toYearMember()"> -->
        <div class="payImg" @click.stop>
          <div class="centerBox" v-if="isPay">
            <p
              style="font-size:36px;color:#FC7437;position:absolute;left:50%;top:77px;transform:translateX(-50%);"
            >至尊VIP年费会员</p>
            <p
              style="font-size:28px;color:#FC7437;position:absolute;left:50%;top:126px;transform:translateX(-50%);"
            >{{dealerSetLevel.money}}元/年</p>
            <!-- 微信支付 -->
            <img src="../../../static/img/wechat.png" alt class="wechat" @click.stop="toWechatPay" />
            <!-- 支付宝支付 -->
            <img src="../../../static/img/alipay.png" alt class="alipay" @click.stop="toAlipay" />
            <p class="pleaseChoose">请选择付款方式</p>
          </div>
          <!-- 微信支付二维码弹窗页面 -->
          <div class="wechatBox" v-if="isWechat">
            <div
              style="font-size: 28px;color: rgb(252, 116, 55);position: absolute;left: 50%;top: 60px;transform: translateX(-50%);display: block;width: 100%;text-align: center;"
            >至尊VIP年费会员:{{dealerSetLevel.money}}元/年</div>
            <div class="codeBg">
               <!-- <img sr c="/static/img/yard.png" alt=""  
               style="width: 182px;height: 182px;display: block;margin: auto;position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);"> -->
                <img  :src="wxUrl"  alt
                style="width: 182px;height: 182px;display: block;margin: auto;position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);"
              />
            </div>
          </div>
        </div>
      </div>
      <div style="display: inline-block;position: absolute;width: 55%;left: 3%;top: 20%;min-height: 227px;">
        <p>
          至尊VIP会员<br>
          用户注册成为“笔潮弄潮”的采购商会员、供应商会员后，通过付费升级，可以成为“笔潮弄潮”的至尊VIP会员。<br>
          至尊VIP会员可在使用平台上全部的功能，包括但不限于收藏商品、收藏其他采购商、收藏其他供应商、编辑发布企业营销目录、查看目标采购商信息、查看目标供应商信息，以及回复求购信息报价、发布广播消息等操作，且至尊VIP会员进行任何操作都不消耗任何积分，同时享受“笔潮弄潮”的VIP服务待遇。
        </p>
      </div>
      <div class="vip-box">
        <img :src="vipImg" alt class="up_vip_img"  @click.stop="judeUp" />
      </div>
      
    </div>
  </div>
</template>

<script>
//import x from ''
import url from "@/serverAPI.config.js";
export default {
  components: {},
  data() {
    return {
      vipImg: require("../../../static/img/upVip.png"),
      level: "0",
      isShow: false,
      expireTime: "",
      outTime:"",
      isHasExpireTime:false,
      isWechat: false,
      isPay: false,
      dealerSetLevel:"",
      setLevel: [],
      user:null,
      timer:null,
      sum:0,
      paymentInfo:null,
      wxUrl:"#",

    };
  },
  computed: {},
  created() {
    this.getSetLevel();
    this.getUserMsg();
    //this.getIntegral();
     this.getDealerSetLevel();
    if (localStorage.getItem("status")) {
      localStorage.status = "";
      // this.isShow = true;
      this.expireTime = localStorage.getItem("expireTime");
    }
  },
  mounted() {
    this.id = localStorage.getItem("ID");
    this.getExpireTime();
    this.$refs.mask.style.height =
      document.getElementById("app").clientHeight + "px";
    if (this.isShow == false) {
      document.body.style.overflow = "visible";
    }

    //   点击空白以为的消失遮罩层
    document.addEventListener("click", e => {
      if (e.target.className != "priceList") {
        this.isShow = false;
      }
    });
  },
  methods: {
    getDealerSetLevel(){
     this.$http({
        // url:'http://localhost:9004/integralRecord/getSupplierSetLevel',
        url: `${url.getDealerSetLevel}`,
        method: "get"
      }).then(res => {
        if (res.data.code == 20000) {
         this.dealerSetLevel=res.data.data;         
        }
      });
    },
    getSetLevel(){
       this.$http({
         //url:'http://localhost:9004/integralRecord/getSetLevel',
        url: `${url.getSetLevel}`,
        method: "get"
      }).then(res => {
        if (res.data.code == 20000) {
         this.setLevel=res.data.data;
        }
      });
    },
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
          // for (var i = 0; i < this.marqueeList.length; i++) {
          //   this.marqueeList[i].send_date = this.resolvingDate(
          //     this.marqueeList[i].send_date
          //   );
          // }
        }
      });
    },
    voucher() {
      alert("暂未开通充值系统！");
    },
    back() {
      this.$router.go(-1);
    },
        //获取当前用户信息
    getUserMsg() {
      this.$http({
        url: `${url.getUserMsg}`,
        method: "get"
      }).then(res => {
          this.user = res.data.data;
          if(this.user.level=="88" || this.user.level=="100"){
              this.level="至尊VIP会员"
          }
          if(this.user.level=="1"){
            this.level="白银会员"
          }
           if(this.user.level=="2"){
            this.level="黄金会员"
          }
          if(this.user.level=="89"){
            for (var i = 0; i < this.setLevel.length; i++) {
              if(this.user.integral>=this.setLevel[i].start_integral){
                  this.level=this.setLevel[i].name;
              }         
            }           
          }        
        }).catch(err => {
          console.log(err);
        });
      },
    // getIntegral() {
    //   this.$http({
    //     url: `${url.getIntegralInfo}/${localStorage.getItem("siteName")}`,
    //     method: "get"
    //   }).then(res => {
    //     if (res.data.code == 20000) {
    //       this.level = res.data.data.level;
    //     } else {
    //       this.$message.error(res.data.message);
    //     }
    //   });
    // },
    toYearMember() {
      this.$http({
        url: `${url.toYearMember}/${localStorage.getItem("siteName")}/provider`,
        method: "get"
      }).then(res => {
        if (res.data.code == 20000) {
          this.getIntegral();
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    judeUp() {
     // return
      if (this.user.level == "88" || this.user.level == "100") {
        if (document.querySelectorAll(".el-message").length == 0)
          this.$message("您已是超级会员，无需升级。");
        return;
      } else {
        this.isShow = true;
        this.isPay = true;
        this.isWechat = false;
      }
    },
    // 微信支付
    toWechatPay() {
      //return
      this.isPay = false;
      this.isWechat = true;
    var data = {};
      data.amount = this.dealerSetLevel.money;
      data.uid = localStorage.getItem("ID");
        this.$http({
        //url: 'http://localhost:8888/wxpay/dealerAnnualWxPay',
        url: `${url.dealerAnnualWxPay}`,
        method: "post",
        data: data
      }).then(res => {
           if (res.data.code == 20000) {
              this.paymentInfo = res.data.data; 
        //this.wxUrl='http://localhost:8888/wxpay/dealerAnnualWxPayQrcode/'+this.paymentInfo.total_amount+"/"+this.paymentInfo.trade_no;
            this.wxUrl=url.dealerAnnualWxPayQrcode+"/"+this.paymentInfo.total_amount+"/"+this.paymentInfo.trade_no;
           
                    this.timer = setInterval( () => {                     
                        this.monitorWxStatus();
                    }, 5000)                    
             }  
        
      });




    },
    monitorWxStatus() {
          this.$http({
          // url: 'http://localhost:8888/pay/queryorder/'+this.paymentInfo.trade_no,
              url: `${url.dealerWxPayQueryorder}/${this.paymentInfo.trade_no}`,
              method:"get",          
           }).then(res =>{    
              if (res.data.code == 20000) {
                clearInterval(this.timer)
                this.timer=null;   

                //支付成功进行逻辑处理


                this.isWechat = false;
                location.href = "/upVip";
             }else{
               this.sum++;
               if(this.sum==10){//如果100秒后还未支付则进行逻辑处理
                clearInterval(this.timer)
                this.timer=null;
                //支付失败进行逻辑处理

                  console.log("支付超时");
                  this.isWechat = false;  
                  location.href = "/upVip";
               }
             }   
          })
    },
    // 支付宝支付
    toAlipay() {
     // return
      this.isShow = !this.isShow;
           var data={};
          data.amount=this.dealerSetLevel.money;
          data.uid=localStorage.getItem("ID");
           this.$http({           
            url: `${url.payDealerAnnual}`,
            method:"post",
            data:data,
          }).then(res =>{
          const div=document.createElement('divform');
          div.innerHTML=res.data;
          document.body.appendChild(div);
          document.forms[0].submit();   
          // var newwindow = window.open("#","_blank");
          //   newwindow.document.write(res.data);
          }) 
    }
  },
};
</script>

<style lang='scss' scoped>
//@import url()
#bhncUp-vip {
  .integral {
    .integral-msg {
      text-align: center;
      width: 34%;
      display: inline-block;
      background: url("../../../static/img/Integral_bg.png") no-repeat;
      background-size: 100% 320px;
      height: 320px;
      float: left;
      p {
        display: inline-block;
        span {
          font-size: 48px;
          font-family: Adobe Heiti Std R;
          font-weight: normal;
          color: rgba(252, 146, 99, 1);
          margin-top: 50px;
          display: inline-block;
        }
      }
    }
    .search {
      text-align: center;
      height: 50px;
      line-height: 50px;
      margin: 20px 0;
      input {
        width: 315px;
        height: 35px;
        border: 1px solid #e6e6e6;
        padding-left: 15px;
      }
    }
  }
  .bg_ji {
    height: 330px;
    background-color: #eeeeee;
  }
  .integral-msg_a {
    background: url("../../../static/img/official_bg.png") no-repeat;
    background-size: cover;
    height: 320px;
    display: inline-block;
    width: 65.5%;
    float: right;
    .title_msg_a {
      font-size: 20px;
      font-family: MicrosoftYaHeiLight;
      font-weight: bold;
      color: rgba(102, 102, 102, 1);
      text-indent: 49px;
      margin-top: 34px;
    }
    p {
      font-size: 16px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      width: 82%;
      margin: 20px auto;
      height: 136px;
    }
  }
  .up-vip{
    background: url("../../../static/img/upVipBig_bg.png") no-repeat;
    height: 615px;
    background-size: 100%;
    position: relative;
  }
  .up_vip_img {
    display: inline-block;
    cursor: pointer;
  }
  .vip-box{
    position: absolute;
    right: 10%;
    top: 45%;
    transform: translateY(-50%);
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
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
    // 遮罩层盒子
    .centerBox {
      position: relative;
      width: 762px;
      height: 414px;
      background-image: url("../../../static/img/nianhuibj.png");
      .wechat {
        position: absolute;
        left: 192px;
        bottom: 68px;
        cursor: pointer;
      }
      .alipay {
        position: absolute;
        right: 192px;
        bottom: 68px;
        cursor: pointer;
      }
      .pleaseChoose {
        position: absolute;
        left: 50%;
        bottom: 14px;
        transform: translateX(-50%);
        font-size: 20px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(186, 177, 160, 1);
        line-height: 36px;
      }
    }
    .wechatBox {
      position: relative;
      width: 482px;
      height: 414px;
      background-image: url("../../../static/img/wechatCodebj.png");
      background-repeat: no-repeat;
      .codeBg {
        position: absolute;
        left: 50%;
        bottom: 76px;
        transform: translateX(-50%);
        width: 220px;
        height: 220px;
        background: linear-gradient(
          0deg,
          rgba(254, 240, 240, 1),
          rgba(255, 248, 234, 1)
        );
        box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.12);
        border-radius: 16px;
      }
    }
  }
}
</style>