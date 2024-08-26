import AddAppointment from '@/views/CreateAppointment.vue';
import ListAppointment from '@/views/ListAppointment.vue';
import { createRouter, createWebHistory } from 'vue-router';

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'ListAppointment',
      component: ListAppointment
    },
    {
      path: '/registrar',
      name: 'AddAppointment',
      component: AddAppointment
    }
  ]
});
