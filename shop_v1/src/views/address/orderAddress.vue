<template>
  <div class="orderInfo w">
    <Headers></Headers>        
    <!-- 地址栏 -->
    <div class="address">
        <div class="order_titleBox">
        </div>
        <ul>
            <li v-for="(item,index) in addressList" :key="index" @click="changeList(index);updateAddress(item.id)" >
            <div class="chooseBox">
                <input
                type="checkbox"
                name="default"
                id="address"
                class="chooseBtn"
                @click.stop="selectAddress($event,item)"
                />
            </div>
            <div class="company">{{item.recipients}}</div>
            <div class="addressName">{{item.address}}</div>
            <div class="phone">{{item.phone}}</div>
            <div class="chooseType" v-if="item.is_default == '1'">默认地址</div>
            <div class="chooseType1" v-else @click.stop="setDefault(item)">设置默认</div>
            </li>
        </ul>
      <div></div>
      <!-- 添加地址按钮 -->
      <div class="addaddress clearfix w">
        <input type="button" value="添加新地址" class="addBtn" @click="addaddress" />

        <input type="button" value="删除" class="addBtn" @click="deleteAddress()" />
      </div>

   
    </div>
    <!-- 添加地址先隐藏，点击时显示 -->
    <div class="addressBox w" v-show="isShow">
      <ul>
        <li>
          <i>收件人：</i>
          <input type="text" placeholder="请输入收件人" v-model="addressSave.recipients" />
        </li>
        <li>
          <i>联系电话：</i>
          <input type="text" placeholder="请输入收件人联系电话" v-model="addressSave.phone" />
        </li>
        <li>
          <i>收件地址：</i>
          <input type="text" placeholder="请输入收件地址" v-model="addressSave.address" />
        </li>
        <li>
          <input type="button" value="保存" class="adBtn" @click="addAddress()" />
          <input type="button" value="取消" class="adBtn" @click="cancelAdd" />
        </li>
      </ul>
    </div>

       <!-- 提交状态 -->
     <div class="commit_state w">
        <input type="button" value="保存" class="saveBtn" @click="linkOrderInfo" />
        <input type="button" value="取消" class="cancelBtn" @click="$router.push('/userInfo')" />
     </div>
  </div>
</template>
<script>
import url from "@/serverAPI.config.js";
import Headers from "@/components/headers";

