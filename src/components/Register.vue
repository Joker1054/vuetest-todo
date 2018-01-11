<template>
  <div>
    <section class="hero is-fullheight">
      <div class="hero-body">
        <div class="container has-text-centered">
          <div class="column is-4 is-offset-4">
            <h3 class="title has-text-blue">Register</h3>
            <p class="subtitle has-text-grey">Please register to proceed.</p>
            <div class="box">
              <form>
                <div class="field">
                  <div class="control">
                    <input class="input is-medium" v-model="firstname" name="firstname" id="firstname" type="text" placeholder="First name" autofocus="">
                  </div>
                </div>
                <div class="field">
                  <div class="control">
                    <input class="input is-medium" v-model="lastname" name="lastname" id="lastname" type="text" placeholder="Lastname" autofocus="">
                  </div>
                </div>
                <div class="field">
                  <div class="control">
                    <input class="input is-medium" v-model="email" name="email" id="email" type="text" placeholder="Email Address" autofocus="">
                  </div>
                </div>
                <div class="field">
                  <div class="control">
                    <input class="input is-medium" v-model="password" name="password" id="password" type="password" placeholder="Password">
                  </div>
                </div>
                <div class="field">
                  <div class="control">
                    <input class="input is-medium" v-model="confPassword" name="confirm-password" id="confirm-password" type="password" placeholder="Confirm Password">
                  </div>
                </div>
                <div class="field">
                  <div class="control">
                    <input class="input is-medium" v-model="company" name="company" id="company" type="text" placeholder="Company">
                  </div>
                </div>
                <div class="field">
                  <div class="control">
                    <input class="input is-medium" v-model="country" name="country" id="country" type="text" placeholder="Country">
                  </div>
                </div>
                <a class="button is-block is-info is-large" @click="register()">Register now</a>
                <div class="field">
                  <label>-or-</label>
                </div>
                <div class="field">
                  <p class="has-text-grey">&nbsp;·&nbsp;<router-link to="/login">Login</router-link>&nbsp;·&nbsp;</p>
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
  import { setUpAxios } from './../main';

  export default {
    name: 'app',

    data () {

      return {
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confPassword: '',
        company: '',
        country: '',
      }

    },

    methods: {

      register() {

        if (this.password == this.confPassword) {

          this.$http.post('/register', {firstname: this.firstname,lastname: this.lastname, email: this.email, password: this.password, company: this.company, country: this.country, password_confirmation: this.confPassword})
            .then(({data}) => {

              localStorage.setItem('token', data.access_token);
              localStorage.setItem('userjson', JSON.stringify(data.user));
              this.$store.commit('setCurrentUser', {
                user: JSON.parse(localStorage.getItem('userjson'))
              });
              setUpAxios();
            })
            .then(() => {
              this.$router.push('/');
              this.$toast.open('Successfuly registered');
            })
            .catch((err) => console.log(err));
        } else {

          this.$dialog.alert({
            title: 'Info',
            message: 'Passwords do not match. Try again.',
            type: 'is-danger',
            hasIcon: true,
            icon: 'times-circle',
            iconPack: 'fa'
          });
        }
      },

    }
  }
</script>
