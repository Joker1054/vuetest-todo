import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import {BASE_URL} from './constants.js'
import VModal from 'vue-js-modal'
import router from './router'
import VueFlashMessage from 'vue-flash-message'
import Buefy from 'buefy'
import Awsome from 'vue-awesome'
import Icon from 'vue-awesome/components/Icon'
import { VTooltip } from 'v-tooltip'
import Vuex from 'vuex'
import store from './store/store';

import 'buefy/lib/buefy.css'
import 'vue-awesome/icons'
import 'font-awesome/css/font-awesome.css'

Vue.use(VModal, { dialog: true })
Vue.use(VueFlashMessage)
Vue.use(Buefy)
Vue.use(Awsome)
Vue.use(Icon)
Vue.use(Vuex)

Vue.component('icon', Icon)
Vue.directive('my-tooltip', VTooltip)

function setUpAxios() {
  let token = localStorage.getItem('token');
  let common = token ? {
    Authorization: `Bearer ${token}`
  } : {};

  Vue.prototype.$http = axios.create({
    baseURL: BASE_URL,
    headers: {
      common: common
    }
  });
}

setUpAxios();

new Vue({
  
  el: '#app',
  router,
  store,
  render: h => h(App),

})

export { setUpAxios };
