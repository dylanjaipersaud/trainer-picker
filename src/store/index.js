import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        status: '',
        token: localStorage.getItem('token') || '',
        user: {},
        groupclass_items: [],
        session_items: [],
    },

    mutations: {
        user_request(state, userData){
            state.user = userData
        },
        auth_request(state) {
            state.status = 'loading'
        },

        auth_success(state, token) {
            state.status = 'success'
            state.token = token
        },

        logout_request(state) {
            state.status = 'logout_request'
        },

        logout_success(state) {
            state.status = 'logout_success'
        },

        fetch_request(state) {
            state.status = 'fetching_data'
        },

        fetch_success(state) {
            state.status = 'fetch_success'
        },

        fetch_error(state) {
            state.status = 'error_fetching'
        },

        get_groupclass_items(state) {
            axios
                .get(
                    "http://localhost:8000/groupclass/",
                    { headers: { Authorization: `Token ${state.token}` } }
                )
                .then(function (resp) {
                    state.groupclass_items = resp.data;
                });
        },

        get_session_items(state){
            axios
                .get(
                    "http://localhost:8000/session/",
                    { headers: { Authorization: `Token ${state.token}` } }
                )
                .then(function (resp) {
                    state.session_items = resp.data;
                });
        }
        
    },

    actions: {
        setUser({commit}, userData){
            commit('user_request', userData)
        },

        login({ commit }, access_token) {
            commit('auth_request')
            localStorage.setItem('token', access_token)
            commit('auth_success', access_token)
            window.console.log(access_token)
        },

        logout({ commit }) {
            commit('logout_request')
            localStorage.removeItem('token')


        },

        getGroupclass({ commit }) {
            commit('get_groupclass_items')
        },

        getSessions({ commit })
        {
            commit('get_session_items')
        }
    },

    getters: {
        isLoggedIn: state => !!state.token,
        user: state => state.user,
        authStatus: state => state.status,
        token: state => state.token,
        groupclass_items: state => state.groupclass_items,
        session_items: state => state.session_items,
    }
})