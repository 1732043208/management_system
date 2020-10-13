<template>
    <div class="home">
        <div>我是首页</div>
        <el-button type="info" @click="loginout">退出按钮</el-button>
    </div>
</template>

<script>


    export default {
        name: 'Home',
        components: {},
        methods:{
            loginout(){
                window.sessionStorage.clear()
                this.$router.push('./login')
                    this.$message({
                        showClose: true,
                        message: '已退出登录！'
                    });

            }
        }
    }
</script>
