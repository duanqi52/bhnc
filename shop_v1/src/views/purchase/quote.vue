<!-- 组件说明 -->
<template>
  <div class="quote">
    <p id="purchaseQuote">采购报价</p>
    <div class="quote_all">
      <span>标题:</span>
      <p>{{offer.title}}</p>
    </div>
    <div class="quote_all">
      <span>商品分类:</span>
      <p>{{offer.type}}</p>
    </div>
    <div class="quote_all">
      <span>采购数量:</span>
      <p>{{offer.count}}</p>
    </div>
    <div class="quote_all">
      <span>交货时间:</span>
      <p>{{offer.date}}</p>
    </div>
    <div class="quote_all">
      <span>发布人:</span>
      <p>{{offer.sendMan}}</p>
    </div>
    <div class="quote_all">
      <span>公司:</span>
      <p>{{offer.cName}}</p>
    </div>
    <div class="quote_all">
      <span>联系电话:</span>
      <p>{{offer.phone}}</p>
    </div>
    <div class="quote_all">
      <span>联系地址:</span>
      <p>{{offer.address}}</p>
    </div>
    <div class="quote_all">
      <span>单价:</span>
      <el-input
        placeholder="请输入商品单价，精确到小数点后2位，系统自动计算总价。"
        v-model="offer.price"
        type="number"
        clearable
      ></el-input>
    </div>
    <div class="quote_all">
      <span>总价:</span>
      <p>{{offer.price?offer.price*offer.count:0}}元</p>
    </div>
    <div class="submit">
      <el-button style="margin-right: 100px;" @click="off()">取消</el-button>
      <el-button @click="submitOffer()">提交</el-button>
    </div>
  </div>
</template>

<script>
//import x from ''
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
  components: {},
  data() {
    return {
      input: "",
      offer: {}
    };
  },
  mounted() {
    this.getDetails(this.$route.query.id);
  },
  computed: {},
  methods: {
    getDetails(id) {
      this.$http({
        url: `${url.Purchase_details}/getOffer/${id}/${localStorage.getItem(
          "username"
        )}`,
        // headers:this.headers,
        method: "get"
      }).then(res => {
        if (res.data.code == 20000) {
          this.offer = res.data.data;
        }
      });
    },
    submitOffer() {
      this.offer.totalMoney = this.offer.price * this.offer.count;
      this.$http({
        url: `${url.Purchase_details}/againOffer/${
          this.$route.query.id
        }/${localStorage.getItem("username")}`,
        // headers:this.headers,
        method: "post",
        data: this.offer
      }).then(res => {
        if (res.data.code == 20000) {
          var username = localStorage.getItem("username");
          var password = localStorage.getItem("password");
          var roles = localStorage.getItem("roles");
          var Authorization = localStorage.getItem("Authorization");
          location.href = `${url.supplierUrl}/jump?Authorization=${Authorization}&a=${username}&roles=${roles}&purchase=1`;
        }
      });
    }
  }
};
</script>

<style lang='scss' scoped>
.quote {
  width: 100%;
  text-align: center;
  #purchaseQuote {
    margin: 45px;
    font-size: 20px;
    font-weight: bold;
  }
  .quote_all {
    margin-bottom: 30px;
    span {
      width: 5%;
      display: inline-block;
      text-align: right;
    }
    .el-input {
      width: 60%;
    }
    p {
      width: 60%;
      display: inline-block;
      text-align: left;
    }
  }
}
.submit {
  margin: 50px;
}
</style>