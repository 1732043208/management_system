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
                        <el-tooltip class="item" effect="dark" content="修改信息" placement="top"
                                    :open-delay=500 :enterable="false">
                            <el-button type="primary" icon="el-icon-edit" size="mini"
                                       @click="showChangeDialog(scope.row.id)"/>
                        </el-tooltip><!--                        删除按钮-->
                        <el-tooltip effect="dark" content="删除用户" placement="top" :open-delay=500
                                    :enterable="false">
                            <el-button type="danger" icon="el-icon-delete" size="mini"
                                       @click="deleteBtn(scope.row.id)"/>
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
                title="添加用户"
                :visible.sync="addDialogVisible"
                width="30%"
                @close="addDialogClosed">
            <!--            内容主体区-->
            <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="addForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="addForm.password"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="addForm.email"></el-input>
                </el-form-item>
                <el-form-item label="手机" prop="mobile">
                    <el-input v-model="addForm.mobile"></el-input>
                </el-form-item>
            </el-form>
            <!--            底部区域-->
            <span slot="footer" class="dialog-footer">
    <el-button @click="addDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addUser">确 定</el-button>
  </span>
        </el-dialog>

        <!--        修改用户对话框-->
        <el-dialog
                title="修改用户信息"
                :visible.sync="changeDialogVisible"
                width="30%"
                @close="editDialogClosed">
            <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px">
                <el-form-item label="用户名">
                    <el-input :value="editForm.username" disabled></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="editForm.email"></el-input>
                </el-form-item>
                <el-form-item label="手机" prop="mobile">
                    <el-input v-model="editForm.mobile"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
    <el-button @click="changeDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="changeUsers">确 定</el-button>
  </span>
        </el-dialog>

    </div>
</template>

<script>
    import {
        getUsers,
        getUsersState,
        getAddUsers,
        getSearchUsers,
        getEditUsers,
        getDeleteUsers
    } from "../../../../network/home";

    export default {
        name: "users",
        data() {
            //验证邮箱的规则
            let checkEmail = (rule, value, callback) => {
                // 验证邮箱的正则表达式
                const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
                if (regEmail.test(value)) {
                    //合法的邮箱
                    return callback()
                } else {
                    callback(new Error('请输入合法的邮箱'))
                }
            };
            //验证手机号的规则
            let checkMobile = (rule, value, callback) => {
                // 验证手机号的正则表达式
                const regMobile = /^(0|86|17951)?(13[0-9]|15[0123456789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
                if (regMobile.test(value)) {
                    //合法的邮箱
                    return callback()
                } else {
                    callback(new Error('请输入合法的手机号'))
                }
            };
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
                addDialogVisible: false,
                //添加用户的表单数据
                addForm: {
                    username: '',
                    password: '',
                    email: '',
                    mobile: ''

                },
                //添加表单的验证规则对象
                addFormRules: {
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                        {min: 3, max: 10, message: '用户名的长度在3到10个字符之间', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 6, max: 15, message: '用户名的长度在6到15个字符之间', trigger: 'blur'}
                    ],
                    email: [
                        {required: true, message: '请输入邮箱', trigger: 'blur'}, {validator: checkEmail, trigger: 'blur'}
                    ],
                    mobile: [
                        {required: true, message: '请输入手机', trigger: 'blur'}, {validator: checkMobile, trigger: 'blur'}
                    ],
                },
                changeDialogVisible: false,
                // 查询到的用户信息对象
                editForm: {},
                //添加表单的验证规则对象
                editFormRules: {
                    email: [
                        {required: true, message: '请输入邮箱', trigger: 'blur'},
                        {validator: checkEmail, trigger: 'blur'}
                    ],
                    mobile: [
                        {required: true, message: '请输入手机', trigger: 'blur'},
                        {validator: checkMobile, trigger: 'blur'}
                    ],
                },
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
            // 监听添加用户对话框的关闭事件
            addDialogClosed() {
                this.$refs.addFormRef.resetFields()
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
            },
            // 点击按钮，添加新用户
            addUser() {
                this.$refs.addFormRef.validate(val => {
                    if (!val) return;

                    getAddUsers(this.addForm.username, this.addForm.password, this.addForm.email, this.addForm.mobile,)
                        .then(res => {
                            // console.log(res);
                        }).catch(err => {
                        console.log(err);
                    });
                    //隐藏用户对话框
                    this.addDialogVisible = false;
                    //重新获取用户列表数据
                    this.getUsersFunc();
                    console.log(val);
                    this.$message.success('添加用户成功！')
                })
            },
            showChangeDialog(id) {
                this.changeDialogVisible = true;
                getSearchUsers(id).then(res => {

                    this.editForm = res.data;
                    // console.log(this.editForm);
                }).catch(err => {
                    console.log(err);
                })

            },
            // 点击按钮，修改用户信息
            changeUsers() {
                this.$refs.editFormRef.validate(val => {
                    if (!val) return;
                    getEditUsers(this.editForm.id, this.editForm.email, this.editForm.mobile).then(res => {
                        console.log(res);
                    }).catch(err => {
                        console.log(err);
                    });
                    // 关闭对话框
                    this.changeDialogVisible = false;
                    // 刷新数据列表
                    this.getUsersFunc();

                    this.$message.success('更新用户信息成功！')
                })
            },
            // 监听修改用户对话框的关闭事件
            editDialogClosed() {
                this.$refs.editFormRef.resetFields()
            },
            deleteBtn(id) {
                console.log(id);
                this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    getDeleteUsers(id).then(res => {

                        console.log(res);
                    }).catch(err => {
                        console.log(err);
                    });

                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });

                    // 刷新数据列表
                    this.getUsersFunc();

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

            }

        },
        created() {
            this.getUsersFunc()
        },
    }
</script>

<style scoped>
.asda{

}
</style>