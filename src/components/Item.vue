<template>
  <div>
    <div class="checkbox">
      <input class="my-c-box" type="checkbox" :id="item.id" @click="emitCheckDone()" v-model="item.is_done">
      <input class="edit-input" v-if="isEditing" v-model="item.body">
      <label :for="item.id" v-else style="text-align: center;">
        {{ item.body }}
      </label>
    </div>
    <div class="pull-right action-buttons">
      <a href="#" @click="isEditing=true" v-if="!isEditing">
        <span class="glyphicon glyphicon-pencil"></span>
      </a>
      <a href="#" class="trash" @click="emitDeleteTask()" v-if="!isEditing">
        <span class="glyphicon glyphicon-trash"></span>
      </a>
      <a href="#" :class="{'flag' : item.priority}" @click="emitSetPriority()" v-if="!isEditing">
        <span class="glyphicon glyphicon-flag"></span>
      </a>
      <a href="#" class="ok" @click="emitEditBody()" v-else>
        <span class="glyphicon glyphicon-ok"></span>
      </a>
      <a href="#" class="no" @click="isEditing = false" v-if="isEditing">
        <span class="glyphicon glyphicon-remove"></span>
      </a>
    </div>
    <v-dialog/>
  </div>
</template>

<script type="text/javascript">
  import Vue from 'vue';

  export default {

    props: ['item'],

    data () {

      return {
        isEditing: false,
      }   

    },

    methods: {

      emitDeleteTask () {
        this.$modal.show('dialog', {
          title: 'Confirm',
          text: 'Are you sure?',
          buttons: [
            { 
              title: 'Remove',
              default: true,
              handler: () => { 
                this.$emit(
                  'delete-item', this.item
                ); 
                this.$modal.hide('dialog'); 
              }
            },
            { 
              title: 'Close'
            }
         ]
        })

      },
      
      emitCheckDone () {
        this.$emit('check-done', this.item);
      },

      emitSetPriority () {
        this.$emit('set-priority', this.item);
      },

      emitEditBody () {
        this.$emit('edit-body', this.item);
        this.isEditing = false;
      },

      editing() {
        this.isEditing = true;
      }
    },
  };

</script>

<style>
  .trash { 
    color:rgb(209, 91, 71); 
  }

  .flag { 
    color:rgb(248, 148, 6); 
  }

  .glyphicon-exclamation-sign {
    color:rgb(248, 148, 6);
  }

  .ok {
    color:rgb(5, 248, 150);
  }

  .no {
    color:rgb(209, 91, 71);
  }

  .edit-input {
    width: 40vw;
  }
</style>