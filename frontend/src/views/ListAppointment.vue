<template>
  <div>
    <h1>Atendimentos Anteriores</h1>
    <ul>
      <li v-if="isLoading">Carregando...</li>
      <li v-else-if="!appointments.length">Nenhum atendimento encontrado.</li>
      <li v-else v-for="appointment in appointments" :key="appointment.name">
        <h3>{{ appointment.name }}</h3>
        <p>Queixa: {{ appointment.chiefComplaints }}</p>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { listAppointment } from '@/services/appointment'
import type { IAppointment } from '@/utils/interfaces'

export default defineComponent({
  name: 'ListAppointment',
  setup() {
    const appointments = ref<IAppointment[]>([])
    const isLoading = ref(true)
    const loadingAppointment = async () => {
      try {
        appointments.value = await listAppointment()
      } catch (error) {
        console.error('Erro ao carregar appointment:', error)
      } finally {
        isLoading.value = false
      }
    }

    onMounted(loadingAppointment)

    return {
      appointments,
      isLoading
    }
  }
})
</script>
