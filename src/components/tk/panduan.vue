<template>
  <div class="judge">
    <div class="title">
      <mt-badge size="small">题目</mt-badge>
      <span v-html="exam.title"></span>
    </div>
    <div class="choice">
      <mt-radio title="请选择" v-model="value" :options='options'></mt-radio>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { Badge, Radio, Toast } from 'mint-ui'
  import {mapGetters} from 'vuex'
  export default {
    name: 'panduan',
    props: {
      exam: {
        type: Object,
        require: true
      }
    },
    computed: {

    },
    components: {
      Badge,
      'mt-badge': Badge,
      'mt-radio': Radio
    },
    data () {
      return {
        options: [
          {label: '对', value: 'A'},
          {label: '错', value: 'B'}
        ],
        value: ''
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
          this.value = ''
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
  .judge
    display flex
    flex-direction column
    font-size 14px
    .mint-radiolist-label
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
