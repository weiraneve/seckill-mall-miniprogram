import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        hasLogin: false,
        isUniverifyLogin: false,
        univerifyErrorMsg: '',
        loginProvider: "",
        userInfo: {},
    },
    mutations: {
        login(state, provider) {
            state.hasLogin = true;
            state.loginProvider = provider;
            uni.setStorage({
                key: 'userInfo',
                data: provider
            })
        },
        logout(state) {
            state.hasLogin = false;
            state.userInfo = {};
            uni.removeStorage({
                key: 'userInfo'
            })
        },
        setUniverifyLogin(state, payload) {
            typeof payload !== 'boolean' ? payload = !!payload : '';
            state.isUniverifyLogin = payload;
        },
    },
    actions: {

    }
})

export default store
