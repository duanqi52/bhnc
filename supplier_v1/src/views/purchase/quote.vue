<!-- 组件说明 -->
<template>
  <div id="bhncQuote">
    <p id="purchaseQuote">求购报价</p>
    <div class="quote">
      <div style="border-bottom: 4px solid #ececec;">
        <div class="quote_title" style="padding-left: 60px;">
          标题:
          <span>{{offer.title}}</span>
        </div>
        <div>
        </div>
        <div style="width: 80%;border-top: 1px solid #F0F0F0;margin-left: 60px;">
          <div class="quote_all">
            <span>发布人:</span>
            <p>{{offer.send_man}}</p>
          </div>
          <div class="quote_all">
            <span>采购数量:</span>
            <p>{{offer.count}}</p>
          </div>
          <div class="quote_all">
            <span>公司:</span>
            <p v-if="qid==1">******</p>
            <p  v-if="qid!=1">{{offer.cname}}</p>
          </div>
          <!-- <div style="display: inline-block;">
            <span>固定电话:&nbsp;&nbsp;{{offer.fix_phone}}</span>
          </div>
          <div style="padding-left: 60px;margin-bottom: 30px;display: inline-block;">
            <span>QQ:&nbsp;&nbsp;{{offer.qq}}</span>
          </div>-->
        </div>
        <div style="width: 80%;border-top: 1px solid #F0F0F0;margin-left: 60px;">
          <div class="quote_all">
            <span  v-if="qid!=1">联系电话:&nbsp;&nbsp;{{offer.phone}}</span>
            <span v-if="qid==1">联系电话:&nbsp;&nbsp;*******</span>
          </div>
          <div class="quote_all">
            <span>联系地址:</span>
            <span v-if="qid!=1">{{offer.address}}</span>
            <span v-if="qid==1">******</span>
          </div>
        </div>
      </div>

      <!-- <img src="../../../static/img/bgpen.png" alt="" class="bgpen"> -->
      <div class="penbg_bg">
        <!-- <div style="padding: 30px 0;margin-left: 60px;">
          <img src="../../../static/img/quote_all.png" alt v-if="!goods" @click="toAllGoods" />
          <div class="shangping" v-if="goods" @click.stop="toDetail(goods)">
            <img :src="goods.img[0]" alt width="145px" height="130px" />
            <p>{{goods.title}}</p>
          </div>
          <el-button
            type="primary"
            style="padding: 10px 25px;margin-left: 50px;"
            @click="toAllGoods"
            v-if="goods"
          >重选</el-button>
        </div>-->
        <div style="padding-bottom: 20px;">
          <div style="width: 45%;display: inline-block;margin-left: 60px;">
            <span style="width: 80px;display: inline-block;">单价:</span>
            <!-- <el-input
              placeholder="请输入商品单价，精确到小数点后2位，系统自动计算总价。"
              v-model="quotation.price"
              type="number"
              style="width: 80%;"
              clearable
               min="0.1"
               step="0.1"
               v-enter-number2
            ></el-input> -->
               <input
              placeholder="请输入商品单价，精确到小数点后2位，系统自动计算总价。"
              v-model="quotation.price"
              type="number"
              style="width: 81%;border: 1px solid #666666;padding-left:20px;height:36px;line-height:36px;border-radius:4px;ime-mode:disabled;"
               v-enter-number2
               >
          </div>
          <div style="width: 48%;display: inline-block;">
            <span>总价:{{total}}元</span>
          </div>
        </div>
        <div class="penbg_explain">
          <span style="width: 83px;display: inline-block;float: left;">报价说明</span>
          <textarea placeholder="请输入报价说明，限定500字。" v-model="quotation.explain"></textarea>
        </div>
      </div>
    </div>

    <div class="submit">
      <button style="margin-right: 100px;" @click="$router.go(-1)" class="submit_b">取消</button>
      <button @click="submitOffer()" class="submit_a">提交</button>
    </div>
  </div>
</template>

