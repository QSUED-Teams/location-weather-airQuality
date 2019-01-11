<template>
  <div id="app" :noneBg="$store.state.isNoneBg?'yes':'none'">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app',
    mounted() {
    }
  }
</script>

<style lang="scss">
  @import 'assets/css/base';
  @import 'assets/css/swiper-3.4.2.min.css';

  html, body {
    width: 100%;
    height: 100%;
  }

  #app {
    /*background-color: #071327;*/
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background-size: 100% 100%;
  }
  #app[noneBg = 'yes']{
    background-image: none;
  }
</style>
