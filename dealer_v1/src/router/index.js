import Vue from 'vue'
import Router from 'vue-router'

 const login = () => import('@/views/login/Login');
const index = () => import('@/views/index/index');
const main = () => import('@/views/main/index');
const order = () => import('@/views/order/Order');
const afterOrder = () => import('@/views/order/afterOrder');


const supplier = () => import('@/views/supplier/Supplier');
// 供应商详情
const supplierDetail = () => import('@/views/supplier/supplierDetail');
const cooperativeSupplier = () => import('@/views/supplier/cooperativeSupplier'); //合作的供应商
const conllectionSupplier = () => import('@/views/supplier/conllectionSupplier'); //收藏的供应商


const purchase = () => import('@/views/purchase/Purchase');
const pur_details = () => import('@/views/purchase/pur_details');
const pur_release = () => import('@/views/purchase/pur_release');
const news = () => import('@/views/news/News');
const News_details = () => import('@/views/news/News_details');
const Notice_details = () => import('@/views/news/Notice_details');
const integral = () => import('@/views/integral/Integral');
const user = () => import('@/views/user/User');
// 子账号列表
const subAccountList = () => import('@/views/user/subAccountList');
// 子账号添加
const subAccountAdd = () => import('@/views/user/subAccountAdd');
// 职位管理
const positionManagment = () => import('@/views/user/positionManagment');



const marketing = () => import('@/views/marketing/Marketing');
const marketingEnter = () => import('@/views/marketing/marketingEnter');

const serve = () => import('@/views/order/serve');
const details = () => import('@/views/order/details');
const evaluate = () => import('@/views/order/evaluate');
const evaluateDetails = () => import('@/views/order/evaluate-details');
const amendUser = () => import('@/views/user/amend-user');
const Integral = () => import('@/views/integral/Integral');
const upVip = () => import('@/views/integral/up-vip');
// 充值
const recharge = () => import('@/views/integral/recharge');
//卡券
const coupon = () => import('@/views/integral/coupon');
const jump = () => import('@/views/jump/jump');
const shareJump = () => import('@/views/jump/shareJump');
const catalogue = () => import('@/views/marketing/catalogue');
const particulars = () => import('@/views/marketing/particulars');
const createMarke = () => import('@/views/marketing/create-marke');


const collection = () => import('@/views/collection/collection');
const myFootprint = () => import('@/views/collection/myFootprint');

const shopAutomaticLogout = () => import('@/views/login/shopAutomaticLogout');
//h5
const createMarke_a = () => import('@/views/movement/createMarke_a');
const particulars_a = () => import('@/views/movement/particulars_a');


Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: "/web/buyer/",
    routes: [
        { path: '/', name: '', component: index,redirect: '/main'},
        { path: '/shareJump', name: 'shareJump', component: shareJump},
        { path: '/shopAutomaticLogout', name: 'shopAutomaticLogout', component: shopAutomaticLogout},
         { path: '/login', name: 'login', component: login},
        { path: '/createMarke', name: '生成目录', component: createMarke, meta: { title: '生成目录' } },
        { path: '/particulars', name: '生成目录商品详情', component: particulars, meta: { title: '生成目录商品详情' } },
        { path: '/createMarke_a', name: '生成目录h5', component: createMarke_a, meta: { title: '生成目录h5' } },
        { path: '/particulars_a', name: '生成目录商品详情h5', component: particulars_a, meta: { title: '生成目录商品详情h5' } },
        {
            path: '/index', name: 'index', component: index, redirect: '/main',
            children: [
                { path: '/main', name: '首页', component: main, meta: { title: '' } },
                { path: '/order', name: '订单中心', component: order, meta: { title: '订单中心' } },

                //供应商模块
                { path: '/supplier', name: '供应商列表', component: supplier, meta: { title: '供应商列表' } },
                { path: '/supplierDetail', name: '供应商详情', component: supplierDetail, meta: { title: '供应商详情' } },

                { path: '/cooperativeSupplier', name: '合作的供应商', component: cooperativeSupplier, meta: { title: '合作的供应商' } },
                { path: '/conllectionSupplier', name: '收藏的供应商', component: conllectionSupplier, meta: { title: '收藏的供应商' } },
                { path: '/purchase', name: '采购广场', component: purchase, meta: { title: '采购广场' } },
                { path: '/news', name: '消息中心', component: news, meta: { title: '消息中心' } },
                { path: '/integral', name: '积分', component: integral, meta: { title: '积分' } },
                // 账号相关路由
                { path: '/user', name: '用户中心', component: user, meta: { title: '用户中心' } },
                { path: '/subAccountList', name: '子账号列表', component: subAccountList, meta: { title: '子账号列表' } },
                { path: '/subAccountAdd', name: '子账号添加', component: subAccountAdd, meta: { title: '子账号添加' } },
                { path: '/positionManagment', name: '职位管理', component: positionManagment, meta: { title: '职位管理' } },
                { path: '/marketing', name: '营销工具', component: marketing, meta: { title: '营销工具' } },
                {path: '/marketingEnter',  name:'营销工具入口',  component:marketingEnter,    meta:{title:'营销工具入口'}},
                { path: '/serve', name: '售后服务', component: serve, meta: { title: '售后服务' } },
                { path: '/details', name: '商品详情', component: details, meta: { title: '商品详情' } },
                { path: '/evaluate', name: '评价', component: evaluate, meta: { title: '评价' } },
                { path: '/evaluateDetails', name: '评价详情', component: evaluateDetails, meta: { title: '评价详情' } },
                { path: '/amendUser', name: '修改用户信息', component: amendUser, meta: { title: '修改用户信息' } },
                { path: '/integral', name: '我的积分', component: Integral, meta: { title: '我的积分' } },
                { path: '/upVip', name: '升级vip', component: upVip, meta: { title: '升级vip' } },
                { path: '/coupon', name: '卡券', component: coupon, meta: { title: '卡券' } },
                { path: '/recharge', name: '充值中心', component: recharge, meta: { title: '充值中心' } },
                { path: '/pur_details', name: '采购广场详情', component: pur_details, meta: { title: '采购广场详情' } },
                { path: '/pur_release', name: '采购广场发布', component: pur_release, meta: { title: '采购广场发布' } },
                { path: '/News_details', name: '消息详情', component: News_details, meta: { title: '消息详情' } },
                { path: '/Notice_details', name: '公告详情', component: Notice_details, meta: { title: '公告详情' } },
                { path: '/afterOrder', name: '售后订单', component: afterOrder, meta: { title: '售后订单' } },
                { path: '/jump', name: 'jump', component: jump, meta: { title: ' ' } },
                { path: '/catalogue', name: '增加商品', component: catalogue, meta: { title: '增加商品' } },


                { path: '/collection', name: '收藏的商品', component: collection, meta: { title: '收藏的商品' } },
                { path: '/myFootprint', name: '我的足迹', component: myFootprint, meta: { title: '我的足迹' } }
            ]
        }
    ]
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
