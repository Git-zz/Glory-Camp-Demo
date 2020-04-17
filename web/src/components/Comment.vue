<template>
    <div class="comment">
        <h3>发表评论</h3>
        <el-input type="textarea" placeholder="请输入内容" v-model="msg" maxlength="120" show-word-limit>
        </el-input>
        <div style="display: flex; justify-content: space-between;">
            <img src="../assets/images/emojiBgImg.png" style="cursor: pointer;margin-top: 3px" @click="flag = !flag"/>
            <el-button type="primary" size="mini" @click="postComment" class="commentBtn">发表评论</el-button>
        </div>
        <VEmojiPicker :pack="pack" @select="selectEmoji" v-if="flag" style="margin-top: 3px;"/>
        <div class="cmt-list bg-white px-2 mt-3">
            <div v-for="(item,i) in model" :key="i" class="border-bottom py-3" style="font-size: 24px">
                <div class="cmt-title d-flex ai-center">
                    <div><el-avatar :size="40" :src="item.avatar"></el-avatar></div>
                    <div class="ml-2 flex-1 text-grey-1">{{item.nickname}}</div>
                    <div class="text-grey">
                        {{item.createdAt.slice(0, 10)}}
                    </div>
                </div>
                <div class="cmt-body pt-3" v-html="item.body"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import VEmojiPicker from 'v-emoji-picker'
    import dayjs from 'dayjs'
    export default {
        name: "Comment",
        data(){
            return{
                pageIndex:1,
                msg:'',
                model:[],
                pack: [],
                flag: false,
                user: {},
                circleUrl: require('../assets/images/default.png'),
            }
        },
        components: {
          VEmojiPicker
        },
        created() {
            this.fetch()
        },
        methods:{
            async fetch(){
                const res=await this.$http.get(`/comments`)
                const data = await this.$http.get('/user/list')
                for (let i = res.data.length - 1; i >= 0; i--) {
                    this.model.push(res.data[i])
                }
                this.model.forEach(ele => {
                    data.data.forEach(item => {
                        if (item._id == ele.user[0]) {
                            this.$set(ele, 'avatar', item.avatar)
                            this.$set(ele, 'nickname', item.nickname)
                        }
                    })
                    if (ele.avatar == '') {
                        ele.avatar = this.circleUrl
                    }
                })
            },
            async postComment(){
                if (this.msg == '') {
                    this.$message({
                        type:'error',
                        message:'请输入内容'
                    })
                } else {
                    this.flag = false
                    const res = await this.$http.get('/user/list')
                    res.data.forEach(ele => {
                        if (sessionStorage.username == ele.username) {
                            this.user = ele
                        }
                    })
                    const obj = {
                        user: [this.user._id],
                        body: this.msg
                    }
                    const data = await this.$http.post('/comments', obj)
                    const now = new Date();
                    const year = now.getFullYear();
                    const month = now.getMonth() + 1;
                    const date = now.getDate();
                    if(data.status == 200) {
                        const newCmt = {
                            avatar: this.user.avatar,
                            nickname: this.user.nickname,
                            body: this.msg,
                            createdAt: year + "-"+ this.appendZero(month) + "-" + this.appendZero(date)
                        }
                        this.model.unshift(newCmt)
                        this.flag = false
                        this.msg=''
                    }
                }
            },
            appendZero(i) {
                if(i < 10) return "0" + i
                else return i
            },
            selectEmoji(emoji) {
                this.msg += emoji.data
            }
        },
        filters:{
            date(val){
                return dayjs(val).format('MM/DD')
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../assets/scss/variables";
    h3{
        font-size: 18px;
    }
    .cmt-body{
        text-indent: 2em;
        height: 50px;
    }
    .commentBtn{
        margin-top: 3px;
    }
</style>
