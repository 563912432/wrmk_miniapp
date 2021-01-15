<template>
  <div class="wrap">
    <div class="wrap-title f16 text-center">
      <strong>—&nbsp;&nbsp;&nbsp;&nbsp;{{mokao.type_title}}&nbsp;&nbsp;&nbsp;&nbsp;—</strong>
    </div>
    <div class="wrap-info f14">
      <div class="pt20 pb10 f14">第{{mokao.title}}期</div>
      <div class="pt5 pb5">开始：{{mokao.start}}</div>
      <div class="pt5 pb5">结束：{{mokao.end}}</div>
    </div>
    <!--<div class="wrap-course">-->
      <!--<div class="item" v-for="course in mokao.courses">-->
        <!--<img :src="uploadBase + course.thumb" />-->
        <!--<span>{{course.title}}</span>-->
      <!--</div>-->
    <!--</div>-->
    <div class="wrap-action f14 pt20 pb10">
      <mt-button @click="routerPush('mkIndex', {id: mokao.id})" type="primary"  size="small" style="margin-right: 20px;">点击进入</mt-button>
      <mt-button @click="routerPush('mkHistory', {type: mokao.type, 'title': mokao.type_title})" type="default"  size="small">往期回顾</mt-button>
    </div>

  </div>
</template>

<script>
  import common from '../mixins/common'
  import {mapGetters} from 'vuex'
  import {Button, Indicator, Toast} from 'mint-ui'
  export default {
    mixins: [common],
    name: 'mokao',
    props: ['mokao'],
    components: {
      Indicator,
      Toast,
      'mt-button': Button
    },
    computed: {
      ...mapGetters(['host', 'uploadBase'])
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .wrap{
    display: flex;
    margin:10px 0;
    padding: 15px;
    flex-direction: column;
    background-color: #fff;
    width: 100%;
    height: auto;
    // border-top: 1px solid #eeeff3;
  }
  .wrap-title{

  }
  .wrap-course{
    padding: 20px 0;
    display: flex;
    flex-direction: row;
  }
  .wrap-course .item{
    flex: 0 0 33.3%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .wrap-course .item img{
    /*width: 40px;*/
    /*height: 40px;*/
    /*border: 1px solid #eee;*/
    /*border-radius: 20px;*/
    /*margin-bottom: 10px;*/
    width: 90%;
    border-radius: 20px;
  }
  .wrap-info{
    text-align: center;
  }
  .wrap-action{
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
</style>
