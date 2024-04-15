import Vue from "vue";
import Vuex from "vuex";
import Cookies from "js-cookie";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        isLoading: false,
        drawer: true,
        user: null
    },
    mutations: {
        toggleSideMenu(state){
            state.drawer = !state.drawer;
        },
        setUser(state, user){
            state.user = user;
        },
        logout(state) {
            Cookies.remove('smp_token');
            state.user = null;
        }
    },
    actions: {
        toggleMenu({commit}) {
            commit('toggleSideMenu');
        },
        setUser({commit}, data) {
            commit('setUser', data);
        },
        logout({commit}) {
            commit('logout');
        }
    },
    getters: {
        getDrawer: state => {
            return state.drawer;
        },
        getUser: state => {
            return state.user;
        },
        isLogged: state => {
            return state.user !== null;
        }
    },
    modules: {}
});
