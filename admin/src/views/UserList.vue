<template>
    <div>
        <div style="height: 30px; margin-bottom: 30px; color: #545c64; font-size: 20px; font-weight: bold">
            <i class="el-icon-s-custom"></i>
            <span style="margin-left: 8px">用户列表</span>
        </div>
        <el-table :data="items">
            <el-table-column prop="username" label="用户名" align="center"></el-table-column>
            <el-table-column prop="nickname" label="昵称" align="center"></el-table-column>
            <el-table-column prop="avatar" label="头像" align="center">
                <template slot-scope="scope">
                    <el-avatar :size="50" :src="scope.row.avatar"></el-avatar>
                </template>
            </el-table-column>
<!--            <el-table-column fixed="right" label="操作" width="180" align="center">-->
<!--                <template slot-scope="scope">-->
<!--                    <el-button type="primary" size="small" @click="$router.push(`/users/edit/${scope.row._id}`)" icon="el-icon-edit" circle></el-button>&lt;!&ndash; scope.row 表示当前这一行&ndash;&gt;-->
<!--                    <el-button type="danger" size="small" @click="remove(scope.row)" icon="el-icon-delete" circle></el-button>-->
<!--                </template>-->
<!--            </el-table-column>-->
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "UserList",
        data(){
            return{
                items:[ ]
            }
        },
        created(){
            this.fetch()
        },
        methods: {
            async fetch() {
                const res = await this.$http.get('rest/users')
                this.items = res.data
            },
            async remove(row){
                this.$confirm(`是否确定删除"${row.username}"`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    const res=await this.$http.delete(`rest/users/${row._id}`)
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    })
                    this.fetch()
                })
            }
        }
    }
</script>

<style scoped>

</style>
