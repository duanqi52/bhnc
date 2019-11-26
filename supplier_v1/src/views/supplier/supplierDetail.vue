<!-- 组件说明 -->
<template>
  <div class="supplierDetail">
    <div class="supplierDetailTitle">采购商详情</div>
    <!-- 内容部分 -->
    <div class="supplierDetailContent">
      <ul>
        <li class="clearfix">
          <div>
            <span>公司名称：</span>
            <i>{{providerDetails.company_name}}</i>
          </div>
          <div>
            <span>地区：</span>
            <i>{{providerDetails.region}}</i>
          </div>
          <div>
            <span>合作情况：</span>
            <i v-if="!providerDetails.partner">未合作</i>
            <i v-else>已合作</i>
          </div>
          <!-- 样式占位符不要删除 -->
          <div></div>
        </li>
        <li class="clearfix">
          <div>
            <span>法人：</span>
            <i v-if="providerDetails.is_public!='0'">{{providerDetails.legal_man}}</i>
            <i
              style="font-size:12px; font-family:MicrosoftYaHei;font-weight:400;"
              v-if="providerDetails.is_public=='0'"
            >(不公开)</i>
          </div>
          <div style="display:flex">
            <span>法人移动电话：</span>
            <div>
              <i v-if="providerDetails.is_public!='0'">{{providerDetails.legal_phone}}</i>
              <i
                style="font-size:12px; font-family:MicrosoftYaHei;font-weight:400;"
                v-if="providerDetails.is_public=='0'"
              >(不公开)</i>
            </div>
          </div>
          <div>
            <span>业务联系人：</span>
            <i>{{providerDetails.linkman}}</i>
          </div>
          <div>
            <span>业务移动电话：</span>
            <i>{{providerDetails.phone_more}}</i>
          </div>
        </li>
        <li class="clearfix">
          <div class="clearfix">
            <span>固定电话：</span>
            <i>{{providerDetails.fix_phone}}</i>
          </div>
          <div>
            <span>QQ号码：</span>
            <i>{{providerDetails.qq}}</i>
          </div>
          <div>
            <span>微信号：</span>
            <i>{{providerDetails.wx}}</i>
          </div>
          <div>
            <span>联系地址：</span>
            <i>{{providerDetails.address}}</i>
          </div>
        </li>
        <li class="clearfix">
          <div class="clearfix">
            <span>公司简介：</span>
            <i>{{providerDetails.company_introduction}}</i>
          </div>
          <div>
            <i
              class="iconfont icon-xihuan likeMark"
              v-if="!providerDetails.collection"
              style="flex:unset"
              @click="star(id,'1')"
            ></i>
            <i
              class="iconfont icon-xihuanfill likeMark"
              v-else
              style="flex:unset;"
              @click="star(id,'0')"
            ></i>
            <input
              type="button"
              value="标记为未合作"
              style="margin:0 24px;"
              v-if="providerDetails.partner"
              @click="updatePratner(id,'0')"
            />
            <input
              type="button"
              value="标记为已合作"
              style="margin:0 24px;"
              v-else
              @click="updatePratner(id,'1')"
            />
            <input
              type="button"
              value="查看采购详情"
              @click="lookProvider(id)"
              v-if="!providerDetails.look"
            />
            <input
              type="button"
              value="已查看采购详情"
              style="border: 1px solid #909399;background: #909399;"
              v-else
              disabled
            />
          </div>
        </li>
      </ul>
      <div class="manageType">
        <div class="forBox clearfix">
          <div class="manageTypeTitle fl">采购商分类：</div>
          <div class="manageTypeContnet fl">
            <ul v-if="providerDetails.dealer_type">
              <li v-for="(item,index) in providerDetails.dealer_type" :key="index">
                <p>{{item}}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!-- 供应商品列表 -->
  </div>
</template>

