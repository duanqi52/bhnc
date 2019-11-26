<!-- 组件说明 -->
<template>
  <div class="marketing">
    <div class="marke-box">
      <div class="topBox">
        <div class="category_box">
          <div class="title">
            <h2>编辑营销目录</h2>
          </div>
          <div class="marke-msg">
            <ul>
              <li>
                <span>公司名称：</span>
                <input type="text" v-model="marketingTool.c_name" placeholder="请输入公司名称" />
              </li>
              <li style="margin-bottom: 30px;">
                <div class="upfile-box">
                  <span>LOGO：</span>
                  <div class="up-file">
                    <img
                      :src="addImg"
                      alt
                      @click="onPickFile3()"
                      v-if="!marketingTool.logo_img"
                      style="width:100%;height:116px"
                    />
                    <div class="banner-img" v-else style="position:relative">
                      <img :src="marketingTool.logo_img" style="width:100%;height:116px" />
                      <img
                        :src="removeImg"
                        class="remove"
                        @click="offImg3()"
                        style="width:30px;top:0px; right:0; position:absolute; "
                      />
                    </div>

                    <input
                      type="file"
                      accept="image/*"
                      style="display: none"
                      id="lfile3"
                      @change="imgUpload3($event)"
                    />
                  </div>
                </div>
              </li>
              <li class="region">
                <span>地区：</span>
                <i>{{marketingTool.region}}</i>
                <el-cascader
                  size="large"
                  :options="citys"
                  v-model="selectedOptions"
                  @change="handleChange"
                  style="marginTop:20px;"
                ></el-cascader>
              </li>
              <li>
                <span>联系人：</span>
                <input type="text" v-model="marketingTool.linkman" placeholder="请输入联系人" />
              </li>
              <li>
                <span>固定电话：</span>
                <input type="text" v-model="marketingTool.fix_phone" placeholder="请输入固定电话" />
              </li>
              <li>
                <span>手机号码：</span>
                <input type="text" v-model="marketingTool.phone" placeholder="请输入手机号码" />
              </li>
              <li>
                <span>Q Q 号码：</span>
                <input type="text" v-model="marketingTool.qq" placeholder="请输入QQ号码" />
              </li>
              <li>
                <span>联系地区：</span>
                <input type="text" v-model="marketingTool.address" placeholder="请输入详细的联系地区" />
              </li>
              <li style=" display: flex; align-items: center;">
                <span>公司简介：</span>
                <textarea
                  name
                  id="intro"
                  cols="30"
                  rows="10"
                  v-model="marketingTool.intro"
                  placeholder="请输入公司简介"
                ></textarea>
              </li>
            </ul>
          </div>
        </div>
        <div class="topBg">
          <div class="div"></div>
        </div>
      </div>
      <!-- 已选商品部分 -->
      <div class="select">
        <div class="selectTop">
          <p class="title">已选商品：</p>
          <el-button type="warning" @click="deleteMarketingToolGoods()">删除选中</el-button>
          <div class="addShop" @click="addShop">
            <span>+</span>
            增加商品
          </div>
        </div>

        <div class="select-box" v-if="marketingTool.goods && marketingTool.goods.length > 0">
          <div class="shop-item" v-for="item in marketingTool.goods" :key="item.id">
            <div class="shopItemBox">
              <label :for="gernerateId(item.id)">
                <img :src="item.img[0]" alt />
                <div class="shop-price">
                  <p>
                    <span class="yuan">￥</span>
                    <span class="priceNum">{{formatPrice(item.price)}}</span>
                    <span class="atLeast">起</span>
                  </p>
                </div>
              </label>
              <p class="chooseBox">
                <input
                  type="checkbox"
                  @click="selectGoods($event,item.id)"
                  :id="gernerateId(item.id)"
                />
                <span>{{item.title}}</span>
              </p>
            </div>
          </div>
        </div>
        <!-- <div class="btn-box">                 
        </div>-->
      </div>

      <!-- 生成产品目录按钮 -->
      <div class="btn">
        <input class="btnDel" value="取消" type="button" />
        <input @click="createMarke" class="btnCate" value="生成产品目录" type="button" />
      </div>
    </div>
  </div>
</template>

<script>
//import x from ''
import addImg from "@/views/user/addImg";
import bannerImg from "@/views/user/bannerImg";

