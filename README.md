# location-weather-airQuality
location-weather-airQuality基于高德地图获取当地空气质量与天气,空气质量信息来自美国大使馆

# Build Setup

vue高德地图组件地址:https://elemefe.github.io/vue-amap/#/zh-cn/introduction/install

安装vue高德地图组件
npm install vue-amap --save

在main.js引入

import AMap from 'vue-amap'

AMap.initAMapApiLoader({
  key: 'f08316066bbed1f168a371a9368ca524',
  plugin: ['Geolocation', 'Weather'],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.9'
});

# install dependencies
npm install

# serve with hot reload at localhost:8183
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

parameter

updateDuration: update duration(更新时长)(unit:minutes)

# Demo

https://qsued-teams.github.io/location-weather-airQuality/dist/index.html

![Image text](http://static-demo.joubn.com/FqGdZGenVNvJn6J2zGDcWOdOWJXe)
