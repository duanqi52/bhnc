<!-- 组件说明 -->
<template>
    <div class='proudct-details'>
        <div class="title">
            <p><span>订单ID：</span>XS001</p>
            <p><span>订单金额：</span>500000.00</p>
            <p><span>下单时间：</span>2015-08-09</p>
            <p>
                <el-button>发货中</el-button>
                <el-button>申请售后</el-button>
            </p>
        </div>
        <div class="proudct-item">
            <el-table
                :data="orderDetails.product"
                style="width: 100%"
                :header-cell-style="{background:'#eef1f6',color:'#606266',fontWeight:'bold'}">
                <el-table-column
                    prop="name"
                    label="订单ID"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="style_number"
                    label="款号"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="color"
                    label="颜色"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="prices"
                    label="商品单价"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="count"
                    label="数量"
                    align="center">
                </el-table-column>
            </el-table>
            <div class="remake">
                <p>备注信息：</p>
                <p>{{orderDetails.remarks}}</p>
            </div>
            <div class="border"></div>
            <div class="order-tracking">
                <h2 style="text-align:center;margin:30px 0;">订单追踪</h2>
                <div class="shipments-details" v-for="(bat,index) in orderDetails.batches" :key="index">
                    <p class="shipments-title">发货{{index + 1 }}</p>
                    <div class="shipment-box">
                        <div class="shipments-people">
                            <table>
                                <tr>
                                    <td> <span>收件人：</span> {{bat.consigner.companyName}}&nbsp;{{bat.consigner.name}}</td>
                                    <td>{{bat.consigner.phone}}</td>
                                    <!-- <td>020-88888888</td> -->
                                    <td>{{bat.consigner.address}}</td>
                                </tr>
                                <tr>
                                    <td><span>发货人：</span>{{bat.recipients.companyName}}&nbsp;{{bat.recipients.name}}</td>
                                    <td>
                                        {{bat.recipients.phone}}
                                    </td>
                                    <!-- <td>020-5555555</td> -->
                                    <td>{{bat.recipients.address}}</td>
                                </tr>
                            </table>
                        </div>
                        <div class="logistics">
                            <el-table
                                :data="bat.order"
                                style="width: 100%"
                                :header-cell-style="{background:'#eef1f6',color:'#606266',fontWeight:'bold'}">
                                <el-table-column
                                    label="商品"
                                    align="center">
                                    <template slot-scope="scope">
                                        <div v-for = '(item,index) in scope.row.product' :key="index">
                                            <span style="display:flex;justify-content: space-between;display: flex;margin:25px 0">
                                                <img :src="item.img" style="width:40px;vertical-align: middle;">
                                                <span>{{item.name}}</span>
                                            </span>
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    label="款号"
                                    align="center">
                                    <template slot-scope="scope">
                                        <div v-for = '(item,index) in scope.row.product' :key="index">
                                            <span>{{item.style_number}}</span>
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    label="颜色"
                                    align="center">
                                    <template slot-scope="scope">
                                        <div v-for = '(item,index) in scope.row.product' :key="index">
                                            <span>{{item.color}}</span>
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    prop="count"
                                    label="数量"
                                    align="center">
                                    <template slot-scope="scope">
                                        <div v-for = '(item,index) in scope.row.product' :key="index">
                                            <span>{{item.count}}</span>
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    prop="logistics"
                                    label="物流信息"
                                    align="center">
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                    <div class="btn-box">
                        <el-button type="primary" @click="getID">返回</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    //import x from ''
    import url from '@/serverAPI.config.js'
    export default {
        components: {
        },
        data () {
            return {
                orderDetails:{},
                id:''
            }
        },
        methods: {
            getDetails(){
            },
            prev(){
                this.$router.go(-1)
            },
            getID(){
                this.id = this.$route.query.id;
            }
        },
        created(){
            this.getDetails()
        }
    }
</script>

<style lang='scss' scoped>
//@import url()
$borderColor:#E6E6E6;
.proudct-details{
    width: 1000px;
    margin: 0 auto;
    border: 1px solid $borderColor;
    .title{
        display: flex;
        justify-content: space-between;
        padding: 10px;
        border-bottom:1px solid $borderColor;
        p{
            line-height: 40px;
        }
        span{
            font-weight: bold;
        }
    }
    .remake{
        padding: 10px 20px;
        p:first-child{

            font-weight: 600;
            font-size: 18px;
        }
        p:last-child{
                font-size: 14px;
                padding-left:15px ;
                border-bottom: 1px solid $borderColor;
                margin: 25px 0;
        }
    }
    .border{
        border: 1px solid $borderColor;
        margin: 30PX 0;
    }
    .shipments-details{
        padding: 10px 25px;
        .shipments-title{
            padding: 8px 0;
            font-weight: bold;
        }
        .shipment-box{
            border:1px solid $borderColor;
            font-size: 12px;
            padding: 5px 10px;
            table{
                width: 100%;
                text-align: center;
                line-height: 30px;
                span{
                    float:left;
                }
            }
            .logistics{
                span{
                    float:none;
                }
            }
        }
        .btn-box{
            text-align: center;
            button{
                width: 160px;
                border-radius: 10px;
                margin: 20px 0;
            }
        }
    }

}

</style>
