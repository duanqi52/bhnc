<template>
  <div class="footer">
    <!-- 底部栏 -->
    <div class="footer_color">
     <div class="theList">
        <span @click="$router.push('/aboutUs')">关于我们</span>
        <el-divider direction="vertical"></el-divider>
        <span @click="$router.push('/noticeList')">平台动态</span>
        <el-divider direction="vertical"></el-divider>
        <span @click="$router.push('/legalNotice')">法律声明</span>
        <el-divider direction="vertical"></el-divider>
        <span @click="$router.push('/helpCenter')">帮助中心</span>
        <el-divider direction="vertical"></el-divider>
        <span @click="$router.push('/complaint')">投诉建议</span>
        <el-divider direction="vertical"></el-divider>
        <span @click="$router.push('/contactUs')">联系我们</span>
      </div>
      <div class="footer_can">
        <div class="information">
          <span>笔海弄潮 www.bhnc114.com</span>
          <span style="margin: 0 20px;">浙ICP备 19033922号-2 </span>
          <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33012202330899" rel="nofollow" target="_blank" style="color: silver;">
            <img src="../../static/img/ghs.png" alt="">
            <span>浙公网安备 33012202330899号</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  computed: {},
  methods: {
    handleChange(index) {
      this.isChange = index;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss"  scoped>
$color: rgb(61, 145, 231);
.footer {
  margin-top: 20px;
  .footer_color {
    // height: 120px;
    padding-top: 30px;
    text-align: center;
    background-color: #F8F8F8;
    .regard {
      width: 725px;
      margin: 0px auto;
      // display: flex;
      // justify-content: space-evenly;
      color: #666666;
      a {
        display: inline-block;
      }
      i {
        font-size: 62px !important;
        color: #d22d36;
      }
    }
    .footer_can {
      width: 1200px;
      margin: 0px auto;
      line-height: 70px;
      text-align: center;
      .information {
        display: inline-block;
        font-size:14px;
        font-family:MicrosoftYaHei,微软雅黑;
        font-weight:400;
        color:rgba(192,192,192,1);
      }
    }
  }
}
.blogroll{
  font-size:14px;
  font-family:MicrosoftYaHei,微软雅黑;
  font-weight:400;
  color:rgba(192,192,192,1);
  p{
    text-align: left;
    margin: 20px 0;
  }
  .blogroll_li{
    text-align: left;
    span{
      margin-right: 60px;
      cursor: pointer;
    }
  }
}
.blogroll_bom_xian{
  height:2px;
  background:rgba(192,192,192,1);
  opacity:0.2;
  margin: 30px 0;
}
.theList{
  font-size:14px;
  font-family:MicrosoftYaHei,微软雅黑;
  font-weight:400;
  color:rgba(192,192,192,1);
  span{
    cursor: pointer;
  }
  .el-divider--vertical{
    margin: 0 33px;
  }
}
</style>