<script>
//import x from ''
import url from "@/serverAPI.config.js";
export default {
  components: {},
  data() {
    return {
      input: "",
      offer: {},
      quotation: {},
      qid: "",
      total:''
    };
  },
  mounted() {
    this.qid = this.$route.query.q_id;
    if (this.qid && this.qid!=1) {
      this.getQuotation();
    }
    this.getDetails(this.$route.query.id);
    this.getSetIntegral();
    setInterval(() => {
      if (this.quotation.price) {
        this.total=this.quotation.price*this.offer.count
        this.total = this.total.toFixed(2)
      }
    }, 10);
    
  },
  computed: {},
  methods: {
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
    getQuotation() {
      this.$http({
        //url:'http://172.16.0.124:9006/purchase/getQuotation/'+this.qid,
        url: `${url.getQuotation}/${this.qid}`,
        method: "get"
      }).then(res => {
        if (res.data.code == 20000) {
          this.quotation = res.data.data;
        }
      });
    },
    //收件人
    getGoods() {
      this.$http({
        //url:"http://http://172.16.0.124:9006/purchase"+id,
        url: `${url.getPurchaseGoodsDetails}/${this.gid}`,
        method: "get"
      }).then(res => {
        if (res.data.code == 20000) {
          this.goods = res.data.data;
          this.goods.img = JSON.parse(this.goods.img);
        }
      });
    },
    getDetails(id) {
      this.$http({
        url: `${url.Purchase_details}/getOffer/${id}`,
       //url:'http://172.16.0.138:8080/purchase/getOffer/'+id,
        method: "get"
      }).then(res => {
        if (res.data.code == 20000) {
          this.offer = res.data.data;
          if(this.offer.fix_phone){
            this.offer.fix_phone = JSON.parse(this.offer.fix_phone);
             this.offer.fix_phone = this.offer.fix_phone.join();
          }
          if(this.offer.qq){
            this.offer.qq = JSON.parse(this.offer.qq);
            this.offer.qq = this.offer.qq.join();
          }            
        }
      });
    },
    submitOffer() {
      if(!this.quotation.price || this.quotation.price < 0){
        if(document.getElementsByClassName("el-message").length == 0)
        this.$message.error("请填写正确的单价");
        return;
      }
      this.quotation.total_price = this.quotation.price * this.offer.count;
      this.quotation.total_price = this.quotation.total_price.toFixed(2);
      this.quotation.c_name = this.offer.cname;
      this.quotation.address = this.offer.address;
      this.quotation.link_phone = this.offer.phone;
      this.quotation.purchase_count = this.offer.count;
      this.quotation.send_man = this.offer.send_man;
      this.quotation.u_id = localStorage.getItem("ID");
      this.quotation.p_id = this.$route.query.id;
      this.quotation.price = this.quotation.price;
       this.$confirm("报价将消耗:"+ this.setIntegral.offer,"提示",{
                      cancelButtonText: "取消",confirmButtonText: "确定",type: "warning",center: true}).then(() => {

                   if (this.quotation.id) {
                      this.$http({
                        url: `${url.updateQuotation}`,
                        method: "post",
                        data: this.quotation
                      }).then(res => {
                        if (res.data.code == 20000) {
                          this.$router.push({
                            path: "/pur_details",
                            query: { id: this.$route.query.id }
                          });
                        }
                      });
                } else {          
                  this.$http({
                    //url:"http://localhost:8080/purchase/addQuotations",
                    url: `${url.addQuotation}`,
                    method: "post",
                    data: this.quotation
                  }).then(res => {
                    if (res.data.code == 20000) {
                      this.$router.push({
                        path: "/pur_details",
                        query: { id: this.$route.query.id }
                      });
                    }
                  });
                }

        }).catch(() => {});


    },
    toAllGoods() {
      this.$router.push("/allGoods?pid=" + this.$route.query.id);
    },
    toDetail(goods) {
      window.open(`${url.detailUrl}/details?id=` + goods.id);
    }
  }
};
</script>

<style lang='scss'>
#bhncQuote {
  .quote_all .el-input--suffix .el-input__inner {
    padding-right: 30px;
    border: 1px solid rgba(61, 145, 231, 1);
  }
  .el-input__inner {
    border: 1px solid rgba(102, 102, 102, 1);
  }
}
</style>

<style lang='scss' scoped>
#bhncQuote {
  #purchaseQuote {
    padding-left: 45px;
    height: 95px;
    line-height: 95px;
    font-size: 21px;
    font-weight: bold;
    color: rgba(102, 102, 102, 1);
    border-bottom: 4px solid #ececec;
  }
  .penbg_bg {
    background: url("../../../static/img/penbg_a@.png") no-repeat right;
    background-size: 26%;
    border-bottom: 4px solid #ececec;
    padding: 60px 0;
    .penbg_explain {
      margin-left: 60px;
      span {
      }
      textarea {
        padding: 10px;
        width: 38%;
        height: 446px;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(102, 102, 102, 1);
        border-radius: 8px;
        resize: none;
        line-height: 2;
        font-size: 14px;
        color: #666;
      }
    }
  }
  .quote {
    width: 100%;
    display: inline-block;
    font-size: 16px;
    font-family: MicrosoftYaHei,微软雅黑;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);

    .quote_title {
      padding-left: 50px;
      line-height: 13px;
      margin: 30px 0;
      font-size: 20px;
      font-family: MicrosoftYaHei,微软雅黑;
      font-weight: 400;
      color: rgba(252, 146, 99, 1);
    }
    .quote_all {
      margin: 25px 0;
      font-size: 16px;
      font-family: MicrosoftYaHei,微软雅黑;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      width: 30%;
      display: inline-block;
      span {
        display: inline-block;
      }
      .el-input {
        width: 60%;
        margin-left: 8px;
      }
      p {
        width: 80%;
        display: inline-block;
        padding-left: 8px;
      }
    }
  }
  .submit {
    margin: 50px 0;
    text-align: center;
    .submit_a {
      width: 92px;
      height: 36px;
      line-height: 36px;
      background: rgba(252, 146, 99, 1);
      border-radius: 8px;
      font-size: 16px;
      font-family: MicrosoftYaHei,微软雅黑;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
    }
    .submit_b {
      font-size: 16px;
      font-family: MicrosoftYaHei,微软雅黑;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      width: 92px;
      height: 36px;
      line-height: 36px;
      background: rgba(153, 153, 153, 1);
      border-radius: 8px;
    }
  }
  .bgpen {
    float: right;
  }
  .shangping {
    display: inline-block;
    width: 180px;
    height: 194px;
    text-align: center;
    box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.12);
    overflow: hidden;
    padding-top: 20px;
    p {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      font-size: 12px;
      font-family: MicrosoftYaHei,微软雅黑;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      width: 145px;
      margin-top: 5px;
      display: inline-block;
    }
  }
}
</style>
