<!-- 组件说明 -->
<template>
  <!-- 子账号添加页面 -->
  <div class="subAccountAdd">
    <div class="subAccountAddTitle">
      <h4 class>添加子账号</h4>
    </div>
    <div class="subAccountAddContent">
      <ul>
        <li class="clearfix" style="margin-bottom:20px;">
          <span class="fl listTitle">账号：</span>
          <div class="tipsBox fl">
            <input type="text" placeholder="请输入登陆账号" v-model="userSon.username" autocomplete="new-password"/>
            <p class="tipsPh">登陆账号一旦设置不可更改,6~18个字符，可使用字母、数字、下划线，需以字母开头</p>
          </div>
        </li>
        <li class="clearfix" style="margin-bottom:20px;">
          <span class="fl listTitle">密码：</span>
          <div class="tipsBox fl">
            <input type="password" placeholder="请输入登陆密码" v-model="userSon.old_password" autocomplete="new-password"/>
            <p class="tipsPh">6~18个字符，可使用字母、数字、需以字母开头、不包含特殊字符</p>
          </div>
        </li>
        <li class="clearfix">
          <span class="fl listTitle">姓名：</span>
          <div class="tipsBox fl">
            <input type="text" placeholder="请输入姓名" v-model="userSon.name" autocomplete="off"/>
          </div>
        </li>
        <li class="clearfix">
          <span class="fl listTitle">移动电话：</span>
          <div class="tipsBox fl">
            <input type="text" placeholder="请输入移动电话" v-model="userSon.phone" autocomplete="off" maxlength="11" oninput = "value=value.replace(/[^\d]/g,'')"/>
          </div>
        </li>
        <li class="clearfix">
          <span class="fl listTitle">职位：</span>
          <div class="tipsBox fl">
            <el-select v-model="job" placeholder="请选择">
              <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </div>
        </li>
      </ul>
      <div class="btnBox">
        <div class="cancleBtn"></div>
        <input type="button" value="取消" @click="$router.push('/subAccountList')"  class="cancleBtn" />
        <input type="button" value="确定" class="commitBtn" @click="save()" style="background:#D21D27" />
      </div>
    </div>
  </div>
</template>

<script>
import url from "@/serverAPI.config.js";
//import x from ''
export default {
  components: {},
  data() {
    return {
      options: [],
      job: null,
      userSon: {
        username: "",
        old_password: "",
        name: "",
        phone: ""
      }
    };
  },
  computed: {},
  created() {
    this.getJobs();
  },
  methods: {
    save() {
      if(!this.userSon.username){
        if(document.getElementsByClassName('el-message').length == 0)
        this.$message.error("请填写账号")
        return;
      }
      if(localStorage.getItem("username") || localStorage.getItem("siteName") == this.userSon.username){
        this.$message.error("登陆账号不能跟主账号一样!")
        return;
      }
      if (!/^[a-zA-z_]\w{5,17}$/.test(this.userSon.username)) {
          this.$message.error("请输入正确的登录帐号"); 
      }
      if(!this.userSon.old_password){
        if(document.getElementsByClassName('el-message').length == 0)
        this.$message.error("请填写密码")
        return;
      }
       if (!/^[a-zA-z]\w{5,17}$/.test(this.userSon.old_password)) {
       this.$message.error("请输入正确的登录密码");
      }
      if(!this.userSon.name){
        if(document.getElementsByClassName('el-message').length == 0)
        this.$message.error("请填写姓名")
        return;
      }
      if(!this.userSon.phone){
        if(document.getElementsByClassName('el-message').length == 0)
        this.$message.error("请填写移动电话")
        return;
      }
       if (!/^(((13[0-9])|(14[5-7])|(15[0-9])|(17[0-9])|(18[0-9]))+\d{8})$/.test(this.userSon.phone)) {
          this.$message.error("请输入正确的移动电话");
          return;
        }
      if(!this.job){
        if(document.getElementsByClassName('el-message').length == 0)
        this.$message.error("请选择职业")
        return;
      }
      var job = {};
      this.options.map(item =>{
        if(item.id == this.job){
          job = item;
        }
      })
      this.userSon.j_id= job.id;
      this.userSon.job= job.name;
      this.userSon.u_id=localStorage.getItem('ID');
      this.userSon.type= "1";
      this.$http({
        url: `${url.addUserSon}`,
        data: this.userSon,
        method: "post"
      }).then(res => {
        if(res.data.code == 20000){
          this.$router.push('/subAccountList');
        }else{
          this.$message.error(res.data.message);
        }
      });
    },
    getJobs() {
      this.$http({
        url: `${url.findUserJobs}/${localStorage.getItem("ID")}/1`,
        method: "get"
      }).then(res => {
        if (res.data.code == 20000) {
          this.options = res.data.data;
        }
      });
    }
  }
};
</script>


<style lang="scss">
.subAccountAdd {
  .el-input__inner {
    height: 36px;
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(153, 153, 153, 1);
    border-radius: 4px;
    font-size: 16px;
    font-family: MicrosoftYaHei,微软雅黑;
    font-weight: 400;
    color: #000;
  }
}
</style>


<style lang='scss' scoped>
.fl {
  float: left;
}
.fr {
  float: right;
}
.subAccountAdd {
  .subAccountAddTitle {
    padding-left: 48px;
    padding-right: 24px;
    height: 68px;
    line-height: 68px;
    background-color: #fff;
    box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.04);
    border-bottom: 1px solid #f0f0f0;
    h4 {
      font-size: 20px;
      font-family: MicrosoftYaHeiLight;
      font-weight: bold;
      color: rgba(102, 102, 102, 1);
    }
  }
  .subAccountAddContent {
    padding-top: 38px;
    ul {
      padding-bottom: 78px;

      li {
        margin-bottom: 30px;
        .listTitle {
          width: 117px;
          margin-right: 24px;
          text-align: right;
          font-size: 20px;
          font-family: MicrosoftYaHeiLight;
          font-weight: 500;
          color: rgba(102, 102, 102, 1);
          padding-left: 50px;
        }
        input[type="text"],
        input[type="password"] {
          width: 480px;
          height: 36px;
          background: rgba(255, 255, 255, 1);
          border: 1px solid rgba(153, 153, 153, 1);
          border-radius: 4px;
          font-size: 16px;
          font-family: MicrosoftYaHei,微软雅黑;
          font-weight: 400;
          color: #000;
          text-indent: 18px;
        }
        .tipsPh {
          padding-top: 9px;
          font-size: 12px;
          font-family: MicrosoftYaHei,微软雅黑;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
          text-indent: 18px;
        }
      }
    }
    .btnBox {
      padding-left: 20%;
      input[type="button"] {
        width: 100px;
        height: 36px;
        background: rgba(153, 153, 153, 1);
        border-radius: 4px;
        line-height: 36px;
        margin-right: 40px;
        font-size: 16px;
        font-family: MicrosoftYaHei,微软雅黑;
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
        cursor: pointer;
      }
    }
  }
}
</style>