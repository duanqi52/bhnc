<!-- 组件说明 -->
<template>
  <div id="bhncDetails">
    <div class="proudct-details">
      <div class="title">
        <p>
          <span>订单ID：</span>
          {{orderDetails.id}}
        </p>
        <p>
          <span>订单金额：</span>
          {{orderDetails.total_money}}
        </p>
        <p>
          <span>下单时间：</span>
          {{orderDetails.date}}
        </p>
        <p>
          <el-button @click="handlePay();" v-show="orderDetails.status == '0'">去付款</el-button>
          <el-button v-show="orderDetails.status == '1'" disabled>发货中</el-button>
          <el-button v-show="orderDetails.status == '2'" disabled>已完成</el-button>
          <el-button>申请售后</el-button>
        </p>
        <div class="paypage" v-show="isShow" @click="handleHide">
          <img
            src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1562911809204&di=9dda65de25fa97531276b5f32f446006&imgtype=0&src=http%3A%2F%2Fimg13.360buyimg.com%2Fn1%2Fjfs%2Ft21325%2F99%2F973692483%2F339692%2F515e38c9%2F5b1dc343N7df9601c.png"
            alt
          />
        </div>
      </div>
      <div class="proudct-item" style="width: 1500px;margin: 0px auto;">
        <div class="title_heade">商品信息</div>
        <div v-for="(product,index) in orderDetails.product" :key="index">
          <el-table
            :data="product.goods"
            style="width: 100%"
            :show-header="index == '0'"
            :header-cell-style="{background:'#eef1f6',color:'#606266',fontWeight:'bold'}"
          >
            <el-table-column prop="name" label="商品" align="center">
              <template slot-scope="scope">
                <div>
                  <p style="margin: 10px 0;height: 45px;">
                    <img :src="scope.row.img" alt class="img_url" />
                    <span class="commodity">{{scope.row.name}}</span>
                  </p>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="style_number" label="款号" align="center"></el-table-column>
            <el-table-column prop="color" label="颜色" align="center"></el-table-column>
            <el-table-column prop="prices" label="商品单价" align="center"></el-table-column>
            <el-table-column prop="count" label="数量" align="center"></el-table-column>
          </el-table>
        </div>
        <div class="title_heade">备注信息</div>
        <div class="remake">
          <p>{{orderDetails.remarks}}</p>
        </div>
        <div class="border"></div>
        <div class="order-tracking">
          <div class="title_heade">订单追踪</div>
          <div class="shipments-details" v-for="(bat,index) in orderDetails.batches" :key="index">
            <p class="shipments-title">发货{{index + 1 }}</p>
            <div class="shipment-box">
              <div class="shipments-people">
                <table>
                  <tr>
                    <td>
                      <span>收件人：</span>
                      {{bat.consigner.companyName}}
                    </td>
                    <td>{{bat.consigner.name}}</td>
                    <td>{{bat.consigner.phone}}</td>
                    <!-- <td>020-88888888</td> -->
                    <td>{{bat.consigner.address}}</td>
                  </tr>
                  <tr>
                    <td style="padding: 30px 0;">
                      <span>发货人：</span>
                      {{bat.recipients.companyName}}
                    </td>
                    <td>{{bat.recipients.name}}</td>
                    <td>{{bat.recipients.phone}}</td>
                    <!-- <td>020-5555555</td> -->
                    <td>{{bat.recipients.address}}</td>
                  </tr>
                </table>
              </div>
              <div class="logistics">
                <el-table
                  :data="bat.order"
                  style="width: 100%"
                  :header-cell-style="{background:'#eef1f6',color:'#606266',fontWeight:'bold'}"
                >
                  <el-table-column label="商品" align="center">
                    <template slot-scope="scope">
                      <div v-for="(item,index) in scope.row.product" :key="index">
                        <span style="display:flex;justify-content: space-between;margin:25px 0">
                          <img
                            :src="item.img"
                            style="width:40px;vertical-align: middle;height: 40px;"
                          />
                          <span>{{item.name}}</span>
                        </span>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column label="款号" align="center">
                    <template slot-scope="scope">
                      <div v-for="(item,index) in scope.row.product" :key="index">
                        <span style="height: 50px;display: inline-block;">{{item.style_number}}</span>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column label="颜色" align="center">
                    <template slot-scope="scope">
                      <div v-for="(item,index) in scope.row.product" :key="index">
                        <span style="height: 50px;display: inline-block;">{{item.color}}</span>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="count" label="数量" align="center">
                    <template slot-scope="scope">
                      <div v-for="(item,index) in scope.row.product" :key="index">
                        <span style="height: 50px;display: inline-block;">{{item.count}}</span>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="logistics" label="物流信息" align="center"></el-table-column>
                </el-table>
              </div>
            </div>
          </div>
          <div class="btn-box" @click.stop="prev">
            <el-button type="primary">返回</el-button>
          </div>
        </div>
      </div>
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
      orderDetails: {},
      orderDetail: [],
      id: "",
      isShow: false,
      payShow: true,
      orderShow: false
    };
  },
  methods: {
    //时间格式转化
    resolvingDate(date) {
      var dateee = new Date(date).toJSON();
      return new Date(+new Date(dateee) + 8 * 3600 * 1000)
        .toISOString()
        .replace(/T/g, " ")
        .replace(/\.[\d]{3}Z/, "");
    },
    getDetails() {
      let id = this.$route.query.id;
      this.$http({
        method: "get",
        url: `${url.getOrder}/${id}`
        // headers: this.headers,  //请求头里会添加Authorization属性为'code_bunny'
        // data:this.searchMap
      }).then(res => {
        if (res.data.code == 20000) {
          this.orderDetails = res.data.data;
          this.orderDetails.product = JSON.parse(this.orderDetails.product);
          this.orderDetails.date = this.resolvingDate(this.orderDetails.date);
          this.orderDetails.batches.map(item => {
            item.recipients = JSON.parse(item.recipients); //收
            item.consigner = JSON.parse(item.consigner); //发
            item.order = JSON.parse(item.order);
          });
          // console.log(this.orderDetails.product[0].goods[0].name);

          //console.log(this.orderDetails.batches.order)
        }
      });
    },
    prev() {
      this.$router.go(-1);
    },
    getID() {
      this.id = this.$route.query.id;
      console.log("aa" + this.id);
    },
    handlePay() {
      this.isShow = true;
    },
    handleHide() {
      this.updateStatus();
    },
    updateStatus() {
      var orderDetails = JSON.parse(JSON.stringify(this.orderDetails));
      orderDetails.status = "1";
      orderDetails.date = new Date(orderDetails.date);
      orderDetails.batches.map(item => {
        item.recipients = JSON.stringify(item.recipients); //收
        item.consigner = JSON.stringify(item.consigner); //发
        item.order = JSON.stringify(item.order);
      });
      orderDetails.product = JSON.stringify(orderDetails.product);
      this.$http({
        method: "put",
        url: `${url.getOrder}/${orderDetails.id}`,
        // headers: this.headers,  //请求头里会添加Authorization属性为'code_bunny'
        data: orderDetails
      }).then(res => {
        if (res.data.code == 20000) {
          this.orderDetails.status = "1";
          this.isShow = false;
        }
      });
    }
  },
  created() {
    this.getDetails();
  }
};
</script>

