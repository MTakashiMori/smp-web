import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        isLoading: false,
        drawer: false
    },
    mutations: {
        toggleSideMenu(state){
            state.drawer = !state.drawer;
        },
    },
    actions: {
        toggleMenu({commit}){
            commit('toggleSideMenu');
        },
    },
    getters: {
        getDrawer: state => {
            return state.drawer;
        },
    },
    modules: {}
});
