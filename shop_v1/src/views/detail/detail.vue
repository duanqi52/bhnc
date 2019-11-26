<template>
  <div>
    <div class="w" v-if="goods">
      <div class="right-extra" style="padding: 20px 10px;min-height: 440px;">
        <!--产品参数开始-->
        <div style="display: inline-block;float: left;">
          <div id="preview" class="spec-preview">
            <span class="jqzoom">
              <img :src="masterImg" style="height: 350px;width: 350px;" />
            </span>
          </div>
          <!--缩图开始-->
          <div class="spec-scroll">
            <a class="prev">&lt;</a>
            <a class="next">&gt;</a>
            <div class="items">
              <ul>
                <li v-for="(img,index) in goods.img" :key="index">
                  <img alt="佳能" :src="img" :id="'img'+index" v-if="img" />
                </li>
              </ul>
            </div>
          </div>
          <!--缩图结束-->
        </div>
        <!-- 产品信息 -->
        <div class="right_xin">
          <p class="title_text">{{goods.title}}</p>
          <div class="grade">
            <span>评分：</span>
            <div class="grade_img">
              {{formatGrade(goods.grade)}}
              <img
                src="../../../static/img/star_a.png"
                alt
                v-for="item in formatNumber(goods.grade)"
                :key="item"
              />
              <img
                src="../../../static/img/star.png"
                alt
                v-for="item in 5-formatNumber(goods.grade)"
                :key="'0'+item"
              />
            </div>
          </div>
          <!-- 经销商状态 -->
          <div class="trade" v-if="dealer">
            <div class="trade_a">
              <span>批发价</span>
              <i>
                <img
                  src="../../../static/img/heart.png"
                  title="点击收藏"
                  v-show="!isC"
                  @click="addCollection()"
                />
                <img
                  src="../../../static/img/heart_a.png"
                  title="取消收藏"
                  v-show="isC"
                  @click="deleteCollection()"
                />
              </i>
            </div>
            <div class="trade_b">
              <div class="trade_b_li" v-for="(price_range,index) in goods.price_range" :key="index">
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
                零售价
                <span
                    class="retail"
                  >{{goods.retail_price?'￥'+formatPrice(goods.retail_price):'不支持零售'}}</span>
                </span>
              <span class="inventory">库存：{{sku.inventory}}</span>
            </div>
          </div>
          <!-- 零售价状态 -->
          <div class="saleTrade" v-else-if="showSalePrice">
              <p class="collectionBox">
                    <i><img
                    src="../../../static/img/heart.png"
                    title="点击收藏"
                    v-show="!isC"
                    @click="addCollection()"
                    /><img
                    src="../../../static/img/heart_a.png"
                    title="取消收藏"
                    v-show="isC"
                    @click="deleteCollection()"/>
                    </i>
                    <span class="inventory">库存：{{sku.inventory}}</span>
              </p>
              <p class="lingshoujia">零售价</p>
              <p class="saleNum"><span>￥{{formatPrice(goods.price)}}</span></p>
              <p class="beingDealer">
                  <span >成为采购经销商之后，可查看本商品批发价。</span>
                  <i @click="$router.push('/submitData')">升级为尊贵的经销商</i>
              </p>
          </div>
          <!-- 不显示价格状态 -->
          <div class="noPrice" v-else>
              <div class="bgdiv">
              </div>
              <p class="collectionBox">
                    <i><img
                    src="../../../static/img/heart.png"
                    title="点击收藏"
                    v-show="!isC"
                    @click="addCollection()"
                    /><img
                    src="../../../static/img/heart_a.png"
                    title="取消收藏"
                    v-show="isC"
                    @click="deleteCollection()"/>
                    </i>
                    <span class="inventory">库存：{{sku.inventory}}</span>
              </p>
              <p class="tipsTxt">本商品不进行零售</p>
              <p class="beingDealer">
                  <span >成为采购经销商之后，可查看本商品批发价。</span>
                  <i @click="$router.push('/submitData')">升级为尊贵的经销商</i>
              </p>
          </div>
          <div class="pick_color">
            <ul>
              <li
                :class="index == '0'?'tabs':''"
                v-for="(sku,index) in goods.sku"
                :key="index"
                @click="selectSku(sku)"
              >
                <img :src="sku.sku_img" alt class="sku_tu" />
                <span>{{sku.color}}</span>
              </li>
            </ul>
          </div>
          <div class="cartridge">
            <div class="cartridge_a">
              <span style="margin-right: 50px;">
                <span class="overstriking">笔芯配置：</span>
                {{goods.cartridge == '0' ? '未置笔芯':'已置笔芯'}}
              </span>
              <span>
                <span class="overstriking">批发总价：</span>
                {{formatPrice(totalPrice)}}
              </span>
              <div class="cartridge_a_num">
                <span>采购数量：</span>
                <input type="number" placeholder="请输入采购数量" v-model="count" @keyup="checkCount()" />
                <span style="color:red">{{countWarn}}</span>
              </div>
            </div>
            <div class="cartridge_b">
              <button class="shoppingCar" @click="addCart()"  v-if="showSalePrice || dealer">加入购物车</button>
              <el-button type="info" disabled v-if="!showSalePrice &&!dealer">加入购物车</el-button>
              <button class="buy" @click="settle()" v-if="showSalePrice||dealer ">立即购买</button>
              <el-button type="info" disabled v-if="!showSalePrice && !dealer">立即购买</el-button>

            </div>
          </div>
        </div>
      </div>
      <!-- 笔芯选配 -->
      <div class="matching" v-if="goods.cartridge == '0'">
        <div class="matching_a">
          <span>笔芯选配</span>
        </div>
        <div class="yxsp">
          <ul class="catalogue">
            <li>
              <div class="catalogue_li">
              </div>
              <p>
                <span style="color: red !important;font-size: 14px;">￥</span>
                <span>0.5</span>/支起
              </p>
              <label>
                <span>商品名称</span>
              </label>
              <p style="border-top: 1px solid #EBEBEB;">销量15000支</p>
            </li>
          </ul>
          <span class="looks_more" href="#">查看更多</span>
        </div>
      </div>
      <!-- 商品详情及评价 -->
      <div class="details_all">
        <el-tabs v-model="activeName" @tab-click="handleClick" style="font-size: 17px;">
          <el-tab-pane label="商品详情" name="details" style="background-color: #F2F2F2;">
            <div class="details_all_a">
              <div class="details_material">
                <p>商品资料：</p>
                <div class="details_material_a">
                  <span>款号：{{goods.style_number}}</span>
                  <span>
                    商品分类：
                    <span v-for="(item,index) in goods.scope" :key="index">
                      {{item}}
                      <span v-if="index < goods.scope.length-1">、</span>
                    </span>
                  </span>
                  <span>地区：{{goods.provider.region}}</span>
                  <span>供应商：{{goods.provider.company_name}}</span>
                </div>
                <div class="details_material_b">
                  <span>手机号码：{{goods.provider.phone}}</span>
                  <span>
                    固定电话：
                    <span v-for="(item,index) in goods.provider.fixPhone" :key="index">
                      {{item}}
                      <span v-if="index < goods.provider.fixPhone.length-1">、</span>
                    </span>
                  </span>
                  <span>
                    QQ：
                    <span v-for="(item,index) in goods.provider.qq" :key="index">
                      {{item}}
                      <span v-if="index < goods.provider.qq.length-1">、</span>
                    </span>
                  </span>
                  <span>地址：{{goods.provider.address}}</span>
                </div>
              </div>
              <div class="look_details">
                <button class="look_details_a" v-if="islook" @click="updateLook()">查看详细信息</button>
              </div>
            </div>
            <div class="figure" v-html="goods.introduce"></div>
            <!--right -->
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
                  <i
                    class="iconfont icon-xiangshang2"
                    @click="changeLookThenGoodsShowUp"
                    id="but_down"
                  ></i>
                  <i
                    class="iconfont icon-xiangxia2"
                    @click="changeLookThenGoodsShowDown"
                    id="but_up"
                  ></i>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="累计评论" name="comment">
            <ul class="discuss">
              <li>
                <p>评价文字内容评价文字内容评价文字内容评价文字内容评价文字内容评价文字内容评价文字内容评价文字内容</p>
                <div class="tupian">
                 
                </div>
                <div class="changping_message">
                  <span>广州周***具有限公司</span>
                  <span class="chang_a">颜色分类：红色</span>
                  <span class="chang_b">2019-07-08 17.39</span>
                  <span class="chang_c">
                    评分：
                    <span class="fenshu">4.0</span>
                  </span>
                </div>
              </li>
              <li>
                <p>评价文字内容评价文字内容评价文字内容评价文字内容评价文字内容评价文字内容评价文字内容评价文字内容</p>
                <div class="tupian">
                 
                </div>
                <div class="changping_message">
                  <span>广州周***具有限公司</span>
                  <span class="chang_a">颜色分类：红色</span>
                  <span class="chang_b">2019-07-08 17.39</span>
                  <span class="chang_c">
                    评分：
                    <span class="fenshu">4.0</span>
                  </span>
                </div>
              </li>
            </ul>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
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
      isC: true,
      goods: null,
      totalPrice: 0,
      sku: null,
      countWarn: "",
      masterImg: "",
      lookThenGoodsList:  [],
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
  updated() {
    this.countTotal();
    this.jqueryEvent();
    this.checkCount();
  },
  components: {},
  methods: {
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

    //获取商品的详细信息
    getGoods() {
      var username = localStorage.getItem("username");
      var VISITOR = localStorage.getItem("VISITOR");
      if (!username && VISITOR) {
        username = VISITOR;
      }
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
          if (data.visitorId) {
            localStorage.VISITOR = data.visitorId;
          }
          this.goods = data;
          this.sku = this.goods.sku[0];
          if (this.goods.provider.is_look_goods.indexOf(username) > -1) {
            this.islook = false;
          } else {
            this.islook = true;
          }
          this.masterImg = this.goods.img[0];
          this.jqueryEvent();
           if (this.goods.retail_price) {
            this.showSalePrice = true;
          } else {
            this.showSalePrice = false;
          }
        }
      });
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

    //获取是否已经收藏
    isCollection() {
      this.$http({
        url: `${url.isCollection}/${this.id}/${this.username}`,
        method: "get"
      }).then(res => {
        if (res.data.code == 20000) {
          this.isC = res.data.data;
        }
      });
    },

    //验证库存
    checkCount() {
      if (parseFloat(this.count) > parseFloat(this.sku.inventory)) {
        this.countWarn = "库存不够";
        console.log(this.countWarn);
        this.countC = false;
      } else {
        this.countWarn = "";
        this.countC = true;
      }
    },

    //添加到购物车
    addCart() {
      if (!this.count || this.count < 1) {
        alert("采购数量必须大于0");
        return;
      }
      if (!this.countC) {
        alert("采购数量不能大于库存");
        return;
      }
      if (!this.username) {
        alert("请登录后操作");
        return;
      }
      var provider = null;
      this.$http({
        url: `${url.getProvider}/${this.goods.provider.id}`,
        method: "get"
      }).then(res => {
        if (res.data.code == 20000) {
          provider = res.data.data;
          var cart = {
            price: this.goods.price,
            c_name: provider.company_name,
            link_man: provider.linkman,
            link_phone: provider.phone,
            link_address: provider.address,
            goods: [
              {
                name: this.goods.title,
                img: this.sku.sku_img,
                style_number: this.goods.style_number,
                color: this.sku.color,
                prices: parseFloat(this.price),
                count: this.count,
                gid: this.goods.id
              }
            ],
            price_range: []
          };
          this.goods.price_range.map(item => {
            cart.price_range.push({
              start: item.start,
              end: item.end,
              price: parseFloat(item.price)
            });
          });

          this.$http({
            url: `${url.addCart}/${this.username}/${this.sku.inventory}`,
            method: "post",
            data: cart
          }).then(res => {
            if (res.data.code == 20000) {
              this.$message.success("添加成功");
            } else alert(res.data.message);
          });
        } else alert(res.data.message);
      });
    },

    //收藏
    addCollection() {
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
      this.$http({
        url: `${url.deleteCollection}/${this.id}/${this.username}`,
        method: "get"
      }).then(res => {
        if (res.data.code == 20000) {
          this.isCollection();
        }
      });
    },

    //选择商品颜色
    selectSku(sku) {
      console.log(sku);
      this.sku = sku;
      this.checkCount();
    },

    //计算总价
    countTotal() {
      var max = 0;
      var min = parseInt(this.goods.price_range[0].start);
      var price = 0;
      this.goods.price_range.map(item => {
        var start = parseInt(item.start);
        var end = parseInt(item.end);
        if (end > max) {
          price = parseFloat(item.price);
        }
        max = end >= max ? end : max;
        min = start <= min ? start : min;
        if (this.count >= start && this.count <= end) {
          this.price = parseFloat(item.price);
          this.totalPrice =
            parseInt(this.count) * parseFloat(item.price)
              ? parseInt(this.count) * parseFloat(item.price)
              : 0;
        }
      });
      if (this.count < min) {
        this.price = parseFloat(this.goods.price);
        this.totalPrice =
          parseInt(this.count) * parseFloat(this.goods.price)
            ? parseInt(this.count) * parseFloat(this.goods.price)
            : 0;
      }
      if (this.count > max) {
        this.price = parseFloat(price);
        this.totalPrice =
          parseInt(this.count) * parseFloat(price)
            ? parseInt(this.count) * parseFloat(price)
            : 0;
      }
    },

    updateLook() {
      if (!this.username) {
          this.$message.error("请登录后再操作");
      }
      //级别不足查看
      if (this.goods.currentLevel <= "1" || localStorage.getItem('roles').indexOf('provider') > -1) {
          var warn = "您的级别没有权限查看供应商信息，积分必须达到2级会员！";
          if(localStorage.getItem('roles').indexOf('provider') > -1){
              warn="你还不是经销商"
          }
          var url="http://172.16.0.100:8888/#/submitData";
          var confirmButtonText="成为经销商";
          if(this.goods.currentLevel <= "1" && localStorage.getItem('roles').indexOf('dealer')){
              url = "http://172.16.0.100:8887/#/submitData";
              confirmButtonText="去充值";
          }
          this.$confirm(
              warn,
              "提示", {
                  confirmButtonText: confirmButtonText,
                  cancelButtonText: "取消",
                  type: "warning",
                  center: true
              }
          )
          .then(() => {
              location.href=url;
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
    },

    settle() {
      if (!this.count || this.count < 1) {
        alert("采购数量必须大于0");
        return;
      }
      if (!this.countC) {
        alert("采购数量不能大于库存");
        return;
      }
      if (!this.username) {
        alert("请登录后操作");
        return;
      }
      var provider = null;
      this.$http({
        url: `${url.getProvider}/${this.goods.provider.id}`,
        method: "get"
      }).then(res => {
        if (res.data.code == 20000) {
          provider = res.data.data;
          var cart = {
            price: this.goods.price,
            c_name: provider.company_name,
            link_man: provider.linkman,
            link_phone: provider.phone,
            link_address: provider.address,
            goods: [
              {
                name: this.goods.title,
                img: this.sku.sku_img,
                style_number: this.goods.style_number,
                color: this.sku.color,
                prices: parseFloat(this.price),
                count: this.count,
                gid: this.goods.id
              }
            ],
            price_range: []
          };
          this.goods.price_range.map(item => {
            cart.price_range.push({
              start: item.start,
              end: item.end,
              price: parseFloat(item.price)
            });
          });

          this.$http({
            url: `${url.settle}/${this.username}`,
            method: "post",
            data: [cart]
          }).then(res => {
            if (res.data.code == 20000) {
              this.$router.push(`/orderInfo?id=${res.data.data}`);
            } else alert(res.data.message);
          });
        } else alert(res.data.message);
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
    toDetail(goods) {
      if (goods.is_pay == "1") {
        this.$router.push({ path: "/detail", query: { id: goods.id } });
      } else {
        this.$router.push({ path: "/detailSimple", query: { id: goods.id } });
        return;
      }
      location.reload();
    },

    //样式事件
    jqueryEvent() {
      for (var j = 0; j < this.goods.img.length; j++) {
        $("#img" + j).mousemove(function() {
          $("#preview .jqzoom img").attr("src", $(this).attr("src"));
        });
      }

      $(".pick_color ul li").click(function(event) {
        $(this).addClass("tabs");
        $(this)
          .siblings()
          .removeClass("tabs");
      });
      var tempLength = 0; //临时变量,当前移动的长度
      var viewNum = 5; //设置每次显示图片的个数量
      var moveNum = 2; //每次移动的数量
      var moveTime = 300; //移动速度,毫秒
      var scrollDiv = $(".spec-scroll .items ul"); //进行移动动画的容器
      var scrollItems = $(".spec-scroll .items ul li"); //移动容器里的集合
      var moveLength = scrollItems.eq(0).width() * moveNum; //计算每次移动的长度
      var countLength =
        (scrollItems.length - viewNum) * scrollItems.eq(0).width(); //计算总长度,总个数*单个长度

      //下一张
      $(".spec-scroll .next").bind("click", function() {
        if (tempLength < countLength) {
          if (countLength - tempLength > moveLength) {
            scrollDiv.animate({ left: "-=" + moveLength + "px" }, moveTime);
            tempLength += moveLength;
          } else {
            scrollDiv.animate(
              { left: "-=" + (countLength - tempLength) + "px" },
              moveTime
            );
            tempLength += countLength - tempLength;
          }
        }
      });
      //上一张
      $(".spec-scroll .prev").bind("click", function() {
        if (tempLength > 0) {
          if (tempLength > moveLength) {
            scrollDiv.animate({ left: "+=" + moveLength + "px" }, moveTime);
            tempLength -= moveLength;
          } else {
            scrollDiv.animate({ left: "+=" + tempLength + "px" }, moveTime);
            tempLength = 0;
          }
        }
      });
    }
    //分界
  }
};
</script>




<style>
.details_all .el-tabs__item {
  font-size: 18px;
  text-align: center;
  height: 55px;
  line-height: 55px;
  width: 160px;
  padding-right: 20px;
  font-weight: bold;
}
.details_all .el-tabs__active-bar {
}
</style>


<style lang="scss" scoped>
@import "../../assets/css/base.css";
.w {
  width: 1200px;
  margin: 0 auto;
  background-color: white;
}
.right_xin {
  overflow: hidden;
  display: inline-block;
  margin-left: 23px;
  width: 67%;
}
.right_xin .title_text {
  width: 770px;
  font-size: 20px;
  font-family: MicrosoftYaHei-Bold,微软雅黑;
  font-weight: bold;
  color: #666666;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
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
.pick_color {
  position: relative;
  margin-top: 20px;
}
.pick_color ul {
  width: 90%;
  display: inline-block;
  margin-bottom: 0;
  margin-left: 25px;
}
.pick_color ul li {
  list-style: none;
  display: inline-block;
  margin-right: 30px;
  cursor: pointer;
  margin-bottom: 20px;
  border: 1px dashed;
}
.pick_color ul li span {
  clear: both;
  min-width: 50px;
  height: 50px;
  line-height: 50px;
  display: inline-block;
  text-align: center;
  background-color: #f1f1f1;
  font-size: 14px;
}
.tabs {
  border: 2px solid #3d91e7 !important;
  overflow: unset;
}
.sku_tu {
  width: 50px;
  height: 50px;
  display: inline-block;
  float: left;
}
.cartridge {
  .cartridge_a {
    width: 50%;
    font-size: 14px;
    display: inline-block;
    margin-left: 25px;
    .overstriking {
      font-weight: bold;
    }
    .cartridge_a_num {
      font-size: 14px;
      margin-top: 10px;
      span {
        font-weight: bold;
      }
      input {
        border: 1px solid rgba(61, 145, 231, 1);
        height: 26px;
      }
    }
  }
  .cartridge_b {
    width: 35%;
    display: inline-block;
    height: 50px;
    float: right;
    .shoppingCar {
      background-color: #eab13f;
      color: white;
      padding: 15px;
      border-radius: 6px;
      font-size: 15px;
      font-weight: bold;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
      margin-right: 25px;
    }
    .noShoppingCar {
      background-color: #cccccc;
      color: white;
      padding: 15px;
      border-radius: 6px;
      font-size: 15px;
      font-weight: bold;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
      margin-right: 25px;
      cursor: unset;
    }
    .buy {
      background-color: #ff0303;
      color: white;
      padding: 15px;
      border-radius: 6px;
      font-size: 15px;
      font-weight: bold;
      -webkit-box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    }
    .nobuy{
      background-color: #cccccc;
      color: white;
      padding: 15px;
      border-radius: 6px;
      font-size: 15px;
      font-weight: bold;
      -webkit-box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2); 
      cursor: unset;
    }
  }
}
.matching {
  width: 1200px;
  margin: 0 auto;
  padding: 15px 0;
  border-top: 1px solid #f1f1f1;
  border-bottom: 1px solid #f1f1f1;
}
.matching .matching_a {
  padding-left: 10px;
}
.matching .matching_a span {
  height: 32px;
  font-size: 14px;
  font-weight: 400;
  line-height: 32px;
  width: 84px;
  text-align: center;
  display: inline-block;
  font-family: MicrosoftYaHei,微软雅黑;
  border-left: 5px solid #3d91e7;
}
.yxsp {
  position: relative;
}
.catalogue {
  width: 95%;
  display: inline-flex;
  min-height: 240px;
  overflow-y: hidden;
  padding-left: 0;
  li {
    cursor: pointer;
    display: inline-block;
    margin: 10px 10px 0px 10px;
    border: 1px solid rgba(235, 235, 235, 1);
    padding: 10px;
    .catalogue_li {
      position: relative;
      .catalogue_img {
        width: 180px;
        height: 200px;
        display: inline-block;
      }
    }
    label {
      display: inline-block;
      max-width: 100%;
      font-weight: 700;
      font-size: 14px;
      span {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        width: 170px;
        display: inline-block;
        font-family: MicrosoftYaHei,微软雅黑;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
      }
    }
    p {
      padding-top: 5px;
      font-family: MicrosoftYaHei,微软雅黑;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      font-size: 14px;
      span {
        color: red !important;
        margin-right: 5px;
        font-size: 18px;
        font-family: MicrosoftYaHei,微软雅黑;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
      }
    }
  }
}
.looks_more {
  width: 16px;
  height: 125px;
  font-size: 16px;
  font-family: MicrosoftYaHei,微软雅黑;
  font-weight: 400;
  display: inline-block;
  position: absolute;
  border: 1px solid;
  padding: 80px 10px;
  top: 50%;
  transform: translateY(-50%);
  right: 30px;
  color: #999999;
  cursor: pointer;
}
.details_all {
  .details_all_a {
    background-color: white;
    padding: 35px 80px 50px 80px;
    border-bottom: 1px solid #ebebeb;
    .details_material {
      font-size: 16px;
      font-family: MicrosoftYaHei,微软雅黑;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      p {
      }
      .details_material_a {
        display: flex;
        justify-content: space-between;
        margin: 40px 0;
        span {
        }
      }
      .details_material_b {
        display: flex;
        justify-content: space-between;
        span {
        }
      }
    }
    .look_details {
      text-align: right;
      margin-top: 30px;
      .look_details_a {
        border: 1px solid rgba(58, 145, 234, 1);
        box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
        border-radius: 3px;
        padding: 8px 25px;
        background: white;
        text-align: right;
        display: inline-block;
        color: #3d91e7;
      }
    }
  }
  .figure {
    padding: 0 15px;
    text-align: center;
    width: 1010px;
    display: inline-block;
    background-color: white;
    ul {
      li {
        img {
        }
        p {
          text-align: left;
        }
      }
    }
  }
}
.discuss {
  padding: 0px 20px;
  li {
    padding: 30px 0px;
    border-bottom: 1px solid #f1f1f1;
    p {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      width: 70%;
      line-height: 30px;
      color: #666666;
      font-size: 16px;
    }
    .tupian {
      width: 70%;
      margin: 30px 0;
      img {
        width: 80px;
        height: 80px;
        display: inline-block;
        margin-right: 30px;
      }
    }
    .changping_message {
      font-size: 15px;
      font-family: MicrosoftYaHei,微软雅黑;
      font-weight: 600;
      color: rgba(51, 51, 51, 1);
      .chang_a {
        margin-left: 60px;
      }
      .chang_b {
        font-size: 12px;
        font-family: MicrosoftYaHei,微软雅黑;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        margin-left: 60px;
      }
      .chang_c {
        font-size: 12px;
        color: #ff6f36;
        font-family: MicrosoftYaHei,微软雅黑;
        font-weight: 400;
        float: right;
        .fenshu {
          font-size: 20px;
        }
      }
    }
  }
}
.extInfo {
  width: 184px;
  min-height: 520px;
  float: right;
  background-color: white;
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


// 零售状态
.saleTrade{
    background-image: url("../../../static/img/detailSaleBg.png");
    background-repeat: no-repeat;
    box-shadow: inset 0px 1px 4px 0px rgba(0, 0, 0, 0.12);
    margin-top: 20px;
    padding-bottom: 18px;
    padding-right: 18px;

    .collectionBox{
        margin-top: 21px;
        padding-top: 18px;
        text-align: right;
       
        .inventory{
           margin-left: 22px; 
        }
    }
    .lingshoujia{
        padding-left: 173px;
        padding-top: 10px;
        font-size:14px;
        font-family:MicrosoftYaHei,微软雅黑;
        font-weight:400;
        color:rgba(102,102,102,1);
    }
    .saleNum{
        padding: 23px 0 50px;
        text-align: center;
        font-size:38px;
        font-family:MicrosoftYaHei,微软雅黑;
        font-weight:400;
        color:rgba(102,102,102,1);
    }
    .beingDealer{
        text-align: right;
        span{
            font-size:16px;
            font-family:MicrosoftYaHei,微软雅黑;
            font-weight:400;
            color:rgba(135,135,135,1);
        }
        i{
            padding-left: 10px;
            font-size:16px;
            font-family:MicrosoftYaHei,微软雅黑-Bold;
            font-weight:bold;
            color:rgba(85,157,231,1);
            cursor: pointer;
        }
    }
}

// 不显示价格状态
.noPrice{
    background-color: #F0F0F0;
    padding-right: 23px;
    position: relative;
    .bgdiv{
        position: absolute;
        width: 220px;
        height: 168px;
        top:50%;
        transform: translateY(-50%);
        img{
            width: 100%;
            height: 100%;
        }
       
    }
    .collectionBox{
        margin-top: 21px;
        padding-top: 18px;
        text-align: right;
       
        .inventory{
           margin-left: 22px; 
        }
    }
    .tipsTxt{
        padding: 50px 0;
        text-align: center;
        font-size:20px;
        font-family:MicrosoftYaHei,微软雅黑;
        font-weight:400;
        color:rgba(102,102,102,1);
    }
    .beingDealer{
        text-align: right;
        padding-bottom: 17px;
        span{
            font-size:16px;
            font-family:MicrosoftYaHei,微软雅黑;
            font-weight:400;
            color:rgba(135,135,135,1);
        }
        i{
            padding-left: 10px;
            font-size:16px;
            font-family:MicrosoftYaHei,微软雅黑-Bold;
            font-weight:bold;
            color:rgba(85,157,231,1);
            cursor: pointer;
        }
    }
}

.collectionBox i{
    cursor: pointer;
}

.shoppingCar:disabled{
    background: #ccc;
}




</style>