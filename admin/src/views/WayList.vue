<template>
    <div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px">
            <div style="height: 30px; color: #545c64; font-size: 20px; font-weight: bold">
                <i class="el-icon-help"></i>
                <span style="margin-left: 8px">攻略列表</span>
            </div>
            <el-select v-model="value" placeholder="请选择" @change="getForm(value)">
                <el-option
                        v-for="item in categories"
                        :key="item._id"
                        :label="item.name"
                        :value="item._id">
                </el-option>
            </el-select>
        </div>
        <el-table :data="items.slice((currentPage - 1)*pageSize, currentPage*pageSize)">
            <el-table-column prop="title" label="标题"></el-table-column>
            <el-table-column prop="cateName" label="类别" align="center"></el-table-column>
            <el-table-column fixed="right" label="操作" width="180" align="center">
                <template slot-scope="scope">
                    <el-button type="primary" size="small" @click="$router.push(`/ways/edit/${scope.row._id}`)" icon="el-icon-edit" circle></el-button>
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
        name: "WayList",
        data(){
            return{
                items:[],
                form: [],
                currentPage: 1,
                pageSize: 8,
                totalNum: 0,
                value: '',
                categories: [
                    {
                        _id: 0,
                        name: '全部'
                    }
                ]
            }
        },
        created(){
            this.fetch()
        },
        methods: {
            async fetch() {
                const res = await this.$http.get('rest/ways')
                const data = await this.$http.get('rest/categories')
                this.items = res.data
                this.form = res.data
                this.totalNum = res.data.length
                data.data.forEach(ele => {
                    if (ele.parent && ele.parent.name == '攻略分类') {
                        this.categories.push(ele)
                    }
                })
                this.items.forEach(ele => {
                    data.data.forEach(item => {
                        if (ele.categories[0] == item._id) {
                            this.$set(ele, 'cateName', item.name)
                        }
                    })
                })
            },
            async getForm(i) {
                this.items = []
                this.form.forEach(ele => {
                    if (ele.categories[0] == i) {
                        this.items.push(ele)
                    } else if (i == 0){
                        this.items = this.form
                    }
                })
                this.totalNum = this.items.length
                this.currentPage = 1
            },
            async remove(row){
                this.$confirm(`是否确定删除"${row.title}"`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    const res=await this.$http.delete(`rest/ways/${row._id}`)
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    })
                    this.categories.forEach(item => {
                        if (this.value == item._id) {
                            this.value = item.name
                        }
                    })
                    this.form.forEach(ele => {
                        if (ele._id == row._id) {
                            const i = this.form.indexOf(ele)
                            this.form.splice(i, 1)
                        }
                    })
                    this.items.forEach(ele => {
                        if (ele._id == row._id) {
                            const i = this.items.indexOf(ele)
                            this.items.splice(i, 1)
                        }
                    })
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
