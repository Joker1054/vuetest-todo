<template>
  <div id="app">
    <div class="container">
      <div class="row">
        <div class="col-md-8 col-md-offset-2">
          <div class="panel panel-default">
            <div class="panel-heading">
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
                      @check-done="checkDone">   
                    </Item>
                  </li>
                </ul> 
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
  import Item from './components/Item';
  import axios from 'axios';
  import Vue from 'vue';

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
        }
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

        if(this.newItem.body != ''){

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
        item.is_done = true;

        this.$http.put(`items/${item.id}`, item).catch((error) => { console.log(error); });

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

.my-c-box {
  vertical-align: central;
  align-self: central;
  alignment-baseline: central;
}

</style>
