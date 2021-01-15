<template>
  <div class="wrap">
    <vheader :title="headerTitle"></vheader>
    <!--图片-->
    <div class="top-pic">
      <img src="../assets/rank1.png" >
    </div>
    <div class="top-pic">
      <img src="../assets/rank2.png" >
      <div class="title"><mt-badge>{{courseTitle}}</mt-badge><div class="f14 pt10" style="color:#E6A23C;">主观题不参与评分</div></div>
    </div>
    <div class="table-header">
      <table class="body-table mt5"><tr><td>排名</td><td>昵称</td><td>总分</td></tr></table>
    </div>
    <!--<div class="top-title">-->
      <!--<div class="top-pic-title">{{courseTitle}}</div>-->
    <!--</div>-->
    <div class="body">
      <table class="body-table pb10 color-change">
        <tr v-for="(row,index) in rank">
          <td :class="row.tel==userInfo.tel?'col-yellow':''">{{index + 1}}</td>
          <td :class="row.tel==userInfo.tel?'col-yellow':''">{{row.tel_new}}</td>
          <td :class="row.tel==userInfo.tel?'col-yellow':''">{{row.score}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
  import {Badge, Header, Button, Indicator, Toast} from 'mint-ui'
  import vheader from './vheader'
  import common from '../mixins/common'
  import {mapGetters} from 'vuex'
  export default {
    mixins: [common],
    name: 'rank',
    components: {
      Indicator,
      Toast,
      'mt-header': Header,
      'mt-button': Button,
      'mt-badge': Badge,
      'vheader': vheader
    },
    data () {
      return {
        rank: [],
        paperSumary: []
      }
    },
    computed: {
      ...mapGetters(['host']),
      paper_id () {
        return this.$route.params.paper_id
      },
      headerTitle () {
        return (this.paperSumary ? (this.paperSumary.type_title + ' 第' + this.paperSumary.mokao_title + '期') : '')
      },
      courseTitle () {
        return (this.paperSumary ? (this.paperSumary.course_title) : '')
      }
    },
    created () {
      this.getPaperSumary()
      this.getRank()
    },
    methods: {
      getRank () {
        axios.get(this.host + 'api/mokao/rank/' + this.$route.params.paper_id).then((res) => {
          if(res.data.status===1){
            this.rank = res.data.resultData
          }else{
            this.error(res.data.info)
          }
        })
      },
      getPaperSumary () {
        axios.get(this.host + 'api/mokao/paperinfo/' + this.$route.params.paper_id).then((res) => {
          if(res.data.status===1){
            this.paperSumary = res.data.resultData
            //console.log(res.data.resultData)
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
    background-color: #231f56;/*#f1f1f1;*/
    display: flex;
    flex-direction: column;
  }
  .top-pic{
    display: flex;
    flex-direction: column;
    flex: 0 1 auto;
    position: relative;
  }
  .top-pic img{
    flex: 1 1 auto
  }
  .top-pic .title{
    position: absolute;
    width: 100%;
    height: 55px;
    text-align: center;
    left: 0;
    top:2px;
    color: #fff;
  }
  .top-title{
    background: url("../assets/rank2.png") no-repeat center center fixed;
    background-size: 100%;
  }
  .top-pic-title{
    background: transparent;
    padding:15px 0;
    text-align: center;
    color: #fff;
  }
  .table-header{
    color: #fff;

  }
  .body{
    flex: 1 1 0;
    overflow: auto;
    color: #fff;
  }
  .body-table{
    width: 100%;
    text-align: center;
  }
  .body-table td{
    padding:10px 0;
    width: 33%;
  }
  table.color-change tr:nth-child(odd){
    background-color: rgb(37, 42, 103);
  }
  table.color-change tr:nth-child(even){

  }
  .col-yellow{
    color: #E6A23C!important;
  }
</style>
