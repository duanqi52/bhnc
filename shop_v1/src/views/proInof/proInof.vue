<template>
  <div id="bhncProInof">
    <div class="hadeer_tou">
      <div class="hadeer_tou_can cans" style="color: #D22D36;background-color: white;">
        <!-- <span style="margin-left: 40px;">交货周期：</span> -->
        <!-- <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>-->
        <!-- <span style="margin-left: 40px;border-left: 1px dashed black;padding-left: 40px;">周期：</span> -->
        <!-- <div class="period">
          <el-date-picker
            v-model="filtrate.times"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="mini"
            clearable
          ></el-date-picker>
        </div>-->
        <!-- <span style="margin-left: 40px;border-left: 1px dashed black;padding-left: 40px;">关键词：</span> -->
        <span style="padding-left: 40px;">关键词：</span>
        <div class="header_search">
          <el-input placeholder="请输入内容" v-model="input" clearable></el-input>
        </div>
        <div class="header_search_wei">
          <button class="saixuan" @click="currentPage=1;search()">筛选</button>
        </div>
      </div>
    </div>
    <div class="hadeer_tou_can">
      <ul class="purchaseOrder">
        <li
          class="purchaseOrder_list"
          v-for="(supplyInfo,index) in supplyInfoList"
          :key="index"
          @click="toProInofDetail(supplyInfo.id)"
        >
          <p class="purchaseOrder_left_a">{{supplyInfo.title}}</p>
          <div class="purchaseOrder_left">
            <p class="purchaseOrder_left_b">{{supplyInfo.content}}</p>
          </div>
          <div class="company">
            <span class="company_a">
              <i class="iconfont icon-shangjia" style="font-size: 20px;margin-right: 10px;"></i>
              {{supplyInfo.c_name}}
            </span>
            <span class="company_b">{{supplyInfo.date}}</span>
          </div>
        </li>
      </ul>
    </div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[20, 40, 60, 80]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      style="border-bottom: 1px solid #f2f2f2;text-align: center;padding: 30px;width: 1200px;margin: 0 auto;background-color: white;"
    ></el-pagination>
  </div>
