<template>
    <div>
        <!--        面包屑导航区域-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>角色列表</el-breadcrumb-item>
        </el-breadcrumb>

        <!--        卡片视图-->
        <el-card>
            <el-row>
                <el-col>
                    <el-button type="primary" @click="addRolesBtn">添加角色</el-button>
                </el-col>
            </el-row>
        </el-card>

        <el-table :data="roleslist" border stripe>
            <!--            展开列-->
            <el-table-column type="expand"></el-table-column>
            <!--            索引列-->
            <el-table-column type="index"></el-table-column>
            <el-table-column label="角色名称" prop="roleName"></el-table-column>
            <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
            <el-table-column label="操作" width="300px">
                <template slot-scope="scope">
                    <!--                        修改按钮-->
                    <el-tooltip class="item" effect="dark" content="修改信息" placement="top"
                                :open-delay=500 :enterable="false">
                        <el-button type="primary" icon="el-icon-edit" size="mini"
                                   @click="showChangeDialog(scope.row.id)">编辑
                        </el-button>
                    </el-tooltip><!--                        删除按钮-->
                    <el-tooltip effect="dark" content="删除用户" placement="top" :open-delay=500
                                :enterable="false">
                        <el-button type="danger" icon="el-icon-delete" size="mini"
                                   @click="deleteBtn(scope.row.id)">删除
                        </el-button>
                    </el-tooltip>
                    <!--                        分配角色按钮-->
                    <el-tooltip effect="dark" content="分配角色" placement="top" :open-delay=500 :enterable="false">
                        <el-button type="warning" icon="el-icon-setting" size="mini">分配权限</el-button>
                    </el-tooltip>

                </template>
            </el-table-column>
        </el-table>


        <!--        添加用户的对话框-->
        <el-dialog
                title="添加用户"
                :visible.sync="addDialogVisible"
                width="30%"
                @close="addDialogClosed">
            <!--            内容主体区-->
            <el-form :model="addRolesForm" :rules="addRolesFormRules" ref="addRolesFormRef" label-width="80px">
                <el-form-item label="角色名称" prop="roleName">
                    <el-input v-model="addRolesForm.roleName"></el-input>
                </el-form-item>
                <el-form-item label="角色描述">
                    <el-input v-model="addRolesForm.roleDesc"></el-input>
                </el-form-item>
            </el-form>
            <!--            底部区域-->
            <span slot="footer" class="dialog-footer">
    <el-button @click="addDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addRoles">确 定</el-button>
  </span>
        </el-dialog>

        <!--        修改用户对话框-->
        <el-dialog
                title="修改角色信息"
                :visible.sync="changeDialogVisible"
                width="30%"
                @close="editDialogClosed">
            <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px">
                <el-form-item label="用户名">
                    <el-input :value="this.editForm.roleName" disabled></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="this.editForm.roleDesc"></el-input>
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
    import {getRolesList, getAddRoles, getRolesID, getChangeRoles} from "../../../../network/home";

    export default {
        name: "Roles",
        data() {

            return {
                roleslist: [],
                addDialogVisible: false,
                addRolesForm: {
                    roleName: '',
                    roleDesc: ''
                },
                addRolesFormRules: {
                    roleName: [
                        {required: true, message: '用户名称不能为空', trigger: 'blur'},
                        {min: 3, max: 10, message: '用户名的长度在3到10个字符之间', trigger: 'blur'}
                    ],
                },
                changeDialogVisible: false,
                editForm: {},
                //添加表单的验证规则对象
                editFormRules: {
                    roleDesc: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                        {max: 15, message: '角色描述不得超过15个字符', trigger: 'blur'}
                    ],
                },
            }
        },
        methods: {
            getRolesListFunc() {
                getRolesList().then(res => {
                    this.roleslist = res.data;
                    console.log(res);
                }).catch(err => {
                        console.log(err);
                    }
                )
            },
            addRolesBtn() {
                this.addDialogVisible = true
            },
            addRoles() {
                this.$refs.addRolesFormRef.validate(val => {
                    if (!val) return;
                    getAddRoles(this.addRolesForm.roleName, this.addRolesForm.roleDesc)
                        .then(res => {
                            console.log(res);
                        }).catch(err => {
                        console.log(err);
                    });
                    this.getRolesListFunc();
                    this.addDialogVisible = false

                })
            },
            addDialogClosed() {
                this.$refs.addRolesFormRef.resetFields()
            },
            showChangeDialog(id) {
                this.changeDialogVisible = true;
                getRolesID(id).then(res => {
                    this.editForm = res.data;
                    console.log(this.editForm);
                }).catch(err => {
                    console.log(err);
                })
            },
            editDialogClosed() {
                this.$refs.editFormRef.resetFields()
            },
            // 重大问题！~！！！！！！！！！！！！！！！！！！！！！！！！！！！
            changeUsers() {
                getChangeRoles(this.editForm.roleName, this.editForm.roleDesc).then(res => {
                    console.log(res);
                }).catch(err => {
                    console.log(err);
                })
            }
        },
        created() {
            this.getRolesListFunc()
        }
    }
</script>

<style scoped>

</style>