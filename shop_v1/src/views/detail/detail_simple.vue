<template>
  <div class="detailSimple" v-if="goods" style="overflow:hidden">
    
    <!-- 内容 -->

    <!-- 商品介绍开始 -->
    <div class="detailIntroduct w clearfix">
      <div class="detailLeft clearfix fl">
        <div class="detailImg fl clearfix">
          <img :src="goods.img[0]" alt />
        </div>
        <div class="right_xin fl clearfix">
          <p class="title_text">{{goods.title}}</p>
          
          <div class="tradeBox" v-if="dealer">
            <div class="trade">
              <div class="trade_a">
                <span>批发价:</span>
              
              </div>
              <div class="trade_b">
                <div
                  class="trade_b_li"
                  v-for="(price_range,index) in goods.price_range"
                  :key="index"
                >
                  <span class="qian_a">
                    ￥
                    <span class="qian">{{formatPrice(price_range.price)}}</span>
                  </span>
                  <br />
                  <span>(>={{price_range.start}} &lt;={{price_range.end}})</span>
                </div>
              </div>
              <div class="trade_c">
                <span>
                  零售价:
                  <span
                    class="retail"
                  >{{goods.retail_price?'￥'+formatPrice(goods.retail_price):'不支持零售'}}</span>
                </span>
                <span class="inventory">库存：{{sku.inventory}}</span>
              </div>
            </div>
            <div class="shareLike fr">
              <i class="iconfont icon-share_light"></i>
              <i class="iconfont icon-like" title="点击收藏" v-show="!isC" @click="addCollection()"></i>
              <i
                class="iconfont icon-likefill"
                style="color:red;margin-left: 20px;"
                title="取消收藏"
                v-show="isC"
                @click="deleteCollection()"
              ></i>
            </div>
          </div>
          <div class="tradeBoxB" v-else-if="showSalePrice">
            <div class="priceContent">
              <span>零售价</span>
              <i>￥{{formatPrice(goods.retail_price)}}</i>
              <p>成为采购经销商之后，可查看本商品批发价。</p>
            </div>
            <div class="linkToShare clearfix">
              <div class="shareLike fl">
                <i class="iconfont icon-share_light"></i>
                <i class="iconfont icon-like" title="点击收藏" v-show="!isC" @click="addCollection()"></i>
                <i
                  class="iconfont icon-likefill"
                  style="color:red;margin-left: 20px;"
                  title="取消收藏"
                  v-show="isC"
                  @click="deleteCollection()"
                ></i>
              </div>
              <div class="applying fr">
                
              </div>
            </div>
          </div>
          <div class="tradeBoxC" v-else>
            <div class="priceContent clearfix">
              <div class="tipsBox fl">
              </div>
              <div class="titleBox">
                <p class="nolonger">本商品不进行零售</p>
                <p class="beingDealer">成为采购经销商之后，可查看本商品批发价。</p>
              </div>
            </div>
            <div class="linkToShare clearfix">
              <div class="shareLike fl">
                <i class="iconfont icon-share_light"></i>
                <i class="iconfont icon-like" title="点击收藏" v-show="!isC" @click="addCollection()"></i>
                <i
                  class="iconfont icon-likefill"
                  style="color:red;margin-left: 20px;"
                  title="取消收藏"
                  v-show="isC"
                  @click="deleteCollection()"
                ></i>
              </div>
              <div class="applying fr">

              </div>
            </div>
          </div>
        </div>
        <div class="contentDetial">
          <hr color="#F0F0F0" />
          <div class="content_title">
            <!-- <button class="look_details_a" v-if="islook" @click="updateLook()" type="info">查看详细信息</button> -->
            <i class="look_details_a" @click="updateLook()" type="info">查看详细信息>></i>
          </div>
          <ul class="clearfix detialUl">
            <li>
              <span>款号：</span>
              <i>{{goods.style_number}}</i>
            </li>
            <li>
              <span>商品分类：</span>
              <i>
                <span v-for="(item,index) in goods.scope" :key="index">
                  {{item}}
                  <span v-if="index < goods.scope.length-1">、</span>
                </span>
              </i>
            </li>
            <li>
              <span>地区：</span>
              <i>{{goods.provider.region}}</i>
            </li>
            <li class="wrapBox clearfix">
              <span>手机号码：</span>
              <div class="frBox">{{goods.provider.phone}}</div>
            </li>
            <li class="wrapBox clearfix">
              <span>固定电话：</span>
              <div class="frBox">
                <!-- <span v-for="(item,index) in goods.provider.fixPhone" :key="index">
                        {{item}}
                        <span v-if="index < goods.provider.fixPhone.length-1">、</span>
                </span>-->
                <span>{{goods.provider.fixPhone.join("、")}}</span>
              </div>
            </li>
            <li class="wrapBox clearfix">
              <span>QQ：</span>
              <div class="frBox">
                <!-- <span v-for="(item,index) in goods.provider.qq" :key="index">
                        {{item}}
                        <span v-if="index < goods.provider.qq.length-1">、</span>
                </span>-->
                <span>{{goods.provider.qq.join("、")}}</span>
              </div>
            </li>
            <li style="border:none">
              <span>供应商：</span>
              <i>{{goods.provider.company_name}}</i>
            </li>
            <li style="border:none">
              <span>地址：</span>
              <i>{{goods.provider.address}}</i>
            </li>
          </ul>
        </div>
      </div>
      <!-- <div class="detailRight fr"> -->
      <div class="extInfo">
        <div class="looks">看了又看</div>
        <div class="scrollbox" v-if="lookThenGoodsList.length >0">
          <div id="scrollDiv">
            <ul>
              <div data-v-498142aa class="el-carousel el-carousel--horizontal">
                <div class="el-carousel__container" style="height: 500px;overflow: hidden">
                  <div
                    data-v-498142aa
                    class="el-carousel__item is-active is-animating"
                    :style="'transform: translateY('+(lookThenGoodsShow*167-167)+'px) scale(1);' + (lookThenGoodsShow == lookThenGoodsShowList.length-1 ? 'display: none':'')"
                    v-for="(lookThenGoodsShow,lookThenGoodsShowIndex) in lookThenGoodsShowList "
                    :key="lookThenGoodsShowIndex"
                  >
                    <a>
                      <li
                        @mouseover="stopChangeLookThenGoodsShow()"
                        @mouseout="startChangeLookThenGoodsShow()"
                        @click="toDetail(lookThenGoodsList[lookThenGoodsShowIndex])"
                      >
                        <div style="text-align: center;width:150px;height:134px">
                          <img
                            :src="lookThenGoodsList[lookThenGoodsShowIndex].img[0]"
                            alt
                            width="150px"
                            height="134px"
                          />
                        </div>
                        <h3>
                          <a
                            href="#"
                            class="linktit"
                          >{{lookThenGoodsList[lookThenGoodsShowIndex].title}}</a>
                        </h3>
                      </li>
                    </a>
                  </div>
                </div>
              </div>
            </ul>
          </div>
          <div class="scroltit">
            <i class="iconfont icon-xiangshang2" @click="changeLookThenGoodsShowUp" id="but_down"></i>
            <i class="iconfont icon-xiangxia2" @click="changeLookThenGoodsShowDown" id="but_up"></i>
          </div>
        </div>
      </div>
      <!-- </div> -->
    </div>
    <!-- 商品介绍结束 -->
  </div>
