<template>
  <div id="bhncCoupon">
    <div class="header_search">
      <div class="header_search_wei">
        <span>我的卡券</span>
      </div>
    </div>
    <el-tabs
      v-model="activeName"
      @tab-click="handleClick"
      style="margin-left: 50px;margin-bottom: 100px;position: relative;"
    >
    <!-- 可用 -->
      <el-tab-pane label="可用" name="first">
        <!-- <div>
          <ul class="coupon_a">
            <li>
              <div class="money">
                ￥
                <span>200</span>
              </div>
              <p class="money_a">满600元使用</p>
              <p class="money_b">2019.08.01 - 2019.08.31</p>
            </li>
            <li>
              <div class="money">
                ￥
                <span>200</span>
              </div>
              <p class="money_a">满600元使用</p>
              <p class="money_b">2019.08.01 - 2019.08.31</p>
            </li>
            <li>
              <div class="money">
                ￥
                <span>200</span>
              </div>
              <p class="money_a">满600元使用</p>
              <p class="money_b">2019.08.01 - 2019.08.31</p>
            </li>
            <li>
              <div class="money">
                ￥
                <span>200</span>
              </div>
              <p class="money_a">满600元使用</p>
              <p class="money_b">2019.08.01 - 2019.08.31</p>
            </li>
          </ul>
          <ul class="coupon_b">
            <li>
              <div class="money">
                ￥
                <span>200</span>
              </div>
              <p class="money_a">满600元使用</p>
              <p class="money_b">2019.08.01 - 2019.08.31</p>
            </li>
            <li>
              <div class="money">
                ￥
                <span>200</span>
              </div>
              <p class="money_a">满600元使用</p>
              <p class="money_b">2019.08.01 - 2019.08.31</p>
            </li>
            <li>
              <div class="money">
                ￥
                <span>200</span>
              </div>
              <p class="money_a">满600元使用</p>
              <p class="money_b">2019.08.01 - 2019.08.31</p>
            </li>
            <li>
              <div class="money">
                ￥
                <span>200</span>
              </div>
              <p class="money_a">满600元使用</p>
              <p class="money_b">2019.08.01 - 2019.08.31</p>
            </li>
          </ul>
          <ul class="coupon_c">
            <li>
              <div class="money">
                ￥
                <span>200</span>
              </div>
              <p class="money_a">满600元使用</p>
              <p class="money_b">2019.08.01 - 2019.08.31</p>
            </li>
            <li>
              <div class="money">
                ￥
                <span>200</span>
              </div>
              <p class="money_a">满600元使用</p>
              <p class="money_b">2019.08.01 - 2019.08.31</p>
            </li>
            <li>
              <div class="money">
                ￥
                <span>200</span>
              </div>
              <p class="money_a">满600元使用</p>
              <p class="money_b">2019.08.01 - 2019.08.31</p>
            </li>
            <li>
              <div class="money">
                ￥
                <span>200</span>
              </div>
              <p class="money_a">满600元使用</p>
              <p class="money_b">2019.08.01 - 2019.08.31</p>
            </li>
          </ul>
        </div> -->
        <!-- 无卡券样式 -->
        <div class="no_coupon">
            <img src="../../../static/img/coupon_shi.jpg" alt="">
            <p>亲，您还没有可用的卡卷哦~</p>
        </div>
      </el-tab-pane>
      <!-- 失效 -->
      <el-tab-pane label="失效" name="second">

        <div class="no_coupon">
            <img src="../../../static/img/coupon_shi.jpg" alt="">
            <p>亲，您还没有可用的卡卷哦~</p>
        </div>
          <!-- <div>
          <ul class="coupon_ashi">
            <li>
              <div class="money">
                ￥
                <span>200</span>
              </div>
              <p class="money_a">满600元使用</p>
              <p class="money_b">2019.08.01 - 2019.08.31</p>
            </li>
            <li>
              <div class="money">
                ￥
                <span>200</span>
              </div>
              <p class="money_a">满600元使用</p>
              <p class="money_b">2019.08.01 - 2019.08.31</p>
            </li>
            <li>
              <div class="money">
                ￥
                <span>200</span>
              </div>
              <p class="money_a">满600元使用</p>
              <p class="money_b">2019.08.01 - 2019.08.31</p>
            </li>
            <li>
              <div class="money">
                ￥
                <span>200</span>
              </div>
              <p class="money_a">满600元使用</p>
              <p class="money_b">2019.08.01 - 2019.08.31</p>
            </li>
          </ul>
          <ul class="coupon_bshi">
            <li>
              <div class="money">
                ￥
                <span>200</span>
              </div>
              <p class="money_a">满600元使用</p>
              <p class="money_b">2019.08.01 - 2019.08.31</p>
            </li>
            <li>
              <div class="money">
                ￥
                <span>200</span>
              </div>
              <p class="money_a">满600元使用</p>
              <p class="money_b">2019.08.01 - 2019.08.31</p>
            </li>
            <li>
              <div class="money">
                ￥
                <span>200</span>
              </div>
              <p class="money_a">满600元使用</p>
              <p class="money_b">2019.08.01 - 2019.08.31</p>
            </li>
            <li>
              <div class="money">
                ￥
                <span>200</span>
              </div>
              <p class="money_a">满600元使用</p>
              <p class="money_b">2019.08.01 - 2019.08.31</p>
            </li>
          </ul>
          <ul class="coupon_cshi">
            <li>
              <div class="money">
                ￥
                <span>200</span>
              </div>
              <p class="money_a">满600元使用</p>
              <p class="money_b">2019.08.01 - 2019.08.31</p>
            </li>
            <li>
              <div class="money">
                ￥
                <span>200</span>
              </div>
              <p class="money_a">满600元使用</p>
              <p class="money_b">2019.08.01 - 2019.08.31</p>
            </li>
            <li>
              <div class="money">
                ￥
                <span>200</span>
              </div>
              <p class="money_a">满600元使用</p>
              <p class="money_b">2019.08.01 - 2019.08.31</p>
            </li>
            <li>
              <div class="money">
                ￥
                <span>200</span>
              </div>
              <p class="money_a">满600元使用</p>
              <p class="money_b">2019.08.01 - 2019.08.31</p>
            </li>
          </ul> -->
        <!-- </div> -->
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "first"
    };
  },
  components: {},
  methods: {
    handleClick(tab, event) {
    }
  }
};
</script>
<style lang="scss">
#bhncCoupon {
  .el-tabs__item.is-active {
    color: #fc9263;
  }
  .el-tabs__item:hover {
    color: #fc9263;
    cursor: pointer;
  }
  .el-tabs__active-bar {
    background-color: #fc9263;
  }
  .el-tabs__nav-wrap::after {
    background-color: white;
  }
  .el-tabs__content {
    overflow: visible;
    position: relative;
  }
}
</style>
<style lang="scss" scoped>
#bhncCoupon {
  .header_search {
    line-height: 68px;
    height: 68px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.04);
    border-bottom: 1px solid #e8e8e8;
    .header_search_wei {
      display: inline-block;
      span {
        margin-left: 48px;
        font-size: 20px;
        font-family: MicrosoftYaHeiLight;
        font-weight: bold;
        color: rgba(102, 102, 102, 1);
      }
    }
    .warning {
      width: 100px;
      height: 28px;
      background: rgba(252, 146, 99, 1);
      border-radius: 8px;
      font-size: 14px;
      font-family: MicrosoftYaHei,微软雅黑;
      font-weight: 400;
      color: rgba(248, 248, 248, 1);
      margin-right: 20px;
      margin-top: 14px;
      float: right;
    }
  }
  //可用样式
  .coupon_a {
    margin-top: 20px;
    li {
      background: url("../../../static/img/coupon_a.png") no-repeat;
      background-size: 100%;
      height: 132px;
      width: 347px;
      display: inline-block;
      margin: 0 70px;
      margin-top: 10px;
      .money {
        font-size: 18px;
        font-family: FZLTHK--GBK1-0;
        font-weight: 400;
        color: rgba(253, 255, 254, 1);
        display: inline-block;
        width: 270px;
        text-indent: 30px;
        height: 75px;
        margin-top: 5px;
        span {
          font-size: 64px;
          font-family: MyriadPro-Regular;
          font-weight: 400;
          color: rgba(253, 255, 254, 1);
        }
      }
      .money_a {
        font-size: 14px;
        font-family: Adobe Heiti Std R;
        font-weight: normal;
        color: rgba(253, 255, 254, 1);
        display: inline-block;
        width: 250px;
        text-align: right;
      }
      .money_b {
        font-size: 14px;
        font-family: MyriadPro-Regular;
        font-weight: 400;
        color: #fedbd0;
        display: inline-block;
        width: 250px;
        text-align: right;
      }
    }
  }
  .coupon_b {
    margin-top: 20px;
    li {
      background: url("../../../static/img/coupon_b.png") no-repeat;
      background-size: 100%;
      height: 140px;
      width: 347px;
      display: inline-block;
      margin: 0 70px;
      margin-top: 10px;
      .money {
        font-size: 18px;
        font-family: FZLTHK--GBK1-0;
        font-weight: 400;
        color: rgba(253, 255, 254, 1);
        display: inline-block;
        width: 270px;
        text-indent: 30px;
        height: 75px;
        margin-top: 10px;
        span {
          font-size: 64px;
          font-family: MyriadPro-Regular;
          font-weight: 400;
          color: rgba(253, 255, 254, 1);
        }
      }
      .money_a {
        font-size: 14px;
        font-family: Adobe Heiti Std R;
        font-weight: normal;
        color: rgba(253, 255, 254, 1);
        display: inline-block;
        width: 250px;
        text-align: right;
      }
      .money_b {
        font-size: 14px;
        font-family: MyriadPro-Regular;
        font-weight: 400;
        color: #fedbd0;
        display: inline-block;
        width: 250px;
        text-align: right;
      }
    }
  }
  .coupon_c {
    margin-top: 20px;
    li {
      background: url("../../../static/img/coupon_c.png") no-repeat;
      background-size: 100%;
      height: 140px;
      width: 347px;
      display: inline-block;
      margin: 0 70px;
      margin-top: 10px;
      .money {
        font-size: 18px;
        font-family: FZLTHK--GBK1-0;
        font-weight: 400;
        color: rgba(253, 255, 254, 1);
        display: inline-block;
        width: 270px;
        text-indent: 30px;
        height: 75px;
        margin-top: 15px;
        span {
          font-size: 64px;
          font-family: MyriadPro-Regular;
          font-weight: 400;
          color: rgba(253, 255, 254, 1);
        }
      }
      .money_a {
        font-size: 14px;
        font-family: Adobe Heiti Std R;
        font-weight: normal;
        color: rgba(253, 255, 254, 1);
        display: inline-block;
        width: 250px;
        text-align: right;
      }
      .money_b {
        font-size: 14px;
        font-family: MyriadPro-Regular;
        font-weight: 400;
        color: #fedbd0;
        display: inline-block;
        width: 250px;
        text-align: right;
      }
    }
  }

  //失效样式
  .coupon_ashi {
    margin-top: 20px;
    li {
      background: url("../../../static/img/coupon_ashi.png") no-repeat;
      background-size: 100%;
      height: 140px;
      width: 347px;
      display: inline-block;
      margin: 0 70px;
      margin-top: 10px;
      .money {
        font-size: 18px;
        font-family: FZLTHK--GBK1-0;
        font-weight: 400;
        color: rgba(253, 255, 254, 1);
        display: inline-block;
        width: 270px;
        text-indent: 30px;
        height: 75px;
        margin-top: 15px;
        span {
          font-size: 64px;
          font-family: MyriadPro-Regular;
          font-weight: 400;
          color: rgba(253, 255, 254, 1);
        }
      }
      .money_a {
        font-size: 14px;
        font-family: Adobe Heiti Std R;
        font-weight: normal;
        color: rgba(253, 255, 254, 1);
        display: inline-block;
        width: 250px;
        text-align: right;
      }
      .money_b {
        font-size: 14px;
        font-family: MyriadPro-Regular;
        font-weight: 400;
        color: #fedbd0;
        display: inline-block;
        width: 250px;
        text-align: right;
      }
    }
  }
  .coupon_bshi {
    margin-top: 20px;
    li {
      background: url("../../../static/img/coupon_bshi.png") no-repeat;
      background-size: 100%;
      height: 140px;
      width: 347px;
      display: inline-block;
      margin: 0 70px;
      margin-top: 10px;
      .money {
        font-size: 18px;
        font-family: FZLTHK--GBK1-0;
        font-weight: 400;
        color: rgba(253, 255, 254, 1);
        display: inline-block;
        width: 270px;
        text-indent: 30px;
        height: 75px;
        margin-top: 15px;
        span {
          font-size: 64px;
          font-family: MyriadPro-Regular;
          font-weight: 400;
          color: rgba(253, 255, 254, 1);
        }
      }
      .money_a {
        font-size: 14px;
        font-family: Adobe Heiti Std R;
        font-weight: normal;
        color: rgba(253, 255, 254, 1);
        display: inline-block;
        width: 250px;
        text-align: right;
      }
      .money_b {
        font-size: 14px;
        font-family: MyriadPro-Regular;
        font-weight: 400;
        color: #fedbd0;
        display: inline-block;
        width: 250px;
        text-align: right;
      }
    }
  }
  .coupon_cshi {
    margin-top: 20px;
    li {
      background: url("../../../static/img/coupon_cshi.png") no-repeat;
      background-size: 100%;
      height: 140px;
      width: 347px;
      display: inline-block;
      margin: 0 70px;
      margin-top: 10px;
      .money {
        font-size: 18px;
        font-family: FZLTHK--GBK1-0;
        font-weight: 400;
        color: rgba(253, 255, 254, 1);
        display: inline-block;
        width: 270px;
        text-indent: 30px;
        height: 75px;
        margin-top: 15px;
        span {
          font-size: 64px;
          font-family: MyriadPro-Regular;
          font-weight: 400;
          color: rgba(253, 255, 254, 1);
        }
      }
      .money_a {
        font-size: 14px;
        font-family: Adobe Heiti Std R;
        font-weight: normal;
        color: rgba(253, 255, 254, 1);
        display: inline-block;
        width: 250px;
        text-align: right;
      }
      .money_b {
        font-size: 14px;
        font-family: MyriadPro-Regular;
        font-weight: 400;
        color: #fedbd0;
        display: inline-block;
        width: 250px;
        text-align: right;
      }
    }
  }

  //无卡券样式
  .no_coupon{
    display: inline-block;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    margin-top: 100px;
      img{

      }
      p{
        font-size:18px;
        color:rgba(186,186,186,1);
        margin: 20px 0;
      }
  }
}
</style>