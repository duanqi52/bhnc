<template>
  <div id="bhncPur_details">
    <div class="order-list">
      <p class="order_title">{{details.title}}</p>
      <div class="weitu">
        <div class="weitu_xiang">
          <!-- <div style="margin-bottom: 50px;font-size: 18px;font-weight: 400;color: rgba(102,102,102,1);">
              <span>商品单价: {{details.price}} 元</span>
              <span style="margin-left: 80px;">供应数量：{{details.count}}</span>
          </div>-->
          <div class="tableDetails" style=" width: 70%;margin-bottom: 34px; border:1px solid #f0f0f0;border-bottom:none;">
            <template>
              <el-table :data="detailsList" style="width: 100%" >
                <el-table-column prop="price" label="商品单价"></el-table-column>
                <el-table-column prop="count" label="供应数量"></el-table-column>
                <el-table-column prop="date" label="发布时间"></el-table-column>
                <el-table-column prop="look_count" label="查看次数"></el-table-column>
                <el-table-column prop="last_date" label="最后一次查看"></el-table-column>
                <el-table-column  label="状态">
                    <template slot-scope="scope">{{scope.row.status == '0'?"待审核":""}}{{scope.row.status == '1'?"已发布":""}}{{scope.row.status == '2'?"已驳回":""}}</template>
                </el-table-column>
              </el-table>
            </template>
          </div>
          <p>{{details.content}}</p>
          <img :src="item" alt v-for="(item,index) in details.imgs" :key="index" />
        </div>
        <div style="text-align: center;">
          <el-button style="margin: 100px;" @click="purchase" type="warning">返回</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import url from "../../serverAPI.config.js";
export default {
  data() {
    return {
      content: "",
      username: "",
      details: {},
      detailsList: []
    };
  },
  components: {},
  mounted() {
    this.username = localStorage.getItem("username") || localStorage.getItem("siteName");
    this.supplyInfoDetails(this.$route.query.id);
  },
  methods: {
    purchase() {
      this.$router.go(-1);
    },
    supplyInfoDetails(id) {
      this.$http({
        url: `${url.supplyInfoDetails}/${id}`,
        method: "get"
      }).then(res => {
        if (res.data.code == 20000) {
          this.details = res.data.data;
          this.details.imgs = JSON.parse(this.details.imgs);
          this.detailsList.push(this.details);
        }
      });
    },
    isE(array, item) {
      var i1 = null;
      for (var i = 0; i < array.length; i++) {
        if (item.pid == array[i].pid) {
          i1 = i;
        }
      }
      return i1;
    },
    //时间格式转化
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
<style lang="scss">
#bhncPur_details {
  .el-table__footer-wrapper,
  .el-table__header-wrapper {
    overflow: hidden;
    box-shadow: 0px 1px 8px 0px rgba(0, 0, 0, 0.12);
  }

.el-table th>.cell{
    font-size:16px;
font-family:Microsoft YaHei;
font-weight:400;
color:rgba(153,153,153,1);
text-align: center;
}
.el-table .cell {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    white-space: normal;
    word-break: break-all;
    line-height: 23px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(102,102,102,1);
    text-align: center;
}
}
</style>

<style lang="scss" scoped>
#bhncPur_details {
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
    width: 1500px;
    margin: 0 auto;
    padding-bottom: 30px;
  }
  .order_title {
    height: 68px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.04);
    line-height: 68px;
    font-size: 18px;
    font-weight: bold;
    color: rgba(102, 102, 102, 1);
    padding-left: 50px;
    border-bottom: 1px solid rgb(240, 240, 240);
  }
  .title_heade {
    font-size: 15px;
    font-family: MicrosoftYaHei,微软雅黑;
    font-weight: bold;
    color: #333333;
    padding-top: 30px;
    margin-bottom: 20px;
  }
  .title_home {
    position: relative;
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    color: #fc9263;
    padding-top: 35px;
  }
  .title_home::after {
    position: absolute;
    top: 75%;
    right: 29%;
    width: 250px;
    height: 2px;
    background: #fc9263;
    display: inline-block;
    content: "";
  }
  .title_home::before {
    position: absolute;
    top: 75%;
    left: 29%;
    width: 250px;
    height: 2px;
    background: #fc9263;
    display: inline-block;
    content: "";
  }
  .clarification {
    background-color: #ffffff;
    padding: 37px;
    box-shadow: 0px 3px 4px 0px rgba(0, 0, 0, 0.02);
    line-height: 25px;
    span {
      color: #666666;
      font-weight: bold;
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
    padding: 70px;
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