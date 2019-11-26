<template>
  <div>
    <div style="border-bottom: 1px solid #FF0000;" class="commonHeader">
      <div style="height:31px;background:rgba(221,221,221,1);line-height: 31px;color:#666666;">
        <div style="width:1200px;margin:auto;font-size:12px;">
          <div style="display: inline-block;">
            <span style="cursor:default">笔海弄潮首页，欢迎来到笔海弄潮</span>
            <span
              style="margin: 0 30px;cursor: pointer;"
              @click="$router.push('/login')"
              v-if="!username"
            >请登录</span>
            <span style="cursor: pointer;" @click="$router.push('/register')" v-if="!username">免费注册</span>
            <span
              style="margin: 0 30px;cursor: pointer;"
              @click="toUserInfo()"
              v-else
            >您好,{{username}}</span>
            <span style="cursor: pointer;" @click="exit()" v-if="username">注销</span>
          </div>
          <div style="display: inline-block;float: right;margin-right: 100px;" class="centerlist">
            <span style="margin-right: 50px;" @click="toDealerInfo()">采购中心</span>
            <span style="margin-right: 50px;" @click="toProviderInfo()">供应中心</span>
            <span style="margin-right: 50px;" @click="$router.push('/customerService')">客服中心</span>
            <span
              @mousemove="siteNavigationShow($event)"
              @mouseout="siteNavigationHidden($event)"
              :class="{'active_site':NavigationShow}"
            >
              <i class="iconfont icon-sortlight" style="font-size: 12px;margin-right: 3px;"></i>网站导航
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <!-- 网站导航弹窗 -->
            <div
              class="siteNavigation"
              v-show="NavigationShow"
              @mousemove="siteNavigationShow()"
              @mouseout="siteNavigationHidden()"
            >
              <div class="siteNavigation_a">
                <h4>特色市场</h4>
                <ul>
                  <li @click="toAllGoodsHref('initIndex=ink&initSelected=钢笔')">钢笔</li>
                  <li @click="toAllGoodsHref('initIndex=ink&initSelected=铅笔')">铅笔</li>
                  <li @click="toAllGoodsHref('initIndex=ink&initSelected=毛笔')">毛笔</li>
                  <li @click="toAllGoodsHref('initIndex=texture&initSelected=塑料')">
                    塑料笔
                    <img src="../../static/img/H.gif" alt/>
                  </li>
                  <li @click="toAllGoodsHref('initIndex=texture&initSelected=金属');">
                    金属笔
                    <img src="../../static/img/H.gif" alt/>
                  </li>
                  <li @click="toAllGoodsHref('initIndex=start_mode&initSelected=插套');">
                    插套笔
                    <img src="../../static/img/H.gif" alt/>
                  </li>
                  <li @click="toAllGoodsHref('initIndex=ink&initSelected=中性笔');">
                    中性笔
                    <img src="../../static/img/H.gif" alt/>
                  </li>
                  <li @click="toAllGoodsHref('initIndex=ink&initSelected=圆珠笔');">
                    圆珠笔
                    <img src="../../static/img/H.gif" alt/>
                  </li>
                  <li @click="toAllGoodsHref('initIndex=ink&initSelected=马克笔') ;">马克笔</li>
                  <li @click="toAllGoodsHref('initIndex=ink&initSelected=宝珠笔') ;">宝珠笔</li>
                  <li @click="toAllGoodsHref('initIndex=ink&initSelected=可擦笔') ;">可擦笔</li>
                  <li @click="toAllGoodsHref('initIndex=ink&initSelected=记号笔') ;">记号笔</li>
                  <li @click="toAllGoodsHref('initIndex=ink&initSelected=白板笔') ;">白板笔</li>
                  <li @click="toAllGoodsHref('initIndex=ink&initSelected=水彩笔') ;">水彩笔</li>
                  <li @click="toAllGoodsHref('initIndex=sculpt&initSelected=卡通笔') ;">卡通笔</li>
                  <li @click="toAllGoodsHref('initIndex=outline&initSelected=直杆笔') ;">直杆笔</li>
                  <li @click="toAllGoodsHref('initIndex=match_accessories&initSelected=弹簧笔') ;">弹簧笔</li>
                  <li @click="toAllGoodsHref('initIndex=cartridge_count&initSelected=单色笔') ;">单色笔</li>
                  <li @click="toAllGoodsHref('initIndex=cartridge_count&initSelected=双色笔') ;">
                    双色笔
                    <img src="../../static/img/H.gif" alt/>
                  </li>
                  <li @click="toAllGoodsHref('initIndex=cartridge_count&initSelected=三色笔');">三色笔</li>
                  <li @click="toAllGoodsHref('initIndex=ink&initSelected=荧光笔');">荧光笔</li>
                  <li @click="toAllGoodsHref('initIndex=start_mode&initSelected=按动（跳动）');">
                    按动笔
                    <img src="../../static/img/H.gif" alt/>
                  </li>
                  <li @click="toAllGoodsHref('initIndex=start_mode&initSelected=扭扭%28旋转）');">
                    扭扭笔
                    <img src="../../static/img/H.gif" alt/>
                  </li>
                  <li @click="toAllGoodsHref('initIndex=ink&initSelected=自动铅笔');">自动铅笔</li>
                </ul>
              </div>
              <div class="siteNavigation_b">
                <h4>特色栏目</h4>
                <ul>
                  <li @click="$router.push('./brandLobby')">品牌大厅</li>
                  <li @click="$router.push('./spotGoodsLobby')">现货大厅</li>
                  <li @click="toDealerInfo()">采购商中心</li>
                  <li @click="toProviderInfo()">供应商中心</li>
                  <li @click="$router.push('/aboutUs')">关于我们</li>
                  <li @click="$router.push('/noticeList')">平台动态</li>
                  <li @click="$router.push('/helpCenter')">帮助中心</li>
                  <li @click="$router.push('/contactUs')">联系我们</li>
                  <li @click="$router.push('/customerService')">网站客服</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="header" style="width:1200px;margin:auto;">
        <a style="float: left;">
          <!-- 跳转首页 -->
          <router-link tag="a" target="_blank" to="/">
            <img
              src="../../static/img/hade_logo.png"
              alt
              class="head_img"
            />
          </router-link>
        </a>
        <div class="middle_hade">
          <!-- 搜索和二维码、购物车 -->
          <div class="header_search">
            <div class="header_searchs">
              <input
                type="text"
                placeholder="请输入关键词"
                v-model="input"
                class="searchInput"
                id="searchInput"
                @keyup.enter="search"
              />
              <button class="searchBtn" @click="search()">搜索</button>
              <label class="labelTest">
                <input
                  type="file"
                  class="uploading_s"
                  accept="image/*"
                  @change="imgUpload($event)"
                  id="img"
                />
                <i class="el-icon-camera uploading"></i>
              </label>
            </div>
          </div>
          <div style="z-index: 9999;position: relative;">
            <img src="../../static/img/imgUpload_zhong.gif" alt v-show="imgUptime"/>
            <img src="../../static/img/imgUpload_shi.png" alt v-show="imgUptimes"/>
          </div>
          <p class="rests">
            <span v-for="(item,index) in searchList " :key="index">
              <a @click="input=item;search()">{{item}}</a>
            </span>
          </p>
        </div>
        <!-- 头部导航栏 -->
        <div class="header_nav">
          <div
            class="headerClassify"
            @mousemove="handelClassifyShow"
            @mouseout="handelClassifyHidden"
          >
            <div class="allcategories">
              <i class="iconfont icon-leimupinleifenleileibie allcategories_i"></i>
              <span>全部商品分类</span>
            </div>
            <!-- 商品分类开始 -->
            <!--    -->
            <div
              class="sortList"
              @mousemove="handelClassifyShow"
              @mouseout="handelClassifyHidden"
              v-if="isShowClassify || isMove"
            >
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
            <div v-for="(type,typeIndex) in  typeList" :key="typeIndex">
              <div v-for="speIndex in roundNumber(type.data.length) " :key="speIndex">
                <div
                  class="hiddenGoods"
                  v-show="typeShow == typeIndex && speShow == speIndex"
                  @mouseover="typeShow = typeSaveShow;speShow = speSaveShow;"
                  @mouseout="typeShow = -1 ; speShow = -1"
                >
                  <div class="hiddenGoodsLeft">
                    <div
                      v-for="item in 3 "
                      :key="item"
                      @mouseover="dataIndex=(item-1)+((speIndex-1)*3)"
                    >
                      <div class="hiddenTitle" v-if="type.data[(item-1)+((speIndex-1)*3)]">
                        <i>{{type.data[(item-1)+((speIndex-1)*3)].name}}</i>
                      </div>
                      <ul class="clearfix" v-if="type.data[(item-1)+((speIndex-1)*3)]">
                        <li
                          :title="item1.name"
                          v-for="(item1,index) in type.data[(item-1)+((speIndex-1)*3)].goods_specification_values"
                          :key="index"
                          @click="toAllGoods((item-1)+((speIndex-1)*3),item1.name,type,type.data[(item-1)+((speIndex-1)*3)].param_name)"
                        >{{item1.name}}
                        </li>
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
                          <img :src="youLikeGoods.img[0]" alt/>
                          <h3>{{youLikeGoods.title}}</h3>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 商品分类结束 -->
          <ul class="clearfix">
            <li
              v-for="(item,index) in navList "
              :key="index"
              :class="item.active ? 'active':''"
              @click="handleChange($event,item,index)"
            >
              <a>{{item.name}}</a>
              <!-- <i class="el-icon-caret-bottom" v-show="index==1?true:false"></i> -->
            </li>
          </ul>
          <div class="ruzhu">
            <img
              src="../../static/img/caigoushangruzhu@2x.png"
              alt
              @click="$router.push('/disIntroduce')"
            />
            <img
              src="../../static/img/gongyingshangruzhu@2x.png"
              alt
              @click="$router.push('/supIntroduce')"
            />
          </div>
        </div>
        <img
          src="../../static/img/yard.png"
          alt
          style="
            position: absolute;
            right: 15px;
            top: 5px;
            z-index: 99999;
            width: 110px;
            height: 100px;
            "
        />
      </div>
    </div>
  </div>
