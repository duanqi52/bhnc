<template>
  <div id="mian_nav">


        <el-tabs v-model="activeName" @tab-click="handleClick" style="margin-left: 10px;">
          <el-tab-pane label="大市场(64)" name="first" >
            <div style="height: 55px;margin-top: 20px;">
                        <el-row :gutter="24" >
                          <el-col :span="2"><div class="grid-content bg-purple" style="position: relative;top:8px;left: 30px;">
                            <el-checkbox :indeterminate="isIndeterminate" @change="handleCheckAllChange">全选</el-checkbox>
                          </div>
                          </el-col>
                          <el-col :span="2"><div class="grid-content bg-purple" style="position: relative;right: 10px;">
                          <el-button  style="color: #FFFFFF;background-color: #FC9263;">重发</el-button>
                          </div>
                          </el-col>
                          <el-col :span="2"><div class="grid-content bg-purple" style="position: relative;right: 58px;">
                          <el-button  style="color: #FFFFFF;background-color: #FC9263;">下架</el-button>
                          </div>
                          </el-col>
                          <el-col :span="3" ><div class="grid-content bg-purple" style="position: relative;right: 107px;">
                          <el-button style="color: #FC9263;background-color: #FFFFFF;">永久删除</el-button>
                          </div>
                          </el-col>
                          <el-col :span="2" ><div class="grid-content bg-purple" style="position: relative;left: 480px;">
                          <el-select v-model="value" placeholder="请选择">
                              <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                              </el-option>
                            </el-select>
                          </div>
                          </el-col>
                          <el-col :span="1" :push="1"><div class="grid-content bg-purple">
                           <el-input v-model="input" placeholder="商品标题 / 型号" clearable style="width: 220px;position: relative;left: 410px;outline:none;"></el-input>
                          </div>
                          </el-col>
                          <el-col :span="1" :push="11"><div class="grid-content bg-purple" style="position: relative;right: 80px;">
                           <el-button style="color: #FC9263;background-color: #FFFFFF;">搜索</el-button>
                          </div>
                          </el-col>

                        </el-row>
                       </div>

            <div class="main_table">
                          <el-table
                             ref="multipleTable"
                             :data="tableData"
                             tooltip-effect="dark"
                             style="width: 100%"
                             :header-cell-style="{background:'#F0F0F0'}"
                             >
                             <el-table-column
                               label="全选"
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
                               label="更新时间"
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
                                         @click="handleEdit(scope.$index, scope.row)">修改详情</el-button>
                                     </template>
                             </el-table-column>
                             <el-table-column
                               prop="address"
                               label="状态"
                              >
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
          </el-tab-pane>
          <el-tab-pane label="非公开商品" name="second"></el-tab-pane>

        </el-tabs>


    </div>













  </div>
</template>

<script>
  export default {
    data() {
      return {
        activeIndex: '1',
        activeIndex1: '1',
        activeName: 'first',
        value:'',
        input: '',
        multipleTable:[],
        isIndeterminate: false,
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
      }
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClick(tab, event) {
              /*console.log(tab, event);*/
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

<style  lang="scss" scoped>
 /deep/ .el-menu--horizontal>.el-menu-item.is-active{
       border-bottom: 2px solid #FC9263;
       color: #FC9263;
     }
      .el-menu-item {
       font-size: 18px;
       padding: 0 34px;
     }


/deep/ .el-tabs__item.is-active{
      padding: 5px 29px;
      color: #FC9263;
      font-size: 20px;
      height: 60px;
}
/deep/ .el-tabs__item{
   padding: 9px 15px;
   height: 60px;
   font-size: 20px;
}
/deep/ .el-tabs__active-bar{
      background-color: #FC9263;
}
/deep/ .el-tabs__item:hover{
      color: #909399;
      cursor: pointer;
}
/deep/.el-pagination.is-background .el-pager li:not(.disabled).active{
  background-color:#FC9263 ;
}
/deep/.el-pagination.is-background .el-pager li:hover{
   color: #909399;
}
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
 .main_foot{
      width:1539px;
      height:67px;
      background:rgba(255,255,255,1);
      border-top: 10px solid #F0F0F0;
     .foot_a{
       text-align: -webkit-center;
       position: relative;
       top: 20px;
     }
    }
</style>
