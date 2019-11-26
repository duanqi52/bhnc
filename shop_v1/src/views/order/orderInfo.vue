<template>
  <div class="orderInfo">
    <Headers></Headers>
    <div class="gbcBox w">
      <div class="order_titleBox">
        <!-- <h3>订单信息</h3> -->
      </div>
      <!-- 订单信息 -->
      <div class="table-box" style="padding: 60px 0;">
        <table id="dataList" class="table table-bordered table-striped table-hover dataTable">
          <thead>
            <tr>
              <th class="sorting">商品</th>
              <th class="sorting">款号</th>
              <th class="sorting">颜色</th>
              <th class="sorting">单价</th>
              <th class="sorting">数量</th>
              <th class="sorting">价格</th>
            </tr>
          </thead>
          <tbody class="info_table">
            <tr v-for="(product,index) in dealerOrderDetails.product" :key="index">
              <td style="width: 20%;">
                <div
                  class="commodity"
                  v-for="(goods,index1) in product.goods"
                  :key="index1"
                  style="display:flex; align-items:center;height:48px"
                >
                  <img :src="goods.img" alt class="commodityLogo" />
                  <p class="commodityTitle">{{goods.name}}</p>
                </div>
              </td>
              <td>
                <div class="commodity" v-for="(goods,index1) in product.goods" :key="index1">
                  <span class="commodityName">{{goods.style_number}}</span>
                </div>
              </td>
              <td>
                <div class="commodity" v-for="(goods,index1) in product.goods" :key="index1">
                  <span class="commodityName">{{goods.color}}</span>
                </div>
              </td>
              <td>
                <div class="commodity" v-for="(goods,index1) in product.goods" :key="index1">
                  <span class="commodityName">{{formatNumber(goods.prices)}}</span>
                </div>
              </td>
              <td>
                <div class="commodity" v-for="(goods,index1) in product.goods" :key="index1">
                  <span class="commodityName">{{goods.count}}</span>
                </div>
              </td>
              <td>
                <div class="commodity" v-for="(goods,index1) in product.goods" :key="index1">
                  <span class="commodityName priceAll">￥{{formatNumber(goods.count*goods.prices)}}</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- 发货信息标题 -->
      <!-- 分批发货 -->
      <div class="sendOrderBox w" v-if="!isNotDealer">
        <div class="sendOrderLogo w">
          <!-- <h3 style="width: 20%;">发货信息</h3> -->
        </div>
        <div
          style="padding: 10px 0;"
          v-for="(batches,index) in dealerOrderDetails.batchesList"
          :key="index"
        >
          <!-- 展示 -->
          <div class="dispatchBill w" v-if="!batchesShow[index]">
            <p style="width: 20%;" class="fahuo">
              发货
              <i>{{index+1}}</i>
            </p>
            <div class="dispatchBill_a w">
              <div class="dispatchBill_hade">
                <p class="recipients">
                  <span class="shoujianren">收件人:</span>
                  <span class="shouInput" style="color: black;">{{batches.recipients.companyName}}</span>
                  <span class="toPerson" style="color: black;">{{batches.recipients.name}}</span>
                  <span class="toPhone" style="color: black;">{{batches.recipients.phone}}</span>
                  <span class="toAddress" style="color: black;">{{batches.recipients.address}}</span>
                  <button
                    type="button"
                    class="btn btn-default btn_class"
                    @click="batchesShow[index]=true;$forceUpdate()"
                  >编辑</button>
                </p>
                <p class="recipients">
                  <span class="shoujianren">发货人</span>
                  <span class="shouInput" style="color: black;">{{batches.consigner.companyName}}</span>
                  <span class="toPerson" style="color: black;">{{batches.consigner.name}}</span>
                  <span class="toPhone" style="color: black;">{{batches.consigner.phone}}</span>
                  <span class="toAddress" style="color: black;">{{batches.consigner.address}}</span>
                </p>
              </div>
              <table class="table sendTable" style="text-align: center;" id="logistics">
                <thead>
                  <tr style="position:relative;width:1200px; margin:auto">
                    <th class="goodsName">商品</th>
                    <th class="goodsSize">款号</th>
                    <th class="goodsColor">颜色</th>
                    <th class="goodsNum">数量</th>
                    <th class="payType">物流付款方式</th>
                    <th class="wuliuInfo">物流信息</th>
                  </tr>
                </thead>
                <tbody class="fahuoTable">
                  <tr v-for="(order,index3) in batches.order" :key="'order'+index3">
                    <td align="center" style="width:258px;">
                      <div
                        class="commodity"
                        v-for="(product,index) in order.product"
                        :key="'product'+index"
                        v-show="!product.style_number == ''"
                        style="display:flex; align-items:center;height:48px"
                      >
                        <img :src="product.img" alt class="commodityLogo" />
                        <p class="commodityTitle">{{product.name}}</p>
                      </div>
                      <div
                        class="commodity"
                        v-for="(product,index1) in order.product"
                        :key="index1"
                      >
                        <span
                          class="commodityName"
                          v-show="product.style_number == ''"
                        >{{product.name}}</span>
                      </div>
                    </td>
                    <td align="center">
                      <div
                        class="commodity"
                        v-for="(product,index2) in order.product"
                        :key="index2"
                        v-show="!product.style_number == ''"
                      >
                        <span
                          class="commodityName"
                          style="text-align: center"
                        >{{product.style_number}}</span>
                      </div>
                    </td>
                    <td>
                      <div
                        class="commodity"
                        v-for="(product,index3) in order.product"
                        :key="index3"
                        v-show="!product.style_number == ''"
                      >
                        <span class="commodityName" style="text-align: center">{{product.color}}</span>
                      </div>
                    </td>
                    <td style="width:107px;">
                      <div
                        class="commodity"
                        v-for="(product,index4) in order.product"
                        :key="index4"
                        v-show="!product.style_number == ''"
                      >
                        <span class="commodityName" style="text-align: center">{{product.count}}</span>
                      </div>
                    </td>
                    <td>
                      <div class="commodity">
                        <span class="commodityName" style="text-align: center">{{order.type}}</span>
                      </div>
                    </td>
                    <td>{{order.logistics}}</td>

                    <td>
                      <div
                        class="commodity"
                        v-for="(product,index5) in order.product"
                        :key="index5"
                      ></div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <!-- 编辑 -->
          <div class="dispatchBill w" v-else>
            <p style="width: 20%;" class="fahuo">
              发货
              <i>{{index+1}}</i>
            </p>
            <div class="dispatchBill_a w">
              <div class="dispatchBill_hade">
                <p class="recipients">
                  <span class="shoujianren">收件人:</span>
                  <span class="shouInput">
                    <input
                      v-model="batches.recipients.companyName"
                      type="text"
                      placeholder="请输入收件人公司"
                    />
                  </span>
                  <span class="toPerson">
                    <input v-model="batches.recipients.name" type="text" placeholder="请输入收件人" />
                  </span>
                  <span class="toPhone">
                    <input v-model="batches.recipients.phone" type="text" placeholder="请输入收件人联系电话" />
                  </span>
                  <span class="toAddress">
                    <input
                      v-model="batches.recipients.address"
                      type="text"
                      placeholder="请输入收件人联系地址"
                    />
                  </span>
                  <button
                    type="button"
                    class="btn btn-default btn_class"
                    @click="save(index,batches)"
                  >保存</button>
                </p>
                <p class="recipients">
                  <span class="shoujianren">发货人</span>
                  <span class="shouInput">
                    <input
                      v-model="batches.consigner.companyName"
                      type="text"
                      placeholder="请输入收件人公司"
                    />
                  </span>
                  <span class="toPerson">
                    <input v-model="batches.consigner.name" type="text" placeholder="请输入收件人" />
                  </span>
                  <span class="toPhone">
                    <input v-model="batches.consigner.phone" type="text" placeholder="请输入收件人联系电话" />
                  </span>
                  <span class="toAddress">
                    <input v-model="batches.consigner.address" type="text" placeholder="请输入收件人联系地址" />
                  </span>
                  <button
                    type="button"
                    class="btn btn-default btn_class"
                    @click="deleteBatches(batches)"
                  >删除</button>
                </p>
              </div>
              <table class="table sendTable" style="text-align: center;" id="logistics">
                <thead>
                  <tr style="position:relative;width:1200px; margin:auto">
                    <th class="goodsName">商品</th>
                    <th class="goodsSize">款号</th>
                    <th class="goodsColor">颜色</th>
                    <th class="goodsNum">数量</th>
                    <th class="payType">物流付款方式</th>
                    <th class="wuliuInfo">物流信息</th>
                  </tr>
                </thead>
                <tbody class="fahuoTable">
                  <tr v-for="(order,index3) in batches.order" :key="'order'+index3">
                    <td align="center" style="width:258px;">
                      <div
                        class="commodity"
                        v-for="(product,index) in order.product"
                        :key="'product'+index"
                        v-show="!product.style_number == ''"
                      >
                        <img :src="product.img" alt class="commodityLogo" />
                        <p class="commodityTitle">{{product.name}}</p>
                      </div>
                      <div
                        class="commodity"
                        v-for="(product,index1) in order.product"
                        :key="index1"
                      >
                        <span class="commodityName" v-show="product.style_number == ''">
                          <select
                            v-model="product.name"
                            @change="addProduct(batches.order,order)"
                            style="width:124px;"
                          >
                            <option
                              :value="goods"
                              v-for="(goods,index) in goodsList"
                              :key="index"
                            >{{goods.name}}{{goods.style_number}}{{goods.color}}</option>
                          </select>
                        </span>
                      </div>
                    </td>
                    <td align="center">
                      <div
                        class="commodity"
                        v-for="(product,index2) in order.product"
                        :key="index2"
                        v-show="!product.style_number == ''"
                      >
                        <span class="commodityName" style="text-align: center">
                          {{product.style_number}}
                          <input
                            type="hidden"
                            :value="colorSelect(product.style_number)"
                          />
                        </span>
                      </div>
                    </td>
                    <td>
                      <div
                        class="commodity"
                        v-for="(product,index3) in order.product"
                        :key="index3"
                        v-show="!product.style_number == ''"
                      >
                        <span class="commodityName" style="text-align: center">
                          <select v-model="product.color" @change="changeColor(order,product)">
                            <option
                              :value="color"
                              v-for="(color,index) in colors"
                              :key="'color'+index"
                            >{{color}}</option>
                          </select>
                        </span>
                      </div>
                    </td>
                    <td>
                      <div
                        class="commodity"
                        v-for="(product,index4) in order.product"
                        :key="index4"
                        v-show="!product.style_number == ''"
                      >
                        <span class="commodityName" style="text-align: center">
                          <input
                            :id="product.color+product.style_number+index"
                            type="number"
                            v-model="product.count"
                            placeholder="数量"
                            @keyup="changeCount($event,index,product)"
                            style="width:50px;"
                          />
                        </span>
                      </div>
                    </td>
                    <td>
                      <div class="commodity">
                        <span class="commodityName" style="text-align: center">
                          <select v-model="order.type">
                            <option value="0">寄付</option>
                            <option value="1">到付</option>
                          </select>
                        </span>
                      </div>
                    </td>
                    <td>
                      <input
                        type="text"
                        class="btn btn-default"
                        v-model="order.logistics"
                        placeholder="填写物流信息"
                        style="text-align: left; padding:0"
                      />
                    </td>

                    <td>
                      <div
                        class="commodity"
                        v-for="(product,index5) in order.product"
                        :key="index5"
                      >
                        <span class="commodityName" style="text-align: center">
                          <button
                            type="button"
                            class="btn btn-default"
                            @click="deleteGoods(batches,order,product)"
                          >删除</button>
                        </span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <button
                type="button"
                class="btn btn-primary addBtn"
                style="margin: 0 30px 30px;"
                @click="addGoods(batches)"
              >添加新的商品</button>
            </div>
          </div>
        </div>
      </div>

      <div class="sendBtn w" v-if="!isNotDealer">
        <input type="button" @click="addBatches()" value="添加新的发货" />
      </div>
      <div class="tips w">（默认发货人为用户注册填写的用户资料）</div>
      <!-- 非经销商用户发货表单开始 -->
      <div class="sendFormBox w" v-if="isNotDealer">
        <div class="sendForm w">
          <div class="formTitle">非经销商用户发货表单：</div>
          <div class="sendContent" v-if="dealerOrderDetails.address">
            <ul>
              <li class="sendPer">收件人</li>
              <li class="sendCompany">{{dealerOrderDetails.address.recipients}}</li>
              <li class="sendAdd">{{dealerOrderDetails.address.address}}</li>
              <li class="sendNum">{{dealerOrderDetails.address.phone}}</li>
              <li class="sendState" @click="changeAddress">更换</li>
            </ul>
          </div>
          <div class="sendContent" v-else>
            <ul>
              <li class="sendState" @click="changeAddress">去添加</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- 非经销商用户发货表单结束 -->

      <!-- 备注信息开始 -->
      <div class="remarkBox">
        <div class="remark_title">
        </div>
        <div class="remark_content w">
          <h4 class="beizhu">备注：</h4>
          <div class="remarkText">
            <textarea
              name="remarkText"
              id="remarkText"
              placeholder="请输入备注信息"
              v-model="dealerOrderDetails.remarks"
            ></textarea>
            <div class="upload">
              <i>定制素材：</i>
              <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                multiple
                :limit="3"
                :on-exceed="handleExceed"
                :file-list="fileList"
              >
                <el-button size="small" type="primary" class="uploadBtn">上传</el-button>
              </el-upload>
            </div>
          </div>
        </div>
      </div>

      <!-- 备注信息结束 -->

      <!-- 提交订单开始 -->
      <div class="commit w">
        <div class="commitPrice">
          <i>应付总额:</i>
          <strong class="priceNum">{{dealerOrderDetails.total_money}}</strong>
          <i>元</i>
        </div>
        <div class="commitBtn">
          <input type="button" value="提交订单" @click="placeAnOrder()" />
        </div>
      </div>

      <!-- 提交订单结束 -->
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Headers from "../../components/headers.vue";
import Footer from "../../components/footer.vue";
import url from "@/serverAPI.config.js";

