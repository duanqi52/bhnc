<template v-loading="submitLoading">
  <div id="bhncAmend-user">
    <div class="amend-user" v-if="user">
      <div class="topBox">
        <div class="userBox">
          <div class="title">
            <p>编辑企业信息</p>
          </div>
          <div class="marke-msg">
            <ul>
              <li>
                <span>公司名称：</span>
                <input type="text" v-model="user.company_name" />
              </li>
              <li>
                <div style="width:100%;">
                  <div style="display: flex;align-items: center;">
                    <span style="align-self: flex-start;">供应商分类：</span>

                    <div
                      class="classifyBox clearfix"
                      v-if="providerScopeList.length > 0"
                      style="flex:1;display:flex;"
                    >
                      <div class="theFirstClassify">
                        <h3>一级分类</h3>
                        <ul>
                          <li
                            v-for="(providerScope,index) in providerScopeList"
                            :key="index"
                            style="position: relative;cursor: pointer;"
                            @click="oneIndex=index"
                            :id="'ONE'+index"
                          >
                            <input
                              type="checkbox"
                              v-model="providerTypeList[index].isSelected"
                              name
                              :id="'one'+index"
                              @click="clickOneInput($event)"
                            />
                            <label :for="'one'+index"></label>

                            <span
                              class="classifyName"
                              style="width:auto;"
                              :style="index == oneIndex?'color: #f56c6c':''"
                            >{{providerScope.name}}</span>
                            <span
                              class="markRight"
                              style="width: auto;position: absolute;right: 0px;"
                              :style="index == oneIndex?'color: #f56c6c':''"
                            >></span>
                          </li>
                        </ul>
                      </div>
                      <div
                        class="theSecondClassify"
                        v-if="providerScopeList[oneIndex].provider_two_scopes"
                      >
                        <h3>二级分类</h3>
                        <div class="scrollBox" style="height:460px; overflow-y: scroll;">
                          <ul>
                            <li
                              v-for="(providerTwoScope,index) in providerScopeList[oneIndex].provider_two_scopes"
                              :key="index"
                              style="position: relative;"
                              @click="clickTwo('two'+index)"
                            >
                              <input
                                type="checkbox"
                                v-model="providerTypeList[oneIndex].data[index].isSelected"
                                name
                                :id="'two'+index"
                                @click="clickTwoInput()"
                              />
                              <label :for="'two'+index" @click.stop></label>
                              <span
                                class="classifyName"
                                style="width:auto;"
                              >{{providerTwoScope.name}}</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <i class="startMark">﹡</i>
                  </div>
                </div>
              </li>
              <li>
                <span>地区：</span>
                <span class="user-city" style="width:auto">{{user.region}}</span>
                <el-cascader
                  size="large"
                  :options="citys"
                  v-model="selectedOptions"
                  @change="handleChange"
                  style="marginTop:20px;"
                ></el-cascader>
              </li>
              <li>
                <span>联系地址：</span>
                <input type="text" v-model="user.address" />
              </li>
              <li>
                <span>法人:</span>
                <input type="text" v-model="user.legal_man" />
              </li>

              <li>
                <span style="    align-self: flex-start;">法人移动电话：</span>
                <div>
                  <!-- <input type="text" v-model="user.phone" />  2019 829 WTL 绑定字段错误 应该是legal_phone-->
                  <input
                    type="tel"
                    v-model="user.legal_phone"
                    oninput="value=value.replace(/[^\d]/g,'')"
                    maxlength="11"
                  />
                  <div class="selectInfo">
                    <input
                      type="radio"
                      name="openInfo"
                      id="openInfo"
                      value="0"
                      v-model="user.is_public"
                    />
                    <label for="openInfo" style="margin-right:54px;">不公开法人信息</label>
                    <input
                      type="radio"
                      name="openInfo"
                      id="closeInfo"
                      value="1"
                      v-model="user.is_public"
                    />
                    <label for="closeInfo">公开法人信息</label>
                  </div>
                </div>
              </li>
              <!-- <li>
                    <span>固定电话：</span>
                    <input type="text" v-model="user.phone">
              </li>-->

              <li>
                <span style="align-self: flex-start;padding-top: 10px;">业务联系人:</span>
                <div>
                  <input type="text" v-model="user.linkman" />
                  <p
                    style="line-height:1;font-size:12px;color:#b5b5b5;text-align: left;padding-top:10px;"
                  >（对外公开联系人）</p>
                </div>
              </li>

              <li style="position: relative;display:  flex;align-items:center;">
                <span style="align-self: flex-start;padding-top: 20px;">业务移动电话：</span>
                <div style="overflow: hidden;">
                  <li
                    style="height:60px; margin-bottom:0 ; "
                    v-for="(item,index) in phone_more"
                    :key="index"
                  >
                    <input
                      type="text"
                      v-model="phone_more[index]"
                      placeholder="请输入手机号码"
                      oninput="value=value.replace(/[^\d]/g,'')"
                      maxlength="11"
                    />
                  </li>
                </div>

                <div class="adds">
                  <i value="+" class="addsBtn" @click="addphone_more">+</i>
                  <i value="-" class="addsBtn" @click="delphone_more" v-show="showphone_more">-</i>
                  <!-- <el-button type="warning" icon="el-icon-plus" circle @click="addPhone"></el-button>
                  <el-button type="danger" icon="el-icon-delete" circle @click="delPhone"></el-button>-->
                </div>
              </li>

              <li style="position: relative;display:  flex;align-items:center;">
                <span style="align-self: flex-start;padding-top: 20px;">固定电话：</span>
                <div style="overflow: hidden;">
                  <li
                    style="height:60px; margin-bottom:0 ; "
                    v-for="(item,index) in fix_phone"
                    :key="index"
                  >
                    <input
                      type="text"
                      v-model="fix_phone[index]"
                      placeholder="请输入固定电话"
                      onkeyup="value=value.replace(/[^\d\-\d]/g,'')"
                      maxlength="13"
                    />
                  </li>
                </div>
                <div class="adds">
                  <i value="+" class="addsBtn" @click="addPhone">+</i>
                  <i value="-" class="addsBtn" @click="delPhone" v-show="showReduce">-</i>
                </div>
              </li>
              <!-- <li>
                <span>Q Q 号码：</span>
                <input type="text" v-model="user.qq[0]" />
              </li>-->
              <li style="position: relative;display: block;align-items:center;">
                <span style="float: left;margin-top: 20px;">Q Q 号码：</span>
                <div style="overflow: hidden;">
                  <li
                    style="height:60px; margin-bottom:0 ; "
                    v-for="(item,index) in qq"
                    :key="index"
                  >
                    <input
                      type="text"
                      v-model="qq[index]"
                      onkeyup="value=value.replace(/[^\d\-\d]/g,'')"
                      maxlength="15"
                      placeholder="请输入qq号码"
                    />
                  </li>
                </div>
                <div class="adds">
                  <i value="+" class="addsBtn" @click="addQQ">+</i>
                  <i value="-" class="addsBtn" @click="delQQ" v-show="showQQMore">-</i>
                </div>
              </li>
              <li>
                <span>微信号：</span>
                <input type="text" v-model="user.wx" />
              </li>
              <!-- <li>
                <span>经营范围：</span>
                <div class="scopr-box">
                  <div class="scope-item" style="width:93%">
                    <el-select v-model="user.scope" multiple placeholder="请选择">
                      <el-option
                        v-for="item in options"
                        :key="item.id"
                        :label="item.name"
                        :value="item.name"
                        style="width:93%"
                      ></el-option>
                    </el-select>
                  </div>
                </div>
              </li>-->
              <li style="margin-bottom: 30px;">
                <span>营业执照：</span>
                <div class="upfile-box">
                  <div class="up-file">
                    <!-- <img
              :src="addImg"
              alt
              @click="onPickFile1()"
              v-if="!user.business_img"
              width="20px"
                    />-->
                    <span
                      @click="onPickFile1()"
                      v-if="!user.business_img"
                      style="display: inline-block;font-size:48px;color:#FC7336;cursor: pointer;width: auto;margin: 0;"
                    >+</span>
                    <div class="banner-img" v-else style="position:relative">
                      <img :src="user.business_img" style="width:100%;height:116px" />
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
              </li>

              <li>
                <span>商标证件：</span>
                <div class="upfile-box">
                  <div class="up-file" v-for="(item,index) in brandImgs" :key="index">
                    <!-- <img :src="addImg" alt @click="onPickFile2(index)" v-if="!item.img" width="20px" /> -->
                    <span
                      alt
                      @click="onPickFile3(index)"
                      v-if="!item.img"
                      style="display: inline-block;font-size:48px;color:#FC7336;cursor: pointer;width: auto;margin: 0;"
                    >+</span>
                    <div class="banner-img" v-else style="position:relative">
                      <img :src="item.img" style="width:100%;height:116px" />
                      <a>
                        <img
                          :src="removeImg"
                          class="remove"
                          @click="offImg3(index)"
                          style="width:30px;top:0px; right:0; position:absolute; "
                        />
                      </a>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      style="display: none"
                      :id="'afile'+index"
                      @change="imgUpload3($event,index)"
                    />
                  </div>
                </div>
              </li>

              <li>
                <span>专利证件：</span>
                <div class="upfile-box">
                  <div class="up-file" v-for="(item,index) in patentImgs" :key="index">
                    <!-- <img :src="addImg" alt @click="onPickFile2(index)" v-if="!item.img" width="20px" /> -->
                    <span
                      alt
                      @click="onPickFile4(index)"
                      v-if="!item.img"
                      style="display: inline-block;font-size:48px;color:#FC7336;cursor: pointer;width: auto;margin: 0;"
                    >+</span>
                    <div class="banner-img" v-else style="position:relative">
                      <img :src="item.img" style="width:100%;height:116px" />
                      <a>
                        <img
                          :src="removeImg"
                          class="remove"
                          @click="offImg4(index)"
                          style="width:30px;top:0px; right:0; position:absolute; "
                        />
                      </a>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      style="display: none"
                      :id="'bfile'+index"
                      @change="imgUpload4($event,index)"
                    />
                  </div>
                </div>
              </li>

              <li>
                <span>其他证件：</span>
                <div class="upfile-box">
                  <div class="up-file" v-for="(item,index) in other_imgList" :key="index">
                    <!-- <img :src="addImg" alt @click="onPickFile2(index)" v-if="!item.img" width="20px" /> -->
                    <span
                      alt
                      @click="onPickFile2(index)"
                      v-if="!item.img"
                      style="display: inline-block;font-size:48px;color:#FC7336;cursor: pointer;width: auto;margin: 0;"
                    >+</span>
                    <div class="banner-img" v-else style="position:relative">
                      <img :src="item.img" style="width:100%;height:116px" />
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
            </ul>
            <div class="btn-box">
              <!-- <el-button type="info" plain @click="goTo()">取消</el-button>
              <el-button type="primary" plain @click="amendUser(user.id)">保存</el-button>-->
              <input type="button" value="取消" style="cursor:pointer" @click="goTo()" />
              <input
                type="button"
                value="保存"
                @click="amendUser(user.id)"
                style="background:#D21D27;cursor:pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import x from ''
