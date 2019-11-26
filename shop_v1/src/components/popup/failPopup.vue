<template>
  <div>
    <!-- 遮罩层弹窗 -->
    <div class="popup" ref="mask" v-show="isShow">
      <div class="popup_view">
        <div style="height: 50px;">
          <!-- <i class="iconfont icon-guanbi2fill" id="fork_cha" @click="cancel()"></i> -->
        </div>
        <p>
          尊敬的 {{wenz}}会员，很遗憾..
          <br />
          您于{{applyDate}}申请的{{role}}会员被系统审核人驳回
          <br />
          <span style="color:#D51F03">驳回原因：{{reason}} ！</span>
        </p>
        <button @click="cancel()" style="background:#C0C0C0;">关闭</button>
        <button @click="handleReapply">重新申请</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["wenz", "data", "role", "applyDate", "reason"],
  data() {
    return {
      isShow: true
    };
  },
  components: {},
  mounted() {
    this.$refs.mask.style.height =
      document.getElementById("app").clientHeight + "px";
    if (this.isShow == false) {
      document.body.style.overflow = "visible";
    }
  },
  methods: {
    cancel() {
      this.isShow = !this.isShow;
    },
    handleReapply(){
        this.$emit('handleReapply');
    }
  }
};
</script>

<style lang="scss" scoped>
.popup {
  width: 100%;
  background-color: rgba(102, 102, 102, 0.2);
  bottom: 0;
  left: 0;
  position: fixed;
  z-index: 998;
}
.popup_view {
  position: fixed;
  width: 419px;
  height: 280px;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  z-index: 1000;
  background: url("../../../static/img/bohuitanchuang.png") no-repeat;
  background-size: cover;
  text-align: center;
  p {
    color: #666;
    width: 329px;
    //   height: 73px;
    line-height: 2;
    display: inline-block;
    text-align: left;
    font-size: 16px;
    font-family: MicrosoftYaHeiLight, 微软雅黑;
    font-weight: bold;
  }
  button {
    width: 100px;
    height: 39px;
    background: #d21d27;
    border-radius: 4px;
    font-size: 16px;
    font-family: MicrosoftYaHeiLight;
    font-weight: bold;
    color: rgba(255, 255, 255, 1);
    margin-top: 38px;
    margin-right: 28px;
  }
}
#fork_cha {
  float: right;
  font-size: 26px;
  opacity: 0.5;
  margin-top: 7px;
  margin-right: 7px;
  cursor: pointer;
}
</style>
