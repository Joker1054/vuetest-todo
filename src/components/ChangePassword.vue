<template>
  <div>
    <section class="hero is-fullheight">
      <div class="hero-body">
        <div class="container has-text-centered">
          <div class="column is-4 is-offset-4">
            <h3 class="title has-text-blue">Change password</h3>
            <div class="box">
              <form>
                <div class="field">
                  <div class="control">
                    <input class="input is-medium" v-model="password" type="password" placeholder="New password" autofocus="">
                  </div>
                </div>
                <div class="field">
                  <div class="control">
                    <input class="input is-medium" v-model="confPassword" type="password" placeholder="Confirm password" autofocus="">
                  </div>
                </div>
                <a class="button is-block is-info is-large" @click="changePassword()">Change password</a>
                <div class="field">
                  <label>-or-</label>
                </div>
                <div class="field">
                  <p class="has-text-grey">
                    &nbsp;·&nbsp;<router-link to="/edit-profile">Cancel</router-link>&nbsp;·&nbsp;
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script type="text/javascript">
import Vue from 'vue';

export default {
  name: 'app',

  data () {
    return {
      currentUser: this.$store.getters.currentUser,
      token: localStorage.getItem('token'),
      password: '',
      confPassword: '',
    }
  },

  methods: {

    changePassword() {

      this.$dialog.confirm({
        message: 'Do you want to save new password?',
        onConfirm: () => {
          this.$http.put('/password/change-password', { 
              password: this.password, 
              password_confirmation: this.confPassword
            })
            .then(({data}) => {

              localStorage.removeItem('userjson');
              localStorage.setItem('userjson', JSON.stringify(data.user));
              this.$store.commit('setCurrentUser', {
                user: JSON.parse(localStorage.getItem('userjson'))
              });
            })
            .catch((err) => console.log(err));

          this.$router.push('/my-tasks');
          this.$toast.open('Password changed successfuly!');
        }
      });
    }
  }
}
  
</script>