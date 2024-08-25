import { createRouter, createWebHistory } from 'vue-router';
import CreateService from '@/views/AddAppointment.vue';
import ListServices from '@/views/ListAppointment.vue';

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
