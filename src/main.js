import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import {BASE_URL} from './constants.js'


Vue.prototype.$http = axios.create({
  baseURL: BASE_URL,
});

new Vue({
	
  el: '#app',
  render: h => h(App),

})