<script>
import url from "@/serverAPI.config.js";
//import x from ''
export default {
  components: {},
  data() {
    return {
      providerDetails: {},
      id: "",
      providerGoodsList: [],
      setLevel: []
    };
  },
  computed: {},
  created() {

    this.id = this.$route.query.id;
    this.getSetLevel();
    this.getDetails();

    //this.findProviderGoods();
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
    getDetails() {
      this.$http({
       // url:"http://172.16.0.138:9007/user/findDealerDetails/1161950998797881344/1175589274305826816",
        url: `${url.findUserDetails}/${this.id}/${localStorage.getItem("ID")}`,
        method: "get"
      }).then(res => {
        if (res.data.code == 20000) {
          this.providerDetails = res.data.data;
          if (this.providerDetails.phone_more)
            this.providerDetails.phone_more = JSON.parse(
              this.providerDetails.phone_more
            ).join("、");

          if (this.providerDetails.fix_phone)
            this.providerDetails.fix_phone = JSON.parse(
              this.providerDetails.fix_phone
            ).join("、");

          if (this.providerDetails.qq)
            this.providerDetails.qq = JSON.parse(this.providerDetails.qq).join(
              "、"
            );

          // if (this.providerDetails.wx)//201929 WTL 微信不是数组
          //   this.providerDetails.wx = JSON.parse(this.providerDetails.wx).join(
          //     "、"
          //   );

          if (this.providerDetails.pattern)
            this.providerDetails.pattern = JSON.parse(
              this.providerDetails.pattern
            ).join("、");

          if (this.providerDetails.dealer_type)
            this.providerDetails.dealer_type = JSON.parse(
              this.providerDetails.dealer_type
            );
        }
      });
    },

    //点击查看
    lookProvider(pid) {
      //级别不足查看
      if (this.providerDetails.level == "1") {
        this.$confirm("您的级别没有权限查看采购商信息，请充值积分达到2级会员！","提示",{
            confirmButtonText: "去充值",
            cancelButtonText: "取消",
            type: "warning",
            center: true
          }).then(() => {
            this.$router.push("/recharge");
          }).catch(() => {});
      } else if(this.providerDetails.level=='88'){
        var level="";
        for (var i = 0; i < this.setLevel.length; i++) {
            if(this.providerDetails.integral>=this.setLevel[i].start_integral){
                level=this.setLevel[i].level;
            }
         }
         if(level=="1"){
            this.$confirm(
                "您的级别没有权限查看采购商信息，请充值积分达到2级会员！","提示",{
                  confirmButtonText: "去充值",
                  cancelButtonText: "取消",
                  type: "warning",
                  center: true
                }).then(() => {
                  this.$router.push("/recharge");
                 }).catch(() => {});
          }else{
                this.$confirm(
                  `本次查看采购商信息将消耗${this.providerDetails.look_dealer}积分，是否继续查看？`,"提示",{
                    confirmButtonText: "确认",
                    cancelButtonText: "取消",
                    type: "warning",
                    center: true
                  }).then(() => {
                  this.$http({
                    method: "get",
                    //url:'http://localhost:9007/user/addSupplierLookDealer/'+localStorage.getItem("ID")+"/"+pid,
                    url: `${url.addSupplierLookDealer}/${localStorage.getItem("ID")}/${pid}`
                  }).then(res => {
                    this.getDetails();
                  });
                });
          }
        }else {
        //级别满足查看
        this.$confirm(
          `本次查看采购商信息将消耗${this.providerDetails.look_dealer}积分，是否继续查看？`,"提示",{
            confirmButtonText: "确认",
            cancelButtonText: "取消",
            type: "warning",
            center: true
          }).then(() => {
          this.$http({
            method: "get",
            //url:'http://localhost:9007/user/addSupplierLookDealer/'+localStorage.getItem("ID")+"/"+pid,
            url: `${url.addSupplierLookDealer}/${localStorage.getItem("ID")}/${pid}`
          }).then(res => {
            this.getDetails();
          });
        });
      }
    },

    star(pid, collect) {
      if (collect == 1) {
        this.$http({
          method: "get",
          url: `${url.addCollect}/${localStorage.getItem("ID")}/${pid}/1`
        }).then(res => {
          this.getDetails();
        });
      } else {
        this.$http({
          method: "delete",
          url: `${url.deleteCollect}/${localStorage.getItem("ID")}/${pid}/1`
        }).then(res => {
          this.getDetails();
        });
      }
    },
    updatePratner(pid, type) {
      if (type == 1) {
        this.$http({
          method: "get",
          url: `${url.addPartner}/${localStorage.getItem("ID")}/${pid}/1`
        }).then(res => {
          this.getDetails();
        });
      } else {
        this.$http({
          method: "delete",
          url: `${url.deletePartner}/${localStorage.getItem("ID")}/${pid}/1`
        }).then(res => {
          this.getDetails();
        });
      }
    },

    findProviderGoods() {
      this.$http({
        url: `${url.findProviderGoods}/${this.id}`,
        method: "get"
      }).then(res => {
        if (res.data.code == 20000) {
          var data = res.data.data;
          data.map(item => {
            item.img = JSON.parse(item.img);
          });
          this.providerGoodsList = data;
        }
      });
    },

    toDetail(goods) {
      window.open(`${url.detailUrl}/details?id=` + goods.id);
    },

    up(id) {
      this.$http({
        url: `${url.amendUser}/${id}`,
        data: this.user,
        method: "put"
      }).then(res => {
        console.log(res);
      });
    }
  }
};
</script>

