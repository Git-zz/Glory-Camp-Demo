<template>
  <div class="gameCon" v-if="model">
    <div class="d-flex ai-center py-3 px-2 border-bottom">
        <div @click="$router.back(-1)" style="cursor: pointer">
            <i class="el-icon-arrow-left text-blue" style="font-size: 18px"></i>
        </div>
      <strong class="flex-1 text-blue">
        {{model.title}}
      </strong>
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
                           v-for="item in gameArr"
                           :key="item._id"
                           :to="`/gameCon/${item._id}`">
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
          gameArr: []
      }
    },
    created() {
      this.fetch();
      this.fetchGame();
    },
    methods:{
        async fetch(){
            const res=await this.$http.get(`games/${this.id}`)
            this.model=res.data
        },
        async fetchGame(){
            const res=await this.$http.get('games/list')
            let temp = []
            res.data.forEach(ele => {
                ele.gameList.forEach(item => {
                    temp.push(item)
                    temp.forEach(item1 => {
                        if (item1._id == this.id) {
                            let i = temp.indexOf(item1)
                            temp.splice(i, 1)
                        }
                    })
                })
            })
            while (this.gameArr.length < 2) {
                let i = Math.floor((Math.random() * temp.length))
                this.gameArr.push(temp[i])
                temp.splice(i, 1)
            }
        }
    },
    watch:{
        // id:'fetch' id变化触发方法
        id() {
            this.fetch();
            this.gameArr = []
            this.fetchGame();
        }
    }
  }
</script>
<style lang="scss">
  .gameCon{
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
</style>