</template>
<script>
import url from "@/serverAPI.config.js";
export default {
  data() {
    return {
      islook: true,
      activeName: "details",
      downIcon: true,
      count: 0,
      countC: true,
      username: "",
      id: "",
      isC: false,
      goods: null,
      totalPrice: 0,
      sku: null,
      countWarn: "",
      masterImg: "",
      lookThenGoodsList: [],
      lookThenGoodsShowList: [],
      timerChange: "",
      isChangShow: true,
      dealer: false,
      showSalePrice: true
    };
  },
  created() {
    this.username = localStorage.getItem("username");
    this.id = this.$route.query.id;
    this.getGoods();
    this.isCollection();
    this.getLookThenGoodsList();
    if (localStorage.getItem("roles").indexOf("dealer") == -1) {
      this.dealer = false;
    } else {
      this.dealer = true;
    }
  },

  methods: {
    //   看了又看
    createLookThenGoodsShow() {
      var lookThenGoodsShowList = [];
      for (var i = 0; i < this.lookThenGoodsList.length; i++) {
        lookThenGoodsShowList.push(i);
      }
      this.lookThenGoodsShowList = lookThenGoodsShowList;
      this.startChangeLookThenGoodsShow();
    },
    changeLookThenGoodsShowUp() {
      this.stopChangeLookThenGoodsShow();
      if (!this.isChangShow) {
        return;
      }
      this.isChangShow = false;
      this.lookThenGoodsShowList.unshift(
        this.lookThenGoodsShowList[this.lookThenGoodsShowList.length - 1]
      );
      this.lookThenGoodsShowList.pop();
      setTimeout(() => {
        this.isChangShow = true;
      }, 400);
      this.startChangeLookThenGoodsShow();
    },
    changeLookThenGoodsShowDown() {
      this.stopChangeLookThenGoodsShow();
      if (!this.isChangShow) {
        return;
      }
      this.isChangShow = false;
      this.lookThenGoodsShowList.push(this.lookThenGoodsShowList[0]);
      this.lookThenGoodsShowList.shift();
      setTimeout(() => {
        this.isChangShow = true;
      }, 400);
      this.startChangeLookThenGoodsShow();
    },
    stopChangeLookThenGoodsShow() {
      clearInterval(this.timerChange);
      this.timerChange = null;
    },
    startChangeLookThenGoodsShow() {
      this.timerChange = setInterval(this.changeLookThenGoodsShowUp, 2000);
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    collect() {
      this.downIcon = !this.downIcon;
    },
    toDetail(goods) {
      if (goods.is_pay == "1") {
        this.$router.push({ path: "/detail", query: { id: goods.id } });
        return;
      } else {
        this.$router.push({ path: "/detailSimple", query: { id: goods.id } });
      }
      location.reload();
    },

    //获取看了又看
    getLookThenGoodsList() {
      this.$http({
        url: `${url.lookedAndLooked}/${this.id}`,
        method: "get"
      }).then(res => {
        if (res.data.code == 20000) {
          if (res.data.code == 20000) {
            this.lookThenGoodsList = res.data.data;
            this.lookThenGoodsList.map(item => {
              item.img = JSON.parse(item.img);
            });
            this.createLookThenGoodsShow();
          } else {
            this.$message.error(res.data.message);
          }
        }
      });
    },

    //获取商品的详细信息
    getGoods() {
      var username = localStorage.getItem("username");
      this.$http({
        url: `${url.goods}/${this.id}/${username}`,
        method: "get"
      }).then(res => {
        if (res.data.code == 20000) {
          var data = res.data.data;
          data.price_range = JSON.parse(data.price_range);
          data.img = JSON.parse(data.img);
          data.sku = JSON.parse(data.sku);
          data.scope = JSON.parse(data.scope);
          data.provider.qq = JSON.parse(data.provider.qq);
          data.provider.fixPhone = JSON.parse(data.provider.fixPhone);
          this.goods = data;
          this.sku = this.goods.sku[0];
          if (this.goods.provider.is_look_goods.indexOf(username) > -1) {
            this.islook = false;
          } else {
            this.islook = true;
          }
          this.masterImg = this.goods.img[0];
          if (this.goods.retail_price) {
            this.showSalePrice = true;
          } else {
            this.showSalePrice = false;
          }
        }
      });
    },
    //获取是否已经收藏
    isCollection() {
      if (!localStorage.getItem("username")) {
        return;
      }
      this.$http({
        url: `${url.isCollection}/${this.id}/${this.username}`,
        method: "get"
      }).then(res => {
        if (res.data.code == 20000) {
          this.isC = res.data.data;
        }
      });
    },

    //收藏
    addCollection() {
      if (!localStorage.getItem("username")) {
        this.$message.error("请登录后再收藏");
        return;
      }
      this.$http({
        url: `${url.addCollection}/${this.id}/${this.username}`,
        method: "get"
      }).then(res => {
        if (res.data.code == 20000) {
          this.isCollection();
        }
      });
    },

    //取消收藏
    deleteCollection() {
      if (!localStorage.getItem("username")) {
        this.$message.error("请登录后再操作");
        return;
      }
      this.$http({
        url: `${url.deleteCollection}/${this.id}/${this.username}`,
        method: "get"
      }).then(res => {
        if (res.data.code == 20000) {
          this.isCollection();
        }
      });
    },
    //格式化价格
    formatPrice(str) {
      return parseFloat(str).toFixed(2);
    },
    //格式化评分
    formatGrade(str) {
      return parseFloat(str).toFixed(1);
    },

    //取整
    formatNumber(str) {
      return parseInt(str);
    },

    updateLook() {
      if (!localStorage.getItem("username")) {
        this.$message.error("请登录后再操作");
      }
      //级别不足查看
      if (this.goods.currentLevel <= "1") {
        this.$confirm(
          "您的级别没有权限查看供应商信息，积分必须达到2级会员！",
          "提示",
          {
            confirmButtonText: "成为经销商",
            cancelButtonText: "取消",
            type: "warning",
            center: true
          }
        )
          .then(() => {
            this.$router.push("/submitData");
          })
          .catch(() => {});
      } else {
        //级别满足查看
        this.$confirm(
          `本次查看供应商信息将消耗${this.goods.lookProvider}积分，是否继续查看？`,
          "提示",
          {
            confirmButtonText: "确认",
            cancelButtonText: "取消",
            type: "warning",
            center: true
          }
        ).then(() => {
          console.log(1);
          this.$http({
            method: "put",
            url: url.updateLook + `/${this.goods.provider.id}`
          }).then(res => {
            this.getGoods();
            this.isCollection();
          });
        });
      }
    }
  }
};
</script>
<style scoped lang="scss">
.fl {
  float: left;
}
.fr {
  float: right;
}
.detailImg {
  width: 411px;
  height: 370px;
  img {
    width: 100%;
    height: 100%;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
  }
}

.detailIntroduct {
  padding: 12px 28px 0 12px;
  background-color: #fff;
  // 商品介绍开始
  .detailIntroduct {
  }
  // 商品介绍结束
}

.w {
  width: 1200px;
  margin: 0 auto;
  background-color: white;
}
.right_xin {
  overflow: hidden;
  display: inline-block;
  margin-left: 23px;
  width: 520px;
}
.right_xin .title_text {
  width: 520px;
  //   font-size: 20px;
  //   font-family: MicrosoftYaHei-Bold,微软雅黑;
  //   font-weight: bold;
  //   color: #666666;
  //   display: -webkit-box;
  //   -webkit-box-orient: vertical;
  //   -webkit-line-clamp: 2;
  //   overflow: hidden;
  font-size: 20px;
  font-family: SourceHanSansCN-Regular;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  line-height: 29px;
}
.right_xin .grade {
  display: inline-block;
  float: right;
  color: rgba(255, 111, 54, 1);
  span {
    font-family: MicrosoftYaHei,微软雅黑;
    font-weight: 400;
    color: rgba(255, 111, 54, 1);
    font-size: 12px;
  }
  .grade_img {
    display: inline-block;
    img {
    }
  }
}
.right_xin .trade {
  margin: 25px 5px 5px 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
  padding: 20px;
}
.right_xin .trade .trade_a {
  span {
    color: #666666;
    font-size: 14px;
  }
  img {
    float: right;
    cursor: pointer;
  }
}
.right_xin .trade .trade_b {
  margin: 20px 0;
  display: flex;
  justify-content: space-around;
  .trade_b_li {
    display: inline-block;
    text-align: center;
    color: #666666;
    font-size: 12px;
    .qian_a {
      font-size: 20px;
      font-weight: bold;
      color: red;
      margin-bottom: 5px;
      display: inline-block;
    }
    .qian {
      font-size: 40px;
    }
  }
}
.right_xin .trade .trade_c {
  .retail {
    font-family: MicrosoftYaHei,微软雅黑;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    font-size: 20px;
    margin-left: 30px;
  }
  span {
    color: #666666;
    font-weight: 400;
    font-size: 14px;
  }
  .inventory {
    font-size: 14px;
    font-family: MicrosoftYaHei,微软雅黑;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    float: right;
  }
}
//
.shareLike {
  padding-top: 20px;
  padding-right: 10px;
  .iconfont {
    cursor: pointer;
  }
  .icon-like {
    color: #ff0000;
    margin-left: 20px;
  }
}
.detailLeft {
  padding-bottom: 28px;
  // border-bottom: 4px #F0F0F0 solid;
  width: 954px;
}
.detailRight {
  width: 184px;
  height: 300px;
  border: 1px solid;
}

.contentDetial {
  width: 945px;
  float: left;
}

.contentDetial {
  .content_title {
    padding-top: 19px;
    padding-left: 15px;
    padding-left: 20px;

    i {
      font-size: 14px;
      font-family: MicrosoftYaHei,微软雅黑;
      font-weight: 400;
      color: rgba(61, 145, 231, 1);
      cursor: pointer;
    }
  }
  ul {
    padding-left: 20px;

    li {
      padding: 28px 10px;
      float: left;
      width: 33.3%;
    }
  }
}

.extInfo {
  width: 184px;
  min-height: 520px;
  float: right;
  background-color: #f8f8f8;
}
.looks {
  text-align: center;
  position: relative;
  font-size: 14px;
  color: #727273;
  margin: 15px auto;
  width: 150px;
}
.looks::before {
  position: absolute;
  top: 50%;
  width: 40px;
  height: 1px;
  background: #c7c7c7;
  display: inline-block;
  content: "";
  left: 0;
}
.looks::after {
  position: absolute;
  top: 50%;
  width: 40px;
  height: 1px;
  background: #c7c7c7;
  display: inline-block;
  content: "";
  right: 0;
}
.scrollbox {
  width: 150px;
  margin: 0 auto;
  overflow: hidden;
}
#scrollDiv {
  width: 150px;
  height: 510px;
  overflow: hidden;
}
#scrollDiv li {
  border: 1px solid rgba(216, 240, 252, 1);
  width: 150px;
  height: 163px;
  overflow: hidden;
  vertical-align: bottom;
  zoom: 1;
  margin-bottom: 10px;
}
#scrollDiv li h3 {
  padding: 5px 10px;
  font-size: 12px;
  color: #666666;
  text-align: center;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
