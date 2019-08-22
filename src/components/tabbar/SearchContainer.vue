<template>
    <div class="container">
        <h1>A HONG HONG</h1>
    <div class="drop-container">
        <div class="drop"></div>
    </div>

    </div>
    
</template>

<script>

</script>
<style lang="scss" scoped>
.container{
        overflow: hidden;
        background-color: rgb(25,35,125);
        height: 600px;
        width: 100%;
        z-index: -3;
        .drop-container{
        position: absolute;
        height: 150px;
        width: 150px;
        /* background: red; */
        margin: auto;
        top: -250px;
        bottom: 0;
        left: -50px;
        right: 0;
    }

    .drop{
        position: absolute;
        width: 200px;
        height: 200px;
        border-radius: 100% 5% 100% 100%;
        background: deepskyblue;
        top:-25px;
        transform: rotate(-45deg);
        margin: 0;
        animation:drip 4s forwards;
        z-index: 2;
    }

    h1{
        color: #fff;
        position: absolute;
        font-size: 40px;
        top:-200px;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        text-align: center;
        height: 1em;
        z-index: 2;
        opacity: 0;
        animation: appear 2s 2.5s forwards;
        z-index: 3;
    }

    @keyframes appear{
        0%{
            opacity:0;
        }
        100%{
            opacity: 1;
        }
    }
    .drop-container:before,
    .drop-container:after{
        content: '';
        position: absolute;
        z-index: 1;
        width: 75%;
        height: 75%;
        border-radius: 100%;
        border: 5px solid skyblue;
        opacity: 0;
        top:55%;
        right: 30%;
        transform: translate(50%) rotateX(75deg);
        animation: dripple 2s ease-out 1s;
    }
    
        .drop-container:after{
            animation: dripple 2s ease-out 1.7s;
        }

    @keyframes drip{ /*滴下*/
        45%{
            top:0;
            border-radius: 100% 5% 100% 100%;
            transform: rotate(-45deg);
        }
        100%{
            top:0;
            transform: rotate(0deg);
            border-radius: 100%;
        }
    }

    @keyframes dripple {
        0%{
            width:150px;
            height: 150px;
        }
        25%{
            opacity: 1;
        }
        100%{
            width: 350px;
            height: 350px;
            top:10%;
            opacity: 0;
        }
    }
    }
    
</style>