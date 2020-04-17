<template>
    <div>
        <div style="height: 30px; margin-bottom: 30px; color: #545c64; font-size: 20px; font-weight: bold">
            <i class="el-icon-suitcase-1"></i>
            <span style="margin-left: 8px">装备列表</span>
        </div>
        <el-table :data="items.slice((currentPage - 1)*pageSize, currentPage*pageSize)">
            <el-table-column prop="name" label="物品名称" align="center"></el-table-column>
            <el-table-column prop="icon" label="图标" align="center">
                <template slot-scope="scope">
                    <img :src="scope.row.icon" style="height: 3rem;">
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="180" align="center">
                <template slot-scope="scope">
                    <el-button type="primary" size="small" @click="$router.push(`/items/edit/${scope.row._id}`)" icon="el-icon-edit" circle></el-button>
                    <el-button type="danger" size="small" @click="remove(scope.row)" icon="el-icon-delete" circle></el-button><!-- scope.row 表示当前这一行-->
                </template>
            </el-table-column>
        </el-table>
        <div style="text-align: center; margin-top: 5px">
            <el-pagination
                    background
                    layout="prev, pager, next"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="pageSize"
                    :total="totalNum">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ItemList",
        data(){
            return{
                items: [],
                currentPage: 1,
                pageSize: 8,
                totalNum: 0
            }
        },
        created(){
            this.fetch()
        },
        methods: {
            async fetch() {
                const res = await this.$http.get('rest/items')
                this.items = res.data
                this.totalNum = res.data.length
            },
            async remove(row){
                this.$confirm(`是否确定删除物品"${row.name}"`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    const res=await this.$http.delete(`rest/items/${row._id}`)
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    })
                    this.fetch()
                })
            },
            handleSizeChange(val) {
                this.pageSize = val
            },
            handleCurrentChange(val) {
                this.currentPage = val
            }
        }
    }
</script>

<style scoped>

</style>
