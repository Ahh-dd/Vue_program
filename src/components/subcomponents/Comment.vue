<template>
    <div class="cmt-container">
        <h3>发表评论</h3>
        <hr>
        <textarea placeholder="请输入要吐槽的内容（最多吐槽120字）" maxlength="120" v-model="msg"></textarea>
        <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>

        <div class="cmt-list">
            <div class="cmt-item" v-for="(item, i) in comments" :key="i">
                <div class="cmt-title">
                    第{{ i+1 }}楼&nbsp;用户：{{ item.user_name }}&nbsp;发表时间：{{ item.add_time | dateFormat }}
                </div>
                <div class="cmt-body">
                    {{ item.content ==='undefined'||item.content ===''?'此用户很懒，啥都没说':item.content }}
                </div>
            </div>
        </div>

        <mt-button type="danger" size="large" plain @click="loadMore">加载更多</mt-button>
    </div>
    
</template>

<script>
import {Toast} from 'mint-ui'

export default{
    data() {
        return {
            pageIndex:1,//默认展示第一页数据
            comments:[],  //所有的评论数组
            msg:''//评论输入的内容
        }
    },
    created(){
        this.getComments()
    },
    methods: {
        getComments(){ //获取评论
            this.$http.get("api/getcomments/"+this.cmtid+"?pageindex="+this.pageIndex)
            .then(result => {
                if(result.body.status === 0){
                    //成功了,就把数据保存到data上
                    //this.comments = result.body.message
                    //每当获取新评论数据的时候，不要把老数据清空，而是应该以老数据拼接上新数据
                    this.comments = this.comments.concat(result.body.message)
                }else{
                    //失败
                    Toast('获取评论失败')
                }
                
            })
        },
        loadMore(){
            // 点击按钮，加载更多的评论
            // 当触发这个加载更多方法的时候，应该让 page 页码 + 1 之后，再调用 getCommentByPage 方法
            this.pageIndex++;
            this.getComments();
        },
        postComment(){ 
            if(this.msg.trim().length === 0){
                return Toast("评论内容不能为空")
            }
            //发表评论
            //参数1：提交的url地址
            //参数2：提交给服务器的数据对象{content:this.msg}
            //参数3：定义提交时候，表单中数据的格式{}
            this.$http.post('api/postcomment/'+ this.cmtid,{ content:this.msg.trim() })
            .then(result => {
               if(result.body.status ===0){
                    //1.拼接处一个评论对象
                   var cmt = { 
                       user_name:'匿名用户',
                       add_time:Date.now(),
                       content:this.msg.trim() 
                       }
                       this.comments.unshift(cmt) 
                       this.msg=''
                }else{
                    //失败
                    Toast('由于服务器网络原因评论失败')
                } 
            })
        }
    },
    props:["cmtid"]//接收父组件传过来的ID
}


</script>
<style lang="scss" scoped>
.cmt-container{
    h3{
        font-size: 18px;
    }
    textarea{
        font-size: 14px;
        height: 85px;
        margin: 0;
    }
    .cmt-list{
        margin: 5px 0;
        .cmt-item{
            font-size: 13px;
            .cmt-title{
                line-height: 30px;
                background-color: #ccc;
            }
            .cmt-body{
                line-height: 35px;
                text-indent: 2em;
            }
        }
    }
    .mint-button--danger.is-plain{
        margin-bottom: 20px;
    }
}
</style>