<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8 col-md-offset-2">
        <div class="panel panel-default">
          <div class="panel-heading">
            <div class="userbar">
              <nav class="navbar navbar-default navbar-xs">
                <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                  <ul class="nav navbar-nav">
                    <li>
                      <div class="navbar-header">
                        <p><i class="glyphicon glyphicon-user"></i> {{ currentUser }}</p>
                      </div>
                    </li>
                    <li class="dropdown">
                      <a href="#" class="dropdown-toggle" data-toggle="dropdown"><b class="caret"></b></a>
                      <ul class="dropdown-menu">
                        <li><a href="/" @click="logout()">Log out</a></li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
            <h1>My Tasks</h1>
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

  export default {

    name: 'app',

    components: {

      Item,

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

        currentUser: localStorage.getItem('user'),
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
        localStorage.removeItem('user');
        setUpAxios();
      }
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

  .navbar-xs { 
    min-height:20px;
    alignment-baseline: central;
  }

  .navbar-xs .navbar-nav > li > a {
    padding-top: 2px;
    padding-bottom: 2px;
    line-height: 19px;
  }

  .userbar {
    display: inline-flex;
    height: auto;
    width: auto;
    border: none;
  }

  #bs-example-navbar-collapse-1 {
    background-color: rgb(245, 245, 245);
  }
</style>