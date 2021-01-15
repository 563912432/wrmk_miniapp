<template>
  <div class="bianxi">
    <div class="title">
      <mt-badge size="small">题目</mt-badge>
      <span v-html="exam.title"></span>
    </div>
    <div class="content">
      <span>主观题请在电脑端答题</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {Badge, Radio, Toast} from 'mint-ui'
  export default {
    name: 'jianda',
    components: {
      Badge,
      Radio,
      Toast
    },
    props: {
      exam: {
        type: Object,
        require: true
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .content{
    position fixed;
    bottom:50px;
    width:100%;
    height 35px;
    text-align center;
    font-size:16px;
    color:#888;
    background-color:#fbf9fe;
  }
  .bianxi
    display flex
    flex-direction column
    padding-bottom 55px
    .mint-radiolist-label
      display flex
      flex-direction row
      align-items center
      font-size 14px
      line-height 20px
      padding 10px 0
    .title, .choice
      font-size 14px
      padding 10px 5px 5px
</style>
