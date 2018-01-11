<template>
  <div class="container" style="padding-top:50px">
    <div class="row">
      <div>
        <div class="panel panel-default">
          <section class="hero is-info">
            <!-- Hero content: will be in the middle -->
            <div class="hero-body">
              <div class="container has-text-centered">
                <h1 class="title is-1">
                  To DO
                </h1>
                <h2 class="subtitle">
                  List of all tasks
                </h2>
              </div>
            </div>

            <!-- Hero footer: will stick at the bottom -->
            <div class="hero-foot">
            </div>
          </section>
          <div class="panel-body">
            <div class="field has-addons">
              <div class="control" style="width: 100vw">
                <input class="input" type="text" placeholder="Enter task..." v-model="newItem.body">
              </div>
              <div class="control">
                <a class="button is-success" @click="addTask()">Add</a>
              </div>
            </div>

            <div class="tasks-list">
              <table class="table table-filter" v-model="todoList" style="display:flex">
                <tbody style="width: 100%">
                  <tr v-for="item in todoList" :key="item.id" class="list-group-item" style="text-align: left; display: flex; width: 100%">
                    <Item v-bind:item="item" :id="item.id" 
                      @delete-item="deleteTask"
                      @check-done="checkDone"
                      @set-priority="setPriority"
                      @edit-body="editBody">
                    </Item>
                  </tr>
                </tbody>
              </table> 
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Item from './Item';
  import axios from 'axios';
  import Vue from 'vue';
  import { setUpAxios } from './../main';
  import Avatar from 'vue-avatar';
  import { mapGetters } from 'vuex'

  export default {

    name: 'app',

    components: {

      Item,
      Avatar,

    },

    computed: {
      // mix the getters into computed with object spread operator
      ...mapGetters([
        'currentUser',
        'todoList'
        // ...
      ])
    },

    data () {
      
      return {

        newItem: {
          body: '',
          priority: false, 
          is_done: false
        },

        is_prior: true,
      }
    },

    created() {
      this.fetchData();
    },

    methods: {

      fetchData () {
        this.$http.get('items')
          .then(({ data }) => {
            this.$store.commit('fillTodoList', {
              items: data.data
            });
          })
          .catch((err) => console.log(err));
      },

      addTask() {

        if(this.newItem.body != '' && this.newItem.body.length < 80){
          this.$http.post('items', this.newItem)
            .then(({ data }) => {
              this.$store.commit('addItemToTodoList', {
                item: data
              })
            })
            .then(()=> this.newItem.body = '')
            .catch((error) => { console.log(error); });
        }
      },

      deleteTask(item) {
        this.$http.delete(`items/${item.id}`)
          .then(() => {
            let index = this.todoList.indexOf(item)
            this.$store.commit('deleteTaskFromTodoList', {
              task: index
            })
          })
          .catch((error) => { console.log(error); });
      },

      checkDone (item) {
        this.$http.put(`items/${item.id}`, item)
          .catch((error) => { console.log(error); });
      },

      setPriority(item) {

        if (!item.is_done) {
          this.is_prior = item.priority ? false : true;

          item.priority = this.is_prior;
          this.$http.put(`items/${item.id}`, item)
            .catch((error) => { console.log(error); });
        }
      },

      editBody(item) {

        if (item.body !== '') {

          this.$http.put(`items/${item.id}`, item)
            .catch((error) => { console.log(error); });
        }
      },
    }
  }
</script>


<style>
  .container {
    width: 70%;
  }

  .field.has-addons {
    padding-top: 1rem;
  }
</style>