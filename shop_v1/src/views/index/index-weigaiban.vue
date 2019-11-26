<template>
  <div class="indexBg" style="overflow: hidden;" v-if="showUserInfo">
    <Headers></Headers>
    <!-- QQ客服聊天 -->
    <!-- <a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=958022159&site=qq&menu=yes" style="position:fixed;right:0;top:50%;z-index:9999"><img border="0" src="http://wpa.qq.com/pa?p=2:958022159:41" alt="点击这里给我发消息" title="点击这里给我发消息"/></a> -->

    <div class="indexPage" style="padding-top:10px">
      <div class="bgBlock"></div>
      <!-- 导航部分开始 -->
      <div class="indexNavBox">
        <div class="indexNav clearfix w">
          <!-- 商品分类详情开始 隐藏 -->
          <!-- 笔 -->

          <!-- <div
            class="hiddenGoods"
            v-show="scopeDetail"
            @mouseover="handleShow('0')"
            @mouseout="handleHidden('0')"
          >
            <div class="clickBtn">
              <span class="leftArrow"></span>
              <span class="rightArrow"></span>
            </div>
            <ul class="clearfix">
              <li
                :title="item.name"
                v-for="(item,index) in scopeList"
                :key="index"
                @click="toAllGoods(item.name)"
              >{{item.name}}</li>
            </ul>

          </div> -->
          <div v-for="(goodsSpe,speIndex) in  goodsSpeList" :key="speIndex">
          <div
            class="hiddenGoods"
            v-show="goodSpeShowList[speIndex]"
            @mouseover="handleGoodsSpeShow(speIndex)"
            @mouseout="handleGoodsSpeHidden(speIndex)"
          >
            <div class=" hiddenTitle">
                  <span class="indexBorderLeft"></span>
                  <i>{{goodsSpe.name}}</i>
                </div>
            <ul class="clearfix">
              <li
                :title="item.name"
                v-for="(item,index) in goodsSpe.goodsSpecificationValues"
                :key="index"
                @click="toAllGoods(speIndex,item.name)"
              >{{item.name}}</li>
            </ul>
          </div>
          </div>
          <!-- 笔配件 -->

          <!-- <div
            class="hiddenGoods"
            v-show="mountingsScopeDetail"
            @mouseover="handleShow('1')"
            @mouseout="handleHidden('1')"
          >
            <div class="clickBtn">
              <span class="leftArrow"></span>
              <span class="rightArrow"></span>
            </div>
            <ul class="clearfix">
              <li
                :title="item.name"
                v-for="(item,index) in mountingsScopeList"
                :key="index"
                @click="toAllGoods(item.name)"
              >{{item.name}}</li>
            </ul>

          </div>-->
          <!-- 笔芯 -->

          <!-- <div
            class="hiddenGoods"
            v-show="cartridgeScopeDetail"
            @mouseover="handleShow('2')"
            @mouseout="handleHidden('2')"
          >
            <div class="clickBtn">
              <span class="leftArrow"></span>
              <span class="rightArrow"></span>
            </div>
            <ul class="clearfix">
              <li
                :title="item.name"
                v-for="(item,index) in cartridgeScopeList"
                :key="index"
                @click="toAllGoods(item.name)"
              >{{item.name}}</li>
            </ul>

          </div>-->
          <!-- 商品分类详情结束 隐藏 -->

          <!-- 商品分类开始 -->
          <div class="sortList fl">
            <!-- 笔分类 -->

            <!-- <div class="sortDetail" @mouseover="handleShow('0')" @mouseout="handleHidden('0')">
              <div class="sortTitle">
                <span class="indexBorderLeft"></span>
                <i>成品笔</i>
              </div>
              <ul class="listDetail clearfix">
                <li
                  v-for="(scopeShow,scopeShowIndex) in scopeShowList"
                  :key="scopeShowIndex"
                  @click="toAllGoods(scopeShow.name)"
                >
                  <span :title="scopeShow.name">{{scopeShow.name}}</span>
                </li>
              </ul>
            </div>-->
            <div v-for="(goodsSpe,speIndex) in  goodsSpeList" :key="speIndex">
              <div
                class="sortDetail"
                @mouseover="handleGoodsSpeShow(speIndex)"
                @mouseout="handleGoodsSpeHidden(speIndex)"
                v-if="goodsSpeList.length > 1"
              >
                <div class="sortTitle">
                  <span class="indexBorderLeft"></span>
                  <i>{{goodsSpe.name}}</i>
                </div>
                <ul class="listDetail clearfix">
                  <div v-for="(item,index) in goodsSpe.goodsSpecificationValues" :key="index">
                    <li @click="toAllGoods(speIndex,item.name)" v-if="index < 3">
                      <span :title="item.name">{{item.name}}</span>
                    </li>
                  </div>
                </ul>
              </div>
            </div>

            <!-- 笔配件 -->


            <!-- <div class="sortDetail" @mouseover="handleShow('1')" @mouseout="handleHidden('1')">
              <div class="sortTitle">
                <span class="indexBorderLeft"></span>
                <i>笔配件</i>
              </div>
              <ul class="listDetail clearfix">
                <li
                  v-for="(scopeShow,scopeShowIndex) in mountingsScopeShowList"
                  :key="scopeShowIndex"
                  @click="toAllGoods(scopeShow.name)"
                >
                  <span :title="scopeShow.name">{{scopeShow.name}}</span>
                </li>
              </ul>

            </div>-->

            <!-- 笔芯 -->


            <!-- <div class="sortDetail" @mouseover="handleShow('2')" @mouseout="handleHidden('2')">
              <div class="sortTitle">
                <span class="indexBorderLeft"></span>
                <i>笔芯</i>
              </div>
              <ul class="listDetail clearfix">
                <li
                  v-for="(scopeShow,scopeShowIndex) in cartridgeScopeShowList"
                  :key="scopeShowIndex"
                  @click="toAllGoods(scopeShow.name)"
                >
                  <span :title="scopeShow.name">{{scopeShow.name}}</span>
                </li>
              </ul>

            </div>-->
          </div>
          <!-- 商品分类结束 -->
          <!-- 首页轮播开始 -->
          <div class="indexSwiper fl">
            <div class="block">
              <el-carousel trigger="click" height="460px">
                <el-carousel-item v-for="(item,index) in swiperList" :key="index">
                  <div>
                    <img :src=" item" alt />
                  </div>
                </el-carousel-item>
              </el-carousel>
            </div>
          </div>
          <!-- 首页轮播结束 -->
          <!-- 导航右侧部分开始 -->
          <div class="indexNavRight fl">
            <!-- 首页登录开始 -->
            <!-- 未登录 -->
            <div class="indexLogin" v-if="noLogin" v-cloak>
              <div class="headPortrait">
                <img src="../../../static/img/headPortrait.png" alt />
              </div>
              <div class="userName userLogin">
                <i class="iconfont icon-yonghu" style="float:left;"></i>
                <input
                  type="text"
                  placeholder="请输入账号"
                  v-model="user.username"
                  autocomplete="new-username"
                />
              </div>
              <div class="userName">
                <i class="iconfont icon-yidongduanicon-"></i>
                <span class="loginBorder"></span>
                <input type="password" style="display:none" />
                <input
                  type="password"
                  placeholder="请输入密码"
                  v-model="user.password"
                  autocomplete="new-password"
                />
              </div>
              <div class="passwordRem clearfix">
                <div class="passwordRemLeft fl">
                  <input type="checkbox" v-model="isRemember" id="password" />
                  <label for="password">记住密码</label>
                </div>
                <div class="passwordRemRight fr">
                  <a @click="$router.push('/lostPassword')">忘记密码?</a>
                </div>
              </div>
              <div class="indexLoginBtn">
                <input
                  type="button"
                  value="注册"
                  @click="$router.push('/register')"
                  class="registerBtn"
                />

                <input
                  type="button"
                  @click="indexLogin()"
                  value="登录"
                  style="background: #71ABE7; color: #fff;"
                />
              </div>
            </div>
            <!-- 已登录 -->
            <div class="indexLoginShow" v-else>
              <div class="normalLeval">
                <img src="../../../static/img/normaPersonl.png" alt v-if="isCommon" />
                <img
                  src="../../../static/img/dealerVip.png"
                  alt
                  v-if="userInfo.level == '88' && !isCommon"
                />
                <img
                  src="../../../static/img/dobuleVip.png"
                  alt
                  v-if="userInfo.level == '100' && !isCommon"
                />
                <img
                  src="../../../static/img/oneLeval.png"
                  alt
                  v-if="userInfo.level == '1' && !isCommon"
                />
                <img
                  src="../../../static/img/superVip.png"
                  alt
                  v-if="userInfo.level == '89' && !isCommon"
                />
                <img
                  src="../../../static/img/twoLeval.png"
                  alt
                  v-if="userInfo.level == '2' && !isCommon"
                />

                <!-- <span class="vipLeval">{{userInfo.level}}</span> -->
                <span class="vipLeval">{{isCommon? '普通会员':formatLevel(userInfo.level)}}</span>
              </div>
              <div class="wecomle">
                <p>
                  尊贵的:
                  <span class="NumberName">{{userInfo.nickname}}</span>
                </p>
                <p>欢迎您！</p>
              </div>
              <div class="centerBox">
                <input type="button" @click="toUserInfo()" value="个人中心" />
                <input
                  type="button"
                  value="注销"
                  style="background:#f8fbfe;color:#999;border-color:#999"
                  @click="exit"
                />
              </div>
            </div>
            <!-- 首页登录结束 -->
            <!--首页公告栏开始  -->
            <div class="indexNotice" v-if="noticeShowList.length > 0">
              <div class="indexNoticeTitle">
                <i class="iconfont icon-gonggao"></i>
                <span>公告</span>
              </div>
              <div class="indexNoticeCon scroll">
                <ul class="scroll1" ref="rollul" :class="{'anim':animate}">
                  <div data-v-498142aa class="el-carousel el-carousel--horizontal">
                    <div class="el-carousel__container" style="height: 400px;overflow: hidden">
                      <div
                        data-v-498142aa
                        class="el-carousel__item"
                        :style="'transform: translateY('+(noticeShow*20-20)+'px) scale(1);' + (noticeShow == noticeList.length-1 ? 'display: none':'')"
                        v-for="(noticeShow,noticeShowIndex) in noticeShowList "
                        :key="noticeShowIndex"
                      >
                        <a>
                          <li
                            @mouseover="stopChangeNoticeShow()"
                            @mouseout="startChangeNoticeShow()"
                            @click="$router.push('/notice?id='+noticeList[noticeShowIndex].id)"
                          >{{noticeList[noticeShowIndex].title}}</li>
                        </a>
                      </div>
                    </div>
                  </div>
                </ul>

                <!-- <ul id="scroll2"></ul> -->
              </div>
            </div>
            <!--首页公告栏结束  -->
          </div>
          <!-- 导航右侧部分结束 -->
        </div>
      </div>
      <!-- 导航部分结束 -->
      <!-- 最新商品开始 -->
      <div class="newProduct w clearfix pr" v-if="activityList.length > 0">
        <!-- <div class="newProductTitle clearfix">
          <div class="newProductTitle_left fl">
            <span>{{activityList[1].name}}</span>
            <i>NEW PRODUCT</i>
          </div>
          <div class="newProductTitle_more fr">
            <span>更多</span>
          </div>
        </div>-->
        <div class="newProductLeft fl">
          <h2>最新商品</h2>
          <ul>
            <li @click="toDetail(newProductLeft)">
              <div class="imgBox">
                <img :src="newProductLeft.img" alt />
              </div>
              <h3>{{newProductLeft.title}}</h3>
            </li>
          </ul>
        </div>
        <div class="newProductContent fr">
          <ul class="clearfix">
            <li
              v-for="(newItemt,newIndex) in activityList[1].goodsList"
              :key="newIndex"
              @click="toDetail(newItemt)"
            >
              <img :src="newItemt.img[0]" alt />
              <h3>{{newItemt.title}}</h3>
            </li>
          </ul>
        </div>
        <div class="moreBox">
          <router-link to="newGoods" style="color:#3d91e7">更多>></router-link>
        </div>
      </div>
      <!-- 最新商品结束-->
      <!-- 中间推荐商品部分开始 -->
      <div class="middleProduct w clearfix">
        <!-- 排行榜 -->
        <div class="rankingList fl">
          <div class="ListTitle">
            <span class="middleTitle">排行榜</span>
            <!-- <i class="bigSquare"></i>
            <i class="smallSquare"></i>-->
          </div>
          <div class="rankingList_content" v-if="rangLink != null  && rangLink.length > 0">
            <ul class="rankingList_content_title">
              <li
                v-for="(titleItem,titleIndex) in rangTitle"
                :key="titleIndex"
                :class="{'active':titleShow==titleItem.id}"
                @click="changeRanking(titleItem,titleItem.id)"
              >{{titleItem.name}}</li>
            </ul>
            <div class="rankDiv">
              <div class="innerBox clearfix">
                <div class="block">
                  <div data-v-498142aa class="el-carousel el-carousel--horizontal">
                    <div class="el-carousel__container" style="height: 343px;">
                      <div
                        data-v-498142aa
                        :class="showRanking ? 'el-carousel__item is-active is-animating':'el-carousel__item is-animating'"
                        :style="showRanking ? 'transform: translateX(0px) scale(1);':'transform: translateX(-756px) scale(1);'"
                      >
                        <ul class="rankingList_content_detail">
                          <li
                            class="clearfix"
                            v-for="item in 3"
                            :key="item"
                            @click="toDetail(rangLink[item-1])"
                          >
                            <div class="leftDiv fl">
                              <img :src="rangLink[item-1].img[0]" alt />
                            </div>
                            <div class="rightDiv fl">
                              <div class="number">NO.{{item}}</div>
                              <div class="goodsTitle">{{rangLink[item-1].title}}</div>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div
                        data-v-498142aa
                        :class="!showRanking ? 'el-carousel__item is-active is-animating':'el-carousel__item is-animating'"
                        :style="!showRanking ? 'transform: translateX(0px) scale(1);':'transform: translateX(756px) scale(1);'"
                      >
                        <ul class="rankingList_content_detail">
                          <li
                            class="clearfix"
                            v-for="item in 3"
                            :key="item"
                            @click="toDetail(rangLink[item+2])"
                          >
                            <div class="leftDiv fl">
                              <img :src="rangLink[item+2].img[0]" alt />
                            </div>
                            <div class="rightDiv fl">
                              <div class="number">NO.{{item+3}}</div>
                              <div class="goodsTitle">{{rangLink[item+2].title}}</div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr width="90%" color="#F0F0F0" />
            <ul class="dotsBox" style="padding-bottom:11px;">
              <li
                v-for="(dotitem ,dotindex) in dotsList "
                :key="dotindex"
                :class="{'selceted':dotShow==dotindex}"
                @click="handleDot(dotitem ,dotindex)"
              ></li>
            </ul>
          </div>
        </div>
        <!-- 人气商品 -->
        <div class="popularGoods fl" v-if="activityList.length > 0">
          <div class="ListTitle">
            <span class="middleTitle">{{activityList[0].name}}</span>
            <!-- <i class="bigSquare"></i>
            <i class="smallSquare"></i>-->
          </div>
          <div class="popContent clearfix">
            <div class="popContentLeft fl">
              <ul>
                <li
                  v-for="item in 2"
                  :key="item"
                  @click="toDetail(activityList[0].goodsList[item-1])"
                >
                  <img :src="activityList[0].goodsList[item-1].img[0]" alt />
                  <h3>{{activityList[0].goodsList[item-1].title}}</h3>
                </li>
              </ul>
            </div>
            <div class="popContentRight fl">
              <ul>
                <li
                  v-for="item in 3"
                  :key="item"
                  @click="toDetail(activityList[0].goodsList[item+1])"
                >
                  <img :src="activityList[0].goodsList[item+1].img[0]" alt />
                  <h4>{{activityList[0].goodsList[item+1].title}}</h4>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!-- 精选商品 -->
        <div class="merchandiseGoods fl" v-if="activityList.length > 0">
          <div class="ListTitle">
            <span class="middleTitle">精选商品</span>
            <!-- <i class="bigSquare"></i>
            <i class="smallSquare"></i>-->
          </div>
          <div class="merchandiseGoodsCon">
            <div class="block">
              <div data-v-498142aa class="el-carousel el-carousel--horizontal">
                <div class="el-carousel__container" style="height: 378px;">
                  <div
                    data-v-498142aa
                    :class="circleShow ? 'el-carousel__item is-active is-animating':'el-carousel__item is-animating'"
                    :style="circleShow ? 'transform: translateX(0px) scale(1);':'transform: translateX(756px) scale(1);'"
                    style="padding:10px 5px 5px 10px;"
                  >
                    <ul class="clearfix">
                      <li
                        v-for="item in 9"
                        :key="item"
                        @click="toDetail(activityList[3].goodsList[item-1])"
                      >
                        <img :src="activityList[3].goodsList[item-1].img[0]" alt />
                        <h4>{{activityList[3].goodsList[item-1].title}}</h4>
                      </li>
                    </ul>
                  </div>
                  <div
                    data-v-498142aa
                    :class="!circleShow ? 'el-carousel__item is-active is-animating':'el-carousel__item is-animating'"
                    :style="!circleShow ? 'transform: translateX(0px) scale(1);':'transform: translateX(-756px) scale(1);'"
                    style="padding:10px 5px 5px 10px;"
                  >
                    <ul class="clearfix">
                      <li
                        v-for="item in 9"
                        :key="item"
                        @click="toDetail(activityList[3].goodsList[item+8])"
                      >
                        <img :src="activityList[3].goodsList[item+8].img[0]" alt />
                        <h4>{{activityList[3].goodsList[item+8].title}}</h4>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <hr width="90%" color="#F0F0F0" />
            <div class="dotsBox clearfix">
              <!-- <i class="dots"></i>
              <i class="dots"></i>-->
              <i
                class="dots"
                v-for="(chooseitem ,chooseindex) in circleList "
                :key="chooseindex"
                :class="{'selceted':circleShow==chooseindex}"
                @click="handleChoose(chooseitem ,chooseindex)"
              ></i>
            </div>
          </div>
        </div>
      </div>

      <!-- 中间推荐商品部分结束 -->
      <!-- 分割块 -->
      <!-- <div class="division"></div> -->
      <!-- 成品笔开始 -->
      <div class="finishedPen">
        <div class="publicTitle">
          <img src="../../../static/img/chengpinbi.png" alt />
        </div>
        <div class="publicCon pr w">
          <ul class="clearfix">
            <li v-for="(goods,index) in allTypeGoods.goods" :key="index" @click="toDetail(goods)">
              <img :src="goods.img[0]" alt />
              <h4>{{goods.title}}</h4>
            </li>
          </ul>
          <!-- <div class="moreBox">更多>></div> -->
        </div>
      </div>
      <!-- 成品笔结束 -->

      <!-- 分割块 -->
      <!-- <div class="division"></div> -->
      <!-- 笔配件开始 -->
      <div class="finishedPen"  v-if="false">
        <div class="publicTitle">
          <img src="../../../static/img/bipeijian.png" alt />
        </div>
        <div class="publicCon pr w">
          <ul class="clearfix">
            <li
              v-for="(mountings,index) in allTypeGoods.mountings"
              :key="index"
              @click="toDetail(mountings)"
            >
              <img :src="mountings.img[0]" alt />
              <h4>{{mountings.title}}</h4>
            </li>
          </ul>
          <div class="moreBox">更多>></div>
        </div>
      </div>
      <!-- 笔配件结束 -->

      <!-- 分割块 -->
      <!-- <div class="division"></div> -->
      <!-- 笔芯开始 -->

      <div class="finishedPen" v-if="false">
        <div class="publicTitle">
          <img src="../../../static/img/bixin.png" alt />
        </div>
        <div class="publicCon pr w">
          <ul class="clearfix">
            <li
              v-for="(cartridge,index) in allTypeGoods.cartridge"
              :key="index"
              @click="toDetail(cartridge)"
            >
              <img :src="cartridge.img[0]" alt />
              <h4>{{cartridge.title}}</h4>
            </li>
          </ul>
          <div class="moreBox">更多>></div>
        </div>
      </div>
      <!-- 笔芯结束 -->

      <!-- 分割块 -->
      <!-- <div class="division"></div> -->
      <!-- 猜你喜欢 -->
      <div class="guessLike" v-if="guessLikeGoodsList.length > 0">
        <div class="guessLikeTitle">
          <img src="../../../static/img/cainixihuan.png" alt />
        </div>
        <div class="guessLikeContent pr w">
          <ul class="clearfix">
            <li
              v-for="(guessLikeGoods,index) in guessLikeGoodsList"
              :key="index"
              @click="toDetail(guessLikeGoods)"
            >
              <img :src="guessLikeGoods.img[0]" alt />
              <h3>{{guessLikeGoods.title}}</h3>
            </li>
          </ul>

          <!-- <div class="moreBox">更多>></div> -->
        </div>
      </div>
      <!-- 猜你喜欢结束 -->
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import url from "@/serverAPI.config.js";
import Headers from "../../components/headHome";
import Footer from "../../components/footer.vue";
export default {
  components: {
    Headers,
    Footer
  },
  data() {
    return {
      // 轮播图
      swiperList: [
        "../../../static/img/banner1.png",
        "../../../static/img/banner2.png",
        "../../../static/img/banner3.png",
        "../../../static/img/banner4.png"
      ],
      activityList: [],
      // 公告列表
      noticeList: [],
      // 排行列表标题
      rangTitle: [],
      // 排行榜列表
      rangLink: [],
      titleShow: 0,
      //   商品分类详情显示
      sortShow: false,
      // 公告栏动画
      animate: false,
      // 圆点
      dotShow: 0,
      circleShow: 0,
      circleList: ["", ""],
      dotsList: ["", ""],
      showRanking: true,
      scopeList: [],
      scopeShowList: [],
      mountingsScopeList: [],
      mountingsScopeShowList: [],
      cartridgeScopeList: [],
      cartridgeScopeShowList: [],
      noticeShowList: [],
      timerChange: "",
      scopeDetail: false,
      mountingsScopeDetail: false,
      cartridgeScopeDetail: false,
      goodSpeShowList: [],
      allTypeGoods: [],
      guessLikeGoodsList: [],
      noLogin: false,
      userInfo: {},
      user: {},
      isRemember: false,
      showUserInfo: false,
      //   普通会员
      isCommon: false,
      newProductLeft: {},
      goodsSpeList: []
    };
  },
  created() {
    setInterval(this.showNotice, 5000);
    this.getScope();
    this.getGoodsSpe();
    this.getMountingsScope();
    this.getCartridgeScope();
    this.findIndexGoods();
    this.getGuessYouLike();
    this.getUserInfo();
    this.getNoticeList(1, 10);
    console.log(localStorage.getItem("VISITOR"));
    if (!localStorage.getItem("VISITOR")) {
      var VISITOR = this.guid();
      console.log(VISITOR);
      localStorage.setItem("VISITOR", VISITOR);

    }
  },
  mounted() {
    this.getActivity();
  },
  computed: {},
  methods: {
    getActivity() {
      this.$http({
        url: `${url.activity}/index`,
        method: "get"
      }).then(res => {
        if (res.data.code === 20000) {
          var data = res.data.data;
          var list = [];
          data.map(item => {
            item.imgs = JSON.parse(item.imgs);
            item.goodsList.map(item1 => {
              item1.img = JSON.parse(item1.img);
              item1.price = parseFloat(item1.price).toFixed(2);
            });
            if (item.sort == "4") {
              item.goodsList.splice(18, item.goodsList.length - 18);
            }
            if (item.sort == "2") {
              this.newProductLeft = item.goodsList[10];
              item.goodsList.splice(10, item.goodsList.length - 10);
            }
            if (item.sort == "1") {
              item.goodsList.splice(5, item.goodsList.length - 5);
            }
            list[parseInt(item.sort) - 1] = item;
          });
          this.activityList = list;
        }
      });
    },
    toDetail(goods) {
      this.utils.toDetailsss(goods);
    },
    changeRanking(item, index) {
      this.getRankingGoods(item.name);
      this.titleShow = index;
    },
    // 显示商品分类详情
    handleShow(type) {
      if (type == "0") {
        this.scopeDetail = true;
      }
      if (type == "1") {
        this.mountingsScopeDetail = true;
      }
      if (type == "2") {
        this.cartridgeScopeDetail = true;
      }
    },
    handleHidden(type) {
      if (type == "0") {
        this.scopeDetail = false;
      }
      if (type == "1") {
        this.mountingsScopeDetail = false;
      }
      if (type == "2") {
        this.cartridgeScopeDetail = false;
      }
    },

    // 显示商品分类详情
    handleGoodsSpeShow(index) {
      this.goodSpeShowList[index] = true;
      this.$forceUpdate();

      // if (type == "0") {
      //   this.scopeDetail = true;
      // }
      // if (type == "1") {
      //   this.mountingsScopeDetail = true;
      // }
      // if (type == "2") {
      //   this.cartridgeScopeDetail = true;
      // }
    },
    handleGoodsSpeHidden(index) {
      this.goodSpeShowList[index] = false;
      this.$forceUpdate();
      // if (type == "0") {
      //   this.scopeDetail = false;
      // }
      // if (type == "1") {
      //   this.mountingsScopeDetail = false;
      // }
      // if (type == "2") {
      //   this.cartridgeScopeDetail = false;
      // }
    },
    // 公告栏滚动效果
    // showNotice() {
    //   this.animate = true;
    //   setTimeout(() => {
    //     this.noticeList.push(this.noticeList[0]);
    //     this.noticeList.shift();
    //     this.animate = false;
    //   }, 0);
    // },
    // 处理排行榜的切换
    createNoticeShow() {
      var noticeShowList = [];
      for (var i = 0; i < this.noticeList.length; i++) {
        noticeShowList.push(i);
      }
      this.noticeShowList = noticeShowList;
      this.startChangeNoticeShow();
    },
    changeNoticeShow() {
      this.noticeShowList.unshift(
        this.noticeShowList[this.noticeShowList.length - 1]
      );
      this.noticeShowList.pop();
    },
    stopChangeNoticeShow() {
      clearInterval(this.timerChange);
      this.timerChange = null;
    },
    startChangeNoticeShow() {
      this.timerChange = setInterval(this.changeNoticeShow, 2000);
    },
    handleDot(item, index) {
      if (index == "0") {
        this.showRanking = true;
      }
      if (index == "1") {
        this.showRanking = false;
      }
      this.dotShow = index;
    },

    //获取笔分类
    getScope() {
      this.$http({
        url: `${url.scope}`,
        method: "get"
      }).then(res => {
        this.scopeList = res.data.data;
        this.scopeShowList = JSON.parse(JSON.stringify(res.data.data));

        this.scopeShowList.splice(42, this.scopeShowList.length - 42);
        this.rangTitle = JSON.parse(JSON.stringify(res.data.data));
        this.rangTitle.splice(5, this.rangTitle.length - 5);
        this.titleShow = this.rangTitle[0].id;
        this.getRankingGoods(this.rangTitle[0].name);
      });
    },
    getRankingGoods(scope) {
      this.$http({
        url: `${url.findRankingGoods}/${scope}`,
        method: "get"
      }).then(res => {
        if (res.data.code == 20000) {
          this.rangLink = res.data.data;
          console.log(this.rangLink)
          if (this.rangLink.length > 1) {
            this.rangLink.map(item => {
              item.img = JSON.parse(item.img);
            });
          }
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    findIndexGoods() {
      this.$http({
        url: `${url.findIndexGoods}`,
        method: "get"
      }).then(res => {
        if (res.data.code == 20000) {
          this.allTypeGoods = res.data.data;
          if (this.allTypeGoods) {
            // 笔
            if (
              this.allTypeGoods.goods != null &&
              this.allTypeGoods.goods.length > 0
            ) {
              this.allTypeGoods.goods.map(item => {
                item.img = JSON.parse(item.img);
              });
            }
            // 笔配件
            if (
              this.allTypeGoods.mountings != null &&
              this.allTypeGoods.mountings.length > 0
            ) {
              this.allTypeGoods.mountings.map(item => {
                item.img = JSON.parse(item.img);
              });
            }

            //笔芯
            if (
              this.allTypeGoods.cartridge != null &&
              this.allTypeGoods.cartridge.length > 0
            ) {
              this.allTypeGoods.cartridge.map(item => {
                item.img = JSON.parse(item.img);
              });
            }
          }
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    //获取笔配件分类
    getMountingsScope() {
      this.$http({
        url: `${url.mountingsScope}`,
        method: "get"
      })
        .then(res => {
          this.mountingsScopeList = res.data.data;
          this.mountingsScopeShowList = JSON.parse(
            JSON.stringify(res.data.data)
          );
          this.mountingsScopeShowList.splice(
            12,
            this.mountingsScopeShowList.length - 12
          );
        })
        .catch(err => {
          ;
        });
    },
    //获取笔芯分类
    getCartridgeScope() {
      this.$http({
        url: `${url.scope}/cartridgeScope`,
        method: "get"
      }).then(res => {
        this.cartridgeScopeList = res.data.data;
        this.cartridgeScopeShowList = JSON.parse(JSON.stringify(res.data.data));
        this.cartridgeScopeShowList.splice(
          12,
          this.cartridgeScopeShowList.length - 12
        );
      });
    },
    getGuessYouLike() {
      var username = localStorage.getItem("username");
      var VISITOR = localStorage.getItem("VISITOR");
      if (!username && VISITOR) {
        username = VISITOR;
      }
      this.$http({
        url: `${url.guessYouLike}/${username}`,
        method: "get"
      }).then(res => {
        if (res.data.code == 20000) {
          this.guessLikeGoodsList = res.data.data;
          this.guessLikeGoodsList.map(item => {
            item.img = JSON.parse(item.img);
          });
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    toAllGoods(index,scope) {
      this.$router.push("/allGoods?initIndex="+index+"&initSelected=" + scope);
    },
    //处理精选商品切换
    handleChoose(item, index) {
      if (index == "0") {
        this.circleShow = true;
      }
      if (index == "1") {
        this.circleShow = false;
      }
      this.circleShow = index;
    },
    //退出
    exit() {
      this.$confirm("是否退出?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          localStorage.clear();
          this.$message({
            type: "success",
            message: "退出成功!"
          });
          this.getUserInfo();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //个人中心
    toUserInfo() {
      var username = localStorage.getItem("username");
      var password = localStorage.getItem("password");
      var roles = localStorage.getItem("roles");
      var Authorization = localStorage.getItem("Authorization");
      var id = localStorage.getItem("ID");
      if (!username) {
        this.getUserInfo();
        return;
      }
      if (
        localStorage.roles.indexOf("provider") != -1 &&
        this.$route.query.provideruserInfo != "1"
      ) {
        var href = `${url.supplierUrl}/jump?Authorization=${Authorization}&a=${username}&roles=${roles}&id=${id}`;
        window.open(href);
        return;
      }
      if (localStorage.roles.indexOf("dealer") != -1) {
        var href = `${url.dealerUrl}/jump?Authorization=${Authorization}&a=${username}&roles=${roles}&id=${id}`;
        window.open(href);
        return;
      }
      this.$router.push("/userInfo");
    },

    //个人信息
    getUserInfo() {
      if (localStorage.getItem("remember") != "1") {
        if (sessionStorage.getItem("remember") != "1") {
          localStorage.clear();
        }
      }

        let username = localStorage.getItem("username");
        if(username == null || username == ""){
            console.log(username);
            return
        }
      this.$http({
        url: `${url.userInfo}/${username}`,
        method: "get"
      })
        .then(res => {
          if (res.data.code == 20000) {
            this.userInfo = res.data.data;
            if (this.userInfo) {
              this.noLogin = false;
            } else {
              this.noLogin = true;
            }
            console.log(this.userInfo);
          }
          if (localStorage.getItem("roles").indexOf("common") > -1) {
            this.isCommon = true;
          }
          this.showUserInfo = true;
        })
        .catch(res => {
          this.showUserInfo = true;
        });
    },
    //获取公告
    getNoticeList(page, size) {
      this.$http({
        url: `${url.findNotices}/${page}/${size}`,
        method: "get"
      }).then(res => {
        if (res.data.code == 20000) {
          this.noticeList = res.data.data;
          this.noticeList.unshift(this.noticeList[this.noticeList.length - 1]);
          this.noticeList.pop();
          this.createNoticeShow();
        }
      });
    },

    //登录
    indexLogin() {
      this.$http.post(url.login, this.user).then(res => {
        if (res.data.code == 20000) {
          if (this.isRemember) {
            localStorage.Authorization = "Bearer " + res.data.data.token;
            localStorage.username = res.data.data.username;
            localStorage.roles = res.data.data.roles;
            localStorage.ID = res.data.data.id;
            localStorage.remember = "1";
          } else {
            localStorage.Authorization = "Bearer " + res.data.data.token;
            localStorage.username = res.data.data.username;
            localStorage.roles = res.data.data.roles;
            localStorage.ID = res.data.data.id;
            localStorage.remember = "0";
            sessionStorage.remember = "1";
          }
          this.getUserInfo();
        } else {

          if (document.querySelectorAll(".el-message--error").length < 1) {
            this.$message.error(res.data.message);
          }
        }
      });
    },
    // 注销
    exit() {
      let _that = this;
      this.$confirm("是否退出?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "退出成功!"
          });
          localStorage.clear();
          location.href = `${url.shopUrl}/`;
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },

    formatLevel(str) {
      if (str == "1") {
        return "一级会员";
      }
      if (str == "2") {
        return "二级会员";
      }
      if (str == "88") {
        return "超级会员";
      }
      if (str == "89") {
        return "超级会员";
      }
      if (str == "100") {
        return "至尊会员";
      }
    },
    guid() {
      return (
        this.S4() +
        this.S4() +
        this.S4() +
        this.S4() +
        this.S4() +
        this.S4() +
        this.S4() +
        this.S4()
      );
    },
    S4() {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    },
    //获取商品规格
    getGoodsSpe() {
      this.$http({
        url: `${url.GoodsSpecification}`,
        method: "get"
      }).then(res => {
        if (res.data.code == 20000) {
          this.goodsSpeList = res.data.data;
          this.goodsSpeList.map(item => {
            this.goodSpeShowList.push(false);
          });
          console.log(this.goodsSpeList);
        }
      });
    }
  }
};
</script>




<style  lang="scss" scoped>
// 商城主题色
$color: #3d91e7;
.w {
  width: 1200px;
  margin: 0 auto;
}
// 浮动
.fl {
  float: left;
}
.fr {
  float: right;
}
.active {
  color: $color !important;
}

.anim {
  margin-top: -16px;
  transition: all 3s;
}
//复选框样式
label {
  display: inline-block;
  position: relative;
  padding-left: 20px;
  cursor: pointer;
}
label::before {
  display: inline-block;
  position: absolute;
  left: 0;
  content: "";
  width: 12px;
  height: 12px;
  border: 1px solid $color;
  margin-right: 5px;
  color: $color;
}
input[type="checkbox"] {
  display: none;
}
input[type="checkbox"]:checked + label::before {
  content: "✔";
  text-align: center;
  line-height: 12px;
}

// 分割块
.division {
  margin-top: 40px;
  height: 16px;
  background: rgba(240, 240, 240, 1);
}

// 小圆点
.dotsBox {
  margin: auto;
  text-align: center;

  li {
    display: inline-block !important;
    width: 10px !important;
    height: 10px !important;
    //   background-color: $color;
    border-radius: 50%;
    border: 1px solid #999;
    cursor: pointer;
    margin-right: 6px;
  }
  .selceted {
    background-color: $color;
  }
}

.bgBlock {
  width: 100%;
  height: 120px;
  background: rgba(240, 240, 240, 1);
  position: absolute;
  top: 1006px;
  left: 0;
  z-index: -1;
}

.indexNavBox {
  background-color: #f0f0f0;
  padding: 11px 0 9px;
}

.indexPage {
  box-sizing: border-box;
  position: relative;
  //   width: 1200px;
  //   margin: auto;
  //   overflow: hidden;
  // 导航部分开始
  .indexNav {
    //   商品分类详情隐藏
    position: relative;
    .hiddenGoods {
      width: 745px;
      height: 460px;
      box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.12);
      position: absolute;
      z-index: 10;
      background: #fff;
      top: 0;
      left: 222px;
      ul {
        padding: 8px 15px;
        li {
          position: relative;
        display: inline-block;
        // width: 10%;
        text-align: center;
    //     text-overflow: ellipsis;
    //         white-space: nowrap;
    // overflow: hidden;
        padding: 6px  10px;
        border: 0;
        margin: 10px 20px;
        background-color:  #7CBCFC;
        color:#fff;
        font-size: 12px;
        cursor: pointer;
        }
        //  li::before{
        // content: '';
        // position: absolute;
        // top: 0;
        // right: 0;
        // bottom: 0;
        // left: 0;
        // z-index: -1;
        // background-color: #7CBCFC;
        // transform: skew(30deg);
        // border-radius: 4px;

    // }
      }
      .clickBtn {
      }
    }

.hiddenTitle{
         font-size: 0;
        padding-bottom: 5px;
        height: 70px;
        line-height: 70px;
        padding-left: 32px;
        border-bottom: 1px solid #F0F0F0;
        margin: 0 12px;
        .indexBorderLeft {
          display: inline-block;
          width: 2px;
          height: 12px;
          background: $color;
          margin-right: 12px;
        }
        i {
            height:16px;
            font-size:16px;
            font-family:MicrosoftYaHei;
            font-weight:400;
            color:rgba(102,102,102,1);

        }
}

      .sortTitle {
        font-size: 0;

        padding-bottom: 5px;
        .indexBorderLeft {
          display: inline-block;
          width: 2px;
          height: 12px;
          background: $color;
          margin-right: 12px;
        }
        i {
          font-size: 14px;
         font-family: MicrosoftYaHeiLight;
          font-weight: 300;
          color: #000;
          cursor: pointer;
        }
      }

    // 商品分类开始
    .sortList {
      padding-left: 17px;
      width: 220px;
      background-color: #fff;
      box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.16);
      border-radius: 2px;
      padding-top: 22px;
      margin-right: 12px;
      min-height: 460px;

      .listDetail {
        li {
          float: left;
          width: 30%;
          font-size: 12px;
         font-family: MicrosoftYaHeiLight;
          font-weight: 300;
          color: #999999;

          text-align: center;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          padding-right: 10px;
          padding-bottom: 13px;
          span {
            cursor: pointer;
          }
        }
      }
    }
    // 商品分类结束

    //   首页轮播开始
    .indexSwiper {
      width: 733px;
      box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.16);
      margin-right: 12px;
      img {
        width: 733px;
        height: 460px;
        cursor: pointer;
      }
    }
    //   首页轮播结束

    // 导航右侧部分开始
    .indexNavRight {
      //已登录页面
      .indexLoginShow {
        background-color: #fff;
        padding-top: 20px;
        min-height: 276px;
        background-image: url("../../../static/img/indexLoginBg.png");
        .normalLeval {
          margin: auto;
          width: 74px;
          height: 74px;
          margin-bottom: 30px;
          text-align: center;
          //   border: 6px solid #ebf4fd;
          //   border-radius: 50%;
          //   line-height: 74px;
          //   text-align: center;
          //   background-color: #d9eafb;
          //   color: #fff;
          //   font-size: 0;
          img {
            display: block;
            width: 100%;
            height: 100%;
            margin-bottom: 8px;
          }
          .vipLeval {
            color: #3d91e7;
            font-size: 14px;
            font-family: MicrosoftYaHei;
            font-weight: 400;
            color: rgba(61, 145, 231, 1);
            text-align: center;
          }

          .leval {
            font-size: 16px;
            font-family: Adobe Heiti Std R;
          }
          .levalNum {
            font-size: 32px;
            font-family: Adobe Heiti Std R;
          }
        }
        .wecomle {
          padding-top: 24px;
          p {
            text-align: center;
            font-size: 14px;
            font-family: MicrosoftYaHei;
            font-weight: 400;
            color: rgba(102, 102, 102, 1);
            padding-bottom: 10px;
            // width: 200px;
          }
          .NumberName {
            padding: 0 5px;
          }
        }
        .centerBox {
          text-align: center;
          padding-top: 10px;
          input {
            width: 72px;
            height: 24px;
            background: rgba(61, 145, 231, 0.12);
            border: 1px solid rgba(61, 145, 231, 0.3);
            border-radius: 4px;
            font-size: 12px;
           font-family: MicrosoftYaHeiLight;
            font-weight: 300;
            color: rgba(61, 145, 231, 1);
            cursor: pointer;
          }
        }
      }

      // 首页登录开始
      .indexLogin {
        width: 220px;
        box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.14);
        border-radius: 2px;
        padding: 17px 20px 0 18px;
        background-color: #fff;
        .headPortrait {
          margin: auto;
          width: 94px;
          height: 94px;
          margin-bottom: 16px;
        }
        i {
          color: $color;
        }
        .userLogin {
          margin-bottom: 14px;
        }
        .userName {
          width: 182px;
          height: 28px;
          border: 1px solid rgba(61, 145, 231, 0.12);
          border-radius: 4px;
          line-height: 28px;

          // line-height: 28px;
          padding-left: 16px;
          input {
            height: 100%;
            background-color: #fff !important;
            float: right;

          }
          .loginBorder {
            width: 1px;
            height: 12px;
            background: rgba(240, 240, 240, 1);
          }
        }
        .passwordRem {
          padding-top: 8px;
          font-size: 12px;
          font-family: SourceHanSansCN-Regular;
          font-weight: 400;
          color: rgba(192, 192, 192, 1);
          a {
            color: inherit;
          }
        }
        .indexLoginBtn {
          padding: 19px 18px 12px;
          input {
            width: 60px;
            height: 24px;
            background: rgba(61, 145, 231, 0.12);
            border: 1px solid rgba(61, 145, 231, 0.3);
            border-radius: 4px;
            font-size: 12px;
           font-family: MicrosoftYaHeiLight;
            font-weight: 300;
            color: $color;
            cursor: pointer;
          }
          .registerBtn {
            margin-right: 14px;
          }
        }
      }
      // 首页登录结束
      // 首页公告开始
      .indexNotice {
        margin-top: 8px;
        width: 220px;
        box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.14);
        border-radius: 2px;
        padding-bottom: 5px;
        background-color: #fff;
        .indexNoticeTitle {
          text-align: center;
          padding: 8px 0 8px;
          font-size: 14px;
         font-family: MicrosoftYaHeiLight;
          font-weight: 300;
          color: $color;
        }
        .indexNoticeCon {
          padding-left: 17px;
          padding-right: 43px;
          ul {
            height: 136px;
            overflow: hidden;

            li {
              padding-top: 8px;
              font-size: 12px;
             font-family: MicrosoftYaHeiLight;
              font-weight: 300;
              color: rgba(153, 153, 153, 1);
              text-overflow: ellipsis;
              white-space: nowrap;
              // width: 100%;
              overflow: hidden;
              cursor: pointer;
            }
            li:nth-child(1) {
              padding-top: 0;
            }
          }
        }
      }
      // 首页公告结束
    }
    // 导航右侧部分结束
  }
  // 导航部分结束
  // 最新商品开始
  .newProduct {
    //   background-image: url("../../../static/img/newProductBg.png");
    //   background-repeat: no-repeat;
    box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.12);
    margin-top: 10px;
    padding-bottom: 6px;

    .newProductTitle {
      padding: 21px 8px 18px 16px;
      .newProductTitle_left {
        span {
          font-size: 16px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: $color;
          padding-right: 8px;
        }
        i {
          font-size: 16px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: #cccccc;
        }
      }
      .newProductTitle_more {
        font-size: 12px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        cursor: pointer;
      }
    }
    .newProductLeft {
      h2 {
        height: 86px;
        background-image: url("../../../static/img/newProductBg.png");
        font-size: 20px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(0, 114, 231, 1);
        padding-left: 40px;
        padding-top: 21px;
      }
      ul {
        li {
          width: 211px;
          margin-left: 15px;
          padding: 20px 0;
          box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.12);
          cursor: pointer;
          .imgBox {
            margin: 0 auto;
            width: 187px;
            height: 163px;
            box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
            img {
              width: 100%;
              height: 100%;
            }
          }
          h3 {
            padding: 43px 36px;
            font-size: 16px;
            font-family: MicrosoftYaHei;
            font-weight: 400;
            color: rgba(102, 102, 102, 1);
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            text-align: center;
          }
        }
        li:hover {
          outline: 1px solid #cce0f3;
        }
      }
    }

    .newProductContent {
      width: 959px;
      padding-top: 28px;

      ul {
        li {
          float: left;
          width: 172px;
          //   height: 186px;
          box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.12);
          padding-top: 15px;
          margin-right: 18px;
          margin-bottom: 16px;
          cursor: pointer;
          img {
            display: block;
            width: 154px;
            height: 133px;
            margin: auto;
          }
          h3 {
            padding: 8px 50px 19px 53px;
            font-size: 10px;
            font-family: MicrosoftYaHei;
            font-weight: 400;
            color: rgba(102, 102, 102, 1);
            text-overflow: ellipsis;
            white-space: nowrap;
            // width: 100%;
            overflow: hidden;
          }
        }
        li:nth-child(5n) {
          margin-right: 0;
        }
        li:hover {
          // box-shadow: 12px 7px 15px 0px rgba(0, 0, 0, 0.12);
          outline: 1px solid #cce0f3;
        }
      }
    }
  }
  // 最新商品结束
  // 中间推荐商品部分开始
  .middleProduct {
    //   width: 1198px;
    margin-top: 56px;
    // overflow: hidden;
    position: relative;

    //   排行榜
    .rankingList {
      position: relative;
      margin-right: 30px;
      padding-top: 70px;
      width: 378px;
      box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.12);
      background: #fff;
      .rankingList_content {
        position: relative;
        .rankingList_content_title {
          height: 32px;
          line-height: 32px;
          padding: 0 28px 10px 20px;
          background-color: #f6f6f6;
          li {
            float: left;
            padding-right: 15px;
            font-size: 14px;
            font-family: MicrosoftYaHei;
            font-weight: 400;
            color: rgba(102, 102, 102, 1);
            cursor: pointer;
          }
        }
        .rankDiv {
          width: 100%;
          overflow: hidden;
        }
        .innerBox {
          width: 200%;
        }
        .rankingList_content_detail {
          li {
            padding-top: 18px;
            padding-left: 14px;
            cursor: pointer;
            padding-bottom: 8px;

            .leftDiv {
              width: 97px;
              height: 88px;
              box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.12);
              img {
                width: 100%;
                height: 100%;
              }
            }
            .rightDiv {
              padding-left: 9px;
              //   padding-bottom: 12px;
              .number {
                padding-top: 6px;
                padding-bottom: 12px;
                font-size: 22px;
                font-family: MicrosoftYaHei;
                font-weight: 400;
                font-style: italic;
                color: rgba(231, 66, 64, 1);
              }
              .goodsTitle {
                width: 210px;
                //   height:32px;
                font-size: 14px;
                font-family: MicrosoftYaHei;
                font-weight: 400;
                color: rgba(102, 102, 102, 1);
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
              }
            }
          }
          li:hover {
            background-color: rgba(246, 246, 246, 1);
          }
        }
      }
    }
    // 人气商品
    .popularGoods {
      position: relative;
      padding-top: 70px;
      margin-right: 30px;
      width: 380px;
      background: #fff;

      //   height: 480px;
      box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.12);
      //   background: rgba(255, 255, 255, 0.12);
      .popContent {
        padding-bottom: 13px;
        .popContentLeft {
          padding-left: 22px;
          padding-right: 29px;
          ul {
            li {
              width: 179px;
              height: 192px;
              padding: 15px 10px;
              box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.12);
              cursor: pointer;
              img {
                display: block;
                width: 159px;
                height: 137px;
                margin: auto;
                box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.12);
              }
              h3 {
                padding: 8px 28px;
                font-size: 12px;
                font-family: MicrosoftYaHei;
                font-weight: 400;
                color: rgba(102, 102, 102, 1);
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
              }
            }
            li:nth-child(1) {
              margin-bottom: 24px;
            }
            li:hover {
              outline: 1px solid #cce0f3;
            }
          }
        }
        .popContentRight {
          ul {
            li {
              width: 124px;
              height: 133px;
              background: rgba(255, 255, 255, 0.66);
              box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.12);
              padding-top: 12px;
              margin-bottom: 5px;
              cursor: pointer;
              img {
                display: block;
                width: 110px;
                height: 95px;
                margin: auto;
              }
              h4 {
                font-size: 10px;
                font-family: MicrosoftYaHei;
                font-weight: 400;
                color: rgba(102, 102, 102, 1);
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
                padding: 0 10px;
                padding-top: 3px;
              }
            }
            li:nth-child(3) {
              margin-bottom: 0;
            }
            li:hover {
              outline: 1px solid #cce0f3;
            }
          }
        }
      }
    }
    // 精选商品
    .merchandiseGoods {
      position: relative;
      padding-top: 70px;
      width: 380px;
      box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.12);
      background: #fff;

      .merchandiseGoodsCon {
        padding-left: 16px;
        ul {
          li {
            width: 105px;
            height: 112px;
            background: rgba(255, 255, 255, 0.66);
            box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.12);
            margin-right: 10px;
            margin-bottom: 14px;
            padding-top: 10px;
            float: left;
            cursor: pointer;
            img {
              display: block;
              margin: auto;
              width: 82px;
              height: 72px;
            }
            h4 {
              padding: 0 17px;
              font-size: 10px;
              font-family: MicrosoftYaHei;
              font-weight: 400;
              color: rgba(102, 102, 102, 1);
              text-overflow: ellipsis;
              white-space: nowrap;
              overflow: hidden;
            }
          }
          li:hover {
            outline: 1px solid #cce0f3;
          }
        }
        .dotsBox {
          display: flex;
          justify-content: center;
          padding-bottom: 15px;
          .dots {
            display: inline-block;
            width: 8px;
            height: 8px;
            //   background-color: $color;
            border-radius: 50%;
            border: 1px solid #999;
            cursor: pointer;
            margin-right: 6px;
          }
          .selceted {
            background-color: $color;
            // border: 5px solid rgba(61,145,231,.2);
          }
        }
      }
    }
  }
  // 中间推荐商品部分结束

  // 成品笔开始
  .finishedPen {
    .publicTitle {
      padding: 85px 0 18px 14px;
      img {
        width: 100%;
      }
      .brandBorder {
        display: inline-block;
        width: 2px;
        height: 12px;
        background: rgba(61, 145, 231, 1);
        margin-right: 18px;
      }
      .brandTitle {
        font-size: 20px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(61, 145, 231, 1);
      }
    }
    .publicCon {
      ul {
        li {
          float: left;
          width: 225px;
          height: 241px;
          box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.12);
          padding-top: 20px;
          margin-right: 18px;
          margin-bottom: 18px;
          cursor: pointer;
          img {
            display: block;
            width: 186px;
            height: 159px;
            margin: auto;
          }
          h4 {
            padding: 23px 47px;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            font-size: 14px;
            font-family: MicrosoftYaHei;
            font-weight: 400;
            color: rgba(102, 102, 102, 1);
          }
        }
        li:nth-child(5n) {
          margin-right: 0;
        }
        li:hover {
          outline: 1px solid #cce0f3;
        }
      }
    }
  }
  // 成品笔结束

  // 猜你喜欢开始
  .guessLike {
    padding-bottom: 45px;
    .guessLikeTitle {
      height: 78px;
      line-height: 78px;
      text-align: center;
      font-size: 20px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      position: relative;
      margin-top: 40px;
      img {
        width: 100%;
      }
    }
    .guessLikeContent {
      ul {
        li {
          width: 180px;
          height: 194px;
          box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.12);
          float: left;
          padding: 15px 13px 46px;
          margin-right: 22px;
          margin-bottom: 24px;
          cursor: pointer;
          img {
            display: block;
            width: 140px;
            height: 128px;
            margin: auto;
          }
          h3 {
            padding-top: 12px;
            padding-left: 30px;
            padding-right: 30px;
            font-size: 10px;
            font-family: MicrosoftYaHei;
            font-weight: 400;
            color: rgba(102, 102, 102, 1);
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
          }
        }
        li:nth-child(6n) {
          margin-right: 0;
        }
        li:hover {
          outline: 1px solid #cce0f3;
        }
      }
    }
  }
  // 猜你喜欢结束

  // 中间部分头部标题样式
  .ListTitle {
    position: absolute;
    top: -15px;
    width: 100%;
    left: -4px;
    line-height: 58px;
    padding-left: 24px;
    background-image: url("../../../static/img/activityBg.png");
    background-repeat: no-repeat;
    // display: flex;
    // align-items: center;
    .middleTitle {
      font-size: 16px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      margin-right: 10px;
    }
    .bigSquare {
      display: inline-block;
      width: 9px;
      height: 18px;
      background: #333333;
      transform: skew(30deg);
      margin-top: 3px;
      margin-right: 4px;
    }
    .smallSquare {
      display: inline-block;
      width: 3px;
      height: 18px;
      background: #333333;
      transform: skew(30deg);
      margin-top: 3px;
    }
  }
}

.newProductLeft {
  //   width: 212px;
  height: 130px;
  padding-top: 30px;
}

.moreBox {
  position: absolute;
  bottom: -25px;
  right: 18px;
  font-size: 12px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: #3d91e7;
  cursor: pointer;
}

// 相对定位
.pr {
  position: relative;
}
</style>

<style lang="scss">
//
/*-webkit-autofill用于覆盖chrome浏览器本身的背景颜色*/
input:-webkit-autofill {
  box-shadow: 0 0 0px 1000px #fff inset;
}
</style>
