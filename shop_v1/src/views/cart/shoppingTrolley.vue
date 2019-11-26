
<template>
  <div class="shoppingTrolley w" >
    <!-- 购物车头部 -->
    <!-- <div class="hadeer_tou">
      <div class="hadeer_tou_can">
        <img src="../../../static/img/shoppingTrolley.png" alt class="trolley_a" />
      </div>
    </div>-->
    <!-- 购物车内容部分 -->
    <div class="cartBox" v-if="cartList.length > 0">
      <!-- 购物车列表的头部信息栏 -->
      <div class="cart_header">
        <div class="header_container w">
          <div class="cart_logo">
            <!-- <img src="../../../static/img/cartTitle@2x.png" alt /> -->
          </div>
          <span class="product_name_title header-title">商品</span>
          <span class="product_color_title header-title">颜色</span>
          <span class="product_size_title header-title">款号</span>
          <span class="product_single_title header-title">单价</span>
          <span class="product_num_title header-title">数量</span>
          <span class="product_price_title header-title">金额</span>
        </div>
      </div>
      <!-- 购物车列表的头部信息栏结束 -->

      <!-- 购物车中每个商家的列表开始 -->
      <div class="shop_list">
        <ul class="shop_ul">
          <!--以商家为列表，同一商家的商品放进同一个商家li里面  -->
          <li
            v-for="(shopItem,shopIndex) in cartList"
            :key="shopIndex"
            v-show="shopItem.goods.length != 0"
          >
            <!-- 商家信息 -->
            <div class="shop_info">
              <label>
                <input
                  type="checkbox"
                  @click="selectAll(shopItem)"
                  v-model="isShopSelectedAll[cartList.indexOf(shopItem)]"
                  hidden
                />
                <i>
                  <i v-show="isShopSelectedAll[cartList.indexOf(shopItem)]"></i>
                </i>
              </label>
              <span class="shop_logo">
                <img src="../../../static/img/shopIcon.png" alt />
              </span>
              <span class="shop_name">{{formatStr(shopItem.c_name)}}</span>
              <span class="zongji">
                总计：
                <i>￥{{formatNumber(shopItem.prices)}}</i>
              </span>
            </div>
            <!-- 每个商家内的商品列表 -->
            <ul class="product_list">
              <li v-for="(goods,goodsIndex) in shopItem.goods" :key="goodsIndex">
                <label>
                  <input
                    type="checkbox"
                    :id="'select'+shopIndex+goodsIndex"
                    v-model="goods.isSelected"
                    class="checkBox"
                    hidden
                  />
                  <i>
                    <i v-show="goods.isSelected"></i>
                  </i>
                </label>

                <!-- <a><span class="product_area" @click="$router.push('detail?id='+goods.gid)"> -->
                <a><span class="product_area" @click="toDetail(goods)">                    
                  <img :src="goods.img" alt />
                  <span class="goodsTitle">{{goods.name}}</span>
                </span></a>
                <span class="goods_color">{{goods.color}}</span>
                <span class="goods_size">{{ goods.style_number}}</span>
                <span class="single_price">{{formatNumber(goods.prices)}}</span>
                <span class="goods_num">{{ goods.count }}</span>
                <span class="all_price">￥{{ formatNumber(goods.count*goods.prices)}}</span>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <!-- 购物车中每个商家的列表结束 -->

      <!-- 结算部分开始 -->
      <div class="countBox">
        <div class="count w">
          <label class="checkbox_label">
            <input type="checkbox" hidden @click="selectAll(cartList)" />
            <i>
              <i v-show="isSelectedAll"></i>
            </i>
            <span class="allChoose">全选</span> <button @click="deleteCart()" class="delBtn">删除</button>
          </label>
          <span class="choose_allPrice">
            总额：
            <i class="allPrice_num">{{ formatNumber(total_money)}}</i>
            元
          </span>
          <div class="choose_count">
            <span @click="settle()">立即支付</span>
          </div>
        </div>
      </div>

      <!-- 结算部分结束 -->
    </div>
    <div class="cartBox_a" v-else>
      <!-- <img src="../../../static/img/cartTitle@2x.png" alt=""> -->
      <img src="../../../static/img/cartTitle@.png" alt="" class="cartBox_a_wu">
      <p>您的购物车暂无商品</p>
    </div>
  </div>
</template>


