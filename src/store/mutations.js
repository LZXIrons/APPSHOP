import * as type from './mutations -type'

export default {
    //清空全部所购商品
    [type._ShopRes](state, res) {
        localStorage.removeItem('cartList')
        state.cartList = {}
    },
    //商品详情页
    [type.DETAILS_INFO](state, data) {
        state.details_info = data
    },
    //购物车信息
    [type.CARTLIST](state, cart) {
        state.cartList = { ...cart }
        localStorage.setItem('cartList', JSON.stringify(state.cartList))
    },
    //增加所选物品数量
    [type.AddCart](state, pay) {
        let cart = pay.cart
        if (cart[pay.id].num > 0) {
            cart[pay.id].num++
        }
        state.cartList = { ...cart }
        localStorage.setItem('cartList', JSON.stringify(state.cartList))
        console.log(cart)
    },
    //减少所选物品数量
    [type.ReduceCart](state, pay) {
        let cart = pay.cart
        cart[pay.id].num--
        if (cart[pay.id].num <= 0) {
            let sc = confirm("确定删除该商品吗？");
            if (sc == true) {
                cart[pay.id] = null
            } else {
                return cart[pay.id].num = 1
            }
        }
        state.cartList = { ...cart }
        localStorage.setItem('cartList', JSON.stringify(state.cartList))
        console.log(state.cartList[pay.id])
    },
    //删除所选物品
    [type.DeleteGoods](state, pay) {
        let cart = pay.cart
        cart[pay.id] = null
        state.cartList = { ...cart }
        localStorage.setItem('cartList', JSON.stringify(state.cartList))
        console.log(state.cartList[pay.id])
    },
    //修改商品数量
    [type.CHANCENUM](state, pay) {
        let cart = pay.cart
        let num = pay.num
        let re = /^[0-9]*[1-9][0-9]*$/
        if (isNaN(num)||num<=0||!re.test(num)) {
            cart[pay.id].num = 1
            alert("只允许输入至少为1的整数!");
        } else {
            cart[pay.id].num = pay.num
        }
        state.cartList = { ...cart }
        localStorage.setItem('cartList', JSON.stringify(state.cartList))
        console.log(state.cartList[pay.id])
    },
}