<template>
    <div class="edit">
        <div style="height: 30px; margin-bottom: 30px; color: #545c64; font-size: 20px; font-weight: bold">
            <i class="el-icon-news"></i>
            <span style="margin-left: 8px">{{id ? '编辑' : '新建'}}新闻</span>
        </div>
        <el-form label-width="120px" @submit.native.prevent="save">
            <el-form-item label="所属分类">
                <el-select v-model="model.categories[0]">
                    <el-option v-for="item in categories"
                               :key="item._id"
                               :label="item.name"
                               :value="item._id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="标题">
                <el-input v-model="model.title"></el-input>
            </el-form-item>
            <el-form-item label="详情">
                <vue-editor v-model="model.body" useCustomImageHandler @imageAdded="handleImageAdded"></vue-editor>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" native-type="submit">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {VueEditor} from 'vue2-editor'
    export default {
        name: "ArticleEdit",
        props:{
            id:{ }
        },
        components:{
            VueEditor
        },
        data(){
            return{
                model:{
                    categories: []
                },
                categories:[]
            }
        },
        methods:{
            async save(){
                let res
                if (this.id){
                    res=await this.$http.put(`rest/articles/${this.id}`,this.model)
                } else {
                    res=await this.$http.post('rest/articles',this.model)
                }
                this.$router.push('/articles/list')
                this.$message({
                    type:'success',
                    message:'保存成功'
                })
            },
            async fetch(){
                const res=await this.$http.get(`rest/articles/${this.id}`)
                this.model=res.data
            },
            async fetchCategories(){
                const res=await this.$http.get(`rest/categories`)
                res.data.forEach(ele => {
                    if (ele.parent && ele.parent.name == '新闻分类') {
                        let obj = {
                            _id: ele._id,
                            name: ele.name
                        }
                        this.categories.push(obj)
                    }
                })
            },
            async handleImageAdded(file,Editor,cursorLocation,resetUploader) {
                const formData = new FormData();
                formData.append('file',file)
                const res=await this.$http.post('upload',formData)
                Editor.insertEmbed(cursorLocation,'image',res.data.url)
                resetUploader()
            }
        },
        created() {
            this.id&&this.fetch()
            this.fetchCategories()
        }
    }
</script>

<style scoped>

</style>
