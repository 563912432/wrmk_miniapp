<template>
  <div class="wrap">
    <!--头-->
    <vheader :title="headerTitle"></vheader>
    <div class="top-header">
      <!--<div class="f14 c888">开始: 2018-10-10 10:10:10</div>-->
      <!--<div class="f14 c888">结束: 2018-10-10 10:10:10</div>-->
      <strong>模考{{mokaoStatus}}</strong>
    </div>
    <!--科目-->
    <div class="body">
      <v-course style="border-bottom:1px solid #f1f1f1;" v-for="(paper,index) in mokao.paper" :paper="paper" :key="index" :liveroom="liveroom" :running="mokao.running"></v-course>
    </div>
  </div>

</template>

<script>
  import common from '../mixins/common'
  import vheader from './vheader'
  import {Badge, Button, Indicator, Toast} from 'mint-ui'
  import course from './course'
  import {mapGetters} from 'vuex'
  export default {
    mixins: [common],
    name: 'mkIndex',
    components: {
      Indicator,
      Toast,
      'vheader': vheader,
      'mt-button': Button,
      'v-course': course,
      'mt-badge': Badge
    },
    data () {
      return {
        mokao: {
          type_title: '',
          title: '',
          liveroom: '',
          running: -1,
          paper: [
            /*{
            course_id: "21",
            course_thumb: "20171127/5aab6365360ff.png",
            course_title: "初级会计实务",
            done: 1,
            id: 30
          }*/
          ]
        }
      }
    },
    computed: {
      ...mapGetters(['host']),
      headerTitle () {
        return (this.mokao ? (this.mokao.type_title + ' 第' + this.mokao.title + '期') : '')
      },
      liveroom () {
        if (this.mokao.liveroom) {
          let arr = this.mokao.liveroom.split(',')
          let index = ((this.$store.state.userInfo.source && this.$store.state.userInfo.source <= arr.length) ? (this.$store.state.userInfo.source-1) : 0)
          return arr[index]
        }
        return ''
      },
      mokaoStatus () {
        switch (this.mokao.running) {
          case -1:
            return '未开始'
          case 1:
            return '进行中'
          case 0:
            return '已结束'
          default:
            return ''
        }
      }
    },
    created () {
      this.getMk()
    },
    methods: {
      getMk () {
        axios.get(this.host + 'api/mokao/info/' + this.$route.params.id).then((res) => {
          // console.dir(res.data)
          if(res.data.status===1){
            this.mokao = res.data.resultData
          }else{
            this.error(res.data.info)
          }
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .wrap{
    width: 100%;
    height: 100%;
    // background-color: #f1f1f1;
    display: flex;
    flex-direction: column;
  }
  .body{
    flex: 1 1 0;
    overflow: auto;
    flex-direction: column;
    width: 100%;
  }
  .top-header{
    flex: 0 1 30px;
    text-align: center;
    padding: 0 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #f1f1f1;
    color: #888;
    font-size: 15px;
  }
</style>
