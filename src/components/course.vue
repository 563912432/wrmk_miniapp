<template>
  <div class="wrap">
    <!--左侧课程图像-->
    <div class="wrap-pic">
      <img :src="uploadBase + paper.course_thumb" />
    </div>
    <div class="wrap-info f14">
      <div class="wrap-info-title pl20"><strong>{{paper.course_title}}</strong> <mt-badge size="small" :type="paperIsDone?'success':'error'">{{paperIsDone?'已完成':'未完成'}}</mt-badge></div>
      <div class="wrap-info-btns pl5">
        <mt-button @click="routerPush('parse', {'paper_id': paper.id})" v-if="paper.done==1 || running!=1" size="small">文字解析</mt-button>
        <mt-button @click="routerReplace('exam', {'paper_id': paper.id})" v-if="paper.done==0 && running==1" type="primary" size="small">开始考试</mt-button>
<!--        <mt-button @click="goLive" type="default" size="small">视频解析</mt-button>-->
        <mt-button @click="rank" type="default" size="small">查看排名</mt-button>
      </div>
    </div>
    <!--右侧课程名称图像-->
  </div>
</template>

<script>
  import common from '../mixins/common'
  import {mapGetters} from 'vuex'
  import {Badge, Button, Indicator, Toast} from 'mint-ui'
  export default {
    mixins: [common],
    name: 'course',
    props: ['paper', 'liveroom', 'running'],
    components: {
      Indicator,
      Toast,
      'mt-button': Button,
      'mt-badge': Badge
    },
    created () {

    },
    data () {
      return {

      }
    },
    computed: {
      liveroomencode () {
        return encodeURI(this.liveroom)
      },
      paperIsDone () {
        switch (this.paper.done) {
          case 1:
            return true
          default:
            return false
        }
      },
      ...mapGetters(['host', 'uploadBase'])
    },
    methods: {
      goLive () {
        location.href = this.liveroom
      },
      rank () {
        if (this.running==1) {
          this.error('考试尚未结束，请在考试结束后查看')
        } else {
          this.$router.push({name: 'rank', params: {'paper_id': this.paper.id}})
        }
      },
      parse () {
        if (this.running==1) {
          this.error('考试尚未结束，请在考试结束后查看')
        } else if(this.running==-1){
          this.error('考试尚未开始，请在考试结束后查看')
        } else {
          this.$router.push({name: 'parse', params: {'paper_id': this.paper.id}})
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .wrap{
    display: flex;
    margin:10px 0;
    padding: 15px 10px;
    flex-direction: row;
    background-color: #fff;
    width: 100%;
    height: auto;
    // border-top: 1px solid #eeeff3;
  }
  .wrap-pic{width: 25%;}
  .wrap-pic img{width:100%; border-radius: 5px;}
  .wrap-info{
    width:73%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  .wrap-info-title{}
  .wrap-info-btns{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
</style>
