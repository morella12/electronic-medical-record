import { createRouter, createWebHistory } from 'vue-router';
import ListServices from '../views/ListServices.vue';
import CreateService from '../views/CreateService.vue';

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'ListServices',
      component: ListServices
    },
    {
      path: '/createServices',
      name: 'CreateService',
      component: CreateService
    }
  ]
});
