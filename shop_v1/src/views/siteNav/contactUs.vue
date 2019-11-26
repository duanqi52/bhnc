<template>
  <div class="contactUs">
    <div class="contactUsTitle w">联系我们</div>
    <div class="w">
      <div class="bgImg">
        <img src="../../../static/img/customerService.png" alt />
      </div>
      <!-- <div class="platformIntroduction">
        <p>平台文字介绍 平台文字介绍 平台文字介绍 平台文字介绍 平台文字介绍 平台文字介绍 平台文字介绍 平台文字介绍 平台文字介绍 平台文字介绍 平台文字介绍 平台文字介绍 平台文字介绍 平台文字介绍 平台文字介绍 平台文字介绍 平台文字介绍 平台文字介绍 平台文字介绍 平台文字介绍 平台文字介绍 平台文字介绍 平台文字介绍 平台文字介绍 平台文字介绍 平台文字介绍 平台文字介绍 平台文字介绍 平台文字介绍 平台文字介绍 平台文字介绍 平台文字介绍 平台文字介绍 平台文字介绍 平台文字介绍 平台文字介绍 平台文字介绍 平台文字介绍 平台文字介绍 平台文字介绍 平台文字介绍 平台文字介绍 平台文字介绍 平台文字介绍 平台文字介绍 平台文字介绍 平台文字介绍</p>
      </div>-->

      <div class="linkUs">
        <div
          class="companyBox"
          style="color:#666666;font-size:24px;font-family:Microsoft YaHei;
font-weight:400;padding-bottom:30px;"
        >杭州笔海弄潮网络科技有限公司</div>
        <ul>
          <li>杭州地址：杭州市桐庐县分水镇妙笔路8号妙笔小镇3幢205室</li>
          <li>杭州电话：0571-64316749</li>
          <li>广州地址：广州市海珠区工业大道北1号艺丰大厦806室</li>
          <li>广州电话：020-84339179</li>
          <!-- <li>邮编：516400</li>
          <li>
            邮箱：
            <span style="color:#FC7236">bihainongchao@163.com</span>
          </li>-->
        </ul>
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
.contactUs {
  .contactUsTitle {
    height: 80px;
    line-height: 80px;
    background: rgba(255, 255, 255, 0.48);
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.28);
    padding-left: 35px;
    font-size: 22px;
    font-family: Microsoft YaHei, 微软雅黑;
    font-weight: bold;
    color: rgba(102, 102, 102, 1);
    margin-top: 4px;
    margin-bottom: 12px;
  }
  .bgImg {
    height: 289px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .platformIntroduction {
    padding: 22px 23px 36px 48px;
    font-size: 16px;
    font-family: MicrosoftYaHei, 微软雅黑;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    line-height: 2;
    background-color: #ffffff;
    border-bottom: 2px solid #f0f0f0;
  }
  .linkUs {
    padding: 22px 0 94px 51px;
    background: #ffffff;
    ul {
      li {
        font-size: 20px;
        font-family: Microsoft YaHei, 微软雅黑;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        line-height: 46px;
      }
    }
  }
}
</style>
<style lang="scss">
// 全局样式
</style>