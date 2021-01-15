<template>
  <div class="exam">
    <div class="head">
      <div class="left" @click="goBack">
        <i class="icon iconfont icon-fanhui1"></i>
      </div>
      <div class="title">
        <span>正在考试（{{exam_index ? exam_index+1 : 1}}/{{exam_length}}） {{curr.type_name ? curr.type_name : ''}}</span>
        <v-djs v-if="+paperTime>0" :time="+paperTime"></v-djs>
      </div>
      <div class="right" @click="doWell">
        <i class="icon iconfont icon-wancheng"></i>
        交卷
      </div>
    </div>
    <div class="prev" @click="prev">
      <i class="icon iconfont icon-fanhui1"></i>
    </div>
    <div class="next" @click="next">
      <i class="icon iconfont icon-fanhui1"></i>
    </div>
    <div class="wrapper" v-if="exam">
      <div v-if="+curr.type_cate === typeCate.danxuan">
        <danxuan :exam="curr"></danxuan>
      </div>
      <div v-else-if="+curr.type_cate === typeCate.duoxuan">
        <duoxuan :exam="curr"></duoxuan>
      </div>
      <div v-else-if="+curr.type_cate === typeCate.panduan">
        <panduan :exam="curr"></panduan>
      </div>
      <div v-else-if="+curr.type_cate === typeCate.jianda">
        <jianda :exam="curr"></jianda>
      </div>
      <div v-else-if="+curr.type_cate === typeCate.bdxxuanze">
        <bdxxuanze :exam="curr" :index="subExamInfo.index" :len="subExamInfo.len"
                   :orientation="orientation" ></bdxxuanze>
      </div>
      <div v-else-if="+curr.type_cate === typeCate.bdxjianda">
        <bdxjianda :exam="curr" :index="subExamInfo.index" :len="subExamInfo.len"
                   :orientation="orientation" ></bdxjianda>
      </div>
      <div v-else-if="+curr.type_cate === typeCate.peiwu">
        <peiwu :exam="curr"></peiwu>
      </div>
    </div>

    <div class="wrapper" v-else style="text-align: center;display: flex; align-items: center; justify-content: center;">
      <div class="empty">
        <i class="icon iconfont icon-meiyougengduo" style="font-size: 40vw; color: rgba(7,17,27,0.1)"></i>
        <small>没有找到题目</small>
      </div>
    </div>
    <div class="control-tools">
      <span @click="card"> <i class="icon iconfont icon-datiqia"></i>答题卡</span>
    </div>
    <card :exam="exam" :exam_index="exam_index"></card>
  </div>
</template>

