<template>
  <v-app>
    <AppBar/>
    <v-main >
        <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import AppBar from "./components/AppBar.vue"
// import HomePage from './components/HomePage.vue'
// import LoginPage from "./components/LoginPage.vue";

export default {
  name: "App",

  components: {
    AppBar,
    // HomePage,
    // LoginPage,
  },

  data: () => ({
    //
  }),

  computed:{
    isLoggedIn: function () {
      return this.$store.getters.isLoggedIn;
    }
  },
};
</script>

<style>
a{
  text-decoration: none;
}

</style>
