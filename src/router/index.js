import Vue from 'vue'
import VueRouter from 'vue-router'
import Actu from '../views/actu.vue'
import LoginSignup from '../views/loginSignup.vue'
import Profil from '../views/profil.vue'
import NewPost from '../views/newPost.vue'

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
  {
    path: '/newPost',
    name: 'newPost',
    component: NewPost
  },
]

const router = new VueRouter({
  routes
})

export default router
