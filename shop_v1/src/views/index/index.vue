<template>
  <div class="indexBg">
    <Headers id="topHeader"></Headers>
    <!-- 可移动顶部头部 -->
    <div class="movedHead" id="headeShow" style="display:none;width:100%">
      <div class="movedHead_con">
        <img src="../../../static/img/movedHead_logo.png" alt />
        <!-- <img v-lazy="'../../../static/img/movedHead_logo.png'" alt /> -->

        <div class="header_search">
          <div class="header_searchs">
            <input
              type="text"
              placeholder="请输入关键词"
              v-model="input"
              class="searchInput"
              @keyup.enter="search()"
            />
            <button class="searchBtn" @click="search()">搜索</button>
          </div>
        </div>
      </div>
    </div>
    <div class="indexPage">
      <!-- 导航部分开始 -->
      <div class="indexNavBox pr">
        <div class="indexNav clearfix w">
          <div v-for="(type,typeIndex) in  typeList" :key="typeIndex">
            <div v-for="speIndex in roundNumber(type.data.length) " :key="speIndex">
              <div
                class="hiddenGoods"
                v-show="typeShow == typeIndex && speShow == speIndex"
                @mouseover="typeShow = typeSaveShow;speShow = speSaveShow;"
                @mouseout="typeShow = -1 ; speShow = -1"
              >
                <div class="hiddenGoodsLeft">
                  <div v-for="item in 3 " :key="item">
                    <div class="hiddenTitle" v-if="type.data[(item-1)+((speIndex-1)*3)]">
                      <i>{{type.data[(item-1)+((speIndex-1)*3)].name}}</i>
                    </div>
                    <ul class="clearfix" v-if="type.data[(item-1)+((speIndex-1)*3)]">
                      <li
                        :title="item1.name"
                        v-for="(item1,index) in type.data[(item-1)+((speIndex-1)*3)].goods_specification_values"
                        :key="index"
                        @click="toAllGoods((item-1)+((speIndex-1)*3),item1.name,type, type.data[(item-1)+((speIndex-1)*3)].param_name)"
                      >{{item1.name}}</li>
                    </ul>
                  </div>
                </div>
                <div class="hiddenGoodsRight">
                  <div class="guessyoulikeTitle">猜你喜欢</div>
                  <div
                    class="guessyoulikeContent"
                    v-if="youLikeGoodsList[dataIndex] != null && youLikeGoodsList[dataIndex].length > 0"
                  >
                    <ul class="clearfix">
                      <li
                        v-for="(youLikeGoods,index) in youLikeGoodsList[dataIndex]"
                        :key="index"
                        @click="toDetail(youLikeGoods)"
                      >
                        <img :src="youLikeGoods.img[0]" alt />
                        <h3>{{youLikeGoods.title}}</h3>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="sortList fl">
            <div v-for="(type,typeIndex) in  typeList" :key="typeIndex">
              <div class="sortDetail" v-if="typeList.length > 1">
                <div class="sortTitle" @click="$router.push('/allGoods')">
                  <span class="indexBorderLeft"></span>
                  <i>{{type.name}}</i>
                </div>
                <ul class="listDetail clearfix">
                  <div v-if="type.data.length > 0">
                    <li
                      v-for="speIndex in roundNumber(type.data.length) "
                      :key="speIndex"
                      @mouseover="typeShow = typeIndex;speShow=speIndex;typeSaveShow = typeIndex;speSaveShow=speIndex;dataIndex=speIndex-1"
                      @mouseout="typeShow = -1 ; speShow = -1"
                    >
                      <span v-for="item in 3 " :key="item" @click="$router.push('/allGoods')">
                        {{type.data[(item-1)+((speIndex-1)*3)]?type.data[(item-1)+((speIndex-1)*3)].name:''}}
                        <span
                          v-if="type.data[item+((speIndex-1)*3)] && item != 3"
                        >/</span>
                      </span>
                    </li>
                  </div>
                </ul>
              </div>
            </div>
          </div>
          <!-- 商品分类结束 -->
          <!-- 首页轮播开始 -->

          <!-- 首页轮播结束 -->
          <!-- 导航右侧部分开始 -->
          <div class="indexNavRight fr">
            <!-- 首页登录开始 -->
            <!-- 未登录 -->
            <div class="indexLogin" v-if="noLogin">
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
                  @keyup.enter="indexLogin"
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
                  @keyup.enter="indexLogin"
                />
              </div>
              <div class="passwordRem clearfix">
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
                  style="background: #D21D27; color: #fff; border:none"
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
                  <span class="NumberName">{{username}}</span>
                </p>
                <p>欢迎您！</p>
              </div>
              <div class="centerBox">
                <input type="button" @click="toUserInfo()" value="个人中心" />
                <input
                  type="button"
                  value="注销"
                  style="background:#fdf7f7;color:#999;border:1px solid rgba(153,153,153,1);"
                  @click="exit"
                />
              </div>
            </div>
            <!-- 首页登录结束 -->
            <!--首页公告栏开始  -->
            <div class="indexNotice" v-if="noticeShowList.length > 0">
              <div class="indexNoticeTitle">
                <i class="iconfont icon-gonggao"></i>
                <span>平台动态</span>
              </div>
              <div class="indexNoticeCon scroll">
                <ul class="scroll1" ref="rollul" :class="{'anim':animate}">
                  <div data-v-498142aa class="el-carousel el-carousel--horizontal">
                    <div class="el-carousel__container" style="height: 400px;overflow: hidden">
                      <div
                        data-v-498142aa
                        class="el-carousel__item is-animating"
                        :style="noticeList.length>2?('transform: translateY('+(noticeShow*20-20)+'px) scale(1);' + (noticeShow == noticeList.length-1 ? 'display: none':'')):('transform: translateY('+(noticeShow*20-20)+'px) scale(1);')"
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
        <div class="indexSwiper" id="indexSwiper">
          <div class="block">
            <el-carousel trigger="click" height="460px">
              <el-carousel-item v-for="(item,index) in swiperList" :key="index">
                <div>
                  <img :src=" item" alt />
                  <!-- <img v-lazy=" item" alt /> -->
                </div>
              </el-carousel-item>
            </el-carousel>
          </div>
        </div>
      </div>
      <!-- 导航部分结束 -->
      <!-- 分类展示开始 -->
      <div v-if="speGoodsList.length > 0">
        <div class="classifyTitle w">分类展示</div>
        <div
          class="newProduct w clearfix pr"
          v-for="(speGoods,speIndex) in speGoodsList"
          :key="speIndex"
          v-if="speGoods.data.length > 0"
        >
          <div class="newProductLeft fl">
            <div class="titleDiv">
              <h2>{{speGoods.name}}</h2>
              <h3>{{sepGoodsEN[speIndex]}}</h3>
            </div>

            <ul>
              <li @click="toDetail(speGoods.data[0])" v-if="speGoods.data[0] != null ">
                <div class="imgBox">
                  <img :src="speGoods.data[0].img[0]" alt />
                </div>
                <h3>{{speGoods.data[0].title}}</h3>
              </li>
            </ul>
          </div>
          <div class="newProductContent fr">
            <ul class="clearfix">
              <li
                v-for="item in 10"
                :key="item"
                @click="toDetail(speGoods.data[item])"
                v-if="speGoods.data[item]"
              >
                <img :src="speGoods.data[item].img[0]?speGoods.data[item].img[0]:''" alt />
                <h3>{{speGoods.data[item].title}}</h3>
              </li>
            </ul>
          </div>
          <div class="moreBox">
            <a style="color:#FF764A" @click="more(speGoods.name)">更多>></a>
          </div>
        </div>
      </div>
      <!-- 分割线 -->

      <!-- 求购信息开始 -->
      <div class="wantBuyBox">
        <div class="w" style="border-top:2px solid #D21D27;background:#FFF">
          <div class="wantBuyContent clearfix">
            <div class="wantBuyLeft fl">
              <div class="wantBuyTitle">
                <h3>求购信息</h3>
              </div>
              <ul class="theFirst">
                <li
                  v-for="(item,index) in purchaseList"
                  :key="index"
                  @click="$router.push('purchaseDetail?id='+item.id)"
                >
                  <i class="dotes">●</i>
                  <span class="wantBuyInfo">{{item.title}}</span>
                  <span class="wantBuyDate">{{formatDate(item.send_date)}}</span>
                </li>
              </ul>
            </div>
            <div class="wantBuyright fl">
              <div class="wantBuyTitle">
                <h3>供应信息</h3>
              </div>
              <ul class="theSecond">
                <li
                  v-for="(item,index) in supplyInfoList"
                  :key="index"
                  @click="$router.push('proInofDetail?id='+item.id)"
                >
                  <i class="dotes">●</i>
                  <span class="wantBuyInfo">{{item.title}}</span>
                  <span class="wantBuyDate">{{formatDate(item.date)}}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <!-- 求购信息结束 -->

      <!-- 商户引导链接图 -->
      <div class="linkLogo clearfix">
        <div class="w">
          <div class="dealerLink fl pr">
            <div class="toDeler" @click="$router.push('/disIntroduce')"></div>
          </div>
          <div class="supplierLink fl pr">
            <div class="toSupplie" @click="$router.push('/supIntroduce')"></div>
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import url from "@/serverAPI.config.js";
import Headers from "../../components/headHome";
import Footer from "../../components/footerHome.vue";
import failpopup from "../../components/popup/failPopup.vue";
import successpopup from "../../components/popup/successPopup.vue";

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
  components: {
    Headers,
    Footer,
    failpopup,
    successpopup
  },
  data() {
    return {
      searchList: [],
      input: "",
      // 轮播图
      swiperList1: [
        "/static/img/banner.jpg",
        "/static/img/banner2.jpg",
        "/static/img/banner3.jpg",
        "/static/img/banner4.jpg"
      ],
       swiperList: [],
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
      noLogin: true,
      userInfo: {},
      user: {},
      isRemember: false,
      showUserInfo: false,
      //   普通会员
      isCommon: false,
      newProductLeft: {},
      goodsSpeList: [],
      speGoodsList: [],
      sepGoodsValue: [
        "中性笔",
        "宝珠笔",
        "圆珠笔",
        "钢笔",
        "可擦笔",
        "铅笔",
        "自动铅笔",
        "记号笔",
        // "马克笔",
        // "白板笔",
        "荧光笔"
        // "水彩笔",
        // "毛笔"
      ],
      sepGoodsEN: [
        "Neutral pen",
        "Roller pen",
        "Ballpoint pen",
        "The pen",
        "Erasable pen",
        "The pencil",
        "Automatic pencil",
        "Marker pen",
        // "The whiteboard pen",
        "Fluorescent pen"
      ],
      youLikeGoodsList: [],
      typeList: [
        { name: "成品笔", data: [] },

        {
          name: "笔配件",
          data: [
            {
              name: "零部件",
              goods_specification_values: [
                { name: "笔杆" },
                { name: "笔尖" },
                { name: "笔夹" },
                { name: "铜件" },
                { name: "揿头" },
                { name: "转轮" },
                { name: "弹簧" },
                { name: "电容头" },
                { name: "笔杆" },
                { name: "硅胶" },
                { name: "软胶头" },
                { name: "卡通饰品" },
                { name: "挂绳" },
                { name: "电子" },
                { name: "电池" },
                { name: "LED灯" },
                { name: "激光灯" },
                { name: "其他零部件" }
              ]
            },
            {
              name: "笔芯配件",
              goods_specification_values: [
                { name: "圆珠笔头" },
                { name: "中性笔头" },
                { name: "纤维笔头" },
                { name: "墨水" },
                { name: "墨水" },
                { name: "尾油" },
                { name: "油管" },
                { name: "钢笔尖" },
                { name: "钢笔尖" },
                { name: "吸水器" },
                { name: "墨囊" },
                { name: "墨水胆" },
                { name: "连接件" },
                { name: "球珠" },
                { name: "其他笔芯配件" }
              ]
            },
            {
              name: "机械设备",
              goods_specification_values: [
                { name: "注塑设备" },
                { name: "装配设备" },
                { name: "检测设备" },
                { name: "包装设备" },
                { name: "印刷设备" },
                { name: "其他机械设备" }
              ]
            },
            {
              name: "包装",
              goods_specification_values: [
                { name: "吸塑包装" },
                { name: "纸盒包装" },
                { name: "木盒包装" },
                { name: "塑胶盒包装" },
                { name: "金属盒包装" },
                { name: "OPP袋" },
                { name: "绒布袋" },
                { name: "展示盒" },
                { name: "展架" },
                { name: "其他包装" }
              ]
            },
            {
              name: "表面处理",
              goods_specification_values: [
                { name: "电镀" },
                { name: "喷漆" },
                { name: "喷胶" },
                { name: "喷胶" },
                { name: "UV喷涂" },
                { name: "氧化" },
                { name: "其他表面处理" }
              ]
            },
            {
              name: "模具",
              goods_specification_values: [
                { name: "整模输出" },
                { name: "精雕" },
                { name: "芯棒" },
                { name: "型腔" },
                { name: "模具配件" },
                { name: "其他模具制造" }
              ]
            },
            {
              name: "原材料",
              goods_specification_values: [
                { name: "塑料" },
                { name: "金属" },
                { name: "颜料" },
                { name: "油漆" },
                { name: "其他原材料" }
              ]
            },
            {
              name: "印刷工艺",
              goods_specification_values: [
                { name: "丝印" },
                { name: "移印" },
                { name: "烫金" },
                { name: "UV" },
                { name: "激光雕刻" },
                { name: "热转印" },
                { name: "滴胶" },
                { name: "其他印刷工艺" }
              ]
            }
          ]
        },
        {
          name: "笔芯",
          data: [
            {
              name: "油墨",
              goods_specification_values: [
                { name: "圆珠笔芯" },
                { name: "中性笔芯" },
                { name: "水性笔芯（宝珠笔芯" },
                { name: "可擦笔芯" },
                { name: "铅芯" },
                { name: "纤维笔芯" }
              ]
            },
            {
              name: "笔头",
              goods_specification_values: [
                { name: "子弹头笔芯" },
                { name: "针管笔芯" },
                { name: "半针管笔芯" }
              ]
            },
            {
              name: "油管",
              goods_specification_values: [
                { name: "塑料杆笔芯" },
                { name: "钢杆笔芯" },
                { name: "巨无霸笔芯" },
                { name: "常规笔芯" },
                { name: "透明油管笔芯" },
                { name: "实色油管笔芯" }
              ]
            }
          ]
        }
      ],
      dataIndex: 0,
      typeShow: -1,
      speShow: -1,
      typeSaveShow: -1,
      speSaveShow: -1,
      supplyInfoList: [],
      purchaseList: [],
      timeShow: null,
      username: "",
      roles: "",
      isShow: false,
      applyDate: "",
      reason: "",
      userStatus: ""
    };
  },
  created() {
    this.username = localStorage.getItem("username");
    var roles = localStorage.getItem("roles");
    setInterval(this.showNotice, 5000);
    this.getScope();
    this.getGoodsSpe();
    this.getMountingsScope();
    this.getCartridgeScope();
    this.findIndexGoods();
    this.getGuessYouLike();
    this.getUserInfo();
    this.getNoticeList(1, 10);
    if (!localStorage.getItem("VISITOR")) {
      var VISITOR = this.guid();
      localStorage.setItem("VISITOR", VISITOR);
    }
    this.getIndexSpeGoodsList();
    this.findIndexPurchase();
    this.findIndexSupplyInfo();
    this.getBanner();  //获取首页的轮播图
    // if (this.username&&roles) {
    //     this.getUserContent();
    // }
  },
  mounted() {
    this.getActivity();
  },
  computed: {},
  updated() {
    this.timeShow = setInterval(() => {
      if (!this.$route.path == "/") {
        clearInterval(this.timeShow);
        return;
      }
      var windowHeight =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;

      var headerHeight = document.querySelector("#topHeader")
        ? document.querySelector("#topHeader").offsetHeight
        : 0;
      // indexSwiper
      var indexSwiper = document.querySelector("#indexSwiper")
        ? document.querySelector("#indexSwiper").offsetHeight
        : 0;
      if (windowHeight > headerHeight + indexSwiper) {
        if (document.getElementById("headeShow"))
          document.getElementById("headeShow").style.display = "block";
      } else {
        if (document.getElementById("headeShow"))
          document.getElementById("headeShow").style.display = "none";
      }
    }, 10);
  },
  methods: {
    getBanner(){
        this.$http({
         // url:'http://172.16.0.138:9009/goods/allBanner',
       url: `${url.getBanner}`,
        method: "get"
      }).then(res => {
        if (res.data.code === 20000) {
         var data = res.data.data;
         for(var i=0;i<data.length;i++){
            this.swiperList.push(data[i].img);
         }

        }
      });
    },
    formatDate(date) {
      var time = new Date(date);
      var timeStr =
        time.getFullYear() +
        "-" +
        (time.getMonth() + 1 < 10
          ? "0" + (time.getMonth() + 1)
          : time.getMonth() + 1) +
        "-" +
        (time.getDate() < 10 ? "0" + time.getDate() : time.getDate());
      return timeStr;
    },
    formatYMD(date) {
      var time = new Date(date);
      var timeStr =
        time.getFullYear() +
        "年" +
        (time.getMonth() + 1 < 10
          ? "0" + (time.getMonth() + 1)
          : time.getMonth() + 1) +
        "月" +
        (time.getDate() < 10 ? "0" + time.getDate() : time.getDate()) +
        "日";
      return timeStr;
    },
    findIndexPurchase() {
      this.$http({
        url: `${url.findIndexPurchase}`,
        method: "get"
      }).then(res => {
        if (res.data.code === 20000) {
          var  list=res.data.data;
          for(var i=0;i<10;i++){
             this.purchaseList.push(list[i]) ;
          }
         // this.purchaseList = res.data.data;
        }
      });
    },
    findIndexSupplyInfo() {
      this.$http({
        url: `${url.findIndexSupplyInfo}`,
        method: "get"
      }).then(res => {
        if (res.data.code === 20000) {
           var  list=res.data.data;
          for(var i=0;i<10;i++){
             this.supplyInfoList.push(list[i]) ;
          }
         // this.supplyInfoList = res.data.data;
        }
      });
    },
    search() {
      // this.navList.map(item => {
      //   if (item.name == this.navList[1].name) {
      //     item.active = true;
      //   } else {
      //     item.active = false;
      //   }
      // });
      // var scope = this.navList[1];
      // if (this.navList[1].name == "商品类型") {
      //   scope = "";
      // }
      if (this.searchList.indexOf(this.input) == -1 && this.input.length < 10)
        this.searchList.unshift(this.input);
      var searchRecord = [];
      for (var i = 0; i < 5; i++) {
        if (this.searchList[i]) searchRecord.push(this.searchList[i]);
      }
      this.searchList = searchRecord;
      localStorage.searchRecord = JSON.stringify(searchRecord);
      this.$router.push({
        path: "/springboard",
        query: { input: this.input, scope: "" }
      });
    },
    getIndexSpeGoodsList() {
      this.sepGoodsValue.map(item => {
        this.getIndexSpeGoods(item);
      });
    },
    getIndexSpeGoods(speValue) {
      this.$http({
        url: `${url.findIndexSpeGood}/${speValue}`,
        method: "get"
      }).then(res => {
        if (res.data.code === 20000) {
          var data = res.data.data;
          data.map(item => {
            if (item.img) {
              item.img = JSON.parse(item.img);
            }
          });
          this.speGoodsList.push({
            data: data,
            name: speValue
          });
        }
      });
    },
    findGuessYouLikes() {
      this.goodsSpeList.map(item => {
        this.findGuessYouLike(item);
      });
    },
    findGuessYouLike(goodsSpe) {
      var fileName = "";
      var speValue = "";
      var index = 0;
      if (goodsSpe) {
        if (goodsSpe.name == "笔芯启动方式") {
          fileName = "start_mode";
          speValue = goodsSpe.goods_specification_values[0].name;
          index = 0;
        }
        if (goodsSpe.name == "材质") {
          fileName = "texture";
          speValue = goodsSpe.goods_specification_values[0].name;
          index = 1;
        }
        if (goodsSpe.name == "功能") {
          fileName = "function";
          speValue = goodsSpe.goods_specification_values[0].name;
          index = 2;
        }
        if (goodsSpe.name == "油墨") {
          fileName = "ink";
          speValue = goodsSpe.goods_specification_values[0].name;
          index = 3;
        }
        if (goodsSpe.name == "笔芯替换") {
          fileName = "cartridge_replacement";
          speValue = goodsSpe.goods_specification_values[0].name;
          index = 4;
        }
        if (goodsSpe.name == "笔芯数量") {
          fileName = "cartridge_count";
          speValue = goodsSpe.goods_specification_values[0].name;
          index = 5;
        }
        if (goodsSpe.name == "造型") {
          fileName = "sculpt";
          speValue = goodsSpe.goods_specification_values[0].name;
          index = 6;
        }
        if (goodsSpe.name == "笔杆外形") {
          fileName = "outline";
          speValue = goodsSpe.goods_specification_values[0].name;
          index = 7;
        }
        if (goodsSpe.name == "搭配配件") {
          fileName = "match_accessories";
          speValue = goodsSpe.goods_specification_values[0].name;
          index = 8;
        }
        if (goodsSpe.name == "表面工艺") {
          fileName = "technology";
          speValue = goodsSpe.goods_specification_values[0].name;
          index = 9;
        }
        if (goodsSpe.name == "品牌") {
          fileName = "brand";
          speValue = goodsSpe.goods_specification_values[0].name;
          index = 10;
        }
      }
      this.$http({
        url: `${url.findGuessYouLike}/${fileName}/${speValue}`,
        method: "get"
      }).then(res => {
        if (res.data.code === 20000) {
          var data = res.data.data;
          data.map(item => {
            item.img = JSON.parse(item.img);
          });
          this.youLikeGoodsList[index] = data;
        }
      });
    },
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
            item.goods_list.map(item1 => {
              item1.img = JSON.parse(item1.img);
              item1.price = parseFloat(item1.price).toFixed(2);
            });
            if (item.sort == "4") {
              item.goods_list.splice(18, item.goods_list.length - 18);
            }
            if (item.sort == "2") {
              this.newProductLeft = item.goods_list[10];
              item.goods_list.splice(10, item.goods_list.length - 10);
            }
            if (item.sort == "1") {
              item.goods_list.splice(5, item.goods_list.length - 5);
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
    handleGoodsSpeShow() {},
    handleGoodsSpeHidden() {
      setTimeout(() => {
        if (this.oneShow) {
          return;
        }
        this.oneShow = false;
      }, 10);
      setTimeout(() => {
        if (this.towShow) {
          return;
        }
        this.towShow = false;
      }, 10);
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
      if (this.noticeShowList.length > 7) {
        this.noticeShowList.unshift(
          this.noticeShowList[this.noticeShowList.length - 1]
        );
        this.noticeShowList.pop();
      }
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
        .catch(err => {});
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
          this.guessLikeGoodsList = res.data.data.splice(0, 6);
          this.guessLikeGoodsList.map(item => {
            item.img = JSON.parse(item.img);
          });
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    toAllGoods(index, scope, type, paramName) {
      if (type) {
        if (type.name == "成品笔") {
          this.$router.push(`/allGoods?initIndex=${paramName}&initSelected=${scope}`)
        }
      } else {
        this.$router.push(`/allGoods`)
      }
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
          localStorage.removeItem("ID");
          localStorage.removeItem("username");
          localStorage.removeItem("roles");
          localStorage.removeItem("remember");
          localStorage.removeItem("Authorization");
          this.$message({
            type: "success",
            message: "退出成功!"
          });
          //   this.getUserInfo();
          this.noLogin = true;
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
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
      var expireTime = localStorage.getItem("expireTime");
      if (!username) {
        this.getUserInfo();
        return;
      }
      if (
        localStorage.roles.indexOf("provider") != -1 &&
        this.$route.query.provideruserInfo != "1"
      ) {
        var href = `${url.supplierUrl}/`;
        window.open(href);
        return;
      }
      if (localStorage.roles.indexOf("dealer") != -1) {
        var href = `${url.dealerUrl}/`;
        window.open(href);
        return;
      }
      this.$router.push("/userInfo");
    },

    //个人信息
    getUserInfo() {
      if (localStorage.getItem("remember") != "1") {
        if (sessionStorage.getItem("remember") != "1") {
          localStorage.removeItem("ID");
          localStorage.removeItem("username");
          localStorage.removeItem("roles");
          localStorage.removeItem("remember");
          localStorage.removeItem("Authorization");
        }
      }
      let username = localStorage.getItem("username");
      if(username == null || username == ""){
          console.log(username);
          return
      }
      this.$http({
        url: `${url.userInfo}/${localStorage.getItem("username")}`,
        method: "get"
      })
        .then(res => {
          if (res.data.code == 20000) {
            this.userInfo = res.data.data;
            this.reason = this.userInfo.reason;
            this.userStatus = this.userInfo.status;
            if (this.userInfo) {
              this.noLogin = false;
            } else {
              this.noLogin = true;
            }
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
          this.noticeList = res.data.data.rows || [];
          this.noticeList.unshift(this.noticeList[this.noticeList.length - 1]);
          this.createNoticeShow();
        }
      });
    },

    //登录
    indexLogin() {
      this.$http.post(url.login, this.user).then(res => {
        if (res.data.code == 20000) {
          if (this.isRemember) {
            if (res.data.data.status.indexOf("0") != -1) {
              localStorage.status = res.data.data.status;
            }
            if (res.data.data.type) {
              if (res.data.data.type == "0") {
                localStorage.roles = "dealer";
              }

              if (res.data.data.type == "1") {
                localStorage.roles = "provider";
              }
            } else {
              localStorage.roles = res.data.data.roles;
            }

            localStorage.Authorization = "Bearer " + res.data.data.token;
            localStorage.username = res.data.data.username;
            localStorage.siteName = res.data.data.username;
            localStorage.expireTime = res.data.data.expireTime;
            localStorage.ID = res.data.data.id;
            if (res.data.data.urls) {
              localStorage.urls = res.data.data.urls;
            }

            if (res.data.data.sonName) {
              localStorage.sonName = res.data.data.sonName;
            }

            if (res.data.data.sonUsername) {
              localStorage.sonUsername = res.data.data.sonUsername;
            }

            if (res.data.data.job) {
              localStorage.job = res.data.data.job;
            }

            if (res.data.data.sonId) {
              localStorage.sonId = res.data.data.sonId;
            }
            localStorage.remember = "1";
          } else {
            if (res.data.data.status.indexOf("0") != -1) {
              localStorage.status = res.data.data.status;
            }
            if (res.data.data.type) {
              if (res.data.data.type == "0") {
                localStorage.roles = "dealer";
              }

              if (res.data.data.type == "1") {
                localStorage.roles = "provider";
              }
            } else {
              localStorage.roles = res.data.data.roles;
            }

            localStorage.Authorization = "Bearer " + res.data.data.token;
            localStorage.username = res.data.data.username;
            localStorage.siteName = res.data.data.username;
            localStorage.expireTime = res.data.data.expireTime;
            localStorage.ID = res.data.data.id;
            localStorage.remember = "1";
            if (res.data.data.urls) {
              localStorage.urls = res.data.data.urls;
            }

            if (res.data.data.sonName) {
              localStorage.sonName = res.data.data.sonName;
            }

            if (res.data.data.sonUsername) {
              localStorage.sonUsername = res.data.data.sonUsername;
            }

            if (res.data.data.job) {
              localStorage.job = res.data.data.job;
            }

            if (res.data.data.sonId) {
              localStorage.sonId = res.data.data.sonId;
            }
            localStorage.remember = "0";
            sessionStorage.remember = "1";
          }
          this.getUserInfo();
          this.getUserContent();
          this.username = localStorage.getItem("username");
        } else {
          if (document.querySelectorAll(".el-message--error").length < 1) {
            this.$message.error(res.data.message);
          }
        }
      });
    },
    // // 注销
    // exit() {
    //   let _that = this;
    //   this.$confirm("是否退出?", "提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning"
    //   })
    //     .then(() => {
    //       this.$message({
    //         type: "success",
    //         message: "退出成功!"
    //       });
    //       localStorage.clear();
    //       location.href = `http://182.61.148.122:30/`;
    //     })
    //     .catch(() => {
    //       this.$message({
    //         type: "info",
    //         message: "已取消"
    //       });
    //     });
    // },

    formatLevel(str) {
      if (str == "1") {
        return "白银会员";
      }
      if (str == "2") {
        return "黄金会员";
      }
      if (str == "88") {
        return "超级会员";
      }
      if (str == "89") {
        return "至尊VIP会员";
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
          this.findGuessYouLikes();
          this.typeList[0].data = this.goodsSpeList;
        }
      });
    },
    more(name, speGoods) {
      this.toAllGoods(3, name);
    },

    roundNumber(length) {
      return Math.ceil(parseFloat(length / 3));
    },
    // 处理会员审核通知
    getUserContent() {
      var id = localStorage.getItem("ID");
      this.$http({
        url: `${url.getUserMsg}`,
        method: "get"
      }).then(res => {
        this.applyDate = this.formatYMD(res.data.data.edit_date);
        if (res.data.data.certification_type == "1") {
          this.roles = "采购商";
        }
        if (res.data.data.certification_type == "2") {
          this.roles = "供应商";
        }
        if (res.data.data.certification_type == "3") {
          this.roles = "采购商和供应商";
        }
        var auditDate = new Date(res.data.data.audit_date);
        var lastDate = new Date(res.data.data.up_login_date);
        if (auditDate.getTime() > lastDate.getTime()) {
          this.isShow = true;
        } else {
          this.isShow = false;
        }
      });
    },
    // 判断，处理重新申请的链接
    handleReapply() {
      if (this.roles == "dealer") {
        this.$router.push("/submitDisData");
      } else {
        this.$router.push("/submitDataSupplier");
      }
    }
  }
};
</script>




