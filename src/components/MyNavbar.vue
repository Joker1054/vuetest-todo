<template>
  <div class="hero-head">
    <b-modal :active.sync="isImageModalActive">
      <p class="image is-4by3">
        <img :src="currentUser.avatar_url">
      </p>
    </b-modal>

    <nav class="navbar is-info">
      <div id="navbarExampleTransparentExample" class="navbar-menu">
        <div class="navbar-start">
          <div class="navbar-item" style="margin-left: 40px">
            <router-link to="/" style="color: white">
              <i class="fa fa-home fa-2x" aria-hidden="true"></i>
            </router-link>
          </div>
        </div>
        <div class="navbar-end">
          <div class="navbar-brand" style="margin-left: 50px">
            <a class="navbar-item" @click="isImageModalActive= true" v-my-tooltip.top-center="'View Avatar'">
              <avatar :username="currentUser.firstname" :src="currentUser.avatar_url" :size="40">
              </avatar>
            </a>
          </div>
          <p class="navbar-item">{{ currentUser.firstname }} {{ currentUser.lastname }}</p>
          <div class="navbar-item has-dropdown is-hoverable" style="margin-right: 40px">
            <a class="navbar-link"></a>
            <div class="navbar-dropdown is-right is-boxed" style="color: black">
              <router-link class="navbar-item" to="/change-avatar">Change Avatar</router-link>
              <router-link class="navbar-item" to="/edit-profile">Edit profile</router-link>
              <a class="navbar-item" href="/" @click="logout()">Log out</a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script type="text/javascript">
  import Vue from 'vue';
  import { mapGetters } from 'vuex'
  import Avatar from 'vue-avatar';

  export default {
    name: 'app',

    components: {
      Avatar,
    },

    data () {
      return {
        isImageModalActive: false
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

      logout() {

        localStorage.removeItem('token');
        localStorage.removeItem('userjson');
        setUpAxios();
      },
    }
  }
</script>