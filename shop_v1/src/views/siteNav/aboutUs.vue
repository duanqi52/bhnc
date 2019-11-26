<template>
  <div class="aboutUsPage" style="overflow: hidden;">
    <div class="siteNavTitle w">关于我们</div>
    <div class="siteNavContent w">
      <div class="contentOne clearfix">
        <div class="contentOneLeft fl">
          <!-- <p>
            笔海弄潮平台定位为中国制笔行业产业互联网，是为了推动中国制笔行业企业上云和智慧化管理、智慧化营销而建立的行业互联网平台。
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2019年5月，笔海弄潮创业团队开始成立，2019年9月21日正式上线。1.0版本的定位为连接中国制笔行业采购商和供应商的数字化智慧平台。主要为采购商提供找笔服务、供应商档案建设服务、智能产品营销PPT服务、跟单管理服务、虚拟仓库服务；为供应商提供产品推广服务、客户档案建设服务、智能产品营销PPT服务，在线仓储服务、跟单管理服务等。
          </p> -->
          <h4 style="font-size: 25px;">公司简介</h4>
          <p>
           杭州笔海弄潮网络科技有限公司成立于2019年07月08日，座落于浙江省杭州市桐庐县分水镇妙笔路8号妙笔小镇。杭州笔海弄潮网络科技有限公司致力于帮助中国制笔行业进行电子商务和智能化营销管理、采购管理乃至整个企业管理的全案咨询与数字智慧化建设。
          </p>
        </div>
        <div class="contentOneRight fr">
          <img src="../../../static/img/aboutUs1.png" alt />
        </div>
      </div>
      <div class="contentThree clearfix">
        <div class="contentThreeLeft fl">
          <img src="../../../static/img/aboutUs2.png" alt />
        </div>
        <div class="contentThreeRight fl" style="margin-left:20px;">
          <!-- <p>笔海弄潮在上线之初，导入了创始股东原广州市惠多广告有限公司名下1000多家制笔企业的供应商数据（包括但不限于供应商联系方式、产品信息等），凭借其先进的产品搜索功能赢得了制笔行业广大中间商采购商的喜爱，会员发展非常迅猛，可以预见，在很快的将来，笔海弄潮平台将服务到整个制笔行业所有的采购商和供应商</p> -->
          <h4 style="font-size: 25px;">平台简介</h4>
          <p>笔海弄潮于2019年8月正式上线，由杭州笔海弄潮网络科技有限公司自主研发。</p>
          <p>笔海弄潮的定位是中国制笔行业企业上云综合服务（智慧化管理+智慧化营销）平台，宣传语是让笔的销售和采购更智能。</p>
          <p>笔海弄潮的主要版块有：品牌大厅、现货大厅、求购信息、供应信息、网站客服等。</p>
        </div>
      </div>
      <div style="font-size: 22px;font-family: Microsoft YaHei, 微软雅黑;font-weight: 400;color: #666;padding-bottom: 60px;">
        <h4 style="font-size: 25px;color: #2c3e50;">主要业务</h4>
          笔海弄潮为中国制笔行业<span style="color: #2c3e50;font-weight: bold;">供应商</span>提供以下主要服务：<br>
          1、快速找笔服务；<br>
          2、生成产品营销目录；<br>
          3、已合作供应商档案管理；<br>
          4、潜在供应商开发。<br>
          笔海弄潮为中国制笔行业<span style="color: #2c3e50;font-weight: bold;">采购商</span>提供以下主要服务：<br>
          1、发布企业产品；<br>
          2、生成产品营销目录；<br>
          3、合作客户档案管理；<br>
          4、潜在客户开发；<br>
          5、精准营销；<br>
          6、仓库进销存管理。<br>
          <h5 style="font-size: 25px;color: #2c3e50;padding-top: 30px;">现阶段服务内容：</h5>
          笔海弄潮目前阶段服务内容有：<br>
          1.通过线上线下结合的模式为<span style="color: #2c3e50;font-weight: bold;">采购商</span>免费找笔服务：<br>
          线上智能找笔：上传拍摄照片或搜索品类可查找笔款；<br>
          线下人工找笔：客户提供信息后有线下团队寻找笔款。<br>
          2.为<span style="color: #2c3e50;font-weight: bold;">供应商</span>提供服务：<br>
          为已入驻平台的1000多家供应商资源和每日新入驻的供应商免费提供产品上传、平台咨询和订单获取服务。

        </div>
    </div>
  </div>
</template>
<script>
import url from "@/serverAPI.config.js";

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
  // 数据
  data() {
    return {};
  },
  methods: {},
  // 组件
  components: {},

  created() {},
  mounted() {},
  updated() {}
};
</script>

<style lang="scss" scope>
// 域样式
.w {
  width: 1200px;
  margin: auto;
}
.fl {
  float: left;
}
.fr {
  float: right;
}
.aboutUsPage {
  .siteNavTitle {
    height: 80px;
    line-height: 80px;
    padding-left: 35px;
    background: rgba(255, 255, 255, 0.48);
    box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.28);
    margin-top: 4px;
    margin-bottom: 12px;
    font-size: 22px;
    font-family: Microsoft YaHei, 微软雅黑;
    font-weight: bold;
    color: rgba(102, 102, 102, 1);
  }
  .siteNavContent {
    padding: 0 20px;
    padding-top: 38px;
    background-color: #f8f8f8;
    box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.14);
    p {
      font-size: 22px;
      font-family: Microsoft YaHei, 微软雅黑;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      line-height: 1.6;
    }
    .contentOne {
      .contentOneLeft {
        width: 60%;
      }
    }
    .contentThree {
      padding-bottom: 16px;
      .contentThreeRight {
        width: 70%;
      }
    }
  }
}
</style>
<style lang="scss">
// 全局样式
</style>