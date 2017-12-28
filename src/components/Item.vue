<template>
  <div>
    <div class="checkbox">
      <input class="my-c-box" type="checkbox" :id="item.id" @click="emitCheckDone()" v-model="item.is_done">
      <label :for="item.id" style="text-align: center;" @click="emitCheckDone()">
        {{ item.body }}
      </label>
    </div>
    <div class="pull-right action-buttons">
      <a href=""><span class="glyphicon glyphicon-pencil"></span></a>
      <a href="#" class="trash" @click="emitDeleteTask()"><span class="glyphicon glyphicon-trash"></span></a>
      <a href="" class="flag"><span class="glyphicon glyphicon-flag"></span></a>
    </div>
  </div>
</template>

<script type="text/javascript">
  import Vue from 'vue';

  export default {

    props: ['item'],

    methods: {

      emitDeleteTask () {
        this.$emit('delete-item', this.item);
      },
      
      emitCheckDone () {
        this.$emit('check-done', this.item);
      }

    },

    mounted () {  

    }

  };

</script>

<style>
  .trash { 
    color:rgb(209, 91, 71); 
  }

  .flag { 
    color:rgb(248, 148, 6); 
  }
</style>