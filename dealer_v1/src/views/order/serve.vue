<template>
  <div id="bhncServe">
    <div class="title">
      <p style="font-size:20px;font-weight: bold;">
        <span style="font-size:20px;font-weight: bold;">订单ID：{{id}}</span>
      </p>
      <p>
        <span>订单金额：{{formatPrice(order.total_money)}}</span>
      </p>
      <p>
        <span>下单时间：{{order.date}}</span>
      </p>
    </div>
    <div class="commodityAll">
      <div class="title_heade" style="margin-bottom: 0px;">选择商品</div>
      <ul class="catalogue">
        <div v-for="(product,index) in order.product" :key="index">
          <li v-for="(goods,index1) in product.goods" :key="'goods'+index1">
            <div class="catalogue_li">
              <img :src="goods.img" alt class="catalogue_img" />
            </div>
            <p>
              <span style="color: red !important;font-size: 14px;">￥</span>
              <span>{{formatPrice(14.45)}}</span>/支起
            </p>
            <label>
              <span>{{goods.style_number}}{{goods.color}}</span>
              <input type="checkbox" @click="selectGoods($event,product,goods)" />
            </label>
          </li>
        </div>
      </ul>
    </div>
    <div class="captioned_item">
      <div class="captioned_item_left">
        <div v-for="(product,index) in afterOrder.product" :key="index">
          <div
            class="captioned_item_left_li"
            v-for="(goods,index1) in product.goods"
            :key="'goods'+index1"
          >
            <p>
              <span>{{goods.style_number}}{{goods.color}}</span>
            </p>
            <div class="tui_nub">
              <span>退款数量：</span>
              <input
                type="number"
                placeholder="请输入退款数量"
                :id="'goods'+index1"
                v-model="goods.count"
                @keyup="checkCount(goods,index1)"
              />
            </div>
          </div>
        </div>
        <div class="captioned_item_left_sum" v-if="afterOrder.product.length>0">
          <span>退款金额：</span>
          <input type="number" placeholder="请输入退款金额" v-model="afterOrder.total_money" />
        </div>
        <div class="captioned_item_left_sum" v-if="afterOrder.product.length>0">
          <span style="float: left;">退款描述：</span>
          <textarea name id cols="30" rows="10" placeholder="请输入退款描述" v-model="afterOrder.remarks"></textarea>
        </div>
        <div class="upfile-box" v-if="afterOrder.product.length>0">
          <div class="up-file" v-for="(item,index) in other_imgList" :key="index">
            <img :src="addImg" alt @click="onPickFile2(index)" v-if="!item.img" width="96px" />

            <div class="banner-img" v-else style="position:relative">
              <img :src="item.img" style="width:100%;height:96px" />
              <a>
                <img
                  :src="removeImg"
                  class="remove"
                  @click="offImg2(index)"
                  style="width:30px;top:0px; right:0; position:absolute; "
                />
              </a>
            </div>
            <input
              type="file"
              accept="image/*"
              style="display: none"
              :id="'file'+index"
              @change="imgUpload2($event,index)"
            />
          </div>
        </div>
        <div class="btn_s">
          <button class="btn_a">取消</button>
          <button class="btn_b" v-if="afterOrder.product.length>0" @click="saveAfterOrder()">提交</button>
        </div>
      </div>
      <img src="../../../static/img/penbg_a@.png" alt class="penbg_a" />
    </div>
  </div>
</template>

