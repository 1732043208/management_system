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
            <el-table-column type="expand">
                <template slot-scope="scope">
                    <el-row v-for="(item1,index1) in scope.row.children"
                            :key="item1.id"
                            :class="['bdbottom',index1===0 ? 'bdtop' : '','vcenter']">

                        <!--                        渲染一级权限-->
                        <el-col :span="5">
                            <el-tag closable
                                    @close="removeRightById(scope.row,item1.id)">{{item1.authName}}
                            </el-tag>
                            <i class="el-icon-caret-right"></i>
                        </el-col>
                        <!--                        渲染二级和三级权限-->
                        <el-col :span="19">
                            <!--                            通过for循环嵌套渲染二级权限-->
                            <el-row v-for="(item2,index2) in item1.children" :key="item2.id"
                                    :class="[index2===0?'':'bdtop','vcenter']">
                                <el-col :span="6">
                                    <el-tag type="success" closable
                                            @close="removeRightById(scope.row,item2.id)">{{item2.authName}}
                                    </el-tag>
                                    <i class="el-icon-caret-right"></i>
                                </el-col>
                                <el-col :span="18">
                                    <el-tag type="warning"
                                            v-for="(item3,index3) in item2.children"
                                            :key="item3.id"
                                            closable
                                            @close="removeRightById(scope.row,item3.id)">
                                        {{item3.authName}}
                                    </el-tag>
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>


                </template>
            </el-table-column>
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
                        <el-button type="warning" icon="el-icon-setting" size="mini"
                                   @click="showSetRightDialog(scope.row)">分配权限
                        </el-button>
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
            <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="80px">
                <el-form-item label="用户名">
                    <el-input v-model="editForm.roleName"></el-input>
                </el-form-item>
                <el-form-item label="角色描述" prop="roleDesc">
                    <el-input v-model="editForm.roleDesc"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
    <el-button @click="changeDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="changeUsers">确 定</el-button>
  </span>
        </el-dialog>

        <!--        分配权限对话框-->
        <el-dialog
                title="分配权限"
                :visible.sync="setRightDialogVisible"
                width="50%" @close="setRightDialogClosed">
            <!--            树形控件-->
            <el-tree :data="rightList"
                     :props="treeProps"
                     show-checkbox node-key="id"
                     default-expand-all
                     :default-checked-keys="defkeys"></el-tree>

            <span slot="footer" class="dialog-footer">
    <el-button @click="setRightDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="setRightDialogVisible = false">确 定</el-button>
  </span>
        </el-dialog>
    </div>
</template>

<script>
    import {
        getRolesList,
        getAddRoles,
        getRolesID,
        getChangeRoles,
        getDeleteRoles,
        getDeleteUsers,
        getDeleteRolesPower,
        getAllPowerList
    } from "../../../../network/home";

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
                // 控制分配权限对话框的显示与隐藏
                setRightDialogVisible: false,
                // 所有权限的数据
                rightList: [],
                // 树形控件的属性绑定对象
                treeProps: {
                    label: 'authName',
                    children: 'children'
                },
                // 默认选中的节点ID值数组
                defkeys: []
            }
        },
        methods: {
            getRolesListFunc() {
                getRolesList().then(res => {
                    this.roleslist = res.data;
                    // console.log(res);
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
                // console.log(id);
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
            changeUsers() {
                getChangeRoles(this.editForm.roleId, this.editForm.roleName, this.editForm.roleDesc).then(res => {
                    // console.log(res);

                }).catch(err => {
                    console.log(err);
                });
                this.changeDialogVisible = false;
                this.getRolesListFunc()
            },
            deleteBtn(id) {
                this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    getDeleteRoles(id).then(res => {
                        console.log(res);
                    }).catch(err => {
                        console.log(err);
                    });

                    // 刷新数据列表
                    this.getRolesListFunc();
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });


                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

                // 刷新数据列表
                this.getRolesListFunc()
            },
            // 弹框提示用户是否要删除
            removeRightById(Roles, PowerId) {
                console.log(Roles);

                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    getDeleteRolesPower(Roles.id, PowerId).then(res => {
                        console.log(res);
                        //刷新权限列表(将后台的返回值赋值给)Roles显示
                        Roles.children = res.data
                    }).catch(err => {
                        console.log(err);
                    });
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });

                    // 刷新数据列表

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

            },
            //展示分配权限的对话框
            showSetRightDialog(role) {
                getAllPowerList('tree').then(res => {
                    this.rightList = res.data;
                    console.log(this.rightList);
                }).catch(err => {
                    console.log(err);
                });
                // 递归获取三级节点的ID
                this.getLeafKeys(role, this.defkeys);
                this.setRightDialogVisible = true
            },
            // 通过递归的形式，获取角色下所有三级权限的id，并保存到defkeys中
            getLeafKeys(node, arr) {
                if (!node.children) {
                    return arr.push(node.id)
                } else {
                    node.children.forEach(item => {
                        this.getLeafKeys(item, arr)
                    })
                }
            },
            setRightDialogClosed() {
                this.defkeys = []
            }
        },
        created() {
            this.getRolesListFunc()

        }
    }
</script>

<style scoped>
    .el-tag {
        margin: 7px;
    }

    .bdtop {
        border-top: 1px solid #eee;
    }

    .bdbottom {
        border-bottom: 1px solid #eee;
    }

    .vcenter {
        display: flex;
        align-items: center;
    }
</style>