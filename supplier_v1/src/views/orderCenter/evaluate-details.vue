<!-- 组件说明 -->
<template>
    <div class='evaluate_details'>
          <!-- 评分页面头部开始 -->
        <div class="evalute_title">
            <ul>
                <li>订单ID：AADDJK88465465</li>
                <li>订单金额：558520.00</li>
                <li>下单时间：2019-05-30  18：50</li>
            </ul>
        </div>
        <!-- 评分页面头部结束 -->
        <!-- 评分内容开始 -->
        <div class="evalute_content" v-for="item in 3" :key="item">
            <div class="content_title">
                <p>商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称</p>
            </div>
            <div class="evaluate_txt">
                <span>评分：</span>
                <el-rate
                v-model="value"
                disabled
                show-score
                text-color="#ff9900"
                score-template="{value}">
                </el-rate>
            </div>
            <div class="evaluate_area">
                <span>评价:</span>
                <div class="comment_content">
                    评价纯文字内容 评价纯文字内容 评价纯文字内容 评价纯文字内容 评价纯文字内容 评价纯文字内容 评价纯文字内容 评价纯文字内容 评价纯文字内容 评价纯文字内容 评价纯文字内容 评价纯文字内容 评价纯文字内容 评价纯文字内容 评价纯文字内容 评价纯文字内容 评价纯文字内容 评价纯文字内容   评价纯文字内容 评价纯文字内容 评价纯文字内容
                </div>
            </div>
            <div class="Comment_Img">
                <img src="https://gss3.bdstatic.com/84oSdTum2Q5BphGlnYG/timg?wapp&quality=80&size=b150_150&subsize=20480&cut_x=0&cut_w=0&cut_y=0&cut_h=0&sec=1369815402&srctrace&di=f56b6a85304755864fd472b7e972cf5e&wh_rate=null&src=http%3A%2F%2Fimgsrc.baidu.com%2Fforum%2Fpic%2Fitem%2Fd1a20cf431adcbefd8718861aeaf2edda3cc9f14.jpg" alt="" v-for="item in 5"
                :key="item">
            </div>
        </div>
        <!-- 评分内容结束 -->
        <!-- 提交状态开始 -->
        <div class="commitState">
            <input type="button" value="返回" class="commitBtn">
        </div>
        <!-- 提交状态结束 -->
        
    </div>
</template>

<script>
//import x from ''
export default {
  components: {},
  data() {
    return {
      value: 5
    };
  },
  computed: {},
  methods: {}
};
</script>

<style>
 .evaluate_txt .el-rate__item .el-rate__icon {
       font-size: 28px;
       color: #f8e15b;
   }
</style>



<style lang='scss' scoped>
//@import url()
// 评分页面头部开始
.evalute_title {
  background: #e7f2fc;
  padding-left: 50px;
  ul {
    display: flex;
    line-height: 80px;
    height: 80px;
    width: 100%;
    padding-left: 48px;
    li {
      margin-right: 80px;
      font-size: 16px;
      font-family: MicrosoftYaHei,微软雅黑;
      font-weight: 400;
      color: rgba(61, 145, 231, 1);
    }
  }
}
// 评分页面头部结束

//   评分内容开始
.evalute_content {
  padding-left: 70px;
  height: 404px;
  background-image: url("../../../static/img/evaluatebg@2x.png");
  background-repeat: no-repeat;
  background-position: top right;
  border-bottom: 1px solid rgba(240, 240, 240, 1);
  span {
    display: inline-block;
    width: 55px;
    font-size: 16px;
    font-family: MicrosoftYaHei,微软雅黑;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
  }
  .content_title {
    width: 30%;
    margin-top: 35px;
    margin-bottom: 35px;
    height: 86px;

    p {
    //   height: 32px;
      line-height: 32px;
      font-size: 16px;
      font-family: MicrosoftYaHei,微软雅黑;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
  .evaluate_txt {
    display: flex;
    padding-bottom: 37px;
  }
  .evaluate_area {
    display: flex;
    width: 50%;
    border-radius: 4px;
    .comment_content {
      width: 609px;
      //   height: 88px;
      font-size: 14px;
      font-family: MicrosoftYaHei,微软雅黑;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      line-height: 2;
    }
  }

  .Comment_Img {
    padding-left: 55px;
    padding-top: 12px;
    img {
      width: 48px;
      height: 48px;
      margin-right: 22px;
    }
  }

  

}
//   评分内容结束

//   提交状态开始
.commitState {
  padding: 38px 0;
  display: flex;
  justify-content: center;
  justify-content: center;

  .cancelBtn {
    width: 88px;
    height: 35px;
    background: rgba(192, 192, 192, 1);
    border-radius: 4px;
    margin-right: 51px;
    font-size: 16px;
    font-family: MicrosoftYaHei,微软雅黑;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    cursor: pointer;
  }
  .commitBtn {
    width: 88px;
    height: 35px;
    background: rgba(61, 145, 231, 1);
    border-radius: 4px;
    font-size: 16px;
    font-family: MicrosoftYaHei,微软雅黑;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    cursor: pointer;
  }
}
//   提交状态结束
</style>