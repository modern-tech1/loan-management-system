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
        {
            path: '/login',
            component :login
        },
        {
            path : '/',
            component :dashboard
        },
        {
            path:'/customers',
            component :customers 
        },
        {
            path :'/addcustomers',
            component :addcustomers
        },
        {
            path:'/loans',
            component :loans
        },
        {
            path:'/payments',
            component :payments 
        },
        {
            path:'/logout',
            component:logout
        }

    ]

})
export default router