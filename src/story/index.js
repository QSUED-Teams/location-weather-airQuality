import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'

Vue.use(Vuex)

const state = {
  registPhone:'',
  prayId:'',
  confirmCode: false,
  confirmQifu: false,
  confirmWtqifu: false,
  confirmNumover: false,
  confirmInvitefriends: false,
  confirmLost: false,
  confirmWin: false,
  confirmRegist: false,
  confirmLogin: false,
  showChild:false,//红包内部动画显示
  isNoneBg: false,
}
export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations,
})
