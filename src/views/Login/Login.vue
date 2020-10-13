<template>
    <div class="login_container">
        <div class="login_box">
            <!--            头像区域-->
            <div class="avatar_box">
                <img src="../../assets/login/touxiang.jpg">
            </div>
            <!--            登录表单区域-->
            <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0px" class="login_form">
                <!--                用户名-->
                <el-form-item prop="username">
                    <el-input v-model="loginForm.username" prefix-icon="iconfont icon-user"></el-input>
                </el-form-item>
                <!--                密码-->
                <el-form-item prop="password">
                    <el-input v-model="loginForm.password" prefix-icon="iconfont icon-3702mima"
                              type="password"></el-input>
                </el-form-item>
                <!--                按钮区域-->
                <el-form-item class="btns">
                    <el-button type="primary" @click="login">登录</el-button>
                    <el-button type="info" @click="resetLoginForm">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import {getlogin} from "../../network/login";

    export default {
        name: "Login",
        data() {
            return {
                // 登录表单的数据绑定对象
                loginForm: {
                    username: 'admin',
                    password: '123456'
                },
                //表单的验证规则对象
                loginFormRules: {
                    //验证用户名是否合法
                    username: [{required: true, message: '请输入登录名称', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度在3到10个字符之间', trigger: 'blur'}],
                    //校验密码是否合法
                    password: [{required: true, message: '请输入登录密码', trigger: 'blur'},
                        {min: 6, max: 15, message: '长度在6到15个字符之间', trigger: 'blur'}],
                }
            }

        },
        methods: {
            //点击重置按钮，重置登录表单
            resetLoginForm() {
                this.$refs.loginFormRef.resetFields();
            },
            login() {
                //点击登录按钮，先进行表单预验证
                this.$refs.loginFormRef.validate((val) => {
                    //val为一个布尔值，若为true才发起网络请求
                    if (!val) return;
                    //发起网络请求
                    getlogin(this.loginForm.username, this.loginForm.password).then(res => {
                        console.log(res);
                        if (res.meta.status !== 200) {
                            console.log('登录失败!');
                            this.$message.error('登录失败');
                        } else {
                            console.log('登录成功!');
                            this.$message.success('登陆成功',);
                            // token只应在当前网站打开期间生效，所以将token保存在sessionStorage中
                            window.sessionStorage.setItem('token',res.data.token);
                            this.$router.push('/Home')
                        }

                    }).catch(err => {
                        console.log(err);
                    })
                })
            },
        }
    }
</script>

<style lang="less" scoped>
    .login_container {
        background-color: #2b4b6b;
        height: 100%;
    }

    .login_box {
        width: 450px;
        height: 300px;
        background-color: #fff;
        border-radius: 3px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);

        .avatar_box {
            height: 130px;
            width: 130px;
            border: 1px solid #eee;
            border-radius: 50%;
            box-shadow: 0 0 10px #ddd;
            padding: 10px;
            position: absolute;
            left: 50%;
            /*往后偏移50%自身的距离*/
            transform: translate(-50%, -50%);
            background-color: #fff;

            img {
                width: 100%;
                height: 100%;
                border-radius: 50%;
                background-color: #eee;
            }
        }
    }

    .login_form {
        position: absolute;
        bottom: 0;
        width: 100%;
        padding: 0 20px;
        box-sizing: border-box;
    }

    .btns {
        display: flex;
        justify-content: flex-end;
    }
</style>