export default {
  data() {
    return {
      batchesShow: [],
      isNotDealer: false,
      dealerOrderDetails: [],
      purchaseList: [], //全部列表
      checkList: [],
      checked: false,
      multipleSelection: [],
      //   文件上传数据
      fileList: [
        //   {name: '', url: ''},
      ],
      goodsList: [],
      colors: [],
      id: "",
      checkCountList: []
    };
  },
  components: {
    Headers,
    Footer
  },
  created() {
    this.id = this.$route.query.id;
    this.getDetails();
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 文件上传相关方法开始
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    // 文件上传相关方法结束

    // 更换按钮方法，跳转更换地址页面
    changeAddress() {
      this.$router.push({
        path: "/orderAddress",
        // 路由参数
        query: { gid: this.id }
      });
    },
    //获取详情
    getDetails() {
      this.$http({
        url: `${url.getPlaceAnOrderInfo}/${this.id}`,
        method: "get"
      }).then(res => {
        if (res.data.code == 20000) {
          var dataList = res.data.data;
          dataList.product = JSON.parse(dataList.product);
          dataList.address = JSON.parse(dataList.address);
          if (localStorage.roles.indexOf("dealer") == -1) {
            this.isNotDealer = true;
          }
          var data = [];
          dataList.product.map(item => {
            item.goods.map(item1 => {
              data.push(item1);
            });
          });
          dataList.batchesList = [
            {
              recipients: { companyName: "", name: "", phone: "", address: "" },
              consigner: { companyName: "", name: "", phone: "", address: "" },
              d_id: this.id,
              order: [
                {
                  product: [
                    {
                      name: "",
                      img: "",
                      style_number: "",
                      color: "",
                      prices: 0.0,
                      count: 0
                    }
                  ],
                  type: "0",
                  logistics: ""
                }
              ]
            }
          ];
          this.batchesShow.push(true);
          this.goodsList = data;
          this.dealerOrderDetails = JSON.parse(JSON.stringify(dataList));
        } else {
          alert(res.data.message);
        }
      });
    },

    //根据款号获取对应的颜色列表
    colorSelect(style_number) {
      this.colors = [];
      var data = [];
      this.dealerOrderDetails.product.map(item => {
        item.goods.map(item1 => {
          if (item1.style_number == style_number) {
            data.push(item1.color);
          }
        });
      });
      this.colors = data;
    },

    //获取
    isExist(array, item) {
      var pojo = null;
      var isColor = null;
      array.map(item1 => {
        item1.product.map(item2 => {
          if (item2.style_number == item.style_number) {
            if (item2.color == item.color) {
              return (isColor = "0");
            } else {
              pojo = item1;
            }
          }
        });
      });
      if (isColor) {
        return isColor;
      }
      return pojo;
    },

    //添加商品选择
    addGoods(batches) {
      batches.order.push({
        product: [
          {
            name: "",
            img: "",
            style_number: "",
            color: "",
            prices: 0.0,
            count: 0
          }
        ],
        type: "0",
        logistics: ""
      });
      this.batchesShow.push(true);
    },

    //添加商品
    addProduct(batches, order) {
      var productPojo = JSON.parse(JSON.stringify(order.product[0].name));
      productPojo.count = 0;
      productPojo.type = "0";
      productPojo.logistics = "";
      var exist = this.isExist(batches, productPojo);
      if (exist) {
        if (exist == "0") {
          alert("不能重复添加相同的商品");
        } else {
          exist.product.push(JSON.parse(JSON.stringify(productPojo)));
          batches.splice(batches.indexOf(order), 1);
        }
      } else {
        order.product[0] = JSON.parse(JSON.stringify(productPojo));
      }
    },

    //选择颜色
    changeColor(order, product) {
      var isE = true;
      order.product.map(item => {
        if (
          item.color == product.color &&
          item.style_number == product.style_number
        ) {
          isE = !isE;
        }
      });
      if (isE) {
        alert("商品已存在");
        var pc = {};
        this.goodsList.map(item => {
          if (
            item.img == product.img &&
            item.style_number == product.style_number
          ) {
            pc = JSON.parse(JSON.stringify(item));
          }
        });
        product.color = pc.color;
        this.$forceUpdate();
      } else {
        var pi = {};
        this.goodsList.map(item => {
          if (
            item.color == product.color &&
            item.style_number == product.style_number
          ) {
            pi = JSON.parse(JSON.stringify(item));
          }
        });
        product.img = pi.img;
        this.$forceUpdate();
      }
    },

    //新增分批发货
    addBatches() {
      this.dealerOrderDetails.batchesList.push({
        recipients: { companyName: "", name: "", phone: "", address: "" },
        consigner: { companyName: "", name: "", phone: "", address: "" },
        d_id: this.id,
        order: [
          {
            product: [
              {
                name: "",
                img: "",
                style_number: "",
                color: "",
                prices: 0.0,
                count: 0
              }
            ],
            type: "0",
            logistics: ""
          }
        ]
      });
    },

    //删除分批发货
    deleteBatches(batches) {
      this.$confirm("是否要删除此发货信息?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          if (!batches.id) {
            this.dealerOrderDetails.batchesList.splice(
              this.dealerOrderDetails.batchesList.indexOf(batches),
              1
            );
            return;
          }
          this.$http({
            url: `${url.deleteBatches}/${batches.id}`,
            method: "delete"
          }).then(
            response => {
              if (response.data.code == 20000) {
                this.dealerOrderDetails.batchesList.splice(
                  this.dealerOrderDetails.batchesList.indexOf(batches),
                  1
                );
              } else {
                alert(response.data.message);
              }
            },
            response => {
              alert("失败");
            }
          );
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    //删除商品
    deleteGoods(batches, order, product) {
      order.product.splice(order.product.indexOf(product), 1);
      if (order.product.length == 0) {
        batches.order.splice(batches.order.indexOf(order), 1);
      }
    },

    //检查总数
    changeCount(event, index, product) {
      var dindex = null;
      this.checkCountList.map(item => {
        if (
          item.color == product.color &&
          item.style_number == product.style_number &&
          item.index == index
        ) {
          dindex = this.checkCountList.indexOf(item);
        }
      });
      if (dindex != null) {
        this.checkCountList.splice(dindex, 1);
      }
      this.checkCountList.push({
        count: parseInt(product.count),
        color: product.color,
        style_number: product.style_number,
        index: index
      });

      var goodsList = JSON.parse(JSON.stringify(this.goodsList));
      var count = 100;
      goodsList.map(item => {
        if (
          item.color == product.color &&
          item.style_number == product.style_number
        ) {
          count = parseInt(item.count);
          this.checkCountList.map(item1 => {
            if (
              item1.color == product.color &&
              item1.style_number == product.style_number
            ) {
              count -= parseInt(item1.count);
            }
          });
        }
      });
      if (count < 0) {
        $("#" + product.color + product.style_number + index).attr(
          "style",
          "color:red"
        );
        var message = document.getElementsByClassName("el-message el-message--error");
        if(message.length == 0){
          this.$message.error("总数不能大于已有商品数量");
        }
      } else {
        $("#" + product.color + product.style_number + index).attr("style", "");
      }
    },

    //保存
    save(index, batches) {
      if ($("input[style='color:red']").length > 0) {
        this.$message.error("选中数量不能大于商品数量");
        return;
      }
      var batchesSave = JSON.parse(JSON.stringify(batches));
      batchesSave.recipients = JSON.stringify(batches.recipients);
      batchesSave.consigner = JSON.stringify(batches.consigner);
      batchesSave.order = JSON.stringify(batches.order);
      if (batches.id) {
        this.$http({
          url: `${url.updateBatches}`,
          method: "put",
          data: batchesSave
        }).then(
          response => {
            if (response.data.code == 20000) {
              this.batchesShow[index] = false;
              this.$forceUpdate();
            } else {
              alert(response.data.message);
            }
          },
          response => {
            alert("失败");
          }
        );
      } else {
        this.$http({
          url: `${url.addBatches}`,
          method: "post",
          data: batchesSave
        }).then(
          response => {
            if (response.data.code == 20000) {
              this.batchesShow[index] = false;
              batches.id = response.data.data;
              this.$forceUpdate();
            } else {
              alert(response.data.message);
            }
          },
          response => {
            alert("失败");
          }
        );
      }
    },
    //下单
    placeAnOrder() {
      if ($("input[style='color:red']").length > 0) {
        this.$message.error("选中数量不能大于商品数量");
        return;
      }
      var data = JSON.parse(JSON.stringify(this.dealerOrderDetails));
      data.address = JSON.stringify(data.address);
      data.product = JSON.stringify(data.product);
      data.batchesList.map(item => {
        item.recipients = JSON.stringify(item.recipients);
        item.consigner = JSON.stringify(item.consigner);
        item.order = JSON.stringify(item.order);
      });
      this.$http({
        url: `${url.placeAnOrder}/${this.id}`,
        method: "post",
        data: data
      }).then(res => {
        if (res.data.code) {
          if (localStorage.roles.indexOf("dealer") != -1) {
            var username = localStorage.getItem("username");
            var roles = localStorage.getItem("roles");
            var Authorization = localStorage.getItem("Authorization");
            var id = localStorage.getItem("ID");
            location.href = `${url.dealerUrl}/jump?Authorization=${Authorization}&a=${username}&roles=${roles}&id=${id}&order=1`;
            return;
          }
           if (localStorage.roles.indexOf("provider") != -1) {
            this.$router.push("/userInfo?provideruserInfo=1");
            return;
            }
          this.$router.push("/userInfo");
        }
      });
    },

    formatNumber(str) {
      return parseFloat(str).toFixed(2);
    }

    //分界
  }
};
</script>

<style lang="scss" scoped>
.commodity {
  clear: both;
}
.gbcBox {
  background-color: rgb(255, 255, 255);
}
.commodityLogo {
  padding-right: 20px;
  width: 40px;
  height: 40px;
}
.table-bordered {
  border: 1px solid #f4f4f4;
}
.table {
  margin: auto;
  width: 1200px;
  max-width: 100%;
  margin-bottom: 20px;
}
table {
  border-spacing: 0;
  border-collapse: collapse;
}
th {
  text-align: left;
}
.table > thead > tr > th,
.table > tbody > tr > th,
.table > tfoot > tr > th,
.table > thead > tr > td,
.table > tbody > tr > td,
.table > tfoot > tr > td {
  border-top: 1px solid #f4f4f4;
  line-height: 2;
}
.table-bordered > thead > tr > th,
.table-bordered > thead > tr > td {
  border-bottom-width: 2px;
}
.table > tbody > tr > td,
.table > tbody > tr > th,
.table > tfoot > tr > td,
.table > tfoot > tr > th,
.table > thead > tr > td,
.table > thead > tr > th {
  padding: 8px;
  vertical-align: top;
  border-top: 1px solid #ddd;
}

.table-hover > tbody > tr:hover {
  background-color: #f5f5f5;
}
.commodityName {
  overflow: hidden;
  display: inline-block;
  //   width: 80%;
  text-align: left;
  font-weight: normal;
}
.table > thead > tr > th,
.table > tbody > tr > th,
.table > tfoot > tr > th,
.table > thead > tr > td,
.table > tbody > tr > td,
.table > tfoot > tr > td {
  border-top: 1px solid #f4f4f4;
  line-height: 3;
}

th {
  display: table-cell;
  vertical-align: inherit;
  font-weight: bold;
  text-align: -internal-center;
}
tr {
  display: table-row;
  vertical-align: inherit;
  border-color: inherit;
}

//分批发货

.w {
  width: 1200px;
  margin: auto;
}
.bg {
  background-color: rgb(255, 255, 255);
}
.orderInfo {
  text-align: center;
  background-color: rgb(242, 242, 242);
}
.hadeer_tou {
  height: 70px;
  line-height: 90px;
  background-color: rgba(248, 248, 248, 1);
  .hadeer_tou_can {
    width: 1200px;
    margin: 0 auto;
  }
}
.trolley_a {
  width: 36px;
  height: 33px;
  display: inline-block;
}
.info_shi {
  width: 1200px;
  margin: 0 auto;
  // margin-top: 70px;
  // margin-bottom: 70px;
}
.img_url {
  width: 88px;
  height: 88px;
  display: inline-block;
  float: left;
}
.commodity {
  overflow: hidden;
  text-align: left;
  display: flex;
  padding-left: 35px;
  //   -webkit-box-orient: vertical;
  //   -webkit-line-clamp: 2;
}
.el-checkbox {
  margin-right: 0;
  display: block;
}
.money {
  font-size: 16px;
  font-family: MicrosoftYaHei-Bold,微软雅黑;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
}
.accounts {
  height: 48px;
  background: rgba(240, 240, 240, 1);
  line-height: 48px;
  .el-checkbox {
    display: inline-block;
    margin-left: 14px;
  }
  input {
    background: top;
    font-size: 13px;
    font-family: MicrosoftYaHei,微软雅黑;
    font-weight: 400;
    color: rgba(243, 74, 67, 1);
    margin-left: 50px;
    cursor: pointer;
  }
  .kind {
    font-size: 13px;
    font-family: MicrosoftYaHei,微软雅黑;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    margin-left: 70px;
  }
  .kind_num {
    font-size: 13px;
    font-family: MicrosoftYaHei,微软雅黑;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    margin-left: 80px;
  }
  .aggregate {
    margin-left: 180px;
    font-size: 13px;
    font-family: MicrosoftYaHei,微软雅黑;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    .aggregate_a {
      font-size: 18px;
      font-family: MicrosoftYaHei,微软雅黑;
      font-weight: 400;
      color: rgba(243, 74, 67, 1);
    }
  }
  .accounts_over {
    width: 111px;
    height: 48px;
    background: rgba(243, 74, 67, 1);
    float: right;
    font-size: 18px;
    font-family: MicrosoftYaHei-Bold,微软雅黑;
    font-weight: bold;
    color: rgba(255, 255, 255, 1);
  }
}
.order_titleBox {
  padding-top: 12px;
  width: 1200px;
  margin: auto;
  text-align: left;
}

// 发货信息内容
.sendInfoBox {
  h4 {
    padding-top: 33px;
    padding-bottom: 10px;
    width: 70px;
    font-size: 22px;
    font-family: MicrosoftYaHei,微软雅黑;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    text-align: left;
  }
  .orderDetail {
    width: 1200px;
    height: 355px;
    background: rgba(255, 255, 255, 1);
    border: 2px solid rgba(244, 244, 244, 1);
  }
  .connect {
    display: flex;
    .connectInfo {
      ul {
        li {
          display: flex;
          align-items: center;
          height: 90px;
          input {
            font-size: 12px;
            font-family: MicrosoftYaHei,微软雅黑;
            font-weight: 400;
            color: rgba(153, 153, 153, 1);
            text-align: center;
          }
          .personal {
            width: 140px;
          }
          .per {
            input {
              width: 166px;
              height: 32px;
              line-height: 32px;
              background: rgba(255, 255, 255, 1);
              border: 1px solid rgba(204, 204, 204, 1);
              text-align: center;
            }
          }
        }
        .pertxt {
          margin: 0 20px;

          input {
            text-align: center;
            width: 142px;
            height: 32px;
            line-height: 32px;
            background: rgba(255, 255, 255, 1);
            border: 1px solid rgba(204, 204, 204, 1);
          }
        }
        .connectPhone {
          margin-right: 20px;
          input {
            width: 160px;
            height: 32px;
            background: rgba(255, 255, 255, 1);
            border: 1px solid rgba(204, 204, 204, 1);
          }
        }
        .connectAdd {
          input {
            width: 190px;
            height: 32px;
            background: rgba(255, 255, 255, 1);
            border: 1px solid rgba(204, 204, 204, 1);
          }
        }
      }
    }
    .connectCheck {
      display: flex;
      flex-direction: column;
      //   overflow: hidden;
      margin-left: 130px;
      justify-content: space-around;
      input {
        width: 70px;
        height: 32px;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(153, 153, 153, 1);
        border-radius: 4px;
        font-size: 14px;
        font-family: MicrosoftYaHei-Bold,微软雅黑;
        font-weight: bold;
        color: rgba(102, 102, 102, 1);
        cursor: pointer;
      }
    }
  }
  .selection {
    width: 1198px;
    border-top: 1px solid rgba(204, 204, 204, 1);
    thead {
      th {
        height: 60px;
        text-indent: 20px;
        font-size: 16px;
        font-family: MicrosoftYaHei-Bold,微软雅黑;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
      }
    }
    tbody {
      text-align: left;

      tr {
        td:nth-child(1) {
          padding-left: 20px;
        }
        .goodsSection {
          width: 166px;
          height: 32px;
          background: rgba(255, 255, 255, 1);
          border: 1px solid rgba(204, 204, 204, 1);
          font-size: 14px;
          font-family: MicrosoftYaHei,微软雅黑;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
        }
        .autoRead {
          font-size: 14px;
          font-family: MicrosoftYaHei,微软雅黑;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
        }
        .ordergoods {
          width: 100px;
          height: 32px;
          background: rgba(255, 255, 255, 1);
          border: 1px solid rgba(204, 204, 204, 1);

          font-size: 14px;
          font-family: MicrosoftYaHei,微软雅黑;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
        }
        .numVal {
          input {
            width: 110px;
            height: 32px;
            background: rgba(255, 255, 255, 1);
            border: 1px solid rgba(204, 204, 204, 1);
            font-size: 14px;
            font-family: MicrosoftYaHei,微软雅黑;
            font-weight: 400;
            color: rgba(153, 153, 153, 1);
            text-align: center;
          }
        }
        .payType {
          width: 129px;
          height: 32px;
          background: rgba(255, 255, 255, 1);
          border: 1px solid rgba(204, 204, 204, 1);
          font-size: 14px;
          font-family: MicrosoftYaHei,微软雅黑;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
        }
        .addGoods {
          input {
            width: 136px;
            height: 44px;
            background: rgba(255, 255, 255, 1);
            border: 1px solid rgba(153, 153, 153, 1);
            border-radius: 4px;
            font-size: 16px;
            font-family: MicrosoftYaHei,微软雅黑;
            font-weight: 400;
            color: rgba(102, 102, 102, 1);
            cursor: pointer;
          }
        }
      }
    }
  }
}
.tips {
  font-size: 12px;
  font-family: MicrosoftYaHei,微软雅黑;
  font-weight: 400;
  color: rgba(192, 192, 192, 1);
  text-align: right;
}
.sendBtn {
  margin: 70px auto;
  input {
    width: 220px;
    height: 44px;
    line-height: 44px;
    background: rgb(61, 145, 231);
    border: 1px solid rgba(153, 153, 153, 1);
    border-radius: 4px;
    font-size: 18px;
    font-family: MicrosoftYaHei,微软雅黑;
    font-weight: 400;
    color: #fff;
    cursor: pointer;
  }
}

//   非经销商用户发货表单开始
// .sendFormBox{
//     border: 1px solid #ccc;
// }
.sendForm {
  padding-bottom: 60px;
  margin-bottom: 70px;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  .formTitle {
    height: 85px;
    line-height: 85px;
    font-size: 16px;
    font-family: MicrosoftYaHei-Bold,微软雅黑;
    font-weight: bold;
    color: rgba(61, 145, 231, 1);
    text-align: left;
    text-indent: 62px;
  }
  .sendContent {
    .sendPer {
      font-size: 16px;
      font-family: MicrosoftYaHei-Bold,微软雅黑;
      font-weight: bold;
      color: rgba(61, 145, 231, 1);
    }
    .sendState {
      width: 67px;
      height: 40px;
      line-height: 40px;
      background-color: rgb(61, 145, 231);
    }
    ul {
      display: flex;
      align-items: center;
      //   height: 76px;
      //   line-height: 76px;

      li:nth-child(1) {
        width: 170px;
      }
      li:nth-child(2) {
        width: 230px;
      }
      li:nth-child(3) {
        width: 235px;
        margin: 0 40px;
      }
      li:nth-child(4) {
        width: 260px;
      }
      li:nth-child(5) {
        width: 67px;
        height: 40px;
        line-height: 40px;
        background: rgb(61, 145, 231);
        // border: 1px solid rgba(153, 153, 153, 1);
        border-radius: 4px;
        font-size: 16px;
        font-family: MicrosoftYaHei-Bold,微软雅黑;
        font-weight: bold;
        color: #fff;
        cursor: pointer;
      }
    }
  }
}
//   非经销商用户发货表单结束

//备注信息开始
.remarkBox {
  border-bottom: 1px solid #ccc;

  .remark_title {
    // width: 1920px;
    height: 70px;
    line-height: 70px;
    text-align: left;
    padding-top: 10px;
    padding-left: 10px;
  }
  .remark_content {
    .beizhu {
      height: 70px;
      line-height: 70px;
      font-size: 16px;
      font-family: MicrosoftYaHei-Bold,微软雅黑;
      font-weight: bold;
      color: rgba(61, 145, 231, 1);
      text-align: left;
      text-indent: 30px;
    }
    .remarkText {
      textarea {
        margin: auto;
        width: 1040px;
        height: 250px;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(61, 145, 231, 1);
        text-indent: 20px;
      }
    }
  }
  .upload {
    display: flex;
    padding-top: 10px;
    padding-bottom: 24px;
    align-items: center;
    i {
      margin-left: 80px;
      font-size: 16px;
      font-family: MicrosoftYaHei-Bold,微软雅黑;
      font-weight: bold;
      color: rgba(61, 145, 231, 1);
    }
    .uploadBtn {
      background: rgba(61, 145, 231, 1);
      box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.22);
      border-radius: 2px;
      font-size: 16px;
      font-family: MicrosoftYaHei,微软雅黑;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
    }
  }
}

