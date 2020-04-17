<template>
    <div class="commentList">
        <div class="d-flex ai-center py-3 px-2 border-bottom" style="font-size: 20px">
            <div @click="$router.back(-1)" style="cursor: pointer">
                <i class="el-icon-arrow-left"></i>
            </div>
            <div class="flex-1">我的评论</div>
        </div>
        <div class="pt-2 px-2" style="font-size: 24px; height: 469px; position: relative">
            <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%)" v-if="comments.length == 0">
                <span class="text-grey-1">暂无评论<i class="el-icon-chat-dot-round pl-2"></i></span>
            </div>
            <div class="comments d-flex ai-center border-bottom"
                 v-for="(item, i) in comments" :key="item._id">
                <div class="flex-1 text-ellipsis mr-5" style="line-height: 80px;">{{item.body}}</div>
                <div class="text-grey-1">
                    {{item.createdAt.slice(0, 10)}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "MyComment",
        data() {
            return {
                comments: [],
                model: {},
            }
        },
        created() {
            this.fetch()
        },
        methods: {
            async fetch() {
                const res = await this.$http.get('/user/list')
                const data = await this.$http.get(`/comments`)
                res.data.forEach(ele => {
                    if (sessionStorage.username == ele.username) {
                        this.model = ele
                    }
                })
                data.data.forEach(ele => {
                    if (this.model._id == ele.user[0]) {
                        this.comments.push(ele)
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .comments {
        height: 80px;
    }
</style>