export default {
  data() {
    return {
      //   添加地址显示
      isShow: false,
      flag: true,
      // 地址信息列表
      addressList: [],
      addressSave: {},
      deleteAddressList: [],
      deleteAddressListSave: [],
      username:'',
      gid:''
    };
  },
  watch: {},
  created() {
    this.username=localStorage.getItem("username")
    this.gid=this.$route.query.gid;
    this.getAddress();
    console.log(this.gid)
  },
  methods: {
    //   选择地址
    changeList(index) {
      return this.addressList[index];
    },
    // 显示添加地址界面
    addaddress() {
      if (this.flag) {
        this.isShow = !this.isShow;
      } else {
        this.isShow = !this.isShow;
      }
      this.flag = !this.flag;
    },
    // // 取消添加
    cancelAdd() {
      this.isShow = !this.isShow;
    },
    // 保存地址信息，跳转到订单信息页面
    linkOrderInfo() {
      console.log(url.updateDefaultAddress)
      this.$confirm("是否保存", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          console.log(url.updateDefaultAddress)
          this.$http({
            url: `${url.updateDefaultAddress}`,
            method: "put",
            data: this.addressList
          }).then(res => {
            if (res.data.code == 20000) {
              this.$message.success("保存成功");
              this.getAddress();
            }
          });
          if (this.deleteAddressListSave.length > 0) {
            this.$http({
              url: `${url.deleteMoreAddress}`,
              method: "put",
              data: this.deleteAddressListSave
            }).then(res => {
              if (res.data.code == 20000) {
              }
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },

    getAddress() {
      this.$http({
        url: `${url.address}/${this.username}`,
        method: "get"
      }).then(res => {
        if (res.data.code == 20000) {
          this.addressList = res.data.data;
          this.deleteAddressList = [];
        }
      });
    },

    updateAddress(id) {
      this.$http({
        url: `${url.updateAddress}/${this.gid}/${id}`,
        method: "get"
      }).then(res => {
        if (res.data.code == 20000) {
          this.$router.push(`/orderInfo?id=${this.gid}`);
        }
      });
    },

    setDefault(item) {
      this.addressList.map(item1 => {
        if (item1.id == item.id) {
          item1.is_default = "1";
        } else {
          item1.is_default = "0";
        }
      });
    },

    addAddress() {
      this.addressSave.is_default = "0";
      this.addressList.push(JSON.parse(JSON.stringify(this.addressSave)));
      this.addressSave = {};
      this.isShow = false;
    },
    selectAddress(event, item) {
      if (event.target.checked) {
        this.deleteAddressList.push(item);
      } else {
        this.deleteAddressList.splice(this.deleteAddressList.indexOf(item), 1);
      }
    },
    deleteAddress() {
      var isdefault=false;
      this.deleteAddressList.map(item => {
        if(item.is_default == '1'){
          isdefault=true;
        }
        this.deleteAddressListSave.push(item);
        this.addressList.splice(this.addressList.indexOf(item), 1);
      });
      this.deleteAddressList=[];
      if(isdefault){
        this.addressList[0].is_default='1';
      }
      var selerctC =document.getElementsByClassName("chooseBtn");
      for(var i=0;i<selerctC.length;i++){
        selerctC[i].checked=false;
      }
    }
  },
  components:{
      Headers
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss"  scoped>
.w {
  width: 1200px;
  margin: auto;
}

.orderInfo {
  text-align: center;
  background-color: rgb(255, 255, 255);
}
.order_titleBox {
  padding: 11px 0 0 11px;
  text-align: left;
}

.address {
  ul {
      li:hover{
          cursor: pointer;
      }
    li {
      display: flex;
      width: 1200px;
      height: 162px;
      margin: auto;
      // padding-left: 36px;
      // padding-right: 80px;
      // justify-content: space-around;
      align-items: center;
      margin-top: 20px;
      border-bottom: 1px solid #f2f2f2;
      .chooseBox {
        width: 78px;
      }
      .logoIcon {
        padding-right: 30px;
      }
      .company {
        width: 180px;
        text-align: left;
      }
      .addressName {
        margin-left: 110px;
        margin-right: 130px;
        width: 235px;
        text-align: left;
      }
      .phone {
        width: 120px;
        margin-right: 194px;
      }
    }
    .chooseType {
      width: 80px;
      height: 32px;
      line-height: 32px;
      background: rgba(204, 204, 204, 1);
      border: 1px solid rgba(102, 102, 102, 1);
      font-size: 16px;
      font-family: MicrosoftYaHei,微软雅黑;
      font-weight: 400;
      color: #ffff;
      cursor: pointer;
      margin-right: 122px;
    }
    .chooseType1 {
      width: 96px;
      height: 32px;
      line-height: 32px;
      border: 1px solid rgb(61, 145, 231);
      border-radius: 8px;
      font-size: 16px;
      font-family: MicrosoftYaHei,微软雅黑;
      font-weight: 400;
      cursor: pointer;
      color: rgb(61, 145, 231);
      margin-right: 122px;
    }
  }
}

// 添加地址
.addaddress {
  padding-top: 16px;
  padding-right: 87px;

  .addBtn {
    float: right;
    font-size: 16px;
    font-family: MicrosoftYaHei,微软雅黑;
    font-weight: 400;
    color: rgb(61, 145, 231);
    width: 100px;
    height: 36px;
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgb(61, 145, 231);
    border-radius: 10px;
    cursor: pointer;
    margin-right: 15px;
  }
}

// 提交状态
.commit_state {
  padding-top: 44px;
  padding-bottom: 130px;
  .saveBtn {
    margin-right: 48px;
    width: 120px;
    height: 48px;
    background: rgb(61, 145, 231);
    // border: 1px solid rgba(153, 153, 153, 1);
    border-radius: 10px;
    font-size: 18px;
    font-family: MicrosoftYaHei-Bold,微软雅黑;
    font-weight: bold;
    color: #fff;
    cursor: pointer;
  }
  .cancelBtn {
    width: 100px;
    height: 44px;
    background: rgb(153, 153, 153);
    border: 1px solid rgba(153, 153, 153, 1);
    border-radius: 10px;
    font-size: 18px;
    font-family: MicrosoftYaHei-Bold,微软雅黑;
    font-weight: bold;
    color: #fff;
    cursor: pointer;
  }
}

// 添加地址盒子
.addressBox {
  border-top: 2px solid #f2f2f2;
  border-bottom: 2px solid #f2f2f2;
  padding-bottom: 70px;
  ul {
    // background: rgb(242, 242, 242);
    padding-top: 40px;
    padding-left: 50px;
    > li {
      display: flex;
      text-align: left;
      height: 60px;
      line-height: 60px;
      border: none;
      i {
        display: block;
        width: 100px;
        text-align: right;
      }
      input {
        width: 400px;
        height: 40px;
        font-size: 16px;
        border: 1px solid rgba(61, 145, 231, 1);
        text-indent: 20px;
        font-family: MicrosoftYaHei,微软雅黑;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
      }
    }
    li:nth-child(4) {
      padding-left: 100px;
      .adBtn {
        width: 70px;
        height: 36px;
        margin-right: 40px;
        text-indent: 0;
        color: #3d91e7;
        border-radius: 10px;
        background-color: #fff;
        cursor: pointer;
        border: 1px dashed #3d91e7;
      }
      .cdBtn {
        width: 70px;
        height: 36px;
        margin-right: 40px;
        text-indent: 0;
        cursor: pointer;
        color: #999999;
        border-radius: 10px;
        background-color: #fff;
        border: 1px #999 dashed;
      }
    }
  }
}
</style>
