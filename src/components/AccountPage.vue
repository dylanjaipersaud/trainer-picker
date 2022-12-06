<template>
  <div>
    <div class="main-con">
      <div>
        <div class="account-con">
          <div>
            <v-img
              src="https://cdn-icons-png.flaticon.com/512/5087/5087579.png"
              height="250px"
              width="250px"
            ></v-img>
          </div>
          <div
            style="
              display: flex;
              flex-direction: column;
              justify-content: center;
            "
          >
            <div><strong>Welcome {{user.firstName}}</strong></div>
            <div><i>{{user.username}}</i></div>
          </div>
        </div>
        <div>
          <!-- <br />
          {{ session_items }} -->
          <br />
          <h2>Previous Sessions</h2>
          <v-timeline
          align-top
          dense
          >
            <template v-if="sessions">
              <v-timeline-item>
                <i>Sessions found</i>
              </v-timeline-item>
            </template>
            <template v-else>
              <v-timeline-item>
                <i>No sessions found</i>
              </v-timeline-item>
            </template>
          </v-timeline>
        </div>
      </div>
      <div>
        <v-btn color="error" @click="logout()">Log Out</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    //
  }),

  computed: {
    isLoggedIn: function () {
      return this.$store.getters.isLoggedIn;
    },

    user: function () {
      return this.$store.getters.user;
    },

    session_items: function () {
      return this.$store.getters.session_items;
    },
  },

  mounted() {
    this.$store.dispatch("getSessions").then((resp) => {
      window.console.log(resp);
    });
  },
  methods: {
    logout() {
      if (confirm("Would you like to sign out of your account?")) {
        this.$store.dispatch("logout");
        alert("You have been signed out");
        this.$router.go("LoginPage");
      } else {
        alert("Logout aborted");
      }
    },
  },
};
</script>

<style scoped>
.main-con {
  display: flex;
  justify-content: space-between;
  margin: 40px;
}
.account-con {
  display: flex;
}
</style>