<style lang='scss' scoped>
@media screen and (max-width: 1620px) {
  .supplierDetail .shopList .shopListContent ul li > div img {
    height: 150px !important;
  }
}

.supplierDetail {
  .fl {
    float: left;
  }
  .fr {
    float: right;
  }
  .supplierDetailTitle {
    height: 68px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.04);
    font-size: 20px;
    font-family: MicrosoftYaHeiLight;
    font-weight: bold;
    color: rgba(102, 102, 102, 1);
    padding-left: 52px;
    border-bottom: 5px solid #f0f0f0;
    line-height: 68px;
  }
  //   详情部分
  .supplierDetailContent {
    > ul {
      padding-left: 38px;
      border-bottom: 8px solid #f0f0f0;
      li {
        border-bottom: 1px solid #f0f0f0;
        width: 95%;
        display: flex;
        flex-wrap: wrap;
        > div {
          display: flex;
          padding: 24px 0;
          width: 25%;
          padding-right: 20px;
          font-size: 16px;
          font-family: MicrosoftYaHei,微软雅黑;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          span {
            width: 112px;
          }
          > i {
            flex: 3;
          }
        }
        .likeMark {
          color: #e6424f;
          font-size: 20px;
          cursor: pointer;
        }
        input[type="button"] {
          width: 108px;
          height: 28px;
          background: rgba(252, 146, 99, 1);
          border: 1px solid rgba(252, 146, 99, 1);
          border-radius: 8px;
          line-height: 28px;
          font-size: 12px;
          font-family: MicrosoftYaHei,微软雅黑;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          cursor: pointer;
        }
      }
      li:nth-child(4) {
        > div:nth-child(1) {
          width: 75%;
        }
      }
    }
    // 供应商经营分类
    .manageType {
      // width: 80%;;
      padding-top: 32px;
      padding-left: 56px;
      font-size: 16px;
      font-family: MicrosoftYaHei,微软雅黑;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      border-bottom: 8px solid #f0f0f0;
      padding-bottom: 30px;
      .manageTypeContnet {
        ul {
          li {
            p {
              padding-bottom: 12px;
            }
          }
        }
      }
    }
  }
  // 供应商商品列表
  .shopList {
    .shopListTitle {
      padding: 30px 100px;
      h3 {
        position: relative;
        font-size: 18px;
        font-family: MicrosoftYaHeiLight;
        font-weight: bold;
        color: rgba(102, 102, 102, 1);
        &::before {
          content: "";
          position: absolute;
          top: 5px;
          left: -17px;
          display: inline-block;
          width: 2px;
          height: 16px;
          background: #fc9263;
        }
      }
      i {
        font-size: 14px;
        font-family: MicrosoftYaHei,微软雅黑;
        font-weight: 400;
        color: rgba(252, 146, 99, 1);
        cursor: pointer;
      }
    }
    .shopListContent {
      padding: 0 60px;
      ul {
        li {
          width: 20%;
          float: left;
          margin-bottom: 28px;
          > div {
            width: 70%;
            margin: auto;
            border: #ebebeb 1px solid;
            cursor: pointer;
            img {
              display: block;
              margin: 8px auto;
              width: 80%;
              height: 204px;
            }
          }
          h4 {
            padding: 12px 8px;
            text-align: center;
            font-size: 16px;
            font-family: MicrosoftYaHei,微软雅黑;
            font-weight: 400;
            color: rgba(102, 102, 102, 1);
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
          }
        }
      }
    }
  }
}
</style>
