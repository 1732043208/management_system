import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('../views/Home/Home');

const Login = () => import('../views/Login/Login.vue');
const Welcome = () => import('../components/Welcome.vue');
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
        redirect:'/Welcome',
        children: [{path: '/Welcome', component: Welcome}]
    },
    {
        path: '/Login',
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
    if (to.path === '/Login') {
        next()
    } else if (!tokenStr) {
        next('/Login')
    } else {
        next()
    }


});
export default router
