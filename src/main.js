import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "@/plugins/vuetify/index.js";
import VueMask from 'v-mask'
import money from 'v-money'
import Cookies from 'js-cookie'


Vue.config.productionTip = false;

Vue.use(VueMask);
Vue.use(money, {precision: 4})
Vue.use(Cookies);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
