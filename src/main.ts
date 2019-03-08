import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import Vueaxios from 'vue-axios';
import App from './App.vue';
import router from './router';
import store from './store';


Vue.use(Vuex);
Vue.use(Vueaxios, axios);
Vue.config.productionTip = false;
Vue.axios.defaults.withCredentials = true;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
