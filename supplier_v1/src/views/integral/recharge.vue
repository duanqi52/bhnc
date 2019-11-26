

<template>
  <div id="bhncRecharge"  @click="isShow=false">
    <div class="rechargeBox">
      <!-- 遮罩层 -->
      <!-- 积分说明标题 -->
      <div class="myCharge">
        <div class="chargeTop">
          <span class="jifen">我的积分</span>
          <div class="countCircle">
            <div class="countNum">
              <span>{{integral}}</span>
            </div>
          </div>
        </div>
        <div class="descript">
          <p>1元人民币等价于5个积分，会员积分是归档会员等级的唯一依据，不同级别的会员享受不同的积分消耗优惠政策。</p>
          <table border="1" class="IntegralForm">
            <tr>
              <th>等级</th>
              <th>积分区间</th>
            </tr>
            <tr>
              <td>普通会员</td>
              <td>不设区间</td>
            </tr>
            <tr>
              <td>白银会员</td>
              <td>0-2000积分</td>
            </tr>
            <tr>
              <td>黄金会员</td>
              <td>2001积分以上</td>
            </tr>
            <tr>
              <td>至尊VIP会员</td>
              <td>年卡5000元</td>
            </tr>
          </table>
        </div>
      </div>
      <!-- 支付 -->
      <div class="payBox">
        <div class="payTitle">
          <span class="payType">充值方式</span>
          <template>
            <label
              style="margin-right:41px; width:140px"
              v-for="(payitem,payindex) in payType"
              :key="payindex"
              @click="changeState(payitem,payindex)"
            >
              <span class="radioCircle">
                <span class="innerCircle" v-show="payitem.isCheck"></span>
              </span>
              <input type="radio" name="pay" id="wechat" hidden />
              <span>{{payitem.payName}}</span>
            </label>
          </template>
        </div>
        <!-- 价格列表 -->
        <div class="priceList">
          <ul>
            <li v-for="(item,index) in priceList" :key="index">
              <span @click.stop="payNum(item)">{{ item }} 元</span>
            </li>
          </ul>
        </div>

        <!-- 充值输入 -->
        <div class="chargeInput">
          <input
            type="tel"
            placeholder="请输入充值金额"
            v-model="amount"
            class="inputVal"
            min="1"
            v-fixnumber
            maxlength="11"
            onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
            onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
          />
          <input type="button" value="充值" class="inputBtn" @click.stop="payNum(amount)" />
        </div>

        <!-- 微信支付二维码弹窗页面 -->
        <div id="mask" v-if="isShow">
          <div class="wechatBox" @click.stop>
            <div
              style="font-size: 28px;color: rgb(252, 116, 55);position: absolute;left: 50%;top: 60px;transform: translateX(-50%);display: block;width: 100%;text-align: center;"
            >充值金额:{{amount}}</div>
            <div class="codeBg">
              <img
                :src="wxUrl"
                alt
                style="width: 182px;height: 182px;display: block;margin: auto;position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);"
              />
            </div>
          </div>
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
      priceList: [10, 20, 50, 100, 200, 500],
      amount: "",
      payType: [
        { isCheck: false, payName: "微信支付" },
        { isCheck: false, payName: "支付宝支付" }
      ],
      isShow: false,
      integral: 10000,
      newIntegral: 0,
      paymentInfo: null,
      wxUrl: "#",
      monitor: null,
      SUCCESS: false,
      timer: null,
      sum: 0
    };
  },
  created() {
    this.getIntegral();
  },
  methods: {
    changeState(payitem) {
      this.payType.map((item, index) => {
        if (item == payitem) {
          payitem.isCheck = true;
        } else {
          item.isCheck = false;
        }
      });
    },
    payNum(amount) {
     // return
      if (!amount || amount <= 0) {
        this.$message.error("充值金额必须大于0");
        return;
      }
      var is = true;
      this.payType.forEach((item, index) => {
        if (item.isCheck == true && "支付宝支付" == item.payName) {
          var data = {};
          data.amount = amount;
          data.uid = localStorage.getItem("ID");
          this.$http({
            //url: 'http://localhost:9998/pay/pay/supplier/alipay/sub',
            url: `${url.pay}`,
            method: "post",
            data: data
          }).then(res => {
            const div = document.createElement("divform");
            div.innerHTML = res.data;
            document.body.appendChild(div);
            document.forms[0].submit();

            // var newwindow = window.open("#","_blank");
            //   newwindow.document.write(res.data);
          });
          is = false;
          // this.isShow = true;
        }

        if (item.isCheck == true && "微信支付" == item.payName) {
          var data = {};
          data.amount = amount;
          data.uid = localStorage.getItem("ID");
          this.amount = amount;
          this.$http({
            //url: 'http://localhost:8888/pay/supplierIntegralWxPay',
            url: `${url.supplierIntegralWxPay}`,
            method: "post",
            data: data
          }).then(res => {
            if (res.data.code == 20000) {
              this.paymentInfo = res.data.data;
              //this.wxUrl='http://localhost:8888/pay/supplierIntegralWxPayQrcode/'+this.paymentInfo.total_amount+"/"+this.paymentInfo.trade_no;
              this.isShow = true;
              this.wxUrl =
                url.supplierIntegralWxPayQrcode +
                "/" +
                this.paymentInfo.total_amount +
                "/" +
                this.paymentInfo.trade_no;

              this.timer = setInterval(() => {
                this.monitorWxStatus();
              }, 5000);
            }
          });
          is = false;
        }
      });
      if (is) {
        this.$message.error("请选择付款方式");
      }
    },
    monitorWxStatus() {
      this.$http({
        // url: 'http://localhost:8888/pay/queryorder/'+this.paymentInfo.trade_no,
        url: `${url.supplierWxPayQueryorder}/${this.paymentInfo.trade_no}`,
        method: "get"
      }).then(res => {
        if (res.data.code == 20000) {
          clearInterval(this.timer);
          this.timer = null;
          //支付成功进行逻辑处理
          this.isShow = false;
          this.$message({
            message: "支付成功",
            type: "success"
          });
          setTimeout(() => {
            this.$router.go(0);
          }, 2000);
        } else {
          this.sum++;
          if (this.sum == 10) {
            //如果100秒后还未支付则进行逻辑处理
            clearInterval(this.timer);
            this.timer = null;
            //支付失败进行逻辑处理
            console.log("支付超时");
             this.$message.error('支付超时');
          }
        }
      });
    },
    getIntegral() {
      this.$http({
        //url:'http://172.16.0.124:9007/user/getIntegralInfo/'+localStorage.getItem("siteName"),
        url: `${url.getIntegralInfo}/${localStorage.getItem("username") || localStorage.getItem("siteName")}`,
        method: "get"
      }).then(res => {
        if (res.data.code == 20000) {
          this.integral = res.data.data.integral;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    recharge() {
      // this.$http({
      //    // url:'http://172.16.0.124:9007/user/updateIntegral/'+localStorage.getItem("siteName")+'/'+this.newIntegral,
      //    url: `${url.updateIntegralInfo}/${localStorage.getItem("siteName")}/${this.newIntegral}`,
      //   method: "get"
      // }).then(res => {
      //   if (res.data.code == 20000) {
      //     this.newIntegral = 0;
      //     this.amount = "";
      //     this.getIntegral();
      //     this.$message.success("充值成功");
      //   } else {
      //     this.$message.error("网络异常,充值失败");
      //   }
      // });
    }
  },
  mounted() {
   
  }
};
</script>
<style   lang="scss" scoped>
$color: #fc9263;
#bhncRecharge {
  #mask {
    width: 100%;
    background-color: rgba(102, 102, 102, 0.3);
    bottom: 0;
    left: 0;
    top: 0;
    right: 0;
    position: fixed;
    z-index: 999999;
  }

  .wechatBox {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 482px;
    height: 414px;
    background-image: url("/static/img/wechatCodebj.png");
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

  .rechargeBox {
    .myCharge {
      padding-left: 50px;
      border-bottom: 8px solid rgb(240, 240, 240);
      background: url("../../../static/img/recharge_bg.png") no-repeat;
      background-size: cover;
      padding-bottom: 40px;
      .chargeTop {
        display: flex;
        height: 200px;
        line-height: 200px;
        margin-bottom: 50px;

        .jifen {
          margin-right: 75px;
          font-size: 32px;
          font-family: MicrosoftYaHei, 微软雅黑;
          font-weight: 400;
          color: #fc9263;
        }
      }
      .countCircle {
        position: relative;
        width: 170px;
        height: 170px;
        background: #fed8c7;
        //   opacity: 0.3;
        border-radius: 50%;
        margin-top: 37px;
        .countNum {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 143px;
          height: 143px;
          background: #fc9263;
          // opacity: 0.8;
          border-radius: 50%;
          line-height: 143px;
          text-align: center;
          span {
            transform: translate(-50%, -50%);
            font-family: Adobe Heiti Std R;
            font-weight: normal;
            color: rgba(255, 255, 255, 1);
            font-size: 32px;
          }
        }
      }

      .descript {
        width: 1100px;
        font-size: 16px;
        font-family: MicrosoftYaHei, 微软雅黑;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        p {
          height: 26px;
          line-height: 26px;
          margin-bottom: 15px;
        }
      }
    }
    .payBox {
      padding-left: 50px;
      .payTitle {
        display: flex;
        align-content: center;
        padding-top: 40px;
        font-size: 20px;
        font-family: MicrosoftYaHei, 微软雅黑;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        padding-left: 50px;

        .payType {
          padding-right: 47px;
        }
        label {
          display: flex;
          justify-content: space-around;
          align-content: center;
          cursor: pointer;
        }
        .radioCircle {
          position: relative;
          display: inline-block;
          width: 21px;
          height: 21px;
          border: 2px solid$color;
          border-radius: 50%;
          margin-right: 11px;
          .innerCircle {
            position: absolute;
            top: 51%;
            left: 51%;
            transform: translate(-50%, -50%);
            display: inline-block;
            width: 10px;
            height: 10px;
            background: $color;
            border-radius: 50%;
          }
        }
      }
    }
    //   价格列表
    .priceList {
      position: relative;
      padding-left: 50px;
      ul {
        width: 680px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        li {
          width: 33.3%;
          padding-top: 55px;
          span {
            display: inline-block;
            width: 140px;
            height: 60px;
            line-height: 60px;
            background: #fff2ec;
            border: 1px solid $color;
            border-radius: 4px;
            font-size: 24px;
            font-family: MicrosoftYaHei, 微软雅黑;
            font-weight: 400;
            color: $color;
            text-align: center;
            cursor: pointer;
          }
        }
      }

      // 支付弹出二维码
      // .mask {
      // width: 100%;
      // height: 100%;
      //   position: absolute;
      //   top: 0;
      //   bottom: 0;
      //   left: 0;
      //   right: 0;
      //   background: #000;
      //   opacity: 0.7;
      //   z-index: 99;
      // }
    }
    //   充值输入
    .chargeInput {
      margin-top: 78px;
      padding-left: 50px;
      .inputVal {
        width: 445px;
        height: 40px;
        border: 1px solid $color;
        border-radius: 8px;
        margin-right: 40px;
        font-size: 16px;
        font-family: MicrosoftYaHei, 微软雅黑;
        font-weight: 400;
        color: #000;
        text-indent: 20px;
      }
      .inputBtn {
        width: 100px;
        height: 48px;
        background: $color;
        border-radius: 4px;
        font-size: 20px;
        font-family: MicrosoftYaHei, 微软雅黑;
        font-weight: 400;
        color: rgba(254, 254, 254, 1);
        cursor: pointer;
      }
    }
  }

  // 遮罩层

  .payImg {
    position: fixed;
    width: 400px;
    height: 200px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
  }

  //积分表格
  .IntegralForm {
    tr {
      th {
        text-align: center;
        width: 200px;
      }
      td {
        text-align: center;
        width: 200px;
      }
    }
  }
}
</style>

   