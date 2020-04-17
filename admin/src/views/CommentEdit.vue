<template>
    <div class="edit">
        <h1>{{id ? '编辑' : '新建'}}评论</h1>
        <el-form label-width="120px" @submit.native.prevent="save">
            <el-form-item label="用户">
                <el-select v-model="value" placeholder="请选择">
                    <el-option
                            v-for="item in users"
                            :key="item._id"
                            :label="item.username"
                            :value="item._id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="评论内容">
                <el-input type="textarea" placeholder="请输入内容" v-model="model.body" maxlength="120" show-word-limit>
                </el-input>
                <img src="../assets/emojiBgImg.png" @click="flag = !flag" style="margin-top: 7px; cursor: pointer"/>
                <el-button type="primary" native-type="submit" style="margin-left: 808px; margin-top: 7px">保存</el-button>
            </el-form-item>
            <el-form-item style="margin-top: -30px">
                <VEmojiPicker :pack="pack" @select="selectEmoji" v-if="flag"/>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import VEmojiPicker from 'v-emoji-picker'
    export default {
        name: "CommentEdit",
        props:{
            id:{ }
        },
        components:{
            VEmojiPicker
        },
        data(){
            return{
                model: {
                    user: []
                },
                pack: [],
                flag: false,
                users: [],
                value: ''
            }
        },
        methods:{
            async save(){
                let res
                if (this.id){
                    this.$set(this.model, 'user', this.value)
                    res=await this.$http.put(`rest/comments/${this.id}`,this.model)
                } else {
                    this.model.user.push(this.value)
                    res=await this.$http.post('rest/comments', this.model)
                }
                this.$router.push('/comments/list')
                this.$message({
                    type:'success',
                    message:'保存成功'
                })
            },
            async fetch(){
                const res=await this.$http.get(`rest/comments/${this.id}`)
                const data = await this.$http.get('rest/users')
                // this.model=Object.assign({},this.model,res.data)
                this.model = res.data
                this.users = data.data
                this.value = this.model.user[0]
            },
            async handleImageAdded(file,Editor,cursorLocation,resetUploader) {
                const formData = new FormData();
                formData.append('file',file)
                const res=await this.$http.post('upload',formData)
                Editor.insertEmbed(cursorLocation,'image',res.data.url)
                resetUploader()
            },
            selectEmoji(emoji) {
                this.model.body += emoji.data
            },
            async getUser() {
                const data = await this.$http.get('rest/users')
                this.users = data.data
            }
        },
        created() {
            this.id&&this.fetch();
            this.getUser();
        }
    }
</script>

<style scoped>

</style>
