<template>
  <div class="g-weather">
    <p class="g-weather-p">{{time.format('yyyy/M/d w  h:mm:ss')}}</p>
    <p class="g-weather-p" v-if="PMQuality">
      <span><img class="icon" style="filter: hue-rotate(691deg) brightness(1.5);margin-top: .03rem" :src="'http://park.hzqisheng.cn/weathericon/' + weatherInfo.weather + '.png'" alt=""></span>
      {{weatherInfo.weather}}
      <span><img class="icon" src="../assets/images/thermometer.png" alt=""></span>
      {{weatherInfo.temperature}}℃ 空气质量{{PMQuality}}
    </p>
  </div>
</template>

<script>
import * as getData from './../service/getData'
import * as cityJson from '../../static/js/city'
import * as mobile from './../config/mUtils'
import {mapState, mapMutations,mapActions} from 'vuex'
import { lazyAMapApiLoaderInstance } from 'vue-amap';

export default {
  name: 'App',
  data() {
    return {
      time: new Date(),
      weatherInfo:{},
      interval: null,
      intervalTime: null,
      PMQuality: '',
      distance: .01,
    }
  },
  props:{
    updateDuration:{
      type: Number,
      default: 10,
    }
  },
  mounted() {
    this.init();
    this.intervalTime = setInterval(() => {
      this.time = new Date();
    },1000);
    this.interval = setInterval(() => {
      this.init()
    },this.updateDuration * 60000);
  },
  components: {
  },
  computed: {
  },
  methods: {
    init () {
      let _this = this
      lazyAMapApiLoaderInstance.load().then(() => {
        let location = new AMap.Geolocation({
          useNative: true
        })
        let weather = new AMap.Weather();
        location.getCurrentPosition(function (msg, datas) {
          //console.log(datas,123)
          if (msg !== 'error') {
            weather.getLive(datas.addressComponent.city, function(err, data) {
              if (!err) {
                _this.weatherInfo = data;
                console.log(_this.weatherInfo)
                _this.getQuality(datas);
              }
            });
          }
        })
      });
    },
    getQuality (datas) {
      const cityReg = new RegExp(this.weatherInfo.city.replace(/市/,''));
      try{
        cityJson.cityJson.forEach(city => {
          if (city['city_name'].match(cityReg) && city['city_code']) {
            getData.getAirQuality(city['city_name']).then(res => {
              //console.log(res)
              if (res.data.aqi <= 50) {
                this.PMQuality = '优';
              } else if (res.data.aqi <= 100) {
                this.PMQuality = '良';
              } else if (res.data.aqi <= 150) {
                this.PMQuality = '轻度污染';
              } else if (res.data.aqi <= 200) {
                this.PMQuality = '中度污染';
              } else if (res.data.aqi <= 300) {
                this.PMQuality = '重度污染';
              } else {
                this.PMQuality = '严重污染';
              }
            });
            throw 'Jump out now!'//在这里抛出异常
          }
        });
      } catch (e) {
        console.log(e)
      }
      /*getData.getAirQuality(`${datas.position.lat-this.distance},${datas.position.lng-this.distance},${datas.position.lat+this.distance},${datas.position.lng+this.distance}`).then(res => {
        //console.log(res.data)
        if (res.data.length === 0) {
          this.distance += .01;
          this.getQuality(datas);
        } else {
          let getCity = false;
          res.data.forEach(val => {
            if (val.city.indexOf(this.weatherInfo.city.replace(/市/,'')) > -1) {
              getCity = true;
              if (val.aqi <= 35) {
                this.PMQuality = '优';
              } else if (val.aqi <= 75) {
                this.PMQuality = '良';
              } else if (val.aqi <= 115) {
                this.PMQuality = '轻度污染';
              } else if (val.aqi <= 150) {
                this.PMQuality = '中度污染';
              } else if (val.aqi <= 250) {
                this.PMQuality = '重度污染';
              } else {
                this.PMQuality = '严重污染';
              }
            }
          });
          if (!getCity) {
            this.distance += .01;
            this.getQuality(datas);
          }
        }
      })*/
    },
  }
}
</script>

<style scoped lang="scss">
  @import '../assets/css/mixin';
  .g-weather{
    margin: .26rem 1.2rem 0 auto;
  }
  .g-weather-p{
    display: flex;
    align-items: flex-end;
    min-height: .4rem;
    @include sc(.23rem,#fbfcfc);
    span{
      height: .36rem;
      .icon{
        height: 100%;
        object-fit: contain;
      }
    }
  }

</style>
