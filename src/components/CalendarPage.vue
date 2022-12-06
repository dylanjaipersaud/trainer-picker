<template>
  <div class="set-main">
    <h1>Classes</h1>
    <br />
    <v-sheet height="500">
      <v-calendar :now="today" :value="today" color="primary">
        <template v-slot:day="{ past, date }">
          <v-row style="display: flex; justify-content: center">
            <template v-if="!past && checkDate(date)">
              <router-link :to="{ name: 'GroupclassInfoPage', params: {date: date} }">
                <v-img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Running_icon_-_Noun_Project_17825.svg/1200px-Running_icon_-_Noun_Project_17825.svg.png"
                max-height="50px"
                max-width="50px"
                style="display: flex; justify-content: center; margin-top: 10px"
              ></v-img>
              </router-link>
              <!-- </v-sheet> -->
            </template>
          </v-row>
        </template>
      </v-calendar>
    </v-sheet>
    <!-- {{ groupclass }}
    <br> -->
    <!-- {{groupclass_items}} -->
  </div>
</template>

<script>
import moment from "moment";
// import axios from "axios";

export default {
  data: () => ({
    //   today: '2022-12-04',
    today: moment().format("YYYY[-]MM[-]DD"),
    tracked: {
      "2022-11-28": [2, 2],
      "2022-12-03": [2, 2],
      "2022-12-05": [2, 2],
      "2022-12-15": [2, 2],
      "2022-12-17": [2, 2],
      "2022-12-25": [2, 2],
    },
  }),
  computed:{
    groupclass_items: function (){
      return this.$store.getters.groupclass_items;
    }
  },
  mounted() {
    this.$store
      .dispatch("getGroupclass")
      .then((resp) => {
        window.console.log(resp);
      })
    // this.getData();
  },
  methods: {
    checkDate(date){
      console.log(moment(date).isSame(moment("2022-11-30T12:00:00Z")));
      // moment(date).isSame(this.groupclass_items[i].dateTime)
      for(let i = 0; i < this.groupclass_items.length; i++){
        console.log(date);
        console.log(String(this.groupclass_items[1].dateTime).substring(0,10));
        if(moment(date).isSame(moment(String(this.groupclass_items[i].dateTime).substring(0,10)))){
          return true;
        }
        else{
          return false;
        }
      }
    }
    // formatGroupclass(){
    //   for(let i = 0; i < this.groupclass_items.length; i++){
        
    //   }
    // }
    // selectGroupclass() {
    //   alert("hello");
    // },

  // getData(){
  //   let self = this;
  //   axios
  //     .get(
  //       "http://localhost:8000/groupclass/",
  //       {headers: { Authorization: `Token 514694818037db5a7559b6d548c277054f021ddd`}}
  //     )
  //     .then(function (resp) {
  //       self.groupclass = resp.data;
  //     });
  // }
  },
};
</script>

<style scoped>
.set-main {
  margin: 40px;
}
.v-calendar-weekly__head-weekday {
  border-bottom: solid 1px #888;
}
</style>