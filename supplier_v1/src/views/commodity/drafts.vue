<template>
  <div id="bhncDrafts">
    <div class="draftsHead">
        <div class="draftsHead_a">草稿箱<span>（共计：<span style="color:#FC9F77;">6</span>）</span></div>
    </div>
    <div style="position: relative;">
      <button class="deletes">永久删除</button>
      <el-table
        stripe
        ref="multipleTable" 
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
          
        </el-table-column>
        <el-table-column
          label="商品"
          align="center"
          width="1000px">
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
          sortable
          prop="date"
          label="保存时间"
          align="center">
        </el-table-column>
        <el-table-column
          label="操作"
          align="center">
          <template>
        <el-button type="warning">编辑</el-button>
        </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 20px">
       <el-checkbox :indeterminate="isIndeterminate" @change="handleCheckAllChange">全选</el-checkbox>
    </div>
      <el-pagination
        class="fy"
        background
        layout="total,prev, pager, next"
        :total="1000"
        >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import url from "@/serverAPI.config.js";
export default {
  data() {
    return {
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
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: {
            img:"../../../static/img/logo.jpg",
            title:"他妈的商品",
          },
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: {
            img:"../../../static/img/logo.jpg",
            title:"他妈的商品",
          },
        }],
        multipleSelection: [],
        isIndeterminate: false,
    };
  },
  mounted() {
  },
  components: {

  },
  methods: {
      //这里会把全选的数据放进 multipleSelection里
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.ids = [];
      this.multipleSelection.map(item => {
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

<style lang="scss">
$color: #fc9263;
#bhncDrafts {
  //复选框样式
  .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
    color: $color;
  }
  .el-checkbox__input.is-focus .el-checkbox__inner {
    border-color: $color;
  }
  .el-checkbox__inner:hover {
    border-color: $color;
  }
  .el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: $color;
  }
  .el-checkbox__input.is-checked .el-checkbox__inner,
  .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: #f6f6f6;
    border-color: #666666;
  }
  .el-checkbox__input.is-checked .el-checkbox__inner::after {
    -webkit-transform: none;
    transform: none;
    border: none;
  }
  .el-checkbox__inner::after {
    border: none;
    content: "✔";
    left: 1px;
    position: absolute;
    top: -1px;
  }
}
</style>

<style scoped lang="scss">
$color: #fc9263;
#bhncDrafts {
 .draftsHead{
    height:42px;
    background:rgba(255,255,255,1);
    box-shadow:0px 1px 2px 0px rgba(0, 0, 0, 0.04);
    border-bottom: 1px solid #F0F0F0;
    .draftsHead_a{
    font-size:20px;
    font-family:Microsoft YaHei;
    font-weight:400;
    color:rgba(102,102,102,1);
    margin-top: 20px;
    margin-left: 47px;
    
        span{
          font-size:14px;
        }
    }
 }
 .deletes{
   position: absolute;
  font-size:14px;
  font-family:Microsoft YaHei;
  font-weight:400;
  color:rgba(252,146,99,1);
  width:90px;
  height:27px;
  background:rgba(252,146,99,0.06);
  border:1px solid rgba(252,146,99,1);
  border-radius:4px;
  top: 15px;
  left: 50px;
  z-index: 99;
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
    width: 90%;
    text-align: left;
   }
 }
 .fy {
    margin: 50px;
    text-align: center;
  }
}
</style>