import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({

  state: {
    todoList: [],
    currentUser: JSON.parse(localStorage.getItem('userjson')),
  },

  getters: {
    currentUser: state => {
      return state.currentUser;
    },

    todoList: state => {
      return state.todoList;
    }
  },

  mutations: {

    setCurrentUser(state, payload) {
      state.currentUser = Object.assign({}, state.currentUser, payload.user);
    },

    fillTodoList(state, payload) {
      state.todoList = payload.items;
    },

    addItemToTodoList(state, payload) {
      state.todoList.push(payload.item);
    },

    deleteTaskFromTodoList(state, payload) {
      state.todoList.splice(payload.task, 1);
    }
  }
});

export default store;