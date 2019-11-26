<template>
         <div class="order-list">
             <p style="margin: 20px;color: red;">{{purchaseDetails.title}}</p>
            <el-table
                :data="purchaseDetails.message"
                style="width: 100%"
                :header-cell-style="{background:'#eef1f6',color:'#606266',fontWeight:'bold'}"
                align="center"
            >
                <el-table-column
                    label="单价"
                    prop="price"
                    align="center">
                </el-table-column>
                <el-table-column
                    label="总价"
                    prop="totalMoney"
                    align="center">
                </el-table-column>
                <el-table-column
                    label="公司名称"
                    prop="name"
                    align="center">
                </el-table-column>
                <el-table-column
                    label="联系人"
                    prop="linkMan"
                    align="center">
                </el-table-column>
                <el-table-column
                    label="联系电话"
                    prop="linkPhone"
                    align="center">
                </el-table-column>
                <el-table-column
                    label="联系地址"
                    prop="address"
                    align="center">
                </el-table-column>
                <el-table-column
                    label="报价时间"
                    prop="offerDate"
                    align="center">
                </el-table-column>
            </el-table>
            <el-table
                :data="tableData"
                :header-cell-style="{background:'#4ca5e9',color:'#606266',fontWeight:'bold'}"
                align="center"
                style="width: 100%">
                <el-table-column
                    prop="type"
                    label="商品分类"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="offer_count"
                    label="采购数量"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="delivery_date"
                    align="center"
                    label="交货时间">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="send_man"
                    label="发布人">
                </el-table-column>
                <el-table-column
                    prop="c_name"
                    align="center"
                    label="公司">
                </el-table-column>
                <el-table-column
                    prop="link_phone"
                    align="center"
                    label="联系电话">
                </el-table-column>
                <el-table-column
                    prop="link_address"
                    align="center"
                    label="联系地址">
                </el-table-column>
            </el-table>
            <div class="weitu">
                <el-container>
                    <el-header style="height: unset;" >文图详情</el-header>
                    <el-main style="height: unset;" v-html="purchaseDetails.content_img"></el-main>
                </el-container><br>
                <el-button style="margin: 100px;" @click="purchase">返回</el-button>
            </div>
            
        </div>

</template>

<script>
import url from '../../serverAPI.config.js'
    export default {
        data () {
            return {
                purchaseDetails:{},//数据
                headers:{"Authorization":"Bearer eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIxIiwic3ViIjoiMTM0MzMxNTcxNDciLCJpYXQiOjE1NjAzMzQzNTEsInJvbGVzIjoidXNlciJ9.cpLQ0B-asQpLawZ_uoEi0VkMlfbVWgWO4rxKtKeD404"} ,
                tableData: [],
                content:'',
                userName:''
            }
        },
        components: {

        },
        mounted(){
           this.userName = localStorage.getItem('siteName');
           this.getPurchaseDetails(this.$route.query.id);
        },
        methods:{
            purchase(){
                this.$router.go(-1)
            },
            getPurchaseDetails(id){
                var username=this.userName;
                this.$http(
                    {
                        url:`${url.Purchase_details}/${id}`,
                        // headers:this.headers,
                        method:'get'
                    }
                ).then(res=>{
                    if(res.data.code == 20000){
                        this. purchaseDetails = res.data.data;
                        this.purchaseDetails.message = JSON.parse(this.purchaseDetails.message)
                        // this.purchaseDetails.content_img = JSON.parse(this.purchaseDetails.content_img);
                        this.purchaseDetails.delivery_date = this.purchaseDetails.delivery_date+"天";
                        this.purchaseDetails.send_date = this.resolvingDate(this.purchaseDetails.send_date);
                        this.purchaseDetails.last_date = this.resolvingDate(this.purchaseDetails.last_date);
                        this.tableData.push(this.purchaseDetails);
                        }
                    })

            },
            //时间格式转化
                 resolvingDate(date){
                    var dateee = new Date(date).toJSON();
                    return new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '') ;
                 },
        }
    }
</script>

<style lang="scss" scoped>
.weitu{
    width: 100%;
    margin-top: 100px;
    text-align: center;
}
.el-container{
    width: 70%;
    display: inline-block;
    text-align: center;
    border: 1px solid;
}
 .el-header {
    

    background-color: #E9EEF3;
    color: #333;
    line-height: 30px;
    
  }
  
  .el-main {
    background-color: white;
    color: #333;
    line-height: 60px;
  }
.header_search{
    padding: 20px 50px 20px 20px;
    position: relative;
    .search{
        width: 60%;
    }
    .search_btn{

    }
    .header_search_wei{
        display: inline-block;
        float: right;
        .warning{

        }
        .saixuan{
            
        }
    }
}
 
</style>