import {
  provinceAndCityData,
  regionData,
  provinceAndCityDataPlus,
  regionDataPlus,
  CodeToText,
  TextToCode
} from "element-china-area-data";
import url from "../../serverAPI.config.js";
export default {
  components: {},
  data() {
    return {
       addImg: require("../../assets/img/add.png"),
      removeImg: require("../../assets/img/remove.png"),
      shopImg: require("../../assets/img/222.png"),
      citys: regionData, // 所有城市
      selectedOptions: [], // 默认城市
      region: "", //显示城市

      shopList: [],
      goodsIdList: [],

      marketingTool: {
        c_name: "",
        region: "",
        linkman: "",
        fix_phone: "",
        qq: "",
        address: "",
        intro: "",
        phone: "",
        goods: [],
        shops: []
      }
    };
  },
  computed: {},
  methods: {
    getMarketingTool() {
      this.$http
        .get(`${url.getMarketingTool}/${localStorage.getItem("siteName")}`)
        .then(res => {
          if (res.data.code == 20000) {
            if (res.data.data) {
              this.marketingTool = res.data.data;
              this.marketingTool.goods.map(item => {
                item.img = JSON.parse(item.img);
              });
              this.marketingTool.shops = [];
            }
          }
        });
    },

    //动态生成id
    gernerateId(index) {
      return "imgChecked" + index;
    },
    //地区
    handleChange(value) {
      this.marketingTool.region =
        CodeToText[value[0]] +
        "-" +
        CodeToText[value[1]] +
        "-" +
        CodeToText[value[2]];
    },
    //跳转增加商品页面
    addShop() {
      var marketingTool = JSON.parse(JSON.stringify(this.marketingTool));
      marketingTool.shops = "";
      marketingTool.goods.map(item => {
        item.img = JSON.stringify(item.img);
      });
      this.$http({
        url: `${url.saveMarketingTool}/${localStorage.getItem("siteName")}`,
        method: "post",
        data: marketingTool
      }).then(res => {
        if (res.data.code == 20000) {
          this.$router.push("addShop");
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    //跳转生成目录页面
    createMarke() {
      if (!this.marketingTool.c_name) {
        this.warn("公司名称不能为空");
        return;
      }
      if (!this.marketingTool.region) {
        this.warn("请选择地区");
        return;
      }
      if (!this.marketingTool.linkman) {
        this.warn("联系人不能为空");
        return;
      }
      if (!this.marketingTool.fix_phone) {
        this.warn("固话不能为空");
        return;
      }
      if (
        !/^((0\d{2,3}\d{7,8})|(1[3584]\d{9}))$/.test(this.marketingTool.phone)
      ) {
        this.warn("请填写正确的手机号码");
        return;
      }
      if (!this.marketingTool.address) {
        this.warn("联系地区不能为空");
        return;
      }
      if (!this.marketingTool.intro) {
        this.warn("公司简介不能为空");
        return;
      }
      if (this.goodsIdList.length < 1) {
        this.warn("请选择商品");
        return;
      }
      this.marketingTool.goods.map(item => {
        this.goodsIdList.map(item1 => {
          if (item.id == item1) {
            this.marketingTool.shops.push(item);
          }
        });
      });
      var marketingTool = JSON.parse(JSON.stringify(this.marketingTool));
      marketingTool.shops = "";
      marketingTool.goods.map(item => {
        item.img = JSON.stringify(item.img);
      });
      this.$http({
        url: `${url.saveMarketingTool}/${localStorage.getItem("siteName")}`,
        method: "post",
        data: marketingTool
      }).then(res => {
        if (res.data.code == 20000) {
          this.$router.push({
            path: "createMarke",
            query: {
              shops: this.marketingTool
            }
          });
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    warn(str) {
      this.$message({
        message: str,
        type: "warning"
      });
    },
    selectGoods(event, id) {
      if (event.target.checked) {
        this.goodsIdList.push(id);
      } else {
        this.goodsIdList.splice(this.goodsIdList.indexOf(id), 1);
      }
    },
    deleteMarketingToolGoods() {
      if (this.goodsIdList.length < 1) {
        this.$message.error("请选择要删除的商品");
        return;
      }
      this.$http({
        url: `${url.deleteMarketingToolGoods}/${localStorage.getItem(
          "siteName"
        )}`,
        method: "post",
        data: this.goodsIdList
      }).then(res => {
        if (res.data.code == 20000) {
          this.$message.success("删除成功");
          this.goodsIdList = [];
          this.getMarketingTool();
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    formatPrice(str) {
      return parseFloat(str).toFixed(2);
    },
     onPickFile3() {
      document.querySelector(`#lfile3`).click();
    },
    //关闭图片重新选
    offImg3() {
      this.marketingTool.logo_img = "";
      this.$forceUpdate();
    },
    //img
    imgUpload3(event, index) {
      if(event.target.files[0].size > 1024*1024*2){
        this.$message.error("图片不能大于2M!")
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
        this.marketingTool.logo_img = res.data;
        this.$forceUpdate();
      });
    }
  },
  created() {
    this.getMarketingTool();
  }
};
</script>

<style>
.marke-msg .el-input__inner {
  border: #409eff 1px solid;
}
</style>

<style lang='scss' scoped>
.upfile-box {
  display: flex;
}
.up-file {
  margin-right: 10px;
  width: 100px;
  height: 120px;
  border: 2px solid #3d91e7;
  line-height: 120px;
  text-align: center;
  margin-left: 10px;
}

.banner-img {
  display: flex;
}
//@import url()
.marke-box {
  //   width: 1000px;
  margin: 30px auto;
  .topBox {
    height: 875px;
    display: flex;
    border-bottom: 1px solid rgba(192, 192, 192, 1);
  }
  .category_box {
    width: 70%;
    padding-left: 52px;
    .title {
      text-align: left;
      padding: 20px 0;
      color: #3d91e7;
      //   font-size: 24px;
    }
    .marke-msg {
      //   line-height: 65px;
      ul {
        li {
          margin-bottom: 27px;
        }
      }
      span {
        display: inline-block;
        width: 100px;
        // height:16px;
        font-size: 16px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
      }
      input {
        width: 622px;
        height: 36px;
        border: 1px solid rgba(61, 145, 231, 1);
        border-radius: 4px;
        font-size: 14px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: #000;
        text-indent: 20px;
      }
      #intro {
        // width: 80%;
        // border: 1px solid #dcdfe6;
        // vertical-align: top;
        margin-top: 27px;
        // padding-left: 15px;
        // border-radius: 8px;
        line-height: 2;
        width: 622px;
        height: 120px;
        border: 1px solid rgba(61, 145, 231, 1);
        border-radius: 4px;
        text-indent: 20px;
        font-size: 14px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: #000;
      }
    }
  }

  .topBg {
    width: 40%;
    background-image: url("../../../static/img/bgpen.png");
    background-repeat: no-repeat;
  }

  .btn-box {
    text-align: right;
    margin: 30px 0;
    padding-right: 30px;
    button {
      width: 100px;
      margin-right: 30px;
    }
  }

  //   已选商品样式
  .select {
    padding-left: 80px;
    .selectTop {
      display: flex;
      height: 100px;
      justify-content: space-between;
      align-items: center;
      padding-right: 127px;
      .addShop {
        cursor: pointer;
        display: flex;
        align-items: center;
        font-size: 16px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(61, 145, 231, 1);
        span {
          display: inline-block;
          width: 35px;
          height: 35px;
          line-height: 35px;
          font-size: 32px;
          text-align: center;
          color: #3d91e7;
          border: 2px dashed #3d91e7;
          margin-right: 24px;
        }
      }
    }
    .title {
      font-weight: 600;
      height: 70px;
      line-height: 70px;
      font-size: 16px;
      font-family: MicrosoftYaHei;
      color: rgba(102, 102, 102, 1);
    }
    .select-box {
      width: 95%;
      border: 1px solid #e6e6e6;
      padding: 15px 50px;
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;

      .shop-item {
        width: 20%;
        margin-bottom: 20px;
        position: relative;
        .shopItemBox {
          width: 220px;
          height: 267px;
          border: 1px solid rgba(235, 235, 235, 1);
          position: relative;
          label {
            position: absolute;
            top: 43%;
            left: 50%;
            transform: translate(-50%, -50%);
            cursor: pointer;
          }
          .shop-price {
            position: absolute;
            width: 98%;
            height: 32px;
            top: 97%;
            left: 35%;
            transform: translate(-50%, -50%);
          }
          p {
            position: absolute;
            top: 95%;
            left: 35%;
            transform: translate(-50%, -50%);
          }
        }

        .shop-price {
          p {
            font-size: 0;
          }
          //   position: absolute;
          //   bottom: 20px;
          //   left: 0;
          //   color: #fff;
          //   span {
          //     color: red;
          //     font-size: 16px;
          //     display: inline-block;
          //     padding: 0 5px;
          //     font-weight: 600;
          //   }
          .yuan {
            font-size: 10px;
            color: #ff0303;
          }
          .priceNum {
            font-size: 13px;
            font-family: MicrosoftYaHei;
            font-weight: 400;
            color: rgba(255, 3, 3, 1);
            padding-right: 5px;
          }
          .atLeast {
            font-size: 10px;
            font-family: MicrosoftYaHei;
            font-weight: 400;
            color: rgba(153, 153, 153, 1);
          }
        }
      }
      img {
        width: 204px;
        height: 204px;
        object-fit: cover;
      }
      .chooseBox {
        font-size: 12px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        width: 140px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        input {
          vertical-align: middle;
        }
      }

      //p {
      // font-size: 12px;
      // width: 140px;
      // overflow: hidden;
      // text-overflow: ellipsis;
      // white-space: nowrap;
      //}
    }
    // .btn-box {
    //   text-align: center;
    //   justify-content: center;
    //   button {
    //     width: 200px;
    //     margin: 40px 20px;
    //   }
    // }
  }
  .btn {
    display: flex;
    text-align: center;
    justify-content: center;
    padding-top: 68px;
    text-align: center;

    .btnDel {
      width: 88px;
      height: 35px;
      background: rgba(192, 192, 192, 1);
      border-radius: 4px;
      font-size: 16px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      margin-right: 80px;
      cursor: pointer;
    }
    .btnCate {
      width: 152px;
      height: 35px;
      background: rgba(61, 145, 231, 1);
      border-radius: 4px;
      font-size: 16px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      cursor: pointer;
    }
  }
}
</style>