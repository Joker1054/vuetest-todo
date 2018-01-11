<template>
  <div>
    <section class="hero is-fullheight">
      <div class="hero-body">
        <div class="container has-text-centered">
          <div class="column is-4 is-offset-4">
            <h3 class="title has-text-blue">Edit Profile:</h3>
            <div class="box">
              <form>
                <div class="field">
                  <div class="control">
                    <h2>First name:</h2>
                    <input class="input is-medium" v-model="currentUser.firstname" name="firstname" id="firstname" type="text" placeholder="First name" autofocus="">
                  </div>
                </div>
                <div class="field">
                  <div class="control">
                    <h2>Lastname:</h2>
                    <input class="input is-medium" v-model="currentUser.lastname" name="lastname" id="lastname" type="text" placeholder="Lastname" autofocus="">
                  </div>
                </div>
                <div class="field">
                  <div class="control">
                    <h2>Email:</h2>
                    <input class="input is-medium" v-model="currentUser.email" name="email" id="email" type="text" placeholder="Email Address" autofocus="">
                  </div>
                </div>
                <div class="field">
                  <div class="control">
                    <h2>Company:</h2>
                    <input class="input is-medium" v-model="currentUser.company" name="company" id="company" type="text" placeholder="Company">
                  </div>
                </div>
                <div class="field">
                  <div class="control">
                    <h2>Country:</h2>
                    <input class="input is-medium" v-model="currentUser.country" name="country" id="country" type="text" placeholder="Country">
                  </div>
                </div>
                <div class="field text-left" style="margin-bottom: 25px;">
                  <router-link to="/change-password">Change password</router-link>
                </div>
                <a class="button is-block is-info is-large" @click="updateUser()">Save changes</a>
                <div class="field">
                  <label>-or-</label>
                </div>
                <div class="field">
                  <p class="has-text-grey">&nbsp;·&nbsp;<router-link to="/">Cancel</router-link>&nbsp;·&nbsp;</p>
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
  import { mapGetters } from 'vuex'

  export default {
    name: 'app',

    data () {

      return {
        file: '',
      }
    },

    computed: {
      // mix the getters into computed with object spread operator
      ...mapGetters([
        'currentUser',
        // ...
      ])
    },

    methods: {

      updateUser() {

        this.$dialog.confirm({
          message: 'Do you want to save changes?',
          onConfirm: () => {
            this.$http.put(`/users/${this.currentUser.id}`, this.currentUser)
              .then(({data}) => {

                localStorage.removeItem('userjson');
                localStorage.setItem('userjson', JSON.stringify(data.user));
                this.$store.commit('setCurrentUser', {
                  user: JSON.parse(localStorage.getItem('userjson'))
                });
              })
              .catch((err) => console.log(err));

            this.$router.push('/');
            this.$toast.open('Changes saved successfuly!');
          }
        });
      },
    }

  }
  
</script>
