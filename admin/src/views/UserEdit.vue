<template>
    <div class="edit">
        <h1>{{id ? '编辑' : '新建'}}用户</h1>
        <el-form label-width="120px" @submit.native.prevent="save">
            <el-form-item label="用户名">
                <el-input v-model="model.username"></el-input>
            </el-form-item>
            <el-form-item label="昵称">
                <el-input v-model="model.nickname"></el-input>
            </el-form-item>
            <el-form-item label="头像">
                <el-upload
                        class="avatar-uploader"
                        :action="uploadUrl"
                        :headers="getAuthHeaders()"
                        :show-file-list="false"
                        :on-success="res=>$set(model,'avatar',res.url)">
                    <img v-if="model.avatar" :src="model.avatar" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="model.password"></el-input>
            </el-form-item>
            <el-form-item label="收藏">
                <el-select v-model="value" placeholder="请选择" multiple style="width: 430px">
                    <el-option
                            v-for="item in news"
                            :key="item._id"
                            :label="item.title"
                            :value="item._id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" native-type="submit">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "UserEdit",
        props:{
            id:{ }
        },
        data(){
            return{
                model:{},
                news: [],
                value: []
            }
        },
        methods:{
            async save(){
                let res
                if (this.id){
                    this.$set(this.model, 'collect', this.value)
                    res=await this.$http.put(`rest/users/${this.id}`, this.model)
                } else {
                    res=await this.$http.post('rest/users',this.model)
                }
                this.$router.push('/users/list')
                this.$message({
                    type:'success',
                    message:'保存成功'
                })
            },
            async fetch(){
                const res=await this.$http.get(`rest/users/${this.id}`)
                const data = await this.$http.get('rest/ways')
                this.news = data.data
                this.model=res.data
                this.value = this.model.collect
            },

        },
        created() {
            this.id&&this.fetch()
        }
    }
</script>

<style scoped>

</style>
