import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        hasLogin: false,
        isUniverifyLogin: false,
        univerifyErrorMsg: '',
        userInfo: {},
    },
    mutations: {
        login(state) {
            state.hasLogin = true;
            uni.getUserProfile({
                desc: "登录",
                success: (res) => {
                    state.userInfo = res.userInfo;
                },
                fail: (res) => {
                    console.log(res);
                },
            });
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
