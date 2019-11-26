import Vue from "vue";
import Router from "vue-router";
// 主要模板
const main = () => import("@/views/main/main");
const index = () => import("@/views/index/index");
const login = () => import("@/views/login/login");
const register = () => import("@/views/register/register");
// 忘记密码
const lostPassword = () => import("@/views/register/lostPassword");
const purchase = () => import("@/views/purchase/purchase");
// const hotSellGoods = () => import("@/views/goods/hotSellGoods");
// const newGoods = () => import("@/views/goods/newGoods");
// const boutiqueGoods = () => import("@/views/goods/boutiqueGoods");
const allGoods = () => import("@/views/goods/allGoods");

// 用户中心路由
const userInfo = () => import("@/views/userInfo/userInfo");
const userCenter = () => import("@/views/userInfo/userCenter");
const myFootprint = () => import("@/views/userInfo/myFootprint");
const userFavorite = () => import("@/views/userInfo/userFavorite");
const buyInfo = () => import("@/views/userInfo/buyInfo");
const userPublish = () => import("@/views/userInfo/userPublish");
const buyInfoDetail = () => import("@/views/userInfo/buyInfoDetail");
// 用户中心路由分割线
const orderInfo = () => import("@/views/order/orderInfo");
// const address = () => import("@/views/address/address");
// const shoppingTrolley = () => import("@/views/cart/shoppingTrolley");
const submitDataSupplier = () => import("@/views/submitData/submitDataSupplier");
// const dealersAndSu = () => import("@/views/dealersAndSu/dealersAndSu");
const springboard = () => import("@/views/springboard/springboard");
// const detail = () => import("@/views/detail/detail");
// const detailSimple = () => import("@/views/detail/detail_simple");
// const orderAddress = () => import("@/views/address/orderAddress");
// const quote = () => import("@/views/purchase/quote");
// 平台动态列表
const noticeList = () => import("@/views/notice/noticeList");
// 平台动态详情
const notice = () => import("@/views/notice/notice_details");
const supAndDis = () => import("@/views/supAndDis/supAndDis");
const jumpDetails = () => import("@/views/springboard/jumpDetails");
// 网站客服
const customerService = () => import("@/views/customerService/customerService");

//经销商会员介绍
const disIntroduce = () => import("@/views/disIntroduce/disIntroduce");
//供应商会员介绍
const supIntroduce = () => import("@/views/supIntroduce/supIntroduce");
//申请采购商协议
const agreementApply = () => import("@/views/agreement/agreementApply");
//申请供应商协议
const agreementApply_a = () => import("@/views/agreement/agreementApply_a");
//总则
const rules = () => import("@/views/agreement/rules");
//隐私声明
const privacy = () => import("@/views/agreement/privacy");
//服务条款
const service = () => import("@/views/agreement/service");
//注册协议
const agreementRegister = () => import("@/views/agreement/agreementRegister");
//申请采购商会员
const submitDisData = () => import("@/views/submitData/submitDisData");

//供应信息
const proInof = () => import("@/views/proInof/proInof");
//供应信息详情
const proInofDetail = () => import("@/views/proInof/proInofDetail");
const brandLobby = () => import("@/views/brand/brandLobby");
const spotGoodsLobby = () => import("@/views/spotGoods/spotGoodsLobby");
//求购信息详情
const purchaseDetail = () => import("@/views/purchase/purchaseDetail");
// ——————————————————————————————————————————————————————————————————
// 网站导航模块
// 关于我们
const aboutUs = () => import("@/views/siteNav/aboutUs");
// 法律声明
const legalNotice = () => import("@/views/siteNav/legalNotice");
// 投诉建议  complaint
const complaint = () => import("@/views/siteNav/complaint");
// 帮助中心
const helpCenter = () => import("@/views/siteNav/helpCenter");
// 帮助详情
const helpDetails = () => import("@/views/siteNav/helpDetails");
// 联系我们
const contactUs = () => import("@/views/siteNav/contactUs");
// 详情页
const details = () => import("@/views/details/details");


Vue.use(Router);

