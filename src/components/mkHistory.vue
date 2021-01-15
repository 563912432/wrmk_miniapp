<template>
  <div class="wrap">
    <!--头-->
    <vheader :title="headerTitle"></vheader>
    <!--<div class="header">-->
      <!--<div class="header-title">-->
        <!--<span class="header-title-tag"></span>-->
        <!--<span>往期回顾</span>-->
      <!--</div>-->
    <!--</div>-->
    <!---->
    <div class="body">
      <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottomPullText='bottomText' :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
        <div class="list">
          <div v-for="item in list" class="item" @click="routerPush('mkIndex', {id: item.id})">
            <div class="item_title f16 pb10">{{item.type_title}} <span class="f14 c888">第{{item.title}}期</span></div>
            <div class="item_info f14 c888"><span class="badge">时间</span> <span>{{item.start_str}} - {{item.end_str}}</span></div>
          </div>
        </div>
      </mt-loadmore>
    </div>
  </div>
</template>

<script>
  import common from '../mixins/common'
  import vheader from './vheader'
  import {mapGetters} from 'vuex'
  import {Badge, Button, Indicator, Toast, Loadmore} from 'mint-ui'
  export default {
    mixins: [common],
    name: 'mkHistory',
    components: {
      Indicator,
      Toast,
      'vheader': vheader,
      'mt-button': Button,
      'mt-loadmore': Loadmore,
      'mt-badge': Badge
    },
    data () {
      return {
        list: [
          // {
          //   id: 1,
          //   type_title: '初级会计职称',
          //   title: '二',
          //   start_str: '2018-10-10 11:00:00',
          //   end_str: '2018-10-10 15:00:00'
          // }
        ],
        p: 1,
        size: 10,
        pageTotal: '',
        bottomText: '上拉加载更多...',
        allLoaded: false
      }
    },
    computed: {
      ...mapGetters(['host']),
      headerTitle () {
        return  this.$route.params.title + ' 往期回顾'
      }
    },
    created () {
      this.getList()
    },
    methods: {
      //下拉刷新
      loadTop () {
        this.p = 1
        this.list = []
        this.getList()
        this.$refs.loadmore.onTopLoaded();
      },
      loadBottom () {
        this.p += 1
        this.getList()
        this.$refs.loadmore.onBottomLoaded()
      },
      getList () {
        axios.get(this.host + 'api/mokao/history/' + this.$route.params.type + '/' + this.p + '/' + this.size).then((res) => {
          // console.dir(res.data)
          if(res.data.status===1){
            this.list = this.list.concat(res.data.resultData.list)
            this.pageTotal = res.data.resultData.total
            this.isLastPage()
          }else{
            this.error(res.data.info)
          }
        })
      },
      isLastPage () {
        if(this.p == this.pageTotal){
          this.allLoaded = true;
        }else{
          this.allLoaded = false;
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .wrap{
    width: 100%;
    height: 100%;
    // background-color: #f1f1f1;
    display: flex;
    flex-direction: column;
  }
  /*.header{*/
    /*position: relative;*/
    /*background: transparent;*/
    /*text-align: center;*/
    /*padding: 10px;*/
  /*}*/
  /*.header-title{*/
    /*text-align: left;*/
    /*font-weight: bold;*/
  /*}*/
  /*.header-title-tag{*/
    /*display: inline-block;*/
    /*width: 10px;*/
    /*height: 18px;*/
    /*background: #ff9900;*/
    /*vertical-align: text-top;*/
    /*margin-right: 10px;*/
  /*}*/
  .body{
    flex: 1 1 auto;
    overflow: auto;
    flex-direction: column;
    width: 100%
  }
  .list{
    width: 100%;
    padding: 5px 20px;
  }
  .item{
    width: 100%;
    height:auto;
    display: flex;
    flex-direction: column;
    border-top: 1px solid #f1f1f1;
    padding: 15px 0;
    overflow: hidden;
  }
  .item_title{
    line-height: 24px;
  }
  .badge {
    display: inline-block;
    font-size: 12px;
    color: #f33;
    padding: 2px;
    line-height: 12px;
    margin-right: .1rem;
    border: 1px solid #f33;
    border-radius: 1px;
    background-size: 100% 100%;
  }
</style>