</template>

<script>
    import url from "@/serverAPI.config.js";

    export default {
        components: {},
        data() {
            return {
                searchList: [],
                navList: url.navList,
                input: "",
                username: "",
                scopeList: [],
                cartridgeList: [],
                toggle: false,
                tabShow: 0,
                ids: [],
                imgUptime: false,
                imgUptimes: false,
                goodsSpeList: [],
                goodSpeShowList: [],
                //   显示商品分类
                isShowClassify: false,
                youLikeGoodsList: [],
                isMove: false,
                username: null,
                NavigationShow: false,
                //   全部商品分类
                typeList: [
                    {name: "成品笔", data: []},

                    {
                        name: "笔配件",
                        data: [
                            {
                                name: "零部件",
                                goods_specification_values: [
                                    {name: "笔杆"},
                                    {name: "笔尖"},
                                    {name: "笔夹"},
                                    {name: "铜件"},
                                    {name: "揿头"},
                                    {name: "转轮"},
                                    {name: "弹簧"},
                                    {name: "电容头"},
                                    {name: "笔杆"},
                                    {name: "硅胶"},
                                    {name: "软胶头"},
                                    {name: "卡通饰品"},
                                    {name: "挂绳"},
                                    {name: "电子"},
                                    {name: "电池"},
                                    {name: "LED灯"},
                                    {name: "激光灯"},
                                    {name: "其他零部件"}
                                ]
                            },
                            {
                                name: "笔芯配件",
                                goods_specification_values: [
                                    {name: "圆珠笔头"},
                                    {name: "中性笔头"},
                                    {name: "纤维笔头"},
                                    {name: "墨水"},
                                    {name: "墨水"},
                                    {name: "尾油"},
                                    {name: "油管"},
                                    {name: "钢笔尖"},
                                    {name: "钢笔尖"},
                                    {name: "吸水器"},
                                    {name: "墨囊"},
                                    {name: "墨水胆"},
                                    {name: "连接件"},
                                    {name: "球珠"},
                                    {name: "其他笔芯配件"}
                                ]
                            },
                            {
                                name: "机械设备",
                                goods_specification_values: [
                                    {name: "注塑设备"},
                                    {name: "装配设备"},
                                    {name: "检测设备"},
                                    {name: "包装设备"},
                                    {name: "印刷设备"},
                                    {name: "其他机械设备"}
                                ]
                            },
                            {
                                name: "包装",
                                goods_specification_values: [
                                    {name: "吸塑包装"},
                                    {name: "纸盒包装"},
                                    {name: "木盒包装"},
                                    {name: "塑胶盒包装"},
                                    {name: "金属盒包装"},
                                    {name: "OPP袋"},
                                    {name: "绒布袋"},
                                    {name: "展示盒"},
                                    {name: "展架"},
                                    {name: "其他包装"}
                                ]
                            },
                            {
                                name: "表面处理",
                                goods_specification_values: [
                                    {name: "电镀"},
                                    {name: "喷漆"},
                                    {name: "喷胶"},
                                    {name: "喷胶"},
                                    {name: "UV喷涂"},
                                    {name: "氧化"},
                                    {name: "其他表面处理"}
                                ]
                            },
                            {
                                name: "模具",
                                goods_specification_values: [
                                    {name: "整模输出"},
                                    {name: "精雕"},
                                    {name: "芯棒"},
                                    {name: "型腔"},
                                    {name: "模具配件"},
                                    {name: "其他模具制造"}
                                ]
                            },
                            {
                                name: "原材料",
                                goods_specification_values: [
                                    {name: "塑料"},
                                    {name: "金属"},
                                    {name: "颜料"},
                                    {name: "油漆"},
                                    {name: "其他原材料"}
                                ]
                            },
                            {
                                name: "印刷工艺",
                                goods_specification_values: [
                                    {name: "丝印"},
                                    {name: "移印"},
                                    {name: "烫金"},
                                    {name: "UV"},
                                    {name: "激光雕刻"},
                                    {name: "热转印"},
                                    {name: "滴胶"},
                                    {name: "其他印刷工艺"}
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
                                    {name: "圆珠笔芯"},
                                    {name: "中性笔芯"},
                                    {name: "水性笔芯（宝珠笔芯"},
                                    {name: "可擦笔芯"},
                                    {name: "铅芯"},
                                    {name: "纤维笔芯"}
                                ]
                            },
                            {
                                name: "笔头",
                                goods_specification_values: [
                                    {name: "子弹头笔芯"},
                                    {name: "针管笔芯"},
                                    {name: "半针管笔芯"}
                                ]
                            },
                            {
                                name: "油管",
                                goods_specification_values: [
                                    {name: "塑料杆笔芯"},
                                    {name: "钢杆笔芯"},
                                    {name: "巨无霸笔芯"},
                                    {name: "常规笔芯"},
                                    {name: "透明油管笔芯"},
                                    {name: "实色油管笔芯"}
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
                username: ""
            };
        },
        computed: {},
        created() {
            setInterval(() => {
                this.username = localStorage.getItem("username");
            }, 10);
            if (localStorage.getItem("searchRecord"))
                this.searchList = JSON.parse(localStorage.getItem("searchRecord"));
            this.username = localStorage.getItem("username");
            this.getScope();
            this.getGoodsSpe();
        },
        mounted() {
            var path = this.$route.path;
            this.navList.map(item1 => {
                if (item1.url == path) {
                    item1.active = true;
                } else {
                    item1.active = false;
                }
            });
            document.addEventListener("click", e => {
                if (e.target.className != "shopClassifyBox") {
                    this.toggle = false;
                }
            });
        },
        methods: {
            siteNavigationShow($event) {
                this.NavigationShow = true;
            },
            siteNavigationHidden($event) {
                this.NavigationShow = false;
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
            // handleChange(event, item, index) {
            //   //   if (index == 1) {
            //   //     event.cancelBubble = true;
            //   //     this.toggle = !this.toggle;
            //   //     return;
            //   //   } else {
            //   //     this.navList[1].name = "商品类型";
            //   //   }
            //   this.navList.map(item1 => {
            //     if (item1.name == item.name) {
            //       item1.active = true;
            //     } else {
            //       item1.active = false;
            //     }
            //   });

            //   // this.$router.push(item.url);
            //   window.open(item.url);
            //   this.$forceUpdate();
            // },
            handleChange(event, item, index) {
                //   if (index == 1) {
                //     event.cancelBubble = true;
                //     this.toggle = !this.toggle;
                //     return;
                //   } else {
                //     this.navList[1].name = "商品类型";
                //   }
                //   this.navList.map(item1 => {
                //     if (item1.name == item.name) {
                //       item1.active = true;
                //     } else {
                //       item1.active = false;
                //     }
                //   });
                //   this.$router.go(0);
                window.open(item.url);
            },
            toShoppingTrolley() {
                this.navList.map(item => {
                    item.active = false;
                });
                this.$router.push("shoppingTrolley");
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
                    query: {input: this.input, scope: ""}
                });
            },
            searchScop(scope, index) {
                this.navList.map(item => {
                    this.toggle = false;
                    if (item.name == this.navList[1].name) {
                        item.name = scope;
                        item.active = true;
                    } else {
                        item.active = false;
                    }
                });
                this.$router.push({
                    path: "/springboard",
                    query: {scope: scope, input: ""}
                });
            },
            //获取经营范围
            getScope() {
                this.$http({
                    url: `${url.scope}`,
                    method: "get"
                })
                    .then(res => {
                        this.scopeList = res.data.data;
                    })
                    .catch(err => {
                    });
            },

            changeType(index) {
                if (index == "2") {
                    this.$http({
                        url: `${url.mountingsScope}`,
                        method: "get"
                    })
                        .then(res => {
                            this.scopeList = res.data.data;
                        })
                        .catch(err => {
                        });
                }

                if (index == "1") {
                    this.$http({
                        url: `${url.scope}/cartridgeScope`,
                        method: "get"
                    })
                        .then(res => {
                            this.scopeList = res.data.data;
                        })
                        .catch(err => {
                        });
                }

                if (index == "0") {
                    this.getScope();
                }
            },

            toGoods() {
                window.open("/allGoods");
                location.reload();
            },

            //退出
            exit() {
                this.$confirm("是否退出?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                    .then(() => {
                        var roles = localStorage.getItem("roles");
                        localStorage.removeItem("ID");
                        localStorage.removeItem("username");
                        localStorage.removeItem("roles");
                        localStorage.removeItem("remember");
                        localStorage.removeItem("Authorization");
                        this.$message({
                            type: "success",
                            message: "退出成功!"
                        });
                        if (
                            this.$route.path == "/userCenter" ||
                            this.$route.path == "/buyInfo" ||
                            this.$route.path == "/userFavorite" ||
                            this.$route.path == "/userPublish"
                        ) {
                            this.$router.push("/index");
                        } else {
                            location.reload();
                        }
                    })
                    .catch(() => {
                        this.$message({
                            type: "info",
                            message: "已取消删除"
                        });
                    });
            },
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
                    var href = `${url.supplierUrl}/jump?Authorization=${Authorization}&a=${username}&roles=${roles}&id=${id}&expireTime=${expireTime}`;
                    window.open(href);
                    return;
                }
                if (localStorage.roles.indexOf("dealer") != -1) {
                    var href = `${url.dealerUrl}/jump?Authorization=${Authorization}&a=${username}&roles=${roles}&id=${id}&expireTime=${expireTime}`;
                    window.open(href);
                    return;
                }
                this.$router.push("/userInfo");
            },

            toDealerInfo() {
                var username = localStorage.getItem("username");
                var password = localStorage.getItem("password");
                var roles = localStorage.getItem("roles");
                var Authorization = localStorage.getItem("Authorization");
                var id = localStorage.getItem("ID");
                var expireTime = localStorage.getItem("expireTime");
                if (!username) {
                    this.$message("您还未登录，请先登录");
                    this.$router.push("/login");
                    return;
                }
                if (localStorage.roles.indexOf("dealer") != -1) {
                    location.href = `${url.dealerUrl}/`;
                    return;
                }
                this.$router.push("/disIntroduce");
            },

            toProviderInfo() {
                var username = localStorage.getItem("username");
                var password = localStorage.getItem("password");
                var roles = localStorage.getItem("roles");
                var Authorization = localStorage.getItem("Authorization");
                var id = localStorage.getItem("ID");
                var expireTime = localStorage.getItem("expireTime");
                if (!username) {
                    this.$message("您还未登录，请先登录");
                    this.$router.push("/login");
                    return;
                }
                if (localStorage.roles.indexOf("provider") != -1) {
                    location.href = `${url.supplierUrl}/`;
                    return;
                }

                this.$router.push("/supIntroduce");
            },
            // 点击商品区域,阻止事件冒泡
            cancelBuble() {
            },
            //   点击商品标题实现tab栏切换
            handleTab(item, index) {
                this.tabShow = index;
                this.changeType(index);
            },
            //img
            imgUpload(event) {
                this.imgUptime = !this.imgUptime;
                var formData = new FormData();
                formData.append(`file`, event.target.files[0]);
                this.$http({
                    //url:'http://172.16.0.138:9009/search',
                    url: `${url.searchGoods}`,
                    method: "post",
                    data: formData,
                    headers: {"Content-Type": "multipart/form-data"}
                }).then(res => {
                    var file = document.getElementById("img");
                    file.value = "";
                    this.ids = JSON.stringify(res.data.data);
                    localStorage.setItem("goodsIds", this.ids);
                    setTimeout(() => {
                        this.imgUptime = !this.imgUptime;
                    }, 0);
                    this.$router
                        .push({
                            path: "/springboard",
                            query: {ids: res.data.data.length}
                        })
                        .catch(err => {
                            setTimeout(() => {
                                this.imgUptimes = !this.imgUptimes;
                            }, 0);
                        });
                });
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
                            this.typeList[0].data = this.goodsSpeList;
                        });
                        this.findGuessYouLikes();
                        this.typeList[0].data = this.goodsSpeList;
                    }
                });
            },
            // 切割数据
            roundNumber(length) {
                return Math.ceil(parseFloat(length / 3));
            },
            // 隐藏商品分类明细
            handleGoodsSpeHidden(index) {
                this.goodSpeShowList[index] = false;
                this.$forceUpdate();
            },
            // 显示商品分类详情
            handleGoodsSpeShow(index) {
                this.goodSpeShowList[index] = true;
                this.$forceUpdate();
            },
            handelClassifyShow() {
                this.isMove = true;
                this.isShowClassify = true;
            },
            handelClassifyHidden() {
                this.isShowClassify = false;
                setTimeout(() => {
                    if (!this.isShowClassify) this.isMove = false;
                }, 100);
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
            toAllGoodsHref(urls) {
                localStorage.setItem("goodsIds", "");
                location.href = `${url.shopUrl}/allGoods?` + urls;
            },

            toDetail(goods) {
                this.utils.toDetailsss(goods);
            }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  $color: #d21d27;
  .tabActive {
    color: rgba(61, 145, 231, 1);
  }

  .header {
    position: relative;
  }

  .shopClassifyBox {
    position: absolute;
    top: 150px;
    z-index: 100;
    display: flex;
    width: 100%;
    justify-content: space-around;
    background-color: #ffffff;
    text-align: center;
    padding-bottom: 30px;

    .shopClassify_ttile {
      margin: 20px 0;
      height: 45px;
      line-height: 45px;
      font-size: 20px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
    }

    > div {
      width: 100%;

      ul {
        display: flex;
        flex-wrap: wrap;

        li {
          width: 20%;
          height: 65px;
          line-height: 65px;
          cursor: pointer;
          font-size: 16px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
        }
      }
    }

    //   div:nth-child(1) p {
    //     border-right: 2px dashed rgb(102, 102, 102);
    //   }
  }

  .header_search {
    display: block;
    width: 100%;
    height: 36px;

    .header_searchs {
      width: 100%;
      height: 36px;
      background: white;
      border: 2px solid $color;
      border-radius: 4px;
      // display: inline-flex;
      position: relative;
      // align-items: center;
      .searchInput {
        margin-left: 16px;
        height: 30px;
        width: 80%;
      }

      .searchBtn {
        background: $color;
        width: 68px;
        height: 33px;
        color: white;
        position: absolute;
        right: 0px;
        top: 0px;
        font-size: 16px;
        z-index: 9999;
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

  .fr {
    float: right;
    font-size: 14px;
    font-family: MicrosoftYaHeiLight, 微软雅黑;
    font-weight: 300;
    margin-top: 10px;
    padding-right: 20px;

    a {
      color: #cccccc !important;
      margin-left: 10px;
    }
  }

  .header {
    position: relative;
    height: 150px;

    .head_img {
      margin-top: 10px;
      margin-left: 25px;
    }
  }

  .header_nav {
    display: block;
    position: absolute;
    bottom: 0px;
    width: 100%;
    height: 36px;

    > ul {
      margin-left: 50px;
      display: inline-block;
      font-size: 12px;
      font-family: MicrosoftYaHeiLight, 微软雅黑;
      font-weight: 300;
      color: rgba(51, 51, 51, 1);
      padding-left: 225px;
      padding-top: 5px;

      li {
        float: left;
        margin-right: 30px;
        cursor: pointer;
        margin: 0 30px 0 20px;
      }
    }
  }

  .active {
    color: $color;
    border-bottom: 2px solid $color;
  }

  .shopClassTitle {
    display: flex;
    justify-content: space-around;
    border-bottom: 1px solid #ccc;

    p {
      width: 100px;
      cursor: pointer;
    }
  }

  .shopClassifyBox div:nth-child(1) p:nth-last-child(1) {
    // border: none;
  }

  .middle_hade {
    width: 642px;
    display: inline-block;
    margin-top: 40px;
    margin-left: 100px;
  }

  .shoppingCart {
    position: absolute;
    width: 120px;
    height: 80px;
    background: #f8fbfe;
    border: 1px solid #e0edfb;
    border-radius: 8px;
    display: inline-block;
    right: 15px;
    top: 25px;

    span {
      font-size: 12px;
      font-family: MicrosoftYaHeiLight, 微软雅黑;
      font-weight: 300;
      color: rgba(102, 102, 102, 1);
    }

    img {
    }
  }

  .rests {
    margin: 10px 0;

    span {
      font-size: 12px;
      font-family: MicrosoftYaHeiLight, 微软雅黑;
      font-weight: 300;
      color: rgba(153, 153, 153, 1);
      margin-right: 10px;
    }
  }

  .centerlist {
    display: inline-block;
    float: right;
    margin-right: 100px;
    position: relative;

    span {
      cursor: pointer;
      height: 100%;
      display: inline-block;
      padding: 0 10px;
    }
  }

  .allcategories {
    display: inline-block;
    width: 220px;
    height: 36px;
    background: rgba(210, 29, 39, 1);
    box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.16);
    border-radius: 2px 2px 0px 0px;
    position: relative;
    font-size: 12px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 36px;
    cursor: pointer;

    .allcategories_i {
      position: absolute;
      left: 30%;
      transform: translateX(-50%);
      font-size: 14px;
    }

    span {
      position: absolute;
      left: 54%;
      transform: translateX(-50%);
    }
  }

  .ruzhu {
    display: inline-block;
    position: absolute;
    right: 15px;

    img {
      margin-left: 30px;
      cursor: pointer;
    }
  }

  .commonHeader {
    background-color: #fff;
    // 商品分类开始
    .sortList {
      position: relative;
      width: 220px;
      background-color: #2d2e3e;
      box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.16);
      border-radius: 2px;
      min-height: 460px;
      z-index: 5;
      margin-top: -3px;

      .sortDetail {
        color: #fff;
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
          font-family: MicrosoftYaHeiLight, 微软雅黑;
          font-weight: 400;
          color: #ffffff;
          cursor: pointer;
        }
      }

      .listDetail {
        li {
          font-size: 14px;
          font-family: MicrosoftYaHeiLight, 微软雅黑;
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

    //   商品隐藏部分开始
    // .hiddenGoods {
    //   width: 980px;
    //   height: 460px;
    //   // box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.12);
    //   border: 2px solid $color;
    //   position: absolute;
    //   z-index: 10;
    //   background: #fff;
    //   top: 35px;
    //   left: 220px;
    //   .hiddenGoodsLeft {
    //     float: left;
    //     width: 683px;
    //     height: 456px;
    //     border-right: 1px solid #f0f0f0;
    //     ul {
    //       padding: 8px 15px;
    //       li {
    //         position: relative;
    //         display: inline-block;
    //         // width: 10%;
    //         text-align: center;
    //         //     text-overflow: ellipsis;
    //         //         white-space: nowrap;
    //         // overflow: hidden;
    //         padding: 6px 10px;
    //         border: 0;
    //         margin: 10px 20px;
    //         color: #666;
    //         font-size: 12px;
    //         cursor: pointer;
    //       }
    //       li:hover {
    //         color: $color;
    //       }
    //     }
    //   }
    //   .hiddenGoodsRight {
    //     float: left;
    //     width: 293px;
    //     .guessyoulikeTitle {
    //       height: 50px;
    //       line-height: 50px;
    //       font-size: 14px;
    //     font-family: MicrosoftYaHeiLight,微软雅黑;
    //       font-weight: bold;
    //       color: rgba(102, 102, 102, 1);
    //       text-align: center;
    //     }
    //     .guessyoulikeContent {
    //       ul {
    //         li {
    //           float: left;
    //           width: 50%;
    //           margin-bottom: 19px;
    //           cursor: pointer;
    //           img {
    //             display: block;
    //             margin: auto;
    //             width: 100px;
    //             height: 87px;
    //           }

    //           h3 {
    //             padding: 7px 32px;
    //             font-size: 12px;
    //             font-family: MicrosoftYaHei;
    //             font-weight: 400;
    //             color: rgba(153, 153, 153, 1);
    //             text-overflow: ellipsis;
    //             white-space: nowrap;
    //             text-align: center;
    //             overflow: hidden;
    //           }
    //         }
    //         li:hover img {
    //           box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.12);
    //         }
    //       }
    //     }
    //   }

    //   .clickBtn {
    //   }
    // }
    .hiddenGoods {
      width: 980px;
      height: 460px;
      // box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.12);
      border: 2px solid $color;
      position: absolute;
      z-index: 10;
      background: #fff;
      top: 37px;
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
          font-family: MicrosoftYaHeiLight, 微软雅黑;
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
                width: 100px;
                height: 87px;
              }

              h3 {
                padding: 7px 32px;
                font-size: 12px;
                font-family: MicrosoftYaHei;
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

    //   商品隐藏部分结束

    .headerClassify {
      position: absolute;
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
        font-family: MicrosoftYaHeiLight, 微软雅黑;
        font-weight: bold;
        color: rgba(210, 29, 39, 1);
      }
    }
  }

  //网站导航弹窗
  .siteNavigation {
    width: 852px;
    height: 262px;
    background: rgba(246, 246, 246, 1);
    // border-right: 1px solid #999999;
    // border-left: 1px solid #999999;
    // border-bottom: 1px solid #999999;
    box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.14);
    position: absolute;
    z-index: 999999;
    right: 0;
    padding: 20px;

    .siteNavigation_a {
      width: 48%;
      display: inline-block;
      border-right: 1px dashed #e0e0e0;
      height: 100%;

      h4 {
        font-size: 14px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(210, 29, 39, 1);
      }

      ul {
        display: inline-block;

        li {
          display: inline-block;
          min-width: 15%;
          cursor: pointer;
          height: 40px;
          line-height: 50px;
        }
      }
    }

    .siteNavigation_b {
      width: 49%;
      display: inline-block;
      height: 100%;
      float: right;

      h4 {
        font-size: 14px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(210, 29, 39, 1);
      }

      ul {
        display: inline-block;

        li {
          display: inline-block;
          margin-right: 28px;
          cursor: pointer;
          height: 40px;
          line-height: 50px;
        }
      }
    }
  }

  .active_site {
    background: #f6f6f6;
    // border-right: 1px solid #999999;
    // border-left: 1px solid #999999;
    box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.14);
  }
</style>
<style>
  .el-header {
    padding: 0;
  }

  .labelTest {
    cursor: pointer;
  }
</style>
