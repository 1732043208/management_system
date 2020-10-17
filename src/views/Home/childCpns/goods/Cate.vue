<template>
    <div>
        <!--        面包屑导航区域-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品分类</el-breadcrumb-item>
        </el-breadcrumb>

        <!--        卡片视图-->

        <el-card>
            <el-row>
                <el-col>
                    <el-button type="primary">添加分类</el-button>
                </el-col>
            </el-row>

            <!--            表格-->
            <tree-table
                    class="treeTable"
                    :data="cateList"
                    :columns="columns"
                    :selection-type="false"
                    :expand-type="false"
                    show-index
                    index-text="#"
                    border
                    :show-row-hover="false">
                <template slot="isOk" slot-scope="scope">
                    <i class="el-icon-success"
                       v-if="scope.row.cat_deleted === false"
                       style="color:lightgreen"></i>
                    <i class="el-icon-error" v-else style="color:red"></i>
                </template>
                <template slot="order" slot-scope="scope">
                    <el-tag size="mini" v-if="scope.row.cat_level===0">一级</el-tag>
                    <el-tag size="mini" v-if="scope.row.cat_level===1" type="success">二级</el-tag>
                    <el-tag size="mini" v-if="scope.row.cat_level===2" type="warning">三级</el-tag>
                </template>
                <template slot-scope="scope" slot="opt">
                    <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
                    <el-button type="danger" icon="el-icon-search"size="mini">删除</el-button>
                </template>
            </tree-table>
            <!--            分页区域-->

            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="queryInfo.pagenum"
                    :page-sizes="[3, 5, 10, 15]"
                    :page-size="queryInfo.pagesize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
        </el-card>
    </div>
</template>

<script>
    import {getCategoriesList} from "../../../../network/home";

    export default {
        name: "Cate",
        data() {
            return {
                queryInfo: {
                    type: 3,
                    pagenum: 1,
                    pageSize: 5
                },
                //商品分类的数据列表，默认为空
                cateList: [],
                // 总数据条数
                total: 0,
                //为table指定列的定义
                columns: [{
                    label: '分类名称',
                    prop: 'cat_name'
                }, {
                    label: '是否有效',
                    //表示，将当前列定义为模板列
                    type: 'template',
                    // 表示当前这一列使用的模板名称
                    template: 'isOk'
                }, {
                    label: '排序',
                    //表示，将当前列定义为模板列
                    type: 'template',
                    // 表示当前这一列使用的模板名称
                    template: 'order'
                }, {
                    label: '操作',
                    //表示，将当前列定义为模板列
                    type: 'template',
                    // 表示当前这一列使用的模板名称
                    template: 'opt'
                }]
            }
        },
        created() {
            this.getCateList();
        },
        methods: {
            //获取商品分类数据
            getCateList() {
                getCategoriesList(this.queryInfo.type, this.queryInfo.pagenum, this.queryInfo.pageSize,)
                    .then(res => {
                        this.$message.success('获取商品分类成功！');
                        // 把数据列表，赋值给cateList
                        this.cateList = res.data.result;
                        // 为总数据条数赋值
                        this.total = res.data.total;
                        console.log(this.cateList);
                    }).catch(err => {
                    this.$message.error('获取商品分类失败！');
                    console.log(err);
                })
            },
            // 监听pagesize改变
            handleSizeChange(newSize){
                this.queryInfo.pagesize=newSize;
                this.getCateList();
            },
            // 监听pagenum改变
            handleCurrentChange(newPage){
                this.queryInfo.pagenum=newPage;
                this.getCateList();
            }
        }
    }
</script>

<style scoped>
    .treeTable{
        margin-top: 15px;
    }
</style>
