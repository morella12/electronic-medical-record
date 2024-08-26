<template>
  <div>
    <h1>Registrar Atendimento</h1>
    <form @submit.prevent="createAppointment">
      <div>
        <label for="name">Nome do Paciente</label>
        <input v-model="appointment.name" id="name" type="text" required />
      </div>
      <div>
        <label for="name">CPF do Paciente</label>
        <input v-model="appointment.cpf" id="cpf" type="text" required />
      </div>
      <div>
        <label for="data-appointment">Data do Atendimento</label>
        <input v-model="appointment.dataAppointment" id="data-appointment" type="date" required />
      </div>
      <div>
        <label for="chief-complaints">Queixa Principal</label>
        <input v-model="appointment.chiefComplaints" id="chief-complaints" type="text" required />
      </div>
      <div>
        <label for="allergies">Alergias</label>
        <input v-model="appointment.allergies" id="allergies" type="text" />
      </div>
      <div>
        <label for="history-present">História da Doença Atual</label>
        <textarea v-model="appointment.historyPresent" id="history-present" required></textarea>
      </div>
      <div>
        <label for="family-history">Histórico Familiar</label>
        <textarea v-model="appointment.familyHistory" id="family-history" type="text"></textarea>
      </div>
      <div class="medicines">
        <label>Prescrição de Medicamentos</label>

        <label for="medicine-name">Nome do Medicamento</label>
        <input v-model="appointment.medicines.name" id="medicine-name" type="text" />

        <label for="medicine">Descrição do Medicamento</label>
        <textarea
          v-model="appointment.medicines.description"
          id="medicine-description"
          type="text"
        ></textarea>

        <label for="medicine">Dose do Medicamento</label>
        <input v-model="appointment.medicines.dosage" id="medicine-dose" type="text" />
      </div>
      <ButtonCustom :label="isLoading ? 'Registrando...' : 'Registrar'" :disabled="isLoading" />
      <p v-if="message">{{ message }}</p>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { saveAtendimento } from '@/services/appointment'
import type { IAppointment } from '@/utils/interfaces'
import ButtonCustom from '@/components/button/ButtonComponent.vue'

export default defineComponent({
  components: { ButtonCustom },
  methods: {
    handleClick() {
      alert('Button clicked!')
    }
  },
  name: 'AddAppointment',
  setup() {
    const appointment = reactive<IAppointment>({
      name: '',
      cpf: '',
      dataAppointment: new Date(),
      chiefComplaints: '',
      allergies: '',
      historyPresent: '',
      familyHistory: '',
      medicines: {
        name: '',
        description: '',
        dosage: ''
      }
    })

    const isLoading = ref(false)
    const message = ref<string | null>(null)

    const createAppointment = async () => {
      isLoading.value = true
      try {
        await saveAtendimento(appointment);
        message.value = 'Atendimento registrado com sucesso';
        Object.keys(appointment).forEach(key => {
          (appointment as any)[key] = '';
        });
      } catch (err: any) {
        console.error('Erro ao registrar atendimento:', err)
        message.value = 'Erro ao registrar atendimento.'
      } finally {
        isLoading.value = false
      }
    }
    return {
      appointment,
      isLoading,
      message,
      createAppointment
    }
  }
})
</script>
