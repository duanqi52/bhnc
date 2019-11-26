<template>
  <div class="userPubilc">
    <div class="userPubilcTitle">
      <i>发布求购</i>
    </div>
    <div class="userPublicContent">
      <ul>
        <li>
          <span>标题：</span>
          <input type="text" placeholder="请输入标题" v-model="purchase.title" />
        </li>
        <li>
          <span>求购数量：</span>
          <input type="text" placeholder="请输入采购数量" v-model="purchase.offer_count" />
        </li>
        <!-- <li>
                         <span>交货时间：</span>
                         <input type="number" placeholder="请输入限制交货时间或日期"  v-model="purchase.delivery_date">
        </li>-->
        <li style="display:flex;">
          <span>求购需求：</span>
          <textarea placeholder="请输入采购需求，限定500字。" v-model="content"></textarea>
        </li>
        <li class="clearfix" style="padding-left:100px;">
          <div class="upfile-box">
            <div class="up-file" v-for="(item,index) in imgs" :key="index" style="margin-left:4px">
              <img
                :src="addImg"
                alt
                @click="onPickFile1(index)"
                v-if="!item.img"
                style="widht:60px;cursor: pointer;"
              />

              <div class="banner-img" v-else>
                <img :src="item.img" style="width:93px;height:81px" />
                <i class="remove iconfont icon-delete_light" @click="offImg(index)"></i>
              </div>
              <input
                type="file"
                accept="image/*"
                style="display: none"
                :id="'lfile'+index"
                @change="imgUpload($event,index)"
              />
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="commitStatus">
      <input type="button" value="取消" @click="cancleCommit" />
      <input type="button" value="提交" style="background:#FC9263" @click="submitPurchase" />
    </div>
  </div>
</template>

<script>
import url from "@/serverAPI.config.js";

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
  data() {
    return {
      imgs: [{ img: "" }],
      addImg: require("../../assets/img/adds.png"),
      purchase: {
        title: "",
        delivery_date: "",
        offer_count: "",
        content_img: ""
      },
      content: ""
    };
  },
  components: {},
  methods: {
    //用图片代替file上传
    onPickFile1(index) {
      document.querySelector(`#lfile${index}`).click();
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
        url: `${url.upload}`,
        method: "post",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" }
      }).then(res => {
        this.imgs[index].img = res.data;
        if (this.imgs.length < 5) {
          this.imgs.push({ img: "" });
        }
      });
    },
    //关闭图片重新选
    offImg(index) {
      this.imgs.splice(index, 1);
    },
    // 提交
    submitPurchase() {
      if (document.querySelectorAll(".el-message--warning").length < 1) {
        if (!this.purchase.title) {
          this.warn("标题");
          return;
        }
        if (!this.purchase.offer_count) {
          this.warn("数量");
          return;
        }
        // if (!this.purchase.delivery_date) {
        //   this.warn("交货天数");
        //   return;
        // }
        this.purchase.content_img = JSON.stringify({
          content: this.content,
          imgs: this.imgs
        });
        if (!this.purchase.content_img) {
          this.warn("描述");
          return;
        }
        this.purchase.message = "[]";
        this.purchase.status = "0";
        this.purchase.issued_status = "0";
        this.$http({
          url: `${url.addPurchase}/${localStorage.getItem("username")}`,
          method: "post",
          // headers:this.headers,
          data: this.purchase
        })
          .then(res => {
            if (res.data.code == 20000) {
              this.$router.push({ path: "buyInfo" });
            } else {
              this.$message({
                message: "警告哦，这是一条警告消息",
                type: "error"
              });
            }
          })
          .catch(err => {});
      }
    },
    // 取消
    cancleCommit() {
      this.purchase = {};
      this.$router.go(-1);
    },
    // 验证
    warn(str) {
      this.$message({
        message: `${str}不能为空`,
        type: "warning"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.userPubilc {
  .userPubilcTitle {
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    font-family: MicrosoftYaHei, 微软雅黑;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    background-color: #fff;
    margin-bottom: 2px;
    i {
      display: inline-block;
      height: 16px;
      margin-left: 36px;
      padding-left: 12px;
      line-height: 16px;
      border-left: 2px solid rgba(252, 115, 54, 1);
    }
  }
  .userPublicContent {
    background-color: #fbfbfb;
    padding-left: 38px;
    padding-top: 10px;
    min-height: 607px;
    ul {
      padding-bottom: 60px;
      margin-bottom: 2px;
      li {
        margin: 18px 0;
        span {
          display: inline-block;
          width: 100px;
          font-size: 16px;
          font-family: MicrosoftYaHei, 微软雅黑;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
        }
        input {
          width: 480px;
          height: 34px;
          text-indent: 15px;
          background: rgba(255, 255, 255, 1);
          border: 1px solid rgba(192, 192, 192, 1);
          border-radius: 8px;
          font-size: 14px;
          font-family: MicrosoftYaHei, 微软雅黑;
          font-weight: 400;
          color: #666;
        }
        textarea {
          padding: 10px;
          width: 480px;
          height: 248px;
          background: rgba(255, 255, 255, 1);
          border: 1px solid rgba(192, 192, 192, 1);
          border-radius: 8px;
          resize: none;
          line-height: 2;
          font-size: 14px;
          color: #666;
        }
      }
      .upfile-box {
        display: flex;
        float: left;
        .up-file {
          width: 80px;
          height: 80px;
          overflow: hidden;
          object-fit: cover;
          margin: 0 18px;
          img {
            width: 100%;
          }
          .banner-img {
            position: relative;
            .remove {
              // width: 35px;
              position: absolute;
              bottom: 5px;
              right: 10px;
              cursor: pointer;
              color: red;
              font-size: 14px;
            }
          }
        }
      }
    }
  }
  .commitStatus {
    height: 68px;
    line-height: 68px;
    text-align: center;
    background-color: #fff;
    input {
      width: 72px;
      height: 28px;
      line-height: 28px;
      background: rgba(153, 153, 153, 1);
      border-radius: 8px;
      margin-right: 24px;
      font-size: 14px;
      font-family: MicrosoftYaHei, 微软雅黑;
      font-weight: 400;
      color: rgba(248, 248, 248, 1);
      cursor: pointer;
    }
  }
}
</style>
