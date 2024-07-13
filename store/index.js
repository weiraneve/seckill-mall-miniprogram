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
        },
        logout(state) {
            state.hasLogin = false;
            state.userInfo = {};
        },
        setUniverifyLogin(state, payload) {
            typeof payload !== 'boolean' ? payload = !!payload : '';
            state.isUniverifyLogin = payload;
        },
    },
    actions: {
        doLogin({ commit }, provider) {
            return new Promise((resolve, reject) => {
                uni.getUserInfo({
                    provider: 'weixin',
                    success: function (infoRes) {
                        console.log('用户昵称为：' + infoRes.userInfo.nickName);
                        console.log('userInfo:' + infoRes.userInfo);
                        commit('login', { provider, userInfo: infoRes.userInfo });
                        resolve(infoRes);
                    },
                    fail: function (error) {
                        console.error('获取用户信息失败', error);
                        reject(error);
                    }
                });
            });
        },
    }
})

export default store
