import {Indicator, Toast} from "mint-ui";
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState([
      'token',
      'userInfo'
    ]),
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    routerPush (name, params) {
      this.$router.push({name: name, params: params})
    },
    routerReplace (name, params) {
      this.$router.push({name: name, params: params})
    },
    error (info) {
      Toast({
        message: info,
        iconClass: 'mint-toast-icon mintui mintui-field-warning',
        duration: 1500
      })
    },
    loadingOpen (){
      Indicator.open({
        text: '加载中...',
        spinnerType: 'snake'
      })
    },
    loadingClose (){
      Indicator.close()
    }
  }
}
