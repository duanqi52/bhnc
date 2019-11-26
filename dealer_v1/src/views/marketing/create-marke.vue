<!-- 组件说明 -->
<template>
  <div id="bhncCreate-marke">
    <div class="create-marke">
      <div class="create-box">
        <div class="create_bg">
          <div class="company-name">
            <img  :src="shops.logo_img" alt />
            <p>{{shops.c_name}}</p>
          </div>
          <div class="company-linkman">
            <p style="margin-bottom: 20px;min-height: 88px;">{{shops.intro}}</p>
            <p>
              <span>联系人：{{shops.linkman}}</span>

              <span style="margin-left: 50px;">移动电话： {{shops.phone}}</span>
            </p>
            <p>联系地址：{{shops.address}}</p>
          </div>
          <i class="iconfont icon-zhuanfa" @click.stop="handleShare"></i>
          <img src="../../../static/img/directory.png" alt class="create_logo" />
          <!-- 分享弹窗遮罩层 -->
          <div id="mask" ref="mask" v-show="isShare" @click.stop="isShare=false">
            <div class="cerat_con" @click.stop>
              <div class="shareTitle">{{shops.c_name}}</div>
              <input
                id="copy_content"
                type="text"
                value
                style="position: absolute;top: 0;left: 0;opacity: 0;z-index: -10;"
              />
              <div class="shareImg" ref="shareImg" id="shareImg" style="width:232px;height:233px">
                <qrcode-vue
                  size="232"
                  level="H"
                  :value="url"
                  style="position: relative;display: inline-block;width: 100%;height: 100%;"
                ></qrcode-vue>
                <img
                  :src="shops.logo_img"
                  style="height: 64px;width: 64px;position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);border: 1px solid #303133;border-radius: 8px;"
                />
              </div>
              <!-- <div class="shareImg">
              <img :src="QRCode" alt />
              </div>-->
              <div class="tolink">
                <span>链接:</span>
                <input type="text" class="linkUrl" id="link" v-model="url" />
              </div>
              <div class="copyQuickly">
                <span @click="copyImg()" id="btn" class="btn">一键复制</span>
              </div>
            </div>
          </div>
        </div>
        <div class="merchandise">
          <h4>商品展示</h4>
        </div>
        <div class="shop-show">
          <div class="shop-box">
            <div
              class="shop-item"
              v-for="(item,index) in shops.goods"
              :key="index"
              @click="toParticulars(item)"
            >
              <img :src="item.img[0]" alt />
              <p>
                <span>{{item.title}}</span>
              </p>
            </div>
          </div>
        </div>
        <div class="btn-box">
          <el-button type="warning" @click="back">返回</el-button>
        </div>
      </div>
    </div>
    <!-- <img id="copyImg" :src="dataURL" /> -->
  </div>
</template>

