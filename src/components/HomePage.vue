<template>
  <div class="set-main">
    <h1>Welcome!</h1>
    <br />
    <template v-if="isLoggedIn && currentSession > 0">
      <v-card color="#ededed" min-height="100px">
        <i>Your current class {{ currentSession }}</i>
      </v-card>
    </template>
    <template v-else-if="isLoggedIn && !currentSession">
      <v-card color="#ededed" min-height="100px">
        <i>You have not joined any classes. Register now!</i>
      </v-card>
    </template>
    <template v-else>
      <v-card color="#ededed" min-height="100px">
        <i>Sign-in to book classes!</i>
      </v-card>
    </template>
    <br />
    <h2>Today's Classes</h2>
    <v-calendar color="primary" type="day" :events="sessionEvents">
      <template v-slot:day-header="{ present }">
        <template v-if="present">
          {{ today }}
        </template>
      </template>

      <template v-slot:interval="{ date, time }">
        <div class="text-center">
          {{ formatDate(date, time) }}
          <!-- <div style="display: flex; justify-content: center; padding-top: 10px">
            <v-card width="100px">Hello</v-card>
          </div> -->
        </div>
      </template>
    </v-calendar>
  </div>
</template>

<script>
import moment from "moment";

export default {
  data: () => ({
    today: moment().format("MM[/]DD[/]YY"),
    currentSession: 0,
  }),

  computed: {
    isLoggedIn: function () {
      return this.$store.getters.isLoggedIn;
    },
  },

  methods: {
    formatDate(date, time) {
      let dateTime = date + " " + time;
      return moment(dateTime).format("MM[/]DD[/]YY[ - ]ha");
    },
  },
};
</script>

<style scoped>
.set-main {
  margin: 40px;
}
</style>