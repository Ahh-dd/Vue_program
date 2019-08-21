<template>
    <div>
        <!-- 轮播图区域 -->
        <swiper :lunbotuList="lunbotuList" :isfull="true"></swiper>

        <!-- 九宫格 到 六宫格的改造工程-->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                        <router-link to="/home/newslist">
		                    <img src="../../images/menu1.png">
		                    <div class="mui-media-body">新闻资讯</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                        <router-link to="/home/photolist">
		                    <img src="../../images/menu2.png">
		                    <div class="mui-media-body">图片分享</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                        <router-link to="/home/goodslist">
		                    <img src="../../images/menu3.png">
		                    <div class="mui-media-body">商品购买</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                        <router-link to="/home/feedback">
		                    <img src="../../images/menu4.png">
		                    <div class="mui-media-body">留言反馈</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                        <a href="#" @click.prevent="video">
		                    <img src="../../images/menu5.png">
		                    <div class="mui-media-body">视频专区</div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                        <router-link to="/member">
		                    <img src="../../images/menu6.png">
		                    <div class="mui-media-body">联系我们</div></router-link></li>
		        </ul> 
    </div>

</template>

<script>

import { Toast } from 'mint-ui'
//导入轮播图组件
import swiper from '../subcomponents/swiper.vue'
export default{
    data() {
        return {
            lunbotuList:[]//保存轮播图的数组
        }
    },
    created(){
        this.getLunbotu()
    },
    methods: {
        getLunbotu(){
            this.$http.get('api/getlunbo').then(result =>{
                if(result.body.status ===0){
                    //成功了
                    this.lunbotuList = result.body.message
                }else{
                    //失败
                    Toast('加载轮播图失败')
                }
                
            })
        },
        video(){
            Toast('暂未开放')
        }
    },
    components:{  //子组件必须在父组件中注册才能使用
        swiper    //注册轮播图组件，可以给他起名字 'lunbotu':swiper  也可以直接使用
    }
}
</script>
<style lang="scss" scoped>

    .mui-grid-view.mui-grid-9{
        background-color: #fff;
        border: none;
        img{
            width: 60px;
            height: 60px;
        }
        .mui-media-body{
                font-size: 13px;
            }
    }

    .mui-grid-view.mui-grid-9 .mui-table-view-cell{
        border: none;
    }
 
</style>