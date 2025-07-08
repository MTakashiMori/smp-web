import Vue from "vue";
import Vuex from "vuex";
import Cookies from "js-cookie";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        isLoading: false,
        drawer: true,
        user: null,
        currentParty: null,
        notify: {
            status: false,
            message: null,
            type: null
        }
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
            state.currentParty = null;
        },
        setCurrentParty(state, party){
            state.currentParty = party;
        },
        setNotify(state, data) {
            if(state.notify.status) {
                state.notify.status = false;

                //TODO think a way to optimize this
                setTimeout(() => {
                    state.notify.message = data.message;
                    state.notify.type = data.type;

                    state.notify.status = true;
                }, 50);
                return;
            }
            state.notify.message = data.message;
            state.notify.type = data.type;

            state.notify.status = true;
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
        },
        notify({commit}, message, type= null) {
            commit('setNotify', message, type);
        },
        setCurrentParty({commit}, data) {
            commit('setCurrentParty', data);
        },
    },
    getters: {
        getDrawer: state => {
            return state.drawer;
        },
        getUser: state => {
            return state.user;
        },
        getCurrentParty: state => {
            return state.currentParty;
        },
        isLogged: state => {
            return state.user !== null;
        },
        getNotify: state => {
            return state.notify;
        }
    },
    modules: {}
});
