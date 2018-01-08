<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 col-md-offset-3">
        <div class="panel panel-login">
          <div class="panel-heading">
            <div class="row">
              <div class="">
                <h1>Change Avatar</h1>
              </div>
            </div>
            <hr>
          </div>
          <div class="panel-body">
            <div class="row">
              <div class="col-lg-12">
                <form id="login-form" action="" method="" role="form" style="display: block;">
                  <div class="form-group">
                    <div class="col-lg-12">
                      <div class="text-center">
                        <img :src="currentUser.avatar_url" class="avatar img-circle" alt="avatar">
                        <h6>Upload a different photo...</h6>
                        
                        <input class="form-control" type="file" ref="file" @change="fileUpload()">
                      </div>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="row">
                      <div class="col-sm-6 col-sm-offset-3">
                        <input type="button" name="login-submit" id="login-submit" tabindex="4" class="form-control btn btn-login" @click="changeAvatar()" value="Change Avatar">
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
                          <router-link to="/my-tasks">Cancel</router-link>
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

  export default {
    name: 'app',

    data () {
      return {
        currentUser: JSON.parse(localStorage.getItem('userjson')),
        file: '',
      }
    },

    methods: {

      fileUpload() {

        this.file = this.$refs.file.files[0];
      },

      changeAvatar() {

        let formData = new FormData();

        formData.append('file', this.file);

        this.$http.post(`/users/${this.currentUser.id}`, formData, {
          headers: {
              'Content-Type': 'multipart/form-data'
          }
        }).then(({data}) => {
          this.$modal.show('dialog', {
            title: 'Info',
            text: 'Avatar Changed!',
            buttons: [
              { 
                title: 'Ok',
                default: true,
                handler: () => { 
                  localStorage.removeItem('userjson');
                  localStorage.setItem('userjson', JSON.stringify(data.user));
                  location.href = '/my-tasks';
                  this.$modal.hide('dialog'); 
                }
              }
            ]
          })
        })
        .catch((err) => console.log(err));
      }
    }
  }
  
</script>

<style type="text/css">
body {
  padding-top: 90px;
}
.panel-login {
  border-color: #ccc;
  -webkit-box-shadow: 0px 2px 3px 0px rgba(0,0,0,0.2);
  -moz-box-shadow: 0px 2px 3px 0px rgba(0,0,0,0.2);
  box-shadow: 0px 2px 3px 0px rgba(0,0,0,0.2);
}
.panel-login>.panel-heading {
  color: #00415d;
  background-color: #fff;
  border-color: #fff;
  text-align:center;
}
.panel-login>.panel-heading a{
  text-decoration: none;
  color: #666;
  font-weight: bold;
  font-size: 15px;
  -webkit-transition: all 0.1s linear;
  -moz-transition: all 0.1s linear;
  transition: all 0.1s linear;
}
.panel-login>.panel-heading h1{
  color: #59B2E0;
  font-size: 18px;
}
.panel-login>.panel-heading hr{
  margin-top: 10px;
  margin-bottom: 0px;
  clear: both;
  border: 0;
  height: 1px;
  background-image: -webkit-linear-gradient(left,rgba(0, 0, 0, 0),rgba(0, 0, 0, 0.15),rgba(0, 0, 0, 0));
  background-image: -moz-linear-gradient(left,rgba(0,0,0,0),rgba(0,0,0,0.15),rgba(0,0,0,0));
  background-image: -ms-linear-gradient(left,rgba(0,0,0,0),rgba(0,0,0,0.15),rgba(0,0,0,0));
  background-image: -o-linear-gradient(left,rgba(0,0,0,0),rgba(0,0,0,0.15),rgba(0,0,0,0));
}
.panel-login input[type="text"],.panel-login input[type="email"],.panel-login input[type="password"] {
  height: 45px;
  border: 1px solid #ddd;
  font-size: 16px;
  -webkit-transition: all 0.1s linear;
  -moz-transition: all 0.1s linear;
  transition: all 0.1s linear;
}
.panel-login input:hover,
.panel-login input:focus {
  outline:none;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
  border-color: #ccc;
}
.btn-login {
  background-color: #59B2E0;
  outline: none;
  color: #fff;
  font-size: 14px;
  height: auto;
  font-weight: normal;
  padding: 14px 0;
  text-transform: uppercase;
  border-color: #59B2E6;
  margin-top: 30px;
}
.btn-login:hover,
.btn-login:focus {
  color: #fff;
  background-color: #53A3CD;
  border-color: #53A3CD;
}
img {
  height: 100px;
  width: 100px;
}
</style>