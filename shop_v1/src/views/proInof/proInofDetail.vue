<template>
  <div id="bhncProInofDetail">
    <div class="w" v-if="details">
      <div class="baojiaBox">
        <h4>{{details.title}}</h4>
        <el-table
          :data="rowDetails"
          style="padding: 0 20px;margin: 4px 0;"
          :header-cell-style="{background:'#fff',color:'#666',}"
          align="center"
        >
          <el-table-column label="商品单价" prop="price" align="center"></el-table-column>
          <el-table-column label="供应数量" prop="count" align="center"></el-table-column>
          <!-- <el-table-column label="交货时间" prop="time" align="center" width="160"></el-table-column> -->
          <el-table-column label="发布人" prop="linkman" align="center"></el-table-column>
          <el-table-column label="联系电话/QQ" prop="link" align="center"></el-table-column>
          <el-table-column label="联系地址" prop="address" align="center"></el-table-column>
          <el-table-column label prop="offerDate" align="center">
            <template>
              <button class="chakan" @click="lookRowDetails()" v-if="!isLook">查看详细信息</button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="weitu">
        <div class="weituDetails">
          <div class="weituTitle">{{details.content}}</div>
          <div class="weituImg">
            <img :src="img" v-for="(img,index) in details.imgs" :key="index" />
          </div>
        </div>
        <!-- <div style="padding:20px 0;text-align: center;">
          <button
            style="width:88px;
                height:35px;
                background:rgba(210,29,39,1);
                border-radius:4px;
                font-size:16px;
                font-family:MicrosoftYaHei,微软雅黑;
                font-weight:400;
                color:rgba(255,255,255,1);"
            @click="purchase"
          >返回</button>
        </div>-->
      </div>
      <div class="order-list">
        <p class="more_xin">更多供应信息</p>
        <el-table
          stripe
          :data="supplyInfoList"
          style="width: 100%"
          :header-cell-style="{background:'#F7F7F7',color:'#606266',fontWeight:'bold',borderTop:'1px solid#E2E2E2'}"
          align="center"
        >
          <el-table-column label="标题" prop="title" align="center"></el-table-column>
          <el-table-column label="供应数量" prop="count" align="center"></el-table-column>
          <!-- <el-table-column label="交货时间" prop="delivery_date" align="center"></el-table-column> -->
          <el-table-column label="发布时间" prop="date" align="center"></el-table-column>
          <el-table-column label prop="state" align="center">
            <template slot-scope="scope">
              <button class="see_des" @click="toDetails(scope.row.id)">查看详情 >></button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <popup style="display:none" :wenz="wenz" :urls="urls" id="popup"></popup>
  </div>
</template>

<script>
import url from "@/serverAPI.config.js";
import popup from "../../components/popup/popup.vue";

