<!-- 组件说明 -->
<template>
  <!-- 职位管理页面 -->
  <div class="positionManagment">
    <!--  新增职位弹窗 -->
    <div id="postionid" v-show="isShow">
      <div class="newPosition">
        <div class="postiontxt">
          <div class="postionTitle">
            <h4>{{postionTitle}}</h4>
          </div>
          <ul>
            <li>
              <span>角色名称：</span>
              <input type="text" placeholder="请输入角色名称" v-model="selectJobs.name" />
            </li>
            <li>
              <span>权限字符：</span>
              <input type="text" placeholder="请输入权限" v-model="selectJobs.roles_symbol" />
            </li>
          </ul>
        </div>
        <div class="elementTree" v-if="treeShow">
          <el-tree
            :data="data"
            show-checkbox
            node-key="id"
            :default-checked-keys="defaultSelect"
            :props="defaultProps"
            ref="tree"
            @check-change="getCheckedNodes()"
            style="width:210px;"
          ></el-tree>
        </div>
        <hr style="width:95%;" color="#F0F0F0" />
        <div class="commintBtn">
          <input type="button" value="取消" @click="handleCancel" />
          <input type="button" value="确定" @click="saveJob()" style="background:#F99901" />
        </div>
      </div>
    </div>

    <!-- 头部 -->
    <div class="positionManagmentTitle clearfix">
      <h4 class="fl">职位管理</h4>
      <div class="fr">
        <input type="button" value="新增" @click="addShow()" />
        <!-- <input type="button" value="删除" class="listBtn disableBtn" style="background:#d21d27" /> -->
      </div>
    </div>
    <!-- 内容 -->
    <div class="positionContent">
      <template>
        <el-table
          :data="userJobList"
          stripe
          style="width: 100%;font-size:16px;
            font-family:MicrosoftYaHei;
            font-weight:400;
            color:rgba(51,51,51,1);"
          highlight-current-row
          @current-change="handleCurrentChange"
        >
          <el-table-column label="序号" align="center" type="index" prop="index"  width="100px">
            <!-- <template slot-scope="scope">
              <input
                type="radio"
                name="radio"
                :id="scope.row.id"
                v-model="checkedValue"
                :value="scope.row.id"
                
              />
              <label :for="scope.row.id"></label>
            </template> -->
          </el-table-column>
          <el-table-column prop="name" label="角色名称" align="center"></el-table-column>
          <el-table-column prop="roles_symbol" label="权限字符" align="center" ></el-table-column>
          <el-table-column prop="date" label="创建时间" align="center" ></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <input
                type="button"
                value="编辑"
                class="listBtn editBtn"
                @click="postionTitle='编辑职位管理',handleClick(scope.row)"
              />
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
  </div>
</template>

