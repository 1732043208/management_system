<template>
    <div>
        <!--        面包屑导航区域-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>权限列表</el-breadcrumb-item>
        </el-breadcrumb>

        <!--        卡片视图-->
        <el-card>
            <el-table :data="rightsList" border stripe>
                <el-table-column type="index"></el-table-column>
                <el-table-column prop="authName" label="权限名称"></el-table-column>
                <el-table-column prop="path" label="路径"></el-table-column>
                <el-table-column prop="level" label="权限等级">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.level==='0'">一级</el-tag>
                        <el-tag v-if="scope.row.level==='1'"type="success">二级</el-tag>
                        <el-tag v-if="scope.row.level==='2'"type="warning">三级</el-tag>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>
    import {getAllPowerLists} from "../../../../network/home";

    export default {
        name: "Rights",
        data() {
            return {
                rightsList: []
            }
        },
        methods: {
            getAllPowerListsFunc() {
                getAllPowerLists("list").then(res => {

                    this.rightsList = res.data;
                    console.log(this.rightsList);
                }).catch(err => {
                        console.log(err);
                    }
                )
            }
        },
        created() {
            this.getAllPowerListsFunc()
        }
    }
</script>

<style scoped>

</style>