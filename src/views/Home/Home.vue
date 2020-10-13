<template>
        <el-container class="home-container">
<!--            头部区域-->
            <el-header>Header  <el-button type="info" @click="loginout">退出按钮</el-button></el-header>
<!--            页面主体区域-->
            <el-container>
<!--                侧边栏-->
                <el-aside width="200px">Aside</el-aside>
<!--                右侧内容主体-->
                <el-main>Main</el-main>
            </el-container>
        </el-container>

</template>

<script>


    export default {
        name: 'Home',
        components: {},
        methods:{
            loginout(){
                window.sessionStorage.clear();
                this.$router.push('/Login');
                    this.$message({
                        showClose: true,
                        message: '已退出登录！'
                    });

            }
        }
    }
</script>
<style lang="less" scoped>
    .el-header{
        background-color: #373d41;
    }
    .el-aside{
        background-color: #333744;
    }
    .el-main{
        background-color: #EAEDF1;
    }
    .home-container{
        height: 100%;
    }
</style>