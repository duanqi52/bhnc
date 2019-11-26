<template>
  <div id="bhncEvaluate">
    <div class="evaluate">
      <!-- 评分页面头部开始 -->
      <div class="evalute_title">
        <ul>
          <li>订单ID：AADDJK88465465</li>
          <li>订单金额：558520.00</li>
          <li>下单时间：2019-05-30 18：50</li>
        </ul>
      </div>
      <!-- 评分页面头部结束 -->
      <!-- 评分内容开始 -->
      <div class="evalute_content">
        <div class="content_title">
          <p>商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称</p>
        </div>
        <div class="evaluate_txt">
          <span>评分：</span>
          <el-rate v-model="value" show-text></el-rate>
        </div>
        <div class="evaluate_area">
          <span>评价:</span>
          <textarea placeholder="请输入评价内容"></textarea>
        </div>
        <div class="uploadImg">
          <!-- <label> -->
          <!-- <i>+</i>
          <input type="file" hidden>-->
          <div class="upfile-box">
            <div class="up-file" v-for="(item,index) in other_imgList" :key="index">
              <img :src="addImg" alt @click="onPickFile2(index)" v-if="!item.img" width="14px" />

              <div class="banner-img" v-else style="position:relative">
                <img :src="item.img" style="width:100%;height:44px" />
                <a>
                  <img
                    :src="removeImg"
                    class="remove"
                    @click="offImg2(index)"
                    style="width:20px;top:0px; right:0; position:absolute; "
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
          <!-- </label> -->
        </div>
      </div>
      <!-- 评分内容结束 -->
      <!-- 提交状态开始 -->
      <div class="commitState">
        <input type="button" value="取消" class="cancelBtn" />
        <input type="button" value="提交" class="commitBtn" />
      </div>
      <!-- 提交状态结束 -->
    </div>
  </div>
</template>

<script>
import addImg from "@/views/order/addImg";
import bannerImg from "@/views/order/bannerImg";
import url from "@/serverAPI.config.js";
export default {
  data() {
    return {
      value: null,
      addImg: require("../../assets/img/add.png"),
      removeImg: require("../../assets/img/remove.png"),
      other_imgList: [{ img: "" }]
    };
  },
  components: {},
  methods: {
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
    // 点击图片
    onPickFile2(index) {
      document.querySelector(`#file${index}`).click();
    }
  }
};
</script>

<style scoped lang="scss">
#bhncEvaluate {
  // 评分页面
  .evaluate {
    // 评分页面头部开始
    .evalute_title {
      background: #e7f2fc;
      padding-left: 50px;
      ul {
        display: flex;
        line-height: 80px;
        height: 80px;
        width: 100%;
        padding-left: 48px;
        li {
          margin-right: 80px;
          font-size: 16px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: rgba(61, 145, 231, 1);
        }
      }
    }
    // 评分页面头部结束

    //   评分内容开始
    .evalute_content {
      padding-left: 70px;
      height: 334px;
      background-image: url("../../../static/img/evaluatebg@2x.png");
      background-repeat: no-repeat;
      background-position: top right;
      border-bottom: 1px solid rgba(240, 240, 240, 1);
      span {
        display: inline-block;
        width: 55px;
        font-size: 16px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
      }
      .content_title {
        width: 50%;
        margin-top: 35px;
        height: 86px;
        p {
          height: 32px;
          line-height: 32px;
          font-size: 16px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
        }
      }
      .evaluate_txt {
        display: flex;
        padding-bottom: 37px;
      }
      .evaluate_area {
        display: flex;
        width: 50%;
        border-radius: 4px;
        textarea {
          width: 622px;
          height: 100px;
          border: 1px solid rgba(61, 145, 231, 1);
          border-radius: 4px;
          line-height: 2;
          font-size: 16px;
          font-family: MicrosoftYaHei;
          text-indent: 12px;
        }
      }

      .uploadImg {
        padding-left: 55px;
        padding-top: 12px;
        //   label {
        //     display: block;
        //     width: 48px;
        //     height: 48px;
        //     text-align: center;
        //     line-height: 48px;
        //     cursor: pointer;
        //     border: 2px dashed rgba(61, 145, 231, 1);
        //   }
      }
    }
    //   评分内容结束

    //   提交状态开始
    .commitState {
      padding: 38px 0;
      display: flex;
      justify-content: center;
      justify-content: center;

      .cancelBtn {
        width: 88px;
        height: 35px;
        background: rgba(192, 192, 192, 1);
        border-radius: 4px;
        margin-right: 51px;
        font-size: 16px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        cursor: pointer;
      }
      .commitBtn {
        width: 88px;
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
    //   提交状态结束
  }

  .upfile-box {
    display: flex;
  }
  .up-file {
    margin-right: 10px;
    width: 48px;
    height: 48px;
    border: 2px solid #3d91e7;
    line-height: 48px;
    text-align: center;
  }

  .banner-img {
    display: flex;
  }
}
</style>
