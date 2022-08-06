import Vue from 'vue'
import VueRouter from 'vue-router'

//Menu
import Container from '@/components/TheContainer'
import Home from '@/views/Home'
import About from '@/views/About'
import Login from '@/views/Login'

// Setting 
import ViewAllUsers from '@/views/settings/users/ViewUsers'
import ViewUser from '@/views/settings/users/ViewUser'
import Menus from '@/views/settings/Menus'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Container,
    children: [
      {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/about',
        name: 'About',
        component: About,
        meta: {
          requiresAuth: true
        }
      },
    ]
  },
  {
    path: '/setting',
    redirect: '/setting/users',
    component: Container,
    name: 'User Management',
    children: [
      {
        path: '/setting/users',
        name: 'User Management',
        component: ViewAllUsers,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/setting/users/:id',
        name: 'User',
        component: ViewUser,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/setting/menu',
        name: 'Menu Management',
        component: Menus,
        meta: {
          requiresAuth: true
        }
      },

    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      unrequiredAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
