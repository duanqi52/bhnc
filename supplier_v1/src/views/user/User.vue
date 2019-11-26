<!-- 组件说明 -->
<template>
  <div id="bhncUser">
    <div class="user">
      <amend-password v-bind:open="open" v-on:close="getBooeal"></amend-password>
      <div class="user-title">
        <div class="user-name">
          <p class="name">{{userMsg.company_name}}</p>
          <span>
            <!-- v-if="dealer" -->
            <p class="dealer" v-if="dealer">经销商认证</p>
            <!-- v-if="provider" -->
            <p class="supplier" v-if="provider">供应商认证</p>
          </span>
        </div>
        <div class="action">
          <el-button @click="opens" class="rewrite">修改登录密码</el-button>
          <el-button @click="amendUser()" class="rewrite" v-if="userMsg.again_check != '1'">编辑企业信息</el-button>
          <el-button v-else type="danger" disabled>新资料正在审核中</el-button>
        </div>
      </div>
      <div class="user-msg">
        <p class="baseInfo">
          <span></span> 基本信息
        </p>
        <ul>
          <li class="user-integral">
            <p>
              <span>积分：</span>
              {{userMsg.integral}}
            </p>
            <p>
              <span>会员等级：</span>
              {{level}}
            </p>
            <p>
              <span>公司名称：</span>
              {{userMsg.company_name}}
            </p>
            <p>
              <span>地区：</span>
              {{userMsg.region}}
            </p>
          </li>
          <li class="user-people">
            <p>
                法人/负责人：
              <span ><span>{{userMsg.legal_man}}</span></span>
              <span v-if="userMsg.is_public == '0'" style="font-size: 14px;">（不公开）</span>
            </p>
            <p>
                法人手机号码:
              <span >{{userMsg.legal_phone}}</span>
              <span v-if="userMsg.is_public == '0'" style="font-size: 14px;">（不公开）</span>
            </p>
            <p>
              <span>业务联系人：</span>
              {{userMsg.linkman}}
            </p>
            <p>
              <span>业务移动电话：</span>
               <span v-for="(item,index) in userMsg.phone_more" :key="index">
                {{item}}
                <span v-if="index != userMsg.phone_more.length-1">、</span>
              </span>
            </p>
          </li>
          <li class="user-people">
            <p>
              <span>固定电话：</span>
              <span v-for="(item,index) in userMsg.fixPhone" :key="index">
                {{item}}
                <span v-if="index != userMsg.fixPhone.length-1">、</span>
              </span>
            </p>
            <p>
              <span>QQ：</span>
              <span v-for="(item,index) in userMsg.qq" :key="index">
                {{item}}
                <span v-if="index != userMsg.qq.length-1">、</span>
              </span>
            </p>
            <p>
              <span>微信：</span>
              <span>
                {{userMsg.wx}}
              </span>
            </p>
            <p>
              <span>联系地址：</span>
              {{userMsg.address}}
            </p>
          </li>
          <!-- <li>
            <div style="flex:1;display:flex;align-items: center;">
              <span>经营方式：</span>
              <div>
                <span v-for="(item,index) in this.userMsg.pattern" :key="index">
                  <i>
                    {{item}}
                    <span v-if="index != userMsg.pattern.length-1">、</span>
                  </i>
                </span>
              </div>
            </div>
          </li> -->

          <!-- 水平分割线 -->
          <hr color="#F0F0F0" style="height:4px;" />
          <li>
            <div style="flex:1;">
              <p class="baseInfo" style="padding-left:62px;">
                <span></span>供应商分类：
              </p>
              <div style="padding-left:88px;">
                <ul v-if="userMsg.provider_type">
                  <div v-for="(item,index) in userMsg.provider_type" :key="index">
                    <li v-if="item.name != ''">
                      <p>{{item.name}}：</p>
                      <p>{{item.data.join("、")}}</p>
                    </li>
                  </div>
                </ul>
              </div>
            </div>
          </li>

          <hr color="#F0F0F0" style="height:4px;" />
           <li>
            <div style="flex:1;">
              <p class="baseInfo" style="padding-left:62px;">
                <span></span>公司简介：
              </p>
              <div style="padding-left:88px;">
                <i>
                  {{userMsg.company_introduction}}
                </i>
              </div>
            </div>
          </li>

          <!-- 水平分割线 -->
          <hr color="#F0F0F0" />
          <p class="baseInfo">
            <span></span> 证件
          </p>
          <li>
            <p style="display: flex;align-items: flex-start;padding-top:28px;padding-left:88px;">
              <span style="line-height:1;">营业执照：</span>
              <span>
                <img
                  :src="userMsg.business_img"
                  title="营业执照"
                  style="width:100px;height: 120px;border:1px solid #c2c2c2"
                />
              </span>
            </p>
          </li>
          <li>
            <p style="display: flex;align-items: flex-start;padding-top:28px;padding-left:88px;">
              <span style="line-height:1;">商标证件：</span>
              <span v-for="(img,index) in userMsg.brand_img" :key="index">
                <img
                  :src="img"
                  title="其他证件"
                  style="width:100px;height: 120px; border:1px solid #c2c2c2;margin-right:16px;"
                />
              </span>
            </p>
          </li>
          <li>
            <p style="display: flex;align-items: flex-start;padding-top:28px;padding-left:88px;">
              <span style="line-height:1;">专利证件：</span>
              <span v-for="(img,index) in userMsg.patent_img" :key="index">
                <img
                  :src="img"
                  title="其他证件"
                  style="width:100px;height: 120px; border:1px solid #c2c2c2;margin-right:16px;"
                />
              </span>
            </p>
          </li>
          <li>
            <p style="display: flex;align-items: flex-start;padding-top:28px;padding-left:88px;">
              <span style="line-height:1;">其他证件：</span>
              <span v-for="(other,index) in userMsg.other" :key="index">
                <img
                  :src="other"
                  title="其他证件"
                  style="width:100px;height: 120px; border:1px solid #c2c2c2;margin-right:16px;"
                />
              </span>
            </p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
