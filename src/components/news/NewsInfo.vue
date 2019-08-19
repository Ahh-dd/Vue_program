<template>
    <div class="newinfo-container">
        <!-- 大标题 -->
        <h3 class="title">{{newsinfo.title}}</h3>
        <!-- 子标题 -->
        <p class="subtitle">
            <span>发表时间:{{newsinfo.add_time | dateFormat}}</span>
            <span>点击:{{newsinfo.click}}次</span>
        </p>

        <hr>
        <!-- 内容区域 -->
        <div class="content" v-html="newsinfo.content"></div>

        <!-- 评论子组件区域 -->
        <comment-box :cmtid="this.id"></comment-box>
    </div>
    
</template>

<script>
//导入评论子组件
import Comment from '../subcomponents/Comment.vue'

//按需导入Toast
import {Toast} from 'mint-ui'

export default{
    data() {
        return {
            id:this.$route.params.id, //将url地址中传递过来的 Id值挂载到data上，方便以后调用
            newsinfo:{} //新闻对象
        }
    },
    created(){
        this.getNewsInfo()
    },
    methods: {
        getNewsInfo(){ //获取新闻详情
            this.$http.get('api/getnew/'+this.id).then(result =>{
                if(result.body.status ===0){
                    //成功了,就把数据保存到data上
                    this.newsinfo = result.body.message[0]
                }else{
                    //失败
                    Toast('获取新闻失败')
                }
                
            })
        }
    },
    components:{
        "comment-box":Comment
    }
}
</script>
<style lang="scss" scoped>
.newinfo-container{
    padding: 0 4px;
    .title{
        font-size: 16px;
        color: red;
        text-align: center;
        margin: 15px 0;
    }
    .subtitle{
        font-size: 13px;
        color: #226aff;
        display: flex;
        justify-content: space-between;
    }
    hr{
        height: 1px;
        background-color: #999;
        border: none;
    }
    .content{}
}

</style>