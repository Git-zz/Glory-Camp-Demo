<template>
    <div class="user">
        <div class="userInfo bg-white text-center">
            <div class="pt-4"><el-avatar :size="100" :src="circleUrl"></el-avatar></div>
            <div class="py-4" style="font-size: 20px">{{this.model.nickname}}</div>
        </div>
        <div class="body bg-white mt-3" style="position: relative">
            <div class="py-4 ml-2" style="font-size: 20px;">
                <i class="el-icon-star-off mr-2"></i>
                <span>我的收藏</span>
                <i class="el-icon-arrow-right" style="position: absolute; right: 0; cursor: pointer" @click="$router.push(`/collect`)"></i>
            </div>
            <div class="pb-4 ml-2" style="font-size: 20px">
                <i class="el-icon-chat-dot-round mr-2"></i>
                <span>我的评论</span>
                <i class="el-icon-arrow-right" style="position: absolute; right: 0; cursor: pointer" @click="$router.push(`/comment`)"></i>
            </div>
            <div class="ml-2" style="font-size: 20px">
                <i class="el-icon-user mr-2"></i>
                <span>个人信息</span>
                <i class="el-icon-arrow-right" style="position: absolute; right: 0; cursor: pointer" @click="$router.push(`/userInfo`)"></i>
            </div>
            <div style="margin-top: 161px; font-size: 20px">
                <el-button type="danger" class="w-100" style="font-size: 20px" @click="logOut">退出</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "User",
        data(){
            return {
                userInfo: {
                    username: '',
                    password: ''
                },
                model: {},
                circleUrl: require('../assets/images/default.png')
            }
        },
        mounted() {
            this.fetch();
        },
        methods: {
            async fetch() {
                const res = await this.$http.get('/user/list')
                res.data.forEach(ele => {
                    if (sessionStorage.username == ele.username) {
                        this.model = ele
                    }
                })
                if (this.model.avatar) {
                    this.circleUrl = this.model.avatar
                }
            },
            async logOut() {
                this.$confirm('是否退出?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '退出成功!'
                    });
                    sessionStorage.clear()
                    this.$router.push('/login')
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消退出'
                    });
                });
            }
        }
    }
</script>

<style scoped>
    .user {
        width: 640px;
    }
</style>
