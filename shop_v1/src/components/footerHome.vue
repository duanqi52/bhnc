<template>
  <div class="footer">
    <!-- 底部栏 -->
    <div class="footer_color">
      <div class="regard">
        <div>
          <a>
            <div>
              <i class="iconfont icon-hailiangshangjia"></i>
              <br />
              <span style="margin: 20px 0;display: inline-block;">海量商家</span>
            </div>
          </a>
          <a>
            <div style="margin: 0 250px;">
              <i class="iconfont icon-chanpin1"></i>
              <br />
              <span style="margin: 20px 0;display: inline-block;">全类产品</span>
            </div>
          </a>
          <a>
            <div>
              <i class="iconfont icon-wulumuqishigongandashujuguanlipingtai-ico-"></i>
              <br />
              <span style="margin: 20px 0;display: inline-block;">数据共享</span>
            </div>
          </a>
        </div>
        <div class="blogroll">
          <!-- <p>友情链接</p> -->
          <div class="blogroll_li">
            <a href="http://www.tonglu.gov.cn/" rel="nofollow" target="_blank">
              <span>杭州市桐庐县人民政府</span>
            </a>
            <a href="http://www.hzjxw.gov.cn" rel="nofollow" target="_blank" style="text-align: center;">
              <span>杭州市桐庐县经济和信息化局</span>
            </a>
            <a
              href="http://www.china-writing.com.cn/"
              target="_blank"
              rel="nofollow"
              style="margin-right: 0px;text-align: right;"
            >
              <span>中国制笔协会</span>
            </a>
          </div>
          <div class="blogroll_li" style="margin-top: 15px;">
            <a href="http://www.stwjxh.net/" rel="nofollow" target="_blank">
              <span>汕头文具协会</span>
            </a>
            <a href="http://www.zhoulubai.com" rel="nofollow" target="_blank" style="text-align: center;">
              <span>广州市周鲁白文具有限公司</span>
            </a>
            <a href="#" target="_blank" rel="nofollow" style="margin-right: 0px;text-align: right;">
              <span>广州市惠多广告有限公司</span>
            </a>
          </div>
        </div>
        <div class="blogroll_bom_xian"></div>
      </div>
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
        <el-divider direction="vertical"></el-divider>
        <a href="https://tongji.baidu.com" target="_blank" rel="nofollow" style="color: silver;">站长统计</a>
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
    background-color: #101010;
    .regard {
      width: 725px;
      margin: 0px auto;
      // display: flex;
      // justify-content: space-evenly;
      color: white;
      a {
        display: inline-block;
        cursor: default;
      }
      a:hover {
        color: #fff;
      }
      i {
        font-size: 62px !important;
        color: #d22d36;
      }
     .blogroll a{
          cursor: pointer;
      }
    }

    .footer_can {
      width: 1200px;
      margin: 0px auto;
      line-height: 70px;
      text-align: center;
      .information {
        display: inline-block;
        font-size: 14px;
        font-family: MicrosoftYaHei,微软雅黑;
        font-weight: 400;
        color: rgba(192, 192, 192, 1);
      }
    }
  }
}
.blogroll {
  font-size: 14px;
  font-family: MicrosoftYaHei,微软雅黑;
  font-weight: 400;
  color: rgba(192, 192, 192, 1);
  p {
    text-align: left;
    margin: 20px 0;
  }
  .blogroll_li {
    text-align: left;
    a {
      display: inline-block;
      width: 32.8%;
      display: inline-block;
      cursor: pointer;
      color: silver;
    }
  }
}
.blogroll_bom_xian {
  height: 2px;
  background: rgba(192, 192, 192, 1);
  opacity: 0.2;
  margin: 15px 0;
}
.theList {
  font-size: 14px;
  font-family: MicrosoftYaHei,微软雅黑;
  font-weight: 400;
  color: rgba(192, 192, 192, 1);
  span {
    cursor: pointer;
  }
  .el-divider--vertical {
    margin: 0 23px;
  }
}
</style>
