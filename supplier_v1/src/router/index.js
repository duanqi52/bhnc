import Vue from 'vue'
import Router from 'vue-router'

 const login = () => import('@/views/login/login');//登录

const main = () => import('@/views/main/main');

const index = () => import('@/views/index/index');

const commodity = () => import('@/views/commodity/commodity');
//草稿箱
const drafts = () => import('@/views/commodity/drafts');
const postTrade = () => import('@/views/commodity/post-trade');
// 我的足迹
const myFootprint = () => import('@/views/commodity/myFootprint');
//现货商品
const spotCommodity = () => import('@/views/commodity/spotCommodity');
//未上架商品
const notPutaWay = () => import('@/views/commodity/notPutaWay');
//已发布商品
const releasedCmd = () => import('@/views/commodity/releasedCmd');


const integral = () => import('@/views/integral/integral');
const upVip = () => import('@/views/integral/up-vip');
const recharge = () => import('@/views/integral/recharge');
//卡券
const coupon = () => import('@/views/integral/coupon');

//供应信息
const provisionInfo = () => import('@/views/provisionInfo/provisionInfo');
//发布供应信息
const issueProvisionInfo = () => import('@/views/provisionInfo/issueProvisionInfo');
//供应信息详情
const provisionInfoDetails = () => import('@/views/provisionInfo/provisionInfoDetails');

const marketing = () => import('@/views/marketing/marketing');
const createMarke = () => import('@/views/marketing/create-marke');

const news = () => import('@/views/news/news');
const news_details = () => import('@/views/news/news_details');
const myNewsDetails = () => import('@/views/news/myNewsDetails');
const broadcastNews = () => import('@/views/news/broadcastNews');

const orderCenter = () => import('@/views/orderCenter/order-center');
const orderDetails = () => import('@/views/orderCenter/details');
const evaluate = () => import('@/views/orderCenter/evaluate');
const evaluateDetails = () => import('@/views/orderCenter/evaluate-details');
const serve = () => import('@/views/orderCenter/serve');


const purchase = () => import('@/views/purchase/purchase');
const pur_details = () => import('@/views/purchase/pur_details');

const quote = () => import('@/views/purchase/quote');
// 经销商详情
const supplierDetail = () => import('@/views/supplier/supplierDetail');

const supplier = () => import('@/views/supplier/supplier');
//收藏经销商
const conllectionDealer = () => import('@/views/supplier/conllectionDealer');
//合作经销商
const cooperativeDealer = () => import('@/views/supplier/cooperativeDealer');

const user = () => import('@/views/user/user');
const amendUser = () => import('@/views/user/amend-user');
// 子账号列表
const subAccountList = () => import('@/views/user/subAccountList');
// 子账号添加
const subAccountAdd = () => import('@/views/user/subAccountAdd');
// 职位管理
const positionManagment = () => import('@/views/user/positionManagment');
// 我的品牌
const myBrand = () => import('@/views/user/myBrand');
// 增加品牌
const addBrand = () => import('@/views/user/addBrand');

const addShop = () => import('@/views/marketing/add-marke');
const jump = () => import('@/views/jump/jump');
const catalogue = () => import('@/views/marketing/catalogue');
const particulars = () => import('@/views/marketing/particulars');
const marketingEnter = () => import('@/views/marketing/marketingEnter');

const collection = () => import('@/views/commodity/collection');
const shopAutomaticLogout = () => import('@/views/login/shopAutomaticLogout');
const allGoods = () => import('@/views/purchase/allGoods');
const createMarke_a = () => import('@/views/movement/createMarke_a');
const particulars_a = () => import('@/views/movement/particulars_a');

const shareJump = () => import('@/views/jump/shareJump');




Vue.use(Router)

