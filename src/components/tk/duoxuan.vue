<template>
  <div class="multi">
    <div class="title">
      <mt-badge size="small">题目</mt-badge>
      <span v-html="exam.title"></span>
    </div>
    <div class="choice">
      <mt-checklist title="请选择" v-model="value" :options='options'></mt-checklist>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {Badge, Checklist, Toast} from 'mint-ui'
  import {mapGetters} from 'vuex'
  export default {
    name: 'duoxuan',
    props: {
      exam: {
        type: Object,
        require: true
      }
    },
    components: {
      'mt-badge': Badge,
      'mt-checklist': Checklist,
      Toast
    },
    computed: {
      options () {
        let az = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
        let opt = []
        let options = (typeof(this.exam.option)=='string' ? JSON.parse(this.exam.option) : [])
        for (let i = 0; i < options.length; i++) {
          let label = options[i].replace(/&nbsp;/g, '').replace(/&quot;/g, '')
          opt.push({
            label: label,
            value: az[i]
          })
        }
        return opt
      }
    },
    data () {
      return {
        value: []
      }
    },
    methods: {
      watchExam () {
        let data = this.$store.state.examState.userAnswer
        let bool = false
        for (let i = 0; i < data.length; i++) {
          if (data[i].id === this.exam.number) {
            this.value = data[i].val
            bool = true
          }
        }
        if (!bool) {
          this.value = []
        }
      }
    },
    watch: {
      exam () {
        this.watchExam()
      },
      value (newValue) {
        if (newValue) {
          let data = this.$store.state.examState.userAnswer
          let change = false
          for (let i = 0; i < data.length; i++) {
            if (data[i].id === this.exam.number) {
              data[i].val = newValue
              change = true
            }
          }
          if (change === false) {
            data.push({id: this.exam.number, val: newValue})
          }
          this.$store.commit('setAnswer', data)
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .multi
    display flex
    flex-direction column
    .mint-checklist-label
      display flex
      flex-direction row
      align-items center
      font-size 14px
      line-height 20px
      padding 10px 0
    .title, .choice
      font-size 14px
      padding 5px
</style>
