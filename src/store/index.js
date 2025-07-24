import Vue from "vue";
import Vuex from "vuex";
import Cookies from "js-cookie";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        isLoading: [],
        drawer: true,
        user: null,
        currentParty: null,
        notify: {
            status: false,
            message: null,
            type: null
        },
        selectPartyModalStatus: false,
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
        },
        setIsLoading(state, key) {
            if (state.isLoading.indexOf(key) !== -1) {
                state.isLoading.splice(state.isLoading.indexOf(key), 1)
            } else {
                state.isLoading.push(key);
            }
        },
        setSelectPartyModalStatus(state, status) {
            state.selectPartyModalStatus = status;
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
        isLoading({commit}, key) {
            commit('setIsLoading', key);
        },
        setSelectPartyModalStatus({commit}, status) {
            commit('setSelectPartyModalStatus', status);
        }
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
        },
        getIsLoading: state => {
            return state.isLoading.length > 0;
        },
        getSelectPartyModalStatus: state => {
            return state.selectPartyModalStatus;
        }
    },
    modules: {}
});
