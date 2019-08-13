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