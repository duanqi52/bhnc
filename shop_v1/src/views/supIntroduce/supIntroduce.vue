<template>
  <div>
    <Headers></Headers>
    <div>
      <div class="up_hadebg">
      </div>
      <div class="up_hadebg_a">
        <div class="up_foot">
          <!-- <router-link to="/index">
            <img src="../../../static/img/needNot.png" alt />
          </router-link>
          <img
            src="../../../static/img/upgrade_sup.png"
            alt
            style="margin-left: 100px;"
            @click="toLInk"
          /> -->
          <!-- </router-link> -->
          <div class="immediately" @click="toLInk">
            立即升级为供应商
          </div>
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
// .up_hadebg {
//   background: url("../../../static/img/sup_content.png") no-repeat;
//   background-size: 100% 1360px;
//   height: 1360px;
//   position: relative;
// }
.up_hadebg {
  background: url("../../../static/img/sup_content.png") no-repeat;
  background-size: 100% 650px;
  height: 650px;
  position: relative;
}
.up_hadebg_a {
  background: url("../../../static/img/sup_content_a.png") no-repeat;
  background-size: 100% 1157px;
  height: 1157px;
  position: relative;
}
.index_home {
  height: 115px;
  display: inline-block;
  width: 220px;
  cursor: pointer;
  position: absolute;
  left: 355px;
}
.up_foot {
  position: absolute;
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 50px;
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
.welcome_a {
  p {
    height: 80px;
    line-height: 80px;
    text-indent: 40px;
    font-size: 22px;
    color: rgba(102, 102, 102, 1);
    .wel_a {
      margin-left: 20px;
    }
  }
  .xinxi {
    font-size: 22px;
    color: rgba(102, 102, 102, 1);
    margin-left: 80px;
    line-height: 40px;
  }
}
.purEntry {
  font-size: 22px;
  font-family: Microsoft YaHei, 微软雅黑;
  font-weight: 400;
  color: #666666;
  width: 990px;
  display: inline-block;
  margin-left: 60px;
  margin-top: 35px;
  margin-bottom: 10px;
}
</style>