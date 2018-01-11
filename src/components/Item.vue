<template>
  <div class="col" style="display: flex; width: 100%">
    <td>
      <div class="field">
        <label class="checkbox" v-my-tooltip.top-center="'Mark Task done'">
          <input type="checkbox" @click="emitCheckDone()" v-model="item.is_done" :id="item.id">
        </label>
      </div>
    </td>
    <td>
      <label class="button" v-if="item.priority" style="color: #FFD700" @click="emitSetPriority()" 
      v-my-tooltip.top-center="'Remove priority'">
        <i class="fa fa-star" aria-hidden="true"></i>
      </label>
      <label class="button" v-if="!item.priority" @click="emitSetPriority()" 
      v-my-tooltip.top-center="'Mark as priority Task'">
        <i class="fa fa-star-o" aria-hidden="true"></i>
      </label>
    </td>
    <td style="width: 75%">
      <label :for="item.id" style="text-align: center;">
        {{ item.body }}
      </label>
    </td>
    <td style="text-align: right">
      <label class="button" style="color: #32CD32" @click="openEditDialog()" v-my-tooltip.top-center="'Edit Task'">
        <i class="fa fa-pencil" aria-hidden="true"></i>
      </label>
      <label class="button" style="color: #8B0000" @click="openDeleteDialog()" v-my-tooltip.top-center="'Delete Task'">
        <i class="fa fa-ban" aria-hidden="true"></i>
      </label>
    </td>
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
          this.$emit('delete-item', this.item); 
      },
      
      emitCheckDone () {
        this.$emit('check-done', this.item);
      },

      emitSetPriority () {
        this.$emit('set-priority', this.item);
      },

      emitEditBody () {
        this.$emit('edit-body', this.item);
      },

      openEditDialog() {
        this.$dialog.prompt({
          message: `Edit task:`,
          size: 'is-medium',
          inputAttrs: {
            value: this.item.body,
            placeholder: 'Enter task',
            maxlength: 100,
          },
          onConfirm: (value) => {
            this.item.body = value;
            this.emitEditBody();
            this.$toast.open('Task edited');
          }
        })
      },

      openDeleteDialog() {
        this.$dialog.confirm({
          title: 'Deleting task',
          message: 'Are you sure you want to <b>delete</b> this task? This action cannot be undone.',
          confirmText: 'Delete Task',
          type: 'is-danger',
          hasIcon: true,
          onConfirm: () => {
            this.emitDeleteTask();
            this.$toast.open('Task deleted!');
          }
        })
      }
    },
  };

</script>