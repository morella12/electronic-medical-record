<template>
  <div>
    <h1>Registrar Atendimento</h1>
    <form @submit.prevent="registrarAtendimento">
      <div>
        <label for="name">Nome do Paciente</label>
        <input v-model="name" id="name" type="text" required />
      </div>
      <div>
        <label for="data-appointment">Data do Atendimento</label>
        <input v-model="dataAppointment" id="data-appointment" type="date" required />
      </div>
      <div>
        <label for="chief-complaints">Queixa Principal</label>
        <input v-model="chiefComplaints" id="chief-complaints" type="text" required />
      </div>
      <div>
        <label for="allergies">Alergias</label>
        <input v-model="alergias" id="allergies" type="text" />
      </div>
      <div>
        <label for="history-present">História da Doença Atual</label>
        <textarea v-model="historyPresent" id="history-present" required></textarea>
      </div>
      <div>
        <label for="family-history">Histórico Familiar</label>
        <input v-model="familyHistory" id="family-history" type="text" />
      </div>
      <div class="medicines">
        <label for="medicine">Prescrição de Medicamentos</label>

        <label for="medicine">Nome do Medicamento</label>
        <input v-model="mecinesDes" id="medicine-name" type="text" />

        <label for="medicine">Descrição do Medicamento</label>
        <textarea v-model="mecinesDescription" id="medicine-description" type="text"></textarea>

        <label for="medicine">Dose do Medicamento</label>
        <input v-model="mecineDose" id="medicine-dose" type="text" />
      </div>
      <button type="submit">Registrar</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { IAppointment } from '@/services/appointment.ts'

export default defineComponent({
  name: 'RegistroAtendimento',
  setup() {
    const identificacao = ref<IAppointment>('');
    const data = ref<string>('');
    const queixa = ref<string>('');
    const doenca = ref<string>('');
    const alergias = ref<string>('');
    const historico = ref<string>('');
    const prescricao = ref<string>('');

    return {
      identificacao,
      data,
      queixa,
      doenca,
      alergias,
      historico,
      prescricao,
      registrarAtendimento,
    };
  },
});
</script>
