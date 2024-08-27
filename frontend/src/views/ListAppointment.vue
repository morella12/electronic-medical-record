<template>
  <div class="container mx-auto">
    <h1
      class="my-5 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white"
    >
      Atendimentos Anteriores
    </h1>
    <div class="pt-3 relative overflow-x-auto shadow-md sm:rounded-lg mx-0.5">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="px-6 py-3">Paciente</th>
            <th scope="col" class="px-6 py-3">Queixa</th>
            <th scope="col" class="px-6 py-3">Medicamento</th>
            <th scope="col" class="px-6 py-3">Data do Atendimento</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="isLoading">
            <td colspan="4" class="text-center py-4">Carregando...</td>
          </tr>
          <tr v-else-if="!appointments.length">
            <td colspan="4" class="text-center py-4">Nenhum atendimento encontrado.</td>
          </tr>
          <tr v-else v-for="appointment in appointments" :key="appointment.cpf">
            <td class="px-6 py-4">
              <div class="text-base font-semibold">{{ appointment.name }}</div>
              <div class="font-normal text-gray-500">{{ cpfMask(appointment.cpf) }}</div>
            </td>
            <td class="px-6 py-4">{{ appointment.chiefComplaints }}</td>
            <td class="px-6 py-4">
              <div v-for="medicine in appointment.medicines" :key="medicine.id" class="mb-2">
                {{ medicine.name }}
              </div>
            </td>
            <td class="px-6 py-4">
              {{ new Date(appointment.dataAppointment).toLocaleDateString() }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useAppointmentStore } from '@/stores/appointment'
import { listAppointment } from '@/services/appointment';
import type { IAppointment } from '@/utils/interfaces';

export default defineComponent({
  name: 'ListAppointment',
  setup() {
    const isLoading = ref(false);
    const appointments = ref<IAppointment[]>([]);
    const { appointment } = useAppointmentStore()

    const cpfMask = (cpf: string) => cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')

    const loadAppointments = async () => {
      isLoading.value = true

      try {
        const fetchedAppointments = await listAppointment()
        if (fetchedAppointments.length > 0) {
          appointments.value = fetchedAppointments
        } else {
          appointments.value = []
        }
      } catch (error) {
        console.error('Erro ao carregar os atendimentos:', error)
      } finally {
        isLoading.value = false
      }
    }

    onMounted(() => {
      loadAppointments()
    })

    return {
      appointments,
      appointment,
      isLoading,
      cpfMask
    }
  }
})
</script>