<script>
import url from "@/serverAPI.config.js";
export default {
  data() {
    return {
      shopsSave: [],
      cartList: [],
      username: "",
      total_money: 0
      // 模拟购物车数据，数组中每个对象表示一个店铺
};
  },
  created() {
    this.username = localStorage.getItem("username");
    if(!this.username){
      this.$router.push('/login');
    }
    this.getCart();
  },
  updated() {
    this.selectShops();
  },
  methods: {
    selectAll(all) {
      // 参数all可传入shops数组或shops数组内的一个对象
      // all传入一个数组表示购物车中商品全选
      // all传入一个对象表示某个店铺中的商品全选
      if (all instanceof Array) {
        var bool = !this.isSelectedAll;
        for (var i = 0; i < all.length; i++) {
          var goods = all[i].goods;
          for (var j = 0; j < goods.length; j++) {
            goods[j].isSelected = bool;
          }
        }
      } else {
        var index = this.cartList.indexOf(all);
        var bool = !this.isShopSelectedAll[index];
        for (var i = 0; i < all.goods.length; i++) {
          all.goods[i].isSelected = bool;
        }
      }
    },

    selectShops() {
      this.shopsSave = [];
      for (var i = 0; i < this.cartList.length; i++) {
        var shop = JSON.parse(JSON.stringify(this.cartList[i]));
        shop.goods = [];
        this.shopsSave.push(shop);
        for (var j = 0; j < this.cartList[i].goods.length; j++) {
          if (document.getElementById(`select${i}${j}`).checked) {
            shop.goods.push(
              JSON.parse(JSON.stringify(this.cartList[i].goods[j]))
            );
          }
        }
        if (shop.goods.length < 1) {
          this.shopsSave.splice(this.shopsSave.indexOf(shop), 1);
        }
      }
      var total_money=0;
      this.shopsSave.map(item => {   
            item.goods.map(goods => {
               total_money +=goods.prices*goods.count;
            });
          });
          this.total_money=total_money;
    },
    getCart() {
      this.$http({
        url: `${url.cart}/getCart/${this.username}`,
        method: "get"
      }).then(res => {
        if (res.data.code == 20000) {
          var data = res.data.data;
          
          data.map(item => {
            item.prices = 0;
            item.goods.map(goods => {
              goods.isSelected = true;
              item.prices +=goods.prices*goods.count;
            });
          });
          this.cartList = data;
        }
      });
    },
    deleteCart() {
      if(this.shopsSave.length<1){
        this.$message.error("请选择商品后删除");
        return;
      }
      this.$http({
        url: `${url.cart}/deleteCart/${this.username}`,
        method: "post",
        data:this.shopsSave
      }).then(res => {
        if (res.data.code == 20000) {
          this.getCart();
        }
      });
    },
    settle() {
      if(this.shopsSave.length<1){
        this.$message.error("请选择商品后再提交");
        return;
        
      }
      this.$http({
        url: `${url.cart}/settle/${this.username}`,
        method: "post",
        data:this.shopsSave
      }).then(res => {
        if (res.data.code == 20000) {
          this.$router.push(`/orderInfo?id=${res.data.data}`);
        }
      });
    },
    formatNumber(str){
      return parseFloat(str).toFixed(2);
    },
    formatStr(str){
      var start =str.substring(1,str.length-1);
      var r = '';
      for(var i=0;i<start.length;i++){
         r += '*';
      }
      return str.replace(start,r);
    },
    toDetail(goods) {
      this.utils.toDetailsss(goods);
    },
  },
  computed: {
    //   购物车中的商品是否全选
    isSelectedAll: {
      get() {
        for (var i = 0; i < this.cartList.length; i++) {
          if (!this.isShopSelectedAll[i]) {
            return false;
          }
        }
        return true;
      },
      // 这里要加一个空的setter，因为v-model绑定时会报错
      set() {}
    },

    //   店铺中的商品是否全选
    isShopSelectedAll: function() {
      var tempArr = [];
      for (var i = 0; i < this.cartList.length; i++) {
        tempArr[i] = true;
        var goods = this.cartList[i].goods;
        for (var j = 0; j < goods.length; j++) {
          if (!goods[j].isSelected) {
            tempArr[i] = false;
            break;
          }
        }
      }
      return tempArr;
    }
  },
  mounted() {}
};
</script>




