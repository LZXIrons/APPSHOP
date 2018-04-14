import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getter'
import actions from './action'
import mutations from './mutations'

Vue.use(Vuex);
const state = {
    details_info:{},
    cartList:JSON.parse(localStorage.getItem('cartList'))||{},  //购物清单  
    
}

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters

})