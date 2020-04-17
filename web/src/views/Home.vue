<template>
  <div class="home">
    <el-carousel :interval="4000" type="card" height="200px" style="background-color: #fff">
      <el-carousel-item v-for="item in imgs" :key="item.url">
        <img :src="item.url"/>
      </el-carousel-item>
    </el-carousel>


  <m-list-card icon="menu" title="新闻资讯" :categories="newsCats" style="cursor: pointer">
    <template #items="{category}">
      <router-link tag="div" :to="`/articles/${news._id}`" class="py-2 fs-lg d-flex" v-for="(news,i) in category.newsList" :key="i" style="cursor: pointer">
        <span class="text-info">[{{news.categoryName}}]</span>
        <span class="px-2">|</span>
        <span class="flex-1  text-ellipsis pr-2">{{news.title}}</span>
        <span class="text-grey-1 fs-sm">{{news.createdAt | date}}</span>
      </router-link>
    </template>
  </m-list-card>

    <m-list-card icon="card-hero" title="英雄列表" :categories="heroCats" style="cursor: pointer">
      <img src="../assets/images/9936541435635.jpg" class="w-100 mb-3">
      <template #items="{category}">
        <div class="d-flex flex-wrap" style="margin: 0 -0.5rem;">
          <router-link tag="div" :to="`/heroes/${hero._id}`"
                  class="p-2 text-center" style="width: 20%; cursor: pointer;"
               v-for="(hero,i) in category.heroList" :key="i">
            <img :src="hero.avatar" width="100px" height="100px">
            <div>{{hero.name}}</div>
          </router-link>
        </div>
      </template>
    </m-list-card>

    <m-list-card icon="video" title="精彩视频" :categories="videoCats" style="cursor: pointer">
      <template #items="{category}">
        <div class="d-flex flex-wrap" style="margin: 0 -0.5rem;">
          <router-link tag="div" :to="`/videos/${video._id}`"
                       class="p-2" style="width: 50%; cursor: pointer"
                       v-for="(video,i) in category.videoList" :key="i">
            <img :src="video.cover" style="border-radius: 3px;height: 187.5px;width: 300px">
            <span class="play"></span>
            <div class="text-ellipsis-1 fs-lg mt-2" style="height: 30.67px">{{video.title}}</div>
            <div class="d-flex jc-between mt-2 text-grey-1 ai-center">
              <span><i class="sprite sprite-video mr-1"></i>{{video.click}}</span>
              <span>{{video.createdAt | date}}</span>
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
                       v-for="(way,i) in category.wayList" :key="i" style="cursor: pointer">
            <img :src="way.cover" class="w-100 mr-2" style="border-radius: 3px; width: 116px; height: 70px">
            <div style="width: 485px; height: 70px; position: relative">
              <p class="fs-lg" style="position: absolute; top: 0; margin: 0; padding: 0">{{way.title}}</p>
              <p class="fs-xs text-grey-1" style="position: absolute; bottom: 0; margin: 0; padding: 0">{{way.createdAt | date}}</p>
            </div>
          </router-link>
        </div>
        <router-link tag="div" to="/content" style="text-align: center; cursor: pointer" class="mt-2">>>点击查看更多<<</router-link>
      </template>
    </m-list-card>

  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  name: 'home',
  data(){
    return{
      imgs: [
        { url: require('../assets/images/bgImg1.jpeg') },
        { url: require('../assets/images/bgImg2.jpeg') },
        { url: require('../assets/images/bgImg3.jpeg') },
        { url: require('../assets/images/bgImg4.jpg') },
      ],
      newsCats:[],
      heroCats:[],
      videoCats:[],
      wayCats:[]
    }
  },
  created() {
    this.fetchNewsCats()
    this.fetchHeroCats()
    this.fetchVideoCats()
    this.fetchWayCats()
  },
  methods:{
    async fetchNewsCats(){
      const res=await this.$http.get('news/list')
      this.newsCats=res.data
    },
    async fetchHeroCats(){
      const res=await this.$http.get('heroes/list')
      this.heroCats=res.data
    },
    async fetchVideoCats(){
      const res=await this.$http.get('videos/list')
      this.videoCats=res.data
    },
    async fetchWayCats(){
      const res=await this.$http.get('ways/list')
      this.wayCats=res.data
    },
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
  .el-carousel__item img {
    width: 100%;
    height: 100%;
  }
  .home {
    width: 640px;
  }
  .nav-icons{
    border-top: 1px solid $border-color;
    border-bottom: 1px solid $border-color;
    .nav-item{
      width: 25%;
      border-left: 1px solid $border-color;
      &:nth-child(4n+1){
        border-left: none;
      }
    }
  }
  .play{
    display: block;
    position: absolute;
    width: 4.8rem;
    height: 4.8rem;
    margin-top: -10.4rem;
    margin-left: 9.4rem;
    background: url(../assets/images/spr.png) -21px -41px no-repeat;
    background-size: 105px;
  }
</style>
