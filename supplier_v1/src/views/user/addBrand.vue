<template v-loading="submitLoading">
  <div id="bhncAddBrand">
    <div class="amend-user">
      <div class="topBox">
        <div class="userBox">
          <div class="title">
            <p>{{id?"编辑品牌":"新增品牌"}}</p>
          </div>
          <div class="marke-msg">
            <ul>
              <li>
                <span>品牌名称:</span>
                <input type="text" v-model="brandAuditDetails.brand_name" />
              </li>
              <li>
                <span>商标号:</span>
                <input type="text" v-model="brandAuditDetails.brand_mark" />
              </li>
              <li>
                <div>
                  <div style="display: flex;align-items: center;">
                    <span>拥有方式：</span>

                    <div class="scopr-box">
                      <div class="scope-item" style="width:460px;">
                        <el-select
                          v-model="brandAuditDetails.own_way"
                          filterable
                          placeholder="请选择拥有方式"
                        >
                          <el-option
                            v-for="item in [{value:'0',name:'商标持有人'},{value:'1',name:'商标授权—商标许可授权'},{value:'2',name:'商标授权—商标使用授权'}]"
                            :key="item.name"
                            :label="item.name"
                            :value="item.value"
                            style="width:93%"
                          ></el-option>
                        </el-select>
                      </div>
                    </div>
                    <i class="startMark">﹡</i>
                  </div>
                </div>
              </li>

              <li>
                <span>注册人:</span>
                <input type="text" v-model="brandAuditDetails.registrant" />
              </li>
              <li>
                <span style="    align-self: flex-start;">注册时间:</span>
                <div class="block">
                  <el-date-picker
                    type="date"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd"
                    v-model="brandAuditDetails.brand_registrant_date"
                  ></el-date-picker>
                </div>
              </li>
              <li>
                <span>有效期至:</span>
                <div class="block">
                  <el-date-picker
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期"
                    v-model="brandAuditDetails.brand_valid_date"
                  ></el-date-picker>
                </div>
              </li>

              <li style="margin-bottom: 30px;">
                <span>品牌logo:</span>
                <div class="upfile-box">
                  <div class="up-file">
                    <span
                      @click="onPickFile1()"
                      v-if="!logoImg"
                      style="display: inline-block;font-size:48px;color:#FC7336;cursor: pointer;width: auto;margin: 0;"
                    >+</span>
                    <div class="banner-img" v-else style="position:relative">
                      <img :src="logoImg" style="width:100%;height:116px" />
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
                <span>商标证书:</span>
                <div class="upfile-box">
                  <div class="up-file" v-for="(item,index) in brand_z" :key="index">
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

              <!-- <li v-if="dsfs"> -->
              <li v-if="brandAuditDetails.own_way!='0'">

                <span>商标授权证明:</span>
                <div class="upfile-box">
                  <div class="up-file" v-for="(item,index) in brand_sqzm" :key="index">
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
            </ul>
            <div class="btn-box">
              <!-- <el-button type="info" plain @click="goTo()">取消</el-button>
              <el-button type="primary" plain @click="amendUser(user.id)">保存</el-button>-->
              <input type="button" value="取消" @click="goTo()" />
              <input type="button" value="保存" @click="submitBrand()" style="background:#D21D27" />
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
import { log } from 'util';

