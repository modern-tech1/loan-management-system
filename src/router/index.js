
import { createRouter, createWebHistory } from 'vue-router'

import login from '../views/login.vue'
import dashboard from '../views/dashboard.vue'
import customers from '../views/Customers.vue'
import addcustomers from '../views/addcustomers.vue'
import loans from '../views/Loans.vue'
import payments from '../views/payments.vue'
import logout from '../views/logout.vue'

const router = createRouter({
  history: createWebHistory(),

  routes: [
    // Login page: separate from the dashboard layout
    {
      path: '/login',
      name: 'login',
      component: login
    },

    // Dashboard and other pages
    {
      path: '/',
      name: 'dashboard',
      component: dashboard
    },
    {
      path: '/customers',
      name: 'customers',
      component: customers
    },
    {
      path: '/addcustomers',
      name: 'addcustomers',
      component: addcustomers
    },
    {
      path: '/loans',
      name: 'loans',
      component: loans
    },
    {
      path: '/payments',
      name: 'payments',
      component: payments
    },
    {
      path: '/logout',
      name: 'logout',
      component: logout
    },

    // Redirect unknown URLs to login
    {
      path: '/:pathMatch(.*)*',
      redirect: '/login'
    }
  ]
})

export default router

