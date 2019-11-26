<!-- 组件说明 -->
<template>
  <div class="create-marke">
    <div class="create-box">
      <div class="company-name">
        <h1>{{shops.c_name}}</h1>
      </div>
      <div class="company-linkman">
        <p>
          <span>联系人：</span>
          {{shops.linkman}}
        </p>
        <p>
          <span>手机：</span>
          {{shops.phone}}
        </p>
        <p>
          <span>联系地址：</span>
          {{shops.address}}
        </p>
      </div>
      <div class="company-introduce">
        <p>{{shops.intro}}</p>
      </div>
      <div class="shop-show">
        <div class="shop-box">
          <div class="shop-item" v-for="(item,index) in shops.shops" :key="index">
            <img :src="item.img[0]" alt />
            <div class="shop-price">
              <p>
                <span>{{formatPrice(item.price)}}</span>起
              </p>
            </div>
            <p>
              <span>{{item.title}}</span>
            </p>
          </div>
        </div>
      </div>
      <div class="btn-box">
        <el-button type="primary" @click="back">返回</el-button>
      </div>
    </div>
  </div>
</template>

<script>
//import x from ''
export default {
  components: {},
  data() {
    return {
      shopImg: require("../../assets/img/222.png"),
      shops: {}
    };
  },
  computed: {},
  methods: {
    back() {
      this.$router.go(-1);
    },
    formatPrice(str) {
      return parseFloat(str).toFixed(2);
    }
  },
  created() {
    this.shops = this.$route.query.shops;
    console.log(this.shops);
  }
};
</script>

<style lang='scss' scoped>
//@import url()
.create-box {
  width: 1000px;
  margin: 0 auto;
  .company-name {
    text-align: center;
    margin: 50px 0;
  }
  .company-linkman {
    display: flex;
    justify-content: space-between;
    margin: 20px 0;
    span {
      font-weight: 600;
    }
  }
  .company-introduce {
    text-indent: 2em;
    margin: 20px 0;
  }
  .shop-box {
    border: 1px solid #e6e6e6;
    padding: 15px 20px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .shop-item {
      margin-bottom: 20px;
      margin-right: 10px;
      position: relative;
      .shop-price {
        position: absolute;
        bottom: 20px;
        left: 0;
        color: #fff;
        span {
          color: red;
          font-size: 16px;
          display: inline-block;
          padding: 0 5px;
          font-weight: 600;
        }
      }
    }
    img {
      width: 140px;
      height: 180px;
    }
    p {
      font-size: 12px;
      width: 140px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      input {
        vertical-align: middle;
      }
    }
  }
  .btn-box {
    text-align: center;
    margin: 20px 0;
    button {
      width: 200px;
    }
  }
}
</style>