export default {
       metaInfo: {
    title: '笔海弄潮——制笔行业企业上云综合服务平台', // set a title
    meta: [{                 // set meta
      name: 'keyWords',
      content: '制笔行业、制笔厂家、礼品笔、学生笔、中性笔、圆珠笔、钢笔、墨水、笔芯、制笔机械及零部件；'
    },
    {
        name:"description",
        content: '笔海弄潮，连接制笔行业采购商和供应商的智慧化数字平台，帮制笔行业采购商寻找各种笔类产品，帮制笔行业厂家寻找各类采购商，为厂商企业管理提供企业上云的管理服务。',
    }],
  },
  data() {
    return {
      details: null,
      id: "",
      u_id: "",
      rowDetails: [],
      supplyInfoList: [],
      level: 0,
      lookProvider: 0,
      isLook: false,
      integral:0,
      setLevel: [],
      wenz:"",
      urls: "/disIntroduce",
      searchMap:{
        status:"1"
      }
    };
  },
  created() {
    this.getSetLevel();
    this.id = this.$route.query.id;
    this.u_id = localStorage.getItem("ID") ? localStorage.getItem("ID") : "-1";
    if (!this.id) {
      this.$router.push("/proInof");
      return;
    } else {
      this.getSupplyInfoDetails();
    }
    this.searchSupplyInfo(1, 6);
  },
  components: {
    popup
  },
  methods: {
      getSetLevel(){
       this.$http({
         //url:'http://localhost:9004/integralRecord/getSetLevel',
        url: `${url.getSetLevel}`,
        method: "get"
      }).then(res => {
        if (res.data.code == 20000) {
         this.setLevel=res.data.data;
        }
      });
    },
    getSupplyInfoDetails() {
      this.$http({
        //url:'http://localhost:9006/purchase/getSupplyInfoDetails/'+this.id+"/"+this.u_id,
        url: `${url.getSupplyInfoDetails}/${this.id}/${this.u_id}`,
        method: "get"
      }).then(res => {
        if (res.data.code == 20000) {
          var data = res.data.data;
          data.details.imgs = JSON.parse(data.details.imgs);
          this.details = data.details;
          var rowDetails = {};
          rowDetails.linkman = data.linkman;
          rowDetails.link = data.phone + "/" + data.qq;
          rowDetails.address = data.address;
          rowDetails.price = this.details.price;
          rowDetails.count = this.details.count;
          this.rowDetails = [rowDetails];
          this.level = data.level;
          this.lookProvider = data.lookProvider;
          this.isLook = data.isLook;
          this.integral=data.integral;
        }
      });
    },
    searchSupplyInfo(page, size) {
      this.$http({
        url: `${url.searchSupplyInfo}/${page}/${size}`,
        data: this.searchMap,
        method: "post"
      }).then(res => {
        if (res.data.code == 20000) {
          this.supplyInfoList = res.data.data.rows;
          this.supplyInfoList.map(item=>{
              item.date=this.resolvingDate(item.date);
          })
        }
      });
    },
    //点击查看
    lookRowDetails() {
      //级别不足查看
      var userName = localStorage.getItem("username");
      var roles = localStorage.getItem("roles");
      if (!userName) {
        this.$message("您还未登录，请先登录");
        this.$router.push("/login");
        return;
      }
      if (roles.indexOf("dealer") == -1) {
        // this.$message("您还不是经销商，请先注册");
        // this.$router.push("/submitDisData");
        // return;
           this.wenz =
          "亲爱的 " +
          (userName ? userName : "用户") +
          "，您还不是我们的经销商会员，申请成为经销商会员之后，可以查看平台上所有供应商的信息，快来申请吧~";
        document.getElementById("popup").style.display = "";
        return;
      }
      if (this.level == "1") {
        this.$confirm(
          "您的级别没有权限查看供应详细信息，请充值积分达到2级会员！","提示",{
            confirmButtonText: "去充值",
            cancelButtonText: "取消",
            type: "warning",
            center: true
          }).then(() => {
            var username = localStorage.getItem("username");
            var password = localStorage.getItem("password");
            var roles = localStorage.getItem("roles");
            var Authorization = localStorage.getItem("Authorization");
            var id = localStorage.getItem("ID");
            var href = `${url.dealerUrl}/jump?Authorization=${Authorization}&a=${username}&roles=${roles}&id=${id}&recharge=1`;
            window.open(href);
          }).catch(() => {});
      }else if(this.level=='89'){
        var level="";
        for (var i = 0; i < this.setLevel.length; i++) {
            if(this.integral>=this.setLevel[i].start_integral){
                level=this.setLevel[i].level;
            }
         }
         if(level=="1"){
              this.$confirm(
                "您的级别没有权限查看供应详细信息，请充值积分达到2级会员！","提示",{
                  confirmButtonText: "去充值",
                  cancelButtonText: "取消",
                  type: "warning",
                  center: true
                }).then(() => {
                  var username = localStorage.getItem("username");
                  var password = localStorage.getItem("password");
                  var roles = localStorage.getItem("roles");
                  var Authorization = localStorage.getItem("Authorization");
                  var id = localStorage.getItem("ID");
                  var href = `${url.dealerUrl}/jump?Authorization=${Authorization}&a=${username}&roles=${roles}&id=${id}&recharge=1`;
                  window.open(href);
              }).catch(() => {});
            }else{
                   this.$confirm(
                  `本次查看供应详细信息将消耗${this.lookProvider}积分，是否继续查看？`,
                  "提示",
                  {
                    confirmButtonText: "确认",
                    cancelButtonText: "取消",
                    type: "warning",
                    center: true
                  }
                ).then(() => {
                  this.$http({
                    method: "get",
                    url: `${url.addDealerLookSupplier}/${localStorage.getItem("ID")}/${this.id}`
                  }).then(res => {
                    this.getSupplyInfoDetails();
                  });
                });
            }
        }else {
        //级别满足查看
        this.$confirm(
          `本次查看供应详细信息将消耗${this.lookProvider}积分，是否继续查看？`,
          "提示",
          {
            confirmButtonText: "确认",
            cancelButtonText: "取消",
            type: "warning",
            center: true
          }
        ).then(() => {
          this.$http({
            method: "get",
            //url:'http://localhost:9007/user/addDealerLookProvider/'+localStorage.getItem("ID")+"/"+this.id,
            url: `${url.addDealerLookSupplier}/${localStorage.getItem("ID")}/${this.id}`
          }).then(res => {
            this.getSupplyInfoDetails();
          });
        });
      }
    },
    toDetails(id) {
      this.$router.push("/proInofDetail?id=" + id);
      location.reload();
    },
    purchase() {
      this.$router.go(-1);
    },
       //时间格式转化
    resolvingDate(date) {
      var dateee = new Date(date).toJSON();
      return new Date(+new Date(dateee) + 16 * 3600 * 1000)
        .toISOString()
        .replace(/T/g, " ")
        .replace(/\.[\d]{3}Z/, "");
    },
  }
};
</script>


