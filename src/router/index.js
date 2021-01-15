import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: (resolve) => require(['@/components/index.vue'], resolve)
    },
    {
      path: '/login',
      name: 'login',
      component: (resolve) => require(['@/components/login.vue'], resolve)
    },
    {
      path: '/mkIndex/:id',
      name: 'mkIndex',
      meta: {
        needLogin: true
      },
      component: (resolve) => require(['@/components/mkIndex.vue'], resolve)
    },
    {
      path: '/mkHistory/:type/:title',
      name: 'mkHistory',
      meta: {
        needLogin: true
      },
      component: (resolve) => require(['@/components/mkHistory.vue'], resolve)
    },
    {
      path: '/liveroom/:liveroom',
      name: 'liveroom',
      meta: {
        needLogin: true
      },
      component: (resolve) => require(['@/components/liveroom.vue'], resolve)
    },
    {
      path: '/rank/:paper_id',
      name: 'rank',
      meta: {
        needLogin: true
      },
      component: (resolve) => require(['@/components/rank.vue'], resolve)
    },
    {
      path: '/exam/:paper_id',
      name: 'exam',
      meta: {
        needLogin: true
      },
      component: (resolve) => require(['@/components/exam.vue'], resolve)
    },
    {
      path: '/result/:paper_id',
      name: 'result',
      meta: {
        needLogin: true
      },
      component: (resolve) => require(['@/components/result.vue'], resolve)
    },
    {
      path: '/parse/:paper_id',
      name: 'parse',
      meta: {
        needLogin: true
      },
      component: (resolve) => require(['@/components/parse.vue'], resolve)
    }
  ]
})
