<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8 col-md-offset-2">
        <div class="panel panel-default">
          <nav class="navbar navbar-default navbar-xs">
            <ul class="nav navbar-nav">
              <li>
                <avatar :username="currentUser.firstname" :src="currentUser.avatar_url" :size="30">
                </avatar>
              </li>
              <li class="user-li">
                <div class="navbar-header">
                  <p class="user-nav">{{ currentUser.firstname }} {{ currentUser.lastname }}</p>
                </div>
              </li>
              <li class="dropdown">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown"><b class="caret"></b></a>
                <ul class="dropdown-menu">
                  <li><router-link to="/change-avatar">Change avatar</router-link></li>
                  <li><router-link to="/edit-profile">Edit profile</router-link></li>
                  <li><a href="/" @click="logout()">Log out</a></li>
                </ul>
              </li>
            </ul>
          </nav>

          <div class="panel-heading">
            <h2>My Tasks</h2>
          </div>

          <div class="panel-body">
            <div class="input-group">
              <input type="text" class="form-control" v-model="newItem.body">
              <span class="input-group-btn">
                <button class="btn btn-success" @click="addTask()">Add</button>
              </span>
            </div>

            <div class="tasks-list">
              <ul class="list-group" v-model="items">
                <li v-for="item in items" :key="item.id" class="list-group-item" style="text-align: left;">
                  <Item v-bind:item="item" :id="item.id" 
                    @delete-item="deleteTask"
                    @check-done="checkDone"
                    @set-priority="setPriority"
                    @edit-body="editBody">
                  </Item>
                </li>
              </ul> 
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

  export default {

    name: 'app',

    components: {

      Item,
      Avatar,

    },

    data () {
      
      return {
        items: [],

        newItem: {
          body: '',
          priority: false, 
          is_done: false
        },

        is_prior: true,

        currentUser: JSON.parse(localStorage.getItem('userjson')),
      }
    },

    created() {

      this.fetchData();

    },

    methods: {

      fetchData () {
        this.$http.get('items')
          .then(({ data }) => this.items = data.data)
          .catch((err) => console.log(err));
      },

      addTask() {

        if(this.newItem.body != '' && this.newItem.body.length < 80){
          this.$http.post('items', this.newItem)
            .then(({ data }) => this.items.push(data))
            .then(()=> this.newItem.body = '')
            .catch((error) => { console.log(error); });
        }
      },

      deleteTask(item) {
        this.$http.delete(`items/${item.id}`)
          .then((res) => this.fetchData())
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

          this.$modal.show('dialog', {
            title: 'Info',
            text: 'Task edited.',
            buttons: [
              { 
                title: 'Ok',
                default: true,
                handler: () => { this.$modal.hide('dialog'); }
              }
            ]
          })
        }
      },

      logout() {

        localStorage.removeItem('token');
        localStorage.removeItem('userjson');
        setUpAxios();
      },
    }
  }
</script>


<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }

  .tasks-list {
    margin: 20px;
  }

  .panel-body {
    padding:0px;
  }

  .panel-footer .pagination {
    margin: 0;
  }

  .panel .glyphicon,.list-group-item .glyphicon {
    margin-right:5px;
  }

  .panel-body .radio, .checkbox { 
    display:inline-block;
    margin:0px; 
  }

  .panel-body input[type=checkbox]:checked + label {
    text-decoration: line-through;
    color: rgb(128, 144, 160); 
  }

  .list-group-item:hover, a.list-group-item:focus {
    text-decoration: none;
    background-color: rgb(245, 245, 245);
  }

  .list-group-item {
    padding-left: 25px;
  }

  .list-group { 
    margin-bottom:0px;
  }

  .navbar-xs .navbar-nav > li > a {
    padding-top: 0px;
    padding-bottom: 0px;
    line-height: 19px;
  }

  .nav {
    float: right;
    margin: 0px;
  }

  .navbar {
    background-color: #59B2E0;
    margin: 0px;
    padding-top: 5px;
  }

  .user-nav {
    color: #fff;
  }

  .caret {
    color: #fff;
  }

  .user-li, .dropdown {
    margin: 5px;
  }
</style>