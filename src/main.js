//入口文件
import Vue from 'vue'

//1.1导入路由的包
import VueRouter from 'vue-router'
//1.2安装路由
Vue.use(VueRouter)

//注册vuex
import Vuex from'vuex'
Vue.use(Vuex)

//每次刚进入网站，肯定会调用main.js 在刚调用的时候，先从本地存储中把购物车的数据读出来
var car = JSON.parse(localStorage.getItem('car' || '[]'))

var store = new Vuex.Store({
  state:{  //this.$store.state.***
    car: car, //将购物车中商品的数据用数据存储,在car数组中，存储一些商品的对象，可以暂时将商品对象，设计成以下这样  
            //{id:商品的id, count:商品的数量, price:商品单价,selected:false}
  },
  mutations:{  //this.$store.commit('方法名称'，'按需传递唯一的参数')
    addToCar(state,goodsinfo){
      //点击加入购物车，把商品信息保存到store中的car上
      //分析：
      //1. 如果购物车中有这个商品，再添加只更新数量
      //2. 如果没有则直接把商品数据 push到 car中

      //假设在购物车中没有找到对应的商品
      var flag=false

      state.car.some(item=>{
        if(item.id == goodsinfo.id){
          item.count += parseInt(goodsinfo.count)
          flag=true
          return true
        }
      })

      //如果最终循环完毕，得到的结果还是false则直接把商品数据 push到 car中
      if(!flag){
        state.car.push(goodsinfo)
      }

      //当更新car之后，把car数组，存储到本地的localStorage中
      localStorage.setItem('car',JSON.stringify(state.car))
    },
    updateGoodsInfo(state,goodsinfo){
      //修改购物车中商品的数量值
      //分析：
      state.car.some(item =>{
        if(item.id == goodsinfo.id){
          item.count = parseInt(goodsinfo.count)
          return true
        }
      })
      // 当修改完数量把最新的购物车数据，同步到 本地存储中
      localStorage.setItem('car',JSON.stringify(state.car))
    },
    removeFormCar(state,id){
      // 根据Id，从store 中的购物车中删除对应的那条商品数据
      state.car.some((item, i) => {
        if (item.id == id) {
          state.car.splice(i, 1)
          return true;
        }
      })
      // 将删除完毕后的，最新的购物车数据，同步到 本地存储中
      localStorage.setItem('car',JSON.stringify(state.car))
    },
    updateGoodsSelected(state, info) {
      state.car.some(item => {
        if (item.id == info.id) {
          item.selected = info.selected
        }
      })
      // 把最新的 所有购物车商品的状态保存到 store 中去
      localStorage.setItem('car', JSON.stringify(state.car))
    }
  },
 
  getters:{  //this.$store.getters.***
             //相当于计算属性 也相当于filters
      getAllCount(state){
        var c=0;
        state.car.forEach(item=>{
          c +=item.count
        })
        return c
      },
      getGoodsCount(state){
        var o ={}
        state.car.forEach(item =>{
          o[item.id]=item.count
        })
        return o
      },
      getGoodsSelected(state){
        var o ={}
          state.car.forEach(item=>{
            o[item.id]=item.selected
          })
          return o
      },
      getGoodsCountAndAmount(state){
        var o={
          count:0,//勾选的数量
          amount:0//勾选的总价
        }
        state.car.forEach(item=>{
          if(item.selected){
            o.count +=item.count
            o.amount += item.price * item.count
          }
        })
        return o
        
      }
      }
})


//导入格式化时间的插件
import moment from 'moment'
//定义全局过滤器
Vue.filter('dateFormat',function(dataStr,pattern = "YYYY-MM-DD HH:mm:ss"){
  return moment(dataStr).format(pattern)
})

//2.1导入vue-resource
import VueResource from 'vue-resource'
//2.2安装vue-resource
Vue.use(VueResource)
//设置请求的根路径
Vue.http.options.root = 'http://www.liulongbin.top:3005'
//全局设置 post 时候表单数据组织形式
Vue.http.options.emulateJSON = true;


//导入mui样式
import './lib/mui/css/mui.min.css'
//导入icons样式
import './lib/mui/css/icons-extra.css'

// //按需导入Mint-UI中的组件 ,由于 按需导入懒加载不能正常使用，所以改用导入全部
// import{ Header,Swipe, SwipeItem, Button, Lazyload }from 'mint-ui'

// Vue.component(Header.name,Header)
// Vue.component(Swipe.name, Swipe)
// Vue.component(SwipeItem.name, SwipeItem)
// Vue.component(Button.name, Button)
// Vue.use(Lazyload)

// 全局配置MintUI组件库
import MintUI from 'mint-ui'
// 导入 Mint-UI的样式表
import 'mint-ui/lib/style.css'
// 使用 Vue.use 来批量注册 MintUI 的组件
Vue.use(MintUI)

// 安装 图片预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)


//1.3导入自己的router.js路由模块
import router from './router.js'



//导入App根组件
import app from './App.vue'

var vm =new Vue({
  el:'#app',
  data(){
    return{

    }
  },
  render: c=>c(app),
  router, //1.4挂载路由对象到vm实例上
  store //挂在store状态管理对象
})
