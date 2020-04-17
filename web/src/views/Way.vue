<template>
    <div class="way" v-if="model">
        <div class="d-flex py-3 px-2 border-bottom ai-center">
            <div @click="$router.back(-1)" style="cursor: pointer">
                <i class="el-icon-arrow-left text-blue" style="font-size: 18px"></i>
            </div>
            <strong class="flex-1 text-blue text-ellipsis">
                {{model.title}}
            </strong>
            <div class="mr-1" style="cursor: pointer">
                <i :class="fontClass" @click="getClass"></i>
            </div>
            <div class="text-grey fs-xs">
                {{model.createdAt.slice(0, 10)}}
            </div>
        </div>
        <div v-html="model.body" class="px-3 body fs-lg"></div>
        <div class="px-3 border-top py-3">
            <div class="d-flex ai-center">
                <i class="iconfont icon-xiangguanlianjie"></i>
                <strong class="text-blue fs-lg ml-1">相关资讯</strong>
            </div>
            <div class="pt-2 fs-lg">
                <router-link tag="div" class="py-1" style="border-bottom: none; cursor: pointer"
                             v-for="item in wayArr"
                             :key="item._id"
                             :to="`/ways/${item._id}`">
                    {{item.title}}
                </router-link>
            </div>
        </div>
        <Comment/>
    </div>
</template>

<script>
    export default {
        props:{
            id:{required:true}
        },
        data(){
            return{
                model:null,
                user: {},
                wayArr: [],
                fontClass: 'el-icon-star-off'
            }
        },
        created() {
            this.fetch();
            this.fetchWay();
        },
        methods:{
            async fetch(){
                const res=await this.$http.get(`ways/${this.id}`)
                this.model=res.data
                const data = await this.$http.get('/user/list')
                data.data.forEach(ele => {
                    if (sessionStorage.username == ele.username) {
                        this.user = ele
                    }
                })
                if (this.user.collect.includes(this.id)) {
                    this.fontClass = 'el-icon-star-on'
                }
            },
            async fetchWay(){
                const res=await this.$http.get('ways/list')
                let temp = []
                res.data.forEach(ele => {
                    ele.wayList.forEach(item => {
                        temp.push(item)
                        temp.forEach(item1 => {
                            if (item1._id == this.id) {
                                let i = temp.indexOf(item1)
                                temp.splice(i, 1)
                            }
                        })
                    })
                })
                while (this.wayArr.length < 2) {
                    let i = Math.floor((Math.random() * temp.length))
                    this.wayArr.push(temp[i])
                    temp.splice(i, 1)
                }
            },
            async getClass() {
                if (this.fontClass == 'el-icon-star-off') {
                    this.fontClass = 'el-icon-star-on'
                    this.user.collect.push(this.id)
                    const res = await this.$http.put(`/user/${this.user._id}`, this.user)
                    console.log(res)
                } else {
                    this.fontClass = 'el-icon-star-off'
                    let i = this.user.collect.indexOf(this.id)
                    this.user.collect.splice(i, 1)
                    const res = await this.$http.put(`/user/${this.user._id}`, this.user)
                    console.log(res)
                }
            }
        },
        watch:{
            id() {
                this.fetch();
                this.wayArr = []
                this.fetchWay();
            }
        }
    }
</script>
<style lang="scss">
    .way{
        .icon-Back{
            font-size: 1.6923rem;
        }
        .body{
            img{
                width: 100%;
                height: auto;
            }
        }
    }
    .el-icon-star-on{
        color: #ee3f4d;
        font-size: 16px;
    }
    .el-icon-star-off{
        font-size: 16px;
    }
</style>
