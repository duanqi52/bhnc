<!-- 组件说明 -->
<template>
  <div class="myBrand">
    <div class="myBrandTitle clearfix">
      <h4>我的品牌</h4>
    </div>
    <div class="myBrandContent">
      <ul>
        <li v-for="(item,index) in brandAuditList" :key="index">
          <div class="brandLeft">
            <img :src="item.logo_img" alt />
          </div>
          <div class="brandRight">
            <div class="brandDetail">
              <ul>
                <li>
                  <span>品牌名称:</span>
                  {{item.brand_name}}
                </li>
                <li>
                  <span>商标号：{{item.brand_mark}}</span>
                  <span>拥有方式：{{item.own_way=='0'?'商标持有人':''}}{{item.own_way=='1'?'商标授权—商标许可授权':''}}{{item.own_way=='2'?'商标授权—商标使用授权':''}}</span>
                </li>
                <li>
                  <span>注册人：{{item.registrant}}</span>
                  <span>注册时间：{{item.brand_registrant_date}}</span>
                  <span>有限期至：{{item.brand_valid_date}}</span>
                </li>
                <li>
                  <span>商标证书：</span>

                  <img :src="img" v-for="(img,index) in item.brand_certificate_img" :key="index" />
                </li>
                <li>
                  <span style="padding:0;">商标授权证明：</span>
                  <img :src="img" v-for="(img,index) in item.brand_authorization_img" :key="index" />
                </li>
              </ul>
            </div>
            <div class="brandBtn">
              <input
                type="button"
                value="编辑"
                v-if="item.status != 0"
                @click="$router.push('/addBrand?id='+item.id)"
              />
              <input type="button" value="审核中" v-else style="background:#BFBFBF" />
              <input
                type="button"
                value="删除"
                @click="deleteBrandAudit(item.id)"
                style="background:#D21D27"
              />
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="addBrandBox">
      <div class="addBrandInnerBox" @click="$router.push('/addBrand')">
        <i class="iconfont icon-tianjia"></i>
        <span>添加品牌</span>
      </div>
    </div>
  </div>
</template>

<script>
import url from "@/serverAPI.config.js";
//import x from ''
export default {
  components: {},
  data() {
    return {
      id: "",
      brandAuditList: []
    };
  },
  computed: {},
  created() {
    this.id = localStorage.getItem("ID");
    this.findBrandAudits();
  },
  methods: {
    findBrandAudits() {
      this.$http({
        url: `${url.findBrandAudits}/${this.id}`,
        method: "get"
      }).then(res => {
        if (res.data.code == 20000) {
          var data = res.data.data;
          data.map(item => {
            item.brand_authorization_img = JSON.parse(
              item.brand_authorization_img
            );
            item.brand_certificate_img = JSON.parse(item.brand_certificate_img);
            item.brand_registrant_date = this.formatDate(
              item.brand_registrant_date
            );
            item.brand_valid_date = this.formatDate(item.brand_valid_date);
          });
          this.brandAuditList = data;         
        }
      });
    },

    deleteBrandAudit(id) {
      this.$confirm("是否删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      }).then(() => {
        this.$http({
          url: `${url.deleteBrandAudit}/${id}`,
          method: "delete"
        }).then(res => {
          if (res.data.code == 20000) {
            this.findBrandAudits();
          }
        });
      });
    },
    formatDate(date) {
      var time = new Date(date);
      var timeStr =
        time.getFullYear() +
        " 年 " +
        (time.getMonth() + 1) +
        " 月 " +
        time.getDate() +
        " 日 ";
      return timeStr;
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
.myBrand {
  // 头部样式
  .myBrandTitle {
    padding-left: 48px;
    padding-right: 24px;
    height: 68px;
    line-height: 68px;
    background-color: #fff;
    box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.04);
    border-bottom: 5px solid #f0f0f0;
    h4 {
      font-size: 20px;
      font-family: MicrosoftYaHeiLight;
      font-weight: bold;
      color: rgba(102, 102, 102, 1);
    }
    input {
      width: 80px;
      height: 32px;
      background: rgba(252, 146, 99, 1);
      border-radius: 4px;
      font-size: 14px;
      font-family: MicrosoftYaHei,微软雅黑;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      cursor: pointer;
    }
  }
  //   内容样式
  .myBrandContent {
    > ul {
      > li {
        display: flex;
        padding-top: 24px;
        padding-left: 34px;
        border-bottom: 2px rgba(208, 208, 208, 0.48) solid;
        padding-bottom: 14px;
        margin: 0 10px;
        .brandLeft {
          width: 200px;
          height: 200px;
          margin-right: 28px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .brandRight {
          flex: 1;
          display: flex;
          .brandDetail {
            flex: 1;
            > ul {
              > li {
                display: flex;
                border-bottom: 1px #eaeaea solid;
                padding: 20px 10px;
                font-size: 16px;
                font-family: MicrosoftYaHei,微软雅黑;
                font-weight: 400;
                color: rgba(51, 51, 51, 1);
                > span {
                  padding: 0 10px;
                }
              }
              > li:nth-last-child(1) {
                border-bottom: none;
              }
              > li:nth-child(2) {
                display: flex;
                span:nth-child(1) {
                  flex: 1;
                }
                span:nth-child(2) {
                  flex: 2;
                }
              }
              > li:nth-child(3) {
                display: flex;
                span {
                  flex: 1;
                }
              }
              li:nth-child(4) {
                img {
                  width: 100px;
                  height: 120px;
                  margin-right: 20px;
                  border: #b2b2b2 1px solid;
                }
              }
              li:nth-child(5) {
                img {
                  width: 100px;
                  height: 120px;
                  margin-right: 20px;
                  border: #b2b2b2 1px solid;
                }
              }
            }
          }
          .brandBtn {
            width: 200px;
            input[type="button"] {
              width: 80px;
              height: 32px;
              background: rgba(252, 146, 99, 1);
              border-radius: 4px;
              margin-right: 12px;
              font-size: 12px;
              font-family: MicrosoftYaHei,微软雅黑;
              font-weight: 400;
              color: rgba(255, 255, 255, 1);
              cursor: pointer;
            }
            > li:last-child(1) {
              border-color: #d0d0d0;
            }
          }
        }
      }
    }
  }
  //   添加品牌
  .addBrandBox {
    padding-top: 20px;
    padding-right: 40px;
    padding-bottom: 150px;
    .addBrandInnerBox {
      cursor: pointer;
      float: right;
      width: 182px;
      height: 46px;
      line-height: 46px;
      text-align: center;
      background: rgba(236, 170, 151, 0.12);
      border: 1px solid rgba(236, 170, 151, 0.6);
      border-radius: 12px;
      font-size: 20px;
      font-family: MicrosoftYaHeiLight;
      font-weight: 300;
      color: rgba(252, 146, 99, 1);
      .icon-tianjia {
        font-size: 22px;
        padding-right: 17px;
      }
    }
  }
}
</style>