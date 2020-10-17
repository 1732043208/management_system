import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('../views/Home/Home');

const Login = () => import('../views/Login/Login.vue');
const Welcome = () => import('../components/Welcome.vue');
const Users = () => import('../views/Home/childCpns/user/users');
const Rights = () => import('../views/Home/childCpns/power/Rights');
const Roles = () => import('../views/Home/childCpns/power/Roles');
const Cate = () => import('../views/Home/childCpns/goods/Cate');
const Parameter = () => import('../views/Home/childCpns/goods/parameter');
const List = () => import('../views/Home/childCpns/goods/List');
const Statistics = () => import('../views/Home/childCpns/statistics/Statistics')
const Orders = () => import('../views/Home/childCpns/orders/orders')
Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login
    },
    {
        path: '/Home',
        name: 'Home',
        component: Home,
        redirect: '/welcome',
        children: [{path: '/welcome', component: Welcome},
            {path: '/users', component: Users},
            {path: '/rights', component: Rights},
            {path: '/roles', component: Roles},
            {path: '/categories', component: Cate},
            {path: '/params', component: Parameter},
            {path: '/goods', component: List},
            {path: '/orders', component: Orders},
            {path:'/reports',component:Statistics}]
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },

];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});


router.beforeEach((to, from, next) => {
    //to将要访问的路径
    //from代表从哪个路径跳转而来
    //next是一个函数，表示放行
    //next() 放行   next('/login') 强制跳转
    // 获取token
    const tokenStr = window.sessionStorage.getItem('token');
    if (to.path === '/login') {
        next()
    } else if (!tokenStr) {
        next('/login')
    } else {
        next()
    }


});
export default router
