import { createRouter, createWebHistory } from 'vue-router';

import login from '../views/login.vue';
import admin from '../views/admin.vue';
import players from '../views/players.vue';
import payment from '../views/payment.vue';
import addnew from '../views/addnew.vue';

const routes = [

  {
    path: '/',
    redirect: '/login'
  },

  {
    path: '/login',
    component: login
  },

  {
    path: '/admin',
    component: admin
  },

  {
    path: '/players',
    component: players
  },

  {
    path: '/payment',
    component: payment
  },

  {
    path: '/addnew',
    component: addnew
  }

];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;