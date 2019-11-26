<template>
  <div class="fubu">
    <p>发布广播消息</p>
    <div class="release_top">
      <div class="fubu_all">
        <span>标题:</span>
        <el-input placeholder="请输入消息标题" v-model="news.title" clearable></el-input>
      </div>
      <div class="fubu_all">
        <span>收件人:</span>
        <el-select
          v-model="chooseData"
          filterable
          multiple
          placeholder="请选择收件人"
          @change="selectAll"
        >
          <el-option
            v-for="item in selectOptions"
            :key="item.id"
            :label="item.company_name"
            :value="item.company_name"
          >
            <span style="float: left">{{ item.company_name }}</span>
            <span
              style="float: right; color: #8492a6; font-size: 13px;margin-right: 30px;"
            >{{ item.region }}</span>
          </el-option>
        </el-select>
      </div>
    </div>
    <div style="margin-top: 31px;padding-left: 60px;">消息正文</div>
    <div class="edit_container">
      <quill-editor
        v-model="news.content"
        ref="myQuillEditor"
        :options="editorOption"
        @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)"
        @change="onEditorChange($event)"
      ></quill-editor>
    </div>

    <div class="submit">
      <button style="margin-right: 100px;" @click="off()" class="purSubmit">取消</button>
      <button @click="submitNews()" class="submitPur">提交</button>
    </div>

  </div>


</template>

