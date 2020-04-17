<template>
    <div class="content">
        <el-carousel :interval="4000" type="card" height="200px" style="background-color: #fff">
            <el-carousel-item v-for="item in imgs" :key="item.url">
                <img :src="item.url"/>
            </el-carousel-item>
        </el-carousel>

        <m-list-card icon="video" title="热门视频" :categories="videoCats" style="cursor: pointer">
            <template #items="{category}">
                <div class="mr-2">
                    <router-link tag="div" :to="`/videos/${video._id}`"
                                 class="py-2 fs-lg d-flex"
                                 v-for="(video,i) in category.videoList" :key="i">
                        <span class="flex-1  text-ellipsis">{{video.title}}</span>
                        <span class="mr-2"><i class="sprite sprite-video"></i></span>
                        <span>{{video.click}}</span>

                    </router-link>
                </div>
            </template>
        </m-list-card>

        <div class="bg-white mt-3 p-3">
            <div class="card pb-3 d-flex ai-center flex-wrap">
                <i class="iconfont icon-gonglue"></i>
                <div class="fs-xl flex-1 px-2"><strong>英雄攻略</strong></div>
                <i class="iconfont icon-menu1"></i>
            </div>
            <div class="pt-3" :style="autoHeight">
                <div class="d-flex flex-wrap jc-between" style="width: 614px">
                    <div class="text-center" style="width: 14%; cursor: pointer"
                         v-for="(hero,i) in heroList" :key="i" @click="getInfo(hero._id)">
                        <img :src="hero.avatar" class="w-100">
                    </div>
                    <div style="width: 14%" class="text-center">
                        <img :src="heroShow" class="w-100">
                    </div>
                    <div class="drow">
                        <el-dropdown trigger="click"
                                     @command="handle"
                                     :hide-on-click="false"
                                     @visible-change="show" placement="bottom">
                            <span class="el-dropdown-link" style="font-size: 16px">{{showName}}<i :class="showIcon"></i></span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item v-for="item in heroCats" :key="item.name" :command="item.name">{{item.name}}</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </div>
                <div class="d-flex flex-wrap" style="width: 529px; min-height: 244px; max-height: 300px; overflow-y: auto" v-if="flag">
                    <div class="text-center m-2" style="width: 17%; cursor: pointer"
                         v-for="(hero,i) in heroList1" :key="i" @click="getInfo(hero._id)">
                        <img :src="hero.avatar" class="w-100">
                        <div>{{hero.name}}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="heroCon bg-white pb-1" v-if="model && !flag">
            <div class="bg-light-1 d-flex jc-around">
                <p>{{model.name}}</p>|
                <p>{{model.categories[0].name}}</p>|
                <p>登场排名{{model.show}}</p>|
                <p>胜率排名{{model.win}}</p>|
                <router-link tag="p" :to="`/heroes/${model._id}`" style="cursor: pointer">查看英雄详细介绍>></router-link>
            </div>
            <div class="mt-2 d-flex jc-around" >
                <router-link tag="div" :to="`/heroVideo/${model._id}/${item._id}`"
                             v-for="item in model.content" :key="item._id" style="cursor: pointer">
                    <img :src="item.cover" width="300px" class="mb-1" height="183px">
                    <span class="play"></span>
                    <div class="text-ellipsis-1 fs-lg mt-2">{{item.title}}</div>
                    <div class="mt-2 text-grey-1">
                        <i class="sprite sprite-video mr-1"></i>{{item.click}}
                    </div>
                </router-link>
            </div>
        </div>


        <m-list-card icon="lanmu" title="赛事精品" :categories="raceCats" style="cursor: pointer">
            <template #items="{category}">
                <div class="d-flex flex-wrap" style="margin: 0 -0.5rem;">
                    <router-link tag="div" :to="`/races/${race._id}`"
                                 class="p-2" style="width: 50%;"
                                 v-for="(race,i) in category.raceList" :key="i">
                        <img :src="race.cover" style="border-radius: 3px;height: 187.5px;width: 300px">
                        <span class="play1"></span>
                        <div class="text-ellipsis-1 fs-lg mt-2" style="height: 30.67px">{{race.title}}</div>
                        <div class="d-flex jc-between mt-2 text-grey-1 ai-center">
                            <span><i class="sprite sprite-video mr-1"></i>{{race.click}}</span>
                            <span>{{race.createdAt | date}}</span>
                        </div>
                    </router-link>
                </div>
            </template>
        </m-list-card>

        <m-list-card icon="strategy" title="图文攻略" :categories="wayCats" style="cursor: pointer">
            <template #items="{category}">
                <div class="d-flex flex-wrap ai-center" style="margin: 0 -0.5rem;">
                    <router-link tag="div" :to="`/ways/${way._id}`"
                                 class="p-2 d-flex mx-1"
                                 v-for="(way,i) in category.wayList" :key="i">
                        <img :src="way.cover" class="w-100 mr-2" style="border-radius: 3px; width: 116px; height: 70px">
                        <div style="width: 485px; height: 70px; position: relative">
                            <p class="fs-lg" style="position: absolute; top: 0; margin: 0; padding: 0">{{way.title}}</p>
                            <p class="fs-xs text-grey-1" style="position: absolute; bottom: 0; margin: 0; padding: 0">{{way.createdAt | date}}</p>
                        </div>
                    </router-link>
                </div>
            </template>
        </m-list-card>
    </div>