// 备注信息结束

// 提交订单开始
.commit {
  display: flex;
  height: 48px;
  line-height: 48px;
  .commitPrice {
    flex: 1;
    text-align: right;
    padding-right: 20px;
    i {
      font-size: 16px;
      font-family: MicrosoftYaHei-Bold,微软雅黑;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
    }
  }
  .commitBtn {
    width: 111px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(234, 179, 31, 1);
    font-size: 20px;
    font-family: MicrosoftYaHei-Bold,微软雅黑;
    font-weight: bold;
    color: rgba(255, 255, 255, 1);
    cursor: pointer;
    input {
      background-color: transparent;
    }
  }
  .priceNum {
    font-size: 26px;
    font-family: MicrosoftYaHei-Bold,微软雅黑;
    font-weight: bold;
    color: rgba(234, 179, 31, 1);
  }
}

// 提交订单结束
button,
input,
select,
textarea {
  font-family: inherit;
  font-size: inherit;
}
input {
  line-height: normal;
}
button,
input,
optgroup,
select,
textarea {
  color: inherit;
}
select {
  -webkit-writing-mode: horizontal-tb !important;
  text-rendering: auto;
  color: black;
  letter-spacing: normal;
  word-spacing: normal;
  text-transform: none;
  text-indent: 0px;
  text-shadow: none;
  display: inline-block;
  text-align: start;
  -webkit-appearance: menulist;
  box-sizing: border-box;
  align-items: center;
  white-space: pre;
  -webkit-rtl-ordering: logical;
  background-color: white;
  cursor: default;
  margin: 0em;
  font: 400 13.3333px Arial;
  border-radius: 0px;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(169, 169, 169);
  border-image: initial;
}
.btn-default {
  color: #333;
  background-color: #fff;
  border-color: #ccc;
}
.btn {
  display: inline-block;
  padding: 6px 12px;
  margin-bottom: 0;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.42857143;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-image: none;
  border: 1px solid transparent;
  border-radius: 4px;
}

