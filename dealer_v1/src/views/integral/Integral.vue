<!-- 组件说明 -->
<template>
  <div id="bhncIntegral">
    <div class="integral">
      <div class="bg_ji">
        <div class="integral-msg">
          <h4 style="font-size:24px;color:rgba(252,146,99,1);text-align: left;text-indent: 37px;margin-top: 33px;">我的积分</h4>
          <p>
            <span>{{integral}}</span>
          </p>
        </div>
        <div class="integral-msg_a">
          <div class="title_msg_a">积分介绍</div>
          <p>笔海弄潮积分系统是笔海弄潮平台会员服务的重要内容。您不仅可以通过参与线上、线下活动、开通会员、充值、分享好友等多张方式快速获得会员积分，还可以随心所欲的使用积分来享受平台所提供的各种增值服务。会员积分可以用于在平台中查看采购商和供应商的信息，为您提供更及时高效的商机。</p>
        </div>
      </div>
      <!-- 积分使用表格 -->
      <div style="padding: 22px;">
        <div class="clearfix">
          <div class="record">记录列表</div>
          <div class="searchBox">
            <div class="inputBox">
              <input type="text" placeholder="请输入内容" class="searchInput" v-model="input" />
              <i class="el-icon-search" @click="currentPage=1;searchIntegral()"></i>
            </div>
          </div>
        </div>
        <div class="integral-text">
          <el-table
            :data="integralList"
            :header-cell-style="{background:'white',color:'#606266',fontWeight:'bold'}"
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
  </div>
</template>

<script>
//import x from ''
import url from "@/serverAPI.config.js";
import { log } from 'util';
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
            this.integralList = res.data.data.data.rows;
            this.integralList.map(item => {
              item.way = item.way == "1" ? "增值" : "消费";
            });
            this.total = res.data.data.data.total;
            this.level = res.data.data.current_level;               
            this.integral = res.data.data.current_integral;
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
      text-align: center;
      width: 34%;
      display: inline-block;
      background: url("../../../static/img/Integral_bg.png") no-repeat;
      background-size: 100% 320px;
      height: 320px;
      float: left;
      p {
        display: inline-block;
        span {
          font-size: 48px;
          font-family: Adobe Heiti Std R;
          font-weight: normal;
          color: rgba(252, 146, 99, 1);
          margin-top: 50px;
          display: inline-block;
        }
      }
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
      border: 1px solid #FC9263;
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
        color: #FC9263;
      }
    }
  }
  .integral-text{
    border: 1px solid rgba(240,240,240,1);
  }
  .clearfix {
    margin-bottom: 20px;
  }
  .record { 
    display: inline-block;
    text-align: center;
    font-size:20px;
    font-family:MicrosoftYaHeiLight;
    font-weight: bold;
    color: #666666;
    margin-top: 8px;
    margin-left: 26px;
  }
  .bg_ji {
    height: 330px;
    background-color: #eeeeee;
  }
  .integral-msg_a {
    background: url("../../../static/img/official_bg.png") no-repeat;
    background-size: cover;
    height: 320px;
    display: inline-block;
    width: 65.5%;
    float: right;
    .title_msg_a {
      font-size: 20px;
      font-family: MicrosoftYaHeiLight;
      font-weight: bold;
      color: rgba(102, 102, 102, 1);
      text-indent: 49px;
      margin-top: 34px;
    }
    p {
      font-size: 16px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      width: 82%;
      margin: 20px auto;
      height: 136px;
    }
  }
}
</style>