<template>
<div id="main">
  <div class="main_top">
    <div class="main_left">
      <p class="p1">押金</p>
      <img src="../../assets/img/moneybag.png" alt="">
      <div class="main_p">
        <p class="p2">￥</p>
        <p class="p3">1000.00</p>
        <p class="p4">( 份额：100000 )</p>
      </div>
      <div class="main_b">
        <el-row>
          <el-button style="color: #FFFFFF;background-color: #FC9263;">充值押金</el-button>
          <el-button style="color: #FC9263;background-color: #FFFFFF;">押金提现</el-button>
        </el-row>
        <a href="#">《笔海弄潮平台现货押金守则》</a>
      </div>
    </div>
    <div class="main_center">
      <div class="main_Progress">
        <el-progress type="circle" :percentage="25" ></el-progress>
      </div>
      <div class="center_text">
        <p>占用份额 5674</p>
        <p>总 份 额 100000</p>
      </div>
    </div>
    <div class="main_right">
      <div style="color: #999999;margin-top: 11px;border-bottom: 1px solid  #F0F0F0;height: 30px;margin-left: 23px;">
       交易详情
      </div>
      <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto;height: 255px;" id="ulData">

        </ul>
    </div>
  </div>

  <div class="main_optional">
    <div class="main_optional01">
      <el-row>
        <el-checkbox :indeterminate="isIndeterminate" @change="handleCheckAllChange">全选</el-checkbox>
        <el-button  style="color: #FC9263;background-color: #FFFFFF;">删除现货</el-button>
        <el-button  style="color: #FFFFFF;background-color: #FC9263;" @click="dialogTableVisible = true">添加商品</el-button>
      </el-row>
    </div>

    <div class="main_optional02">
      <el-row style="position: absolute;">
        <el-col :span="6">
          <div class="grid-content bg-purple-dark">
           <el-select v-model="value" placeholder="请选择" style="width: 122px;position: relative;left: 445px;cursor: pointer;">
               <el-option
                 v-for="item in options"
                 :key="item.value"
                 :label="item.label"
                 :value="item.value">
               </el-option>
             </el-select>
        </select>
        </div>
       </el-col>
       <el-col :span="12">
         <el-input v-model="input" clearable placeholder="商品标题 / 型号" style="width: 220px;position: relative;left: 480px;cursor: pointer;"></el-input>
       </el-col>
       <el-col :push="16" class="optionalc">
         <el-button style="color: #FC9263;background-color: #FFFFFF;position: relative;left: 538px;bottom: 40px;" >搜索</el-button>
       </el-col>

      </el-row>


    </div>
  </div>
  <div class="main_table">
     <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%;"
        :header-cell-style="{background:'#F0F0F0'}"
        >
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
         prop="address"
          label="商品"
          width="800">
         <template slot-scope="scope">
           <div class="commodity">
             <img :src="scope.row.address.img" alt="" class="commodityImg">
             <div class="commodityTiele">
               {{scope.row.address.title}}
             </div>
           </div>
         </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="型号"
         >
        </el-table-column>
        <el-table-column
          prop="address"
          label="价格"
          >
        </el-table-column>
        <el-table-column
          prop="address"
          label="现货库存"
          >

        </el-table-column>
        <el-table-column
          prop="name"
          label="占用份额"
         >
        </el-table-column>
        <el-table-column

          label="添加时间"
           >
           <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column
          prop="address"
          label="操作"
         >
          <template slot-scope="scope">
                  <el-button style="background-color: #FC9263;color: #FFFFFF;"
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)">更改库存</el-button>
                </template>
        </el-table-column>
      </el-table>
  </div>
  <div class="main_foot">
    <div class="foot_a">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="100">
      </el-pagination>
    </div>
  </div>


  <el-dialog title="添加现货商品" :visible.sync="dialogTableVisible" width="1260px">
    <el-table :data="gridData">
      <el-table-column property="date" label="商品" width="500"></el-table-column>
      <el-table-column property="name" label="型号" width="100"></el-table-column>
      <el-table-column property="address" label="价格" width="100"></el-table-column>、
      <el-table-column property="date" label="状态" width="100"></el-table-column>
      <el-table-column property="name" label="库存" width="200"></el-table-column>
      <el-table-column property="address" label="份额"></el-table-column>
    </el-table>
    <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false" style="background-color: #FC9263;color: #FFFFFF;">添加商品</el-button>
      </div>
  </el-dialog>
