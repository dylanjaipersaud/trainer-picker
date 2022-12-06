<template>
  <div style="height: 100%">
    <!-- Login Screen -->
    <div class="main-con" v-if="!isLoggedIn">
      <div class="left-con">
        <div class="welcome-con">
          <h1><strong>Welcome to TrainMe!</strong></h1>
          <br />
          <h2><i>Ready to get into shape?</i></h2>
          <br /><br /><br />
          <div class="join-con">
            <h4>Join TrainMe now!</h4>
            <router-link to="SignUpPage">
              <v-btn color="#050A30" outlined>SIGN UP</v-btn>
            </router-link>
          </div>
        </div>
      </div>

      <div class="right-con">
        <div style="height: 100%">
          <h2>Sign in to your Account</h2>
          <br />
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
            style="display: flex; flex-direction: column"
          >
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
              >Submit</v-btn>
          </v-form>
          <br />
          <br />
          <!-- <h4>
          <i>Forgot your password? </i>
          <v-btn text> Click here!</v-btn>
        </h4> -->
          <!-- <div>Store: {{isLoggedIn}}</div> -->
          <!-- <v-spacer></v-spacer> -->
          <!-- <div>Pic</div> -->
        </div>
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
import AccountPage from './AccountPage.vue'

export default {
  components: {
    AccountPage,
  },

  data: () => ({
    valid: true,
    email: null,
    password: null,

    // (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    emailRules: [(v) => !!v || "E-mail is required"],
    passwordRules: [(v) => !!v || "Password is required"],
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
            "http://localhost:8000/api-token-auth/",
            {
              username: this.email,
              password: this.password,
            }
            // {headers: { Authorization: `Bearer ${authorizationBasic}`}}
          )
          .then(function (resp) {
            self.$store.dispatch("login", resp.data.token);
          })
          .catch(function (error) {
            alert("Login failed, please try again.");
            console.log(error);
          });
      } else {
        alert("Login failed, please try again.");
      }
    },
  },
};
</script>

<style scoped>
.main-con {
  height: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.welcome-con {
  padding: 100px;
  border-radius: 25px;
  background-color: whitesmoke;
  box-shadow: -11px 11px 30px #7ec8e3;
}
.join-con {
  display: grid;
  width: 100%;
  justify-items: center;
  align-content: center;
}
.left-con {
  display: grid;
  justify-items: center;
  align-content: center;
  justify-content: space-evenly;
  height: 100%;
  width: 60%;
  background: url(https://verilymag.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cq_auto:good%2Cw_1200/MTQ5NDQ1Njk3MjE5ODY0MjY1/fitnessroutines.png);
}
.right-con {
  display: grid;
  justify-items: center;
  align-content: center;
  height: 100%;
  width: 40%;
  background-color: whitesmoke;
  box-shadow: inset 11px 11px 5px #dadada;
}
</style>