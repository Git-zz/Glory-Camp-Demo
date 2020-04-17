import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store( {
    state: {
        user: {
            username: null,
            password: null
        },
        token: ''
    },
    mutations: {
        set_token(state, token) {
            state.token = token
            sessionStorage.token = token
        },
        del_token(state) {
            state.token = ''
            sessionStorage.removeItem('token')
        },
        set_userInfo(state, model) {
            sessionStorage.username = model.username
            sessionStorage.password = model.password
        }
    },
    actions: {}
})