<script>
import { quillEditor } from "vue-quill-editor"; //调用编辑器
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import url from "@/serverAPI.config.js";
export default {
  data() {
    return {
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
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIxIiwic3ViIjoiMTM0MzMxNTcxNDciLCJpYXQiOjE1NjAzMzQzNTEsInJvbGVzIjoidXNlciJ9.cpLQ0B-asQpLawZ_uoEi0VkMlfbVWgWO4rxKtKeD404"
      },
      purchase: {
        title: "",
        type: null,
        delivery_date: "",
        offer_count: "",
        content_img: ""
      },
      selectOptions: [],
      oldChooseData: [],
      chooseData: [],
      news: {},
      username: "",
      id:"",
      gid:"",
      user:null,
      setIntegral:null,
      setLevel: []

    };
  },
  created() {
    this.getSetLevel();
    this.getUserMsg();
    this.getSetIntegral();

  },
  mounted() {
    this.username = localStorage.getItem("username") || localStorage.getItem("siteName");
    this.id= localStorage.getItem("ID");

    let content = ""; // 请求后台返回的内容字符串
    this.str = this.escapeStringHTML(content);
    this.getReceiveMan();
  },
  component: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    }
  },
  methods: {
      getSetLevel(){
       this.$http({
         //url:'http://localhost:9004integralRecord/getSetLevel',
        url: `${url.getSetLevel}`,
        method: "get"
      }).then(res => {
        if (res.data.code == 20000) {
         this.setLevel=res.data.data;
        }
      });
    },
       //获取设置积分
    getSetIntegral() {
      this.$http({
        //url:'http://172.16.0.138:9004integralRecord/getSetIntegral',
        url: `${url.getSetIntegral}`,
        method: "get"
      })
        .then(res => {
          this.setIntegral = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
      },

       //获取当前用户信息
    getUserMsg() {
      this.$http({
        url: `${url.getUserMsg}`,
        method: "get"
      })
        .then(res => {
          this.user = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
      },
    selectAll(val) {
      const allValues = this.selectOptions.map(item => {
        return item.company_name;
      });
      // 用来储存上一次选择的值，可进行对比
      const oldVal = this.oldChooseData.length > 0 ? this.oldChooseData : [];

      // 若选择全部
      if (val.includes("全部")) {
        this.chooseData = allValues;
      }

      // 取消全部选中， 上次有， 当前没有， 表示取消全选
      if (oldVal.includes("全部") && !val.includes("全部")) {
        this.chooseData = [];
      }

      // 点击非全部选中，需要排除全部选中 以及 当前点击的选项
      // 新老数据都有全部选中
      if (oldVal.includes("全部") && val.includes("全部")) {
        const index = val.indexOf("全部");
        val.splice(index, 1); // 排除全选选项
        this.chooseData = val;
      }

      // 全选未选，但是其他选项都全部选上了，则全选选上
      if (!oldVal.includes("全部") && !val.includes("全部")) {
        if (val.length === allValues.length - 1) {
          this.chooseData = ["全部"].concat(val);
        }
      }

      // 储存当前选择的最后结果 作为下次的老数据
      this.oldChooseData = this.chooseData;


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
    //收件人
    getReceiveMan() {
      this.$http({
        url: `${url.amendUser}/getReceiveMan`,
        method: "get"
      })
        .then(res => {
          this.selectOptions = res.data.data;
          this.selectOptions.unshift({
            id: "ALL_SELECT",
            username: "ALL_SELECT",
            company_name: "全部"
          });
        })
        .catch(err => {});
    },


    //提交
    submitNews() {
      if (!this.news.title) {
        this.warn("标题");
        return;
      }
      if (!this.chooseData) {
        this.warn("收件人");
        return;
      }
      if (!this.news.content) {
        this.warn("消息正文");
        return;
      }
      this.news.type = "0";
      if(this.chooseData.length>0){
        var names=JSON.parse(JSON.stringify(this.chooseData));
          if(names[0]=="全部"){
              names.splice(0,1);
               this.news.d_id=JSON.stringify(names);
          } else{
             this.news.d_id = JSON.stringify(this.chooseData);
          }
      }else{
          this.news.d_id = JSON.stringify(this.chooseData);
      }
      this.news.p_id = localStorage.getItem('ID');
      if(this.user.level=="1"){
          this.$confirm(
                "您的级别没有权限发布广播消息，请充值积分达到2级会员！","提示",{
                  confirmButtonText: "去充值",
                  cancelButtonText: "取消",
                  type: "warning",
                  center: true
                }).then(() => {
                  this.$router.push("/recharge");
                 }).catch(() => {});
      }else if(this.user.level=="88"){
        var level="";
        for (var i = 0; i < this.setLevel.length; i++) {
            if(this.user.integral>=this.setLevel[i].start_integral){
                level=this.setLevel[i].level;
            }
         }
           if(level=="1"){
            this.$confirm(
                 "您的级别没有权限发布广播消息，请充值积分达到2级会员！","提示",{
                  confirmButtonText: "去充值",
                  cancelButtonText: "取消",
                  type: "warning",
                  center: true
                }).then(() => {
                  this.$router.push("/recharge");
                 }).catch(() => {});
            }else{
               this.sendMessage() 
            }
      }else{
           this.sendMessage() 
      }
    },
    sendMessage(){
        this.news.send_radio=this.setIntegral.send_radio; 
                   this.$http({
                      //url:'http://localhost:9001/advices/sendBroadcast',
                      url: `${url.sendBroadcast}`,
                      method: "post",
                      // headers:this.headers,
                      data: this.news
                    }).then(res => {
                       if (res.data.code == 20000) {
                          this.$router.push({ path: "./news" });
                        } else {
                          this.$message({
                            message: "警告哦，这是一条警告消息",
                           type: "error"
                            });
                    }
                  }).catch(err => {});
    },
    off() {
      this.$router.push({ path: "./news" });
    },
    warn(str) {
      this.$message({
        message: `${str}不能为空`,
        type: "warning"
      });
    }
  }
};
</script>

<style>
.fubu_all .el-input__inner {
  border-color: #666666;
  width: 622px;
}

 .fubu  .el-select .el-input--suffix {
  width: 622px;
}

.fubu_all .el-input {
  width: 622px;
}
</style>
<style lang="scss" scoped>
.fubu {
  width: 100%;
  .release_top {
    border-bottom: 1px solid #ccc;
    background-repeat: no-repeat;
    background-position: 100% 0;
    min-height: 280px;
    padding-top: 70px;
  }
  p {
    padding-left: 60px;
    line-height: 68px;
    font-size: 17px;
    font-family: MicrosoftYaHei,微软雅黑;
    font-weight: 400;
    height: 68px;
    background: rgba(255,255,255,1);
    border-bottom: 1px solid #ccc;
  }
  .fubu_all {
    padding-left: 73px;
    margin-bottom: 30px;
    span {
      width: 108px;
      display: inline-block;
      font-size: 16px;
      font-family: MicrosoftYaHei,微软雅黑;
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
    width:76px;
    height:28px;
    background:rgba(192,192,192,1);
    border-radius:4px;
    font-size: 14px;
    font-family: MicrosoftYaHei,微软雅黑;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    margin-right: 51px;
    cursor: pointer;
  }
  .submitPur {
    width:76px;
    height:28px;
    background:rgba(252,146,99,1);
    border-radius:4px;
    font-size:14px;
    font-family:MicrosoftYaHei;
    font-weight:400;
    color:rgba(255,255,255,1);
    cursor: pointer;
  }
}
.edit_container {
  margin-top: 31px;
  padding-left: 60px;
  h3 {
    font-size: 16px;
    font-family: MicrosoftYaHei,微软雅黑;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    padding-bottom: 23px;
  }
}
</style>
