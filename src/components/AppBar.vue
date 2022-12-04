<template>
    <v-app-bar color="#050A30" max-height="70px">
      <v-spacer></v-spacer>
      <router-link to="HomePage">
        <v-btn color="#7EC8E3" outlined> Home </v-btn>
      </router-link>
      <v-spacer></v-spacer>
      <router-link to="CalendarPage">
        <v-btn color="#7EC8E3" outlined> Calendar </v-btn>
      </router-link>
      <v-spacer></v-spacer>
      <router-link to="LoginPage">
        <v-btn color="#7EC8E3" outlined> Account </v-btn>
      </router-link>
      <v-spacer></v-spacer>
      
    </v-app-bar>
    
</template>

<script>
// import HomePage from './components/HomePage.vue'

export default {
    name: "AppBar",
    // components: [
    //   HomePage,
    // ]
}
</script>

<style scoped>
/* .app-bar{
  background-color: #050A30;
  display: flex;
  padding: 20px;
  width: 100%;
  position:fixed;
} */
</style>