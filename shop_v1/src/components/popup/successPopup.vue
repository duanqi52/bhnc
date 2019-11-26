<template>
         <div>
            <!-- 遮罩层弹窗 -->
            <div class="popup" ref="mask" v-show="isShow" >
                <div class="popup_view">
                    <div style="height: 50px;">
                    <!-- <i class="iconfont icon-guanbi2fill" id="fork_cha" @click="cancel()"></i> -->
                    </div>
                    <p>尊敬的 {{wenz}}会员，恭喜您 ！<br>
                    您于{{data}}2019年8月27日申请的{{role}}已经通过审核。</p>
                    <button @click="cancel()">好的</button>
                </div>
            </div>
         </div>
         
</template>

<script>
    export default {
        props: ['wenz','data','role'],
        data () {
            return {
                isShow:true
            }
        },
        components: {

        },
        mounted() {
            // console.log(this.isShow)
            this.$refs.mask.style.height =
            document.getElementById("app").clientHeight + "px";
            if (this.isShow == false) {
            document.body.style.overflow = "visible";
            }
        },
        methods:{
            cancel(){
                this.isShow=!this.isShow
            },
        
        }
    }
</script>

<style lang="scss" scoped>
.popup{
  width: 100%;
  background-color: rgba(102, 102, 102, 0.2);
  bottom: 0;
  left: 0;
  position: fixed;
  z-index: 998;
}
.popup_view{
    position: fixed;
    width: 419px;
    height: 280px;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    z-index: 1000;
    background: url("../../../static/img/tongguotanchuang.png") no-repeat;
    background-size: cover;
    text-align: center;
    p{
      color: #666;
      width: 329px;
    //   height: 73px;
    line-height: 2;
      display: inline-block;
      text-align: left;
      font-size: 16px;
    font-family: MicrosoftYaHeiLight,微软雅黑;
      font-weight: bold;
    }
    button{
      width:133px;
      height:39px;
      background:#80C452;
      border-radius:4px;
      font-size:16px;
      font-family:MicrosoftYaHeiLight;
      font-weight:bold;
      color:rgba(255,255,255,1);
      margin-top: 60px;
    }
}
#fork_cha{
    float: right;
    font-size: 26px;
    opacity: 0.5;
    margin-top: 7px;
    margin-right: 7px;
    cursor: pointer;
}
 
</style>