//import x from ''
import url from "@/serverAPI.config.js";
import amendPassword from "@/views/user/amendPassword";
export default {
  components: {
    amendPassword
  },
  data() {
    return {
      userMsg: {},
      roles: [],
      provider: false,
      dealer: false,
      open: false,
      setLevel: [],
      level:""
      //UserID:''  ID
    };
  },
  computed: {},
  methods: {
    getUserMsg() {
      this.$http
        .get(url.getUserMsg)
        .then(res => {
          this.userMsg = res.data.data;
          this.roles = res.data.data.roles;
          this.userMsg.other = JSON.parse(this.userMsg.other_img);
          this.userMsg.brand_img = JSON.parse(this.userMsg.brand_img);
          this.userMsg.patent_img = JSON.parse(this.userMsg.patent_img);
          this.userMsg.scope = JSON.parse(this.userMsg.scope);
          this.userMsg.fixPhone = JSON.parse(this.userMsg.fix_phone);
          this.userMsg.phone_more = JSON.parse(this.userMsg.phone_more);
          this.userMsg.pattern = JSON.parse(this.userMsg.pattern);
          this.userMsg.qq = JSON.parse(this.userMsg.qq);
          if (this.userMsg.provider_type)
            this.userMsg.provider_type = JSON.parse(
              this.userMsg.provider_type
            );
          //this.UserID = res.data.data.id  用户ID
          this.userMsg.roles.map(item => {
            if (item.id == 1) {
              this.dealer = true;
            } else if (item.id == 2) {
              this.provider = true;
            }
          });
          if(this.userMsg.level=="89"|| this.userMsg.level=="100"){
              this.level="至尊VIP会员"
          }
          if(this.userMsg.level=="1"){
            this.level="白银会员"
          }
           if(this.userMsg.level=="2"){
            this.level="黄金会员"
          }
          if(this.userMsg.level=="88"){
            for (var i = 0; i < this.setLevel.length; i++) {
              if(this.userMsg.integral>=this.setLevel[i].start_integral){
                  this.level=this.setLevel[i].name;
              }
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    amendUser() {
      this.$router.push({ path: "/amendUser", query: { UserID: this.UserID } });
    },
    opens() {
      this.open = true;
    },

    getBooeal(e) {
      this.open = e; // 这里的event是子组件传过来的值，把值赋值给了this.open
    },
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
    }
  },

  created() {
     this.getSetLevel();
    this.getUserMsg();

  }
};
</script>


<style lang='scss' scoped>
#bhncUser {
  //@import url()
  .user {
    min-height: 940px;
    background-image: url("../../../static/img/penbg.png");
    background-repeat: no-repeat;
    background-position: bottom right;
    background-attachment: fixed;
    .user-title {
      display: flex;
      justify-content: space-between;
      padding: 20px 0 15px 8px;
      // border-bottom: 1px solid #000000;
      box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.04);
      .user-name {
        width:auto;
        line-height: 40px;
        p {
          display: inline;
          font-size: 12px;
          color: #fff;
          padding: 5px 8px;
          border-radius: 10px;
        }
        .name {
          font-size: 24px;
          font-family: MicrosoftYaHei,微软雅黑;
          font-weight: 400;
          color: #fc9263;
        }
        .dealer {
          // background: #a9c57e;
          width: 82px;
          height: 22px;
          background: #fff3ee;
          border: 1px solid #fc9263;
          // opacity: 0.4;
          border-radius: 4px;
          font-size: 12px;
          font-family: MicrosoftYaHei,微软雅黑;
          font-weight: 400;
          color: #fc9263;
        }
        .supplier {
          width: 82px;
          height: 22px;
          background: #fff3ee;
          border: 1px solid #fc9263;
          border-radius: 4px;
          font-size: 12px;
          font-family: MicrosoftYaHei,微软雅黑;
          font-weight: 400;
          color: #fc9263;
        }
      }
    }
    .user-msg {
      // width: 1140px;
      line-height: 60px;
      ul {
        li:nth-child(-n + 4) {
          width: 80%;
          margin-left: 71px;
          border-bottom: 1px solid #f0f0f0;
        }
        li:nth-child(4) {
          border-bottom: none;
        }
        li {
          p:nth-child(1) {
            padding-left: 17px;
          }
        }
      }
      span {
        font-weight: normal;
        i {
          display: inline-block;
          padding: 5px 8px;
        }
      }
      .user-integral {
        display: flex;
        justify-content: space-between;
        p {
          width: 25%;
          padding: 0px 10px;
        }
      }
      .user-people {
        display: flex;
        p {
          width: 25%;
          padding: 0px 10px;
          img {
            width: 800px;
          }
        }
      }
    }
    li {
      font-size: 16px;
      font-family: MicrosoftYaHei,微软雅黑;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
    }
  }
  .active {
    padding-right: 38px;
  }
  // 2019.7.19样式更改
  .baseInfo {
    height: 32px;
    line-height: 32px;
    font-size: 16px;
    font-family: MicrosoftYaHei,微软雅黑;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    padding-left: 62px;

    span {
      display: inline-block;
      width: 2px;
      height: 13px;
      background: #fc9263;
      margin-right: 5px;
    }
  }

  .linkLi {
    display: flex;
    p:nth-child(1) {
      width: 33.3%;
    }
    p:nth-child(2) {
      flex: 1;
    }
  }
}
</style>

<style lang="scss">
#bhncUser {
  .action {
    padding-right: 13px;
    .rewrite {
      background: #fc9263;
      border-radius: 4px;
      font-size: 12px;
      font-family: MicrosoftYaHei,微软雅黑;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
    }
  }
}
</style>
