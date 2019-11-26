<template>
  <div id="bhncPur_release">
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
            <input
              type="text"
              placeholder="请输入求购数量"
              v-model="purchase.offer_count"
              value="0"
              id="number"
             
            />
          </li>
          <li style="display:flex;">
            <span>求购需求：</span>
            <textarea placeholder="请输入求购需求，限定500字。" v-model="content"></textarea>
          </li>
          <li class="clearfix" style="padding-left:100px;">
            <div class="upfile-box">
              <div
                class="up-file"
                v-for="(item,index) in imgs"
                :key="index"
                style="margin-left:8px"
              >
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
  </div>
</template>

<script>
import { addQuillTitle } from "../../assets/js/quill-title.js";
//   import {quillRedefine} from 'vue-quill-editor-upload'
//   import {quillEditor} from 'vue-quill-editor'

import { quillEditor } from "vue-quill-editor"; //调用编辑器
import { quillRedefine } from "vue-quill-editor-upload";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import url from "../../serverAPI.config.js";
export default {
  data() {
    return {
      imgs: [{ img: "" }],
      addImg: require("../../assets/img/adds.png"),
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      isSubmit: true,
      title: "",
      num: "",
      dates: "",
      editorOption: {},
      content: "",
      options: [],
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIxIiwic3ViIjoiMTM0MzMxNTcxNDciLCJpYXQiOjE1NjAzMzQzNTEsInJvbGVzIjoidXNlciJ9.cpLQ0B-asQpLawZ_uoEi0VkMlfbVWgWO4rxKtKeD404"
      },
      purchase: {
        title: "",
        delivery_date: "",
        offer_count: "",
        content_img: "",
        pcount:0
      },
      submitted: true,
      oldCount: ""
    };
  },
  created() {
    this.editorOption = quillRedefine({
      uploadConfig: {
        action: url.uploadFWB,
        res: respnse => {
          return respnse.url;
        },
        name: "file", // 图片上传参数名
        size: 1024 * 2
      },
      placeholder: "请填写采购描述"
    });
    this.checkOfferCountInputData()
  },
  mounted() {
    let content = ""; // 请求后台返回的内容字符串
    this.str = this.escapeStringHTML(content);
    // this.getScope();
    var bodyHeight = window.screen.height;
    document.getElementById("bhncPur_release").style.minHeight =
      bodyHeight + "px";
  },
  component: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    }
  },
  methods: {
    //用图片代替file上传
    onPickFile1(index) {
      document.querySelector(`#lfile${index}`).click();
    },
    //input输入整数方法
    checkOfferCountInputData() {
      setInterval(() => {
        if(this.oldCount == this.purchase.offer_count){
          return;
        }
        var numReg = new RegExp("[0-9]{1}");
        var value = this.purchase.offer_count;
        // console.log(value);
        var valueSave = "";
        for (var i = 0; i < value.length; i++) {
          if (numReg.test(value.charAt(i))) {
            if(i == 0){
              if(value.charAt(i) == 0){
                continue
                // return
                //break
              }
            }
            valueSave += value.charAt(i);
          }
        }
        this.purchase.offer_count = valueSave;
        this.oldCount = valueSave;
      }, 10);
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
    onEditorReady(editor) {
      // 准备编辑器
    },
    onEditorBlur() {}, // 失去焦点事件
    onEditorFocus() {}, // 获得焦点事件
    onEditorChange() {}, // 内容改变事件
    // 转码
    escapeStringHTML(str) {
      str = str.replace(/&lt;/g, "<");
      str = str.replace(/&gt;/g, ">");
      return str;
    },
   
    // 提交
    submitPurchase() {
      if (!this.submitted) {
        return;
      }
      this.submitted = false;
      if (document.querySelectorAll(".el-message--warning").length < 1) {
        if (!this.purchase.title) {
          this.warn("标题");
          return;
        }
        if (!this.purchase.offer_count) {
          this.warn("数量");
          return;
        }
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
        this.$http({
          url: `${url.addPurchase}/${localStorage.getItem("siteName") || localStorage.getItem("username")}`,
          method: "post",
          // headers:this.headers,
          data: this.purchase
        })
          .then(res => {
            if (res.data.code == 20000) {
              this.$router.push({ path: "purchase" });
            } else {
              this.$message({
                message: "警告哦，这是一条警告消息",
                type: "error"
              });
            }
            this.submitted = true;
          })
          .catch(err => {
            this.submitted = true;
          });
      }
    },
    // off() {
    //   this.$router.push({ path: "./Purchase" });
    // },
    // warn(str) {
    //   this.$message({
    //     message: `${str}不能为空`,
    //     type: "warning"
    //   });
    // }
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
<style lang="scss">
#bhncPur_release {
  .fubu_all .el-input__inner {
    border-color: #3d91e7;
    width: 622px;
  }

  .el-select .el-input--suffix {
    width: 622px;
  }

  .fubu_all .el-input {
    width: 622px;
  }
}
</style>
<style lang="scss" scoped>
#bhncPur_release {
  background-color: #fbfbfb;
  .fubu {
    width: 100%;
    .release_top {
      min-height: 380px;
    }
    p {
      padding-left: 60px;
      height: 130px;
      line-height: 130px;
      font-size: 24px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(61, 145, 231, 1);
    }
    .fubu_all {
      padding-left: 73px;
      margin-bottom: 30px;
      span {
        width: 108px;
        display: inline-block;
        font-size: 16px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
      }
      // .el-input {
      //   width: 60%;
      // }
      .el-select {
        width: 60%;
      }
    }
  }
  .quill-editor {
    width: 80%;
    display: inline-block;
    height: 400px;
  }
  .submit {
    display: flex;
    justify-content: center;
    padding-top: 100px;
    padding-bottom: 61px;
    //   margin: 50px;
    .purSubmit {
      width: 88px;
      height: 35px;
      background: rgba(192, 192, 192, 1);
      border-radius: 4px;
      font-size: 16px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      margin-right: 51px;
      cursor: pointer;
    }
    .submitPur {
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
  .edit_container {
    margin-top: 31px;
    padding-left: 60px;
    h3 {
      font-size: 16px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      padding-bottom: 23px;
    }
  }
}
.userPubilc {
  .userPubilcTitle {
    height: 68px;
    line-height: 68px;
    font-size: 16px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.04);
    margin-bottom: 2px;
    i {
      display: inline-block;
      height: 16px;
      margin-left: 36px;
      padding-left: 12px;
      line-height: 16px;
      font-size: 20px;
      font-family: MicrosoftYaHeiLight;
      font-weight: bold;
      color: rgba(102, 102, 102, 1);
      // border-left: 2px solid rgba(252, 115, 54, 1);
    }
  }
  .userPublicContent {
    background-color: #fbfbfb;
    padding-left: 38px;
    padding-top: 10px;

    ul {
      padding-bottom: 230px;
      li {
        margin: 24px 0;
        span {
          display: inline-block;
          width: 100px;
          font-size: 16px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
        }
        input {
          width: 800px;
          height: 34px;
          text-indent: 15px;
          background: rgba(255, 255, 255, 1);
          border: 1px solid rgba(192, 192, 192, 1);
          border-radius: 8px;
          font-size: 14px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: #666;
        }
        textarea {
          padding: 10px;
          width: 800px;
          height: 248px;
          background: rgba(255, 255, 255, 1);
          border: 1px solid rgba(192, 192, 192, 1);
          border-radius: 8px;
          resize: none;
          line-height: 2;
          font-size: 14px;
          color: #666;
          margin-left: 8px;
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
    height: 116px;
    line-height: 116px;
    border-top: 2px solid #f0f0f0;
    text-align: center;
    background-color: #fbfbfb;
    input {
      width: 92px;
      height: 36px;
      border-radius: 8px;
      line-height: 36px;
      background: rgba(153, 153, 153, 1);
      border-radius: 8px;
      margin-right: 24px;
      font-size: 14px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(248, 248, 248, 1);
      cursor: pointer;
    }
  }
}
</style>