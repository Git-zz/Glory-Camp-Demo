<template>
    <div class="heroVideo" v-if="model">
        <div class="videoImg">
            <video-player class="video-player vjs-custom-skin"
                          ref="videoPlayer"
                          :playsinline="true"
                          :options="playerOptions">
            </video-player>
        </div>
        <div class="mx-1 mt-3" style="border: 1px solid #d4d9de; height: 60px; line-height: 60px">
            <div style="font-weight: bold; font-size: 20px">{{model.title}}</div>
        </div>
        <comment/>
    </div>
</template>

<script>
    export default {
        name: "HeroVideo",
        props:{
            id:{required: true},
            _id:{required: true}
        },
        data(){
            return{
                model:null,
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
            this.fetch()
        },
        methods:{
            async fetch(){
                const res=await this.$http.get(`heroes/${this.id}`)
                res.data.content.forEach(ele => {
                    if (this._id == ele._id) {
                        this.model = ele
                    }
                })
                this.playerOptions.poster = this.model.cover
                this.playerOptions.sources[0].src = this.model.source
            }
        },
        watch:{
            id:'fetch'
            // id(){
            //     this.fetch()
            // }  id变化触发方法
        }
    }
</script>

<style lang="scss" scoped>
    .videoImg{
        overflow: hidden;
        width: 100%;
        height: 360px;
    }
</style>
