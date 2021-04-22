import Vue from 'vue'
import VueRouter from 'vue-router'
import VueCompositionApi from '@vue/composition-api'
import { firestorePlugin } from 'vuefire'
import App from './App.vue'

import Home from './components/Home.vue'
import ChatRoom from './components/ChatRoom.vue'

Vue.use(VueCompositionApi)
Vue.use(VueRouter)
Vue.use(firestorePlugin)

Vue.config.productionTip = false

const router = new VueRouter({
  mode: 'history',
  routes: [
    {path: '/', component: Home},
    {path: '/chats/:id', component: ChatRoom, name: 'chat'},
  ]
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
