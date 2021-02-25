<template>
  <div class="wrap">
    <div class="wrap-backbtn"><span @click="goBack" class="mint-button-icon"><i class="mintui mintui-back"></i></span></div>
    <iframe :src="liveroom"></iframe>
  </div>
</template>

<script>
  import {Header, Button, Indicator, Toast} from 'mint-ui'
  import common from '../mixins/common'
  export default {
    mixins: [common],
    name: 'liveroom',
    components: {
      Indicator,
      Toast,
      'mt-header': Header,
      'mt-button': Button
    },
    data () {
      return {

      }
    },
    computed: {
      liveroom () {
        return this.$route.params.liveroom
      }
    },
    mounted () {
      this.loadingOpen()
      let that = this
      setTimeout(function(){
        that.loadingClose()
      }, 1000)
    },
    destoryed () {
      this.loadingClose()
    },
    methods: {

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .wrap{
    width: 100%;
    height: 100%;
  }
  .wrap iframe{
    width: 100%;
    height: 100%;
  }
  .wrap-backbtn{
    position: fixed;
    left: 10px;
    top:10px;
    color:#fff;
    width: 30px;
    height: 30px;
    border: 1px solid #ddd;
    border-radius: 15px;
    background: rgba(7,17,27,.6);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .wrap iframe{
    width: 100%;
    height: 100%;
    border: none;
  }
</style>
