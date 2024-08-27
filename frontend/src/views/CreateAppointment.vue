<template>
  <div>
    <h1
      class="my-5 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white"
    >
      Registrar Atendimento
    </h1>
    <form @submit.prevent="createAppointment" class="max-w-md mx-auto pt-6">
      <FieldComponent
        v-model="appointment.name"
        id="name"
        label="Nome do Paciente"
        filedType="input"
        required
      />
      <FieldComponent
        maskValue="'###.###.###-##'"
        v-model="appointment.cpf"
        id="cpf"
        label="CPF"
        filedType="input"
        required
      />
      <FieldComponent
        v-model="appointment.dataAppointment"
        id="data-appointment"
        label="Data do Atendimento"
        type="date"
        filedType="input"
        required
      />
      <FieldComponent
        v-model="appointment.chiefComplaints"
        id="chief-complaints"
        label="Queixa Principal"
        filedType="input"
        required
      />
      <FieldComponent v-model="appointment.allergies" id="allergies" label="Alergias" />

      <div>
        <FieldComponent
          v-model="appointment.historyPresent"
          id="history-present"
          label="História da Doença Atual"
          filedType="textarea"
        />
      </div>
      <div>
        <FieldComponent
          v-model="appointment.familyHistory"
          id="family-history"
          label="História Familiar"
          filedType="textarea"
        />
      </div>
      <div class="medicines" v-for="medicine in appointment.medicines" :key="medicine.id">
        <h4 class="my-7 text-2xl font-bold dark:text-white">Prescrição de Medicamentos</h4>

        <FieldComponent
          v-model="medicine.name"
          id="medicine-name"
          label="Nome do Medicamento"
          filedType="input"
        />
        <FieldComponent
          v-model="medicine.description"
          id="medicine-description"
          label="Descrição do Medicamento"
          type="text"
          filedType="input"
        />
        <FieldComponent
          v-model="medicine.dosage"
          id="medicine-dose"
          label="Dose do Medicamento"
          filedType="input"
        />
      </div>
      <ButtonComponent :text="isLoading ? 'Registrando...' : 'Registrar'" :disabled="isLoading" />
      <div v-if="message">
        <div
          v-if="typeMessage === 'error'"
          id="alert-border-2"
          class="flex items-center p-4 mb-4 text-red-800 border-t-4 border-red-300 bg-red-50 dark:text-red-400 dark:bg-gray-800 dark:border-red-800"
          role="alert"
        >
          <svg
            class="flex-shrink-0 w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"
            />
          </svg>
          <div class="ms-3 text-sm font-medium">{{ message }}</div>
          <button
            type="button"
            class="ms-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700"
            data-dismiss-target="#alert-border-2"
            aria-label="Close"
          >
            <span class="sr-only">Dismiss</span>
          </button>
        </div>
        <div
          v-else
          id="alert-border-3"
          class="flex items-center p-4 mb-4 text-green-800 border-t-4 border-green-300 bg-green-50 dark:text-green-400 dark:bg-gray-800 dark:border-green-800"
          role="alert"
        >
          <svg
            class="flex-shrink-0 w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"
            />
          </svg>
          <div class="ms-3 text-sm font-medium">{{ message }}</div>
          <button
            type="button"
            class="ms-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700"
            data-dismiss-target="#alert-border-3"
            aria-label="Close"
          >
            <span class="sr-only">Dismiss</span>
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ButtonComponent from '@/components/button/ButtonComponent.vue'
import FieldComponent from '@/components/input/FieldComponent.vue'
import { useAppointmentStore } from '@/stores/appointment'

export default defineComponent({
  components: { ButtonComponent, FieldComponent },
  name: 'AddAppointment',
  setup() {
    const dateNow = new Date()
    const message = ref('')
    const typeMessage = ref('')
    const { appointment, AddAppointment, isLoading } = useAppointmentStore()
    const newAppointment = appointment
    const createAppointment = async () => {
      const res: any = await AddAppointment(newAppointment)

      message.value = res.message
      typeMessage.value = res.type

      if (res.type === 'success') {
        appointment.name = ''
        appointment.cpf = ''
        appointment.dataAppointment = dateNow
        appointment.chiefComplaints = ''
        appointment.allergies = ''
        appointment.historyPresent = ''
        appointment.familyHistory = ''
        appointment.medicines.forEach((medicine) => {
          medicine.name = ''
          medicine.description = ''
          medicine.dosage = ''
        })
      }
    }

    return {
      appointment,
      message,
      isLoading,
      createAppointment,
      dateNow,
      typeMessage
    }
  }
})
</script>
