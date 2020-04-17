import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store";
import './assets/scss/style.scss'
import './plugins/element.js'
import './assets/iconfont/iconfont.css'
// import $ from 'jquery'
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap/dist/js/bootstrap.min'
import './styles.scss'

//引入animate
import animate from 'animate.css'
Vue.use(animate)

// router.afterEach((to,from,next) => {  //解决router-link跳转回到顶部问题
//   window.scrollTo(0,0);
// })

import http from './http'
Vue.prototype.$http=http

Vue.mixin({
  computed:{
    uploadUrl(){
      return this.$http.defaults.baseURL+'/upload'
    }
  }
})

import VideoPlayer from 'vue-video-player'
import 'vue-video-player/src/custom-theme.css'
import 'video.js/dist/video-js.css'
Vue.use(VideoPlayer)

import Card from './components/Card'
Vue.component('m-card',Card)

import ListCard from './components/ListCard'
Vue.component('m-list-card',ListCard)

import Comment from './components/Comment'
Vue.component('Comment',Comment)

import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper /* { default global options }*/)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