<script>
import url from "@/serverAPI.config.js";
//import x from ''
export default {
  components: {},
  data() {
    return {
      treeShow: true,
      isSelected: false,
      defaultSelect: [],
      checkedValue:"",
      data: [
        {
          id: 1,
          label: "供应商",
          url: "/supplier",
          children: [
            {
              id: 11,
              label: "全部供应商",
              url: "/supplier",
               children: [
                {
                  id: 111,
                  label: "供应商详情",
                  url: "/supplierDetail"
                }
              ]
            },
            {
              id: 12,
              label: "合作的供应商",
              url: "/cooperativeSupplier"
            },
            {
              id: 13,
              label: "收藏的供应商",
              url: "/conllectionSupplier"
            }
          ]
        },
        {
          id: 2,
          label: "求购信息",
          url: "/purchase",
               children: [
                {
                  id: 21,
                  label: "求购信息Detail",
                  url: "/pur_details"
                },
                 {
                  id: 22,
                  label: "发布求购信息",
                  url: "/pur_release"
                }
              ]
        },
        {
          id: 3,
          label: "商品",
          url: "/collection",
          children: [
            {
              id: 31,
              label: "收藏的商品",
              url: "/collection"
            },
            {
              id: 32,
              label: "我的足迹",
              url: "/myFootprint"
            }
          ]
        },
        {
          id: 4,
          label: "积分",
          url: "/Integral",
          children: [
            {
              id: 41,
              label: "积分",
              url: "/Integral"
            },
            {
              id: 42,
              label: "会员等级",
              url: "/upVip"
            },
            {
              id: 43,
              label: "充值",
              url: "/recharge"
            },
            {
              id: 44,
              label: "卡券",
              url: "/coupon"
            }
          ]
        },
        {
          id: 5,
          label: "帐号",
          url: "/user",
          children: [
            {
              id: 51,
              label: "企业信息",
              url: "/user",
                children: [
                  {
                    id: 511,
                    label: "编辑企业信息",
                    url: "/amendUser"
                  }
                ]
            },
            {
              id: 52,
              label: "子账号",
              url: "/subAccountList",
                children: [
                  {
                    id: 521,
                    label: "新增/编辑子账号",
                    url: "/subAccountAdd"
                  }
                ]
            },
            {
              id: 53,
              label: "帐号管理",
              url: "/positionManagment"
            }
          ]
        },
        {
          id: 6,
          label: "营销工具",
          url: "/marketingEnter",
                children: [
                  {
                    id: 61,
                    label: "预览",
                    url: "/shareJump"
                  },{
                    id: 62,
                    label: "编辑",
                    url: "/marketing"
                  }
                  ,{
                    id: 63,
                    label: "增加商品",
                    url: "/catalogue"
                  }
                ]
        },
        {
          id: 7,
          label: "消息中心",
          url: "/news",
                children: [
                  {
                    id: 71,
                    label: "供应商消息",
                    url: "/News_details"
                  },{
                    id: 72,
                    label: "系统消息",
                    url: "/Notice_details"
                  }
                  ,{
                    id: 63,
                    label: "增加商品",
                    url: "/catalogue"
                  }
                ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      },
      isShow: false,
      userJobList: [],
      selectJobs: {},
      postionTitle: "",
      selectRoles: []
    };
  },
  computed: {},
  created() {
    this.getJobs();
  },
  methods: {
    addShow() {
      this.treeShow = true;
      this.defaultSelect = [];
      this.postionTitle = "新增职位管理";
      this.isShow = true;
      this.selectJobs = {};
    },
    //    选中当前行
    handleCurrentChange(val) {
      this.isSelected = val;
    },
    // 取消编辑
    handleCancel() {
      this.treeShow = false;
      this.isShow = !this.isShow;
    },
    handleClick(item) {
      this.treeShow = true;
      this.selectJobs = item;
      this.defaultSelect = [];
      if (item.urls)
        item.urls.map(item => {
          this.data.map(d => {
            if (d.children && d.children.length > 0) {
              d.children.map(c => {
                if (item == c.url) {
                  this.defaultSelect.push(c.id);
                }
              });
            } else {
              if (item == d.url) {
                this.defaultSelect.push(d.id);
              }
            }
          });
        });

      this.isShow = !this.isShow;
    },

    getJobs() {
      this.$http({
        url: `${url.findUserJobs}/${localStorage.getItem("ID")}/0`,
        method: "get"
      }).then(res => {
        if (res.data.code == 20000) {
          this.userJobList = res.data.data;
          this.userJobList.map(item => {
            item.date = this.resolvingDate(item.date);
            if (item.urls) item.urls = JSON.parse(item.urls);
          });
        }
      });
    },
    saveJob() {
      var saveJob = JSON.parse(JSON.stringify(this.selectJobs));
      if (!saveJob.name) {
        if (document.getElementsByClassName("el-message").length == 0)
          this.$message.error("角色名称不能为空");
        return;
      }
      var isEN = false;

      this.userJobList.map(item => {
        if (item.name == saveJob.name && item.id != saveJob.id) {
          isEN = true;
        }
      });
      if (isEN) {
        if (document.getElementsByClassName("el-message").length == 0)
          this.$message.error("角色已经存在");
        return;
      }

      
      if (!saveJob.roles_symbol) {
        if (document.getElementsByClassName("el-message").length == 0)
          this.$message.error("权限字符不能为空");
        return;
      }

      var urls = [];
      this.selectRoles.map(item => {
        if (urls.indexOf(item.url) == -1) {
          urls.push(item.url);
        }
      });
      if (urls.length == 0) {
        if (document.getElementsByClassName("el-message").length == 0)
          this.$message.error("请选择权限");
        return;
      }
      saveJob.urls = JSON.stringify(urls);
      saveJob.u_id = localStorage.getItem("ID");
      saveJob.type = "0";
      console.log(saveJob);
      if (saveJob.id) {
        this.$http({
          url: `${url.updateUserJob}`,
          method: "put",
          data: saveJob
        }).then(res => {
          if (res.data.code == 20000) {
            this.getJobs();
            this.treeShow = false;
            this.isShow = false;
          } else {
            this.$message.error(res.data.message);
          }
        });
      } else {
        this.$http({
          url: `${url.addUserJob}`,
          method: "post",
          data: saveJob
        }).then(res => {
          if (res.data.code == 20000) {
            this.getJobs();
            this.treeShow = false;
            this.isShow = false;
          } else {
            this.$message.error(res.data.message);
          }
        });
      }
    },
    //时间格式转化
    resolvingDate(date) {
      var dateee = new Date(date).toJSON();
      return new Date(+new Date(dateee) + 8 * 3600 * 1000)
        .toISOString()
        .replace(/T/g, " ")
        .replace(/\.[\d]{3}Z/, "");
    },
    getCheckedNodes() {
      this.selectRoles = this.$refs.tree.getCheckedNodes();
    }
  },
  updated() {
    document.getElementById("postionid").style.height =
      document.getElementById("app").clientHeight + "px";
  }
};
</script>

<style lang="scss">
.positionManagment {
  .el-checkbox__input.is-indeterminate .el-checkbox__inner::before {
    background-color: #000;
    top: 6px;
  }
  .el-tree-node__label {
    margin-left: 8px;
  }
  .el-table th {
    background-color: #f7f7f7;
    font-size: 16px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
  }
  .el-tree {
    font-size: 14px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    .el-checkbox__inner {
      border: 1px solid #666666;
      width: 16px;
      height: 16px;
    }
  }
  .el-tree-node__content {
    margin-bottom: 16px;
  }
  .el-tree-node__content > .el-tree-node__expand-icon {
    padding: 2px;
    border: 1px solid #f99901;
    border-radius: 4px;
    margin-right: 12px;
  }
  .el-tree-node__expand-icon:before {
    content: "\e6d9";
    color: #f99901;
    font-size: 18px;
    transform: none;
  }
  .el-tree-node__expand-icon.expanded {
    transform: none;
  }
  .expanded.el-icon-caret-right:before {
    content: "\e6d8";
  }
  .is-leaf.el-tree-node__expand-icon.el-icon-caret-right:before {
    content: "\e6d8";
  }
  .el-checkbox__input.is-checked .el-checkbox__inner {
    background-color: #fff;
  }
  .el-checkbox__inner::after {
    border-color: #666;
    left: 5px;
    top: 2px;
  }
  .el-tree-node__children
    .el-tree-node__expand-icon.el-icon-caret-right:before {
    content: "";
    width: 0;
  }
  .el-tree-node__children .el-tree-node__content > .el-tree-node__expand-icon {
    padding: 0;
    border: none;
  }
  .el-tree-node.is-expanded > .el-tree-node__children {
    padding-left: 28px;
  }
  .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: #fff;
  }
}
</style>

<style lang='scss' scoped>
.positionManagment {
  .fl {
    float: left;
  }
  .fr {
    float: right;
  }
  // 头部样式
  .positionManagmentTitle {
    padding-left: 48px;
    padding-right: 24px;
    height: 68px;
    line-height: 68px;
    background-color: #fff;
    box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.04);
    margin-bottom: 5px;
    h4 {
      font-size: 20px;
      font-family: MicrosoftYaHeiLight;
      font-weight: bold;
      color: rgba(102, 102, 102, 1);
    }
    input {
      width: 80px;
      height: 32px;
      background: rgba(252, 146, 99, 1);
      border-radius: 4px;
      font-size: 14px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      cursor: pointer;
    }
  }
  //   内容样式
  .positionContent {
    label {
      display: inline-block;
      position: relative;
      padding-left: 20px;
      cursor: pointer;
      height: 12px;
    }
    label::before {
      display: inline-block;
      position: absolute;
      left: 0;
      content: "";
      width: 14px;
      height: 14px;
      border: 1px solid;
      border-radius: 50%;
      margin-right: 40px;

    }
    input[type="radio"] {
      display: none;
    }
    input[type="radio"]:checked + label::before {
      content: "●";
      text-align: center;
      line-height: 12px;
    }
  }
  .listBtn {
    padding: 0 18px;
    height: 28px;
    line-height: 28px;
    font-size: 14px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    margin-right: 18px;
    box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.18);
    border-radius: 4px;
    cursor: pointer;
  }
  .disableBtn {
    background-color: #d21d27;
  }
  .ableBtn {
    background-color: #80c269;
  }
  .resetBtn {
    background-color: #fc9263;
  }
  .editBtn {
    background-color: #12a6e9;
  }

  //遮罩层
  #postionid {
    width: 100%;
    background: rgba(51, 51, 51, 0.7);
    bottom: 0;
    left: 0;
    position: fixed;
    z-index: 998;
  }

  //新增职位样式
  .newPosition {
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 1000;
    background-color: #fff;
    box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.04);
    border-radius: 12px;
    margin-top: -323px;
    margin-left: -356px;

    .postiontxt {
      // 职位文本框
      ul {
        padding: 46px 115px 0 115px;
        li {
          margin-bottom: 16px;
          span {
            font-size: 16px;
            font-family: MicrosoftYaHeiLight;
            font-weight: bold;
            color: rgba(249, 153, 1, 1);
          }
          input[type="text"] {
            width: 395px;
            height: 41px;
            background: rgba(255, 255, 255, 1);
            border: 1px solid rgba(249, 190, 97, 1);
            border-radius: 8px;
            font-size: 14px;
            font-family: MicrosoftYaHei;
            font-weight: 400;
            text-indent: 18px;
            color: #000;
          }
        }
      }
      .postionTitle {
        padding: 30px 0;
        padding-left: 48px;
        h4 {
          position: relative;
          font-size: 16px;
          font-family: MicrosoftYaHeiLight;
          font-weight: bold;
          color: rgba(102, 102, 102, 1);
          &::before {
            position: absolute;
            content: "";
            width: 2px;
            height: 14px;
            background: rgba(249, 153, 1, 1);
            border-radius: 1px;
            top: 4px;
            left: -12px;
          }
        }
      }
    }
    //   树形控件
    .elementTree {
      padding-top: 16px;
      padding-left: 210px;
      height: 350px;
      overflow-y: scroll;
    }
    // 按钮
    .commintBtn {
      text-align: center;
      padding-top: 20px;
      padding-bottom: 28px;
      input[type="button"] {
        width: 80px;
        height: 36px;
        background: rgba(153, 153, 153, 1);
        border-radius: 8px;
        font-size: 16px;
        font-family: MicrosoftYaHeiLight;
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
        margin-right: 44px;
      cursor: pointer;

      }
    }
  }
}
</style>