<style lang="scss">
    #bhncProInofDetail{
        .el-table__body, .el-table__footer, .el-table__header{
            width: 100%!important;
        }
    }
</style>

<style lang="scss" scoped>
#bhncProInofDetail {
  .w {
    width: 1200px;
    margin: 0 auto;
  }
  .chakan {
    width: 100px;
    height: 30px;
    background: rgba(241, 145, 73, 1);
    border: 1px solid rgba(241, 145, 73, 1);
    box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.24);
    border-radius: 8px;
    font-size: 12px;
    font-family: MicrosoftYaHei,微软雅黑;
    font-weight: 400;
    color: rgba(255, 254, 254, 1);
  }
  .baojiaBox {
    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.04);
    h4 {
      height: 67px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.06);
      line-height: 67px;
      text-indent: 34px;
      margin-top: 8px;
      font-size: 16px;
    font-family: MicrosoftYaHeiLight,微软雅黑;
      font-weight: bold;
      color: rgba(102, 102, 102, 1);
    }
  }
  .weitu {
    min-height: 825px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.04);
    .weituDetails {
      .weituTitle {
        width: 710px;
        margin: 0px auto;
        padding: 30px 0;
      }
      .weituImg {
        width: 710px;
        margin: 0 auto;
        img {
          width: 710px;
          height: 640px;
        }
      }
    }
  }
  .see_des {
    width: 94px;
    height: 26px;
    background: rgba(255, 255, 255, 0.28);
    border: 1px solid rgba(241, 145, 73, 1);
    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.12);
    opacity: 0.6;
    border-radius: 8px;
    font-size: 12px;
    font-family: MicrosoftYaHei,微软雅黑;
    font-weight: 400;
    color: rgba(252, 146, 99, 1);
  }
  .more_xin {
    height: 67px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.06);
    line-height: 67px;
    text-indent: 34px;
    margin-top: 8px;
    font-size: 16px;
  font-family: MicrosoftYaHeiLight,微软雅黑;
    font-weight: bold;
    color: rgba(102, 102, 102, 1);
  }
}
</style>