<style  lang="scss" scoped>
// 商城主题色
$color: #d21d27;

.indexBg {
  background-color: #f0f0f0;
  //   首页轮播开始
  .indexSwiper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.16);
    margin-right: 12px;
    img {
      width: 100%;
      height: 460px;
      // cursor: pointer;
    }
  }
  //   首页轮播结束

  .classifyTitle {
    height: 53px;
    line-height: 53px;
    font-size: 16px;
    font-family: MicrosoftYaHei, 微软雅黑;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
  }
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
    border: 1px solid #ccc;
    margin-right: 5px;
    color: #ccc;
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
  }

  .indexPage {
    box-sizing: border-box;
    position: relative;
    background-color: #f0f0f0;
    padding-bottom: 71px;
    //   width: 1200px;
    //   margin: auto;
    //   overflow: hidden;
    // 导航部分开始
    .indexNav {
      //   商品分类详情隐藏
      position: relative;
      .hiddenGoods {
        width: 980px;
        height: 460px;
        // box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.12);
        border: 2px solid $color;
        position: absolute;
        z-index: 10;
        background: #fff;
        top: 0;
        left: 220px;
        .hiddenGoodsLeft {
          float: left;
          width: 683px;
          height: 456px;
          border-right: 1px solid #f0f0f0;
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
              padding: 6px 10px;
              border: 0;
              margin: 0 20px;
              color: #666;
              font-size: 12px;
              cursor: pointer;
            }
            li:hover {
              color: $color;
            }
          }
        }
        .hiddenGoodsRight {
          float: left;
          width: 293px;
          .guessyoulikeTitle {
            height: 50px;
            line-height: 50px;
            font-size: 14px;
            //   font-family: MicrosoftYaHeiLight,微软雅黑;
            font-weight: bold;
            color: rgba(102, 102, 102, 1);
            text-align: center;
          }
          .guessyoulikeContent {
            ul {
              li {
                float: left;
                width: 50%;
                margin-bottom: 19px;
                cursor: pointer;
                img {
                  display: block;
                  margin: auto;
                  width: 87px;
                  height: 87px;
                }

                h3 {
                  padding: 7px 32px;
                  font-size: 12px;
                  font-family: MicrosoftYaHei, 微软雅黑;
                  font-weight: 400;
                  color: rgba(153, 153, 153, 1);
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  text-align: center;
                  overflow: hidden;
                }
              }
              li:hover img {
                box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.12);
              }
            }
          }
        }

        .clickBtn {
        }
      }

      .hiddenTitle {
        font-size: 0;
        height: 50px;
        line-height: 50px;
        padding-left: 32px;
        margin: 0 12px;
        margin-right: 0;
        .indexBorderLeft {
          display: inline-block;
          width: 2px;
          height: 12px;
          background: $color;
          margin-right: 12px;
        }
        i {
          font-size: 14px;
          // font-family: MicrosoftYaHeiLight,微软雅黑;
          font-weight: bold;
          color: rgba(210, 29, 39, 1);
        }
      }

      .sortTitle {
        position: relative;
        font-size: 0;
        padding-top: 18px;
        padding-bottom: 8px;
        padding-left: 17px;
        .indexBorderLeft {
          display: inline-block;
          width: 2px;
          height: 12px;
          background: $color;
          margin-right: 12px;
        }
        i {
          font-size: 14px;
          // font-family: MicrosoftYaHeiLight,微软雅黑;
          font-weight: 400;
          color: #ffffff;
          cursor: pointer;
        }
      }
    }

    // 商品分类开始
    .sortList {
      position: relative;
      width: 220px;
      background-color: #2d2e3e;
      box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.16);
      border-radius: 2px;
      margin-right: 12px;
      min-height: 460px;
      z-index: 5;
      .sortDetail {
      }

      .listDetail {
        li {
          font-size: 14px;
          // font-family: MicrosoftYaHeiLight,微软雅黑;
          font-weight: 300;
          color: #fff;
          padding-left: 12px;
          cursor: pointer;
          height: 38px;
          line-height: 38px;

          span {
          }
        }
        li:hover {
          background-color: #000;
        }
      }
      .sortDetail:hover .listDetail span:hover {
        color: $color;
      }
    }
    // 商品分类结束

    // 导航右侧部分开始
    .indexNavRight {
      position: relative;
      z-index: 5;
      //已登录页面
      .indexLoginShow {
        background-color: #fff;
        padding-top: 20px;
        min-height: 276px;
        background-image: url("../../../static/img/indexLoginBg.png");
        .normalLeval {
          margin: auto;
          //   width: 74px;
          //   height: 74px;
          //   margin-bottom: 30px;
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
            width: 74px;
            height: 100%;
            margin-bottom: 8px;
            margin: auto;
          }
          .vipLeval {
            color: $color;
            font-size: 14px;
            font-family: MicrosoftYaHei, 微软雅黑;
            font-weight: 400;
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
            font-family: MicrosoftYaHei, 微软雅黑;
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
            background: #fae6e7;
            border: 1px solid $color;
            border-radius: 4px;
            font-size: 12px;
            //   font-family: MicrosoftYaHeiLight,微软雅黑;
            font-weight: 300;
            color: $color;
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
          opacity: 0.6;
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
            background: rgba(210, 29, 39, 0.24);
            border: 1px solid #fb6035;
            border-radius: 4px;
            font-size: 12px;
            //   font-family: MicrosoftYaHeiLight,微软雅黑;
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
          // font-family: MicrosoftYaHeiLight,微软雅黑;
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
              // font-family: MicrosoftYaHeiLight,微软雅黑;
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
    box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.16);
    padding-bottom: 16px;
    background-color: #fff;
    margin-bottom: 14px;

    .newProductTitle {
      padding: 21px 8px 18px 16px;
      .newProductTitle_left {
        span {
          font-size: 16px;
          font-family: MicrosoftYaHei, 微软雅黑;
          font-weight: 400;
          color: $color;
          padding-right: 8px;
        }
        i {
          font-size: 16px;
          font-family: MicrosoftYaHei, 微软雅黑;
          font-weight: 400;
          color: #cccccc;
        }
      }
      .newProductTitle_more {
        font-size: 12px;
        font-family: MicrosoftYaHei, 微软雅黑;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        cursor: pointer;
      }
    }
    .newProductLeft {
      position: relative;
      padding-top: 123px;
      .titleDiv {
        position: absolute;
        top: -40px;
        left: -11px;
        width: 264px;
        background-image: url("../../../static/img/newProductBg.png");
        height: 150px;
        padding-top: 60px;
        padding-left: 30px;
        text-align: left;
        h2 {
          font-size: 32px;
          font-family: MicrosoftYaHei, 微软雅黑;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
        }
        h3 {
          font-size: 16px;
          font-family: MicrosoftYaHei, 微软雅黑;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          opacity: 0.6;
        }
      }
      ul {
        li {
          width: 211px;
          margin-left: 15px;
          padding: 10px 0;
          box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.12);
          cursor: pointer;
          background-color: #f6f6f6;
          .imgBox {
            position: relative;
            margin: 0 auto;
            width: 191px;
            height: 212px;
            box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
            img {
              width: 100%;
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
            }
          }
          h3 {
            padding: 30px 10px;
            font-size: 16px;
            font-family: MicrosoftYaHei, 微软雅黑;
            font-weight: 400;
            color: #666;
            text-overflow: ellipsis;
            white-space: nowrap;
            text-align: center;
            overflow: hidden;
            text-align: center;
          }
        }
        li:hover {
          outline: 1px solid #d22d36;
        }
      }
    }

    .newProductContent {
      width: 959px;
      padding-top: 10px;

      ul {
        li {
          float: left;
          width: 172px;
          //   height: 186px;
          box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.12);
          padding-top: 15px;
          margin-right: 18px;
          margin-bottom: 16px;
          cursor: pointer;
          background-color: #f6f6f6;
          img {
            display: block;
            width: 154px;
            height: 154px;
            margin: auto;
          }
          h3 {
            padding: 10px;
            font-size: 10px;
            font-family: MicrosoftYaHei, 微软雅黑;
            font-weight: 400;
            color: rgba(102, 102, 102, 1);
            text-overflow: ellipsis;
            white-space: nowrap;
            text-align: center;
            overflow: hidden;
          }
        }
        li:nth-child(5n) {
          margin-right: 0;
        }
        li:hover {
          // box-shadow: 12px 7px 15px 0px rgba(0, 0, 0, 0.12);
          outline: 1px solid #d22d36;
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
            font-family: MicrosoftYaHei, 微软雅黑;
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
                font-family: MicrosoftYaHei, 微软雅黑;
                font-weight: 400;
                font-style: italic;
                color: rgba(231, 66, 64, 1);
              }
              .goodsTitle {
                width: 210px;
                //   height:32px;
                font-size: 14px;
                font-family: MicrosoftYaHei, 微软雅黑;
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
                font-family: MicrosoftYaHei, 微软雅黑;
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
                font-family: MicrosoftYaHei, 微软雅黑;
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
              font-family: MicrosoftYaHei, 微软雅黑;
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
        font-family: MicrosoftYaHei, 微软雅黑;
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
            font-family: MicrosoftYaHei, 微软雅黑;
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
      font-family: MicrosoftYaHei, 微软雅黑;
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
            font-family: MicrosoftYaHei, 微软雅黑;
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
      font-family: MicrosoftYaHei, 微软雅黑;
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
  //   height: 130px;
  //   padding-top: 30px;
}

.moreBox {
  font-size: 12px;
  font-family: MicrosoftYaHei, 微软雅黑;
  font-weight: 400;
  color: #ff764a;
  cursor: pointer;
  float: right;
  width: 100%;
  text-align: right;
  padding-right: 32px;
}

// 相对定位
.pr {
  position: relative;
}

// 求购信息开始
.wantBuyBox {
  .wantBuyLeft {
    border-right: 1px dashed #ddd;
    padding-bottom: 15px;
  }
  .wantBuyTitle {
    h3 {
      padding: 18px 0 22px 17px;
      font-size: 24px;
      font-family: MicrosoftYaHei, 微软雅黑;
      font-weight: bold;
      color: rgba(210, 0, 11, 1);
    }
  }
  .wantBuyContent {
    margin-bottom: 10px;

    ul {
      li {
        padding-left: 26px;
        height: 36px;
        line-height: 36px;
        cursor: pointer;
        .dotes {
          float: left;
          color: #ff764a;
          padding-right: 12px;
        }
        .wantBuyInfo {
          float: left;
          width: 380px;
          font-size: 16px;
          font-family: MicrosoftYaHei, 微软雅黑;
          font-weight: 400;
          padding-right: 38px;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
        .wantBuyDate {
          float: right;
          padding-right: 36px;
        }
      }
      li:hover {
        color: #d22d36;
      }
    }
    ul:nth-child(1) {
      border-right: 1px dashed #ccc;
    }
  }
}
// 求购信息结束
// 商品引导链接图
.linkLogo {
  .dealerLink {
    width: 594px;
    height: 240px;
    margin-right: 6px;
    background-image: url("../../../static/img/caigoushang@2x.png");
    .toDeler {
      position: absolute;
      width: 160px;
      height: 31px;
      top: 70%;
      left: 35%;
      cursor: pointer;
    }
  }
  .supplierLink {
    width: 594px;
    height: 240px;
    background-image: url("../../../static/img/gongyingshang@2x.png");
    .toSupplie {
      position: absolute;
      width: 160px;
      height: 31px;
      top: 70%;
      left: 35%;
      cursor: pointer;
    }
  }
}
//可移动顶部头部
.movedHead {
  height: 58px;
  background: rgba(210, 58, 67, 1);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999999;
  img {
    margin-top: 10px;
    float: left;
    margin-left: 10%;
  }
  .movedHead_con {
    margin: 0 auto;
    width: 1200px;
    text-align: center;
  }
}
.header_search {
  display: inline-block;
  width: 50%;
  margin-top: 10px;
  margin-right: 200px;
  .header_searchs {
    width: 100%;
    height: 36px;
    background: white;
    border: 2px solid #d21d27;
    border-radius: 4px;
    position: relative;
    display: inline-block;
    .searchInput {
      margin-left: 16px;
      height: 30px;
      width: 85%;
      position: absolute;
      left: 0;
    }
    .searchBtn {
      width: 68px;
      height: 22px;
      position: absolute;
      right: 0px;
      top: 0px;
      background-color: white;
      z-index: 9999;
      font-size: 16px;
      // font-family: MicrosoftYaHeiLight,微软雅黑;
      font-weight: bold;
      color: rgba(210, 58, 67, 1);
      margin-top: 5px;
      border-left: 1px dashed;
    }
    .uploading_s {
      position: absolute;
      opacity: 0;
      height: 100%;
      top: 0;
      width: 20px;
      right: 80px;
      z-index: 9;
      cursor: pointer !important;
    }
    .uploading {
      position: absolute;
      color: #999999;
      right: 80px;
      top: 7px;
      cursor: pointer !important;
      font-size: 20px;
    }
  }
  img {
    display: inline-block;
    margin-left: 20px;
    cursor: pointer;
  }
}
</style>

<style lang="scss">
//
/*-webkit-autofill用于覆盖chrome浏览器本身的背景颜色*/
input:-webkit-autofill {
  box-shadow: 0 0 0px 1000px #fff inset;
}
</style>
