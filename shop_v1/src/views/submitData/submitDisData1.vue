<!-- 组件说明 -->
<template
v-loading="submitLoading">
  <div class="registerBox">
    <Header></Header>
    <div class="amendtTitle w" style="margin:10px  auto; ">
      <p>笔海弄潮采购商会员申请资料</p>
    </div>
    <div class="amend-user w">
      <div class="amend-msg">
        <ul>
          <li style="display:flex;justify-content:flex-start;">
            <span>公司名称：</span>
            <div>
              <input
                type="text"
                v-model="user.company_name"
                placeholder="请输入公司名称"
                @blur="checkCompanyIsExist(user.company_name)"
                id="company_name"
              />
              <i class="startMark">﹡</i>
              <div class="tips">
                <span class="isOk" v-if="isCompanyExist=='1'">
                  <i class="iconfont icon-roundcheck"></i> 输入的公司名可以注册
                </span>
                <span class="rejected" v-if="isCompanyExist == '0'">
                  <i class="iconfont icon-guanbi2"></i> 输入的公司名已存在，请重新核对！
                </span>
              </div>
            </div>
          </li>
          <li>
            <span>采购商分类：</span>
            <div class="scopr-box">
              <div class="scope-item" style="width:460px;">
                <el-select
                  v-model="user.scope"
                  multiple
                  filterable
                  placeholder="请选择采购商分类"
                  @change="selectAll"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name"
                    style="width:93%"
                  ></el-option>
                </el-select>
                <p
                  style="flex: 1;text-align: left;color: #ff0000;font-size: 12px;line-height: 1;font-weight:600"
                  v-if="scopeWarn"
                >
                  <i class="iconfont icon-guanbi2"></i>
                  {{scopeWarn}}
                </p>
              </div>
            </div>
            <i class="startMark">﹡</i>
          </li>
          <li>
            <span>地区：</span>
            <div>
              <span class="user-city">{{user.region}}</span>
              <el-cascader
                size="large"
                :options="citys"
                v-model="selectedOptions"
                @change="handleChange"
                class="diqu"
                id="region"
              ></el-cascader>
              <i class="startMark">﹡</i>
              <p
                style="flex: 1;text-align: left;color: #ff0000;font-size: 12px;line-height: 1;font-weight:600"
                v-if="regionWarn"
              >
                <i class="iconfont icon-guanbi2"></i>
                {{regionWarn}}
              </p>
            </div>
          </li>
          <li>
            <span>联系地址：</span>
            <div>
              <input
                type="text"
                v-model="user.address"
                placeholder="请输入联系地址"
                :style="addressWarn? 'border: 1px solid #f56c6c;':''"
                id="address"
                @blur="checkFrom(3)"
              />
              <i class="startMark">﹡</i>
              <p
                style="flex: 1;text-align: left;color: #ff0000;font-size: 12px;line-height: 1;font-weight:600"
                v-if="addressWarn"
              >
                <i class="iconfont icon-guanbi2"></i>
                {{addressWarn}}
              </p>
            </div>
          </li>
          <li style="display:flex;justify-content:flex-start;    align-items: flex-start;">
            <span>法人：</span>
            <div>
              <input
                type="text"
                placeholder="请输入法人"
                v-model="user.legal_man"
                :style="legal_manWarn? 'border: 1px solid #f56c6c;':''"
                id="legal_man"
                @blur="checkFrom(4)"
              />

              <!-- <p style="line-height:1;font-size:12px;color:#b5b5b5;   text-align: left;">（法人信息不对外公开）</p> -->

              <p
                style="flex: 1;text-align: left;color: #ff0000;font-size: 12px;line-height: 1;font-weight:600"
                v-if="legal_manWarn"
              >
                <i class="iconfont icon-guanbi2"></i>
                {{legal_manWarn}}
              </p>
            </div>
          </li>
          <li style="display:flex;justify-content:flex-start;    align-items: flex-start;">
            <span>法人移动电话：</span>
            <div>
              <input
                type="number"
                v-model="user.phone"
                placeholder="请输入法人手机号码"
                :style="phoneWarn? 'border: 1px solid #f56c6c;':''"
                id="phone"
                @blur="checkFrom(5)"
              />
              <div class="selectInfo">
                <input type="radio" name="openInfo" id="openInfo" />
                <label for="openInfo" style="margin-right:54px;">不公开法人信息</label>
                <input type="radio" name="openInfo" id="closeInfo" />
                <label for="closeInfo">公开法人信息</label>
              </div>
              <p
                style="flex: 1;text-align: left;color: #ff0000;font-size: 12px;line-height: 1;font-weight:600"
                v-if="phoneWarn"
              >
                <i class="iconfont icon-guanbi2"></i>
                {{phoneWarn}}
              </p>
            </div>
          </li>
          <li style="display:flex">
            <span>业务联系人：</span>
            <div>
              <input type="text" v-model="user.linkman" placeholder="请输入联系人" />
              <i class="startMark">﹡</i>
              <p style="line-height:1;font-size:12px;color:#b5b5b5;     text-align: left;">（对外公开联系人）</p>
            </div>
          </li>
          <li style="position: relative;display: flex;align-items: flex-start;">
            <span style>业务移动电话：</span>
            <div style="overflow: hidden;">
              <li style="height:60px;" v-for="(phoneItem,mindex) in mobilePhone" :key="mindex">
                <input type="number" v-model="mobilePhone[mindex]" placeholder="请输入手机号码" />
              </li>
            </div>
            <div class="Btn-box">
              <i class="addsBtn iconfont icon-jiahao2" @click="addMPhone"></i>
              <i class="addsBtn iconfont icon-jian" @click="delMPhone" v-show="showMobBtn"></i>
            </div>
          </li>
          <li style="position: relative;display: flex;align-items: flex-start;">
            <span style>固定电话：</span>
            <div style="overflow: hidden;">
              <li style="height:60px;" v-for="(phone,index) in fixPhone" :key="index">
                <input type="number" v-model="fixPhone[index]" placeholder="请输入固定电话" />
              </li>
            </div>

            <!-- <div class="adds">
              <el-button type="warning" icon="el-icon-plus" circle @click="addPhone"></el-button>
              <el-button type="danger" icon="el-icon-delete" circle @click="delPhone"></el-button>
            </div>-->
            <div class="Btn-box">
              <i class="addsBtn iconfont icon-jiahao2" @click="addPhone"></i>
              <i
                value="-"
                class="addsBtn addsBtn iconfont icon-jian"
                @click="delPhone"
                v-show="showReduce"
              ></i>
            </div>
          </li>

          <!-- <li>
            <span>QQ：</span>
            <input type="number" v-model="user.qq[0]" placeholder="请输入QQ号" />
          </li>-->
          <li style="position: relative;display: flex;align-items: flex-start;">
            <span style>QQ号码：</span>
            <div style="overflow: hidden;">
              <li style="height:60px;" v-for="(qqItem,qqindex) in qqArr" :key="qqindex">
                <input
                  type="number"
                  v-model="qqArr[qqindex]"
                  placeholder="请输入QQ号码"
                  :id="'qq'+qqindex"
                />
              </li>
            </div>
            <div class="Btn-box">
              <i value="+" class="addsBtn iconfont icon-jiahao2" @click="addQQArr"></i>
              <i
                value="-"
                class="addsBtn addsBtn iconfont icon-jian"
                @click="delQQArr"
                v-show="qqShow"
              ></i>
            </div>
          </li>

          <li style="display:flex;justify-content:flex-start;    align-items: flex-start;">
            <span>微信号：</span>
            <div>
              <input
                type="number"
                v-model="user.phone"
                placeholder="请输入微信号"
                :style="phoneWarn? 'border: 1px solid #f56c6c;':''"
                id="phone"
                @blur="checkFrom(5)"
              />
            </div>
          </li>
          <li style>
            <span>经营范围：</span>
            <div class="scopr-box">
              <div class="scope-item" style="width:460px;">
                <el-select
                  v-model="user.scope"
                  multiple
                  filterable
                  placeholder="请选择经营范围"
                  @change="selectAll"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name"
                    style="width:93%"
                  ></el-option>
                </el-select>
                <p
                  style="flex: 1;text-align: left;color: #ff0000;font-size: 12px;line-height: 1;font-weight:600"
                  v-if="scopeWarn"
                >
                  <i class="iconfont icon-guanbi2"></i>
                  {{scopeWarn}}
                </p>
              </div>
            </div>
          </li>
          <li class="companyProfile">
            <span>公司简介:</span>
            <textarea style="resize:none"></textarea>
          </li>
          <li style="margin-bottom: 30px;">
            <span>营业执照：</span>
            <div>
              <div class="upfile-box">
                <div class="up-file">
                  <img
                    :src="addImg"
                    alt
                    @click="onPickFile1()"
                    v-if="!user.business_img"
                    style="width:100%;height:116px;cursor: pointer;"
                  />
                  <div class="banner-img" v-else style="position:relative">
                    <img :src="user.business_img" style="width:100px;height:116px;" />
                    <img
                      :src="removeImg"
                      class="remove"
                      @click="offImg()"
                      style="width:30px;top:0px; right:0; position:absolute; "
                    />
                  </div>

                  <input
                    type="file"
                    accept="image/*"
                    style="display: none"
                    id="lfile"
                    @change="imgUpload($event)"
                  />
                </div>
              </div>
              <p
                style="flex: 1;text-align: left;color: #ff0000;font-size: 12px;line-height: 1;font-weight:600"
                v-if="business_imgWarn"
              >
                <i class="iconfont icon-guanbi2"></i>
                {{business_imgWarn}}
              </p>
            </div>
            <i class="startMark" style="align-self: flex-end;line-height: 1;">﹡</i>
          </li>
          <li>
            <span>其他证件：</span>
            <div class="upfile-box">
              <div class="up-file" v-for="(item,index) in other_imgList" :key="index">
                <img
                  :src="addImg"
                  alt
                  @click="onPickFile2(index)"
                  v-if="!item.img"
                  style="width:100%;height:116px;cursor: pointer;"
                />

                <div class="banner-img" v-else style="position:relative">
                  <img :src="item.img" style="width:100%;height:116px; " />
                  <a>
                    <img
                      :src="removeImg"
                      class="remove"
                      @click="offImg2(index)"
                      style="width:30px;top:0px; right:0; position:absolute; "
                    />
                  </a>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  style="display: none"
                  :id="'file'+index"
                  @change="imgUpload2($event,index)"
                />
              </div>
            </div>
          </li>
          <li class="isok_show">
            <input id="checkbox" type="checkbox" v-model="isOk" />
            <label for="checkbox">
              <i>
                <i v-show="dealer"></i>
              </i>
              <!-- <input
                type="checkbox"
                v-model="isOk"
                style="width: 14px;height: 36px;border: 1px solid #3d91e7;"
              />-->
              阅读并同意
              <router-link to="/agreementApply">
                <a style="color:#fc783f;text-decoration: none;">《笔海弄潮申请用户协议》</a>
              </router-link>
            </label>
          </li>
        </ul>
        <div class="btn-box">
          <input type="button" @click="goTo()" class="form_cancle" value="取消" />
          <input type="button" @click="amendUser(user.id)" class="registerBtn" value="注册" />
          <!-- <el-button type="info" plain @click="goTo()">取消</el-button>
          <el-button type="primary" plain @click="amendUser(user.id)">提交审核</el-button>-->
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import url from "@/serverAPI.config.js";
import Header from "../../components/header";
// import Footer from "../../components/footers";
import {
  provinceAndCityData,
  regionData,
  provinceAndCityDataPlus,
  regionDataPlus,
  CodeToText,
  TextToCode
} from "element-china-area-data";

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
    Header
    // Footer
  },
  data() {
    // var checkPhone = (rule, value, callback) => {
    //   if (!value) {
    //     return callback(new Error("手机号码不能为空"));
    //   }
    //   setTimeout(() => {
    //     if (
    //       !/^(((13[0-9])|(14[5-7])|(15[0-9])|(17[0-9])|(18[0-9]))+\d{8})$/.test(
    //         value
    //       )
    //     ) {
    //       callback(new Error("请输入正确的手机号码"));
    //     } else {
    //       callback();
    //     }
    //   }, 1000);
    // };
    // var validatePass = (rule, value, callback) => {
    //   if (value === "") {
    //     callback(new Error("请输入密码"));
    //   } else {
    //     if (this.ruleForm.checkPass !== "") {
    //       this.$refs.ruleForm.validateField("checkPass");
    //     }
    //     callback();
    //   }
    // };
    // var validateNickname = (rule, value, callback) => {
    //   if (value === "") {
    //     callback(new Error("请输入昵称"));
    //   } else {
    //     callback();
    //   }
    // };
    // var validatePass2 = (rule, value, callback) => {
    //   if (value === "") {
    //     callback(new Error("请再次输入密码"));
    //   } else if (value !== this.ruleForm.pass) {
    //     callback(new Error("两次输入密码不一致!"));
    //   } else {
    //     callback();
    //   }
    // };
    // var validateCode = (rule, value, callback) => {
    //   if (!value) {
    //     callback(new Error("验证码不能为空"));
    //   } else {
    //     callback();
    //   }
    // };
    return {
      all: [],
      username: "",
      provider: false,
      dealer: false,
      pattern1: false,
      pattern2: false,
      pattern3: false,
      clear: true,
      showImg: true,
      addImg: require("../../assets/img/add.png"),
      removeImg: require("../../assets/img/remove.png"),
      other_imgList: [{ img: "" }],
      brandImgs: [{ img: "" }],
      patentImgs: [{ img: "" }],
      ruleForm: {
        pass: "",
        checkPass: "",
        num: "",
        phone: "",
        nickname: ""
      },
      // rules: {
      //   pass: [{ validator: validatePass, trigger: "blur" }],
      //   checkPass: [{ validator: validatePass2, trigger: "blur" }],
      //   phone: [{ validator: checkPhone, trigger: "blur" }],
      //   num: [{ validator: validateCode, trigger: "blur" }],
      //   nickname: [{ validator: validateNickname, trigger: "blur" }]
      // },
      disabled: false,
      checkVal: "发送验证码",
      user: { qq: [] },
      options: [], //经营范围
      selectedOptions: [], //默认城市
      citys: regionData, //存放城市数据
      dialogImageUrl: "",
      dialogVisible: false,
      // 固话数组数据
      fixPhone: [""],
      isOk: false,
      showReduce: false,
      showMobBtn: false,
      //   手机号码数组
      mobilePhone: [""],
      // qq数组
      qqArr: [""],
      qqShow: false,
      isCompanyExist: "3",
      dealerShow: true,
      providerShow: true,
      saveCName: "",
      regionWarn: "",
      linkmanWarn: "",
      addressWarn: "",
      scopeWarn: "",
      business_imgWarn: "",
      legal_manWarn: "",
      phoneWarn: "",
      dealerScopeList: [],
      providerScopeList: []
    };
  },
  created() {
    if (!localStorage.getItem("username")) {
      this.$message({
        message: "您还未登录，请登录！",
        type: "warning"
      });
      this.$router.push("/login");
      return;
    }
    if (
      !localStorage.getItem("username") &&
      localStorage.getItem("roles").indexOf("dealer") == -1 &&
      localStorage.getItem("roles").indexOf("provider") == -1
    ) {
      this.$router.push("/");
    }
    this.getUserMsg();
    this.getScope();
    this.getDealerScope();
    this.getProviderScope();

    // this.username = localStorage.getItem("roles");
    // if (!this.username) {
    //   this.$router.push("/register");

    // } else {

    // }
  },
  methods: {
    //获取城市列表
    handleChange(value) {
      this.user.region =
        CodeToText[value[0]] +
        "-" +
        CodeToText[value[1]] +
        "-" +
        CodeToText[value[2]];

      this.checkFrom(2);
    },

    //经营范围全选
    selectAll(val) {
      if (val.includes("全部") && val.length < this.options.length - 1) {
        (this.user.scope = []),
          this.options.map(item => {
            this.user.scope.push(item.name);
          });
      }
      if (val.includes("全部") && val.length == this.options.length - 1) {
        this.user.scope.splice(this.user.scope.indexOf("全部"), 1);
      }

      if (!val.includes("全部") && val.length == this.options.length - 1) {
        this.user.scope.push("全部");
      }
      if (
        !val.includes("全部") &&
        val.length == this.options.length - 1 &&
        this.user.scope.length == this.options.length
      ) {
        this.user.scope = [];
      }
      this.checkFrom(5);
    },

    //点击事件
    onPickFile1() {
      document.querySelector(`#lfile`).click();
    },
    onPickFile2(index) {
      document.querySelector(`#file${index}`).click();
    },
    //获取当前用户信息
    getUserMsg() {
      if (!localStorage.getItem("username")) {
        return;
      }
      this.$http({
        url: `${url.getUserMsg}`,
        method: "get"
      })
        .then(res => {
          if (res.data.code == 20000) {
            this.user = res.data.data;
            this.user.scope = JSON.parse(this.user.scope);
            //   this.qqArr = JSON.parse(this.user.qq);
            if (JSON.parse(this.user.qq) == null) {
              this.qqArr = [""];
            } else {
              this.qqArr = JSON.parse(this.user.qq);
            }
            if (JSON.parse(this.user.fixPhone) == null) {
              this.fixPhone = [""];
            } else {
              this.fixPhone = JSON.parse(this.user.fixPhone);
            }

            if (JSON.parse(this.user.phone_more) == null) {
              this.mobilePhone = [""];
            } else {
              this.mobilePhone = JSON.parse(this.user.phone_more);
            }
            this.saveCName = this.user.company_name;
            this.user.roles.map(item => {
              if (item.id == "1") {
                this.dealer = true;
                this.dealerShow = false;
              }
              if (item.id == "2") {
                this.provider = true;
                this.providerShow = false;
              }
            });
            if (!this.dealerShow) {
              this.provider = true;
            }

            if (!this.providerShow) {
              this.dealer = true;
            }
            if (this.user.pattern.indexOf("加工制作") > -1) {
              this.pattern1 = true;
            }
            if (this.user.pattern.indexOf("自有品牌运营") > -1) {
              this.pattern2 = true;
            }
            if (this.user.pattern.indexOf("专利产品授权生产") > -1) {
              this.pattern3 = true;
            }
            this.user.other_img = JSON.parse(this.user.other_img);
            var imgs = [];
            this.user.other_img.map(item => {
              imgs.push({ img: item });
            });
            imgs.push({ img: "" });
            this.other_imgList = imgs;

            this.brandImgs = [];
            this.user.brand_img = JSON.parse(this.user.brand_img);
            this.user.brand_img.map(res => {
              if (res) {
                this.brandImgs.push({ img: res });
              }
            });
            this.brandImgs.push({ img: "" });

            this.patentImgs = [];
            this.user.patent_img = JSON.parse(this.user.patent_img);
            this.user.patent_img.map(res => {
              if (res) {
                this.patentImgs.push({ img: res });
              }
            });
            this.patentImgs.push({ img: "" });
          }
        })
        .catch(err => {});
    },
    //获取经营范围
    getScope() {
      this.$http({
        url: `${url.scope}`,
        method: "get"
      })
        .then(res => {
          this.options = res.data.data;
          this.options.unshift({ id: "all", name: "全部" });
        })
        .catch(err => {});
    },
    //提交用户信息
    amendUser(id) {
      if (!this.isOk) {
        if (document.querySelectorAll(".el-message--error").length < 1) {
          this.$message.error("请先阅读确认协议后提交");
        }
        return;
      }
      var user = JSON.parse(JSON.stringify(this.user));
      /* this.user.scope = JSON.stringify(this.user.scope)
                this.user.business_img = JSON.stringify(this.user.business_img)
                this.user.other_img = JSON.stringify(this.user.other_img)
                */
      var to = true;
      // this.$refs["ruleForm"].validate(valid => {
      //   if (valid) {
      //   } else {
      //     to = false;
      //     return false;
      //   }
      // });
      if (!to) {
        this.warn("请先填写完整账号信息");
        return;
      }
      this.checkFrom();
      if (!this.user.company_name) {
        this.warn("公司名称不能为空");
        this.toFocus("company_name");
        return;
      }
      if (!this.user.region) {
        this.warn("请选择地区");
        this.toFocus("company_name");
        return;
      }
      if (!this.user.address) {
        this.warn("联系地址不能为空");
        this.toFocus("address");
        return;
      }
      if (!this.user.legal_man) {
        this.toFocus("legal_man");
        this.warn("法人/负责人不能为空");
        return;
      }

      if (!this.user.phone) {
        this.warn("法人手机号码不能为空");
        this.toFocus("phone");
        return;
      }

      if (!this.user.scope.length > 0) {
        this.warn("经营范围不能为空");
        this.toFocus("qq0");
        return;
      }
      if (!this.user.business_img) {
        this.toFocus("qq0");
        this.warn("请上传营业执照");
        return;
      }
      var otherImgs = [];
      this.other_imgList.map(item => {
        if (item.img) {
          otherImgs.push(item.img);
        }
      });
      var brandImgs = [];
      this.brandImgs.map(item => {
        if (item.img) {
          brandImgs.push(item.img);
        }
      });

      var patentImgs = [];
      this.patentImgs.map(item => {
        if (item.img) {
          patentImgs.push(item.img);
        }
      });
      var rids = [];
      if (this.dealer) {
        rids.push({ id: "1" });
      }
      if (this.provider) {
        rids.push({ id: "2" });
      }
      var pattern = [];
      if (this.pattern1) {
        pattern.push("加工制作");
      }
      if (this.pattern2) {
        pattern.push("自有品牌运营");
      }
      if (this.pattern3) {
        pattern.push("专利产品授权生产");
      }

      user.fixPhone = JSON.stringify(this.fixPhone);
      user.pattern = JSON.stringify(pattern);
      user.roles = rids;
      user.other_img = JSON.stringify(otherImgs);
      user.brand_img = JSON.stringify(brandImgs);
      user.patent_img = JSON.stringify(patentImgs);
      user.scope.splice(user.scope.indexOf("全部"), 1);
      user.scope = JSON.stringify(user.scope);
      user.qq = JSON.stringify(this.qqArr);
      user.phone_more = JSON.stringify(this.mobilePhone);

      console.log(user);
      this.$confirm("是否提交？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "success"
      })
        .then(res => {
          this.$http({
            url: `${url.submitData}`,
            data: user,
            method: "post"
          }).then(res => {
            if (res.data.code === 20000) {
              this.$message({
                message: "提交成功!审核通过前以普通会员身份登录",
                type: "success",
                offset: 550
              });
              this.$router.push("/index");
            } else {
              this.$message({
                message: res.data.message,
                type: "warning"
              });
            }
          });
        })
        .catch(err => {});
    },
    checkFrom(index) {
      if (index == 1) {
        return;
      }
      if (!this.user.region) {
        this.regionWarn = "请选择地区";
      } else {
        this.regionWarn = "";
      }

      if (index == 2) {
        return;
      }
      if (!this.user.address) {
        this.addressWarn = "联系地址不能为空";
      } else {
        this.addressWarn = "";
      }

      if (index == 2) {
        return;
      }

      if (!this.user.legal_man) {
        this.legal_manWarn = "法人/负责人不能为空";
      } else {
        this.legal_manWarn = "";
      }

      if (index == 3) {
        return;
      }
      if (!this.user.phone) {
        this.phoneWarn = "法人手机号码不能为空";
      } else {
        this.phoneWarn = "";
      }

      if (index == 4) {
        return;
      }
      if (!this.user.scope.length > 0) {
        this.scopeWarn = "经营范围不能为空";
      } else {
        this.scopeWarn = "";
      }

      if (index == 5) {
        return;
      }
      if (!this.user.business_img) {
        this.business_imgWarn = "请上传营业执照";
      } else {
        this.business_imgWarn = "";
      }
    },
    toFocus(id) {
      document.getElementById(id).focus();
    },
    warn(str) {
      this.$message({
        message: str,
        type: "warning"
      });
    },
    goTo() {
      this.$router.push("/");
    },
    // 添加固话数组
    addPhone() {
      this.fixPhone.push("");
      if (this.fixPhone.length > 1) {
        this.showReduce = true;
      }
    },
    // 删除固话数组
    delPhone() {
      this.fixPhone.splice(this.fixPhone.length - 1, 1);
      if (this.fixPhone.length <= 1) {
        this.fixPhone.length = 1;
        this.showReduce = false;
      }
    },
    // 切换身份
    changeIndety(index) {
      this.isChange = index;
    },

    //   提交表单
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$http({
            url: `${url.register}`,
            method: "post",
            data: {
              phone: this.ruleForm.phone,
              password: this.ruleForm.pass,
              code: this.ruleForm.num
            }
          }).then(res => {
            if (res.data.code === 20000) {
              this.$router.push("/index");
            } else {
              this.$message({
                message: res.data.message,
                type: "warning"
              });
            }
          });
        } else {
          return false;
        }
      });
    },
    // 取消表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 发送验证码
    handleCheckNum() {
      if (!this.ruleForm.phone) {
        this.$message({
          message: "手机号不能为空",
          type: "warning"
        });
        return;
      }

      if (
        !/^(((13[0-9])|(14[5-7])|(15[0-9])|(17[0-9])|(18[0-9]))+\d{8})$/.test(
          this.ruleForm.phone
        )
      ) {
        this.$message({
          message: "请输入正确手机号",
          type: "warning"
        });
        return;
      }
      this.$http({
        url: `${url.sendCode}`,
        method: "post",
        data: {
          phone: this.ruleForm.phone
        }
      }).then(res => {
        if (res.data.code === 20000) {
          this.disabled = true;
          var num = 59;
          var _this = this;
          var timer = setInterval(() => {
            num--;
            _this.checkVal = `${num}s秒后获取短信`;
            if (num === 0) {
              this.disabled = false;
              clearInterval(timer);
              _this.checkVal = "发送验证码";
            }
          }, 1000);
        }
      });
    },
    //img
    imgUpload(event, index) {
      var formData = new FormData();
      formData.append(`file`, event.target.files[0]);
      this.$http({
        url: `${url.upload}`,
        method: "post",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" }
      }).then(res => {
        this.user.business_img = res.data;
        this.checkFrom();
        this.$forceUpdate();
      });
    },
    //关闭图片重新选
    offImg() {
      this.user.business_img = "";
      this.checkFrom();
      this.$forceUpdate();
    },
    //img
    imgUpload2(event, index) {
      var formData = new FormData();
      formData.append(`file`, event.target.files[0]);
      this.$http({
        url: `${url.upload}`,
        method: "post",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" }
      }).then(res => {
        this.other_imgList[index].img = res.data;
        if (this.other_imgList.length < 5) {
          this.other_imgList.push({ img: "" });
        }
      });
    },
    //关闭图片重新选
    offImg2(index) {
      this.other_imgList.splice(index, 1);
    },

    //商标
    onPickFile3(index) {
      document.querySelector(`#afile${index}`).click();
    },
    //img
    imgUpload3(event, index) {
      if (event.target.files[0].size > 1024 * 1024 * 2) {
        this.$message.error("图片不能大于2M!");
        return;
      }
      var formData = new FormData();
      formData.append(`file`, event.target.files[0]);
      this.$http({
        url: `${url.upload}`,
        method: "post",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" }
      }).then(res => {
        this.brandImgs[index].img = res.data;
        if (this.brandImgs.length < 5) {
          this.brandImgs.push({ img: "" });
        }
      });
    },
    //关闭图片重新选
    offImg3(index) {
      this.brandImgs.splice(index, 1);
    },

    //专利
    onPickFile4(index) {
      document.querySelector(`#bfile${index}`).click();
    },
    //img
    imgUpload4(event, index) {
      if (event.target.files[0].size > 1024 * 1024 * 2) {
        this.$message.error("图片不能大于2M!");
        return;
      }
      var formData = new FormData();
      formData.append(`file`, event.target.files[0]);
      this.$http({
        url: `${url.upload}`,
        method: "post",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" }
      }).then(res => {
        this.patentImgs[index].img = res.data;
        if (this.patentImgs.length < 5) {
          this.patentImgs.push({ img: "" });
        }
      });
    },
    //关闭图片重新选
    offImg4(index) {
      this.patentImgs.splice(index, 1);
    },

    // 增加手机数组
    addMPhone() {
      this.mobilePhone.push("");
      if (this.mobilePhone.length > 1) {
        this.showMobBtn = true;
      }
    },
    // 减少手机数组
    delMPhone() {
      this.mobilePhone.splice(this.mobilePhone.length - 1, 1);
      if (this.mobilePhone.length <= 1) {
        this.mobilePhone.length = 1;
        this.showMobBtn = false;
      }
    },
    // 增加qq数组
    addQQArr() {
      this.qqArr.push("");
      if (this.qqArr.length > 1) {
        this.qqShow = true;
      }
    },
    // 减少QQ数组
    delQQArr() {
      this.qqArr.splice(this.qqArr.length - 1, 1);
      if (this.qqArr.length <= 1) {
        this.qqArr.length = 1;
        this.qqShow = false;
      }
    },
    checkCompanyIsExist(companyName) {
      if (!companyName) {
        return;
      }
      if (this.saveCName == companyName) {
        return;
      }
      this.$http({
        url: `${url.companyIsExist}`,
        method: "post",
        data: { companyName: companyName }
      }).then(res => {
        if (res.data.code == 20000) {
          if (res.data.data) {
            this.isCompanyExist = "1";
          } else {
            this.isCompanyExist = "0";
          }
        } else {
          this.$message.error(res.data.message);
        }
      });
      if (companyName == "") {
        this.isCompanyExist == "3";
      }
    },
    getDealerScope() {
      this.$http({
        url: `${url.scope}/dealerScope`,
        method: "get"
      }).then(res => {
        if (res.data.code == 20000) {
          this.dealerScopeList = res.data.data;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    getProviderScope() {
      this.$http({
        url: `${url.scope}/providerScope`,
        method: "get"
      }).then(res => {
        if (res.data.code == 20000) {
          this.providerScopeList = res.data.data;
        } else {
          this.$message.error(res.data.message);
        }
      });
    }
  }
};
</script>

<style lang="scss">
.registerBox {
  .el-select .el-input.is-focus .el-input__inner {
    border: 1px solid rgba(102, 102, 102, 1);
  }
  .el-input__inner {
    border: 1px solid rgba(102, 102, 102, 1);
  }
  .selfStyle {
    .el-form-item__label {
      width: 125px;
      height: 20px;
      font-size: 20px;
      font-family: MicrosoftYaHei-Bold, 微软雅黑;
      font-weight: bold;
      color: rgba(61, 145, 231, 1);
    }
    .el-input__inner {
      width: 460px;
      height: 36px;
      border: 1px solid rgba(102, 102, 102, 1);
      border-radius: 8px;
    }
  }

  .diqu .el-input--large .el-input__inner {
    width: 240px;
    height: 36px;
    border: 1px solid rgba(102, 102, 102, 1);
    border-radius: 8px;
  }
}
//@import url()
</style>
<style lang="scss"  scoped>
.Btn-box {
  //   width: 100%;
  position: absolute;
  bottom: 38px;
  right: 70px;
  padding-right: 20px;
  display: flex;
  align-items: right;
  justify-content: flex-end;
  .addsBtn {
    display: inline-block;
    width: 24px;
    height: 24px;
    text-align: center;
    color: #ff6e0e;
    font-size: 28px;
    font-weight: 800;
    margin-right: 10px;
    cursor: pointer;
  }
}

// 页面样式
.w {
  width: 1200px;
  margin: auto;
}
.registerBox {
  background: url("../../../static/img/userDis_bg.png") no-repeat;
  background-size: cover;
  height: 100%;

  .selectInfo {
    input[type="radio"] {
      display: none;
    }
    label {
      display: inline-block;
      position: relative;
      font-size: 14px;
      height: 24px;
      font-family: MicrosoftYaHei, 微软雅黑;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      line-height: 24px;
      padding-left: 25px;
      cursor: pointer;
    }
    label::before {
      position: absolute;
      left: 0;
      content: "";
      display: inline-block;
      width: 19px;
      height: 19px;
      line-height: 15px;
      border: 1px solid #666;
      border-radius: 50%;
      margin-right: 12px;
    }
    input[type="radio"]:checked + label::before {
      display: inline-block;
      content: "●";
      text-align: center;
      font-size: 18px;
    }
  }

  .classifyBox {
    padding-left: 150px;

    .theFirstClassify,
    .theSecondClassify {
      border: 1px solid rgba(192, 192, 192, 1);
      border-radius: 6px;
      width: 250px;
      margin-right: 37px;
      background: #fff;
      h3 {
        height: 40px;
        background: rgba(192, 192, 192, 0.29);
        border-radius: 6px 6px 0px 0px;
        text-align: center;
        line-height: 40px;
        font-size: 14px;
        font-family: MicrosoftYaHei, 微软雅黑;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        border-bottom: 1px solid rgba(192, 192, 192, 1);
      }
      ul {
        li {
          padding-left: 12px;
          .classifyName {
            display: inline-block;
            width: 200px;
            font-size: 14px;
            font-family: MicrosoftYaHei, 微软雅黑;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
            padding: 0;
            cursor: pointer;
          }
        }
        li:hover {
          background: #d2646a;
        }
        li:hover span {
          color: #fff;
        }
      }
      .theSecondClassify {
        margin-right: 0;
      }
    }

    label {
      display: inline-block;
      position: relative;
      padding-left: 40px;
      cursor: pointer;
      height: 14px;
    }
    label::before {
      display: inline-block;
      position: absolute;
      left: 0;
      content: "";
      width: 14px;
      height: 14px;
      border: 1px solid;
      margin-right: 40px;
    }
    input[type="checkbox"] {
      display: none;
    }
    input[type="checkbox"]:checked + label::before {
      content: "✔";
      text-align: center;
      line-height: 13px;
    }
  }

  .companyProfile {
    margin-bottom: 35px;
    display: flex;
    align-items: flex-start;
    textarea {
      width: 460px;
      height: 180px;
      border: 1px solid rgba(102, 102, 102, 1);
      border-radius: 8px;
      padding: 12px 22px;
      line-height: 2;
    }
  }
}

.pub_advert {
  height: 350px;
  background: rgba(61, 60, 60, 1);
}
.startMark {
  font-size: 16px;
  font-family: MicrosoftYaHeiLight, 微软雅黑;
  font-weight: bold;
  color: rgba(210, 29, 39, 1);
  padding-left: 10px;
}
.register_title {
  height: 70px;
  line-height: 70px;
  padding: 11px 0 0 11px;
}

.register_form {
  //   padding-bottom: 78px;
  background-color: rgb(245, 245, 245);
}

.register_form_content {
  background: #ffffff;
  border-bottom: 1px solid #ccc;
}

.demo-ruleForm {
  margin: auto;
  width: 750px;
  padding-top: 60px;
  padding-bottom: 83px;
}

//

.checkCode {
  position: relative;
  height: 44px;
  width: 96px;
  padding-bottom: 12px;
  .checkbtn {
    position: absolute;
    top: 2px;
    left: 140px;
    width: 96px;
    height: 32px;
    background: rgb(61, 145, 231);
    color: #fff;
    border-radius: 5px;
  }
}

.active {
  background: blanchedalmond;
  color: black;
}
.amend-user {
  width: 1200px;
  margin: auto;
  .scopr-box {
  }
  .amend-title {
    font-size: 18px;
    color: #000;
    text-align: center;
    font-weight: 600;
    padding: 11px;
  }
  li {
    line-height: 60px;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .user-city {
      width: auto;
      text-align: center;
      //   border-bottom: 1px solid #e6e6e6;
      //   padding: 0 32px;
    }
    span {
      display: inline-block;
      width: 140px;
      text-align: right;
    }
    input {
      width: 830px;
      font-size: 16px;
      border-bottom: 1px solid #e6e6e6;
      padding-left: 15px;
    }
    .scope {
      width: 80px;
      height: 30px;
      margin-top: 14px;
    }
  }
  .btn-box {
    text-align: center;
    margin: 30px 0;
    padding-bottom: 48px;
    .form_cancle {
      width: 88px;
      height: 32px;
      line-height: 32px;
      background: rgba(153, 153, 153, 1);
      border-radius: 4px;
      font-size: 16px;
      font-family: MicrosoftYaHei, 微软雅黑;
      font-weight: bold;
      color: rgba(255, 255, 255, 1);
      margin-right: 44px;
      cursor: pointer;
    }
    .registerBtn {
      width: 88px;
      height: 32px;
      background: rgba(210, 29, 39, 1);
      border-radius: 4px;
      font-size: 16px;
      font-family: MicrosoftYaHei, 微软雅黑;
      font-weight: bold;
      color: rgba(255, 255, 255, 1);
      cursor: pointer;
    }
  }
}
.el-cascader .el-input .el-input__inner {
  border: none !important;
  border-bottom: 1px solid #e6e6e6;
}
.el-select {
  width: 99%;
  margin: 15px 0;
}
.adds {
  position: absolute;
  right: -45px;
  bottom: 0;
}
.form_cancle {
  width: 112px;
  height: 44px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(153, 153, 153, 1);
  border-radius: 4px;
  font-size: 18px;
  font-family: MicrosoftYaHei-Bold, 微软雅黑;
  font-weight: bold;
  color: rgba(102, 102, 102, 1);
}
.registerBtn {
  width: 112px;
  height: 44px;
  background: rgba(33, 130, 228, 1);
  border-radius: 4px;
  font-size: 18px;
  font-family: MicrosoftYaHei-Bold, 微软雅黑;
  font-weight: bold;
  color: rgba(255, 255, 255, 1);
}

.amend-user {
  background: rgba(255, 255, 255, 0.48);

  .amend-title {
    text-align: left;
    padding: 11px;
  }
}

.amend-msg {
  width: 800px;
  margin: auto;
  ul {
    li {
      span {
        font-size: 16px;
        font-family: MicrosoftYaHeiLight, 微软雅黑;
        font-weight: bold;
        color: rgba(102, 102, 102, 1);
        padding-right: 27px;
      }
      input {
        width: 460px;
        height: 36px;
        border: 1px solid #666;
        border-radius: 8px;
      }
    }
  }
}
.upfile-box {
  display: flex;
}
.up-file {
  margin-right: 10px;
  width: 100px;
  height: 120px;
  //   border: 2px solid #3d91e7;
  line-height: 120px;
  text-align: center;
}

.banner-img {
  display: flex;
}

.changeshenfen label {
  font-size: 16px;
  font-family: MicrosoftYaHeiLight, 微软雅黑;
  font-weight: bold;
  color: rgba(102, 102, 102, 1);
  color: #666;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-right: 35px;
  .iCheck {
    position: relative;
    display: inline-block;
    width: 22px;
    height: 22px;
    line-height: 22px;
    text-align: center;
    border: 1px solid #666;
    margin-right: 12px;
    box-sizing: border-box;
    border-radius: 2px;
    i {
      position: absolute;
      top: 0;
      left: 4px;
    }
  }
}
.tips {
  display: flex;
  color: #000;
  font-size: 12px;
  .isOk {
    flex: 1;
    text-align: left;
    color: #0099ff;
    font-size: 12px;
    line-height: 1;
  }
  .rejected {
    flex: 1;
    text-align: left;
    color: #ff0000;
    font-size: 12px;
    line-height: 1;
  }
}
.isok_show label {
  display: inline-block;
  position: relative;
  padding-left: 40px;
  cursor: pointer;
  line-height: 22px;
  margin-top: 20px;
  margin-left: 200px;
}
.isok_show label::before {
  display: inline-block;
  position: absolute;
  left: 0;
  content: "";
  width: 20px;
  height: 20px;
  border: 1px solid;
  margin-right: 40px;
}
.isok_show input[type="checkbox"] {
  display: none;
}
.isok_show input[type="checkbox"]:checked + label::before {
  content: "✔";
  text-align: center;
  line-height: 20px;
}
.amendtTitle {
  height: 80px;
  line-height: 80px;
  background: rgba(255, 255, 255, 0.48);
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.14);
  margin: 20px 0;
  text-align: center;
  font-size: 22px;
  font-family: MicrosoftYaHei, 微软雅黑;
  font-weight: bold;
  color: rgba(131, 131, 131, 1);
  letter-spacing: 5px;
}
</style>