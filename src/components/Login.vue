<template>
  <div>
    <section class="hero is-fullheight">
      <div class="hero-body">
        <div class="container has-text-centered">
          <div class="column is-4 is-offset-4">
            <h3 class="title has-text-blue">Login</h3>
            <p class="subtitle has-text-grey">Please login to proceed.</p>
            <div class="box">
              <form>
                <div class="field">
                  <div class="control">
                    <input class="input is-large" v-model="email" name="username" id="username" type="text" placeholder="Your Email" autofocus="">
                  </div>
                </div>

                <div class="field">
                  <div class="control">
                    <input class="input is-large" v-model="password" name="password" id="password" type="password" placeholder="Your Password">
                  </div>
                </div>
                <a class="button is-block is-info is-large" @click="login()">Login</a>
                <div class="field">
                  <label>-or-</label>
                </div>
                <div class="field">
                  <p class="has-text-grey">&nbsp;·&nbsp;<router-link to="/register">Register</router-link>&nbsp;·&nbsp;</p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
    <v-dialog/>
  </div>
</template>

<script type="text/javascript">
  import Vue from 'vue';
  import { setUpAxios } from './../main';

  export default {

    name: 'app',

    data () {

      return {
        isLogged: false,
        email: '',
        password: '',
        token: '',
      }
    },

    methods: {

      login () {

        this.$http.post('/login', {email: this.email, password: this.password})
          .then(({data}) => {
            localStorage.setItem('token', data.access_token);
            localStorage.setItem('userjson', JSON.stringify(data.user));
            this.$store.commit('setCurrentUser', {
              user: JSON.parse(localStorage.getItem('userjson'))
            });
            setUpAxios();
          })
          .then(() => this.$router.push('/'))
          .catch((err) => {
            this.$dialog.alert({
              title: 'Info',
              message: 'Incorrect email or password.',
              type: 'is-danger',
              hasIcon: true,
              icon: 'times-circle',
              iconPack: 'fa'
            });
            
            console.log(err);
          });
      }
    }
  }
</script>
