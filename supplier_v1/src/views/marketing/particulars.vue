<!-- 组件说明 -->
<template>
  <div id="bhncParticulars">
    <div class="create-marke">
      <div class="create-box">
        <div class="xia_bor">
          <div class="create_bg">
            <div class="company-name">
              <img :src="shops.logo_img" alt />
              <p>{{shops.c_name}}</p>
            </div>
            <div class="company-linkman">
              <p style="margin-bottom: 20px;min-height: 90px;">{{shops.intro}}</p>
              <p>
                <span>联系人：{{shops.linkman}}</span>
                <span style="margin-left: 50px;">移动电话： {{shops.phone}}</span>
              </p>
              <p>联系地址：{{shops.address}}</p>
            </div>
            <img src="../../../static/img/directory.png" alt class="create_logo" />
          </div>
        </div>

        <div class="image-text">
          <div>
            <img :src="goods.img" alt />
            <div v-html="goods.introduce" class="goodsimg"></div>
          </div>
        </div>
        <div class="btn-box">
          <el-button type="warning" @click="$router.back(-1)">返回</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import x from ''
import url from "../../serverAPI.config.js";
export default {
  components: {},
  data() {
    return {
      shopImg: require("../../assets/img/222.png"),
      shops: {},
      goods: {}
    };
  },
  computed: {},
  mounted() {
    document
      .querySelector("body")
      .setAttribute("style", "background-color:#F2F2F2");
  },
  beforeDestroy() {
    document.querySelector("body").removeAttribute("style");
  },
  created() {
    this.getGoods();
    this.getShare();
  },
  methods: {
    getMarketingTool() {
      this.$http
        .get(`${url.getMarketingTool}/${localStorage.getItem("username") || localStorage.getItem("siteName")}`)
        .then(res => {
          if (res.data.code == 20000) {
            if (res.data.data) {
              this.marketingTool = res.data.data;
              this.marketingTool.goods.map(item => {
                item.img = JSON.parse(item.img);
              });
            }
          }
        });
    },
    getShare() {
      var username = this.$route.query.udd;
      this.$http({
        url: `${url.getShare}/${username}`,
        // url: 'http://172.16.0.138:9008/share/'+this.username,
        method: "get",
        headers: {
          Authorization: localStorage.getItem("Authorization")
        }
      }).then(res => {
        if (res.data.code == 20000) {
          this.shops = res.data.data;
          this.shops.goods.map(item => {
            item.img = JSON.parse(item.img);
          });      
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    //获取商品的详细信息
    getGoods() {
      var id = this.$route.query.id;
      var username = this.$route.query.udd;
      this.$http({
        url: `${url.Goods}/${id}/${username}`,
        method: "get",
          headers: {
          Authorization: localStorage.getItem("Authorization")
        }
      }).then(res => {
        if (res.data.code == 20000) {
          var data = res.data.data;
          console.log(data);
          data.img = JSON.parse(data.img);
          this.goods = data;
          this.goods.img = this.goods.img[0];
        }
      });
    }
  }
};
</script>

<style lang='scss' scoped>
#bhncParticulars {
  //@import url()
  .create-box {
    width: 1200px;
    margin: 0 auto;
    background-color: white;
    .company-name {
      text-align: center;
      display: inline-block;
      height: 172px;
      width: 48%;
      border-right: 1px dotted;
      padding-top: 10px;
      img {
        width: 117px;
        height: 109px;
      }
      p {
        font-size: 24px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        margin-top: 15px;
      }
    }
    .company-linkman {
      width: 40%;
      margin-left: 50px;
      p {
        font-size: 16px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        margin-bottom: 5px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 4;
        overflow: hidden;
      }
      span {
      }
    }
    .company-introduce {
      text-indent: 2em;
      margin: 20px 0;
    }
    .shop-box {
      display: flex;
      flex-wrap: wrap;
      .shop-item {
        position: relative;
        margin: 20px 30px;
        display: inline-block;
        box-shadow: 5px 5px 6px 0px rgba(0, 0, 0, 0.1);
      }
      img {
        width: 240px;
        height: 240px;
      }
      p {
        width: 240px;
        height: 58px;
        background: rgba(238, 246, 253, 1);
        border: 1px solid rgba(238, 246, 253, 1);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 18px;
        font-family: SourceHanSansCN-Normal;
        font-weight: 400;
        color: #666666;
        text-align: center;
        line-height: 58px;
        span {
          width: 185px;
          display: inline-block;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
      }
    }
    .btn-box {
      text-align: center;
      margin-top: 20px;
      padding-bottom: 20px;
      button {
        width: 200px;
      }
    }
  }
  .create_bg {
    background: url("../../../static/img/directory_bg.png") no-repeat center;
    height: 263px;
    width: 1105px;
    margin: 0 auto;
    background-size: 100%;
    display: flex;
    align-items: center;
    position: relative;
    i {
      display: inline-block;
      font-size: 28px;
      color: #3d91e7;
      position: absolute;
      right: 37px;
      bottom: 35px;
      cursor: pointer;
    }
    .create_logo {
      width: 112px;
      height: 74px;
      display: inline-block;
      position: absolute;
      bottom: -30px;
      left: -10px;
    }
  }
  .xia_bor {
    border-bottom: 3px solid #ededed;
  }
  .image-text {
    margin: 0 auto;
    width: 800px;
    img {
      width: 800px;
      max-height: 800px;
      margin-top: 50px;
    }
    p {
      margin-top: 10px;
    }
  }
}
</style>
<style>
.goodsimg p{
      font-size: 16px;
  }
.goodsimg p img{
      display: none!important;
  }
</style>