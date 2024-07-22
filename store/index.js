import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        hasLogin: false,
        univerifyErrorMsg: '',
        userInfo: {},
    },
    mutations: {
        login(state, result) {
            if (result.detail.errMsg !== "getUserInfo:ok") {
                state.hasLogin = false;
                uni.showModal({
                    title: "获取用户信息失败",
                    content: "错误原因" + result.detail.errMsg,
                    showCancel: false,
                });
                return;
            }
            if (result.detail && result.detail.userInfo) {
                state.hasLogin = true;
                state.userInfo = result.detail.userInfo;
            }
        },
        logout(state) {
            state.hasLogin = false;
            state.userInfo = {};
        },
        getPhoneNumber(state, result) {
            if (result.detail.errMsg === 'getPhoneNumber:ok') {
                console.log("detail", result.detail);
            }
        },
    },
    actions: {

    }
})

export default store
