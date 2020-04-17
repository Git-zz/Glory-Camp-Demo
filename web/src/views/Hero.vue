<template>
  <div class="hero" v-if="model">
    <div class="top" :style="{'background-image':`url(${model.banner})`}">
        <div class="info text-white p-3 d-flex flex-column h-100 jc-end">
            <div class="fs-sm animated bounceInLeft">{{model.title}}</div>
            <h2 class="my-2 animated bounceInLeft am1">{{model.name}}</h2>
            <div class="fs-sm animated bounceInLeft am2">{{model.categories.map(v=>v.name).join('/')}}</div>
            <div class="scores d-flex pt-2" v-if="model.scores">
                <div class="mr-2 d-flex ai-center animated bounceInLeft am3">
                    <span>难度</span>
                    <span class="badge1 bg-primary">{{model.scores.difficult}}</span>
                </div>
                <div class="mr-2 d-flex ai-center animated bounceInLeft am4">
                    <span>技能</span>
                    <span class="badge1 bg-blue-1">{{model.scores.skills}}</span>
                </div>
                <div class="mr-2 d-flex ai-center animated bounceInLeft am5">
                    <span>攻击</span>
                    <span class="badge1 bg-danger">{{model.scores.attack}}</span>
                </div>
                <div class="d-flex ai-center animated bounceInLeft am6">
                    <span>生存</span>
                    <span class="badge1 bg-dark">{{model.scores.survive}}</span>
                </div>
            </div>
        </div>
    </div>

    <div>
        <div class="skills bg-white pt-3">
            <div class="d-flex jc-around">
                <img :src="item.icon"
                     v-for="(item,i) in model.skills"
                     :key="i"
                     class="icon" :class="{active:currentSkillIndex===i}" @click="currentSkillIndex=i">
            </div>
            <div v-if="currentSkill">
                <div class="d-flex ai-center px-4 pt-4">
                    <h3 class="m-0">{{currentSkill.name}}</h3>
                    <span class="text-grey-1 ml-4">
                        （冷却值：{{currentSkill.delay}} 消耗值：{{currentSkill.cost}}）
                    </span>
                </div>
                <p class="px-4">{{currentSkill.description}}</p>
            </div>
        </div>
    </div>

      <m-card plain icon="tuijian" title="出装推荐" class="hero-items">
          <div class="fs-xl">顺风出装</div>
          <div class="d-flex jc-around text-center mt-3">
              <div v-for="item in model.items1" :key="item.name">
                  <img :src="item.icon" class="icon">
                  <div class="fs-xs">{{item.name}}</div>
              </div>
          </div>
          <div class="border-bottom mt-3"></div>
          <div class="fs-xl mt-3">逆风出装</div>
          <div class="d-flex jc-around text-center mt-3">
              <div v-for="item in model.items2" :key="item.name">
                  <img :src="item.icon" class="icon">
                  <div class="fs-xs">{{item.name}}</div>
              </div>
          </div>
      </m-card>
      <m-card plain icon="wsmp-diamond" title="使用技巧">
          <p class="m-0">{{model.usageTips}}</p>
      </m-card>
      <m-card plain icon="duikang-VS" title="对抗技巧">
          <p class="m-0">{{model.battleTips}}</p>
      </m-card>
      <m-card plain icon="duoren" title="团战思路">
          <p class="m-0">{{model.teamTips}}</p>
      </m-card>
      <m-card plain icon="guanxi" title="英雄关系">
          <div class="fs-xl">最佳搭档</div>
          <div v-for="item in model.partners" :key="item.name"
          class="d-flex pt-3">
              <img :src="item.hero.avatar" height="50">
              <p class="flex-1 ml-3 m-0">{{item.description}}</p>
          </div>
      </m-card>
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
          currentSkillIndex:0,
          flag: false
      }
    },
    computed:{
        currentSkill(){
            return this.model.skills[this.currentSkillIndex]
        }
    },
    methods:{
      async fetch(){
        const res=await this.$http.get(`heroes/${this.id}`)
        this.model=res.data
      }
    },
    created() {
      this.fetch();
    }
  }
</script>

<style lang="scss" scoped>
    @import "../assets/scss/variables";
    .hero{
        .top{
            height: 294px;
            background: #fff no-repeat top center;
            background-size:auto 100%;
        }
        .info{
            background: linear-gradient(rgba(0,0,0,0),rgba(0,0,0,1));
            .scores{
                .badge1{
                    margin: 0 0.25rem;
                    display: inline-block;
                    width: 1rem;
                    height: 1rem;
                    line-height: 0.9rem;
                    text-align: center;
                    border-radius: 50%;
                    font-size: 0.6rem;
                    border: 1px solid rgba(255,255,255,0.2);
                }
            }
            .animated {
                animation-name: bounce-in;
            }
            @keyframes bounce-in {
                0% {
                    opacity: 0;
                    transform: translateX(-100px);
                }
                100% {
                    opacity: 1;
                }
            }
            .am1 {
                animation-delay: .1s;
            }
            .am2 {
                animation-delay: .2s;
            }
            .am3 {
                animation-delay: .3s;
            }
            .am4 {
                animation-delay: .5s;
            }
            .am5 {
                animation-delay: .7s;
            }
            .am6 {
                animation-delay: .9s;
            }
        }
        .skills{
            img.icon{
                &.active{
                    border-color:map-get($colors,'primary');
                }
                width: 70px;
                height: 70px;
                border: 3px solid map-get($colors,'white');
                border-radius: 50%;
            }
        }
        .hero-items{
            img.icon{
                width: 45px;
                height: 45px;
                border-radius: 50%;
            }
        }
    }

</style>
