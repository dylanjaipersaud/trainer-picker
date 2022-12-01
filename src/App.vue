<template>
  <v-app>
    <AppBar/>
    <v-main>
      <LoginPage />
    </v-main>
  </v-app>
</template>

<script>
import AppBar from "./components/AppBar.vue"
import LoginPage from "./components/LoginPage.vue";

export default {
  name: "App",

  components: {
    AppBar,
    LoginPage,
  },

  data: () => ({
    //
  }),
};
</script>

<style>

</style>
