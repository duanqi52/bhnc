<template>
  <div id="bhncCreateMarke_a">
    <div class="hade_bg">
      <div class="hade_con">
        <img :src="shops.logo_img" alt />
        <div class="content">
          <h2>{{shops.c_name}}</h2>
          <p class="content_a">{{shops.intro}}</p>
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
      <div class="message_bg">
        <ul>
          <li v-for="(item,index) in shops.goods" :key="index">
            <img :src="item.img[0]" alt />
            <p>
              <span>{{item.title}}</span>
            </p>
          </li>
        </ul>
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
      shopImg: require("../../assets/img/222.png"),
      shops: {},
      //分享弹窗显示
      isShare: false,
      username: "",
      url: "",
      QRCode: "",
      dataURL: ""
    };
  },
  components: {},
  beforeCreate() {},
  created() {
    this.username = this.$route.query.id;
    this.getShare();
    console.log(this.username);
  },
  methods: {
    getShare() {
      this.$http({
        url: `${url.getShare}/${this.username}`,
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
          console.log(res.data);
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    //进入详情页面
    toParticulars(item) {
      this.$router.push({ path: "/particulars_a", query: { id: item.id ,
      udd:this.username} });
    }
  }
};
</script>

<style lang="scss" scoped>
#bhncCreateMarke_a {
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
  .message_bg {
    background: url("../../../static/img/h5_bg_xian.png");
    min-height: 3rem;
    background-size: 100%;
  }
  .message_bg ul {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
  }
  // .message_bg ul li:nth-child(2n) {
  //   position: relative;
  //   top: -0.6rem;
  // }
  .message_bg ul li {
    position: relative;
    margin: 0.2rem 0.3rem;
    display: inline-block;
    box-shadow: 5px 5px 6px 0px rgba(0, 0, 0, 0.1);
  }
  .message_bg ul li img {
    width: 2.8rem;
    height: 2.8rem;
    float: left;
    background-color: white;
  }
  .message_bg ul li p {
    width: 2.8rem;
    height: 0.58rem;
    background: #eef6fd;
    border: 1px solid #eef6fd;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 0.18rem;
    font-family: SourceHanSansCN-Normal;
    font-weight: 400;
    color: #666666;
    text-align: center;
    line-height: 0.58rem;
    clear: left;
  }
  .message_bg ul li p span {
    width: 1.85rem;
    display: inline-block;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
}
</style>