<style lang='scss' scoped>
//@import url()
$borderColor: #e6e6e6;
$themeColor: #3d91e7;
#bhncDetails {
  .proudct-details {
    .title {
      display: flex;
      justify-content: space-around;
      padding: 10px;
      background-color: #e7f2fc;
      color: $themeColor;
      height: 80px;
      align-items: center;
      p {
        line-height: 40px;
      }
      span {
        font-size: 16px;
      }
      .paypage {
        position: absolute;
        top: 62px;
        right: 0;
        z-index: 100;
      }
    }
    .remake {
      border: 1px solid #cfcfcf;
      border-radius: 6px;
      min-height: 200px;
      p:first-child {
        font-weight: 600;
        font-size: 18px;
      }
      p:last-child {
        font-size: 14px;
        padding-left: 15px;
        margin: 25px 0;
      }
    }
    .border {
      border: 1px solid $borderColor;
      margin: 30px 0;
    }
    .shipments-details {
      .shipments-title {
        padding: 8px 0;
        font-weight: bold;
      }
      .shipment-box {
        border: 1px solid $borderColor;
        font-size: 15px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        padding: 30px 25px;
        table {
          width: 100%;
          text-align: center;
          line-height: 30px;
        }
        .logistics {
          span {
            float: none;
          }
        }
      }
    }
  }
  .btn-box {
    text-align: center;
    button {
      width: 160px;
      border-radius: 10px;
      margin: 20px 0;
    }
  }
  .img_url {
    width: 45px;
    height: 45px;
    display: inline-block;
    float: left;
  }
  .title_heade {
    font-size: 15px;
    font-family: MicrosoftYaHei;
    font-weight: bold;
    color: #333333;
    margin-top: 30px;
    margin-bottom: 20px;
  }
}
</style>