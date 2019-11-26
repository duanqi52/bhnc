<template>
  <div class="complaintPage">
    <div class="complaintTitle w">投诉建议</div>
    <div class="complaintContent w">
      <div class="formContent">
        <ul>
          <li>
            <span>内容:</span>
            <div>
              <textarea placeholder="请输入内容" v-model="complaintList.content"></textarea>
              <i class="startMark">﹡</i>
            </div>
          </li>
          <!-- <li>
            <span>图片:</span>
            <div>
              <div class="upfile-box">
                <div class="up-file" v-for="(item,index) in brandImgs" :key="index">
                  <img
                    :src="addImg"
                    alt
                    @click="onPickFile3(index)"
                    v-if="!item.img"
                    style="width:204px;height:189px;cursor: pointer;"
                  />

                  <div class="banner-img" v-else style="position:relative">
                    <img :src="item.img" style="width:100%;height:189px;" />
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
                    :id="'complaintafile'+index"
                    @change="imgUpload3($event,index)"
                  />
                </div>
              </div>
            </div>
            <i
              style="  flex-shrink: 0;  align-self: flex-end;font-size:14px;font-family:Microsoft YaHei;font-weight:400;color:rgba(153,153,153,1);"
            >备注：请上传未经处理的原始图片</i>
          </li>-->
          <li>
            <span>投诉人:</span>
            <div>
              <input type="text" placeholder="请输入投诉人" v-model="complaintList.complaintMan" />
            </div>
          </li>
          <li>
            <span>手机：</span>
            <div>
              <!-- <input type="number" placeholder="请输入您的手机号码" /> -->
              <input v-model="complaintList.complaintPhone" placeholder="请输入您的手机号码" type="tel" />
              <i class="startMark">﹡</i>
            </div>
          </li>
        </ul>
      </div>
      <div class="comBtn">
        <input type="button" value="提交" @click="handleSubmit" />
      </div>
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
  // 数据
  data() {
    return {
      addImg: require("../../assets/img/comAdd.png"),
      removeImg: require("../../assets/img/remove.png"),
      brandImgs: [{ img: "" }],
      complaintList: {
        content: "",
        imgs: [],
        complaintMan: "",
        complaintPhone: ""
      }
    };
  },
  methods: {
    //上传图片
    onPickFile3(index) {
      document.querySelector(`#complaintafile${index}`).click();
    },
    //关闭图片重新选
    offImg3(index) {
      this.brandImgs.splice(index, 1);
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

    // 提交投诉
    handleSubmit() {
      // 判空

      if (!this.complaintList.content) {
        if (document.querySelectorAll(".el-message").length == 0)
          this.$message("内容不能为空");
        return;
      }
      if (!this.complaintList.complaintPhone) {
        if (document.querySelectorAll(".el-message").length == 0)
          this.$message("手机号不能为空");
        return;
      }
    }
  },
  // 组件
  components: {},

  created() {},
  mounted() {},
  updated() {}
};
</script>

<style lang="scss" scope>
// 域样式
.w {
  width: 1200px;
  margin: auto;
}
.fl {
  float: left;
}
.fr {
  float: right;
}
.complaintPage {
  .complaintTitle {
    height: 80px;
    line-height: 80px;
    background: rgba(255, 255, 255, 0.48);
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.28);
    padding-left: 35px;
    font-size: 22px;
    font-family: Microsoft YaHei, 微软雅黑;
    font-weight: bold;
    color: rgba(102, 102, 102, 1);
    margin-top: 4px;
    margin-bottom: 12px;
  }
  .complaintContent {
    background: rgba(255, 255, 255, 0.48);
    box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.14);
    .upfile-box {
      display: flex;
    }
    .up-file {
      margin-right: 10px;
      width: 204px;
      height: 189px;
      line-height: 120px;
      text-align: center;
    }
    .banner-img {
      display: flex;
    }
    ul {
      padding-top: 45px;
      padding-bottom: 180px;
      li {
        display: flex;
        padding-bottom: 38px;
        flex-wrap: wrap;
        .startMark {
          color: #d23a43;
          padding-left: 20px;
        }
        span {
          width: 100px;
          text-align: right;
          padding-right: 22px;
          font-size: 20px;
          font-family: Microsoft YaHei, 微软雅黑;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          flex-shrink: 0;
        }
        > div {
          textarea {
            width: 907px;
            height: 213px;
            padding: 16px 22px;
            line-height: 1.5;
            background: rgba(255, 255, 255, 1);
            border: 1px solid rgba(192, 192, 192, 1);
            border-radius: 4px;
            resize: none;
          }
          input {
            width: 320px;
            height: 36px;
            line-height: 36px;
            background: rgba(255, 255, 255, 1);
            border: 1px solid rgba(192, 192, 192, 1);
            border-radius: 4px;
            font-size: 16px;
            font-family: Microsoft YaHei, 微软雅黑;
            font-weight: 400;
            color: #666;
            text-indent: 16px;
          }
        }
      }
    }
  }
  .comBtn {
    text-align: center;
    padding-bottom: 48px;
    input {
      width: 80px;
      height: 34px;
      line-height: 34px;
      background: rgba(210, 29, 39, 1);
      border-radius: 4px;
      font-size: 16px;
      font-family: Microsoft YaHei, 微软雅黑;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      cursor: pointer;
    }
  }
}
</style>
<style lang="scss">
// 全局样式
</style>