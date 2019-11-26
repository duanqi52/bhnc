<template>
         <div>
             <div class="context">
                <div class="main">
                    <div class="helpBox">
                        <div class="hsR">
                            <div class="helpCenter">
                                <div class="helpHd">
                                    <h2>注册协议<span></span></h2>
                                </div>
                                <div class="helpBd">
                                    <p style="font-size: 14px;"><strong>【审慎阅读】</strong>您在申请注册流程中点击同意前，应当认真阅读以下协议。<strong>请您务必审慎阅读、充分理解协议中相关条款内容，其中包括：  </strong></p>
                                    <p style="font-size: 12px;">1、<strong>与您约定免除或限制责任的条款；</strong></p>
                                    <p style="font-size: 12px;">2、<strong>与您约定法律适用和管辖的条款；</strong></p>
                                    <p style="font-size: 12px;">3、<strong>其他以粗体下划线标识的重要条款。</strong></p>
                                    <p style="font-size: 12px;">
                                        <br>
                                    </p>
                                    <p style="font-size: 14px;">如您对协议有任何疑问，可向笔海弄潮服务中心咨询</p>
                                    <p style="font-size: 14px;"><strong>【特别提示】 您已充分理解，笔海弄潮是一个商业服务信息共享和采购平台，当您按照注册页面提示填写信息、阅读并同意协议且完成全部注册程序后，即表示您已充分阅读、理解并接受协议的全部内容，并将基于您的真实需求而使用笔海弄潮服务。</strong>如您因笔海弄潮服务与笔海弄潮发生争议，应适用《笔海弄潮服务条款》处理；如您在使用笔海弄潮服务中与其他用户发生争议，依您与其他用户达成的协议处理。</p>
                                    <p style="font-size: 14px;"><strong>阅读协议的过程中，如果您不同意相关协议或其中任何条款约定，您应立即停止注册程序。</strong></p>
                                    <p style="font-size: 12px;"><a href="/web/shop/service" target="_blank" style="color:#FC9263;">《笔海弄潮服务条款》</a></p>
                                    <p style="font-size: 12px;"><a href="/web/shop/privacy" target="_blank" style="color:#FC9263;">《隐私政策》</a></p>
                                    <p style="font-size: 12px;">
                                        <br>
                                    </p>
                                </div>
                            </div>
                            <div class="back">
                                <el-button type="warning" @click="back()">返回</el-button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

         </div>
</template>

<script>
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
        data () {
            return {

            }
        },
        components: {

        },
        methods:{
            back(){
                this.$router.push('/register?isCheck=true');
            },
        }
    }
</script>

<style lang="scss" scoped>
.context .main {
    width: 1200px;
    margin: 0 auto;
}
.helpBox {
    margin-top: 10px;
}
.helpBox .hsL {
    width: 180px;
    float: left;
    display: inline;
    background: #ffffff;
}
.helpBox .hsR {
    float: left;
    margin-left: 20px;
    width: 100%;
    min-height: 630px;
    display: inline;
    overflow: hidden;
    background: #ffffff;
}
.helpBox .hsR .helpCenter .helpHd {
    height: 60px;
    line-height: 60px;
    padding-left: 20px;
    border-bottom: 1px solid #e6e6e6;
    font-size: 20px;
}
.helpBox .hsR .helpCenter .helpHd h2 {
    font-weight: lighter;
}
.helpBox .hsR .helpCenter .helpHd span {
    margin-left: 10px;
    font-size: 16px;
    color: #cccccc;
}
.helpBox .hsR .helpCenter .helpBd p {
    font-size: 14px;
    padding: 10px 30px;
    line-height: 24px;
    text-indent: 28px;
}
.back{
    text-align: center;
    margin-bottom: 20px;
}
.back button{
    display: inline-block;
}
</style>
