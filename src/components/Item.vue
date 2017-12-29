<template>
  <div>
    <div class="checkbox">
      <input class="my-c-box" type="checkbox" :id="item.id" @click="emitCheckDone()" v-model="item.is_done">
      <label :for="item.id" style="text-align: center;" contenteditable="true" v-model="body">
        {{ item.body }}
      </label>
      <span v-if="item.priority" class="glyphicon glyphicon-exclamation-sign"></span>
    </div>
    <div class="pull-right action-buttons">
      <a href="#" @click="editing()"><span class="glyphicon glyphicon-pencil"></span></a>
      <a href="#" class="trash" @click="emitDeleteTask()"><span class="glyphicon glyphicon-trash"></span></a>
      <a href="#" class="flag" @click="emitSetPriority()"><span class="glyphicon glyphicon-flag"></span></a>
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
        body: '',

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
              handler: () => { this.$emit('delete-item', this.item); this.$modal.hide('dialog'); }
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
        this.item.body = this.body;
        this.$emit('edit-body', this.item);
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
</style>