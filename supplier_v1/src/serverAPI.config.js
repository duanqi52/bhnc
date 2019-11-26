// const BASEURL = "http://172.16.0.147:8080/";
// const BASEURL = "http://test.bhnc114.com:10080/api/shop/v1/";
// const BASEURL_WEB = "http://test.bhnc114.com:10080/web/";
const isProd = process.env.NODE_ENV === 'production'
const HOST = isProd ? 'https://www.bhnc114.com' : 'http://test.bhnc114.com:10080'
const BASEURL = `${HOST}/api/shop/v1/`;
const BASEURL_WEB = `${HOST}/web/`;
const SUrl="http://182.61.148.122:50/";
const URL = {
  //toLogin: 'http://172.16.0.149:9007/user/login',
  toLogin: BASEURL + "user/login",
  Login: BASEURL + "user/login",
  getOrder: BASEURL + "providerOrder/providerOrder",
  orderSearch: BASEURL + "providerOrder/providerOrder/search",
  getUserMsg: BASEURL + "user/center",
  amendUser: BASEURL + "user",
  //amendUser:'http://172.16.0.149:9007/user',
  getIntegral: BASEURL + "integralRecord/search",
  Supplier: BASEURL + `user/getProvider`,
  Supplier_a: BASEURL + `user/look/`,
  Supplier_b: BASEURL + `user/getProvider/search/`,
  //   Supplier_b:`http://172.16.0.138:9007/user/getProvider/search/`,

  Supplier_c: BASEURL + `user/collect/`,
  Purchase: BASEURL + `purchase/search`,
  Purchase_details: BASEURL + `purchase`,
  //Purchase_details:'http://172.16.0.149:9006/purchase',
 News: BASEURL + `advices/search`,
  //News: 'http://172.16.0.138:9001/advices/search',
  NewsShow: BASEURL + `advices/findShow`,
  //NewsShow:`http://172.16.0.149:9001/advices/findShow`,
  DeleteNews: BASEURL + `advices`,
// DeleteNews:`http://172.16.0.138:9001/advices`,
  //findNamesById:`http://172.16.0.149:9001/advices/findNamesById`,
  findNamesById: BASEURL + `advices/findNamesById`,
  //DeleteNews:`http://172.16.0.149:9001/advices`,
  Goods: BASEURL + `goods`,
  updateInventory: BASEURL + `goods/updateInventory`,
  soldOutGoods: BASEURL + `goods/soldOutGoods`,
  //updateInventory: `http://172.16.0.149:9009/goods/updateInventory`,
  //soldOutGoods: `http://172.16.0.149:9009/goods/soldOutGoods`,
  //Goods: `http://172.16.0.149:9009/goods`,
  Upload: BASEURL +`upload`,
  uploadFWB: BASEURL +`uploadFWB`,
  sendCode: BASEURL + "user/sendCode",
  updatePassword: BASEURL + "user/updatePassword",
  saveMarketingTool: BASEURL + "user/saveMarketingTool",
  getMarketingTool: BASEURL + "user/findMarketingTool",
  getMarketingToolGoods: BASEURL + "user/getMarketingToolGoods",
  saveMarketingToolGoods: BASEURL + "user/saveMarketingToolGoods",
  deleteMarketingToolGoods: BASEURL + "user/deleteMarketingToolGoods",
  getIntegralInfo: BASEURL + "user/getIntegralInfo",
  updateIntegralInfo: BASEURL + "user/updateIntegral",
  againCheck: BASEURL + "user/againCheck",
  toYearMember: BASEURL + "user/toYearMember",
  getCollectionList: BASEURL + "user/findCollectionList",
  deleteMoreCollection: BASEURL + "user/deleteMoreCollection",
  createShare: BASEURL + "user/createShare",
  getShare: BASEURL +"share",
  QRCode: BASEURL + "barcode",
  shareLink: SUrl+"createMarke?id=",
  createQRCode: BASEURL + "user/createQRCode",
  getPurchaseGoodsDetails:
  BASEURL + "purchase/getPurchaseGoodsDetails",
  getPurchaseAllGoods: BASEURL + "user/getPurchaseAllGoods",
  findIndexNews: BASEURL + `user/findIndexNews`,
  findProviderIndexOrders: BASEURL + `user/findProviderIndexOrders`,
  findProviderIndexPurchase: BASEURL + `user/findProviderIndexPurchase`,
  findProviderIndexGoods: BASEURL + `user/findProviderIndexGoods`,
  getUserNames: BASEURL + "user/getUserNames",
  findMarketingToolEditDate: BASEURL + "user/findMarketingToolEditDate",


  findMyFootprint: BASEURL + "goods/findMyFootprint",
  findUserJobs: BASEURL + "user/findUserJobs",
  //findUserJobs: 'http://172.16.0.149:9007/user/findUserJobs',
  findUserSons: BASEURL + "user/findUserSons",
  //findUserSons: 'http://172.16.0.149:9007/user/findUserSons',
  addUserSon: BASEURL + "user/addUserSon",
  //addUserSon: 'http://172.16.0.149:9007/user/addUserSon',
  updateUserSon: BASEURL + "user/updateUserSon",
  //updateUserSon: 'http://172.16.0.149:9007/user/updateUserSon',

  //addUserJob: 'http://172.16.0.149:9007/user/addUserJob',
  addUserJob: BASEURL + "user/addUserJob",
  //updateUserJob: 'http://172.16.0.149:9007/user/updateUserJob',
  updateUserJob: BASEURL + "user/updateUserJob",

  addCollect: BASEURL + "user/addCollect",
  //addCollect: 'http://172.16.0.149:9007/user/addCollect',
  deleteCollect: BASEURL + "user/deleteCollect",
  //deleteCollect: 'http://172.16.0.149:9007/user/deleteCollect',

  addLook: BASEURL + "user/addLook",
  //addLook: 'http://172.16.0.149:9007/user/addLook',
  deleteLook: BASEURL + "user/deleteLook",
  //deleteLook: 'http://172.16.0.149:9007/user/deleteLook',

  addPartner: BASEURL + "user/addPartner",
  //addPartner: 'http://172.16.0.149:9007/user/addPartner',
  deletePartner: BASEURL + "user/deletePartner",
  //deletePartner: 'http://172.16.0.149:9007/user/deletePartner',

  findUserDetails: BASEURL + "user/findDealerDetails",
  //findUserDetails: 'http://172.16.0.149:9007/user/findDealerDetails',

  findProviderGoods: BASEURL + "goods/findProviderGoods",
  //findProviderGoods: 'http://172.16.0.149:9009/goods/findProviderGoods',

  getUserLoginInfo: BASEURL + "user/getUserLoginInfo",
  //getUserLoginInfo: 'http://172.16.0.149:9007/user/getUserLoginInfo'

  purchaseSearchShow: BASEURL + "purchase/searchShow",
  //purchaseSearchShow: 'http://172.16.0.149:9006/purchase/searchShow',

  getQuotation: BASEURL + "purchase/getQuotation",
  addQuotation: BASEURL + "purchase/addQuotations",
  updateQuotation: BASEURL + "purchase/updateQuotation",
  searchSupplyInfo: BASEURL + "purchase/searchSupplyInfo",
  addSupplyInfo: BASEURL + "purchase/addSupplyInfo",
  supplyInfoDetails: BASEURL + "purchase/supplyInfoDetails",
  findBrandAuditDetails: BASEURL + "user/findBrandAuditDetails",
  addBrandAudit: BASEURL + "user/addBrandAudit",
  updateBrandAudit: BASEURL + "user/updateBrandAudit",
  findBrandAudits: BASEURL + "user/findBrandAudits",
  deleteBrandAudit: BASEURL + "user/deleteBrandAudit",


  //getQuotation: 'http://172.16.0.149:9006/purchase/getQuotation',
  //addQuotation: 'http://172.16.0.149:9006/purchase/addQuotation',
  //updateQuotation: 'http://172.16.0.149:9006/purchase/updateQuotation',
  //searchSupplyInfo: 'http://172.16.0.149:9006/purchase/searchSupplyInfo',
  //addSupplyInfo: 'http://172.16.0.149:9006/purchase/addSupplyInfo',
  //supplyInfoDetails: 'http://172.16.0.149:9006/purchase/supplyInfoDetails',
  //findBrandAuditDetails : 'http://172.16.0.149:9007/user/findBrandAuditDetails',
  //addBrandAudit: 'http://172.16.0.149:9007/user/addBrandAudit',
  //updateBrandAudit: 'http://172.16.0.149:9007/user/updateBrandAudit',
  //findBrandAudits: 'http://172.16.0.149:9007/user/findBrandAudits',
  //deleteBrandAudit: 'http://172.16.0.149:9007/user/deleteBrandAudit',
  getExpireTime: BASEURL + "user/findTime",
  updateByUserSon: BASEURL + "user/updateByUserSon",
  searchSupplylikeTitle: BASEURL+"purchase/searchSupplylikeTitle",
  findSupplierSendMessage : BASEURL+"advices/findSupplierSendMessage",//供应商消息中心 供应商自己发送的消息接口
  findSupplierByIdDetails : BASEURL+"advices/findSupplierByIdDetails",//供应商消息中心 供应商自己发送的消息详情接口
  findSupplierSysMessage : BASEURL+"advices/findSupplierSysMessage",//供应商消息中心,系统消息接口
  deleteByIdSupplierHomeSysMessage: BASEURL +"advices/deleteByIdSupplierHomeSysMessage",//供应商主页 系统消息删除
  addUserLookMessageRecord: BASEURL +"advices/addUserLookMessageRecord",//供应商主页 增加查看采购信息记录
  addSupplierLookGoodsAdvices: BASEURL +"advices/addSupplierLookGoodsAdvices",//供应商主页 增加查看商品审核记录
  findSupplierHomeSysMessage:BASEURL+"advices/findSupplierHomeSysMessage",//供应商主页 查找系统消息
  findSupplierHomePurchaseMessage:BASEURL +"advices/findSupplierHomePurchaseMessage",//供应商主页,查看采购信息
  findSupplierHomeGoodsMessage:BASEURL +"advices/findSupplierHomeGoodsMessage",//供应商主页,查找当前供应商的商品审核信息
  findSupplierHomeByIdSupplyInfoMessage: BASEURL +"advices/findSupplierHomeByIdSupplyInfoMessage",//供应商主页 ,查找供应商自己发布的供应信息
  findByIdAllSupplyInfo: BASEURL +"purchase/findByIdAllSupplyInfo",// 查找供应商所有消息
  sendBroadcast: BASEURL +"advices/sendBroadcast",// 供应商端发布广播消息扣除积分
  getSetIntegral: BASEURL +"integralRecord/getSetIntegral",// 获取积分设置数据
  getSetLevel: BASEURL +"integralRecord/getSetLevel",// 获取等级设置数据

  getSupplierSetLevel: BASEURL +"integralRecord/getSupplierSetLevel",// 获取供应商年卡会员数据

  paySupplierAnnual: BASEURL + "alipay/recharge/supplier/vip",// 供应商年卡会员充值接口
  pay: BASEURL + "alipay/recharge/supplier/score",//供应商

  addSupplierLookDealer:BASEURL+"user/addSupplierLookDealer",//供应商查看求购商信息的接口
  supplierIntegralWxPay: BASEURL +"wxpay/supplierIntegralWxPay",//供应商微信充值积分接口
  supplierIntegralWxPayQrcode: BASEURL +"wxpay/supplierIntegralWxPayQrcode",//供应商微信充值积分生成二维码接口
  supplierAnnualWxPay: BASEURL +"wxpay/supplierAnnualWxPay",//供应商微信充值年卡会员接口
  supplierAnnualWxPayQrcode: BASEURL +"wxpay/supplierAnnualWxPayQrcode",//供应商微信充值年卡生成二维码接口
  supplierWxPayQueryorder: BASEURL +"wxpay/queryorder",//供应商微信监听微信支付是否成功接口
  dealerScope: BASEURL +'scope/dealerScope',
  scope: BASEURL +'scope',
  cartridgeScope: BASEURL +'scope/cartridgeScope',
  mountingsScope: BASEURL +'scope/mountingsScope',
  GoodsSpecification: BASEURL +'GoodsSpecification',
  findGoodsCartridgeSpecification: BASEURL +'GoodsSpecification/findGoodsCartridgeSpecification',
  findAllMountings: BASEURL +'GoodsSpecification/findAllMountings',
  findAllMechanical: BASEURL +'GoodsSpecification/findAllMechanical',
  findAllProcessing: BASEURL +'GoodsSpecification/findAllProcessing',

  supplierUrl: BASEURL_WEB + "supplier",
  dealerUrl: BASEURL_WEB + "buyer",
  shopUrl: BASEURL_WEB + "shop",
  detailUrl: BASEURL_WEB + "shop",

  // supplierUrl: "http://172.16.6.75:8886/web/supplier",
  // dealerUrl: "http://172.16.6.75:8887/web/buyer",
  // shopUrl: " http://172.16.6.75:8889/web/shop",
  // detailUrl: "http://172.16.6.75:8889/web/shop",
};

module.exports = URL;