<script type="text/ecmascript-6">
  import danxuan from '@/components/tk/danxuan'
  import duoxuan from '@/components/tk/duoxuan'
  import panduan from '@/components/tk/panduan'
  import jianda from '@/components/tk/jianda'
  import bdxxuanze from '@/components/tk/bdxxuanze'
  import bdxjianda from '@/components/tk/bdxjianda'
  import peiwu from '@/components/tk/peiwu'
  import djs from '@/components/daojishi'
  import card from '@/components/examcard'
  import common from '../mixins/common'
  import {Toast, MessageBox, Indicator} from 'mint-ui'
  import {mapState, mapGetters} from 'vuex'
  export default {
    mixins: [common],
    name: 'exam',
    components: {
      Toast,
      MessageBox,
      Indicator,
      'v-djs': djs,
      danxuan,
      duoxuan,
      panduan,
      jianda,
      bdxxuanze,
      bdxjianda,
      peiwu,
      card
    },
    data () {
      return {
        // 考试时间
        paperTime: null,
        exam: [],
        exam_length: 0,
        visible: false,
        curr: {
          type: 0
        },
        subExamInfo: {
          index: 0,
          len: 0
        },
        // 方向： 代表上一题还是下一题
        orientation: false,
      }
    },
    created () {
      // this.getExamOfPaper()
    },
    beforeRouteEnter (to, from, next) {
      next(function (vm) {
        vm.$store.commit('clearExamState')
        vm.getExamOfPaper()
      })
    },
    computed: {
      ...mapState(['typeCate']),
      ...mapGetters(['host', 'userAnswer']),
      exam_index () {
        return this.$store.state.examState.curr_index
      }
    },
    methods: {
      getExamOfPaper () {
        axios.get(this.host + 'api/mokao/paper/' + this.$route.params.paper_id).then((res) => {
          console.dir(res.data)
          if (res.data.status===1) {
            if (res.data.resultData.running !== 1) {
              this.error('考试已经结束')
              this.$router.go(-1)
            }
            this.exam = res.data.resultData.allTkInfo
            this.exam_length = res.data.resultData.allTkInfo.length
            this.paperTime = res.data.resultData.time
          }else{
            this.error(res.data.info)
          }
        })
      },
      doWell () {
        let that = this
        //交卷
        axios.post(this.host + 'api/mokao/answer/' + this.$route.params.paper_id, {
          record: this.userAnswer
        }).then((res) => {
          if(res.data.status===1){
            this.$router.replace({path: '/result/' + that.$route.params.paper_id})
          }else{
            this.error(res.data.info)
          }
        })
      },
      card () {
        this.$store.commit('setExamCard', true)
      },
      next () {
        this.orientation = false
        if ((this.exam_index + 1) === this.exam_length) {
          if (this.subExamInfo.len !== 0 && (this.subExamInfo.len - 1 === this.subExamInfo.index)) {
            Toast({
              message: '已经是最后一题',
              duration: 1500
            })
            return
          }
          if (this.subExamInfo.len === 0) {
            Toast({
              message: '已经是最后一题',
              duration: 1500
            })
            return
          }
        }
        if (this.subExamInfo.index < this.subExamInfo.len - 1) {
          this.subExamInfo.index += 1
        } else {
          this.$store.commit('setExamCurrIndex', this.exam_index + 1)
        }
      },
      prev () {
        this.orientation = true
        if (this.exam_index === 0) {
          Toast({
            message: '已经是第一题',
            duration: 1500
          })
          return
        }
        if (this.subExamInfo.index > 0) {
          this.subExamInfo.index -= 1
        } else {
          this.$store.commit('setExamCurrIndex', this.exam_index - 1)
        }
      },
      initData () {
        this.curr = this.exam[this.exam_index]
        let type_cate = this.curr.type_cate
        if (+type_cate === this.typeCate.bdxxuanze ||
          +type_cate === this.typeCate.bdxjianda ||
          +type_cate === this.typeCate.peiwu) {
          if (this.orientation) {
            this.subExamInfo.index = this.curr['title'].length - 1
          } else {
            this.subExamInfo.index = 0
          }
          this.subExamInfo.len = this.curr['title'].length
        } else {
          this.subExamInfo.index = 0
          this.subExamInfo.len = 0
        }
      }
    },
    watch: {
      exam_index () {
        this.initData()
      },
      exam () {
        this.initData()
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .exam
    position absolute
    z-index 10
    top 0
    left 0
    width 100%
    height 100%
    overflow hidden
    background-color: #FBF9FE
    display flex
    flex-direction column
    .head
      height 50px
      font-size 18px
      display flex
      flex-direction row
      align-items center
      background #35495E
      color #fff
      .left, .right
        width 50px
        height 100%
        display flex
        align-items center
        justify-content center
      .right
        font-size: 14px
      .left
        .icon
          font-size 22px
      .title
        flex 1
        text-align center
        overflow hidden
        span
          display block
          overflow hidden
          text-overflow ellipsis
          white-space nowrap
    .prev, .next
      position absolute
      z-index 10
      top 80%
      width 50px
      height 50px
      border-radius 25px
      background rgba(7, 17, 27, 0.3)
      display flex
      align-items center
      justify-content center
      .icon
        font-size 25px
        color #fff
    .prev
      left 20px
    .next
      right 20px
      transform: rotate(180deg);
    .wrapper
      flex 1
      overflow auto
      .empty
        display flex
        flex-direction column
        small
          color #999
    .control-tools
      margin-top 1px
      height 50px
      display flex
      flex-direction row
      justify-content center
      align-items center
      box-sizing border-box
      background #fff
      font-size 14px
      span
        height 100%
        flex 1
        display flex
        justify-content center
        align-items center
        .icon
          font-size 14px
          margin-right 2px
          color #0086b3
</style>
