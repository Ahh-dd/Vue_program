//1.导入vue-router包
import VueRouter from 'vue-router'

//导入对应的路由组件
import HomeContainer from './components/tabbar/HomeContainer.vue'
import MemberContainer from './components/tabbar/MemberContainer.vue'
import ShopcarContainer from './components/tabbar/ShopcarContainer.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'
import NewsList from './components/news/NewsList.vue'
import NewsInfo from './components/news/NewsInfo.vue'
import PhotoList from './components/photos/PhotoList.vue'
import PhotoInfo from './components/photos/PhotoInfo.vue'


//3.创建路有对象
var router = new VueRouter({
    routes:[//配置路由规则
      { path:'/',redirect:'/home'},
      { path:'/home',component:HomeContainer },
      { path:'/member',component:MemberContainer },
      { path:'/shopcar',component:ShopcarContainer },
      { path:'/search',component:SearchContainer },
      { path:'/home/newslist',component:NewsList },
      { path:'/home/newsinfo/:id',component:NewsInfo },
      { path:'/home/photolist',component:PhotoList },
      { path:'/home/photoinfo/:id',component:PhotoInfo},  //有id的路由地址 一定要加:id

      
      ],
    linkActiveClass:'mui-active'//覆盖默认的高亮的类，默认的类叫做router-link-active
    })

//把路由对象暴露出去
export default router