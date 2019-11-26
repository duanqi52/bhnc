//const BASEURL = "http://172.16.6.49:8080/";
// const BASEURL = "http://test.bhnc114.com:10080/api/shop/v1/";
// const BASEURL_WEB = "http://test.bhnc114.com:10080/web/";
const isProd = process.env.NODE_ENV === 'production'
const HOST = isProd ? 'https://www.bhnc114.com' : 'http://test.bhnc114.com:10080'
const BASEURL = `${HOST}/api/shop/v1/`;
//const BASEURL = `http://172.16.6.49:8080/`;
const BASEURL_WEB = `${HOST}/web/`;
const URL = {
    Login: BASEURL + 'user/login',
    toLogin: BASEURL + 'user/login',
    getOrder: BASEURL + 'dealerOrder',
    orderSearch: BASEURL + 'dealerOrder/search',
    getUserMsg: BASEURL + 'user/center',
    getUserNames: BASEURL + 'user/getUserNames',
    amendUser: BASEURL + 'user',
    getIntegral: BASEURL + 'integralRecord/search',
    Supplier: BASEURL + `user/getProvider`,
    Supplier_a: BASEURL + `user/look/`,
    Supplier_b:BASEURL + `user/getProvider/search/`,
    purchaseSearchShow: BASEURL + 'purchase/searchShow',
    getQuotations: BASEURL + 'purchase/getQuotations',
    Supplier_c: BASEURL + `user/collect/`,
    Purchase: BASEURL + `purchase/search`,
    findShow: BASEURL + `purchase/findShow`,
    Purchase_details: BASEURL + `purchase`,
    News: BASEURL + `advices/search`,
    NewsShow: BASEURL + `advices/findShow`,
    DeleteNews: BASEURL + `advices`,
    // Upload: `http://182.61.148.51:9010/upload`,
    // upload: `http://182.61.148.51:9010/upload`,
    // uploadFWB: `http://182.61.148.51:9010/uploadFWB`,
    Upload: BASEURL +`upload`,
    upload: BASEURL +`upload`,
    uploadFWB: BASEURL +`uploadFWB`,
    sendCode: BASEURL + 'user/sendCode',
    updatePassword: BASEURL + 'user/updatePassword',
    saveMarketingTool: BASEURL + 'user/saveMarketingTool',
    getMarketingTool: BASEURL + 'user/findMarketingTool',
    getMarketingToolGoods: BASEURL + 'user/getMarketingToolGoods',
    saveMarketingToolGoods: BASEURL + 'user/saveMarketingToolGoods',
    deleteMarketingToolGoods: BASEURL + 'user/deleteMarketingToolGoods',
    getIntegralInfo: BASEURL + 'user/getIntegralInfo',
    updateIntegralInfo: BASEURL + 'user/updateIntegral',
    saveAfterOrder: BASEURL + 'dealerOrder/saveAfterSalesOrder',
    offOrder: BASEURL + 'dealerOrder/offOrder',
    againCheck: BASEURL + 'user/againCheck',
    createShare: BASEURL + 'user/createShare',
    getShare: BASEURL + 'share',
    QRCode: BASEURL + 'barcode',
    shareLink: BASEURL + 'createMarke?id=',
    createQRCode: BASEURL + 'user/createQRCode',
    getCollectionList: BASEURL + 'user/findCollectionList',
    deleteMoreCollection: BASEURL + 'user/deleteMoreCollection',
    Goods: BASEURL + `goods`,
    findIndexNews: BASEURL + `user/findIndexNews`,
    findDealerIndexOrders: BASEURL + `user/findDealerIndexOrders`,
    findDealerIndexPurchase: BASEURL + `user/findDealerIndexPurchase`,
    addPurchase: BASEURL + 'purchase/addPurchase',
    findMarketingToolEditDate: BASEURL + 'user/findMarketingToolEditDate',
    findMyFootprint: BASEURL + 'goods/findMyFootprint',
    findUserJobs:BASEURL + 'user/findUserJobs',
    findUserSons:BASEURL + 'user/findUserSons',
    addUserSon: BASEURL + 'user/addUserSon',
    updateUserSon: BASEURL + 'user/updateUserSon',
    addUserJob: BASEURL + 'user/addUserJob',
    updateUserJob: BASEURL + 'user/updateUserJob',
    addCollect: BASEURL + 'user/addCollect',
    deleteCollect: BASEURL + 'user/deleteCollect',
    addLook: BASEURL + 'user/addLook',
    deleteLook: BASEURL + 'user/deleteLook',
    addPartner: BASEURL + 'user/addPartner',
    deletePartner: BASEURL + 'user/deletePartner',
    findUserDetails: BASEURL + 'user/findProviderDetails',
    findProviderGoods: BASEURL + 'goods/findProviderGoods',
    getUserLoginInfo: BASEURL + 'user/getUserLoginInfo',
    getExpireTime:  BASEURL + 'user/findTime',
    getProviderScope: BASEURL + "scope/providerScope",
    updateByUserSon: BASEURL + "user/updateByUserSon", //更新子账号信息
    purchaseFindByIdSupplyInfoMgs: BASEURL + "advices/purchaseFindByIdSupplyInfoMgs",//主页供应商发布的消息数据
    purchaseReceiveSupplyInfoMgs:BASEURL + "advices/purchaseReceiveSupplyInfoMgs",//消息中心,供应商发布过来的信息
    purchaseReceiveSystemMgs:BASEURL + "advices/purchaseReceiveSystemMgs",//消息中心,供应商发布过来的信息
    addPurchaseLookAdvices: BASEURL + "advices/addPurchaseLookAdvices",//主页新增用户查看供应商发布的消息记录
    dealerScope:BASEURL + "scope/dealerScope",
    payDealerIntegralBuy:  BASEURL + "alipay/recharge/buyer/score",//经销商端,充值积分接口
    payDealerAnnual: BASEURL + "alipay/recharge/buyer/vip",//经销商端,升级年卡会员接口


    getDealerSetLevel: BASEURL + "integralRecord/getDealerSetLevel",//经销商端,获取年卡会员数据
    getSetLevel: BASEURL +"integralRecord/getSetLevel",// 获取等级设置数据
    addDealerLookProvider:BASEURL+"user/addDealerLookProvider",//经销商查看供应商信息的接口
    dealerIntegralWxPay: BASEURL + "wxpay/dealerIntegralWxPay",//经销商微信充值积分接口
    dealerIntegralWxPayQrcode: BASEURL + "wxpay/dealerIntegralWxPayQrcode",//经销商微信充值积分生成二维码接口
    dealerAnnualWxPay: BASEURL + "wxpay/dealerAnnualWxPay",//经销商微信充值年卡会员接口
    dealerAnnualWxPayQrcode: BASEURL + "wxpay/dealerAnnualWxPayQrcode",//经销商微信充值年卡生成二维码接口
    dealerWxPayQueryorder: BASEURL + "wxpay/queryorder",//经销商微信监听微信支付是否成功接口

    supplierUrl: BASEURL_WEB + "supplier",
    dealerUrl: BASEURL_WEB + "buyer",
    shopUrl: BASEURL_WEB + "shop",
    detailUrl: BASEURL_WEB + "shop",

    // supplierUrl: "http://172.16.6.75:8886/web/supplier",
    // dealerUrl: "http://172.16.6.75:8887/web/buyer",
    // shopUrl: " http://172.16.6.75:8889/web/shop",
    // detailUrl: "http://172.16.6.75:8889/web/shop"
}

module.exports = URL
