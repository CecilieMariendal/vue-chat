import Vue from 'vue'
import VueRouter from 'vue-router'
import { firestorePlugin } from 'vuefire'
import App from './App.vue'

import Home from './components/Home.vue'

Vue.use(VueRouter)
Vue.use(firestorePlugin)

Vue.config.productionTip = false

const router = new VueRouter({
  routes: [
    {path: '/', component: Home}
  ]
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