// import addImg from "@/views/user/addImg";
// import bannerImg from "@/views/user/bannerImg";
import url from "@/serverAPI.config.js";
import {
  provinceAndCityData,
  regionData,
  provinceAndCityDataPlus,
  regionDataPlus,
  CodeToText,
  TextToCode
} from "element-china-area-data";

export default {
  components: {},
  data() {
    return {
      user: null,
      options: [], //经营范围
      selectedOptions: [], //默认城市
      citys: regionData, //存放城市数据
      dialogImageUrl: "",
      dialogVisible: false,
      // 固话数组数据
      fix_phone: [""],
      phone_more: [""],
      showImg: true,
      addImg: require("../../assets/img/add.png"),
      removeImg: require("../../assets/img/remove.png"),
      other_imgList: [],
      brandImgs: [],
      patentImgs: [],
      showReduce: false,
      showphone_more: false,
      providerScopeList: [],
      providerTypeList: [],
      oneIndex: 0,
      oldCount: "",
      showQQMore: false,
      qq: [""]
    };
  },

  methods: {
    upLoad(file) {
      const formData = new FormData();
      formData.append("file", file.file);
      //console.log(file);
      this.$http({
        url: `${url.amendUser}/${1}`,
        data: this.user,
        method: "put"
      }).then(res => {
        this.successUrl = res.data.response; // 请求之后将返回的URL给修改的接口在进行一次修改请求
        this.user.other_img = JSON.stringify(res.data.response); // 请求成功之后赋给头像的URL
        this.$message("头像上传成功");
      });
    },

    handleRemove(file, fileList) {
      //console.log(file);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //获取城市列表
    handleChange(value) {
      this.user.region =
        CodeToText[value[0]] +
        "-" +
        CodeToText[value[1]] +
        "-" +
        CodeToText[value[2]];
    },

    //点击事件
    onPickFile1() {
      document.querySelector(`#lfile`).click();
    },
    onPickFile2(index) {
      document.querySelector(`#file${index}`).click();
    },
    //img
    imgUpload(event, index) {
      if (event.target.files[0].size > 1024 * 1024 * 2) {
        this.$message.error("图片不能大于2M!");
        return;
      }
      var formData = new FormData();
      formData.append(`file`, event.target.files[0]);
      this.$http({
        url: `${url.Upload}`,
        method: "post",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" }
      }).then(res => {
        this.user.business_img = res.data;
        this.$forceUpdate();
      });
    },
    //关闭图片重新选
    offImg() {
      this.user.business_img = "";
      this.$forceUpdate();
    },
    //img
    imgUpload2(event, index) {
      if (event.target.files[0].size > 1024 * 1024 * 2) {
        this.$message.error("图片不能大于2M!");
        return;
      }
      var formData = new FormData();
      formData.append(`file`, event.target.files[0]);
      this.$http({
        url: `${url.Upload}`,
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
        url: `${url.Upload}`,
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
        url: `${url.Upload}`,
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

    //获取当前用户信息
    getUserMsg() {
      this.$http({
        url: `${url.getUserMsg}`,
        method: "get"
      })
        .then(res => {
          this.user = res.data.data;
          this.user.provider_type = JSON.parse(this.user.provider_type);
          this.getProviderScope();
          this.user.scope = JSON.parse(this.user.scope);
          this.qq = JSON.parse(this.user.qq);
          if(this.qq == ""){
            this.qq = [""]
          }
          this.fix_phone = JSON.parse(this.user.fix_phone);
          if(this.fix_phone == ""){
            this.fix_phone = [""]
          }
          this.phone_more = JSON.parse(this.user.phone_more);
          if (!this.phone_more || this.phone_more.length == 0) {
            this.phone_more = [""];
          }
          this.$forceUpdate();
          this.user.other_img = JSON.parse(this.user.other_img);
          this.user.other_img.map(res => {
            if (res) {
              this.other_imgList.push({ img: res });
            }
          });
          this.other_imgList.push({ img: "" });

          this.user.brand_img = JSON.parse(this.user.brand_img);
          this.user.brand_img.map(res => {
            if (res) {
              this.brandImgs.push({ img: res });
            }
          });
          this.brandImgs.push({ img: "" });

          this.user.patent_img = JSON.parse(this.user.patent_img);
          this.user.patent_img.map(res => {
            if (res) {
              this.patentImgs.push({ img: res });
            }
          });
          this.patentImgs.push({ img: "" });
          //console.log(this.user)
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取经营范围
    getScope() {
      this.$http({
        url: `${url.scope}`,
        method: "get"
      })
        .then(res => {
          this.options = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //提交用户信息
    amendUser(id) {
      var user = JSON.parse(JSON.stringify(this.user));
      /* this.user.scope = JSON.stringify(this.user.scope)
                this.user.business_img = JSON.stringify(this.user.business_img)
                this.user.other_img = JSON.stringify(this.user.other_img)
                */
      if (!this.user.company_name) {
        this.warn("公司名称不能为空");
        return;
      }
      if (!this.user.region) {
        this.warn("请选择地区");
        return;
      }
      if (!this.user.legal_man) {
        this.warn("法人/负责人");
        return;
      }

      user.provider_type = [];
      this.providerTypeList.map(item => {
        if (item.isSelected) {
          var data = [];
          item.data.map(item2 => {
            if (item2.isSelected) {
              data.push(item2.name);
            }
          });
          if (data.length > 0) {
            user.provider_type.push({ name: item.name, data: data });
          }
        }
      });

      if (!this.user.legal_phone) {
        this.warn("法人手机号码");
        return;
      }

      if (!this.user.linkman) {
        this.warn("业务联系人");
        return;
      }
      if (!this.user.address) {
        this.warn("联系地址不能为空");
        return;
      }
      // if (!this.user.scope.length > 0) {
      //   this.warn("经营范围不能为空");
      //   return;
      // }
      if (!this.user.business_img) {
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
      this.providerScopeList.map(item => {
        item.provider_two_scopes.map(item2 => {
          if (user.scope.indexOf(item2.name) > -1) {
            user.scope.splice(user.scope.indexOf(item2.name), 1);
          }
        });
      });
      user.provider_type.map(item => {
        item.data.map(item2 => {
          user.scope.push(item2);
        });
      });
      user.provider_type = JSON.stringify(user.provider_type);
      user.fix_phone = [];
      this.fix_phone.map(item => {
        if (item) {
          user.fix_phone.push(item);
        }
      });
      user.fix_phone = JSON.stringify(user.fix_phone);
      user.phone_more = [];
      this.phone_more.map(item => {
        if (item) {
          user.phone_more.push(item);
        }
      });
      user.qq = [];
      this.qq.map(item => {
        if (item) {
          user.qq.push(item);
        }
      });
      user.phone_more = JSON.stringify(user.phone_more);
      user.other_img = JSON.stringify(otherImgs);
      user.brand_img = JSON.stringify(brandImgs);
      user.patent_img = JSON.stringify(patentImgs);
      user.scope = JSON.stringify(user.scope);
      user.qq = JSON.stringify(user.qq);
      user.certification_type = "2";
      this.$confirm("是否保存？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "success"
      })
        .then(res => {
          this.$http({
            // url:'http://localhost:9007/user/againCheck/'+id,
            url: `${url.againCheck}/${id}`,
            data: user,
            method: "put"
          }).then(res => {
            if (res.data.code === 20000) {
              this.$router.push("/user");
            } else {
              this.$message({
                message: res.data.message,
                type: "warning"
              });
            }
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    warn(str) {
      if (document.querySelectorAll(".el-message").length == 0)
        this.$message({
          message: str,
          type: "warning"
        });
    },
    goTo() {
      this.$router.go(-1);
    },
    // 添加联系人
    addPhone() {
      this.fix_phone.push("");
      if (this.fix_phone.length > 1) {
        this.showReduce = true;
      }
    },
    // 删除联系人
    delPhone() {
      this.fix_phone.splice(this.fix_phone.length - 1, 1);
      if (this.fix_phone.length < 1) {
        this.fix_phone.length = 1;
      }
      if (this.fix_phone.length < 2) {
        this.showReduce = false;
      }
    },
    // 添加手机号码
    addphone_more() {
      this.phone_more.push("");
      if (this.phone_more.length > 1) {
        this.showphone_more = true;
      }
    },
    // 删除手机号码
    delphone_more() {
      this.phone_more.splice(this.phone_more.length - 1, 1);
      if (this.phone_more.length < 1) {
        this.phone_more.length = 1;
      }
      if (this.phone_more.length < 2) {
        this.showphone_more = false;
      }
    },
    clickOneInput(event) {
      if (event.target.checked) {
        this.providerTypeList[this.oneIndex].data.map(item => {
          item.isSelected = true;
        });
      } else {
        this.providerTypeList[this.oneIndex].data.map(item => {
          item.isSelected = false;
        });
      }
    },
    clickTwo(id) {
      document.getElementById(id).click();
    },
    clickTwoInput() {
      setTimeout(() => {
        var isS = false;
        this.providerTypeList[this.oneIndex].data.map(item => {
          if (item.isSelected) {
            isS = true;
          }
        });
        if (isS) {
          this.providerTypeList[this.oneIndex].isSelected = true;
        } else {
          this.providerTypeList[this.oneIndex].isSelected = false;
        }

        var is2 = false;
        this.providerTypeList.map(item => {
          if (item.isSelected) {
            is2 = true;
          }
        });
        if (is2) {
          this.providerTypeWarn = "";
        } else {
          this.providerTypeWarn = "供应商经营类型必须填一个";
        }
      }, 10);
    },

    getProviderScope() {
      this.$http({
        url: `${url.scope}/providerScope`,
        method: "get"
      }).then(res => {
        if (res.data.code == 20000) {
          var providerScopeList = res.data.data;
          console.log(providerScopeList)
          providerScopeList.map(item => {
            var data = [];
            item.provider_two_scopes.map(item2 => {
              console.log(data)
              data.push({ isSelected: false, name: item2.name });
            });
            this.providerTypeList.push({
              isSelected: false,
              data: data,
              name: item.name
            });
          });
          this.providerTypeList.map(item => {
            if (this.user.provider_type)
              this.user.provider_type.map(p => {
                if (item.name == p.name) {
                  item.isSelected = true;
                  item.data.map(itemd => {
                    p.data.map(pd => {
                      if (itemd.name == pd) {
                        itemd.isSelected = true;
                      }
                    });
                  });
                }
              });
          });
          this.providerScopeList = providerScopeList;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    // 添加qq
    addQQ() {
      this.qq.push("");
      if (this.qq.length > 1) {
        this.showQQMore = true;
      }
    },
    // 删除qq
    delQQ() {
      this.qq.splice(this.qq.length - 1, 1);
      if (this.qq.length < 1) {
        this.qq.length = 1;
      }
      if (this.qq.length < 2) {
        this.showQQMore = false;
      }
    }
    // checkOfferCountInputData() {
    //   setInterval(() => {
    //     if (this.oldCount == this.user.legal_phone) {
    //       return;
    //     }
    //     var numReg = new RegExp("[0-9]{1}");
    //     var value = this.user.legal_phone;
    //     // console.log(value);
    //     var valueSave = "";
    //     for (var i = 0; i < value.length; i++) {
    //       console.log(value.charAt(i));
    //       if (numReg.test(value.charAt(i))) {
    //         if (i == 0) {
    //           if (value.charAt(i) == 0) {
    //             continue;
    //           }
    //         }

    //         valueSave += value.charAt(i);
    //       }
    //     }
    //     this.user.legal_phone = valueSave;
    //     this.oldCount = valueSave;
    //   }, 10);
    // }
  },
  created() {
    this.getUserMsg();
    //this.checkOfferCountInputData();
    //this.getScope();
    //this.getProviderScope();
    this.showReduce = this.fix_phone.length > 0 ? true : false;
    this.showphone_more = this.phone_more.length > 0 ? true : false;
    this.showQQMore = this.qq.length > 0 ? true : false;
  }
};
</script>

<style lang="scss">
#bhncAmend-user {
  .scopr-box {
    .el-input__inner {
      width: 680px;
      height: 36px;
      border: 1px solid rgba(102, 102, 102, 1);
      border-radius: 8px;
    }
  }

  .el-cascader .el-input .el-input__inner {
    border-color: #666;
  }
}
</style>


<style lang='scss' scoped>
#bhncAmend-user {
  .amend-user {
    .scopr-box {
    }

    //   li {
    .user-city {
      width: auto;
      text-align: center;
      padding-right: 32px;
    }
    margin-top: 14px;
    //     }
    //   }
    .btn-box {
      text-align: center;
      margin: 30px 0;
      border-top: 4px solid #f0f0f0;
      padding-top: 46px;
      input[type="button"] {
        text-align: center;
        width: 120px;
        margin: 0 45px;
        text-indent: 0;
        background-color: #999;
        color: #fff;
        border: none;
      }
    }
  }
  .el-cascader .el-input .el-input__inner {
    border: none !important;
    border-bottom: 1px solid #e6e6e6;
  }
  .el-select {
    width: 680px;
  }
  .adds {
    position: absolute;
    bottom: 15px;
    left: 870px;
    display: flex;
    .addsBtn {
      display: inline-block;
      width: 24px;
      height: 24px;
      line-height: 24px;
      text-align: center;
      border: 2px solid #fc7336;
      border-radius: 50%;
      background: #ffffff;
      color: #fc7336;
      font-size: 24px;
      font-weight: 800;
      margin-right: 10px;
      cursor: pointer;
    }
  }

  .userBox {
    .title {
      height: 68px;
      line-height: 68px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.04);
      font-size: 20px;
      font-family: MicrosoftYaHeiLight;
      font-weight: bold;
      color: rgba(102, 102, 102, 1);
      padding-left: 48px;
      border-bottom: 4px solid #f0f0f0;
    }
    .marke-msg {
      padding-top: 20px;
      ul {
        li {
          display: flex;
          margin-bottom: 27px;
          align-items: center;

          // 单选框样式

          .selectInfo {
            padding-top: 18px;
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
        }
      }
      span {
        display: inline-block;
        width: 150px;
        font-size: 16px;
        font-family: MicrosoftYaHei, 微软雅黑;
        font-weight: 400;
        color: #666666;
        text-align: right;
        margin-right: 25px;
      }
      input {
        width: 680px;
        height: 36px;
        border: 1px solid rgba(102, 102, 102, 1);
        border-radius: 8px;
        text-indent: 20px;
        font-size: 16px;
        line-height: 36px;
      }
      #intro {
        margin-top: 27px;

        line-height: 2;
        width: 622px;
        height: 120px;
        border: 1px solid rgba(61, 145, 231, 1);
        border-radius: 4px;
        text-indent: 20px;
        font-size: 14px;
        font-family: MicrosoftYaHei, 微软雅黑;
        font-weight: 400;
        color: #000;
      }
    }
  }

  .marke-msg > ul > li {
    min-width: 750px;
  }
  //上传图片
  .upfile-box {
    display: flex;
    // padding-left: 138px;
    margin-top: 30px;
  }
  .up-file {
    width: 100px;
    height: 120px;
    line-height: 120px;
    border: 1px dashed #fc7336;
    text-align: center;
    margin-right: 20px;
  }

  .banner-img {
    display: flex;
  }

  .amend_bg {
    width: 613px;
    height: 826px;
    background: url("../../../static/img/amend_bg.png");
    position: fixed;
    bottom: 0;
    right: 0;
  }

  .classifyBox {
    align-items: flex-start;

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
        font-family: MicrosoftYaHei;
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
            font-family: MicrosoftYaHei;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
            padding: 0;
            cursor: pointer;
            text-align: left;
          }
        }
        li:hover {
          background: #f5f5f5;
        }
        // li:hover span {
        //   color: #fff;
        // }
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
}
</style>