export default {
  components: {},
  data() {
    return {
      user: null,
      userMgs: null,
      options: [], //经营范围
      selectedOptions: [], //默认城市
      citys: regionData, //存放城市数据
      dialogImageUrl: "",
      dialogVisible: false,
      // 固话数组数据
      fixPhone: [""],
      phoneMore: [""],
      showImg: true,
      addImg: require("../../assets/img/add.png"),
      removeImg: require("../../assets/img/remove.png"),
      other_imgList: [{ img: "" }],
      brand_z: [{ img: "" }],
      brand_sqzm: [{ img: "" }],
      showReduce: false,
      showPhoneMore: false,
      //   注册时间
      registerTime: "",
      //  有效期时间
      validityTime: "",
      id: "",
      goodsMaster: "",
      logoImg: "",
      brandAuditDetails: {}
    };
  },
  created() {
    this.id = this.$route.query.id;
    if (this.id) {
      this.getBrandDetails(this.id);
    }
     this.getUserMsg();
  },
  methods: {
     //获取当前用户信息
    getUserMsg() {
      this.$http({
        url: `${url.getUserMsg}`,
        method: "get"
      })
        .then(res => {
          this.userMgs = res.data.data;                      
        })
        .catch(err => {
          console.log(err);
        });
        },
    upLoad(file) {
      const formData = new FormData();
      formData.append("file", file.file);
      this.$http({
        url: `${url.amendUser}/${1}`,
        data: this.user,
        method: "put"
      }).then(res => {
        this.successUrl = res.data.response; // 请求之后将返回的URL给修改的接口在进行一次修改请求
        this.user.other_img = JSON.stringify(res.data.response); // 请求成功之后赋给头像的URL
        this.$message("头像上传成功");
        //console.log(res)
      });
    },

    handleRemove(file, fileList) {
      //console.log(file);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
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
        this.logoImg = res.data;
        this.$forceUpdate();
      });
    },
    //关闭图片重新选
    offImg() {
      this.logoImg = "";
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
        this.brand_z[index].img = res.data;
        if (this.brand_z.length < 5) {
          this.brand_z.push({ img: "" });
        }
      });
    },
    //关闭图片重新选
    offImg3(index) {
      this.brand_z.splice(index, 1);
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
        this.brand_sqzm[index].img = res.data;
        if (this.brand_sqzm.length < 5) {
          this.brand_sqzm.push({ img: "" });
        }
      });
    },
    //关闭图片重新选
    offImg4(index) {
      this.brand_sqzm.splice(index, 1);
    },

    //获取当前用户信息
    getBrandDetails() {
      this.$http({
        url: `${url.findBrandAuditDetails}/${this.id}`,
        method: "get"
      }).then(res => {
        if (res.data.code == 20000) {
          var data = res.data.data;
          this.brand_sqzm = [];
          var brand_sqzm = JSON.parse(data.brand_authorization_img);
          brand_sqzm.map(item => {
            if (item) {
              this.brand_sqzm.push({ img: item });
            }
          });
          if (brand_sqzm.length < 5) {
            this.brand_sqzm.push({ img: "" });
          }
          this.brand_z = [];
          var brand_z = JSON.parse(data.brand_certificate_img);
          brand_z.map(item => {
            if (item) {
              this.brand_z.push({ img: item });
            }
          });
          if (brand_z.length < 5) {
            this.brand_z.push({ img: "" });
          }
          this.logoImg = data.logo_img;
          data.brand_registrant_date = this.formatDate(
            data.brand_registrant_date
          );
          data.brand_valid_date = this.formatDate(data.brand_valid_date);
          this.brandAuditDetails = res.data.data;
        }
      });
    },
    submitBrand() {
      if(!this.brandAuditDetails.brand_name){
          return  this.$message.error("品牌名称不能空");
      }
       if(!this.brandAuditDetails.brand_mark){
          return  this.$message.error("商标号不能空");
      }
       if(!this.brandAuditDetails.own_way){
          return  this.$message.error("拥有方式不能空");
      }
       if(!this.brandAuditDetails.registrant){
          return  this.$message.error("注册人不能空");
      }
      
      if(!this.brandAuditDetails.brand_registrant_date){
          return  this.$message.error("注册时间不能空");
      }
      if(!this.brandAuditDetails.brand_valid_date){
          return  this.$message.error("有效期时间不能空");
      }
       if(Date.parse(this.brandAuditDetails.brand_registrant_date) > Date.parse(this.brandAuditDetails.brand_valid_date)){
                return this.$message.error("注册间不能大于有效期时间!");
       }
      if (!this.logoImg) {
         return  this.$message.error("品牌logo不能空");
      }

      var brand_z = [];
      this.brand_z.map(item => {
        if (item.img) {
          brand_z.push(item.img);
        }
      });
       if (!brand_z.length>0) {
         return  this.$message.error("商标证书不能空");
      }

      var brand_sqzm = [];
      if(this.brandAuditDetails.own_way!="0"){
         this.brand_sqzm.map(item => {
          if (item.img) {
            brand_sqzm.push(item.img);
          }
        });
         if (!brand_sqzm.length>0) {
         return  this.$message.error("商标授权证明不能空");
        }
      }   
       this.$http({
          url: `${url.getUserMsg}`,
          method: "post",
          data: this.brandAuditDetails
        }).then(res => {
          if (res.data.code == 20000) {
            this.$router.push("/myBrand")
          }
        });
      
      this.brandAuditDetails.p_id = localStorage.getItem("ID");
      this.brandAuditDetails.apply_company = this.userMgs.company_name;
      this.brandAuditDetails.apply_name = this.userMgs.legal_man;
      this.brandAuditDetails.apply_phone = this.userMgs.legal_phone;
      this.brandAuditDetails.logo_img = this.logoImg;
      this.brandAuditDetails.brand_certificate_img = JSON.stringify(brand_z);
      this.brandAuditDetails.brand_authorization_img = JSON.stringify(brand_sqzm);
      this.brandAuditDetails.brand_registrant_date = this.brandAuditDetails.brand_registrant_date +" 00:00:00";
      this.brandAuditDetails.brand_valid_date = this.brandAuditDetails.brand_valid_date+" 00:00:00";
      
      if (!this.brandAuditDetails.id) {
        this.$http({
          url: `${url.addBrandAudit}`,
          method: "post",
          data: this.brandAuditDetails
        }).then(res => {
          if (res.data.code == 20000) {
            this.$router.push("/myBrand")
          }
        });
      } else {
        this.$http({
          url: `${url.updateBrandAudit}`,
          method: "put",
          data: this.brandAuditDetails
        }).then(res => {
          if (res.data.code == 20000) {
            this.$router.push("/myBrand")
          }
        });
      }
    },
    formatDate(date) {
      var time = new Date(date);
      var timeStr =
        time.getFullYear() + "-" + (time.getMonth() + 1) + "-" + time.getDate();
      return timeStr;
    },
    warn(str) {
      this.$message({
        message: str,
        type: "warning"
      });
    },
    goTo() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss">
#bhncAddBrand {
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
  .el-input__inner {
    border-color: #666;
  }
}
</style>


<style lang='scss' scoped>
#bhncAddBrand {
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
        cursor: pointer;
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
    background-image: url("../../../static/img/penbg.png");
    background-repeat: no-repeat;
    background-position: right bottom;
    background-attachment: fixed;
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
              font-family: MicrosoftYaHei,微软雅黑;
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
        font-family: MicrosoftYaHei,微软雅黑;
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
        font-family: MicrosoftYaHei,微软雅黑;
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
}
</style>