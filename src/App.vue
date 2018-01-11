<template>
  <div id="app">
    <MyNavbar v-if="currentUser"></MyNavbar>
    <router-view></router-view>
  </div>
</template>

<script>
import MyNavbar from './components/MyNavbar';
import { mapGetters } from 'vuex';

  export default {

    name: 'app',

    computed: {
      // mix the getters into computed with object spread operator
      ...mapGetters([
        'currentUser',
        // ...
      ])
    },

    components: {

      MyNavbar

    },

  }
</script>

<style type="text/css">

body {
  padding-top: 0px;
}
.tooltip {
  opacity: 1;
  transition: opacity .15s;
  pointer-events: none;
  padding: 4px;
  z-index: 10000;
  background: black;
  color: white;
  border-radius: 16px;
  padding: 5px 10px 4px;
}

.tooltip.tooltip-open-transitionend {
  display: block;
}

.tooltip.tooltip-after-open {
  opacity: 1;
}

</style>


