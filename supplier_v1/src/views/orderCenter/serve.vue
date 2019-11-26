<!-- 组件说明 -->
<template>
    <div class='serve'>
        
        <ul>
            <li><p class="title">申请售后：</p></li>
            <li>
                <span>订单ID：</span>
                xs0001
            </li>
            <li>
                <span>选择商品：</span>
                    <div class="product" v-for="(item,index) in commodity" :key="index">
                            <div v-for="(item1,index) in item.product" :key="index">
                                <img :src="item1.img" alt="">
                                <input type="checkbox" :id="'product_item' + index" v-bind:value="item1.p_id" v-model="checkedNames">
                                <label :for="'product_item' + index">{{item1.name}}</label>
                            </div>
                    </div>
            </li>
            <li>
                <span>退货数量：</span>
                <p>商品1</p>
                <input type="text" value="" >
            </li>
            <li>
                <span>退货数量：</span>
                <p>商品2</p>
                <input type="text" value="" >
            </li>
            <li>
                <span>退货数量：</span>

                <p>商品3</p>
                <input type="text" value="" >
            </li>
            <li>
                <span>退款金额：</span>
                <input type="text" value="" >
            </li>
            <li>
                <span>退款描述：</span>
                <textarea name="" id="text" cols="30" rows="10"></textarea>
            </li>
            <li>
                <div class="btn-box">
                    <el-button type="danger" plain @click="prev">取消</el-button>
                    <el-button type="success" plain>提交</el-button>
                </div>
            </li>
        </ul>
        
    </div>
</template>

<script>
    //import x from ''
    export default {
      
        components: {

        },
        data () {
            return {
                checkedNames:[],
                commodity:[
                    {id:'XS0001',product:[
                        {img:'../../../static/img/logo.jpg',name:'铅笔gdfgdfgfgdfdfgdf，20只',p_id:'111'},
                        {img:'../../../static/img/logo.jpg',name:'铅笔，20只',p_id:'222'},
                        {img:'../../../static/img/logo.jpg',name:'铅笔，20只',p_id:'333'}
                    ]}
                ]
            };
        },
        computed: {

        },
        methods: {
            prev(){
                this.$router.go(-1)
            }
        },
    }
</script>

<style lang='scss' scoped>
//@import url()
    .serve{
        padding: 20px 30px;
        font-size: 14px;
        li{
            padding:15px 5px;
            span{
                height: 26px;
                line-height: 26px;
                float: left;
                display: inline-block;
            }
            p{
                width: auto;
                float: left;
                padding:5px 15px; 
            }
            input[type="text"]{
                width: 200px;
                height: 30px;
                margin-left: 15px;
                padding-left: 15px;
                border-bottom:1px solid #eee;
            }
            .title{
                padding: 0;
                font-size: 20px;
                font-weight: 600;
                margin-left: -40px;
                padding-bottom: 15px;
                float: none;
            }
            
        }
        .product{
            display: flex;
           div{
                width: 100px;
                margin: 10px 12px;
                img{
                    width: 100px;
                }
                label{
                    display: inline-block;
                    width: 80px;
                    overflow: hidden;    
                    text-overflow: ellipsis;      //超出部分以省略号显示
                    white-space: nowrap;
                    vertical-align: middle;
                }
           }
           
        }
    }
    .serve ul{
        width:1000px;
        margin: 0 auto;
    }
    #text{
        width: 500px;
        border: 1px solid #e6e6e6;
        padding: 10px;
    }
    .btn-box button{
        width: 150px;    
        margin-left: 80px;
        border-radius: 10px; 
        font-size: 16px;
        letter-spacing: 2px;  
    }

</style>