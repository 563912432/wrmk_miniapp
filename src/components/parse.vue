<template>
  <div class="parse">
    <!--<div class="head">-->
      <!--头-->
      <!--<div class="left" @click="goBack">-->
        <!--<i class="icon iconfont icon-fanhui1"></i>-->
      <!--</div>-->
      <!--<div class="title">{{paperName}} 试卷全解析</div>-->
      <!--<div class="right"></div>-->
    <!--</div>-->
    <vheader :title="headerTitle + '文字解析'"></vheader>
    <div class="list" v-if="allExam">
      <div class="list-for" v-for="(exam, ind) in allExam">
        <!--单选、多选-->
        <div :id="'tk-'+ ind" :class="ind % 2 === 0 ? odd : even" v-if="+exam.type_cate === typeCate.danxuan || +exam.type_cate === typeCate.duoxuan">
          <div class="row">
            <mt-badge size="small" type="success">
              {{ind+1}}、{{exam.type_name}}
            </mt-badge>
            <span v-html="exam.title"></span></div>
          <div class="row">
            <p v-for="(opt, index) in (exam.option?JSON.parse(exam.option):[])">
              <span style="color: #66ccff">{{az[index]}}</span>、<span v-html="opt"></span>
            </p>
          </div>
          <div class="row">
            <mt-badge size="small" color="#57bacd">
              我的答案
            </mt-badge>
            {{getAnswer(exam.number)}}
          </div>
          <div class="row">
            <mt-badge size="small" color="#57bacd">
              正确答案
            </mt-badge>
            {{exam.right_answer.toString()}}
          </div>
          <div class="row">
            <mt-badge size="small" color="#57bacd">名师解析</mt-badge>
            <span v-html="exam.parse ? exam.parse : '暂无解析'"></span>
          </div>
<!--          <div v-if="exam.video" class="row">-->
<!--            <mt-badge size="small" type="primary">-->
<!--              <span @click="showVideo(exam.video)">视频解析</span>-->
<!--            </mt-badge>-->
<!--          </div>-->
        </div>
        <!--判断题-->
        <div :id="'tk-'+ ind" class="item" v-if="+exam.type_cate === typeCate.panduan">
          <div class="row">
            <mt-badge size="small" type="success">
              {{ind+1}}、{{ exam.type_name }}
            </mt-badge>
            <span v-html="exam.title"></span>
          </div>
          <div class="row">
            <mt-badge size="small" color="#57bacd">我的答案</mt-badge>
            <span v-if="getAnswer(exam.number) === 'A'">
              正确
            </span>
            <span v-else-if="getAnswer(exam.number) === 'B'">
              错误
            </span>
            <span v-else>
              {{ getAnswer(exam.number) }}
            </span>
          </div>
          <div class="row">
            <mt-badge size="small" color="#57bacd">正确答案</mt-badge>
            {{exam.right_answer === 'A' ? '正确' : '错误'}}
          </div>
          <div class="row">
            <mt-badge size="small" color="#57bacd">名师解析</mt-badge>
            <span v-html="exam.parse ? exam.parse : '暂无解析'"></span>
          </div>
<!--          <div v-if="exam.video" class="row">-->
<!--            <mt-badge size="small" type="primary">-->
<!--              <span @click="showVideo(exam.video)">视频解析</span>-->
<!--            </mt-badge>-->
<!--          </div>-->
        </div>
        <!--不定向选择题-->
        <div :id="'tk-'+ ind" class="item" v-if="+exam.type_cate === typeCate.bdxxuanze">
          <div class="exam-title">
            <mt-badge size="small" type="success">
              {{ind+1}}、{{ exam.type_name}}
            </mt-badge>
            <span v-html="exam.material"></span>
          </div>
          <div class="exam-title" v-for="(title, title_index) in exam.title">
            <div v-html="title"></div>
            <div style="margin: 5px 10px">
              <div v-for="(opt, opt_index) in exam.option[title_index]">
                <span style="color: #66ccff">{{az[opt_index]}}</span>、<span v-html="opt"></span>
              </div>
              <div class="row">
                <mt-badge size="small" color="#57bacd">我的答案</mt-badge>
                {{getAnswer([exam.number, title_index])}}
              </div>
              <div class="row">
                <mt-badge size="small" color="#57bacd">正确答案</mt-badge>
                {{exam.right_answer[title_index].toString()}}
              </div>
              <div class="row">
                <mt-badge size="small" color="#57bacd">名师解析</mt-badge>
                <span v-html="exam.parse[title_index]"></span>
              </div>
<!--              <div v-if="exam.video" class="row">-->
<!--                <mt-badge size="small" type="primary">-->
<!--                  <span @click="showVideo(exam.video)">视频解析</span>-->
<!--                </mt-badge>-->
<!--              </div>-->
            </div>
          </div>
        </div>
        <!--计算分析-->
        <div :id="'tk-'+ ind" class="item" v-if="+exam.type_cate === typeCate.bdxjianda">
          <div class="row">
            <mt-badge size="small" type="success">
              {{ind+1}}、{{ exam.type_name }}
            </mt-badge>
            <span v-html="exam.material"></span></div>
          <div class="row" v-for="(title, title_index) in exam.title">
            <span v-html="title_index+1 + '、' + title"></span>
            <div class="row">
              <mt-badge size="small" color="#57bacd">名师解析</mt-badge>
              <span v-html="exam.parse[title_index]"></span>
            </div>
          </div>
