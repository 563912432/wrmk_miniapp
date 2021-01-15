<template>
  <div class="single">
    <div class="title">
      <mt-badge size="small">题目{{index+1}}</mt-badge>
      <span v-html="exam.title[index]"></span>
    </div>
    <div class="choice">
      <mt-radio title="请选择" v-model="value" :options='options'></mt-radio>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {Badge, Radio, Toast} from 'mint-ui'
  import {mapGetters} from 'vuex'
  export default {
    name: 'peiwu',
    components: {
      'mt-badge': Badge,
      'mt-radio': Radio,
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
    computed: {
      options () {
        let az = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
        let opt = []
        for (let i = 0; i < this.exam.option.length; i++) {
          opt.push({
            label: this.exam.option[i],
            value: az[i]
          })
        }
        return opt
      }
    },
    created () {
      this.recoveryAnswer()
    },
    data () {
      return {
        value: ''
      }
    },
    methods: {
      // 还原答案
      recoveryAnswer () {
        let data = this.$store.state.examState.userAnswer
        let bool = false
        for (let i = 0; i < data.length; i++) {
          if (data[i].id === this.exam.number) {
            for (let j = 0; j < data[i].val.length; j++) {
              if (+data[i].val[j]['key'] === this.index) {
                this.value = data[i].val[j].subval
                bool = true
              }
            }
          }
        }
        if (bool === false) {
          this.value = ''
        }
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
      },
      value (newValue) {
        if (newValue) {
          let data = this.$store.state.examState.userAnswer
          let change = false
          let hasExam = false
          let answerObj = ''
          for (let i = 0; i < data.length; i++) {
            if (data[i].id === this.exam.number) {
              hasExam = i
              for (let j = 0; j < data[i].val.length; j++) {
                if (+data[i].val[j]['key'] === this.index) {
                  data[i].val[this.index]['subval'] = newValue
                  change = true
                  break
                }
              }
              answerObj = data[hasExam]
            }
            break
          }
          if (change === false) {
            if (hasExam !== false) {
              data[hasExam].val.push({
                key: this.index,
                subval: newValue
              })
              answerObj = data[hasExam]
            } else {
              answerObj = {
                id: this.exam.number,
                val: [
                  {key: this.index, subval: newValue}
                ]
              }
              data.push({
                id: this.exam.number,
                val: [
                  {key: this.index, subval: newValue}
                ]
              })
            }
          }
          this.$store.commit('setAnswer', data)
        }
      },
      index () {
        this.recoveryAnswer()
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .single
    display flex
    flex-direction column
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
