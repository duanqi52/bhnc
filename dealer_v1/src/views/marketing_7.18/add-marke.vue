<!-- 组件说明 -->
<template>
  <div class="add-marke">
    <div class="add-makebox">
      <div class="add-title">
        <p>增加商品</p>
        <div class="search-box">
          <el-input v-model="makeValue" style="width:80%;"></el-input>
          <el-button type="primary">搜索</el-button>
        </div>
      </div>
      <div class="make-content">
        <div class="search-title">
          所有商品
          <span>(请勾选您选中的商品)</span>
        </div>
        <div class="shop-box">
          <div class="shop-item" v-for="(item,index) in goodsList" :key="index">
            <label class="shop-img" :for="`addShop` + index">
              <img :src="item.img[0]" alt />
            </label>
            <div class="shop-price">
              <p>
                <span>{{formatPrice(item.price)}}</span>起
              </p>
            </div>
            <p>
              <input type="checkbox" @click="selectGoods($event,item.id)" :id="`addShop` + index" />
              <span>{{item.title}}</span>
            </p>
          </div>
        </div>
        <div class="btn-box">
          <el-button type="primary" @click="postShop">确定</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import x from ''
import url from "../../serverAPI.config.js";
export default {
  components: {},
  data() {
    return {
      makeValue: "",
      goodsList: [],
      goodsIdList: []
    };
  },
  computed: {},
  methods: {
    getMarketingGoods() {
      this.$http
        .get(`${url.getMarketingToolGoods}/${localStorage.getItem("siteName")}`)
        .then(res => {
          if (res.data.code == 20000) {
            this.goodsList = res.data.data;
            this.goodsList.map(item => {
              item.img = JSON.parse(item.img);
            });
          }
        });
    },
    postShop() {
      this.$http({
          url:`${url.saveMarketingToolGoods}/${localStorage.getItem("siteName")}`,
          method:'post',
          data:this.goodsIdList
      }).then(res => {
        if (res.data.code == 20000) {
           this.$router.push("marketing");
        }else{
            this.$message.error(res.data.message);
        }
      });
     
    },
    selectGoods(event, id) {
      if (event.target.checked) {
        this.goodsIdList.push(id);
      } else {
        this.goodsIdList.splice(this.goodsIdList.indexOf(id), 1);
      }
    },
    formatPrice(str) {
      return parseFloat(str).toFixed(2);
    }
  },
  created() {
    this.getMarketingGoods();
  }
};
</script>

<style lang='scss' scoped>
//@import url()
.add-makebox {
  padding: 15px 5px;
  .add-title {
    p {
      text-align: center;
      font-weight: 600;
      font-size: 20px;
      padding: 25px 0;
    }
    div {
      width: 800px;
      margin: 0 auto;
    }
  }
  .make-content {
    width: 100%;
    height: 45px;
    background: #e6e6e6;
    margin: 15px 0;

    padding: 0 15px;
    .search-title {
      font-weight: 600;
      line-height: 45px;
      span {
        font-weight: normal;
        font-size: 12px;
      }
    }
  }
  .shop-box {
    border: 1px solid #e6e6e6;
    padding: 15px 20px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .shop-item {
      margin-bottom: 50px;
      margin-right: 10px;
      position: relative;
      .shop-img {
        width: 140px;
        height: 180px;
        object-fit: cover;
        overflow: hidden;
        display: inline-block;
      }
      .shop-price {
        position: absolute;
        bottom: 27px;
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
    margin: 25px 0;
    button {
      width: 200px;
    }
  }
}
</style>