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
            state.hasLogin = true;
            if (result.detail.errMsg !== "getUserInfo:ok") {
                uni.showModal({
                    title: "获取用户信息失败",
                    content: "错误原因" + result.detail.errMsg,
                    showCancel: false,
                });
                return;
            }
            if (result.detail && result.detail.userInfo) {
                state.userInfo = result.detail.userInfo;
            }
        },
        logout(state) {
            state.hasLogin = false;
            state.userInfo = {};
        },
        setUserInfo(state, userInfo) {
            state.userInfo = userInfo;
        }
    },
    actions: {

    }
})

export default store
