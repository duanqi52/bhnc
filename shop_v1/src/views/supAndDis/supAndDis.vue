<template>
  <div>
    <Headers></Headers>
    <div style="background: #F2F2F2;padding: 25px 0;">
      <div class="up_hadebg">
        <div class="welcome">
        </div>
        <div class="welcome_a">
          
          <!-- <p>
            <span style="color:#D9454D;font-size: 45px;position: absolute;left: -10px;">•</span>
            <span class="wel_a">欢迎成为笔海弄潮供应商会员，我们将为您提供以下服务：</span>
          </p>
          <div class="xinxi">
            1、发布企业联系信息和产品信息，提供给采购商查询；
            <br />2、上传库存产品数量，进行库存管理，同时提供给采购商查询；
            <br />3、智能编辑自定义的企业产品报价单链接，分享给目标客户；
            <br />4、管理会员所有合作客户信息和非合作客户信息，即时更新；
            <br />5、订单跟单管理服务；
            <br />6、面向平台内所有采购商客户精准推送营销信息；
          </div> -->
        </div>
        <div class="welcome_b">
          <!-- <p>
            <span style="color:#D9454D;font-size: 45px;position: absolute;left: -10px;">•</span>
            <span class="wel_a">欢迎成为笔海弄潮平台采购商会员，我们将为您提供以下服务：</span>
          </p>
          <div class="xinxi">
            1、找笔服务，即查询平台所有产品信息，获取对应产品的供应商信息；
            <br />2、智能编辑自定义的企业产品报价单链接，分享给目标客户；
            <br />3、管理会员所有合作供应商信息和非合作供应商信息，即时更新；
            <br />4、订单跟单管理服务；
            <br />5、面向平台所有供应商精准推送采购信息
            <br />
          </div> -->
        </div>
        <div class="up_foot">
          <!-- <router-link to="/index">
            <div class="immediately_a" @click="toLInk_a">
            不了，谢谢！
            </div>
          </router-link> -->
          <!-- <router-link to="/submitDataSupplier" > -->
          <div class="immediately" @click="toLInk" style="margin-right: 50px;">
            立即升级为供应商
          </div>
          <!-- <img
            src="../../../static/img/upgrade_sup.png"
            alt
            style="margin-left: 100px;"
            @click="toLInk"
          /> -->
          <!-- </router-link> -->
          <!-- <router-link to="/submitDisData" > -->
          <div class="immediately" @click="toLInk_a" style="margin-left: 50px;">
            立即升级为采购商
          </div>
          <div>
            
          </div>
          <!-- <img
            src="../../../static/img/upgrade_dis.png"
            alt
            style="margin-left: 100px;"
            @click="toLInk_a"
          /> -->
          <!-- </router-link> -->
        </div>
      </div>
    </div>
    <Footers style="margin-top: 0px;"></Footers>
  </div>
</template>

<script>
import Headers from "../../components/headers";
import Footers from "../../components/footers";
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
      purchaseList: [] //全部列表
    };
  },
  components: {
    Headers,
    Footers
  },
  methods: {
    toLInk_a() {
      if (!localStorage.getItem("username")) {
        this.$message({
          message: "您还未登录，请登录！",
          type: "warning"
        });
        this.$router.push("/login");
        return;
      }
      if (
        localStorage.getItem("username") &&
        localStorage.getItem("roles").indexOf("dealer") == -1
      ) {
        this.$router.push("/submitDisData");
      } else {
        if (
          document.getElementsByClassName("el-message el-message--error")
            .length == 0
        )
          this.$message.error("你已经是采购商或资料正在审核中,无需再重新申请");
      }
    },
    toLInk() {
      if (!localStorage.getItem("username")) {
        this.$message({
          message: "您还未登录，请登录！",
          type: "warning"
        });
        this.$router.push("/login");
      }
      if (
        localStorage.getItem("username") &&
        localStorage.getItem("roles").indexOf("provider") == -1
      ) {
        this.$router.push("/submitDataSupplier");
      } else {
        if (
          document.getElementsByClassName("el-message el-message--error")
            .length == 0
        )
          this.$message.error("你已经是供应商或资料正在审核中,无需再重新申请");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.up_hadebg {
  position: relative;
  margin: 0px auto;
}
.up_foot {
  position: absolute;
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 35px;
  .immediately_a{
    cursor: pointer;
    display: inline-block;
    background: url("../../../static/img/immediately_bu.png") no-repeat;
    background-size: cover;
    height: 64px;
    line-height: 64px;
    width: 248px;
    font-size: 30px;
    color: white;
  }
  .immediately{
    cursor: pointer;
    display: inline-block;
    background: url("../../../static/img/immediately_li.png") no-repeat;
    background-size: cover;
    height: 64px;
    line-height: 64px;
    width: 370px;
    font-size: 30px;
    color: white;
  }
}
.welcome {
  background: url("../../../static/img/welc.png") no-repeat;
  background-size: 100% 449px;
  height: 449px;
  position: relative;
}
.welcome_a {
  background: url("../../../static/img/welc_sup.png") no-repeat;
  background-size: 100% 1193px;
  height: 1193px;
  position: relative;
}
.welcome_b {
  background: url("../../../static/img/welc_dis.png") no-repeat;
  background-size: 100% 1324px;
  height: 1324px;
  position: relative;
}
</style>