</template>
<script>
import url from "@/serverAPI.config.js";
import popup from "../../components/popup/popup.vue";
export default {
  metaInfo: {
    title: "笔海弄潮——制笔行业企业上云综合服务平台", // set a title
    meta: [
      {
        // set meta
        name: "keyWords",
        content:
          "制笔行业、制笔厂家、礼品笔、学生笔、中性笔、圆珠笔、钢笔、墨水、笔芯、制笔机械及零部件；"
      },
      {
        name: "description",
        content:
          "笔海弄潮，连接制笔行业采购商和供应商的智慧化数字平台，帮制笔行业采购商寻找各种笔类产品，帮制笔行业厂家寻找各类采购商，为厂商企业管理提供企业上云的管理服务。"
      }
    ]
  },
  data() {
    return {
      img_url: "../../../static/img/floor-1-b02.png",
      filtrate: {
        times: ""
      },
      input: "",
      show3: false,
      checkAll: false,
      checkedCities: [],
      isIndeterminate: true,
      cities: [],
      currentPage: 1, //初始页
      pagesize: 20, //初始页条数
      total: 0,
      searchMap: {
        id: "",
        title: "",
        type: "",
        delivery_date: "",
        send_date: "-",
        offer_count: "",
        last_date: "",
        message: "",
        p_id: "",
        status: "1",
        status: "1"
      },
      updateCount: 0,
      pageNo: 1,
      start: true,
      end: false,
      data: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1",
              children: [
                {
                  id: 9,
                  label: "三级 1-1-1"
                },
                {
                  id: 10,
                  label: "三级 1-1-2"
                }
              ]
            },
            {
              id: 4,
              label: "二级 1-1",
              children: [
                {
                  id: 9,
                  label: "三级 1-1-1"
                },
                {
                  id: 10,
                  label: "三级 1-1-2"
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: "一级 2",
          children: [
            {
              id: 5,
              label: "二级 2-1"
            },
            {
              id: 6,
              label: "二级 2-2"
            }
          ]
        },
        {
          id: 3,
          label: "一级 3",
          children: [
            {
              id: 7,
              label: "二级 3-1"
            },
            {
              id: 8,
              label: "二级 3-2"
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      },
      activeNames: "",
      options: [
        {
          value: "1",
          label: "随时"
        },
        {
          value: "2",
          label: "限时交货"
        }
      ],
      value: "",
      supplyInfoList: []
    };
  },
  components: {
    popup
  },
  created() {
    this.search(this.currentPage, this.pagesize);
    this.getScope();
  },
  updated() {
    this.start = true;
    // setInterval(() => {
    //   if (this.start) {
    //     this.judge();
    //   }
    // }, 10);
  },
  methods: {
    //进入详情页
    toProInofDetail(id) {
      this.$router.push("/proInofDetail?id=" + id);
    },
    //初始化currentPage,初始每页数据pagesize和数据data
    handleSizeChange(size) {
      this.pagesize = size;
      this.search(this.currentPage, this.pagesize);
      window.scrollTo(0, 0);
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage; // 点击第几页
      this.search(this.currentPage, this.pagesize);
      window.scrollTo(0, 0);
    },
    handleCheckAllChange(val) {
      if (val) {
        this.cities.map(item => {
          this.checkedCities.push(item.name);
        });
      } else {
        this.checkedCities = [];
      }

      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
    },
    searchSupplyInfo(page, size) {
      this.$http({
        url: `${url.searchSupplyInfo}/${page}/${size}`,
        data: this.searchMap,
        method: "post"
      }).then(res => {
        if (res.data.code == 20000) {
          this.supplyInfoList = res.data.data.rows;
          for (var i = 0; i < this.supplyInfoList.length; i++) {
            this.supplyInfoList[i].date = this.resolvingDate(
              this.supplyInfoList[i].date
            );
            var reg = /^([\u4e00-\u9fa5\w\d]{2})([\u4e00-\u9fa5\w\d]*)([\u4e00-\u9fa5]{2})$/;
            var str = this.supplyInfoList[i].c_name;
            if (str)
              str = str.replace(reg, function(a, b, c, d) {
                return b + c.replace(/[\u4e00-\u9fa5\w\d]/g, "*") + d;
              });
            this.supplyInfoList[i].c_name = str;
          }
          this.total = res.data.data.total;
          this.updateCount = 0;
        }
      });
    },
    //时间格式转化
    resolvingDate(date) {
      var dateee = new Date(date).toJSON();
      return new Date(+new Date(dateee) + 16 * 3600 * 1000)
        .toISOString()
        .replace(/T/g, " ")
        .replace(/\.[\d]{3}Z/, "");
    },
    search() {
      if (this.input == "" || !this.input) {
        this.searchMap.title = this.input;
        this.searchMap.send_date = "-";
      } else {
        this.searchMap.send_date = "";
        this.searchMap.title = this.input;
      }
      if (this.filtrate.times) {
        this.searchMap.startDate = this.resolvingDate(this.filtrate.times[0]);
        this.searchMap.endDate = this.resolvingDate(this.filtrate.times[1]);
      } else {
        this.searchMap.startDate = "";
        this.searchMap.endDate = "";
      }

      this.searchSupplyInfo(this.currentPage, this.pagesize);
    },
    typeSearch() {
      this.searchMap.typeList = JSON.stringify(this.checkedCities);
      this.search();
    },
    selectImg() {
      if (this.updateCount > 0) {
        return;
      }
      var data = JSON.parse(JSON.stringify(this.supplyInfoList));
      for (var i = 0; i < data.length; i++) {
        var imgParent = document.getElementById("img" + i);
        if (imgParent) {
          var imgs = imgParent.getElementsByTagName("img");
          for (var j = 0; j < imgs.length; j++) {
            if (imgs[j]) {
              data[i].imgs.push(imgs[j].src);
            }
          }

          var ps = imgParent.getElementsByTagName("p");

          for (var j = 0; j < ps.length; j++) {
            if (ps[j]) {
              data[i].content += ps[j].innerText;
            }
          }
          this.supplyInfoList = data;
          this.updateCount++;
        }
      }
    },

    //获取经营范围
    getScope() {
      this.$http({
        url: `${url.scope}`,
        method: "get"
      })
        .then(res => {
          this.cities = res.data.data;
        })
        .catch(err => {});
    },
    judge() {
      if (
        document.documentElement.scrollTop + document.body.clientHeight >
        document.body.scrollHeight - 100
      ) {
        this.loadMore();
      }
    },

    loadMore() {
      this.start = false;
      if (this.end) {
        return;
      }
      this.pageNo++;
      if (this.input == "" || !this.input) {
        this.searchMap.title = this.input;
        this.searchMap.send_date = "-";
      } else {
        this.searchMap.send_date = "";
        this.searchMap.title = this.input;
      }
      if (this.filtrate.times) {
        this.searchMap.startDate = this.resolvingDate(this.filtrate.times[0]);
        this.searchMap.endDate = this.resolvingDate(this.filtrate.times[1]);
      } else {
        this.searchMap.startDate = "";
        this.searchMap.endDate = "";
      }

      this.$http({
        url: `${url.searchSupplyInfo}/${this.pageNo}/${this.pagesize}`,
        data: this.searchMap,
        method: "post"
      }).then(res => {
        if (res.data.code == 20000) {
          var supplyInfoList = res.data.data.rows;
          for (var i = 0; i < supplyInfoList.length; i++) {
            supplyInfoList[i].date = this.resolvingDate(supplyInfoList[i].date);
          }
          if (supplyInfoList.length == 0) {
            this.end = true;
          }
          this.supplyInfoList = this.supplyInfoList.concat(supplyInfoList);
          this.updateCount = 0;
          console.log(res.data.data);
          this.total = res.data.data.total;
        }
      });
    }
  }
};
</script>
<style lang="scss">
.el-pager li.active {
  color: #d21d27 !important;
}
.el-pager li:hover {
  color: #d21d27 !important;
}
#bhncProInof {
  .cans .el-input__inner {
    height: 28px !important;
    border: 1px solid rgba(102, 102, 102, 1);
    width: 120px;
    line-height: 28px;
  }
  .period .el-input__inner {
    height: 28px !important;
    border: 1px solid rgba(102, 102, 102, 1);
    width: 220px;
  }
  #triangle-bottomright {
    width: 0;
    height: 0;
    border-bottom: 10px solid red;
    border-left: 10px solid transparent;
    display: inline-block;
    position: absolute;
    right: 0;
    bottom: 0;
  }
  .classify_s .el-tree-node {
    width: 160px;
    display: inline-grid;
  }
  .tangchu .el-collapse-item__header {
    font-size: 16px;
    font-weight: bold;
    color: rgba(61, 145, 231, 1);
  }
}
</style>

<style lang="scss" scoped>
.purchaseOrder_right {
  display: inline-block;
  overflow: hidden;
  width: 20%;
  position: absolute;
  right: 50px;
  top: 50%;
  transform: translateY(-50%);
  .branch {
    display: inline-block;
    text-align: center;
    font-size: 15px;
    font-family: MicrosoftYaHei-Bold, 微软雅黑;
    font-weight: bold;
    color: #fc7236;
    margin-right: 20px;
  }
  .day {
    display: inline-block;
    text-align: center;
    font-family: MicrosoftYaHei-Bold, 微软雅黑;
    font-weight: bold;
    color: #fc7236;
    font-size: 15px;
  }
  .quote {
    display: inline-block;
    cursor: pointer;
    width: 170px;
  }
}

.company {
  height: 40px;
  line-height: 30px;
  .company_a {
    font-size: 16px;
    font-family: MicrosoftYaHei-Bold, 微软雅黑;
    font-weight: bold;
    color: rgba(102, 102, 102, 1);
    margin-left: 34px;
  }
  .company_b {
    font-size: 12px;
    font-family: MicrosoftYaHei, 微软雅黑;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    margin-left: 50px;
  }
}
.purchaseOrder {
  .purchaseOrder_list {
    position: relative;
    box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.1);
    min-height: 120px;
    background-color: white;
    margin-bottom: 8px;
    cursor: pointer;
    .purchaseOrder_left {
      display: block;
      min-height: 110px;
      position: relative;
    }
    .purchaseOrder_left_a {
      text-overflow: ellipsis; //文字溢出隐藏多余的 ... 代替
      overflow: hidden; //文字溢出隐藏
      white-space: nowrap; //关于文字内容溢出
      font-weight: bold;
      padding: 18px 34px;
      box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.06);
    }
    .purchaseOrder_left_b {
      font-size: 16px;
      font-family: MicrosoftYaHei, 微软雅黑;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3; //这里是在第二行有省略号
      overflow: hidden;
      width: 70%;
      padding-left: 34px;
      line-height: 30px;
      margin-top: 30px;
    }
    .purchaseOrder_left_img {
      margin-bottom: 35px;
      li {
        display: inline-block;
        margin-right: 30px;
      }
      img {
        width: 120px;
        height: 120px;
      }
    }
  }
}
.but_que {
  display: flex;
  justify-content: space-evenly;
  margin: 20px 0 10px 0;
}

.tangchu {
  margin-top: 20px;
  position: absolute;
  left: 80px;
  top: 23px;
  max-width: 600px;
  display: inline-block;
  z-index: 999;
  background-color: white;
}
.hadeer_tou {
  height: 70px;
  line-height: 70px;
  margin-bottom: 8px;
  margin-top: 5px;
}
.hadeer_tou_can {
  width: 1200px;
  margin: 0 auto;
  position: relative;
  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.12);
}
.classify {
  margin-left: 80px;
  position: relative;
  cursor: pointer;
  .classify_a {
    width: 50px;
    text-align: center;
    display: inline-block;
  }
}
.period {
  display: inline-block;
  margin-left: 20px;
}
.header_search {
  display: inline-block;
  .el-input {
    display: inline-block;
  }
}
.header_search_wei {
  display: inline-block;
  margin-left: 80px;
  float: right;
  margin-right: 30px;
  .saixuan {
    display: inline-block;
    height: 28px;
    width: 80px;
    background-color: #d21d27;
    color: white;
    border-radius: 3px;
  }
}
</style>