#scrollDiv li h3 a {
  color: #666666;
  text-decoration: none;
}
.scroltit {
  margin: 10px 0;
  height: 26px;
  line-height: 26px;
  text-align: center;
}
#but_down {
  margin-right: 15px;
  text-indent: -9999px;
  cursor: pointer;
}
#but_up {
  text-indent: -9999px;
  cursor: pointer;
}

.detialUl {
  display: flex;
  flex-wrap: wrap;
  li {
    width: 33%;
    border-bottom: 1px solid #ccc;
  }
  .wrapBox {
    span {
      float: left;
    }
    .frBox {
      float: left;
      width: 170px;
      line-height: 2;
    }
  }
}

.tradeBoxB {
  .priceContent {
    margin-top: 26px;
    padding-top: 46px;
    padding-left: 43px;
    padding-bottom: 17px;
    margin-bottom: 23px;
    box-shadow: inset 0px 0px 5px rgba(0, 0, 0, 0.15);

    span {
      font-size: 14px;
      font-family: MicrosoftYaHei,微软雅黑;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
    }
    i {
      padding-left: 88px;
      font-size: 38px;
      font-family: MicrosoftYaHei,微软雅黑;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
    }
    p {
      padding-top: 33px;
      text-align: right;
      font-size: 14px;
      font-family: MicrosoftYaHei,微软雅黑;
      font-weight: 400;
      color: rgba(135, 135, 135, 1);
    }
  }

  .applying {
    cursor: pointer;
  }
}

.tradeBoxC {
  .priceContent {
    margin-top: 26px;
    background-color: #f0f0f0;
    padding-top: 9px;
    padding-left: 16px;
    margin-bottom: 29px;
    .tipsBox {
      width: 197px;
      height: 131px;
      padding-right: 12px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .titleBox {
      padding-top: 35px;

      .nolonger {
        font-size: 19px;
        font-family: MicrosoftYaHei,微软雅黑;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
      }
      .beingDealer {
        padding-top: 33px;
        font-size: 14px;
        font-family: MicrosoftYaHei,微软雅黑;
        font-weight: 400;
        color: rgba(135, 135, 135, 1);
      }
    }
  }
  .applying {
    cursor: pointer;
  }
}
</style>

