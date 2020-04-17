<template>
  <div class="main">
    <div class="topbar bg-black py-2 px-3 d-flex ai-center">
      <router-link tag="div" to="/" style="border: none"><img src="../assets/images/logo.png" height="35"></router-link>
      <div class="px-2 flex-1">
        <div class="text-white">荣耀营地</div>
        <div class="text-grey-1 fs-xxs">团队成就更多</div>
      </div>
    </div>
    <div class="pt-3 pb-2" style="background-color: #db9e3f;">
      <div class="nav nav-inverse jc-around pb-1" style="cursor: pointer">
        <div class="nav-item">
          <router-link class="nav-link" to="/" tag="div">首页</router-link>
        </div>
        <div class="nav-item">
          <router-link class="nav-link" to="/content" tag="div">攻略中心</router-link>
        </div>
        <div class="nav-item">
          <router-link class="nav-link" to="/game" tag="div">赛事中心</router-link>
        </div>
        <div class="nav-item">
          <router-link class="nav-link" to="/user" tag="div">个人中心</router-link>
        </div>
      </div>
    </div>
    <transition :name="transitionName">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
    <transition :name="transitionName">
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'Main',
    data(){
      return {
        transitionName: ''
      }
    },
    watch: {
      $route(to, from) {
        if (to.meta.index < from.meta.index) {
          this.transitionName = 'slide-right'
        } else {
          this.transitionName = 'slide-left'
        }
      }
    }
  }
</script>
<style lang="scss">
  .main{
    position: relative;
    width: 640px;
    margin: 0px auto;
    .topbar{
      position:sticky;
      top: 0;
      z-index: 999;
    }
      .router-link-exact-active{
          border-bottom:3px solid white;
      }
  }
  .slide-right-enter-active,
  .slide-right-leave-active,
  .slide-left-enter-active,
  .slide-left-leave-active {
    width: 640px;
    transition: all .5s ease-in-out;
    position: absolute;
    left: 0;
  }
  .slide-right-enter, .slide-left-leave-active {
    opacity: 0;
    transform: translateX(-80%);
  }
  .slide-right-leave-active, .slide-left-enter {
    opacity: 0;
    transform: translateX(80%);
  }
</style>
