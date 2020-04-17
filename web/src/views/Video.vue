<template>
    <div class="video" v-if="model">
        <div class="videoImg">
            <video-player class="video-player vjs-custom-skin"
                          ref="videoPlayer"
                          :playsinline="true"
                          :options="playerOptions">
            </video-player>
        </div>
        <div class="d-flex jc-between mx-1 mt-3" style="border: 1px solid #d4d9de; align-items: center">
            <img :src="model.avatar"  width="60" height="60">
            <div class="ml-2 m-1">
                <div style="font-weight: bold">{{model.title}}</div>
            </div>
        </div>

        <div class="mt-4 mx-1 fs-lg text-dark-1"><i class="iconfont icon-xihuan mr-2"></i>猜您喜欢</div>
        <div class="mt-3 d-flex jc-around" style="cursor: pointer">

            <router-link tag="div" style="width: 187.5px; border-bottom: none;" class="mx-2"
                         v-for="item in videoArr"
                         :key="item._id"
                         :to="`/videos/${item._id}`">
                <img :src="item.cover" width="100%" height="102.05px">
                <p class="w-100 mt-1">{{item.title}}</p>
            </router-link>
        </div>
        <Comment/>
    </div>
</template>

<script>
    export default {
        name: "Video",
        props:{
            id:{required:true}
        },
        data(){
            return{
                model:null,
                videoArr: [],
                playerOptions: {
                    //播放速度
                    playbackRates: [0.5, 1.0, 1.5, 2.0],
                    //如果true,浏览器准备好时开始回放。
                    autoplay: false,
                    // 默认情况下将会消除任何音频。
                    muted: false,
                    // 导致视频一结束就重新开始。
                    loop: false,
                    // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                    preload: 'auto',
                    language: 'zh-CN',
                    // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                    aspectRatio: '16:9',
                    // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                    fluid: true,
                    sources: [{
                        //类型
                        type: "video/mp4",
                        //url地址
                        src: ''
                    }],
                    //你的封面地址
                    poster: '',
                    //允许覆盖Video.js无法播放媒体源时显示的默认信息。
                    notSupportedMessage: '此视频暂无法播放，请稍后再试',
                    controlBar: {
                        timeDivider: true,
                        durationDisplay: true,
                        remainingTimeDisplay: false,
                        //全屏按钮
                        fullscreenToggle: true
                    }
                }
            }
        },
        created() {
            this.fetch();
            this.fetchVideo();
        },
        methods:{
            async fetch(){
                const res=await this.$http.get(`videos/${this.id}`)
                this.model=res.data
                this.playerOptions.poster = this.model.cover
                this.playerOptions.sources[0].src = this.model.source
            },
            async fetchVideo(){
                const res=await this.$http.get('videos/list')
                let temp = []
                res.data.forEach(ele => {
                    ele.videoList.forEach(item => {
                        temp.push(item)
                        temp.forEach(item1 => {
                            if (item1._id == this.id) {
                                let i = temp.indexOf(item1)
                                temp.splice(i, 1)
                            }
                        })
                    })
                })
                while (this.videoArr.length < 3) {
                    let i = Math.floor((Math.random() * temp.length))
                    this.videoArr.push(temp[i])
                    temp.splice(i, 1)
                }
            }
        },
        watch:{
            // id:'fetch' id变化触发方法
            id() {
                this.fetch();
                this.videoArr = []
                this.fetchVideo();
            }
        }
    }
</script>

<style lang="scss">
</style>
