import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueRouter from 'vue-router'
import Axios from 'axios'

import { store } from "./store.js"

import LoginPage from './components/LoginPage.vue'
import HomePage from './components/HomePage.vue'
import CalendarPage from './components/CalendarPage.vue'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.prototype.$http = Axios

const token = localStorage.getItem('token')
if(token){
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}

const routes = [
  {path: '/', component: LoginPage},
  {path: '/LoginPage', component: LoginPage},
  { path: '/HomePage', component: HomePage},
  {path: '/CalendarPage', component: CalendarPage}
]

const router = new VueRouter({
  routes
})

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
