<template>
  <div class="article" v-if="model">
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
          <div class="pt-2 fs-lg connect">
              <router-link tag="div" class="py-1"
                           v-for="item in newArr"
                           :key="item._id"
                           :to="`/articles/${item._id}`" style="cursor: pointer">
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
          newArr: []
      }
    },
    created() {
      this.fetch();
      this.fetchNew();
    },
    methods:{
        async fetch(){
            const res=await this.$http.get(`articles/${this.id}`)
            this.model=res.data
        },
        async fetchNew(){
            const res=await this.$http.get('news/list')
            let temp = []
            res.data.forEach(ele => {
                ele.newsList.forEach(item => {
                    temp.push(item)
                    temp.forEach(item1 => {
                        if (item1._id == this.id) {
                            let i = temp.indexOf(item1)
                            temp.splice(i, 1)
                        }
                    })
                })
            })
            while (this.newArr.length < 2) {
                let i = Math.floor((Math.random() * temp.length))
                this.newArr.push(temp[i])
                temp.splice(i, 1)
            }
        }
    },
    watch:{
        // id:'fetch' id变化触发方法
        id() {
            this.fetch();
            this.newArr = []
            this.fetchNew();
        }
    }
  }
</script>
<style lang="scss">
  .article{
      width: 640px;
      .icon-Back{
        font-size: 1.6923rem;
      }
    .body{
      img{
        width: 100%;
        height: auto;
      }
    }
     .connect .router-link-exact-active{
         border-bottom: none;
     }
  }
</style>
