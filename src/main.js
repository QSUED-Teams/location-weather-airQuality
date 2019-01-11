import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './config/rem'
import store from './story/'
import AMap from 'vue-amap'
import clickoutside from './plugins/clickoutside'
import components from './components/'
Object.keys(components).forEach((key) => {
  var name = key.replace(/(\w)/, (v) => v.toUpperCase()) // 首字母大写
  Vue.component(`v${name}`, components[key])
});

AMap.initAMapApiLoader({
  key: 'f08316066bbed1f168a371a9368ca524',
  plugin: ['Geolocation', 'Weather'],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.9'
});

Vue.directive('clickoutside',//自定义点击元素范围外触发的指令
  clickoutside
);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})
