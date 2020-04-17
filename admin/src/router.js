import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Main from './views/Main.vue'
import CategoryEdit from './views/CategoryEdit.vue'
import CategoryList from './views/CategoryList.vue'
import ItemEdit from './views/ItemEdit.vue'
import ItemList from './views/ItemList.vue'
import HeroEdit from './views/HeroEdit.vue'
import HeroList from './views/HeroList.vue'
import ArticleEdit from './views/ArticleEdit.vue'
import ArticleList from './views/ArticleList.vue'
import UserEdit from './views/UserEdit.vue'
import UserList from './views/UserList.vue'
import AdminEdit from "./views/AdminEdit";
import AdminList from "./views/AdminList";
import VideoEdit from './views/VideoEdit.vue'
import VideoList from './views/VideoList.vue'
import WayEdit from './views/WayEdit.vue'
import WayList from './views/WayList.vue'
import RaceEdit from './views/RaceEdit.vue'
import RaceList from './views/RaceList.vue'
import GameEdit from './views/GameEdit.vue'
import GameList from './views/GameList.vue'
import CommentEdit from './views/CommentEdit.vue'
import CommentList from './views/CommentList.vue'
Vue.use(Router)

const router=new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main,
      children:[
        {path:'/categories/create',component: CategoryEdit},
        {path:'/categories/list',component: CategoryList},
        {path:'/categories/edit/:id',component: CategoryEdit,props:true},

        {path:'/items/create',component: ItemEdit},
        {path:'/items/list',component: ItemList},
        {path:'/items/edit/:id',component: ItemEdit,props:true},

        {path:'/heros/create',component: HeroEdit},
        {path:'/heros/list',component: HeroList},
        {path:'/heros/edit/:id',component: HeroEdit,props:true},

        {path:'/articles/create',component: ArticleEdit},
        {path:'/articles/list',component: ArticleList},
        {path:'/articles/edit/:id',component: ArticleEdit,props:true},

        {path:'/users/create',component: UserEdit},
        {path:'/users/list',component: UserList},
        {path:'/users/edit/:id',component: UserEdit,props:true},

        {path:'/admins/create',component: AdminEdit},
        {path:'/admins/list',component: AdminList},
        {path:'/admins/edit/:id',component: AdminEdit, props: true},

        {path:'/videos/create',component: VideoEdit},
        {path:'/videos/list',component: VideoList},
        {path:'/videos/edit/:id',component: VideoEdit,props:true},

        {path:'/ways/create',component: WayEdit},
        {path:'/ways/list',component: WayList},
        {path:'/ways/edit/:id',component: WayEdit,props:true},

        {path:'/races/create',component: RaceEdit},
        {path:'/races/list',component: RaceList},
        {path:'/races/edit/:id',component: RaceEdit,props:true},

        {path:'/games/create',component: GameEdit},
        {path:'/games/list',component: GameList},
        {path:'/games/edit/:id',component: GameEdit,props:true},

        {path:'/comments/create',component: CommentEdit},
        {path:'/comments/list',component: CommentList},
        {path:'/comments/edit/:id',component: CommentEdit,props:true},
      ]
    },
    {
      path:'/login',
      name:'login',
      component:Login,
      meta:{isPublic:true}
    }
  ]
})
router.beforeEach((to,from,next)=>{
  if (!to.meta.isPublic && !sessionStorage.token){
    return next('/login')
  }
  next()
})

export default router
