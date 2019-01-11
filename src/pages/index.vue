<template>
  <div class="g-index-wrap">
    <div class="g-header">
      <!--<img src="../assets/images/logo3.png" class="g-logo" alt="">-->
      <img src="" class="g-logo" alt="">
      <v-weather class="g-title" :updateDuration="10"></v-weather>
    </div>
  </div>
</template>

<script>
import {mapState , mapMutations, mapActions} from 'vuex'

export default {
  name: 'App',
  data() {
    return {
    }
  },
  computed: {},
  mounted() {
  },
  components: {
  },
  methods: {
  }
}
</script>

<style scoped lang="scss">
  @import '../assets/css/mixin';
  .g-index-wrap{
    position: relative;
    z-index: 2;
  }
  .g-header{
    position: relative;
    @include fj();
    overflow: hidden;
    align-items: flex-start;
    .g-logo{
      margin: .34rem 0 0 .64rem;
      @include wh(2.77rem,.81rem);
      object-fit: contain;
    }
    .g-title{
      @include cl;
    }
  }
</style>
