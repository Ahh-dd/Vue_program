<template>
<!-- 不知道什么时候能拿到max值，但是总会得到一个真正的max值 -->
<!-- 可以使用watch属性监听，来监听父组件传递归来的max值，不管watch会被触发几次，但是最后一次肯定是一个合法的num数值 -->
    <div class="mui-numbox" data-numbox-min='1'>
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" value="1" @change="countChanged" ref="numbox"/>
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
    <!-- 子组件什么时候把数据传递给父组件 -->
    <!--  -->
</template>

<script>
import mui from "../../lib/mui/js/mui.min.js";

export default {
     mounted() {
    // 初始化数字选择框组件
    mui(".mui-numbox").numbox();
    console.log(this.max);
  },
  methods: {
      countChanged(){
          //每当文本框中的数据发生变化，立即把最新的数据库通过事件调用 传递给父组件
        //   console.log(this.$refs.numbox.value);
          this.$emit("getcount",parseInt(this.$refs.numbox.value));
          
      }
  },
  props:["max"], //接收goodsinfo中的接口中的库存
  watch:{  //属性监听
      'max':function (newVal,oldVal) {
        mui(".mui-numbox")
         .numbox()
         .setOption("max", newVal);
         //更新选项：可选值：min(Int),step(Int),max(Int)
      }
  }
}
</script>

<style lang="scss" scoped>
    .mui-numbox{
        width: 120px;
        height: 30px;
    }
</style>