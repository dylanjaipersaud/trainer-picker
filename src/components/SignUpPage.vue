<template>
  <div style="height: 100%">
    <div class="main-con" v-if="!isLoggedIn">
      <div class="welcome-con">
        <h2>Sign Up for TrainMe</h2>
        <br />
        <v-form ref="form" v-model="valid" lazy-validation class="form-con">
          <v-text-field
            v-model="firstName"
            prepend-icon="mdi-pencil"
            color="#050A30"
            style="padding: 10px"
            label="First Name"
            required
            :rules="nameRules"
          ></v-text-field>
          <v-text-field
            v-model="lastName"
            prepend-icon="mdi-pencil"
            color="#050A30"
            style="padding: 10px"
            label="Last Name"
            required
            :rules="nameRules"
          ></v-text-field>
          <v-text-field
            v-model="username"
            prepend-icon="mdi-account"
            style="padding: 10px"
            color="#050A30"
            label="Username"
            :rules="usernameRules"
            required
          ></v-text-field>
          <v-text-field
            v-model="email"
            prepend-icon="mdi-email"
            style="padding: 10px"
            color="#050A30"
            label="E-mail"
            :rules="emailRules"
            required
          ></v-text-field>
          <v-text-field
            v-model="password"
            prepend-icon="mdi-lock"
            color="#050A30"
            style="padding: 10px"
            label="Password"
            required
            :rules="passwordRules"
            type="password"
          ></v-text-field>
          <v-btn
            @click="validate"
            width="50%"
            outlined
            color="#050A30"
            style="align-self: center"
            >Sign Up</v-btn
          >
        </v-form>
        <br /><br />
        Already have an account?
        <span>
          <router-link to="LoginPage">Log In</router-link>
        </span>
      </div>
    </div>
    <!-- Account Page -->
    <div v-else>
      <AccountPage />
      <!-- <router-link to="AccountPage"></router-link> -->
    </div>
  </div>
</template>

<script>
import axios from "axios";
import AccountPage from "./AccountPage.vue";

export default {
  components: {
    AccountPage,
  },

  data: () => ({
    valid: true,
    username: null,
    email: null,
    password: null,
    firstName: null,
    lastName: null,
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    passwordRules: [(v) => !!v || "Password is required"],
    nameRules: [(v) => !!v || "Name is required"],
    usernameRules: [(v) => !!v || "Username is required"],
  }),

  computed: {
    isLoggedIn: function () {
      return this.$store.getters.isLoggedIn;
    },
  },

  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        let self = this;
        axios
          .post(
            "http://localhost:8000/create-user/",
            {
              username: this.username,
              password: this.password,
              firstName: this.firstName,
              lastName: this.lastName,
              email: this.email,
            }
            // {headers: { Authorization: `Bearer ${authorizationBasic}`}}
          )
          .then(function (resp) {
            self.$store.dispatch("setUser", {
                id: resp.data.id,
              username: self.username,
              password: self.password,
              firstName: self.firstName,
              lastName: self.lastName,
              email: self.email,
            });
            console.log(resp);
            axios
              .post(
                "http://localhost:8000/api-token-auth/",
                {
                  username: self.username,
                  password: self.password,
                }
                // {headers: { Authorization: `Bearer ${authorizationBasic}`}}
              )
              .then(function (resp) {
                self.$store.dispatch("login", resp.data.token);
              })
              .catch(function (error) {
                alert("Token failed, please try again.");
                console.log(error);
              });
          })
          .catch(function (error) {
            alert("Sign up failed, please try again.");
            console.log(error);
          });
      }
    },
  },
};
</script>

<style scoped>
.main-con {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url(https://verilymag.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cq_auto:good%2Cw_1200/MTQ5NDQ1Njk3MjE5ODY0MjY1/fitnessroutines.png);
}
.welcome-con {
  padding: 100px;
  border-radius: 25px;
  background-color: whitesmoke;
  box-shadow: 0px 0px 100px white;
}
.form-con {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>