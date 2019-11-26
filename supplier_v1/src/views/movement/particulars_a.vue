<template>
  <div id="bhncParticulars_a">
    <div class="hade_bg">
      <div class="hade_con">
        <img :src="shops.logo_img" alt />
        <div class="content">
          <h2>{{shops.c_name}}</h2>
          <p
            class="content_a"
          >{{shops.intro}}</p>
          <p class="content_b">
            <span>联系人：{{shops.linkman}}</span>&nbsp;&nbsp;&nbsp;
            <span>移动电话：{{shops.phone}}</span>
          </p>
          <p class="content_c">联系地址：{{shops.address}}</p>
        </div>
      </div>
      <img src="../../../static/img/directory.png" alt class="pen_log" />
    </div>
    <div class="message">
      <div class="message_hade">
        <span>商品展示</span>
      </div>
      <div class="message_tuwen">
        <div>
          <img :src="goods.img" alt />
          <div v-html="goods.introduce" class="goodsimgs">

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
window.onload = function() {
  /*720代表设计师给的设计稿的宽度，你的设计稿是多少，就写多少;100代表换算比例，这里写100是
      为了以后好算,比如，你测量的一个宽度是100px,就可以写为1rem,以及1px=0.01rem等等*/
  getRem(720, 100);
};
window.onresize = function() {
  getRem(720, 100);
};
function getRem(pwidth, prem) {
  var html = document.getElementsByTagName("html")[0];
  var oWidth =
    document.body.clientWidth || document.documentElement.clientWidth;
  html.style.fontSize = (oWidth / pwidth) * prem + "px";
}
import url from "../../serverAPI.config.js";
export default {
  data() {
    return {
      shops: {},
      goods: {},
    };
  },
  components: {},
  created(){
    this.getGoods();
    this.getShare();
  },
  methods: {
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
      var id=this.$route.query.id;
      var username = this.$route.query.udd;
      this.$http({
        // url: `${url.Goods}/${id}/${username}`,
        url:`http://192.168.0.108:9009/goods/${id}/a13433157147`,
        method: "get",
         headers: {
          Authorization: localStorage.getItem("Authorization")
        }
      }).then(res => {
        if (res.data.code == 20000) {
          var data = res.data.data;
          data.img=JSON.parse(data.img);
          this.goods=data;
          this.goods.img=this.goods.img[0]
          
        }
      });
    },
  }
};
</script>

<style lang="scss" scoped>
#bhncParticulars_a {
  .hade_bg {
    background: url("../../../static/img/h5_bg.png") no-repeat;
    height: 3.4rem;
    background-size: 100%;
    position: relative;
  }
  .hade_con {
    padding: 0.6rem 0.3rem 0 0.3rem;
  }
  .hade_con img {
    width: 1.6rem;
    height: 1.6rem;
    float: left;
  }
  .hade_con .content {
    width: 70%;
    overflow: hidden;
    display: inline-block;
    margin-left: 0.3rem;
  }
  .hade_con .content .content_a {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    overflow: hidden;
    margin: 0.15rem 0;
  }
  .hade_con .content .content_b {
    margin-bottom: 0.08rem;
  }
  .hade_con .content .content_c {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  .hade_con .content h2 {
    font-size: 0.26rem;
    font-weight: 400;
    color: #666666;
  }
  .hade_con .content p {
    font-size: 0.16rem;
    color: #666666;
  }
  .pen_log {
    position: absolute;
    width: 1rem;
    height: 0.8rem;
    bottom: -0.4rem;
    left: 0.2rem;
  }
  .message {
    padding: 0 0.2rem;
    padding-top: 0.3rem;
  }
  .message .message_hade {
    position: relative;
    line-height: 0;
    height: 0.5rem;
    text-indent: 0.6rem;
  }
  .message .message_hade span::before {
    content: "";
    position: absolute;
    top: 0.25rem;
    left: 0;
    width: 0.5rem;
    height: 0.02rem;
    background: #eef6fd;
  }
  .message .message_hade span::after {
    content: "";
    position: absolute;
    top: 0.25rem;
    right: 0;
    width: 5.1rem;
    height: 0.02rem;
    background: #eef6fd;
  }
  .message .message_hade span {
    font-size: 0.2rem;
    font-family: SourceHanSansCN-Normal;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
  }
  .message_tuwen {
    width: 5.4rem;
    margin: 0.2rem auto;
  }
  .message_tuwen img {
    width: 5.3rem;
    height: 4.8rem;
  }
  .message_tuwen p {
    font-size: 0.16px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
  }
}
</style>
<style>
.goodsimgs p{
      font-size: 0.16rem;
  }
.goodsimgs p img{
      display: none!important;
  }
</style>