//重置样式
.sorting {
  font-size: 16px;
  font-family: MicrosoftYaHei-Bold,微软雅黑;
  font-weight: bold;
  color: rgba(61, 145, 231, 1);
  text-indent: 50px;
}

.info_table {
  > tr {
    font-size: 16px;
    font-family: MicrosoftYaHei-Bold,微软雅黑;
    font-weight: bold;
    color: rgba(102, 102, 102, 1);
  }
}

.priceAll {
  font-size: 18px;
  font-family: MicrosoftYaHei-Bold,微软雅黑;
  font-weight: bold;
  color: rgba(234, 179, 31, 1);
}
.sendOrderBox {
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
}
.sendOrderLogo {
  padding-top: 12px;
  text-align: left;
}
// 重置分类发货
.fahuo {
  height: 40px;
  line-height: 40px;
  padding-left: 20px;
  font-size: 16px;
  font-family: MicrosoftYaHei-Bold,微软雅黑;
  font-weight: bold;
  color: rgba(61, 145, 231, 1);
  text-align: left;
  i {
    display: inline-block;
    width: 24px;
    height: 24px;
    margin-left: 10px;
    border: 1px solid rgba(61, 145, 231, 1);
    border-radius: 50%;
    text-align: center;
    line-height: 24px;
  }
}
.recipients {
  position: relative;
  height: 36px;
  font-size: 16px;
  font-family: MicrosoftYaHei-Bold,微软雅黑;
  font-weight: bold;
  color: rgba(61, 145, 231, 1);

  input {
    font-size: 14px;
    font-family: MicrosoftYaHei,微软雅黑;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    border: 1px solid rgba(61, 145, 231, 1);
  }
  .shoujianren {
    position: absolute;
    left: 82px;
  }
  .shouInput {
    position: absolute;
    left: 176px;
    width: 260px;
    height: 28px;
    line-height: 28px;
    overflow: hidden;
  }
  .toPerson {
    position: absolute;
    left: 484px;
  }
  .toPhone {
    position: absolute;
    left: 652px;
  }
  .toAddress {
    position: absolute;
    left: 880px;
  }
  .btn_class {
    position: absolute;
    left: 1100px;
  }
}
.sendTable {
  thead {
    font-size: 16px;
    font-family: MicrosoftYaHei-Bold,微软雅黑;
    font-weight: bold;
    color: rgba(61, 145, 231, 1);
    th {
      padding-left: 40px !important;
    }
  }
}
.fahuoTable {
  font-size: 16px;
  font-family: MicrosoftYaHei-Bold,微软雅黑;
  font-weight: bold;
  color: rgba(102, 102, 102, 1);
  > tr {
    position: relative;
  }
}
.addBtn {
  background-color: rgb(61, 145, 231);
  color: #fff;
  font-size: 14px;
  font-family: MicrosoftYaHei-Bold,微软雅黑;
}

.commodityTitle {
  display: -webkit-box;

  -webkit-box-orient: vertical;

  -webkit-line-clamp: 2;

  overflow: hidden;
  font-size: 12px;
  line-height: 1.5;
  padding: 3px 0;
  font-weight: normal;
}
option {
  display: -webkit-box;
  width: 124px;
  -webkit-box-orient: vertical;

  -webkit-line-clamp: 1;

  overflow: hidden;
}

input[type="number"] {
  -moz-appearance: textfield;
}
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input {
  box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.12);
}
</style>