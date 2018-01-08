<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 col-md-offset-3">
        <div class="panel panel-login">
          <div class="panel-heading">
            <div class="row">
              <div class="">
                <h1>Register</h1>
              </div>
            </div>
            <hr>
          </div>
          <div class="panel-body">
            <div class="row">
              <div class="col-lg-12">
                <form id="register-form" action="https://phpoll.com/register/process" method="post" role="form" style="display: block;">
                  <div class="form-group">
                    <input type="text" name="firstname" id="firstname" tabindex="1" class="form-control" placeholder="First name" value="" v-model="firstname">
                  </div>
                  <div class="form-group">
                    <input type="text" name="lastname" id="lastname" tabindex="1" class="form-control" placeholder="Lastname" value="" v-model="lastname">
                  </div>
                  <div class="form-group">
                    <input type="email" name="email" id="email" tabindex="1" class="form-control" placeholder="Email Address" value="" v-model="email">
                  </div>
                  <div class="form-group">
                    <input type="password" name="password" id="password" tabindex="2" class="form-control" placeholder="Password" v-model="password">
                  </div>
                  <div class="form-group">
                    <input type="password" name="confirm-password" id="confirm-password" tabindex="2" class="form-control" placeholder="Confirm Password" v-model="confPassword">
                  </div>
                  <div class="form-group">
                    <input type="text" name="company" id="company" tabindex="1" class="form-control" placeholder="Company" value="" v-model="company">
                  </div>
                  <div class="form-group">
                    <input type="text" name="country" id="country" tabindex="1" class="form-control" placeholder="Country" value="" v-model="country">
                  </div>
                  <div class="form-group">
                    <div class="row">
                      <div class="col-sm-6 col-sm-offset-3">
                        <input type="button" name="register-submit" id="register-submit" tabindex="4" class="form-control btn btn-register" value="Register Now" @click="register()">
                      </div>
                    </div>
                  </div>
                  <div class="form-group">
                    <p class="text-center">-or-</p>
                  </div>
                  <div class="form-group">
                    <div class="row">
                      <div class="col-lg-12">
                        <div class="text-center">
                          <router-link to="/login">Login</router-link>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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

              this.$modal.show('dialog', {
                title: 'Info',
                text: 'Successfully registered! Welcome.',
                buttons: [
                  { 
                    title: 'Ok',
                    default: true,
                    handler: () => {
                      localStorage.setItem('token', data.access_token);
                      localStorage.setItem('userjson', JSON.stringify(data.user));
                      setUpAxios();
                      this.$router.push('/my-tasks');
                      this.$modal.hide('dialog');
                    }
                  }
                ]
              })
            })
            .catch((err) => console.log(err));
        } else {

          this.$modal.show('dialog',{
            title: 'Info',
            text: 'Passwords do not match. Try again.',
            buttons: [
              {
                title: 'Ok',
                default: true,
                handler: () => {
                  this.password = '';
                  this.confPassword = '';
                  this.$modal.hide('dialog');
                }
              }
            ]
          });
        }
      }
    }
  }
</script>

<style type="text/css">
body {
    padding-top: 90px;
}

.btn-register {
  background-color: #1CB94E;
  outline: none;
  color: #fff;
  font-size: 14px;
  height: auto;
  font-weight: normal;
  padding: 14px 0;
  text-transform: uppercase;
  border-color: #1CB94A;
}
.btn-register:hover,
.btn-register:focus {
  color: #fff;
  background-color: #1CA347;
  border-color: #1CA347;
}
</style>