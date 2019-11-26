<!-- 组件说明 -->
<template>
  <div id="bhncIntegral">
    <div class="integral">
      <div class="bg_ji">
        <div class="integral-msg">
          <p>
            <span class="yuan_ji">v{{level}}</span>
            <br />
            <span>会员等级：{{level}}</span>
            <span>
              <img
                :src="question"
                alt
                width="20"
                style="cursor: pointer;"
                @mouseenter="visible"
                @mouseleave="invisible"
              />
            </span>
            <el-button type="primary" size="mini" plain @click="gotoUp()">升级为超级会员</el-button>
          </p>
          <p>
            <span class="yuan_ji_a">{{integral}}</span>
            <br />
            <span>我的积分:</span>
            <el-button type="primary" size="mini" plain @click="$router.push('/recharge')">充值</el-button>
          </p>
        </div>
        <div class="vip-explain" v-show="vipExplain" style="display:block;">
          <p>的方式广东佛山感豆腐干地方郭德纲的风格和的风格后端返回国防和规范和规范和返回</p>
        </div>
        <div class="clearfix">
          <div class="record">积分使用记录</div>
          <div class="searchBox">
            <div class="inputBox">
              <input type="text" placeholder="请输入内容" class="searchInput" v-model="input" />
              <i class="el-icon-search" @click="currentPage=1;searchIntegral()"></i>
            </div>
          </div>
        </div>
      </div>
      <!-- 积分使用表格 -->
      <div class="integral-text">
        <el-table
          :data="integralList"
          :header-cell-style="{background:'#eef1f6',color:'#606266',fontWeight:'bold'}"
          stripe
          style="width: 100%"
        >
          <el-table-column prop="way" label="方式" align="center"></el-table-column>
          <el-table-column prop="score" label="分数" align="center"></el-table-column>
          <el-table-column prop="details" label="情况" align="center"></el-table-column>
          <el-table-column prop="date" label="时间" align="center"></el-table-column>
        </el-table>
      </div>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 20, 40]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        style="text-align: center;margin: 30px;"
      ></el-pagination>
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
      searchMap: {
        all: "1"
      },
      question: require("../../assets/img/question.png"),
      vipExplain: false,
      integralList: [],
      currentPage: 1, //初始页
      pagesize: 10, //    每页的数据
      total: 0,
      integral: 0,
      level: 0,
      input: ""
    };
  },
  methods: {
    //初始化currentPage,初始每页数据pagesize和数据data
    handleSizeChange(size) {
      this.pagesize = size;
      this.getIntegral(this.currentPage, this.pagesize);
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage; // 点击第几页
      this.getIntegral(this.currentPage, this.pagesize);
    },
    getIntegral(page, size) {
      this.$http
        .post(`${url.getIntegral}/${page}/${size}`, this.searchMap)
        .then(res => {
          if (res.status == 200) {
            console.log(res.data.data);
            this.integralList = res.data.data.data.rows;
            this.integralList.map(item => {
              item.way = item.way == "1" ? "增值" : "消费";
            });
            this.total = res.data.data.data.total;
            this.level = res.data.data.currentLevel;
            this.integral = res.data.data.currentIntegral;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 改变状态
    /*
            formatRole(row, column) {
                return row.statusWay == '1' ? "增值" : (row.way == '0' ? "消费")
            },
                */
    searchIntegral() {
      if (this.input) {
        this.searchMap = {
          way: this.input,
          score: this.input,
          details: this.input
        };
      } else {
        this.searchMap = {
          all: "1"
        };
      }
      this.getIntegral(this.currentPage, this.pagesize);
    },
    visible() {
      this.vipExplain = true;
    },
    invisible() {
      this.vipExplain = false;
    },
    gotoUp() {
      this.$router.push("/upVip");
    }
  },
  created() {
    this.getIntegral(this.currentPage, this.pagesize);
  }
};
</script>

<style lang='scss' scoped>
//@import url()
#bhncIntegral {
  .integral {
    .integral-msg {
      // display: flex;
      // justify-content: space-evenly;
      // align-items: center;
      text-align: center;
      padding-top: 100px;
      p {
        display: inline-block;
        margin-right: 10%;
        span {
          font-weight: 600;
          font-size: 18px;
        }
      }
    }
    .vip-explain {
      width: 200px;
      height: 200px;
      box-shadow: 0px 0px 10px 5px #aaa;
      background: #fff;
      padding: 15px;
      font-size: 12px;
      line-height: 25px;
      position: absolute;
      top: 330px;
      right: 1126px;
      z-index: 8888;
      border-radius: 20px;
    }
    .search {
      text-align: center;
      height: 50px;
      line-height: 50px;
      margin: 20px 0;
      input {
        width: 315px;
        height: 35px;
        border: 1px solid #e6e6e6;
        padding-left: 15px;
      }
    }
  }
  // 搜索框内容
  .searchBox {
    float: right;
    display: flex;
    .inputBox {
      display: flex;
      width: 460px;
      height: 40px;
      line-height: 40;
      padding: 0 20px;
      border: 1px solid rgba(61, 145, 231, 1);
      border-radius: 8px;
      margin-right: 17px;
      .searchInput {
        width: 95%;
        font-size: 14px;
      }
      i {
        display: inline-block;
        width: 24px;
        height: 24px;
        padding-top: 7px;
        cursor: pointer;
        font-size: 24px;
      }
    }
  }
  .clearfix {
    margin-top: 57px;
  }
  .record {
    width: 198px;
    height: 42px;
    display: inline-block;
    border: 1px solid #cceeff;
    font-size: 14px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: #3d91e7;
    text-align: center;
    line-height: 42px;
    background-color: white;
  }
  .bg_ji {
    background: url("../../../static/img/integralBac@.png") center;
    background-size: 100%;
    height: 350px;
  }
  .yuan_ji {
    background: #3d91e7;
    color: white;
    border-radius: 50%;
    padding: 15px;
    border: 10px solid #cceeff;
    font-size: 45px !important;
    margin-bottom: 20px;
    display: inline-block;
    min-width: 50px;
    min-height: 50px;
  }
  .yuan_ji_a {
    min-width: 50px;
    min-height: 50px;
    text-align: center;
    line-height: 50px;
    background: #3d91e7;
    color: white;
    border-radius: 50%;
    padding: 16px;
    border: 10px solid #cceeff;
    font-size: 20px !important;
    margin-bottom: 20px;
    display: inline-block;
  }
}
</style>