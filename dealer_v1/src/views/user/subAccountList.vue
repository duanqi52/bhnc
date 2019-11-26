<!-- 组件说明 -->
<template>
  <!-- 子账号列表页面 -->
  <div class="subAccountList">
    <!-- 编辑页面遮罩层 -->
    <div id="editSubAcc" v-show="isShow">
      <div class="editSub">
        <ul>
          <li class="clearfix" style="margin-bottom:20px;">
            <span class="fl listTitle">账号：</span>
            <div class="tipsBox fl">
              <p>{{userSonSave.username}}</p>
              <!-- <input type="text" readonly :value="userSonSave.username" disabled /> -->
              <!-- <p class="tipsPh">登陆账号不可更改</p> -->
            </div>
          </li>
          <li class="clearfix" style="margin-bottom:20px;">
            <span class="fl listTitle">密码：</span>
            <div class="tipsBox fl">
              <input type="text" placeholder="请输入登陆密码" v-model="userSonSave.old_password" />
              <p class="tipsPh">6~18个字符，可使用字母、数字、需以字母开头、不包含特殊字符</p>
            </div>
          </li>
          <li class="clearfix">
            <span class="fl listTitle">姓名：</span>
            <div class="tipsBox fl">
              <input type="text" placeholder="请输入姓名" v-model="userSonSave.name" />
            </div>
          </li>
          <li class="clearfix">
            <span class="fl listTitle">移动电话：</span>
            <div class="tipsBox fl">
              <input type="text" placeholder="请输入移动电话" v-model="userSonSave.phone" />
            </div>
          </li>
          <li class="clearfix">
            <span class="fl listTitle">职位:</span>
            <div class="tipsBox fl">
              <el-select v-model="job" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </div>
          </li>
        </ul>
        <div class="btnBox">
          <input type="button" value="取消" class="cancleBtn" @click="handleCancel" />
          <input type="button" value="确定" class="commitBtn" @click="updateUserSon()" style="background:#D21D27" />
        </div>
      </div>
    </div>

    <!-- 子账号头部 -->
    <div class="subAccountTitle clearfix">
      <h4 class="fl">子账号</h4>
      <div class="fr">
        <input type="button" value="添加" @click="$router.push('/subAccountAdd')" />
      </div>
    </div>
    <!-- 子账号列表部分 -->
    <div class="subAccountContent">
      <div class="AccountInfoTitle">账号信息</div>
      <template>
        <el-table
          :data="userSonList"
          stripe
          style="width: 100%;font-size:16px;
            font-family:MicrosoftYaHei;
            font-weight:400;
            color:rgba(51,51,51,1);"
        >
          <el-table-column prop="username" label="登录账号" align="center"></el-table-column>
          <el-table-column prop="name" label="姓名" align="center" ></el-table-column>
          <el-table-column prop="job" label="职位" align="center" ></el-table-column>
          <el-table-column prop="phone" label="移动电话" align="center"></el-table-column>
          <el-table-column label="操作" align="center" width="500">
            <template slot-scope="scope">
              <input
                type="button" v-if="scope.row.status==1"
                @click="handleClick(scope.row)"
                value="禁用并解绑"
                class="listBtn disableBtn"
              />
              <input
                v-if="scope.row.status==0"
                type="button"
                @click="startClick(scope.row)"
                value="启用并绑定"
                class="listBtn ableBtn"
              />
              <!-- <input type="button" value="重置密码" class="listBtn resetBtn" /> -->
              <input
                type="button" v-if="scope.row.status==1"
                value="编辑"
                class="listBtn editBtn"
                @click="handleShow(scope.row)"
              />
            </template>
          </el-table-column>
        </el-table>
      </template>
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
      userSonList: [],
      isShow: false,
      value: "",
      options: [],
      userSonSave: {},
      job: null
    };
  },
  computed: {},

  created() {
    
    this.getJobs();
  },
  updated() {
    document.getElementById("editSubAcc").style.height =
      document.getElementById("app").clientHeight + "px";
  },
  methods: {
    //   每行数据
     handleClick(row) {
      this.$confirm('此操作将禁用该账户并解绑手机号码, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            row.phone="";
            row.status='0';
          this.$http({
            url: `${url.updateByUserSon}`,
           //url:'http://172.16.0.138:9007/user/updateUserSon',//201928
            data: row,
            method: "put"
            }).then(res => {
              if (res.data.code == 20000) {
                this.$message.success("禁用成功"); 
              }else{
                this.$message.error("禁用失败,请联系客服");
              }
            });
        }).catch(() => {
          
        });  
    },
    
   startClick(row) { 
       this.userSonSave = row;
        this.options.map(u => {
        if (u.id == row.j_id) {
          this.job = u.id;
        }
      });
      this.userSonSave.name="";
      this.userSonSave.old_password="";
      this.userSonSave.is='1'; //启用用户标识
      this.isShow = !this.isShow;  
    },
    // 显示编辑
    handleShow(item) {
      this.userSonSave = item;
      this.options.map(u => {
        if (u.id == item.j_id) {
          this.job = u.id;
        }
      });
      this.isShow = !this.isShow;
    },
    // 隐藏编辑
    handleCancel() {
      this.findUserSons();//关闭窗口时清空
      this.isShow = !this.isShow;
    },
    findUserSons() {
      this.$http({
        url: `${url.findUserSons}/${localStorage.getItem("ID")}/0`  //参数1: 用户ID   参数2: 角色类型   201928
      }).then(res => {
        if (res.data.code == 20000) {
          this.userSonList = res.data.data;
          this.userSonList.map(item=>{
            this.options.map(o=>{
              if(item.j_id == o.id){
                item.job = o.name
              }
            })
          })
        }
      });
    },
    updateUserSon() {
      if (!this.userSonSave.username) {
        if (document.getElementsByClassName("el-message").length == 0)
          this.$message.error("请填写账号");
        return;
      }
      if (!this.userSonSave.old_password) {
        if (document.getElementsByClassName("el-message").length == 0)
          this.$message.error("请填写密码");
        return;
      }
      if (!/^[a-zA-z]\w{5,17}$/.test(this.userSonSave.old_password)) {
       this.$message.error("请输入正确的登录密码");
      }
      if (!this.userSonSave.name) {
        if (document.getElementsByClassName("el-message").length == 0)
          this.$message.error("请填写姓名");
        return;
      }
      if (!this.userSonSave.phone) {
        if (document.getElementsByClassName("el-message").length == 0)
          this.$message.error("请填写移动电话");
        return;
      }
      if (!/^(((13[0-9])|(14[5-7])|(15[0-9])|(17[0-9])|(18[0-9]))+\d{8})$/.test(this.userSonSave.phone)) {
          this.$message.error("请输入正确的移动电话");
          return;
        }
      if (!this.job) {
        if (document.getElementsByClassName("el-message").length == 0)
          this.$message.error("请选择职业");
        return;
      }
      var job = {};
      this.options.map(item => {
        if (item.id == this.job) {
          job = item;
        }
      });
      this.userSonSave.j_id = job.id;
      this.userSonSave.job = job.name;
      this.userSonSave.u_id = localStorage.getItem("ID");
       if(this.userSonSave.is){
       this.userSonSave.status='1';   
      }
      this.$http({
        url: `${url.updateByUserSon}`,
        data: this.userSonSave,
        method: "put"
      }).then(res => {
        if (res.data.code == 20000) {
          this.findUserSons();
          this.isShow = false;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    getJobs() {
      this.$http({
        url: `${url.findUserJobs}/${localStorage.getItem("ID")}/0`,
        method: "get"
      }).then(res => {
        if (res.data.code == 20000) {
          this.options = res.data.data;
          this.findUserSons();
        }
      });
    },

    //时间格式转化
    resolvingDate(date) {
      var dateee = new Date(date).toJSON();
      return new Date(+new Date(dateee) + 8 * 3600 * 1000)
        .toISOString()
        .replace(/T/g, " ")
        .replace(/\.[\d]{3}Z/, "");
    }
  }
};
</script>

<style lang="scss">
.subAccountList {
  .el-table th {
    background-color: #f7f7f7;
    font-size: 16px;
    font-family: MicrosoftYaHei,微软雅黑;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
  }
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
.tableTitleBg {
  background-color: #fc9263 !important;
}
.subAccountList {
  background-color: #f0f0f0;
//   min-height: 940px;
  .fl {
    float: left;
  }
  .fr {
    float: right;
  }
  // 子账号头部
  .subAccountTitle {
    padding-left: 48px;
    padding-right: 24px;
    height: 68px;
    line-height: 68px;
    background-color: #fff;
    box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.04);
    margin-bottom: 5px;
    h4 {
      font-size: 20px;
      font-family: MicrosoftYaHeiLight;
      font-weight: bold;
      color: rgba(102, 102, 102, 1);
    }
    input {
      width: 80px;
      height: 32px;
      background: rgba(252, 146, 99, 1);
      border-radius: 4px;
      font-size: 14px;
      font-family: MicrosoftYaHei,微软雅黑;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      cursor: pointer;
    }
  }
  //   子账号列表部分
  .subAccountContent {
    .AccountInfoTitle {
      position: relative;
      height: 58px;
      line-height: 58px;
      padding-left: 62px;
      font-size: 16px;
      font-family: MicrosoftYaHei,微软雅黑;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      background-color: #fff;
      &::before {
        content: "";
        display: inline-block;
        width: 2px;
        height: 13px;
        background-color: #fc9263;
        position: absolute;
        top: 41%;
        transform: translateX(-50%);
        left: 55px;
      }
    }
    .listBtn {
      padding: 0 18px;
      height: 28px;
      line-height: 28px;
      font-size: 14px;
      font-family: MicrosoftYaHei,微软雅黑;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      margin-right: 18px;
      box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.18);
      border-radius: 4px;
      cursor: pointer;
    }
    .disableBtn {
      background-color: #d21d27;
    }
    .ableBtn {
      background-color: #80c269;
    }
    .resetBtn {
      background-color: #fc9263;
    }
    .editBtn {
      background-color: #12a6e9;
    }
  }

  // 编辑部分
  #editSubAcc {
    width: 100%;
    background: rgba(51, 51, 51, 0.7);
    bottom: 0;
    left: 0;
    position: fixed;
    z-index: 998;
    .editSub {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 1000;
      background-color: #fff;
      padding: 60px;
      box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.04);
      border-radius: 12px;

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
        text-align: center;
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
}
</style>