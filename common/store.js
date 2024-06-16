import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        hasLogin: false,
        isUniverifyLogin: false,
        univerifyErrorMsg: '',
        loginProvider: ""
    },
    mutations: {
        login(state, provider) {
            state.hasLogin = true;
            state.loginProvider = provider;
        },
        logout(state) {
            state.hasLogin = false;
        },
        setUniverifyLogin(state, payload) {
            typeof payload !== 'boolean' ? payload = !!payload : '';
            state.isUniverifyLogin = payload;
        },
        setUniverifyErrorMsg(state, payload = '') {
            state.univerifyErrorMsg = payload;
        },
        setOpenid(state, openid) {
            state.openid = openid;
        },
    }
})

export default store
