import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import {BASE_URL} from './constants.js'
import VModal from 'vue-js-modal'
import router from './router'

Vue.use(VModal, { dialog: true })

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
  render: h => h(App),

})

export { setUpAxios };
