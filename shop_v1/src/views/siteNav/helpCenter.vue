<template>
  <div class="helpCenter">
    <div class="helpCenterTitle w">帮助中心</div>
    <div class="helpCenterContent w clearfix" style>
      <div class="helpCenterContentLeft fl" style="position:fixed;">
        <ul>
          <li
            v-for="(item,index) in questionList"
            :key="index"
            :style="{color:styleClass==index?'#D21D27':''}"
            @click="handleStyle(index)"
            class="lis"
          >
            <a :href="'#'+item.id" style="color:inherit">{{item.parentTitle}}</a>
          </li>
        </ul>
      </div>
      <div class="helpCenterContentRight fr">
        <ul>
          <li v-for="(item,index) in questionList" :key="index" :id="item.id">
            <!-- <h4>{{item.parentTitle}}</h4> -->
            <!-- <li v-for="(subItem,subIndex) in item.subList" :key="subIndex"> -->
            <!-- <h5>{{subIndex+1}}、 {{subItem.subTitle}}</h5>
            <p>{{subItem.subContent}}</p>-->
            <img :src="item.subList" alt style="width:100%;" />
            <!-- </li> -->
          </li>
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
    return {
      styleClass: 0,
      //   questionList: ["常用问题", "登录注册", "采购商用户", "供应商用户"],
      questionList: [
        {
          parentTitle: "常见问题",
          id: "commonQuestion",
          subList: "./static/img/changjianwenti.png"
        },
        {
          parentTitle: "登录注册",
          id: "loginAndRegister",
          subList: "./static/img/dengluzhuce.png"
        },
        {
          parentTitle: "采购商用户",
          id: "caigoushangid",
          subList: "./static/img/caigoushangyonghu.png"
        },
        {
          parentTitle: "供应商用户",
          id: "gongyingshangid",
          subList: "./static/img/gongyingshangyonghu.png"
        }
      ]
    };
  },
  methods: {
    handleStyle(index) {
      this.styleClass = index;
    }
  },
  // 组件
  components: {},

  created() {},
  mounted() {
    var lis = document.querySelectorAll(".lis");

    window.addEventListener("scroll", () => {
      var commonQuestion = document.getElementById("commonQuestion").offsetTop;
      var loginAndRegister = document.getElementById("loginAndRegister")
        .offsetTop;
      var caigoushangid = document.getElementById("caigoushangid").offsetTop;
      var gongyingshangid = document.getElementById("gongyingshangid")
        .offsetTop;
      var windowTop =
        document.documentElement.scrollTop + 35 || document.body.scrollTop + 35;
      for (var i = 0; i < lis.length; i++) {
        if (windowTop < loginAndRegister) {
          lis[i].style.color = "";
          lis[0].style.color = "#D21D27";
        } else if (windowTop < caigoushangid) {
          lis[i].style.color = "";
          lis[1].style.color = "#D21D27";
        } else if (windowTop < gongyingshangid) {
          lis[i].style.color = "";
          lis[2].style.color = "#D21D27";
        } else {
          lis[i].style.color = "";
          lis[3].style.color = "#D21D27";
        }
      }
    });
  },

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
.helpCenter {
  .helpCenterTitle {
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
  .helpCenterContent {
    background: rgba(255, 255, 255, 0.48);
    box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.14);
    padding: 26px 64px 90px 26px;
    .helpCenterContentLeft {
      width: 120px;
      background: rgba(248, 248, 248, 1);
      border: 1px solid rgba(224, 224, 224, 1);
      border-radius: 4px;
      padding-top: 20px;
      margin-right: 20px;
      ul {
        li {
          width: 120px;
          margin-bottom: 22px;
          padding-left: 12px;
          cursor: pointer;
        }
      }
    }
    .helpCenterContentRight {
      width: 950px;
      background: rgba(248, 248, 248, 1);
      border: 1px solid rgba(224, 224, 224, 1);
      border-radius: 4px;
      padding-bottom: 200px;
      font-family: MicrosoftYaHei, 微软雅黑;
      font-size: 16px;

      h4 {
        text-align: center;
        padding-bottom: 16px;
        font-size: 24px;
        font-family: Microsoft YaHei, 微软雅黑;
        font-weight: 400;
        color: #666;
        border-bottom: 1px solid #ececec;
        margin-bottom: 36px;
      }
      h5 {
        padding-bottom: 40px;
        color: #d21d27;
        font-size: 16px;
      }
      p {
        padding-bottom: 40px;
        line-height: 1.8;
        color: #666;
      }
    }
  }
}
</style>
<style lang="scss">
// 全局样式
</style>