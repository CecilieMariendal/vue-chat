import Vue from 'vue'
import VueRouter from 'vue-router'
import VueCompositionApi from '@vue/composition-api'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPaperPlane, faMicrophone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { firestorePlugin } from 'vuefire'
import App from './App.vue'

import Home from './pages/Home.vue'
import ChatRoom from './pages/ChatRoom.vue'
import Profile from './pages/Profile.vue'

library.add(faPaperPlane, faMicrophone);

Vue.use(VueCompositionApi)
Vue.use(VueRouter)
Vue.use(firestorePlugin)

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false

const router = new VueRouter({
  mode: 'history',
  routes: [
    {path: '/', component: Home},
    {path: '/chats/:id', component: ChatRoom, name: 'chat'},
    {path: '/profile/:id?', component: Profile, name: 'profile'},
  ]
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
