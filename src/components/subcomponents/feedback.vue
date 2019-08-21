<template>
    <div class="feedback-container">
        <div class="mui-content">
			<div class="mui-content-padded">
				<div class="mui-inline">问题和意见</div>
				
				<!--快捷输入具体内容，开发者可自己替换常用语-->

			</div>
			<div class="row mui-input-row">
				<textarea id='question' class="mui-input-clear question" placeholder="请详细描述你的问题和意见..." v-model="msg"></textarea>
			</div>
			<p>QQ/邮箱</p>
			<div class="mui-input-row">
				<input id='contact' type="text" class="mui-input-clear contact" placeholder="(选填,方便我们联系你 )" />
			</div>
			<br />
            <mt-button type="primary" size="large" @click="submit">提交建议</mt-button>
		</div>
    </div>
</template>

<script>
import {Toast} from 'mint-ui'
export default{
    data() {
        return {
            msg:''//存放内容
        }
    },
    methods: {
        submit(){
             if(this.msg.trim().length === 0){
                Toast("小主您还没有填写建议哦    *-*")
             }else{
                Toast('感谢小主的建议，以后功能会更加完善~_~')
             }
            
        }
    },
}
</script>
<style lang="scss" scoped>
.mui-content {
    background-color: #fff;
}
</style>