</div>
</template>

<script>

  export default {
    data(){
      return{
         checked: false,
         input: '',
         value:'',

         gridData: [{
                   date: '2016-05-02',
                   name: '王小虎',
                   address: '上海市普陀区金沙江路 1518 弄'
                 }, {
                   date: '2016-05-04',
                   name: '王小虎',
                   address: '上海市普陀区金沙江路 1518 弄'
                 }, {
                   date: '2016-05-01',
                   name: '王小虎',
                   address: '上海市普陀区金沙江路 1518 弄'
                 }, {
                   date: '2016-05-03',
                   name: '王小虎',
                   address: '上海市普陀区金沙江路 1518 弄'
                 }],
                 dialogTableVisible: false,
          options: [{
                   value: '选项1',
                   label: '黄金糕'
                 }, {
                   value: '选项2',
                   label: '双皮奶'
                 }, {
                   value: '选项3',
                   label: '蚵仔煎'
                 }, {
                   value: '选项4',
                   label: '龙须面'
                 }, {
                   value: '选项5',
                   label: '北京烤鸭'
                 }],
          tableData: [{
              date: '2016-05-02',
              name: '王小虎',
              address: {
                img:"../../../static/img/logo.jpg",
                title:"他妈的商品",
              },
            }, {
              date: '2016-05-02',
              name: '王小虎',
              address: {
                img:"../../../static/img/logo.jpg",
                title:"他妈的商品",
              },
            }, {
              date: '2016-05-04',
              name: '王小虎',
              address: {
                img:"../../../static/img/logo.jpg",
                title:"他妈的商品",
              },
            }, {
              date: '2016-05-01',
              name: '王小虎',
              address: {
                img:"../../../static/img/logo.jpg",
                title:"他妈的商品",
              },
            }, {
              date: '2016-05-08',
              name: '王小虎',
              address: {
                img:"../../../static/img/logo.jpg",
                title:"他妈的商品",
              },
            }],
                 multipleTable:[],
                 isIndeterminate: false,
      };
    },
     methods: {
          load () {
           let ulData=document.getElementById("ulData");
           let obj=[
             {
               title:"充值",
               date:"2019-10-09  13:50",
               money:"+￥200.00"
             },
             {
               title:"付款",
               date:"2019-10-09  13:50",
               money:"+￥200.00"
             },
             {
               title:"充值",
               date:"2019-10-09  13:50",
               money:"+￥200.00"
             },
             {
               title:"付款",
               date:"2019-10-09  13:50",
               money:"+￥200.00"
             }];
             for(var i=0;i<obj.length;i++){
               ulData.innerHTML+=`<li>
                  <div style='margin-left:10px'>
                     ${obj[i].title}
                  </div>
                  <div style='margin-left:10px'>
                     ${obj[i].date}
                  </div>
                     <div style='text-align:right;border-bottom: 1px solid  #F0F0F0;'>
                     ${obj[i].money}
                     </div>
               </li>`;
             }
          },
         handleSelectionChange(val) {
           this.multipleTable = val;
           this.ids = [];
           this.multipleTable.map(item => {
             this.ids.push(item.id);
           });
         },
         handleCheckAllChange() {
             this.$refs.multipleTable.toggleAllSelection()
             this.isIndeterminate = false
         },
        }
  }
</script>

