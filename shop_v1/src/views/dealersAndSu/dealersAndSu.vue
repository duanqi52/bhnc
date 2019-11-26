<template>
  <div class="dealer">
    <!-- <div class="advertising">广告</div>
            <div class="advertising_a">
                <div class="member">
                    <p>尊敬的会员，是否注册成为我们的经销商或供应商会员呢，注册成功，将享受平台上共享信息，快点来注册吧！！</p>
                    <div class="member_a">
                        <span v-bind:class="{ 'active': isActive }" @click="chIntegral();$router.push('/submitData')">注册经销商/供应商</span>
                    </div>
                    <div class="member_b">
                        <span v-bind:class="{ 'active': isActives }" @click="chIntegrals();$router.push('/register')">注册普通用户</span>
                    </div>
                    <div class="submit_zi">
                        <button class="submit_zi_a" @click="$router.push('/index')">取消</button>
                    </div>
                </div>
    </div>-->
    <!-- 头部公共组件 -->
    <Headers></Headers>
    <div class="supeiler">
      <div class="applyBox">
        <router-link class="supplier" to="/submitData"></router-link>
        <router-link class="normalUser" to="/register"></router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Headers from "@/components/headers";

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
      isActive: false,
      isActives: false
    };
  },
  components: {
    Headers
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.w {
}
.dealer {
  background-image: url("../../../static/img/register_bg.png");
}
.supeiler {
  width: 1200px;
  margin: auto;
  height: 940px;
  padding-top: 113px;
  padding-left: 341px;
  .applyBox {
    width: 626px;
    height: 490px;
    position: relative;
    background-image: url("../../../static/img/application@2x.png");
    .supplier {
      position: absolute;
      top: 241px;
      left: 122px;
      width: 300px;
      height: 100px;
      cursor: pointer;
      // background-color: aquamarine;
    }
    .normalUser {
      position: absolute;
      bottom: 0;
      left: 200px;
      width: 225px;
      height: 57px;
      cursor: pointer;
      // background-color: aquamarine
    }
  }
}

// .active{
//     background-color: #FFCC22;
//     color: white!important;
// }
// .advertising{
//     height:150px;
//     background:rgba(61,60,60,1);
//     color: white;
// }
// .advertising_a{
//     width: 1200px;
//     margin: 0 auto;
// }
// .member{
//     height: 677px;
//     p{
//         width:648px;
//         font-size:18px;
//         font-family:MicrosoftYaHei,微软雅黑-Bold;
//         font-weight:bold;
//         color:rgba(51,51,51,1);
//         margin: 0 auto;
//         margin-top: 100px;
//     }
//     .member_a{
//         text-align: center;
//         margin-top: 80px;
//         span{
//             width:300px;
//             height:44px;
//             border:1px solid rgba(204,204,204,1);
//             border-radius:4px;
//             display: inline-block;
//             line-height: 44px;
//             font-size:18px;
//             font-family:MicrosoftYaHei,微软雅黑-Bold;
//             font-weight:bold;
//             color:rgba(102,102,102,1);
//             cursor:pointer;
//         }
//     }
//     .member_b{
//         text-align: center;
//         margin-top: 50px;
//         span{
//             width:300px;
//             height:44px;
//             border:1px solid rgba(204,204,204,1);
//             border-radius:4px;
//             display: inline-block;
//             line-height: 44px;
//             font-size:18px;
//             font-family:MicrosoftYaHei,微软雅黑-Bold;
//             font-weight:bold;
//             color:rgba(102,102,102,1);
//             cursor:pointer;
//         }
//     }
// }
// .submit_zi{
//     text-align: center;
//     margin-top: 60px;
//     .submit_zi_a{
//         width:112px;
//         height:44px;
//         line-height: 44px;
//         background:rgba(255,255,255,1);
//         border:1px solid rgba(153,153,153,1);
//         border-radius:4px;
//         font-size:18px;
//         font-family:MicrosoftYaHei,微软雅黑;
//         font-weight:400;
//         color:rgba(102,102,102,1);
//         margin-right: 25px;
//     }
//     .submit_zi_b{
//         width:160px;
//         height:44px;
//         line-height: 44px;
//         background:rgba(33,130,228,1);
//         border-radius:4px;
//         font-size:18px;
//         font-family:MicrosoftYaHei,微软雅黑;
//         font-weight:400;
//         color:rgba(255,255,255,1);
//     }
// }
</style>