</template>

<script>
    import dayjs from 'dayjs'
    export default {
        name: "Content",
        data(){
            return{
                heroShow: require('../assets/images/exp.jpg'),
                imgs: [
                    { url: require('../assets/images/1.jpg') },
                    { url: require('../assets/images/2.jpg') },
                    { url: require('../assets/images/3.jpg') },
                    { url: require('../assets/images/4.jpg') },
                ],
                videoCats:[],
                heroCats:[],
                heroList: [],
                heroList1: [],
                raceCats:[],
                wayCats:[],
                model: null,
                showName: '展开',
                showIcon: 'el-icon-arrow-down',
                autoHeight: {
                    height: ''
                },
                flag: false
            }
        },
        created(){
            this.fetchVideoCats()
            this.fetchHeroCats()
            this.fetchRaceCats()
            this.fetchWayCats()
        },
        methods:{
            async fetchVideoCats(){
                const res=await this.$http.get('videos/list')
                this.videoCats=res.data
            },
            async fetchHeroCats(){
                const res=await this.$http.get('heroes/list')
                this.heroCats=res.data
                this.heroCats.forEach(ele => {
                    if (ele.name !== '热门') {
                        ele.heroList.forEach(ele => {
                            this.heroList1.push(ele)
                        })
                    }
                })
                this.heroList = res.data[0].heroList.slice(0, 5)
            },
            async getInfo(i) {
                const res = await this.$http.get(`heroes/${i}`)
                this.model = res.data
                this.flag = false
                let arr = []
                this.heroList.forEach(ele => {
                    arr.push(ele._id)
                })
                if (!arr.includes(i)) {
                    this.heroShow = this.model.avatar
                }
            },
            async fetchRaceCats(){
                const res=await this.$http.get('races/list')
                this.raceCats=res.data
            },
            async fetchWayCats(){
                const res=await this.$http.get('ways/list')
                this.wayCats=res.data
            },
            handle(command) {
                this.heroCats.forEach(ele => {
                    if (ele.name == command) {
                        this.heroList1 = ele.heroList
                    }
                })
            },
            show(bool) {
                if (bool) {
                    this.showName = '收起'
                    this.showIcon = 'el-icon-arrow-up'
                    this.autoHeight.height = '400px'
                    this.flag = true
                } else {
                    this.showName = '展开'
                    this.showIcon = 'el-icon-arrow-down'
                    this.autoHeight.height = ''
                    this.flag = false
                    this.heroList1 = []
                    this.heroCats.forEach(ele => {
                        if (ele.name !== '热门') {
                            ele.heroList.forEach(ele => {
                                this.heroList1.push(ele)
                            })
                        }
                    })
                }
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
    .card{
        border-bottom: 1px solid $border-color;
    }
    .content {
        width: 640px;
    }
    .el-carousel__item img {
        width: 100%;
        height: 100%;
    }
    .heroCon{
        p{
            margin: 0;
            padding: 0;
        }
    }
    .play,.play1{
        display: block;
        position: absolute;
        width: 4.8rem;
        height: 4.8rem;
        margin-top: -10.4rem;
        margin-left: 9.4rem;
        background: url(../assets/images/spr.png) -21px -41px no-repeat;
        background-size: 105px;
    }
    .el-dropdown-link {
        cursor: pointer;
    }
    .drow {
        margin-top: 3px;
        width: 80px;
        height: 80px;
        background-color: #f5f5f5;
        border: .5px solid #000;
        line-height: 80px;
        text-align: center;
        border-top-right-radius: 10px;
        border-bottom-left-radius: 10px;
    }
</style>