<style scoped lang="scss">

  /deep/.el-pagination.is-background .el-pager li:not(.disabled).active{
    background-color:#FC9263 ;
  }
  /deep/.el-pagination.is-background .el-pager li:hover{
     color: #909399;
  }
  #main{
    background-color: #F0F0F0;
    .main_top{
      display: flex;
      width: 1540px;
      height: 305px;
      .main_left{
        width:518px;
        height:303px;
        background:rgba(255,255,255,1);
        box-shadow:0px 1px 4px 0px rgba(0, 0, 0, 0.04);
        position: relative;
        img{
          width: 234px;
          height: 240px;
          display:inline-block;
          position:absolute;
          z-index: 1;
          right: 3px;
          top: 0;
        }

        .main_p{
          width: 500px;
          height: 30px;
          position: relative;
          top:53px;
          left: 30px;
         .p2{
           width:20px;
           height:28px;
           font-size:36px;
           font-family:Microsoft YaHei;
           font-weight:400;
           color:rgba(252,146,99,1);
           display:inline-block;
           position: relative;
           right: 1px;
         }
         .p3{
          width:117px;
          height:25px;
          font-size:32px;
          font-family:Microsoft YaHei;
          font-weight:400;
          color:rgba(252,146,99,1);
          display:inline-block;
          position: relative;
          left: 20px;
         }
         .p4{
           width:140px;
           height:18px;
           font-size:18px;
           font-family:Microsoft YaHei;
           font-weight:400;
           color:rgba(153,153,153,1);
           display:inline-block;
           position: relative;
            left: 35px;
         }
        }
        .p1{
          width:49px;
          height:23px;
          font-size:24px;
          font-family:Microsoft YaHei;
          font-weight:400;
          color:rgba(102,102,102,1);
          position: relative;
          top:25px;
          left:35px;
        }
        .main_b{
          position: relative;
          top:120px;
          left: 40px;
          a{
            width:183px;
            height:15px;
            font-size:14px;
            font-family:Microsoft YaHei;
            font-weight:400;
            color:rgba(15,107,255,1);
          }
        }
      }
      .main_center{
        width:495px;
        height:303px;
        background:rgba(255,255,255,1);
        box-shadow:0px 1px 4px 0px rgba(0, 0, 0, 0.04);
        border-left: 3px solid #F0F0F0;
        border-right: 3px solid #F0F0F0;
        .center_text{
          position: relative;
          top:100px;
          text-align: center;
        }
        .main_Progress{
          text-align: center;
        }
      }
      .main_right{
        width:518px;
        height:303px;
        background:rgba(255,255,255,1);
        box-shadow:0px 1px 4px 0px rgba(0, 0, 0, 0.04);
        table{
          width: 517px;
          height:303px;
          border-bottom:1px solid #F0F0F0;
          tr{
            border-bottom:1px solid #F0F0F0;
          }
        }
      }
    }
    .main_optional{
      width:1532px;
      height:68px;
      background:rgba(255,255,255,1);
      box-shadow:0px 1px 4px 0px rgba(0, 0, 0, 0.04);
      position: relative;
      top:5px;


     .main_optional01{
       width: 310px;
       position: relative;
       top: 12px;
       left: 23px;

     }
     .main_optional02{
       width: 650px;
       position: relative;
       top: -21px;
       left: 500px;
       /*.optionalc{
         position: relative;
         bottom: 40px;
       }*/
       .optionalcs{
         position: relative;
         bottom: 61px;
         width:56px;
         height:14px;
         font-size:14px;
         font-family:Microsoft YaHei;
         font-weight:400;
         color:#C0C0C0;

       }
     }
   .ipt{
       width:220px;
       height:30px;
       border:1px solid rgba(192,192,192,1);
       border-radius:4px;
       display: inline-block;
     }
    }
    .main_table{
      position: relative;
      bottom:-8px;
     .commodity{
       .commodityImg{
        width: 72px;
        height: 72px;
        float: left;
       }
       .commodityTiele{
        float: left;
        margin-left: 17px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        width: 70%;
        text-align: left;
       }
     }
    }
    .main_foot{
      width:1539px;
      height:67px;
      background:rgba(255,255,255,1);
      border-top: 20px solid #F0F0F0;
     .foot_a{
       text-align: -webkit-center;
       position: relative;
       top: 20px;
     }
    }
    #main_select{
      width:122px;
      height:30px;
      border:1px solid #C0C0C0;
      border-radius:4px;
      position: relative;
      right: 5px;
    }
  }
</style>