const router =  new Router({
    mode: 'history',
    base: "/web/supplier/",
    routes: [
        {path: '/',name: '首页',redirect: '/index'},
        {path: '/login',name: '登录',component: login},//登录
        {path: '/createMarke',  name:'生成目录',  component:createMarke,    meta:{title:'生成目录'}},
        {path: '/particulars',  name:'生成目录商品详情',  component:particulars,    meta:{title:'生成目录商品详情'}},
        { path: '/shareJump', name: 'shareJump', component: shareJump},
        { path: '/shopAutomaticLogout', name: 'shopAutomaticLogout', component: shopAutomaticLogout},
        { path: '/createMarke_a', name: '生成目录h5', component: createMarke_a, meta: { title: '生成目录h5' } },
        { path: '/particulars_a', name: '生成目录商品详情h5', component: particulars_a, meta: { title: '生成目录商品详情h5' } },
        {path: '/index',name: 'main',component: main,
            children:[
                {path: '/index',  name:'首页',  component:index,    meta:{title:'首页'}},
                {path: '/orderCenter',  name:'订单中心',  component:orderCenter,    meta:{title:'订单中心'}},
                {path: '/orderDetails',  name:'商品详情',  component:orderDetails,    meta:{title:'商品详情'}},
                {path: '/evaluate',  name:'评价',  component:evaluate,    meta:{title:'评价'}},
                {path: '/evaluateDetails',  name:'评价详情',  component:evaluateDetails,    meta:{title:'评价详情'}},
                {path: '/serve',  name:'售后服务',  component:serve,    meta:{title:'售后服务'}},
                {path: '/commodity',  name:'商品管理',  component:commodity,    meta:{title:'商品管理'}},
                {path: '/postTrade',  name:'发布商品',  component:postTrade,    meta:{title:'发布商品'}},
                { path: '/myFootprint', name: '我的足迹', component: myFootprint, meta: { title: '我的足迹' } },
                {path: '/supplier',name: '经销商列表',component: supplier,meta:{title:'经销商列表'}},
                { path: '/supplierDetail', name: '经销商详情', component: supplierDetail, meta: { title: '经销商详情' } },
                {path: '/conllectionDealer',name: '收藏经销商',component: conllectionDealer,meta:{title:'收藏经销商'}},
                {path: '/cooperativeDealer',name: '合作经销商',component: cooperativeDealer,meta:{title:'合作经销商'}},
                {path: '/purchase',name: '采购广场',component: purchase,meta:{title:'采购广场'}},
                {path: '/pur_details',  name:'采购详情',  component:pur_details,    meta:{title:'采购详情'}},
                {path: '/quote',  name:'报价',  component:quote,    meta:{title:'报价'}},
                // 用户账号相关模块
                {path: '/user',  name:'用户中心',  component:user,    meta:{title:'用户中心'}},
                { path: '/subAccountList', name: '子账号列表', component: subAccountList, meta: { title: '子账号列表' } },
                { path: '/subAccountAdd', name: '子账号添加', component: subAccountAdd, meta: { title: '子账号添加' } },
                { path: '/positionManagment', name: '职位管理', component: positionManagment, meta: { title: '职位管理' } },
                {path: '/amendPassword',  name:'修改密码',  component:user,    meta:{title:'修改密码'}},
                {path: '/amendUser',  name:'修改用户信息',  component:amendUser,    meta:{title:'修改用户信息'}},
                {path: '/myBrand',  name:'我的品牌',  component:myBrand,    meta:{title:'我的品牌'}},
                {path: '/addBrand',  name:'添加品牌',  component:addBrand,    meta:{title:'增加品牌'}},
                {path: '/news',name: '消息中心',component: news,meta:{title:'消息中心'}},
                {path: '/news_details',  name:'消息详情',  component:news_details,    meta:{title:'消息详情'}},
                {path: '/myNewsDetails',  name:'我发布的消息详情',  component:myNewsDetails,    meta:{title:'我发布的消息详情'}},
                {path: '/broadcastNews',  name:'发布广播消息',  component:broadcastNews,    meta:{title:'发布广播消息'}},
                {path: '/integral',  name:'积分',  component:integral,    meta:{title:'积分'}},
                {path: '/upVip',  name:'升级vip',  component:upVip,    meta:{title:'升级vip'}},
                {path: '/recharge',  name:'充值中心',  component:recharge,    meta:{title:'充值中心'}},
                { path: '/coupon', name: '卡券', component: coupon, meta: { title: '卡券' } },
                {path: '/marketing',  name:'营销工具',  component:marketing,    meta:{title:'营销工具'}},
                {path: '/marketingEnter',  name:'营销工具入口',  component:marketingEnter,    meta:{title:'营销工具入口'}},
                {path: '/jump',  name:' ',  component:jump,    meta:{title:' '}} ,
                {path: '/catalogue',  name:'增加商品',  component:catalogue,    meta:{title:'增加商品'}},
                {path: '/collection',  name:'我的收藏',  component:collection,    meta:{title:'我的收藏'}},
                {path: '/allGoods',  name:'报价商品',  component:allGoods,    meta:{title:'报价商品'}},
                {path: '/provisionInfo',  name:'供应信息',  component:provisionInfo,    meta:{title:'供应信息'}},
                {path: '/issueProvisionInfo',  name:'发布供应信息',  component:issueProvisionInfo,    meta:{title:'发布供应信息'}},
                {path: '/provisionInfoDetails',  name:'供应信息详情',  component:provisionInfoDetails,    meta:{title:'供应信息详情'}},
                // {path: '/drafts',  name:'草稿箱',  component:drafts,    meta:{title:'草稿箱'}},
                // {path: '/spotCommodity',  name:'现货商品',  component:spotCommodity,    meta:{title:'现货商品'}},
                // {path: '/notPutaWay',  name:'未上架的商品',  component:notPutaWay,    meta:{title:'未上架商品'}},
                // {path: '/releasedCmd',  name:'未上架的商品',  component:releasedCmd,    meta:{title:'已发布商品'}},
            ]
        }
    ],
    //   跳转路由时返回顶部设置
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { x: 0, y: 0 };
  }
});

// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆

router.beforeEach((to, from, next) => {
    if (to.path === '/') {
        next();
    } else {
        let token = localStorage.getItem('Authorization');
        if (token === 'null' || token === '') {
            next('/');
        } else {
            next();
        }
    }
});


export default router;
