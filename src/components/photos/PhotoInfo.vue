<template>
	<div class="photoinfo-container">
		<h3>{{ photoinfo.title }}</h3>
		<p class="subtitle">
			<span>发表时间：{{ photoinfo.add_time | dateFormat }}</span>
			<span>点击：{{ photoinfo.click }}次</span>
		</p>

		<hr>
		<!--
            缩略图区域
            预览缩略图续安装插件: npm i vue-preview -s
            $preview.open
        -->
        <div class="thumbs">
            <!-- 最新缩略图版插件和之前不一样，看这里
             https://blog.csdn.net/qq_36742720/article/details/83270636
             -->
            <vue-preview :slides="list"></vue-preview>
        </div>
		<!-- 图片内容区域 -->
		<div class="content" v-html="photoinfo.content"></div>

		<!-- 评论子组件区域 -->
		<cmt-box :cmtid="imgId"></cmt-box>
	</div>

</template>

<script>
//按需导入Toast
import {Toast} from 'mint-ui'

//导入评论子组件
import Comment from '../subcomponents/Comment.vue'

export default{
    data() {
        return {
			imgId: this.$route.params.id,  //将路由中的图片ID存到data中，方便使用
      photoinfo:{},
      list: [] // 缩略图的数组
        }
	},
	created(){
    this.getPhotoInfo();
    this.getThumbs();
	},
    methods: {
        getPhotoInfo(){
			 this.$http.get('api/getimageInfo/' + this.imgId).then(result => {
                if(result.body.status ===0){
					          this.photoinfo = result.body.message[0]
                }else{
                    //失败
                    Toast('加载图片失败')
                } 
            })
        },
        getThumbs(){
          //获取缩略图
          this.$http.get('api/getthumimages/' + this.imgId).then(result => {
                if(result.body.status ===0){
                  //循环每个图片数据，补全图片的宽和高
					           result.body.message.forEach(item=>{
                      item.w=600;
                      item.h=400;
                      item.msrc = item.src;//msrc：小图像,到时候让后端传个小图像过来 这是新版缩略图必须加的一句
                    })
                    //把完整的数据保存在list中
                    this.list=result.body.message
                }else{
                    //失败
                    Toast('加载缩略图失败')
                } 
            })
        }
	},
	components:{ //注册评论子组件
		"cmt-box":Comment
	}
}
</script>

<style lang="scss" scoped>
.photoinfo-container {
  padding: 3px;
  h3 {
    color: #26a2ff;
    font-size: 15px;
    text-align: center;
    margin: 15px 0;
  }
  .subtitle {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
  }

  .content {
    font-size: 13px;
    line-height: 30px;
  }
}

</style>

<style lang="scss">
.thumbs {
  .my-gallery {
    display: flex;
    flex-wrap: wrap;
  }
  figure {
    width: 100px;
    height: 100px;
    margin: 10px;
    box-shadow: 0 0 8px #999;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>