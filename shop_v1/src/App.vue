<template>
  <div id="app">
    <div id="butService">
      <div @click="showServices()" id="butServices">
        <img src="../static/img/serviceLoge.png" alt />
        <span style="margin-left: 6px;">在线客服</span>
        <i class="el-icon-arrow-down el-icon--right" v-if="showService"></i>
        <i class="el-icon-arrow-up el-icon--right" v-else></i>
      </div>
      <el-collapse-transition>
        <div v-show="showService" class="hedeService">
          <div class="hedeas">供应商客服</div>
          <div class="transition-box">
            <a
              id="qqShow"
              target="_blank"
              href="http://wpa.qq.com/msgrd?v=3&uin=2355863270&site=qq&menu=yes"
            >钟先生</a>
          </div>
          <div class="transition-box">
            <a
              id="qqShow"
              target="_blank"
              href="http://wpa.qq.com/msgrd?v=3&uin=2355863272&site=qq&menu=yes"
            >吴小姐</a>
          </div>
          <div class="transition-box" style="border-bottom: none;">
            <a
              id="qqShow"
              target="_blank"
              href="http://wpa.qq.com/msgrd?v=3&uin=2355863247&site=qq&menu=yes"
            >王小姐</a>
          </div>
          <div class="hedeas">采购商客服</div>
          <div class="transition-box">
            <a
              id="qqShow"
              target="_blank"
              href="http://wpa.qq.com/msgrd?v=3&uin=2355863253&site=qq&menu=yes"
            >陈先生</a>
          </div>
          <div class="transition-box">
            <a
              id="qqShow"
              target="_blank"
              href="http://wpa.qq.com/msgrd?v=3&uin=2355863259&site=qq&menu=yes"
            >郑先生</a>
          </div>
          <div class="transition-box">
            <a
              id="qqShow"
              target="_blank"
              href="http://wpa.qq.com/msgrd?v=3&uin=2355918527&site=qq&menu=yes"
            >王小姐</a>
          </div>
        </div>
      </el-collapse-transition>
    </div>

    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    showService: true,
    showServiceMove:null
  }),
  methods: {
    showServices() {
      this.showService = !this.showService;
    }
  },
  updated() {
    setInterval(() => {
      var windowHeight =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
        if (windowHeight > 150) {
        if (document.getElementById("butService"))
          document.getElementById("butService").style.position = "fixed";
          document.getElementById("butService").style.top = "55%";
      } else{
        document.getElementById("butService").style.position = "absolute";
          document.getElementById("butService").style.top = "75%";
      }
    }, 10);


  },
};
</script>

<style lang="scss">
#app {
  /* -webkit-font-smoothing: antialiased; */
  /* -moz-osx-font-smoothing: grayscale; */

  color: #2c3e50;
  #butService {
    position: absolute;
    right: 12px;
    top: 70%;
    z-index: 9999;
    #butServices {
      width: 141px;
      height: 42px;
      background: rgba(210, 29, 39, 1);
      border-radius: 6px;
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
    .hedeService {
      border: 1px solid #F7D8D9;
      border-radius: 6px;
      width: 140px;
      background: #FDF5F5;
      .hedeas {
        width: 139px;
        height: 28px;
        line-height: 28px;
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #333333;
        text-align: center;
        background: #FBEBEC;
        border-radius: 6px;
        border: 1px solid #F6D1D3;
        cursor:default;
      }
      .transition-box{
        text-align: center;
        height: 26px;
        line-height: 26px;
        border-bottom: 1px solid #F6D2D4;
      }
    }
  }
}
</style>
