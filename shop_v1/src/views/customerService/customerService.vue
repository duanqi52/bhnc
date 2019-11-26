<template>
  <div class="serviecePage">
    <div class="contactUsTitle w">网站客服</div>
    <div class="w">
      <div class="bgImg">
        <img src="../../../static/img/kefuzhongxin.png" alt />
      </div>
      <!-- <div class="platformIntroduction">
        <p>平台文字介绍 平台文字介绍 平台文字介绍 平台文字介绍 平台文字介绍 平台文字介绍 平台文字介绍 平台文字介绍 平台文字介绍 平台文字介绍 平台文字介绍 平台文字介绍 平台文字介绍 平台文字介绍 平台文字介绍 平台文字介绍 平台文字介绍 平台文字介绍 平台文字介绍 平台文字介绍 平台文字介绍 平台文字介绍 平台文字介绍 平台文字介绍 平台文字介绍 平台文字介绍 平台文字介绍 平台文字介绍 平台文字介绍 平台文字介绍 平台文字介绍 平台文字介绍 平台文字介绍 平台文字介绍 平台文字介绍 平台文字介绍 平台文字介绍 平台文字介绍 平台文字介绍 平台文字介绍 平台文字介绍 平台文字介绍 平台文字介绍 平台文字介绍 平台文字介绍 平台文字介绍 平台文字介绍</p>
      </div>-->

      <div class="linkUs">
        <h4
          style="height:85px;line-height:85px;padding-left:40px;font-size:20px;font-family:Microsoft YaHei;font-weight:400;color:rgba(102,102,102,1);border-bottom:2px solid #F0F0F0;"
        >笔海弄潮平台的平台用户分为三类：普通用户、采购商用户、供应商用户</h4>
        <div
          class="wenxintishi"
          style="padding:23px  0  32px 40px; border-bottom: 2px solid #f0f0f0;"
        >
          <p
            style="font-size:16px;padding-bottom:28px;font-family:Microsoft YaHei;font-weight:400;color:rgba(153,153,153,1);"
          >我们为用户提供5*8小时服务，服务时间如下：</p>
          <p
            style="padding-bottom:20px;font-size:18px;font-family:Microsoft YaHei;font-weight:400;color:rgba(102,102,102,1);"
          >工作日：周一到周五；</p>
          <p style="padding-bottom:20px;font-size:18px;font-family:Microsoft YaHei;font-weight:400;color:rgba(102,102,102,1);">工作时间：AM 09：00—PM 17：00</p>
        </div>
        <div style="padding:23px 0 78px 40px; border-bottom: 2px solid #f0f0f0;">
          <p
            style="padding-bottom:28px;;font-size:16px;font-family:Microsoft YaHeifont-weight:400;color:rgba(153,153,153,1);"
          >供应商客服</p>
          <ul>
            <li>钟先生：18057148952</li>
            <li>吴小姐：18072846350</li>
            <li>王小姐：18058447281</li>
          </ul>
        </div>
        <div style="padding:23px 0 78px 40px;">
          <p
            style="padding-bottom:28px;;font-size:16px;font-family:Microsoft YaHeifont-weight:400;color:rgba(153,153,153,1);"
          >采购商客服</p>
          <ul>
            <li>陈先生：18028081628</li>
            <li>郑先生：13588742536</li>
            <li>王小姐：13396587942</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import url from "@/serverAPI.config.js";

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
.serviecePage {
  .contactUsTitle {
    height: 80px;
    line-height: 80px;
    background: rgba(255, 255, 255, 0.48);
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.28);
    padding-left: 35px;
    font-size: 22px;
    font-family: Microsoft YaHei,微软雅黑;
    font-weight: bold;
    color: rgba(102, 102, 102, 1);
    margin-top: 4px;
    margin-bottom: 12px;
  }
  .bgImg {
    height: 450px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .platformIntroduction {
    padding: 22px 23px 36px 48px;
    font-size: 16px;
    font-family: MicrosoftYaHei,微软雅黑;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    line-height: 2;
    background-color: #ffffff;
    border-bottom: 2px solid #f0f0f0;
  }
  .linkUs {
    // padding: 22px 0 94px 51px;
    background: #ffffff;
    ul {
      li {
        font-size: 18px;
        font-family: Microsoft YaHei,微软雅黑;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        line-height: 37px;
      }
    }
  }
}
</style>
<style lang="scss">
// 全局样式
</style>
