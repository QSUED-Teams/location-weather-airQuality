import * as types from './mutation-types.js'

import {
  setStore,
  getStore
} from '../config/mUtils'

export default {
  //设置滚动条位置
  [types.SET_POSITION](state, routeName) {
    state.arrPageName=routeName
    for(const attr in state.position){
      if(routeName==attr){
        setTimeout(()=>{state.position[attr].scroller.scrollTo(state.position[attr].pos.left,state.position[attr].pos.top)},10)
      }
    }
  },
  //设置滚动条位置
  [types.SAVE_PAGE](state,{pos, scroller}) {
    state.position[state.arrPageName]={pos:pos,scroller:scroller}
  },
  //设置当前位置
  [types.SET_LOCATION](state,{city,add,lng,lat}) {
    state.city = city
    state.activeCity = add
    state.activeLocation = [lng,lat]
  },
  //设置地址列表
  [types.SET_ADDRESSLIST](state,adds) {
    state.addressList = adds
  },
  //设置地址列表
  [types.SAVE_SEARCHKEY](state,searchKey) {
    state.searchKey = searchKey
  }
}