export default new Router({
    // 备注:所有被注释的路由模块都是已作废路由
  mode: "history",
  base: "/web/shop/",
  routes: [
    //{ path: "/jumpDetails", name: "jumpDetails", component: jumpDetails },
    {path: "/", name: "首页",component: index},
    // main模板下路由模块开始
    {path: "/main",name: "模板", component: main, redirect: "/",children: [
        {path: "/details",name: "详情",component: details},
        {path: "/purchase",name: "求购信息列表",component: purchase},
        {path: "/purchaseDetail",name: "求购信息详情",component: purchaseDetail},
        {path: "/brandLobby",name: "品牌大厅",component: brandLobby},
        {path: "/spotGoodsLobby",name: "现货大厅",component: spotGoodsLobby},
        {path: "/allGoods",name: "所有商品",component: allGoods},
        { path: "/springboard", name: "springboard",component: springboard },
        // {path: "/orderAddress",name: "订单地址", component: orderAddress},作废
        // {path: "/quote",name: "quote",component: quote},作废
        // {path: "/shoppingTrolley", name: "购物车", component: shoppingTrolley},作废
        // 平台动态模块
        { path: "/noticeList",name: "平台动态列表",component: noticeList},
        { path: "/notice",name: "平台动态详情",component: notice},
        {path: "/agreementApply",name: "申请采购商协议",component: agreementApply},
        {path: "/agreementApply_a",name: "申请供应商协议",component: agreementApply_a},
        {path: "/agreementRegister",name: "注册协议",component: agreementRegister},
        {path: "/rules",name: "总则",component: rules},
        {path: "/privacy",name: "隐私声明",component: privacy},
        {path: "/service",name: "服务条款",component: service},
        //供应信息
        { path: "/proInof", name: "供应信息",component: proInof},
        //供应信息详情
        {path: "/proInofDetail", name: "供应信息详情",component: proInofDetail},
        // 网站客服
        { path: "/customerService",name: "customerService",component: customerService},
        // 关于我们
        {path: "/aboutUs",name: "关于我们",component: aboutUs},
        {path: "/legalNotice",name: "法律声明",component: legalNotice},
        {path: "/complaint",name: "投诉建议",component: complaint  },
        {path: "/helpCenter",name: "帮助中心",component: helpCenter},
        { path: "/helpDetails", name: "帮助详情", component: helpDetails },
        { path: "/contactUs", name: "联系我们", component: contactUs  }
      ]
    },
    // main模板下路由模块结束

    // {path: "/address",name: "address",component: address},作废
    { path: "/login", name: "登录", component: login },
    { path: "/register", name: "注册", component: register },
    // { path: "/orderInfo", name: "订单信息", component: orderInfo },
    { path: "/submitDataSupplier", name: "供应商注册资料", component: submitDataSupplier },
    // { path: "/dealersAndSu", name: "dealersAndSu", component: dealersAndSu },作废
    { path: "/supAndDis", name: "supAndDis", component: supAndDis },
    {path: "/index",name: "index",component: index,redirect: "/" },
    {path: "/disIntroduce",name: "采购商注册引导文案",component: disIntroduce},
    { path: "/supIntroduce", name: "供应商注册引导文案", component: supIntroduce },
    { path: "/lostPassword", name: "忘记密码", component: lostPassword },
    { path: "/submitDisData", name: "采购商注册资料", component: submitDisData },
    // 普通用户中心路由开始
    { path: "/userInfo", name: "userInfo", component: userInfo, redirect: "/userCenter", children: [
        // 个人中心
        { path: "/userCenter", name: "个人中心", component: userCenter  },
        // 我的足迹
        { path: "/myFootprint", name: "我的足迹", component: myFootprint  },
        // 收藏夹
        { path: "/userFavorite", name: "收藏夹", component: userFavorite },
        // 我的求购信息
        {  path: "/buyInfo",  name: "我的求购信息",  component: buyInfo   },
        // 发布采购
        { path: "/userPublish", name: "发布求购", component: userPublish  },
        // 求购信息详情
        {path: "/buyInfoDetail",name: "我的求购信息详情",component: buyInfoDetail}
      ]
    }
    ,
    { path: "*", name: "404", component: index },
    // 普通用户中心路由结束
  ],

  //   跳转路由时返回顶部设置
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { x: 0, y: 0 };
  }
});
