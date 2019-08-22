<template>
    <div class="about">
        <div class="gf">
            <img src="../../images/gf.jpg" alt="">
            <p>阿轰</p>
        </div>
        <div class="mui-card">
				<div class="mui-card-header">项目名称：Vue小项目</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p>项目框架：Vue2.x</p>
                        <p>UI 框架：Mint-UI mui</p>
                        <p>打包工具：webpack</p>
					</div>
				</div>
		</div>
        <div class="mui-card">
				<div class="mui-card-header">作者：阿轰</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p>手机：13313000873</p>
                        <p>微信：Ahh-dd</p>
                        <p>邮箱：84725932@qq.com</p>
                        <div class="code">
                            <img src="../../images/code.png" alt="">
                        </div>
					</div>
				</div>
				<div class="mui-card-footer">
                    <img src="../../images/tel.gif" alt="">如果您对我满意，请您<a href="tel:+8613313000873">联系我</a>
                </div>
		</div>
    </div>
    
</template>

<script>

</script>
<style lang="scss" scoped>
.gf{
    text-align: center;
    margin: 20px 0;
    img{
    width: 110px;
    height: 110px;
    border-radius: 50%;
        }
    }
.mui-card-footer{
    display: flex;
    justify-content: left;
    img{
        width: 30px;
    }
}
   
.mui-card{
    box-shadow: 1px 2px 6px #ccc;
    position: relative;
    .code{
        position: absolute;
        bottom: 10px;
        right: 35px;
        img{
            width: 100px;
        }
        
    }
}
</style>