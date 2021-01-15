<template>
  <div class="parseVideo" position="bottom" :closeOnClickModal="false">
    <mt-popup v-model="isShow">
      <span class="close" @click="setVisible"><i class="icon iconfont icon-close"></i> </span>
      <div class="parse-info" @click="setVisible">
       <div id="showVideo"></div>
      </div>
    </mt-popup>
  </div>
</template>

<script type="text/ecmascript-6">
  import polyvObject from 'polyvObject'
  import { Popup } from 'mint-ui'
  import {mapGetters} from 'vuex'
  export default {
    name: 'parseVideo',
    data () {
      return {
        player: null
      }
    },
    props: ['videoCode'],
    components: {
      'mt-popup': Popup
    },
    computed: {
      ...mapGetters(['host']),
      isShow: {
        get: function () {
          return this.$store.state.parseVideo
        },
        set: function (newValue) {
          this.$store.state.parseVideo = newValue
        }
      }
    },
    watch: {
      isShow () {
        let parseVideo = this.$store.state.parseVideo
        if (parseVideo) {
          this.initPlayer()
        } else {
          document.getElementById('showVideo').innerHTML = ''
          this.player = null
        }
      }
    },
    methods: {
      setVisible () {
        this.$store.commit('setParseVideo', false)
      },
      initPlayer () {
        let that = this
        // 获取视频播放签名
        axios.post(this.host + 'api/mokao/videoH5', {'vid': videoCode}).then((res) => {
          if (res.data.status===1) {
            let polySign = res.data.resultData
            let videoHeight = 200
            let height = window.screen.height
            let viewHeight = window.innerHeight
            let titleHeight = height - viewHeight
            let marginTop = (height - videoHeight) / 2 - titleHeight
            document.getElementById('showVideo').style.marginTop = marginTop + 'px'
            // that.player = polyvObject('#showVideo').videoPlayer({
            //   'width': '100%',
            //   'height': videoHeight,
            //   'vid': that.videoCode,
            //   'ts': polySign.ts,
            //   'sign': polySign.sign
            // })
            // that.player.j2s_resumeVideo()
          }else{
            this.error(res.data.info)
          }
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .mint-popup
    width 100%
    height 100%
    overflow auto
    flex 1
    display flex
    flex-direction column
    .close
      position absolute
      z-index 5
      right 10px
      top 10px
      width 20px
      height 20px
      color #fff
    .parse-info
      flex 1
      display flex
      flex-direction column
      overflow auto
      background-color #212121
      #showVideo {
        width: 100%;
        height: auto;
        z-index: 11;
      }
</style>