<script>
//import x from ''
import url from "../../serverAPI.config.js";
import fs from "fs";
import QrcodeVue from "qrcode.vue";
import html2canvas from "html2canvas";
import { setTimeout } from "timers";
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
      dataURL: "",
    };
  },
  components: {
    QrcodeVue,
    html2canvas
  },
  computed: {},
  mounted() {
    document
      .querySelector("body")
      .setAttribute("style", "background-color:#F2F2F2");

    this.$refs.mask.style.height =
      document.getElementById("app").clientHeight + "px";
    if (this.isShow == false) {
      document.body.style.overflow = "visible";
    }

    //   点击空白以为的消失遮罩层
    document.addEventListener("click", e => {
      if (e.target.className != "priceList") {
        this.isShow = false;
      }
    });
    // var bodyHeight = window.screen.height;
    // document.getElementById("bhncMainindex").style.minHeight = bodyHeight + "px";
  },
  beforeDestroy() {
    document.querySelector("body").removeAttribute("style");
  },
  created() {
    this.url = window.location.href.replace(/createMarke/, "shareJump") ;
    this.username = this.$route.query.id;
    this.getShare();
    this.QRCode = `${url.QRCode}/${this.username}`;
    window.onload = () => {;
      document.getElementsByTagName("canvas")[0].style =
        "position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);";
    };
  },
  methods: {
    // getSelect(targetNode) {
    //   if (window.getSelection) {
    //     //chrome等主流浏览器
    //     var selection = window.getSelection();
    //     var range = document.createRange();
    //     range.selectNode(targetNode);
    //     selection.removeAllRanges();
    //     selection.addRange(range);
    //   } else if (document.body.createTextRange) {
    //     //ie
    //     var range = document.body.createTextRange();
    //     range.moveToElementText(targetNode);
    //     range.select();
    //   }
    // },

    // clipboardHandler(nodeName, event) {
    //   event = event || nodeName; //不传参时
    //   const type = Object.prototype.toString
    //     .call(nodeName)
    //     .replace(/\[object\s|\]/g, "");
    //   const target = event.target || event.srcElement;

    //   var result = false;
    //   switch (type) {
    //     case "String":
    //       result = target.nodeName.toLowerCase() === nodeName;
    //       break;
    //     case "Array":
    //       result = nodeName.some(
    //         item => target.nodeName.toLowerCase() === item
    //       );
    //       break;
    //     case "Object":
    //       nodeName = null;
    //     default:
    //       result = target.nodeName === "IMG";
    //   }

    //   if (result) {
    //     this.getSelect(target);
    //     document.execCommand("copy");
    //   }
    // },
    crearImg() {
      html2canvas(this.$refs.shareImg, {
        // backgroundColor: null // 解决生成的图片有白边
      }).then(canvas => {
        let dataURL = canvas.toDataURL("image/png");
        this.dataURL = dataURL;
        // var base64Data = this.dataURL.replace(/^data:image\/\w+;base64,/, "");
        // var dataBuffer = new Buffer(base64Data, "base64");
        // fs.writeFile("image.png", dataBuffer, function(err) {
        //   if (err) {
           
        //   } else {
          
        //   }
        // });
        // setTimeout(() => {
        //   this.rClick();
        // }, 1000);

        // this.clipboard = new Clipboard(this.dataURL);
      });
    },
    back() {
      this.$router.push('/marketingEnter');
    },
    formatPrice(str) {
      return parseFloat(str).toFixed(2);
    },
    // 点击分享按钮，弹窗
    handleShare() {
      setTimeout(() => {
        this.crearImg();
      }, 50);
      this.isShare = !this.isShare;
    },
    getShare() {
      this.$http({
        url: `${url.getShare}/${this.username}`,
        method: "get"
      }).then(res => {
        if (res.data.code == 20000) {
          this.shops = res.data.data;
          if (this.shops) {
             this.shops.goods.map(item => {
            item.img = JSON.parse(item.img);
          });
          }   
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    copyImg() {
      // var range = document.createRange();
      // range.selectNode(document.getElementById("copyImg")); //selectable为下面页面中DIV中的id
      // window.getSelection().addRange(range);
      // document.execCommand("copy");
      // alert("复制成功");
      if (!this.url) {
        this.$message.error("没有内容可以复制");
        return;
      }
      //获取点击的值
      var clickContent = this.shops.c_name + "   ,   " + this.url;
      //获取要赋值的input的元素
      var inputElement = document.getElementById("copy_content");
      //给input框赋值
      inputElement.value = clickContent;
      //选中input框的内容
      inputElement.select();
      // 执行浏览器复制命令
      document.execCommand("copy");
      //提示已复制
      this.$message.success("复制成功");
    },
    toParticulars(item) {
      this.$router.push({path:'/particulars',
       query:{id:item.id}})
    }
  }
};
</script>

<style lang='scss'>
#bhncCreate-marke {
  canvas {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>

<style lang='scss' scoped>
#bhncCreate-marke {
  div {
    canvas {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  div[level] {
  }
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
        background: #fcf2ed;
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
      margin: 20px 0;
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
    margin-bottom: 30px;
    i {
      display: inline-block;
      font-size: 28px;
      color: #fc9263;
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
  .merchandise {
    position: relative;
    height: 45px;
  }
  .merchandise > h4 {
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    margin: auto;
    height: 59px;
    font-size: 20px;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
  }
  .merchandise > h4::before {
    content: "";
    position: absolute;
    top: 10px;
    left: 100px;
    width: 540px;
    height: 3px;
    background: #eef6fd;
  }
  .merchandise > h4::after {
    content: "";
    position: absolute;
    top: 10px;
    right: 100px;
    width: 540px;
    height: 3px;
    background: #eef6fd;
  }

  // 分享弹窗样式
  .shareBox {
    margin: 0 auto;
    top: 230px;
    position: absolute;
    right: 17px;
    z-index: 100;
    background-color: #fff;
    width: 600px;
    border: 1px solid #3d91e7;
    .shareTitle {
      padding: 25px 0;
      text-align: center;
      font-size: 18px;
      font-weight: 600;
      font-family: 微软雅黑;
      color: rgb(0, 0, 0);
    }
    .shareImg {
      margin: auto;
      width: 322px;
      height: 312px;
      margin-bottom: 30px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .tolink {
      display: flex;
      align-items: center;
      padding: 0 30px;
      span {
        width: 50px;
      }
      .linkUrl {
        flex: 1;
        border: 1px solid #3d91e7;
        height: 32px;
        line-height: 32px;
      }
    }
    .copyQuickly {
      padding: 40px 0;
      text-align: center;
      span {
        display: inline-block;
        width: 100px;
        height: 35px;
        background-color: #3d91e7;
        line-height: 35px;
        border-radius: 4px;
        color: #fff;
        cursor: pointer;
      }
    }
  }
  // 遮罩层
  #mask {
    width: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    bottom: 0;
    left: 0;
    position: fixed;
    z-index: 998;
  }
  .cerat_con {
    position: fixed;
    width: 800px;
    height: 500px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #f0f0f0;
    border-radius: 12px;
    .shareTitle {
      margin-top: 20px;
      text-align: center;
      font-size: 28px;
      font-family: 微软雅黑;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      margin-bottom: 20px;
    }
    .shareImg {
      margin: auto;
      position: relative;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .tolink {
      padding: 0 100px;
      margin-top: 30px;
      span {
        width: 50px;
        font-size: 20px;
        color: rgba(153, 153, 153, 1);
      }
      .linkUrl {
        height: 48px;
        background: rgba(255, 255, 255, 1);
        border-radius: 8px;
        font-size: 16px;
        width: 90%;
        text-indent: 16px;
      }
    }
    .copyQuickly {
      padding: 40px 0;
      text-align: center;
      span {
        display: inline-block;
        width: 100px;
        height: 35px;
        background-color: #fc9263;
        line-height: 35px;
        border-radius: 4px;
        color: #fff;
        cursor: pointer;
      }
    }
  }
}
</style>