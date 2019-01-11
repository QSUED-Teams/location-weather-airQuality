import Vue from 'vue'
import Router from 'vue-router'

const index = r => require.ensure([], () => r(require('../pages/index')), 'index');

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'index',
      meta: {nokeepAlive: false, keepLogin: false},
      component: index
    }
  ]
})

