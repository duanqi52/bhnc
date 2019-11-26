<template>
  <div id="bhncPur_details">
    <div class="order-list">
      <p class="order_title">{{purchaseDetails.title}}</p>
      <div class="tender">
        <div class="title_heade">报价信息</div>
        <!-- 已报价 -->
        <div v-if="exist">
          <div
            class="tender_des"
            v-for="(quotation,index) in purchaseDetails.quotation_list"
            :key="index"
            v-if="u_id == quotation.u_id"
          >
            <div v-if="u_id == quotation.u_id">
              <div class="tender_des_a">
                <span>单价：{{quotation.price}}元</span>
                <span style="margin-left: 80px;">总价：{{quotation.total_price}}元</span>
              </div>
              <p>{{quotation.explain}}</p>
              <div class="tender_des_b">
                <span>{{quotation.date}}</span>
                <button  @click="anewQuote(quotation.id)">重新报价</button>
              </div>
            </div>
          </div>
        </div>
        <!-- 未报价 -->
        <div class="tender_des_all" v-else>
          <img src="../../../static/img/NoQuotation.png" alt />
          <p>您还没有报价，赶快来报价获取订单吧！</p>
          <button @click="againQuote(1)">立即报价</button>
        </div>
      </div>
      <!-- 求购需求列表 -->
      <div class="orderDetails">
    
        <div class="title_heade">求购需求</div>
        <el-table
          :data="tableData"
          :header-cell-style="{background:'#eef1f6',color:'#606266',fontWeight:'bold'}"
          align="center"
          style="width: 100%;border:1px solid rgba(240,240,240,1);"
        >
          <!-- <el-table-column prop="type" label="商品分类" align="center"></el-table-column> -->
          <el-table-column prop="offer_count" label="求购数量" align="center"></el-table-column>
          <el-table-column prop="c_name" align="center" label="公司"></el-table-column>
          <!-- <el-table-column prop="delivery_date" align="center" label="交货时间"></el-table-column> -->
          <el-table-column align="center" prop="send_man" label="发布人"></el-table-column>
          <el-table-column prop="link_phone" align="center" label="移动电话"></el-table-column>
          <el-table-column prop="fix_phone" align="center" label="固定电话"></el-table-column>
          <el-table-column prop="qq" align="center" label="QQ"></el-table-column>
          <el-table-column prop="link_address" align="center" label="联系地址"></el-table-column>
        </el-table>
      </div>
      <div class="weitu">
        <!-- <el-container>
          <el-main style="height: unset;" v-html="purchaseDetails.content_img"></el-main>
        </el-container>-->
        <!-- <div class="weitu_title">标题：{{purchaseDetails.title}}</div> -->
        <div class="weitu_xiang" v-if="purchaseDetails.content_img">
          <p>{{purchaseDetails.content_img.content}}</p>
          <img :src="item.img" alt v-for="(item,index) in purchaseDetails.content_img.imgs" :key="index" />
        </div>
        <div style="text-align: center;">
          <el-button style="margin: 100px;" @click="$router.push('/purchase')" type="warning">返回</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import url from "../../serverAPI.config.js";
