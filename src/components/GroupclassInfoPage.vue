<template>
  <div class="set-main">
    <h2>Group Class on {{ date }}</h2>
    <br />
    <br />
    <h3>{{ groupclassObj.title }}</h3>
    <i>{{ groupclassObj.description }}</i>
    <br />
    <br />
    Max Participants: {{ groupclassObj.maxParticipants }}
    <br />
    <br />
    <v-btn width="200px" color="info" @click="register()"> Register</v-btn>
  </div>
</template>

<script>
import moment from "moment";
import axios from "axios";
export default {
  data: () => ({
    groupclassObj: null,
  }),

  props: ["date"],

  computed: {
    isLoggedIn: function () {
      return this.$store.getters.isLoggedIn;
    },
    groupclass_items: function () {
      return this.$store.getters.groupclass_items;
    },
    user: function () {
      return this.$store.getters.user;
    },
  },
  mounted() {
    this.$store.dispatch("getGroupclass").then((resp) => {
      window.console.log(resp);
      this.findGroupclass();
    });
  },

  methods: {
    findGroupclass() {
      for (let i = 0; i < this.groupclass_items.length; i++) {
        if (
          moment(this.date).isSame(
            moment(String(this.groupclass_items[i].dateTime).substring(0, 10))
          )
        ) {
          this.groupclassObj = this.groupclass_items[i];
        }
      }
    },

    register() {
      axios
        .post(
          "http://localhost:8000/session/",
          {
            TraineeID: this.user.id,
            ClassID: this.groupclassObj.id,
          },
          { headers: { Authorization: `Token ${this.token}` } }
        )
        .then(function (resp) {
          console.log(resp);
        });
    },
  },
};
</script>

<style scoped>
.set-main {
  margin: 40px;
}
</style>