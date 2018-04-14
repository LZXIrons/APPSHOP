
import Vue from 'vue'
import Vuex from 'vuex'
import * as type from './mutations -type'
export default {
    //banner获取
    Get_shopping({
        commit, state
    }, details_info) {
        let cart = state.cartList
        if (cart[details_info.id]) {
            cart[details_info.id].num++
        }else{
            cart[details_info.id]={
                "num" : details_info.data.count,
                "id" : details_info.data.id,
                "name" : details_info.data.title,
                "price" : details_info.data.ourprice,
                "picture" : details_info.data.goodspics,
            }
        }
        commit(type.CARTLIST,cart)

    },

    /**用户登录** */
    set_user({
        commit,
        state
    }, res) {
        sessionStorage.setItem('userName', JSON.stringify(res));
        sessionStorage.setItem('login', true);
        commit(type.LOGING, true);
        commit(type.GET_USER, res)
    },
    /***用户退出** */
    user_move({
        commit, state
    }) {
        commit(type.LOGING, false);
        sessionStorage.removeItem('userName');
        sessionStorage.removeItem('login')
    }
}