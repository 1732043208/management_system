<template>
    <div>
        <!--        面包屑导航区域-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>

        <!--        卡片视图区域-->
        <el-card>
            <!--            搜索与添加区域-->
            <el-row :gutter="20">
                <el-col :span="7">
                    <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getUsersFunc">
                        <el-button slot="append" icon="el-icon-search" @click="getUsersFunc"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="addDialogVisible=true">添加用户</el-button>
                </el-col>
            </el-row>

            <!--            用户列表区域-->

            <el-table
                    :data="usersList"
                    stripe
                    style="width: 100%"
                    border>
                <el-table-column type="index"/>

                <el-table-column prop="username" label="姓名"/>

                <el-table-column prop="email" label="邮箱"/>

                <el-table-column prop="mobile" label="电话"/>

                <el-table-column prop="role_name" label="角色"/>

                <el-table-column label="状态">
                    <template slot-scope="scope">
                        <el-switch
                                v-model="scope.row.mg_state" @change="userStateChanged(scope.row)">
                        </el-switch>
                    </template>
                </el-table-column>

                <el-table-column label="操作" width="180">
                    <template slot-scope="scope">
                        <!--                        修改按钮-->
                        <el-tooltip class="item" effect="dark" content="Top Center 提示文字" placement="top"
                                    :open-delay=500 :enterable="false">
                            <el-button type="primary" icon="el-icon-edit" size="mini"/>
                        </el-tooltip><!--                        删除按钮-->
                        <el-tooltip effect="dark" content="Top Center 提示文字" placement="top" :open-delay=500
                                    :enterable="false">
                            <el-button type="danger" icon="el-icon-delete" size="mini"/>
                        </el-tooltip>
                        <!--                        分配角色按钮-->
                        <el-tooltip effect="dark" content="分配角色" placement="top" :open-delay=500 :enterable="false">
                            <el-button type="warning" icon="el-icon-setting" size="mini"/>
                        </el-tooltip>


                    </template>
                </el-table-column>

            </el-table>

            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="queryInfo.pagenum"
                    :page-sizes="[1, 2, 5, 10]"
                    :page-size="queryInfo.pagesize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
        </el-card>

        <!--        添加用户的对话框-->
        <el-dialog
                title="提示"
                :visible.sync="addDialogVisible"
                width="30%">
            <!--            内容主体区-->
            <span>这是一段信息</span>
            <!--            底部区域-->
            <span slot="footer" class="dialog-footer">
    <el-button @click="addDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addDialogVisible = false">确 定</el-button>
  </span>
        </el-dialog>

    </div>
</template>

<script>
    import {getUsers, getUsersState} from "../../../../network/home";

    export default {
        name: "users",
        data() {
            return {
                //获取用户列表的参数对象
                queryInfo: {
                    //查询参数
                    query: '',
                    //当前的页数
                    pagenum: 1,
                    // 当前每页显示多少条数据
                    pagesize: 2
                },
                usersList: [],
                total: 0,
                //控制添加用户对话框的显示与隐藏
                addDialogVisible: false
            }
        },
        methods: {
            getUsersFunc() {
                getUsers(this.queryInfo.query, this.queryInfo.pagenum, this.queryInfo.pagesize,)
                    .then(res => {
                        console.log(res);
                        this.usersList = res.data.users;
                        this.total = res.data.total;
                    })
                    .catch(err => {
                        console.log(err);
                    })
            },

            //监听pageSize改变事件
            handleSizeChange(newSize) {
                // console.log(newSize);
                this.queryInfo.pagesize = newSize;
                this.getUsersFunc()
            },
            // 监听页码值改变的事件
            handleCurrentChange(newPage) {
                // console.log(newPage);
                this.queryInfo.pagenum = newPage;
                this.getUsersFunc()
            },
            //监听switch开关状态的改变
            userStateChanged(userInfo) {
                console.log(userInfo);
                getUsersState(userInfo.id, userInfo.mg_state).then(res => {
                    console.log(res);
                }).catch(err => {
                    userInfo.mg_state = !userInfo.mg_state;
                    console.log(err);
                })
            }
        },
        created() {
            this.getUsersFunc()
        },
    }
</script>

<style scoped>

</style>