import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userInfo: null,
    tokenKey: (document.domain + '_token'),
    token: '',
    typeCate: {
      danxuan: 1,
      duoxuan: 2,
      panduan: 3,
      jianda:　4 ,
      bdxxuanze: 5,
      bdxjianda: 6,
      peiwu: 7
    },
    examState: {
      // 答题卡面板状态
      examCard: false,
      // 当前题号
      curr_index: 0,
      // 考试剩余时间
      leftTime: 0,
      // 学员做题答案
      userAnswer: []
    },
    // 视频解析状态（cs）
    parseVideo: false
  },
  getters: {
    host() {
      return window.host
    },
    uploadBase() {
      return window.host + 'Uploads/'
    },
    userAnswer (state) {
      let data = state.examState.userAnswer
      if (data && data.length > 0) {
        return data.filter(v => {
          if (typeof v.val === 'object') {
            return v.val.length > 0
          }
          return v.val !== null
        })
      }
    }
  },
  mutations: {
    // 登出
    logout (state) {
      state.token = null
      state.userInfo = null
      window.cookies.remove(state.tokenKey)
      window.cookies.remove('userInfo')
    },
    // 保存登陆
    setLogin (state, data) {
      window.cookies.set(state.tokenKey, data.token)
      window.cookies.set('userInfo', JSON.stringify(data.userInfo))
      state.token = data.token
      state.userInfo = data.userInfo
    },
    // 从sessionStorage 中更新总线上的用户信息
    setLoginFromSession(state) {
      if(window.cookies.get(state.tokenKey)) state.token = window.cookies.get(state.tokenKey)
      if(window.cookies.get('userInfo'))  state.userInfo = JSON.parse(window.cookies.get('userInfo'))
    },
    // 记录做题
    setAnswer (state, data) {
      state.examState.userAnswer = data
    },
    setExamCard (state, bool) {
      state.examState.examCard = bool
    },
    setExamCurrIndex (state, index) {
      state.examState.curr_index = index
    },
    clearExamState (state) {
      state.examState.curr_index = 0
      state.examState.leftTime = 0
      state.examState.examCard = false
      state.examState.userAnswer = []
    },
    setParseVideo (state, bool) {
      state.parseVideo = bool
    }
  },
  actions: {
    // 登陆
    handleLogin ({commit, state}, data) {
      let url = window.loginHost + 'Api/User/mokaoLogin.html'
      var that = this
      axios.post(url, data.data).then((res) => {
        if(res.data.status===1){
          commit('setLogin', res.data.info)
          data.success()
        }else{
          data.error(res.data.info)
        }
      })
    }
  }
})

export default store
