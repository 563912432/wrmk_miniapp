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
    <div class="choice">
      <mt-checklist title="请选择" v-model="value" :options='options'></mt-checklist>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {Badge, Toast, Checklist} from 'mint-ui'
  import {mapGetters} from 'vuex'
  export default {
    name: 'bdxxuanze',
    components: {
      Toast,
      'mt-badge': Badge,
      'mt-checklist': Checklist
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
        for (let i = 0; i < this.exam.option[this.index].length; i++) {
          let label = (this.exam.option[this.index][i]).replace(/&nbsp;/g, '').replace(/&quot;/g, '')
          opt.push({
            label: label,
            value: az[i]
          })
        }
        return opt
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
                this.value = data[i].val[j].val.split('')
                bool = true
              }
            }
          }
        }
        if (bool === false) {
          this.value = []
        }
      }
    },
    data () {
      return {
        value: []
      }
    },
    created () {
      this.recoveryAnswer()
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
        if (newValue && newValue.length > 0) {
          let data = this.$store.state.examState.userAnswer
          let change = false
          let hasExam = false
          let answerObj = ''
          for (let i = 0; i < data.length; i++) {
            if (data[i].id === this.exam.number) {
              hasExam = i
              for (let j = 0; j < data[i].val.length; j++) {
                if (+data[i].val[j]['key'] === this.index) {
                  data[i].val[j]['val'] = newValue.toString().replace(/,/g, '')
                  change = true
                  break
                }
              }
              answerObj = data[hasExam]
            }
          }
          if (change === false) {
            if (hasExam !== false) {
              data[hasExam].val.push({
                key: this.index,
                val: newValue.toString().replace(/,/g, '')
              })
              answerObj = data[hasExam]
            } else {
              answerObj = {
                id: this.exam.number,
                val: [
                  {key: this.index, val: newValue.toString().replace(/,/g, '')}
                ]
              }
              data.push({
                id: this.exam.number,
                val: [
                  {key: this.index, val: newValue.toString().replace(/,/g, '')}
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
  .tp-material
    flex: 1
    padding 5px
    font-size 14px
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
