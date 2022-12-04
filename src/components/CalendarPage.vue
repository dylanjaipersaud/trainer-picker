<template>
  <div class="set-main">
    <h1>Sessions</h1>
    <br />
    <v-sheet height="500">
      <v-calendar :now="today" :value="today" color="primary">
        <template v-slot:day="{ past, date }">
          <v-row class="fill-height">
            <template v-if="!past && tracked[date]">
              <v-sheet
                v-for="(percent, i) in tracked[date]"
                :key="i"
                :title="`${category[i]} ${percent}%`"
                :color="colors[i]"
                :width="`${percent}%`"
                height="100%"
                tile
                @click="clickDialog(date)"
              ></v-sheet>
            </template>
          </v-row>
        </template>
      </v-calendar>
    </v-sheet>
  </div>
</template>

<script>
export default {
  data: () => ({
    //   today: '2022-12-04',
    today: "2019-01-10",
    tracked: {
      "2019-01-19": [23, 45, 10],
      "2019-01-18": [10],
      "2019-01-17": [0, 78, 5],
      "2019-01-16": [0, 0, 50],
      "2019-01-15": [0, 10, 23],
      "2019-01-04": [2, 90],
      "2019-01-03": [10, 32],
      "2019-01-02": [80, 10, 10],
      "2019-01-01": [20, 25, 10],
    },
    colors: ["#1867c0", "#fb8c00", "#000000"],
    category: ["Development", "Meetings", "Slacking"],
  }),
  methods: {
    clickDialog(date) {
      alert(date);
    },
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