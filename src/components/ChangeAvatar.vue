<template>
  <div>
    <section class="hero is-fullheight">
      <div class="hero-body">
        <div class="container has-text-centered">
          <div class="column is-4 is-offset-4">
            <h3 class="title has-text">Change Avatar</h3>
            <p class="subtitle has-text-grey">Browse new photo from your files.</p>
            <div class="box">
              <figure class="avatar">
                <img :src="currentUser.avatar_url" class="avatar img-circle" alt="avatar">
              </figure>
              <form>
                <div class="field" style="margin-top: 40px;">
                  <div class="file has-name">
                    <label class="file-label is-large">
                      <input class="control" type="file" ref="file" name="resume" @change="fileUpload()">
                    </label>
                  </div>
                </div>
                <a class="button is-block is-info is-large" style="margin-top: 30px" @click="changeAvatar()">
                  Change Avatar
                </a>
                <div class="field">
                  <label>-or-</label>
                </div>
                <div class="field">
                  <p class="has-text-grey">&nbsp;·&nbsp;<router-link to="/">Back</router-link>&nbsp;·&nbsp;</p>
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

      fileUpload() {

        this.file = this.$refs.file.files[0];
      },

      changeAvatar() {

        let formData = new FormData();

        formData.append('file', this.file);

        this.$dialog.confirm({

          message: 'Do you want to upload new avatar?',
          onConfirm: () => {

            this.$http.post(`/users/${this.currentUser.id}`, formData, {
              headers: {
                  'Content-Type': 'multipart/form-data'
              }
            }).then(({data}) => {
              localStorage.removeItem('userjson');
              localStorage.setItem('userjson', JSON.stringify(data.user));
              this.$store.commit('setCurrentUser', {
                user: JSON.parse(localStorage.getItem('userjson'))
              });
            })
              .catch((err) => console.log(err));

            this.$toast.open('Avatar changed successfuly!');
          }
        });
      }
    }
  }
  
</script>

<style type="text/css">

img {
  height: 100px;
  width: 100px;
}
</style>