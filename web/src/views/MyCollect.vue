<template>
    <div class="collect">
        <div class="d-flex ai-center py-3 px-2 border-bottom" style="font-size: 20px">
            <div @click="$router.back(-1)" style="cursor: pointer">
                <i class="el-icon-arrow-left"></i>
            </div>
            <div>我的收藏</div>
        </div>
        <div class="pt-2 px-2" style="font-size: 24px; height: 469px; position: relative">
            <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%)" v-if="ways.length == 0">
                <span class="text-grey-1">暂无收藏<i class="el-icon-document pl-2"></i></span>
            </div>
            <div class="ways d-flex ai-center border-bottom"
                 v-for="(item, i) in ways" :key="item._id">
                <div class="mr-1" style="cursor: pointer">
                    <i class="el-icon-star-on" @click="removeWay(item._id, i)"></i>
                </div>
                <div class="flex-1 text-ellipsis mr-5 text-blue" style="line-height: 80px; cursor: pointer" @click="getWay(item._id)">{{item.title}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "MyCollect",
        data(){
            return {
                ways: [],
                model: {}
            }
        },
        created() {
            this.fetch();
        },
        methods: {
            async fetch() {
                const res = await this.$http.get('/user/list')
                const data=await this.$http.get('ways/list')
                res.data.forEach(ele => {
                    if (sessionStorage.username == ele.username) {
                        this.model = ele
                    }
                })
                data.data.forEach(ele => {
                    ele.wayList.forEach(item => {
                        if (this.model.collect.includes(item._id)) {
                            this.ways.push(item)
                        }
                    })
                })
            },
            async getWay(i) {
                this.$router.push(`/ways/${i}`)
            },
            async removeWay(id, index) {
                let i = this.model.collect.indexOf(id)
                this.model.collect.splice(i, 1)
                const res = await this.$http.put(`/user/${this.model._id}`, this.model)
                if (res.status == 200) {
                    this.ways.splice(index, 1)
                }
            }
        }
    }
</script>

<style scoped>
    .ways {
        height: 80px;
    }
    .el-icon-star-on{
        color: #ee3f4d;
        font-size: 30px;
    }
</style>
