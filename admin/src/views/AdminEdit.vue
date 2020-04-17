<template>
    <div class="edit">
        <h1>{{id ? '编辑' : '新建'}}管理员</h1>
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
            <el-form-item>
                <el-button type="primary" native-type="submit">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "AdminEdit",
        props:{
            id:{ }
        },
        data(){
            return{
                model:{}
            }
        },
        methods:{
            async save(){
                let res
                if (this.id){
                    res=await this.$http.put(`rest/admins/${this.id}`, this.model)
                } else {
                    res=await this.$http.post('rest/admins',this.model)
                }
                this.$router.push('/admins/list')
                this.$message({
                    type:'success',
                    message:'保存成功'
                })
            },
            async fetch(){
                const res=await this.$http.get(`rest/admins/${this.id}`)
                this.model=res.data
            },

        },
        created() {
            this.id&&this.fetch()
        }
    }
</script>

<style scoped>

</style>
