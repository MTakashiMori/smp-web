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

Vue.filter('productTotalFormatted', function(item) {
  return (item.amount * item.price);
});
Vue.filter('productNameWithQuantityFormatted', function(item) {
  if(item.amount === 1) {
    return item.name;
  }
  return item.name + ' R$' + item.price + ' (x' + item.amount + ')';
});
Vue.filter('brlCurrency', function(item) {
    return item.toFixed(2).replace('.',',')
});

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
