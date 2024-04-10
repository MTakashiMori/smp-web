import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import theme from "@/plugins/vuetify/theme";
import ptBr from '@/plugins/vuetify/locale/ptBr.js';

Vue.use(Vuetify);

const opts = {
  theme: {
    themes: {
      light: theme
    }
  },
  lang: {
    locale: 'pt',
    current: 'pt'
  }
};

export default new Vuetify({
  lang: {
    locales: { ptBr },
    current: 'ptBr',
  },
});
