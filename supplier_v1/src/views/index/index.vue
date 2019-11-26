<!-- 组件说明 -->
<template>
  <div id="bhncIndex">
    <div class="hader clearfix">
      <div class="grade fl gradeLeval">
        <div class="gradeNumBox">
          <!-- <span>V</span> -->
          <i>{{currentLevel}}</i>
        </div>
        <div
          style="font-size:18px;color:rgba(102,102,102,1);margin-top: 265px;text-align: right;padding-right: 30px;"
          v-if="isHasExpireTime"
        >
          <span>试用期将于<span style="font-size:24px;color:#D23A43;padding:0">&nbsp;{{outTime}}天&nbsp;</span>后到期</span><br/>
          <span style="font-size:14px;color:rgba(153,153,153,1);">请联系客服尽快审核</span>
        </div>
      </div>
      <div class="grade fr gradeCurrent">
        <div class="gradeNumBox">
          <i style="font-size:48px;">{{currentIntegral}}</i>
        </div>
      </div>
    </div>
    <div class="max_supplier clearfix">
      <div class="clearfix" style="width:100%;padding-bottom:10px;">
        <div class="supplier fl">
          <el-card class="box-card" shadow="hover">
            <div slot="header" class="clearfix" style="text-align: center;">
              <span>系统消息</span>
            </div>
            <div class="marquee">
              <div class="marquee_box">
                <ul class="marquee_list" :class="{marquee_top:animate}" >
                  <li
                    v-for="(item,index) in marqueeList"
                    :key="index"
                    class="list_xin"
                    @click="goADetails(item.id)"
                  >{{item.title}}</li>
                </ul>
              </div>
            </div>
          </el-card>
        </div>
        <div class="supplier fr">
          <el-card class="box-card" shadow="hover">
            <div slot="header" class="clearfix" style="text-align: center;">
              <span>求购信息</span>
            </div>
            <div class="marquee">
              <div class="marquee_box">
                <ul class="marquee_list" :class="{marquee_top:animatePurchase}">
                  <li
                    v-for="(item,index) in purchaseList"
                    :key="index"
                    class="list_xin"
                    @click="goPDetails(item.id)"
                  >{{item.title}}</li>
                </ul>
              </div>
            </div>
          </el-card>
        </div>
      </div>
      <div class="clearfix" style="width:100%">
        <div class="supplier fl">
          <el-card class="box-card" shadow="hover">
            <div slot="header" class="clearfix" style="text-align: center;">
              <span>商品审核</span>
            </div>
            <div class="marquee">
              <div class="marquee_box">
                <ul class="marquee_list" :class="{marquee_top:animateGoods}">
                  <li v-for="(item,index) in goodsList" :key="index" class="list_xin"
                   @click="goToGoodsDetails(item.id,item)"
                  >
                    您的 (<i style="color:red">{{item.title}}</i>)商品
                    <span v-if="item.status == '0'">待审核</span>
                    <span v-if="item.status == '1'">审核通过</span>
                    <span v-if="item.status == '2'">已下架</span>
                  </li>
                </ul>
              </div>
            </div>
          </el-card>
        </div>
        <div class="supplier fr">
          <el-card class="box-card" shadow="hover">
            <div slot="header" class="clearfix" style="text-align: center;">
              <span>我发布的供应信息</span>
            </div>
            <div class="marquee">
              <div class="marquee_box">
                <ul class="marquee_list" :class="{marquee_top:animateSupply}">
                  <li
                    v-for="(item,index) in supplyInfoList"
                    :key="index"
                    class="list_xin"
                    @click="goToSupplyDetails(item.id)"
                  >{{item.title}}</li>
                </ul>
              </div>
            </div>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import url from "@/serverAPI.config.js";