import { log } from 'util';
export default {
  data() {
    return {
      purchaseDetails: {}, //数据
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIxIiwic3ViIjoiMTM0MzMxNTcxNDciLCJpYXQiOjE1NjAzMzQzNTEsInJvbGVzIjoidXNlciJ9.cpLQ0B-asQpLawZ_uoEi0VkMlfbVWgWO4rxKtKeD404"
      },
      tableData: [],
      content: "",
      userName: "",
      exist: false,
      u_id: "",
      user:null,
      setIntegral:null,
      setLevel: []
    };
  },
  components: {},
  created() {
    this.getUserMsg();
    this.getSetIntegral();
    this.getSetLevel();
  },
  mounted() {
    this.u_id = localStorage.getItem("ID");
    this.userName = localStorage.getItem("username") || localStorage.getItem("siteName");
    this.getPurchaseDetails(this.$route.query.id);
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
    againQuote(id) {
      if(this.user.level=="1" && id==1){//这个1 代表第一次报价
            //级别不满足处理弹窗提示
       this.$confirm("您的会员等级不够,是否提升等级","提示",{
            cancelButtonText: "取消",
            confirmButtonText: "去充值",
            type: "warning",
            center: true
          }).then(() => {
          //跳转去充值
          this.$router.push("/recharge");
        }).catch(() => {});
      }else if(this.user.level=="88" && id==1){
          var level="";
        for (var i = 0; i < this.setLevel.length; i++) {
            if(this.user.integral>=this.setLevel[i].start_integral){
                level=this.setLevel[i].level;
            }
         }
         if(level=="1"){
          //级别不满足处理弹窗提示
            this.$confirm("您的会员等级不够,是否提升等级","提示",{
              cancelButtonText: "取消",
              confirmButtonText: "去充值",
              type: "warning",
              center: true
            }).then(() => {
            //跳转去充值
            this.$router.push("/recharge");
          }).catch(() => {});
         }else{
            //级别满足
             this.meetCondition(id)
         }
      }else{
          //级别满足
         this.meetCondition(id)      
        }

    },
    anewQuote(id){
          this.$router.push({
                   path: "./quote",
                   query: { id: this.$route.query.id, q_id: id?id:"" }
               });
    },
    meetCondition(id){
 //级别满足
            this.$confirm("报价将会消耗50积分,是否继续","提示",{
              cancelButtonText: "取消",
              confirmButtonText: "继续报价",
              type: "warning",
              center: true
            }).then(() =>{
                this.$router.push({
                   path: "./quote",
                   query: { id: this.$route.query.id, q_id: id?id:"" }
               });
             }).catch(() => {});
    },
    purchase() {
      this.$router.go(-1);
    },
    getPurchaseDetails(id) {
      var username = this.userName;
      this.$http({
        //url:"http://172.16.0.138:8080/purchase/"+id+'/'+username,
       url: `${url.Purchase_details}/${id}/${username || localStorage.getItem("username")}`,
        // headers:this.headers,
        method: "post"
      }).then(res => {
        if (res.data.code == 20000) {
          this.purchaseDetails = res.data.data;    
          if(this.purchaseDetails.quotation_list){
            this.purchaseDetails.quotation_list.map(item => {
              if (this.u_id == item.u_id) {        
                this.exist = true;
              }
            });
          }
          this.purchaseDetails.send_date = this.resolvingDate(
            this.purchaseDetails.send_date
          );
          this.purchaseDetails.last_date = this.resolvingDate(
            this.purchaseDetails.last_date
          );
          this.purchaseDetails.content_img = JSON.parse(this.purchaseDetails.content_img);
          if(this.purchaseDetails.fix_phone.indexOf("*")!=-1){
          }else{
            if(this.purchaseDetails.fix_phone){
              if(JSON.parse(this.purchaseDetails.fix_phone).length>0){
                  this.purchaseDetails.fix_phone=JSON.parse(this.purchaseDetails.fix_phone)[0];
              } else{this.purchaseDetails.fix_phone="";}
            }else{
              this.purchaseDetails.fix_phone="";
            }

            if(this.purchaseDetails.qq){
              if(JSON.parse(this.purchaseDetails.qq).length>0){
                  this.purchaseDetails.qq=JSON.parse(this.purchaseDetails.qq)[0];
              } else{this.purchaseDetails.qq="";}
            }else{
              this.purchaseDetails.qq="";
            }
          }    
          this.tableData.push(this.purchaseDetails);
        }
      });
    },
    toDetail(goods) {
      window.open(`${url.detailUrl}/details?id=` + goods.id);
    },
    //时间格式转化
    resolvingDate(date) {
      var dateee = new Date(date).toJSON();
      return new Date(+new Date(dateee) + 8 * 3600 * 1000)
        .toISOString()
        .replace(/T/g, " ")
        .replace(/\.[\d]{3}Z/, "");
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
  }
};
</script>
<style lang="scss">
#bhncPur_details {
  .el-table__footer-wrapper,
  .el-table__header-wrapper {
    overflow: hidden;
    box-shadow: 0px 1px 8px 0px rgba(0, 0, 0, 0.12);
  }
}
</style>
<style lang="scss" scoped>
#bhncPur_details {
  .quote {
    margin: 20px 0;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    width: 100%;
    -webkit-justify-content: space-around;
    -ms-justify-content: space-around;
    -moz-justify-content: space-around;
    justify-content: space-around;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    height: 50px;
    line-height: 50px;
    background: rgba(231, 242, 252, 1);
    border: 1px solid rgba(127, 193, 252, 1);
  }
  .weitu {
    width: 100%;
  }
  .el-container {
    width: 70%;
    display: inline-block;
    text-align: center;
  }
  .el-header {
    background-color: #e9eef3;
    color: #333;
    line-height: 30px;
  }

  .el-main {
    background-color: white;
    color: #333;
    line-height: 60px;
  }
  .header_search {
    padding: 20px 50px 20px 20px;
    position: relative;
    .search {
      width: 60%;
    }
    .search_btn {
    }
    .header_search_wei {
      display: inline-block;
      float: right;
      .warning {
      }
      .saixuan {
      }
    }
  }
  .orderDetails {
    width: 70%;
    padding-left: 70px;
  }
  .order_title {
    height: 76px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.04);
    line-height: 68px;
    font-size: 20px;
    font-weight: bold;
    color: rgba(102, 102, 102, 1);
    padding-left: 50px;
    border-bottom: 8px solid rgb(240, 240, 240);
  }
  .title_heade {
    font-size: 15px;
    font-family: MicrosoftYaHei,微软雅黑;
    font-weight: bold;
    color: #333333;
    margin-top: 30px;
    margin-bottom: 20px;
  }
  .tender {
    padding-left: 70px;
    border-bottom: 8px solid #f0f0f0;
    padding-bottom: 25px;
    .tender_des {
      width: 70%;
      min-height: 265px;
      border: 1px solid rgba(252, 146, 99, 1);
      box-shadow: 0px 3px 4px 0px rgba(0, 0, 0, 0.06);
      border-radius: 8px;
      padding: 20px 55px;
      .tender_des_a {
        font-size: 15px;
        font-family: MicrosoftYaHei,微软雅黑;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
      }
      p {
        line-height: 30px;
        margin: 20px 0;
        font-size: 16px;
        font-family: MicrosoftYaHei,微软雅黑;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
      }
      .tender_des_b {
        margin-top: 80px;
        height: 40px;
        span {
          font-size: 15px;
          font-family: MicrosoftYaHei,微软雅黑;
          font-weight: 400;
          color: #666666;
        }
        button {
          float: right;
          width: 118px;
          height: 37px;
          background: rgba(252, 146, 99, 1);
          box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.12);
          border-radius: 8px;
          font-size: 15px;
          font-family: MicrosoftYaHei,微软雅黑;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
        }
      }
    }
  }
  .tender_des_all {
    text-align: center;
    width: 70%;
    min-height: 265px;
    border: 1px solid rgba(252, 146, 99, 1);
    box-shadow: 0px 3px 4px 0px rgba(0, 0, 0, 0.06);
    border-radius: 8px;
    padding: 20px 55px;
    img {
    }
    p {
      font-size: 16px;
      font-family: MicrosoftYaHei,微软雅黑;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      margin: 20px 0;
    }
    button {
      width: 118px;
      height: 37px;
      background: rgba(252, 146, 99, 1);
      box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.12);
      border-radius: 8px;
      font-size: 15px;
      font-family: MicrosoftYaHei,微软雅黑;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
    }
  }
  .weitu_title {
    height: 73px;
    line-height: 65px;
    background: rgba(248, 248, 248, 1);
    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.06);
    font-size: 18px;
    text-indent: 43px;
    font-family: MicrosoftYaHei,微软雅黑;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    border-bottom: 8px solid #f0f0f0;
  }
  .weitu_xiang {
    padding-left: 70px;
    margin-top: 20px;
    p {
      width: 70%;
      margin-bottom: 30px;
    }
    img {
      width: 60%;
    }
  }
}
</style>
