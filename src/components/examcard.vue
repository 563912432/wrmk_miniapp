<template>
  <div class="card">
    <mt-popup v-model="isShow" position="right">
      <div class="head">
        <div class="left" @click="setVisible">
          <i class="icon iconfont icon-guanbi1"></i>
        </div>
        <div class="title">答题卡</div>
        <div class="right"></div>
      </div>
      <div class="list">
        <div class="list-item" v-for="(item, key, index) in allExam">
          <div class="exam-type">{{item[0].type_name ? item[0].type_name : '未知题型'}}</div>
          <div class="exam-list">
            <template v-for="(exam, i) in item">
              <span @click="goExam(exam.index)" :class="exam.done ? 'done' : ''">{{i+1}}</span>
            </template>
          </div>
        </div>
      </div>
    </mt-popup>
  </div>
</template>

<script type="text/ecmascript-6">
  import {Toast, Popup} from 'mint-ui'
  export default {
    name: 'card',
    components: {
      'mt-popup': Popup
    },
    props: {
      exam: {
        type: Array
      },
      exam_index: {
        type: Number
      }
    },
    data () {
      return {
        done: [],
        allExam: []
      }
    },
    computed: {
      isShow: {
        get: function () {
          return this.$store.state.examState.examCard
        },
        set: function (newValue) {
          this.$store.state.examState.examCard = newValue
        }
      }
    },
    created () {
      if (this.allExam.length < 1) {
        this.setExam()
      }
    },
    methods: {
      warning (info) {
        let instance = null
        instance = Toast({
          message: info,
          iconClass: 'mint-toast-icon mintui mintui-field-warning',
          duration: 1500
        })
        setTimeout(function () {
          instance.close()
        }, 1500)
      },
      setExam () {
        let tmp = {}
        for (let i in this.exam) {
          if (typeof this.exam[i] === 'object') {
            this.exam[i]['index'] = +i
            if (this.done.length > 0 && this.done.indexOf(this.exam[i].number) > -1) {
              this.exam[i].done = 1
            } else {
              this.exam[i].done = 0
            }
            if (tmp[this.exam[i].type]) {
              tmp[this.exam[i].type].push(this.exam[i])
            } else {
              tmp[this.exam[i].type] = []
              tmp[this.exam[i].type].push(this.exam[i])
            }
          }
        }
        this.allExam = tmp
      },
      setVisible () {
        this.$store.commit('setExamCard', false)
      },
      goExam (n) {
        this.$store.commit('setExamCard', false)
        this.$store.commit('setExamCurrIndex', n)
      }
    },
    watch: {
      isShow (value) {
        this.done = []
        let userAnswer = this.$store.getters.userAnswer
        if (value === true && userAnswer && userAnswer.length > 0) {
          userAnswer.forEach(v => {
            this.done.push(v.id)
          })
          this.setExam()
        }
      },
      exam () {
        this.setExam()
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .mint-popup
    width 100%
    height 100%
    flex 1
    display flex
    flex-direction column
    .head
      height 50px
      font-size 18px
      display flex
      flex-direction row
      align-items center
      border-bottom 1px solid #ddd
      background #35495E
      color #fff
      .left, .right
        width 50px
        height 100%
        display flex
        align-items center
        justify-content center
        .icon
          font-size 22px
      .title
        flex 1
        text-align center
    .list
      flex 1
      overflow auto
      .list-item
        padding 10px
        .exam-type
          padding 0 0 10px
          font-size 16px
        .exam-list
          flex 1
          display flex
          flex-flow row wrap
          justify-content flex-start
          span
            width 28px
            height 28px
            font-size 12px
            border-radius 3px
            border 1px solid #ddd
            margin 2px
            display flex
            justify-content center
            align-items center
          .done
            background #66ccff
            color #fff
          .disable
            background #aaa
            color #fff
</style>
