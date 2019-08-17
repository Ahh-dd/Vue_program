<template>
  
        <!-- 顶部滑动条 -->
        <div id="slider" class="mui-slider">
				<div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
					<div class="mui-scroll">
						<a :class="['mui-control-item', item.id == 0 ? 'mui-active':'']" v-for="item in cates" :key="item.id" @click="getPhotoListByCateId(item.id)">
							{{ item.title }}
						</a>
					</div>
				</div>

				<!-- 图片列表区域 -->
				<ul class="photo-list">
					<router-link v-for="item in list" :key="item.id" :to="'/home/photoinfo/'+ item.id" tag="li">
						<img v-lazy="item.img_url">
						<div class="info">
							<h1 class="info-title">{{ item.title }}</h1>
							<div class="info-body">{{ item.zhaiyao }}</div>
						</div>
					</router-link>
				</ul>

		</div>
   
    
</template>

<script>
//按需导入Toast
import {Toast} from 'mint-ui'

//1. 导入mui的js文件
import mui from '../../lib/mui/js/mui.min.js'

export default{
    data() {
        return {
			cates:[],  //所有分类的数组
			list:[],//图片列表的数据
        }
	},
	created(){
		this.getAllCategory();
		this.getPhotoListByCateId(0);//默认进入界面，就请求所有图片的数据
	},
	mounted() {  //当组件中的DOM结构被渲染好并放到页面中去，会执行这个钩子函数
		// 如皋要操作元素，最好在mounted中，因为，这时候的的DOM元素是最新的
		//2. 初始化滑动控件
		mui('.mui-scroll-wrapper').scroll({
		deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
		});
	},
    methods: {
        getAllCategory(){
			 this.$http.get('api/getimgcategory').then(result =>{
                if(result.body.status ===0){
                    //手动拼接一个最完整的分类列表
					 result.body.message.unshift({ title:"全部",id:0})
					 this.cates = result.body.message
                }else{
                    //失败
                    Toast('加载导航失败')
                } 
            })
		},
		getPhotoListByCateId(cateId){
			//根据分类ID获取图片列表
			this.$http.get('api/getimages/'+ cateId).then(result =>{
                if(result.body.status ===0){
                    //把图片存到list中
					 this.list = result.body.message
                }else{
                    //失败
                    Toast('加载图片失败')
                } 
            })
		}
    },
}
</script>
<style lang="scss" scoped>
*{
	touch-action: pan-y;
}

.photo-list {
		list-style: none;
		margin: 0;
		padding: 10px;
		padding-bottom: 0;
	li {
		text-align: center;
		background-color: #ccc;
		margin-bottom: 10px;
		box-shadow: 0 0 9px #999;
		position: relative;
		img{
			width: 100%;
			vertical-align: middle;
		}

		img[lazy=loading] {
			width: 40px;
			height: 300px;
			margin: auto;
		}
		.info{
			color: #fff;
			text-align: left;
			position: absolute;
			bottom: 0;
			background-color: rgba(0,0,0,0.4);
			max-height: 84px;
			.info-title{
				font-size: 14px;
			}
			.info-body{
				font-size: 13px;
			}
		}
	}
}

</style>