<!--          <div v-if="exam.video" class="row">-->
<!--            <mt-badge size="small" type="primary">-->
<!--              <span @click="showVideo(exam.video)">视频解析</span>-->
<!--            </mt-badge>-->
<!--          </div>-->
        </div>
        <!--配伍题-->
        <div :id="'tk-'+ ind" class="item" v-if="+exam.type_cate === typeCate.peiwu">
          <mt-badge size="small" type="success">
            {{ind+1}}、{{ exam.type_name}}
          </mt-badge>
          <div style="margin: 5px 10px">
            <mt-badge size="small" color="#57bacd">公共选项</mt-badge>
            <div class="row" v-for="(opt, opt_index) in exam.option">
              <span style="color: #66ccff">{{az[opt_index]}}</span>、<span v-html="opt"></span>
            </div>
          </div>
          <div class="row" v-for="(title, title_index) in exam.title">
            <span v-html="(title_index+1) + '、' + title"></span>
            <div style="margin: 5px 10px">
              <div class="row">
                <mt-badge size="small" color="#57bacd">您的答案</mt-badge>
                {{getAnswer([exam.number, title_index])}}
              </div>
              <div class="row">
                <mt-badge size="small" color="#57bacd">正确答案</mt-badge>
                {{exam.right_answer[title_index].toString()}}
              </div>
              <div class="row">
                <mt-badge size="small" color="#57bacd">名师解析</mt-badge>
                <span v-html="exam.parse"></span>
              </div>
<!--              <div v-if="exam.video" class="row">-->
<!--                <mt-badge size="small" type="primary">-->
<!--                  <span @click="showVideo(exam.video)">视频解析</span>-->
<!--                </mt-badge>-->
<!--              </div>-->
            </div>
          </div>
        </div>
        <!--简答题-->
        <div :id="'tk-'+ ind" class="item" v-if="+exam.type_cate === typeCate.jianda">
          <div class="row">
            <mt-badge size="small" type="success">
              {{ind+1}}、({{ exam.type_name }})
            </mt-badge>
            <span v-html="exam.title"></span>
          </div>
          <div class="row">
            <mt-badge size="small" color="#57bacd">名师解析</mt-badge>
            <span v-html="exam.parse"></span>
          </div>
<!--          <div v-if="exam.video" class="row">-->
<!--            <mt-badge size="small" type="primary">-->
<!--              <span @click="showVideo(exam.video)">视频解析</span>-->
<!--            </mt-badge>-->
<!--          </div>-->
        </div>
      </div>
    </div>
    <!--<parseVideo :videoCode='videoCode'></parseVideo>-->
  </div>
</template>

<script type="text/ecmascript-6">
  import common from '../mixins/common'
  import {Toast, Indicator, Badge} from 'mint-ui'
  import vheader from './vheader'
  // import parseVideo from '@/components/parseVideo'
  import {mapState, mapGetters} from 'vuex'
  export default {
    mixins: [common],
    name: 'parse',
    components: {
      Toast,
      'vheader': vheader,
      // parseVideo,
      'mt-badge': Badge
    },
    computed: {
      ...mapState(['typeCate']),
      ...mapGetters(['host'])
    },
    data () {
      return {
        videoCode: null,
        paperName: '',
        allExam: [],
        userAnswer: [],
        az: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
        dx: ['一', '二', '三', '四', '五', '六', '七', '八'],
        odd: 'item odd',
        even: 'item even',
        headerTitle: ''
      }
    },
    created () {
      this.getRecord()
    },
    methods: {
      getRecord () {
        axios.get(this.host + 'api/mokao/record/' + this.$route.params.paper_id).then((res) => {
          if (res.data.status===1) {
            //console.dir(res.data.resultData)
            // this.paperName = res.data.resultData.paper.course
            this.allExam = res.data.resultData.allTkInfo
            this.userAnswer = (res.data.resultData.record?res.data.resultData.record.record:[])
          }else{
            this.error(res.data.info)
          }
        })
      },
      showVideo (vid) {
        this.videoCode = vid
        if (this.videoCode) {
          this.$store.commit('setParseVideo', true)
        }
      },
      getAnswer (number) {
        //console.log(number)
        if (this.userAnswer) {
          for (let n in this.userAnswer) {
            if (typeof number === 'string') {
              if (number === this.userAnswer[n].id) {
                return this.userAnswer[n].val.toString()
              }
            } else if (typeof number === 'object') {
              if (number[0] === this.userAnswer[n].id) {
                for (let i = 0; i < this.userAnswer[n].val.length; i++) {
                  if (number[1] === this.userAnswer[n].val[i].key) {
                    return this.userAnswer[n].val[i].val.toString()
                  }
                }
              }
            }
          }
        }
        return '未作答'
      }
    }

  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .parse
    flex 1
    position absolute
    z-index 10
    left 0
    width 100%
    height 100%
    background-color: #FBF9FE
    overflow hidden
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
        .icon
          font-size 22px
      .right
        font-size 14px
        color #0086b3
        .icon
          font-size 12px
          margin-right 5px
      .title
        flex 1
        text-align center
        overflow hidden
        text-overflow ellipsis
        white-space nowrap
    .list
      padding 0 5px 0
      font-size 14px
      flex 1
      background #fff
      overflow auto
      color #333
      .item
        padding 10px 5px
        border-bottom 1px dashed #f3f3f3
        .row
          padding 2px 0
      .odd
        background #FBF9FE
        .exam-option
          padding 5px 10px
          display flex
          flex-direction column
</style>