import { clearInterval } from 'timers';
export default {
  data() {
    return {
      animate: false,
      animateOrder: false,
      animatePurchase: false,
      animateGoods: false,
      animateSupply: false,
      marqueeList: [],
      orderList: [],
      purchaseList: [],
      goodsList: [],
      currentIntegral: "", //积分
      currentLevel: "", //等级
      lookProvider: "", //查看供应商消耗积分
      searchMap: {},
      supplyInfoList: [],
      isExpireTime:false,
      outTime:"1",
      isHasExpireTime:false,
      timer:'' ,
      userLookMessageRecord:{
        u_id:localStorage.getItem("ID"),
        look_data_id:""
      },
       userLookGoodsAdvices:{
        u_id:localStorage.getItem("ID"),
        look_gid:"",
      setLevel: []
      }
    };
  },
  created() {
    // 页面显示
    this.id = localStorage.getItem("ID");
    setInterval(this.showMarquee, 2000);
    this.searchSupplyInfo();
    this.searchMap.u_id = localStorage.getItem("ID");
    this.getSetLevel();

  },
  mounted() {

    this.getExpireTime();
    this.getNews();
    this.getPurchase();
    this.getUserInFo();
    this.getGoods();
    var bodyHeight=window.screen.height;
    document.getElementById('bhncIndex').style.minHeight=bodyHeight+'px';


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
    getExpireTime() {
      this.$http({
        url: `${url.getExpireTime}/${localStorage.getItem("ID")}`,
        method: "get"
      }).then(res => {
        if (res.data.code == 20000) {
          //会员到期时间
          var expireTime = res.data.data;
          if (!expireTime) {
            this.isHasExpireTime = false;
          } else {
            this.isHasExpireTime = true;
            var timeC = new Date(expireTime) - new Date();
            this.outTime = Math.ceil(timeC / (1000 * 60 * 60 * 24));
          }
          // for (var i = 0; i < this.marqueeList.length; i++) {
          //   this.marqueeList[i].send_date = this.resolvingDate(
          //     this.marqueeList[i].send_date
          //   );
          // }
        }
      });
    },
    goADetails(id) {
       this.$http({
        //url:'http://172.16.0.138:9001/advices/deleteByIdSupplierHomeSysMessage/'+id+"/"+this.id,
        url: `${url.deleteByIdSupplierHomeSysMessage}/${id}/${this.id}`,
        method: "get"
      }).then(res => {
        if (res.data.code == 20000) {
        }
      });
       this.$router.push({ path: "/News_details", query: { id: id } });
    },
    goODetails(id) {
      this.$router.push({ path: "/details", query: { id: id } });
    },
    goToGoodsDetails(id,item){
      this.userLookGoodsAdvices.look_gid=id;
      if (item.status=='0'||item.status=='2') {
          this.$router.push('/commodity');
      } else if (item.status=='1') {
          if (item.goodsAuditRecord!=null) {
              var a_id=JSON.parse(item.goodsAuditRecord);
              a_id=a_id.a_id;
          }
            this.$router.push({ path: "/News_details", query: { id: a_id } });
      }
        this.$http({
        //url:'http://172.16.0.138:9001/advices/addSupplierLookGoodsAdvices',
        url: `${url.addSupplierLookGoodsAdvices}`,
        data: this.userLookGoodsAdvices,
        method: "post"
      }).then(res => {
        if (res.data.code == 20000) {
        }
      });
    },
    goPDetails(id) {
      this.userLookMessageRecord.look_data_id=id;
        this.$http({
        //url:'http://172.16.0.138:9001/advices/addUserLookMessageRecord',
        url: `${url.addUserLookMessageRecord}`,
        data: this.userLookMessageRecord,
        method: "post"
      }).then(res => {

      });

      this.$router.push({ path: "/pur_details", query: { id: id } });
    },
    goToSupplyDetails(id) {
      this.$router.push({ path: "/provisionInfoDetails", query: { id: id } });
    },
    showMarquee: function() {
      this.animate = this.marqueeList.length > 9 ? true : false;
      this.animateGoods = this.goodsList.length > 9 ? true : false;
      this.animatePurchase = this.purchaseList.length > 9? true : false;
      this.animateSupply = this.supplyInfoList.length > 9 ? true : false;
      setTimeout(() => {
        if (this.marqueeList.length > 9) {
          this.marqueeList.push(this.marqueeList[0]);
          this.marqueeList.shift();
          this.animate = false;
        }
        if (this.purchaseList.length > 9) {
          this.purchaseList.push(this.purchaseList[0]);
          this.purchaseList.shift();
          this.animatePurchase = false;
        }
        if (this.goodsList.length > 9) {
          this.goodsList.push(this.goodsList[0]);
          this.goodsList.shift();
          this.animateGoods = false;
        }
        if (this.supplyInfoList.length > 9) {
          this.supplyInfoList.push(this.supplyInfoList[0]);
          this.supplyInfoList.shift();
          this.animateSupply = false;
        }
      }, 500);
    },
    getNews() {
      this.$http({
        //url:'http://172.16.0.138:9001/advices/findSupplierHomeSysMessage/'+this.id,
        url: `${url.findSupplierHomeSysMessage}/${this.id}`,
        method: "get"
      }).then(res => {
        if (res.data.code == 20000) {
          this.marqueeList = res.data.data.rows;
        }
      });
    },
    getPurchase() {
      this.$http({
        //url:'http://localhost:9001/advices/findSupplierHomePurchaseMessage/'+this.id,
        url: `${url.findSupplierHomePurchaseMessage}/${this.id}`,
        method: "get"
      }).then(res => {
        if (res.data.code == 20000) {
          this.purchaseList = res.data.data;
        }
      });
    },
    getUserInFo() {
      this.$http({
          //url:'http://172.16.0.124:9007/user/getUserInfo',
        url: `${url.amendUser}/getUserInfo`,
        method: "get"
      }).then(res => {
        if (res.data.code == 20000) {
          this.currentIntegral = res.data.data.current_integral;
          this.currentLevel = res.data.data.current_level;
       if (this.currentLevel=='89'|| this.currentLevel=='100') {
           this.currentLevel='至尊VIP会员';
       }else if (this.currentLevel=='2') {
           this.currentLevel='黄金会员';

       }else if (this.currentLevel=='1') {
           this.currentLevel='白银会员';
       }else if(this.currentLevel=='88'){
         for (var i = 0; i < this.setLevel.length; i++) {
            if(this.currentIntegral>=this.setLevel[i].start_integral){
                this.currentLevel=this.setLevel[i].name;
            }
         }
       }
         this.lookProvider = res.data.data.look_provider;
        }
      });
    },
    getGoods() {
      this.$http({
    //    url:'http://172.16.0.138:9001/advices/findSupplierHomeGoodsMessage/'+this.id,
        url: `${url.findSupplierHomeGoodsMessage}/${this.id}`,
        method: "get"
      }).then(res => {
        if (res.data.code == 20000) {
          this.goodsList = res.data.data;
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
    },
    // 获取供应信息
    searchSupplyInfo() {
      this.$http({
        // url:'http://172.16.0.138:9001/advices/findSupplierHomeByIdSupplyInfoMessage/'+this.id,
        url:`${url.findSupplierHomeByIdSupplyInfoMessage}/${this.id}`,
        method: "get"
      }).then(res => {
        if (res.data.code == 20000) {
        this.supplyInfoList=res.data.data
        }
      });
    },

  },
  updated () {

  }
};
</script>

<style lang="scss" scoped>
#bhncIndex {
  background: #f0f0f0;
  .fr {
    float: right;
  }
  .fl {
    float: left;
  }

  .hader {
    .gradeLeval {
      position: relative;
      background-image: url("../../../static/img/indexbgone.png");
      background-size: cover;
      background-repeat: no-repeat;
    }
    .gradeCurrent {
      position: relative;
      background-image: url("../../../static/img/indexbgtwo.png");
      background-size: cover;
      background-repeat: no-repeat;
    }
    .grade {
      width: 49.5%;
      height: 318px;
      .gradeNumBox {
        text-align: center;
        font-size: 0;
        color: rgba(252, 146, 99, 1);
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        i {
          font-size: 52px;
          font-family: Adobe Heiti Std R;
          font-weight: normal;
        }
        span {
          font-size: 65px;
          font-weight: 1000;
          padding-right: 5px;
        }
      }
    }
    .integral {
      display: inline-block;
      h3 {
        width: 160px;
        height: 27px;
        line-height: 27px;
        font-size: 28px;
        font-family: MicrosoftYaHei,微软雅黑;
        font-weight: 400;
        color: rgba(61, 145, 231, 1);
      }
    }
  }
  .list_xin {
    text-overflow: ellipsis; //文字溢出隐藏多余的 ... 代替
    overflow: hidden; //文字溢出隐藏
    white-space: nowrap; //关于文字内容溢出
    width: 95%;
    display: inline-block;
    cursor: pointer;
  }
  .max_supplier {
    display: flex;
    flex-wrap: wrap;
    margin-top: 13px;
    width: 100%;
    justify-content: space-between;

    text-align: left;
  }
  .supplier {
    width: 49.5%;
  }
  .caigou {
    width: 49.5%;
  }
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both;
  }

  .box-card {
    width: 100%;
    display: inline-block;
    // height: 500px;
  }
  .marquee {
    width: 100%;
    align-items: center;
    color: #3a3a3a;
    background-color: white;
    display: flex;
    box-sizing: border-box;
    overflow: hidden;
  }

  .marquee_title {
    padding: 0 20px;
    height: 21px;
    font-size: 14px;
    border-right: 1px solid #d8d8d8;
    align-items: center;
  }

  .marquee_box {
    display: block;
    //   background-color: rgb(238, 241, 246);

    position: relative;
    width: 100%;
    height: 300px;
    overflow: hidden;
  }

  .marquee_list {
    display: inline-block;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }

  .marquee_top {
    transition: all 0.5s;
    margin-top: -30px;
  }

  .marquee_list li {
    height: 30px;
    // line-height: 30px;
    padding-left: 24px;
    font-size: 16px;
    font-family: Adobe Heiti Std R,微软雅黑;
    font-weight: normal;
    color: rgba(102, 102, 102, 1);
  }

  .marquee_list li span {
    padding: 0 2px;
  }
}

  .marquee_top {
    transition: all 0.5s;
    margin-top: -30px;
  }

</style>

<style lang="scss">
#bhncIndex {
  .el-card__body {
    padding: 0;
  }
  .supplier,
  .caigou {
    .box-card {
      .el-card__header {
        background: #fff;
        box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.04);
        border: none;
        font-size: 20px;
        font-family: MicrosoftYaHei,微软雅黑;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        text-align: left;
        text-indent: 40px;
        border-bottom: 2px solid #f0f0f0;
      }
    }
  }
}
</style>