<script>
import addImg from "../../components/addImg/addImg";
import bannerImg from "../../components/addImg/bannerImg";
import url from "@/serverAPI.config.js";
export default {
  data() {
    return {
      user: {},
      addImg: require("../../assets/img/add.png"),
      removeImg: require("../../assets/img/remove.png"),
      other_imgList: [{ img: "" }],
      id: "",
      order: {},
      afterOrder: { product: [], total_money: 0, remarks: "", d_id: "" }
    };
  },
  components: {},
  created() {
    this.id = this.$route.query.id;
    this.getOrderDetails();
  },
  methods: {
    //点击事件
    onPickFile2(index) {
      document.querySelector(`#file${index}`).click();
    },
    //关闭图片重新选
    offImg2(index) {
      this.other_imgList.splice(index, 1);
    },
    //img
    imgUpload2(event, index) {
      if (event.target.files[0].size > 1024 * 1024 * 2) {
        this.$message.error("图片不能大于2M!");
        return;
      }
      var formData = new FormData();
      formData.append(`file`, event.target.files[0]);
      this.$http({
        url: `${url.upload}`,
        method: "post",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" }
      }).then(res => {
        this.other_imgList[index].img = res.data;
        if (this.other_imgList.length < 6) {
          this.other_imgList.push({ img: "" });
        }
      });
    },
    getOrderDetails() {
      this.$http({
        url: `${url.getOrder}/${this.id}`,
        method: "get"
      }).then(res => {
        if (res.data.code) {
          this.order = res.data.data;
          this.order.date = this.resolvingDate(this.order.date);
          this.order.product = JSON.parse(this.order.product);
          this.afterOrder.d_id = this.order.d_id;
          this.afterOrder.o_id = this.id;
        }
      });
    },
    selectGoods(event, product, goods) {
      var product = JSON.parse(JSON.stringify(product));
      var goods = JSON.parse(JSON.stringify(goods));
      goods.isCount = parseInt(goods.count);
      goods.count = 0;
      product.goods = [goods];
      var item = this.isExist(product);
      if (event.target.checked) {
        if (item) {
          if (item.goods) {
            item.goods.push(goods);
          } else {
            item.goods = [goods];
          }
        } else {
          this.afterOrder.product.push(product);
        }
      } else {
        if (item) {
          var index = 0;
          for (var i = 0; i < item.goods.length; i++) {
            if (
              goods.style_number == item.goods[i].style_number &&
              goods.color == item.goods[i].color
            ) {
              index = i;
            }
          }
          item.goods.splice(index, 1);
          if (item.goods.length < 1) {
            this.afterOrder.product.splice(
              this.afterOrder.product.indexOf(item),
              1
            );
          }
        }
      }
    },
    isExist(product) {
      var item = null;
      this.afterOrder.product.map(item1 => {
        if (item1.link_phone == product.link_phone) {
          item = item1;
        }
      });
      return item;
    },
    checkCount(goods, index1) {
      console.log(goods);
      if (goods.count > 0 && goods.count <= goods.isCount) {
        document.getElementById("goods" + index1).style = "";
      } else {
        document.getElementById("goods" + index1).style = "border-color: red";
        this.$message.error("退款数量应在购买数量范围内");
      }
    },
    saveAfterOrder() {
      var afterOrder = JSON.parse(JSON.stringify(this.afterOrder));
      var img = [];
      this.other_imgList.map(item => {
        if (item.img) {
          img.push(item.img);
        }
      });
      afterOrder.product = JSON.stringify(afterOrder.product);
      afterOrder.img = JSON.stringify(img);
      afterOrder.u_name = localStorage.getItem("siteName");
      this.$http({
        url: `${url.saveAfterOrder}`,
        method: "post",
        data: afterOrder
      }).then(res => {
        if (res.data.code == 20000) {
          this.$router.push("/afterOrder");
        } else {
          this.$message.error("网络异常,请重试");
        }
      });
    },
    formatPrice(str) {
      return parseFloat(str).toFixed(2);
    },
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

<style lang="scss" scoped>
$borderColor: #e6e6e6;
$themeColor: #3d91e7;
#bhncServe {
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
  }
  .title_heade {
    font-size: 15px;
    font-family: MicrosoftYaHei;
    font-weight: bold;
    color: #333333;
    margin-top: 30px;
    margin-bottom: 20px;
  }
  .commodityAll {
    width: 1500px;
    margin: 0 auto;
    padding-bottom: 30px;
    border-bottom: 1px solid #f3f3f3;
  }
  .catalogue {
    display: flex;
    flex-wrap: wrap;
    li {
      display: inline-block;
      margin-right: 90px;
      margin-top: 20px;
      border: 1px solid #ebebeb;
      padding: 10px;
      .catalogue_li {
        position: relative;
        .catalogue_img {
          width: 185px;
          height: 200px;
          display: inline-block;
        }
      }
      label {
        display: inline-block;
        max-width: 100%;
        font-weight: 700;
        font-size: 14px;
        float: right;
        span {
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          width: 170px;
          display: inline-block;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
        }
      }
      p {
        padding-top: 5px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        font-size: 14px;
        span {
          color: red !important;
          margin-right: 5px;
          font-size: 18px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
        }
      }
    }
  }
  .captioned_item {
    margin: 50px 0;
  }
  .captioned_item .captioned_item_left {
    display: inline-block;
    margin-left: 85px;
  }
  .captioned_item .captioned_item_left .captioned_item_left_li {
    margin-bottom: 30px;
    p {
      margin-bottom: 20px;
      span {
        border-left: 2px solid #3d91e7;
        padding-left: 10px;
        font-size: 16px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        height: 16px;
        line-height: 13px;
        display: inline-block;
      }
    }
    .tui_nub {
      span {
        font-size: 16px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        margin-left: 50px;
      }
      input {
        border: 1px solid rgba(61, 145, 231, 1);
        border-radius: 4px;
        width: 622px;
        height: 36px;
        display: inline-block;
        font-size: 15px;
        text-indent: 15px;
      }
    }
  }
  .captioned_item_left_sum {
    margin-top: 80px;
    span {
      font-size: 16px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
    }
    input {
      border: 1px solid rgba(61, 145, 231, 1);
      border-radius: 4px;
      width: 622px;
      height: 36px;
      display: inline-block;
      font-size: 15px;
      text-indent: 15px;
      margin-left: 50px;
    }
    textarea {
      border: 1px solid rgba(61, 145, 231, 1);
      border-radius: 4px;
      width: 622px;
      height: 100px;
      margin-left: 57px;
      resize: none;
      text-indent: 15px;
      display: inline-block;
      padding-top: 10px;
    }
  }
  .btn_s {
    text-align: center;
    margin: 50px 0;
    .btn_a {
      width: 88px;
      height: 35px;
      background: rgba(192, 192, 192, 1);
      border-radius: 4px;
      color: white;
      font-size: 15px;
      margin-right: 20px;
    }
    .btn_b {
      width: 88px;
      height: 35px;
      background: $themeColor;
      border-radius: 4px;
      color: white;
      font-size: 15px;
    }
  }
  .penbg_a {
    float: right;
  }
  //上传图片
  .upfile-box {
    display: flex;
    padding-left: 138px;
    margin-top: 30px;
  }
  .up-file {
    width: 100px;
    height: 100px;
    border: 2px dashed #3d91e7;
    line-height: 100px;
    text-align: center;
    margin-right: 20px;
  }

  .banner-img {
    display: flex;
  }
}
</style>