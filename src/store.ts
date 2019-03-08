import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(Vuex);
Vue.use(VueAxios, axios);

export default new Vuex.Store({
  state: {
    result: [],
  },
  actions: {
    loadResult({ commit }) {
      return axios
        .get('http://lt.vir999.net/pt/mem/ajax/recent_resulted/BBHL/220.json?timestamp=1548732476230')
        .then((r) => {
          commit('setResult', r.data);
        });
    },
  },
  mutations: {
    setResult(state, result) {
      Vue.set(state, 'result', result);
    },
  },
});
