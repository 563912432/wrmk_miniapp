<template>
  <div class="wrap">
    <div class="info f14" v-if="token">
      <span style="margin-right: 10px">{{userInfo.truename}}您好，</span>
      <span @click="logout" style="margin-right: 10px;color:#49c7f0;/*color:#19a7f0;*//*color:#26a2ff;*/">切换账号</span>
      <!--<mt-button @click="logout" plain type="primary" size="small">切换账号</mt-button>-->
    </div>
    <div class="info f14" v-else>
      <span style="margin-right: 10px">游客您好，<span @click="routerPush('login')" style="color:#49c7f0;/*color:#26a2ff;*/">登陆</span> 后参加模考</span>
      <!--<mt-button @click="routerPush('login')" plain type="primary" size="small">登陆</mt-button>-->
    </div>
    <!--图片-->
    <div class="top-pic">
      <img src="../assets/banner.jpg" >
    </div>
    <div class="body">
    <!--初级中级等-->
    <v-mokao v-for="(mokao,index) in mokaos" :mokao="mokao" :key="index"></v-mokao>
    </div>
  </div>
</template>

<script>
  import {Header, Button, Indicator, Toast} from 'mint-ui'
  import {mapGetters} from 'vuex'
  import common from '../mixins/common'
  import mokao from './mokao'
  export default {
    mixins: [common],
    name: 'index',
    components: {
      Indicator,
      Toast,
      'mt-header': Header,
      'mt-button': Button,
      'v-mokao': mokao,
    },
    data () {
      return {
        mokaos: [
          // {
          //   id: 1,
          //   type: 1,
          //   type_title: '初级会计职称',
          //   title: '二',
          //   start: '2018-10-10 10:10:10',
          //   end: '2018-10-17 10:10:10',
          //   courses: [{
          //     id: 1,
          //     title: '初级会计实务',
          //     thumb: '20171127/5a1ba94ad3ae8.png'
          //   }]
          // },
          // {
          //   id: 2,
          //   type: 2,
          //   type_title: '中级会计职称',
          //   title: '二',
          //   start: '2018-10-10 10:10:10',
          //   end: '2018-10-17 10:10:10',
          //   courses: [{
          //     id: 1,
          //     title: '中级会计实务',
          //     thumb: '20180102/5a4aec9da9eed.png'
          //   },{
          //     id: 1,
          //     title: '经济法',
          //     thumb: '20180102/5a4aec9da9eed.png'
          //   },{
          //     id: 1,
          //     title: '财务管理',
          //     thumb: '20180102/5a4aec9da9eed.png'
          //   }]
          // }
        ]
      }
    },
    computed: {
      ...mapGetters(['host']),
    },
    created () {
      this.getAllMk()
    },
    methods: {
      logout (){
        this.$store.commit('logout')
        this.$router.push({'name': 'login'})
      },
      getAllMk () {
        axios.get(this.host + 'api/mokao/index').then((res) => {
          if(res.data.status===1){
            this.mokaos = res.data.resultData
          }else{
            this.error(res.data.info)
          }
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .wrap{
    width: 100%;
    height: 100%;
    background-color: #f1f1f1;
    display: flex;
    flex-direction: column;
    padding-bottom:2px;
  }
  .top-pic{
    display: flex;
    flex-direction: column;
    flex: 0 1 auto;
  }
  .top-pic img{
    flex: 1 1 auto
  }
  .body{
    flex: 1 1 0;
    overflow: auto;
  }
  .info{
    flex: 0 1 28px;
    text-align: right;
    padding: 0 10px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    background-color: #2c2166;/*#f1f1f1;*//*#333;*/
    color: #f1f1f1;/*#aaa;*//*#fff;*/
  }

</style>
