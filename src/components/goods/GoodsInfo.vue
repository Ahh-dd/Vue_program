<template>
    <div class="goodsinfo-container">

        <!-- 小球 -->
       <transition
                @before-enter="beforeEnter"
                @enter="enter"
                @after-enter="afterEnter">
            <div class="ball" v-show="ballFlag" ref="ball"></div>
        </transition>


        <!-- 商品轮播图 -->
            <swiper :lunbotuList="lunbotu" :isfull="false"></swiper>
        <!-- 商品购买区域 -->
            <div class="mui-card">
				<div class="mui-card-header">{{ goodsinfo.title }}</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p class="price">
                            市场价:<del>{{ goodsinfo.market_price }}</del>&nbsp;&nbsp;&nbsp;&nbsp;销售价:<span class="now_price">{{ goodsinfo.sell_price }}</span>
                        </p>
                        <p>购买数量：<numbox @getcount="getSelectedCount" :max="goodsinfo.stock_quantity"></numbox></p>
                        <p>
                            <mt-button type="primary" size="small">立即购买</mt-button>
                            <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
                            <!-- 分析：如何实现加入购物车的时候，拿到选择的数量 -->
                            <!-- 1.经过分析发现：按钮属于goodsinfo页面，数字属于numberbox组件 -->
                            <!-- 2.由于涉及到了父子组件传值，所以无法直接在goodsinfo页面获取选中的商品的数量值 -->
                            <!-- 3.使用子组件向父组件传值 -->
                            <!-- 4.事件调用机制的本质：父向子传递方法，子调用这个方法，同时把数据当做参数 传递给这个方法 -->
                        </p>
					</div>
				</div>
			</div>
        <!-- 商品参数区域 -->
            <div class="mui-card">
				<div class="mui-card-header">商品参数</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p>商品货号：{{ goodsinfo.goods_no}}</p>
                        <p>库存情况：{{ goodsinfo.stock_quantity}}件</p>
                        <p>上架时间：{{ goodsinfo.add_time | dateFormat }}</p>
					</div>
				</div>
				<div class="mui-card-footer">
                    <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
                    <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
                </div>
			</div>
    </div>
    
</template>

<script>
import { Toast } from 'mint-ui'
//导入轮播图组件
import swiper from '../subcomponents/swiper.vue'
//导入数组选择框组件
import numbox from '../subcomponents/goodsinfo_numbox.vue'

export default {
    data() {
        return {
            id: this.$route.params.id, // 将路由参数对象中的 id 挂载到 data , 方便后期调用
            lunbotu: [], //轮播图的数据
            goodsinfo: {}, //获取到的商品的信息
            ballFlag: false, //控制小球隐藏和显示的标识符
            selectedCount:1 //保存用户选中的商品数量，默认为1
        }
    },
    created() {
        this.getLunbotu();
        this.getGoodsInfo();
    },
    methods: {
        getLunbotu() {
            this.$http.get("api/getthumimages/" + this.id).then(result => {
                if (result.body.status === 0) {
                    // 先循环轮播图数组的每一项，为 item 添加 img 属性，因为 轮播图 组件中，只认识 item.img， 不认识 item.src
                    result.body.message.forEach(item => {
                        item.img = item.src;
                    });
                    this.lunbotu = result.body.message;
                } else {
                    //失败
                    Toast('加载轮播图失败')
                }

            })
        },
        getGoodsInfo(){
            this.$http.get("api/goods/getinfo/" + this.id).then(result => {
                if (result.body.status === 0) {
                    this.goodsinfo = result.body.message[0];
                } else {
                    //失败
                    Toast('加载商品参数失败')
                }
            })
        },
        goDesc(id){
            //点击使用编程式导航跳转到图文介绍页面
            this.$router.push({name:"goodsdesc",params:{id}});
        },
        goComment(id){
            //点击使用编程式导航跳转到商品评论页面
            this.$router.push({name:"goodscomment",params:{id}});
        },
        beforeEnter(el){
            el.style.transform = "translate(0, 0)";
        },
        enter(el,done){
            el.offsetWidth;

            //小球动画优化思路
            //1.先分析导致动画不准确的本质原因，我们把小球的最终位移到的位置局限在了每一分辨率下的滚动条未滚动的情况下;
            //2.只要分辨率和测试的时候不一样，或者，混动条有一定的滚动距离之后，问题就出现了
            //3.因此，不能把位置写死了，应该根据不同情况动态计算
            //4.经过分析，得出阶梯思路，先得到 徽标的横纵坐标，再得到小球的横纵坐标，然后让y值求差，x值求差，得到的结果就是横纵坐标要位移的距离
            //5.如何获取徽标和小球的位置  domObject.getBoundingClientRect()
            //getBoundingClientRect用于获取某个元素相对于视窗的位置集合。集合中有top, right, bottom, left等属性。
            // 　rectObject.top：元素上边到视窗上边的距离;
            // 　rectObject.right：元素右边到视窗左边的距离;
            // 　rectObject.bottom：元素下边到视窗上边的距离;
            // 　rectObject.left：元素左边到视窗左边的距离;

            // 获取小球的 在页面中的位置
            const ballPosition = this.$refs.ball.getBoundingClientRect();
            // 获取 徽标 在页面中的位置
            const badgePosition = document
            .getElementById("badge")
            .getBoundingClientRect();

            const xDist = badgePosition.left - ballPosition.left;
            const yDist = badgePosition.top - ballPosition.top;

        el.style.transform = `translate(${xDist}px, ${yDist}px)`;
        el.style.transition = "all 0.5s cubic-bezier(.4,-0.3,1,.68)";
        done();
        },
        afterEnter(el){
             el.style.opacity = 1;
             this.ballFlag = !this.ballFlag;
        },
        addToShopCar(){
            //添加到购物车
            this.ballFlag = !this.ballFlag
             //{id:商品的id, count:商品的数量, price:商品单价,selected:false}
             //拼接出一个要保存到 store 中car数组里的商品信息对象
             var goodsinfo = 
             {id:this.id,
             count:this.selectedCount,
             price:this.goodsinfo.sell_price,
             selected:true 
             }

            //调用store中的mutations来将商品加入购物车
            this.$store.commit('addToCar',goodsinfo)
        },
        getSelectedCount(count){
            //当子组件 把选中的数量传递给父组件的时候，把选中的值保存到data上
            this.selectedCount=count;
            console.log('父组件拿到的值'+this.selectedCount);
            
        },
    },
    components: {
        swiper,
        numbox
    }
}
</script>
<style lang="scss"scoped>.goodsinfo-container {
    background-color: #eee;
    overflow: hidden;

    .now_price {
        color: red;
        font-size: 16px;
        font-weight: bold;
    }

    .mui-card-footer {
        display: block;

        button {
            margin: 15px 0;
        }
    }
    .ball{
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background-color: red;
        position: absolute;
        z-index: 99;
        left: 148px;
        top: 348px;
    }
}



</style>