<style  lang="scss" scoped>
// 公共类名
.w {
  width: 1200px;
  margin: auto;
}
.bgc {
  background: #ccc;
}
// 数字颜色
.col {
  color: #ef1234;
}
.shoppingTrolley {
  background-color: rgb(255, 255, 255);
  // 购物车头部
  .hadeer_tou {
    padding: 10px 0;
    border-bottom: 1px solid #ccc;
    // height: 70px;
    // line-height: 90px;
    background-color: rgba(248, 248, 248, 1);
    .hadeer_tou_can {
      width: 1200px;
      margin: 20px auto;
      padding-left: 30px;
    }
  }

  //   购物车内容部分
  .cartBox {
    // 购物车头部信息栏
    .cart_header {
      font-size: 18px;
      font-family: MicrosoftYaHei-Bold,微软雅黑;
      font-weight: bold;
      color: rgba(61, 145, 231, 1);
      border-bottom: 1px solid #ccc;
      .header_container {
        position: relative;
        height: 128px;
        padding: 13px 0;
        .all_selected_title {
          position: absolute;
        }
        .product_name_title {
          position: absolute;
          top: 97px;
          left: 296px;
        }
        .product_color_title {
          position: absolute;
          top: 97px;
          left: 490px;
        }
        .product_size_title {
          position: absolute;
          top: 97px;
          left: 606px;
        }
        .product_single_title {
          position: absolute;
          top: 97px;
          left: 722px;
        }
        .product_num_title {
          position: absolute;
          top: 97px;
          left: 838px;
        }
        .product_price_title {
          position: absolute;
          top: 97px;
          left: 954px;
        }
      }
    }
    // 购物车头部信息栏结束

    // 商家列表
    .shop_list {
      .shop_ul {
        > li {
          border-bottom: 1px solid #ccc;
          .shop_info {
            position: relative;
            width: 1200px;
            margin: auto;
            height: 45px;
            line-height: 45px;
            margin-top: 20px;
            padding-left: 46px;
            .shop_logo {
              display: inline-block;
              padding-left: 30px;
              width: 26px;
              height: 22px;
            }
            .shop_name {
              padding-left: 20px;
              font-size: 16px;
              font-family: MicrosoftYaHei-Bold,微软雅黑;
              font-weight: bold;
              color: rgba(51, 51, 51, 1);
            }
            .zongji {
              position: absolute;
              left: 1020px;
              i {
                color: #eab31f;
                font-weight: bold;
              }
            }
          }
          .product_list {
            width: 1200px;
            margin: auto;
            font-size: 16px;
            font-family: MicrosoftYaHei,微软雅黑;
            font-weight: 400;
            color: rgba(102, 102, 102, 1);
            padding-bottom: 24px;

            li {
              position: relative;
              height: 60px;
              padding-top: 20px;
              padding-left: 176px;
              .checkBox {
                position: absolute;
                left: 10px;
              }
              .product_area {
                position: absolute;
                left: 238px;

                img {
                  width: 38px;
                  height: 38px;
                }
                .goodsTitle {
                  position: absolute;
                  top: -4px;
                  left: 60px;
                  width: 130px;
                  //   height: 40px;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 2;
                  overflow: hidden;
                }
              }
              .goods_color {
                position: absolute;
                left: 501px;
              }
              .goods_size {
                position: absolute;
                left: 602px;
              }
              .single_price {
                position: absolute;
                left: 724px;
              }
              .goods_num {
                position: absolute;
                left: 838px;
              }
              .all_price {
                position: absolute;
                left: 934px;
                width: 77px;
                font-weight: bold;
                color: rgba(102, 102, 102, 1);
              }
            }
          }
        }
      }
    }
    // 商家列表结束

    // 结算部分开始
    .countBox {
      border-bottom: 1px solid #ccc;
    }

    .count {
      position: relative;
      height: 80px;
      .checkbox_label {
        position: absolute;
        left: 46px;
        top: 44px;
        display: flex;
        align-items: center;
        .allChoose {
          padding-left: 11px;
        }
      }
      .choose_allPrice {
        position: absolute;
        top: 36px;
        left: 787px;
        font-size: 16px;
        font-family: MicrosoftYaHei-Bold,微软雅黑;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        .allPrice_num {
          padding: 0 20px;
          font-size: 26px;
          font-family: MicrosoftYaHei-Bold,微软雅黑;
          font-weight: bold;
          color: rgba(234, 179, 31, 1);
        }
      }
      .choose_count {
        position: absolute;
        right: 0;
        width: 167px;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgb(234, 177, 63);
        cursor: pointer;
        span {
          color: #fff;
          font-size: 24px;
        }
      }
    }
    // 结算部分结束
  }
}

// 复选框样式
label {
  i {
    position: relative;
    display: inline-block;
    width: 22px;
    height: 22px;
    border: 2px solid rgba(61, 145, 231, 1);
    border-radius: 50%;
    box-sizing: border-box;
    i {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 12px;
      height: 12px;
      background: rgba(61, 145, 231, 1);
      border-radius: 50%;
    }
  }
}

.allChoose , .delBtn {
  font-size: 18px;
  font-family: MicrosoftYaHei-Bold,微软雅黑;
  font-weight: bold;
  color: rgba(61, 145, 231, 1);
  padding-right: 30px;
  background-color: transparent;
}
.cartBox_a{
  position: relative;
  min-height: 600px;
  padding: 15px;
  .cartBox_a_wu{
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
  p{
    height: 21px;
    font-size: 20px;
    font-family: SourceHanSansCN-Regular;
    font-weight: 400;
    color: silver;
    position: absolute;
    top: 70%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>


