<template>
    <div class="app-container">

        <!-- 顶部Header区域-->
        <mt-header fixed title="阿轰的Vue小程序"></mt-header>

        <!-- 中间的路由router-view区域-->
       <transition>
         <router-view></router-view>
       </transition>
       

        <!-- 底部Tabbar区域-->
		<nav class="mui-bar mui-bar-tab">
			<router-link class="my-tab-item" to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="my-tab-item" to="/member">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="my-tab-item" to="/shopcar">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge">0</span></span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="my-tab-item" to="/search">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>

    </div>
    
</template>

<script>

</script>
<style lang="scss" scoped>
    .app-container{
        padding-top:40px;//避免导航栏遮挡
        padding-bottom: 50px;//避免tabbar遮挡内容
        overflow-x: hidden; // 当有组件切换动效的时候，一瞬间，页面的宽度会变成 正常宽度的 2 倍，此时，需要隐藏超出屏幕宽度的区域
        
    }
    .v-enter {
        opacity: 0;
        transform: translateX(100%); // 让即将进入的页面，向右偏移 100% 屏幕的宽度
    }

    .v-leave-to {
        opacity: 0;
        transform: translateX(-100%); 
        position: absolute;
    }
    .v-enter-active,
    .v-leave-active {
        transition: all 0.5s ease;
    }
    

    //改类名，让样式重新生效
    .mui-bar-tab .my-tab-item {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
    }

    .mui-bar-tab .my-tab-item .mui-icon {
    top: 3px;
    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
    }

    .mui-bar-tab .my-tab-item .mui-icon ~ .mui-tab-label {
    font-size: 11px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    }
    .mint-header {
    z-index: 2;
}
</style>