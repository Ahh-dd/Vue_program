<template>
    <div class="goodsdesc-container">
        <h3>{{ info.title }}</h3>
        
        <hr>

        <div class="content" v-html="info.content"></div>
    </div>
    
</template>

<script>
export default{
    data() {
        return {
            id: this.$route.params.id, // 将路由参数对象中的 id 挂载到 data , 方便后期调用
            info:{}//图文数据
        }
    },
    created(){
        this.getGoodsDesc();
    },
    methods: {
        getGoodsDesc(){
            this.$http.get("api/goods/getdesc/" + this.id).then(result => {
                if (result.body.status === 0) {
                    this.info = result.body.message[0];
                } else {
                    //失败
                    Toast('加载商品详情失败')
                }
            })
        }
    },
}
</script>
<style lang="scss">
.goodsdesc-container{
    padding: 4px;
    h3{
        font-size: 16px;
        color: #226aff;
        text-align: center;
        margin: 15px 0;
    }
    img{
        width: 100%;
        margin: 0;
    }
}
</style>