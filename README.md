# 这是一个我的Vue项目

## 用心去感受每一行代码中的诗情雅意

## 我们是有灵魂的程序员

####  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  ——bug设计师


## 制作首页App组件
1. 完成Header区域，使用的是Mint-UI的Header组件 
2. 完成底部的Tabbar区域，使用的是MUI的Tabbar.html
 + 在之多 购物车小图标时，操作会相应对一些：
 + 先把 扩展图标的css样式拷贝到项目中
 + 拷贝扩展字体库ttf文件到项目中
 + 为购物车小图标添加样式
3. 要在中间区域放置一个router-view来展示路由匹配到的组件


## 改造tabbar为 router-link

## 设置路由高亮

## 点击 tabbar 中的路由连接，展示对应的路由组件

## 制作首页轮播图布局

## 加载首页轮播图数据
1. 获取数据，使用vue-resource
2. 使用vue-resource的this.$http.get 获取数据
3. 获取到的数据要保存到data身上
4. 使用v-for循环渲染每一个item项

## 改造 九宫格 区域的样式

## 改造 新闻资讯 路由链接

## 新闻资讯 页面 制作 
1. 绘制界面，使用MUI中的media-list.html
2. 使用 vue-resource 获取数据
3. 渲染真实数据

## 实现 新闻资讯列表 点击跳转到新闻详情
1. 把列表中的每一项改造为 router-link ，同时，在跳转的时候应该提供唯一的ID标识符
2. 创建新闻详情的组件页面 NewsInfo.vue
3. 在路由模块中，将新闻详情的路由地址 和 组件页面对应起来

## 实现 新闻详情 的页面布局 和数据渲染

## 单独封装一个 comment.vue 评论子组件
1. 先创建一个单独的 comment.vue组件模板
2 .在需要使用comment组件的 页面中，先手动导入 comment 组件
 + `import comment from './comment.vue'`
3. 在父组件中，使用`components`属性，将刚才导入的comment组件，注册为自己的子组件
4. 将注册子组件的时候，注册名称，以标签形式，在页面中引用即可

## 获取所有的评论数据显示到页面中

## 实现点击加载更多评论的功能
1. 为加载更多的按钮，绑定点击事件，在事件中，请求下一页数据
2. 点击加载更多，让pageIndex++，然后重新调用this.getComments()方法重新获取最新一页的数据
3. 为了防止新数据覆盖老数据的情况，我们在点击加载更多的时候，每次获取到新数据，应该让老数据调用数组的 concat 方法拼接上新数据

## 发表评论
1. 把文本框做双向数据绑定
2. 为发表按钮绑定一个事件
3. 校验评论内容是否为空，如果为空则toast提示用户评论内容不能为空
4. 通过 vue-resource 发送一个请求，把评论内容提交给服务器
5. 当发表评论OK后，重新刷新列表，以查看最新的评论
 + 如果调用getComments方法重新刷新评论列表的话，可能只能得到最后一页的评论，前几页的评论获取不到
 + 换一种思路：当评论成功后，在客户端，手动拼接出一个最新的评论对象，然后调用数组的unshift方法，把最新的评论追加到data中comments的开头，这样，就能完美实现刷新评论列表的需求

## 改造图片分享 按钮为 路由的链接并显示对应的组件页面

## 绘制图片列表组件页面结构并美化样式
 1. 制作顶部的滑动条
 2. 制作底部图片列表
 ### 制作顶部滑动条的坑们：
 1. 需要借助于MUI中的tab-top-webview-main.html
 2. 需要把slider区域的mui-fullscreen类去掉
 3. 滑动条无法正常触发滑动，通过检查官方文档发现这是一个JS组件，需要初始化一下
  + 导入 mui.js
  + 调用官方提示的方式去初始化
  ```
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });

  ```
4. 初始化滑动条时导入了mui.js，但是报错`ncaught TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them`
 + 经过思考，觉得可能是mui.js中用到了这三个东西，但是webpack打包好的bundel.js中，默认是启动严格模式的，所以，两者冲突。
 + 解决方案：1. 把mui.js中的非严格模式的代码改掉，但是不现实; 2. 把webpack打包时候把严格模式禁用掉
 + 最终，我们选择了plan B 移除严格模式：使用这个插件 `babel-plugin-transform-remove-strict-mode`

5. 刚进入图片分享页面的时候，滑动条无法正常工作，经过分析，发现，如果初始化滑动条，必须要等DOM元素加载完毕，所以，我们把初始化 滑动条的代码，搬到了mounted声明周期函数中；

6. 当滑动条 调试OK后，发现tabbar无法正常工作了，此时，我们需要把每个tabbar按钮的样式中，`mui-tab-item`重新改一下名字；

7. 获取所有分类，并渲染分类列表，

### 制作图片列表区域
1. 图片列表需要使用懒加载技术，我们可以使用 Mint-UI 提供的现成的组件`lazy-load`
2. 根据`lazy-load`的使用文档，尝试使用
3. 渲染图片列表数据

### 实现了 图片列表的懒加载改造和样式美化

## 实现 点击图片跳转到图片详情页面
1. 在改造 li 改造成 router-link 需要使用tag 属性指定要渲染为那种元素

## 实现详情页面的布局美化，同时获取数据渲染页面

## 实现图片详情中缩略图的功能
1. 使用插件 vue-preview 这个缩略图插件
2. 获取到所有的图片列表，然后使用v-for指令渲染数据
3. 注意：image标签上的class属性不能去掉
4. 注意：每个图片数据对象中，必须有w和h属性

## 绘制 商品列表 页面基本结构并美化

## 尝试在手机上 去进行项目的预览和测试
1. 要保证手机正常运行
2. 要保证手机 和 开发项目的电脑 处于同一个wifi环境下
3. 打开自己的项目中package.json文件，在dev脚本中，添加一个 --host指令，把当前电脑的IP地址，设置为 --host的指令值
 + 在cmd终端使用`ipconfig`查看自己的IP