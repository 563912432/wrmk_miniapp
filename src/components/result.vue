<template>
  <div class="result">
    <div id="charts"></div>
    <div class="inspire" v-if="score !== sumScore">
      <span>本次测试满分 {{sumScore}} 分，共 {{sumNum}} 题。您答对 {{rightNum}} 题（含小题数），得 {{score}} 分。</span>
      <span style="color:#C23531">继续加油，相信自己，我就是我自己的主宰！</span>
      <small style="color:#0086b3;margin-top: 15px">注：主观题未进行判分，此结果仅作参考</small>
    </div>
    <div class="inspire" v-else>
      <span>本次测试满分 {{sumScore}} 分，共 {{sumNum}} 题。答对 {{rightNum}} 题（含小题数），得 {{score}} 分。</span>
      <span style="color:#C23531">还有谁？还有谁！这都能做满分，没错，你就是天才！</span>
      <small style="color:#0086b3;margin-top: 15px">注：主观题未进行判分，此结果仅作参考</small>
    </div>
    <div class="ctrl">
      <mt-button type="primary" @click="routerPush('parse', {'paper_id': paper_id})">查看全卷解析</mt-button>
      <mt-button plain @click="goBack">返回列表</mt-button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import common from '../mixins/common'
  import {Toast, Indicator, Button} from 'mint-ui'
  import pie from 'echarts'
  import {mapGetters} from 'vuex'
  export default {
    mixins: [common],
    name: 'result',
    components: {
      Indicator,
      Toast,
      'mt-button': Button
    },
    data () {
      return {
        myChart: null,
        courseTitle: '',
        score: 0,
        sumScore: 0,
        sumNum: 0,
        rightNum: 0,
        errorNum: 0
      }
    },
    computed: {
      ...mapGetters(['host']),
      paper_id () {
        return this.$route.params.paper_id
      }
    },
    created () {

    },
    mounted () {

      this.getResult()
    },
    methods: {
      setEchart () {
        this.myChart = pie.init(document.getElementById('charts'))
        this.myChart.setOption({
          baseOption: {
            title: {
              text: this.courseTitle,
              x: 'center'
            },
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {d}%'
            },
            legend: {
              orient: 'vertical',
              left: 'left'
            },
            series: [
              {
                name: '数据',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: [
                  {value: this.rightNum / this.sumNum, name: '正确'},
                  {value: this.errorNum / this.sumNum, name: '错误'}
                ],
                itemStyle: {
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          }
        })
      },
      getResult () {
        axios.get(this.host + 'api/mokao/result/' + this.$route.params.paper_id).then((res) => {
          if (res.data.status===1) {
            let result = res.data.resultData.result
            //
            this.courseTitle = result.courseTitle
            this.score = result.score
            this.sumScore = result.sumScore
            this.sumNum = result.sumNum
            this.rightNum = result.rightNum
            this.errorNum = result.errorNum
            this.setEchart()
          }else{
            this.$router.push('/parse/' + this.$route.params.paper_id)
          }
        })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .result
    position absolute
    z-index 1
    width 100%
    height 100%
    flex 1
    display flex
    flex-direction column
    overflow hidden
    // background url("../assets/bg2.png") repeat-x
    background-size contain
    padding 50px 10px 10px 10px
    #charts
      flex 3
      height 50%
      display flex
    .inspire
      flex 1
      padding 0 20px
      text-align left
      font-size 14px
      display flex
      color #666
      flex-direction column
      align-items flex-start
      justify-content center
    .ctrl
      flex 2
      display flex
      flex-direction column
      margin-top 20px
      height 100%
      button
        margin-top 10px
</style>
