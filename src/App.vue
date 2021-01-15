<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  html, body{
    width:100%;
    height:100%;
    overflow:hidden;
    display: flex;
    color: #2c3e50;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  #app{
    width:100%;
    height:100%;
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-active {
    transform: translateX(10px);
    opacity: 0;
  }
  .f14{font-size: 14px;}
  .f16{font-size: 16px;}
  .pl5{padding-left: 5px;}
  .pr5{padding-right: 5px;}
  .pt5{padding-top: 5px;}
  .pb5{padding-bottom: 5px;}
  .pl10{padding-left: 10px;}
  .pr10{padding-right: 10px;}
  .pt10{padding-top: 10px;}
  .pb10{padding-bottom: 10px;}
  .pl20{padding-left: 20px;}
  .pr20{padding-right: 20px;}
  .pt20{padding-top: 20px;}
  .pb20{padding-bottom: 20px;}
  .mt20{margin-top: 20px;}
  .mb20{margin-bottom: 20px;}
  .text-center{text-align: center;}
  .c888{color: #888;}
  .mint-header-button{
    flex: 0 0 auto
  }
  .mint-indicator{
    z-index: 100;
  }
</style>
