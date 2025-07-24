import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import theme from "@/plugins/vuetify/theme";
import ptBr from '@/plugins/vuetify/locale/ptBr.js';
import colors from 'vuetify/lib/util/colors'


Vue.use(Vuetify);

export default new Vuetify({
  lang: {
    locales: { ptBr },
    current: 'ptBr',
  },
  theme: {
    themes: theme
  }
});
