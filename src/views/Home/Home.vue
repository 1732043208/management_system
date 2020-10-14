<template>
    <el-container class="home-container">
        <!--            头部区域-->
        <el-header>
            <div>
                <img src="../../assets/home/heima.png"/>
                <span>Joker商城后台管理系统</span>
            </div>
            <el-button type="info" @click="loginout">退出按钮</el-button>
        </el-header>
        <!--            页面主体区域-->
        <el-container>
            <!--                侧边栏-->
            <el-aside :width="isShowMenu?'64px':'200px'">

                <button class="toggle-button" @click="toggleCollapse">|||</button>
                <!--                侧边栏菜单区-->
                <el-menu
                        background-color="#333744"
                        text-color="#fff"
                        active-text-color="#409EFF"
                        unique-opened
                        :collapse="isShowMenu"
                        :collapse-transition="false"
                        router
                        :default-active="activePath">
                    <!--                    一级菜单-->
                    <el-submenu :index="item.id.toString()" v-for="item in homeLeft" :key="item.id">
                        <!--                        一级菜单的模板区-->
                        <template slot="title">
                            <!--                            图标-->
                            <i :class="IconsObj[item.id]"></i>
                            <!--                            文本-->
                            <span>{{item.authName}}</span>
                        </template>

                        <!--                        二级菜单-->
                        <el-menu-item :index="'/'+items.path"
                                      v-for="items in item.children"
                                      :key="items.id"
                                      @click="saveNavState('/'+items.path)">
                            <template slot="title">
                                <!--                            图标-->
                                <i class="el-icon-menu"></i>
                                <!--                            文本-->
                                <span>{{items.authName}}</span>
                            </template>
                        </el-menu-item>
                    </el-submenu>

                </el-menu>
            </el-aside>
            <!--                右侧内容主体-->
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>

</template>

<script>
    import {getHomeLeft} from "../../network/home";

    export default {
        name: 'Home',
        components: {},
        data() {
            return {
                // 2.侧边栏数据
                homeLeft: [],
                IconsObj: {
                    '125': 'iconfont icon-user',
                    '103': 'iconfont icon-tijikongjian',
                    '101': 'iconfont icon-shangpin',
                    '102': 'iconfont icon-danju',
                    '145': 'iconfont icon-baobiao'
                },
                activePath: '',
                isShowMenu: false
            }
        },
        methods: {
            loginout() {
                window.sessionStorage.clear();
                this.$router.push('/login');
                this.$message({
                    showClose: true,
                    message: '已退出登录！'
                });

            },
            getHomeLeftFunc() {
                getHomeLeft().then(res => {
                    this.homeLeft = res.data;
                    console.log(this.homeLeft);
                }).catch(err => {
                    console.log(err);
                })
            },
            //点击按钮切换菜单的折叠与展开
            toggleCollapse() {
                this.isShowMenu = !this.isShowMenu
            },
            saveNavState(val) {
                window.sessionStorage.setItem('activePath', val);
                this.activePath = val
            }
        },
        created() {
            this.getHomeLeftFunc();
            this.activePath = window.sessionStorage.getItem('activePath')
        }
    }
</script>
<style lang="less" scoped>
    .el-header {
        background-color: #373d41;
        display: flex;
        justify-content: space-between;
        padding-left: 0;
        align-items: center;
        color: #fff;
        font-size: 20px;

        > div {
            display: flex;
            align-items: center;

            span {
                margin-left: 15px;
            }
        }
    }

    .el-aside {
        background-color: #333744;

        .el-menu {
            border-right: none;
        }
    }

    .el-main {
        background-color: #EAEDF1;
    }

    .home-container {
        height: 100%;
    }

    .iconfont {
        margin-right: 10px;
    }

    .toggle-button {
        background-color: #4A5064;
        color: white;
        text-align: center;
        line-height: 24px;
        font-size: 10px;
        letter-spacing: 0.2em;
        width: 100%;
        border: none;
        outline: none;
    }
</style>