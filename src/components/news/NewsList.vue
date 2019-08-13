<template>
    <div>
        <ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media" v-for="item in newslist" :key="item.id">
					<router-link :to="'/home/newsinfo/'+item.id"> 
						<img class="mui-media-object mui-pull-left" :src="item.img_url">
						<div class="mui-media-body">
							<h1>{{ item.title }}</h1>
							<p class='mui-ellipsis'>
                                <span>发表时间:{{ item.add_time | dateFormat }}</span>
                                <span>点击:{{ item.click }}次</span>
                            </p>
						</div>
					</router-link>
				</li>
			</ul>
    </div>
    
</template>

<script>
//按需导入Toast
import {Toast} from 'mint-ui'

export default{
    data() {
        return {
            newslist:[] //新闻列表为空，准备接受数据
        }
    },
    created(){
        this.getNewsList();
    },
    methods: {
        getNewsList(){
            this.$http.get('api/getnewslist').then(result =>{
                if(result.body.status ===0){
                    //成功了,就把数据保存到data上
                    this.newslist = result.body.message
                }else{
                    //失败
                    Toast('加载轮播图失败')
                }
                
            })
        }
    },
}
</script>
<style lang="scss" scoped>
.mui-table-view{
    li{
        h1{
            font-size: 14px;
        }
        .mui-ellipsis{
            display: flex;
            justify-content: space-between;
            font-size: 12px;
            color: #226aff
        }
    }
}
</style>