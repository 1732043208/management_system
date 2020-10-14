<template>
    <div>
        <!--        面包屑导航区域-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }" >首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>

        <!--        卡片视图区域-->
        <el-card>
            <!--            搜索与添加区域-->
            <el-row :gutter="20">
                <el-col :span="7">
                    <el-input placeholder="请输入内容">
                        <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary">添加用户</el-button>
                </el-col>
            </el-row>

            <!--            用户列表区域-->

            <el-table
                    :data="usersList"
                    stripe
                    style="width: 100%"
                    border>
                <el-table-column
                        prop="username"
                        label="姓名"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="email"
                        label="邮箱">
                </el-table-column>
                <el-table-column
                        prop="mobile"
                        label="电话">
                </el-table-column>
                <el-table-column
                        prop="role_name"
                        label="角色">
                </el-table-column>
                <el-table-column
                        prop="mg_state"
                        label="状态">
                </el-table-column>
                <el-table-column
                        label="操作">
                </el-table-column>
            </el-table>
        </el-card>


    </div>
</template>

<script>
    import {getUsers} from "../../../../network/home";

    export default {
        name: "users",
        data() {
            return {
                //获取用户列表的参数对象
                queryInfo: {
                    query: '',
                    pagenum: 1,
                    pagesize: 2
                },
                usersList: [],
                total: 0
            }
        },
        methods: {
            getUsersFunc() {
                getUsers(this.queryInfo.query, this.queryInfo.pagenum, this.queryInfo.pagesize,)
                    .then(res => {
                        this.usersList = res.data.users;
                        this.total = res.data.total;
                    })
                    .catch(err => {
                        console.log(err);
                    })
            },
        },
        created() {
            this.getUsersFunc()
        },
    }
</script>

<style scoped>

</style>