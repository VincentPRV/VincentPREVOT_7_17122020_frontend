import Vue from 'vue'
import VueRouter from 'vue-router'
import Actu from '../views/actu.vue'
import LoginSignup from '../views/loginSignup.vue'
import Profil from '../views/profil.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/actu',
    name: 'actu',
    component: Actu
  },
  {
    path: '/',
    name: 'loginSignup',
    component: LoginSignup
  },
  {
    path: '/profil',
    name: 'profil',
    component: Profil
  },
]

const router = new VueRouter({
  routes
})

export default router
