// const BASEURL = "http://test.bhnc114.com:10080/api/shop/v1/";
// const BASEURL_WEB = "http://test.bhnc114.com:10080/web/";
const isProd = process.env.NODE_ENV === 'production'
const HOST = isProd ? 'https://www.bhnc114.com' : 'http://test.bhnc114.com:10080'
const BASEURL = `${HOST}/api/shop/v1/`;
const BASEURL_WEB = `${HOST}/web/`;
const WEB_PATH = "/web/shop";
const URL = {
  getUserMsg: BASEURL + 'user/center',

  activity: BASEURL + 'activity',
  collection: BASEURL + 'user/getCollection',
  sendCode: BASEURL + 'user/sendCode',
  register: BASEURL + 'user/register',
  purchase: BASEURL + 'purchase',
  activityGoods: BASEURL + 'goods/findActivityGoods',
  infoOrder: BASEURL + 'dealerOrder/search',
  userInfo: BASEURL + 'user/findUserInfo',

  defaultAddress: BASEURL + 'address/findDefaultAddress',
  address: BASEURL + 'address/findAddress',
  updateDefaultAddress: BASEURL + 'address/updateDefaultAddress',
  deleteMoreAddress: BASEURL + 'address/deleteMoreAddress',
  login: BASEURL + 'user/login',
  cart: BASEURL + 'cart/cart',
  getPlaceAnOrderInfo: BASEURL + 'dealerOrder/getPlaceAnOrderInfo',
  placeAnOrder: BASEURL + 'dealerOrder/placeAnOrder',
  goods: BASEURL + 'goods',
  isCollection: BASEURL + 'user/isCollection',
  addCart: BASEURL + 'cart/cart/addCart',
  addCollection: BASEURL + 'user/addCollection',
  deleteCollection: BASEURL + 'user/deleteCollection',
  updateAddress: BASEURL + 'dealerOrder/updateAddress',
  uploadFWB: BASEURL + `uploadFWB`,
  upload: BASEURL + `upload`,
  submitData: BASEURL + 'user/submitData',
  addBatches: BASEURL + 'dealerOrder/addBatches',
  updateBatches: BASEURL + 'dealerOrder/updateBatches',
  deleteBatches: BASEURL + 'dealerOrder/deleteBatches',
  addPurchase: BASEURL + 'purchase/addPurchase',
  Purchase_details: BASEURL + `purchase`,
  updateLook: BASEURL + `user/lookGoods`,
  getProvider: BASEURL + `user/getProvider`,
  settle: BASEURL + 'dealerOrder/settle',
  searchGoods: BASEURL + 'search',
  findRankingGoods: BASEURL + 'goods/findRankingGoods',
  findIndexGoods: BASEURL + 'goods/findIndexGoods',
  guessYouLike: BASEURL + 'goods/guessYouLike',
  lookedAndLooked: BASEURL + 'goods/lookedAndLooked',
  findNotices: BASEURL + 'advices/findNotices',
  findSupplierTerraceDynamicNotices: BASEURL + 'advices/findSupplierTerraceDynamicNotices',
  GoodsSpecification: BASEURL + 'GoodsSpecification',//获取商品规格
  mountingsScope: BASEURL + 'scope/mountingsScope',
  scope: BASEURL + 'scope',//获取经营范围

  noticeDetails: BASEURL + 'advices/findNoticeDetails',
  companyIsExist: BASEURL + 'user/companyIsExist',
  findGuessYouLike: BASEURL + 'goods/findGuessYouLike',
  findIndexSpeGood: BASEURL + 'goods/findIndexSpeGood',
  getCollectionList: BASEURL + 'user/findCollectionList',
  deleteMoreCollection: BASEURL + 'user/deleteMoreCollection',
  findMyFootprint: BASEURL + 'goods/findMyFootprint',
  forgetPassword: BASEURL + 'user/forgetPassword',

  findIndexPurchase: BASEURL + 'purchase/findIndexPurchase',
  findIndexSupplyInfo: BASEURL + 'purchase/findIndexSupplyInfo',

  addLook: BASEURL + 'purchase/addLook',
  deleteLook: BASEURL + 'purchase/deleteLook',
  getSupplyInfoDetails: BASEURL + 'purchase/getSupplyInfoDetails',
  searchSupplyInfo: BASEURL + 'purchase/searchSupplyInfo',

  purchaseSearchShow: BASEURL + 'purchase/searchShow',
  addDealerLookSupplier: BASEURL + "purchase/addDealerLookSupplier",//经销商查看供应商信息的接口
  // 修改密码
  updatePassword: BASEURL + "user/updatePassword",
  getBanner: BASEURL + "goods/allBanner",//获取首页轮播图
  findAllBanner: BASEURL + 'goods/allBanner',

  getSetLevel: BASEURL + "integralRecord/getSetLevel", // 获取等级设置数据
  findGoodsIds: BASEURL + 'goods/findGoodsIds', //查找商品ID

  supplierUrl: BASEURL_WEB + "supplier",
  dealerUrl: BASEURL_WEB + "buyer",
  shopUrl: BASEURL_WEB + "shop",
  detailUrl: BASEURL_WEB + "shop",

  // supplierUrl: "http://172.16.6.75:8886/web/supplier",
  // dealerUrl: "http://172.16.6.75:8887/web/buyer",
  // shopUrl: " http://172.16.6.75:8889/web/shop",
  // detailUrl: "http://172.16.6.75:8889/web/shop",

  navList: [
    {name: "首页", url: WEB_PATH + "/", active: false},
    {name: "品牌大厅", url: WEB_PATH + "/brandLobby", active: false},
    {name: "现货大厅", url: WEB_PATH + "/spotGoodsLobby", active: false},
    {name: "求购信息", url: WEB_PATH + "/purchase", active: false},
    {name: "供应信息", url: WEB_PATH + "/proInof", active: false},
    {name: "网站客服", url: WEB_PATH + "/customerService", active: false}
  ],
}

module.exports = URL
