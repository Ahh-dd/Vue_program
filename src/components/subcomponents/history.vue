<template>
    <div class="history">
        <h1>那年今日</h1>
        <h2>{{nowtime | dateFormat1 }}</h2>
        <hr>
        <div class="mui-card" v-for="item in list" :key="item.title">
				<div class="mui-card-header"><a :href="item.link">{{item.year}}年{{item.title}}</a></div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p>故事年份：{{item.year}}年</p>
                        <p>故事类型：{{item.type}}</p>
					</div>
				</div>
		</div>
    </div>
    
</template>

<script>
export default{
    data() {
        return {
            list:[],//存放历史
            nowtime:''
        }
    },
    created(){
        this.getHistory();
        this.getNow();
    },
    methods: {
        getHistory(){
             this.$http.jsonp('https://api.asilu.com/today/').then(result =>{
                if(result.status ===200){
                    //成功了
                    this.list = result.body.data
                    console.log(this.list);
                }
                else{
                    //失败
                    Toast('加载那年今日失败')
                }
                console.log(result); 
            })
        },
        getNow(){
            this.nowtime = new Date()
        }
    },
}
</script>
<style lang="scss" scoped>
.history{
    margin-top: 20px;
    h1{
    font-size: 30px;
    text-align: center;
    }
    h2{
    font-size: 20px;
    text-align: center;
    }
    hr{
      height: 3px;
      width: 150px;
      background-color: red;
      border: none;
    }
    .mui-card{
    box-shadow: 1px 2px 6px #ccc;
    }
}
   
</style>