<template>
  <div class="tp-material">
    <div class="material">
      <mt-badge size="small">材料</mt-badge>
      <span v-html="exam.material"></span>
    </div>
    <div class="title">
      <mt-badge size="small">题目{{index+1}}</mt-badge>
      <span v-html="exam.title[index]"></span>
    </div>
    <div class="content">
      <span>主观题请在电脑端答题</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {Badge, Toast} from 'mint-ui'
  export default {
    name: 'material',
    components: {
      Badge,
      Toast
    },
    props: {
      exam: {
        type: Object,
        require: true
      },
      index: {
        type: Number,
        require: true
      },
      len: {
        type: Number,
        require: true
      },
      orientation: {
        type: Boolean,
        require: true
      }
    },
    watch: {
      exam () {
        if (this.orientation) {
          this.index = this.exam['title'].length - 1
        } else {
          this.index = 0
        }
        this.len = this.exam['title'].length
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
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
  .tp-material
    flex: 1
    padding 5px
    font-size 14px
    padding-bottom 55px
    .mint-checklist-label
      display flex
      flex-direction row
      align-items center
      line-height 20px
      padding 10px 0
      font-size 14px
    .title, .choice
      padding 5px
</style>
