import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import Content from './views/Content.vue'
import Game from './views/Game.vue'
import User from "./views/User";
import UserInfo from "./views/UserInfo";
import MyCollect from "./views/MyCollect";
import MyComment from "./views/MyComment";
import Article from './views/Article.vue'
import Hero from './views/Hero.vue'
import Video from './views/Video.vue'
import Way from './views/Way.vue'
import HeroVideo from './views/HeroVideo'
import Race from './views/Race'
import GameCon from './views/GameCon'
import Login from './views/Login'
import Register from "./views/Register";
// import el from "element-ui/src/locale/lang/el";

Vue.use(Router)

const router=new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Main,
      children:[
        { path: '/', name: 'home', component: Home, meta: { index: 1, keepAlive: true } },
        {path:'/content',name:'content',component:Content, meta: { index: 2, keepAlive: true } },
        {path:'/game',name:'game',component:Game, meta: { index: 3, keepAlive: true } },
        {path:'/user',name:'user',component:User, meta: { index: 4 } },
        { path: '/userInfo', name: 'userInfo', component: UserInfo },
        { path: '/collect', name: 'myCollect', component: MyCollect },
        { path: '/comment', name: 'myComment', component: MyComment },
        {path: '/heroes/:id', name: 'hero', component:Hero, props:true},
        {path:'/articles/:id',name:'article',component:Article,props:true},
        {path:'/videos/:id', name:'video', component:Video, props:true},
        {path:'/heroVideo/:id/:_id', name:'heroVideo', component:HeroVideo, props:true},
        {path:'/ways/:id', name:'way', component:Way, props:true},
        {path:'/races/:id', name:'race', component:Race, props:true},
        {path:'/gameCon/:id', name:'gameCon', component:GameCon, props:true}
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { isPublic: true }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: { flag: true }
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop
      }
      return { x: 0, y: to.meta.savedPosition || 0 }
    }
  }
})

router.beforeEach((to, from, next) => {
  if (!to.meta.isPublic && !sessionStorage.token) {
    return next('/login')
  } else if (!to.meta.flag && sessionStorage.token == 'register') {
    return next('/register')
  }
  next();
})

export default router



