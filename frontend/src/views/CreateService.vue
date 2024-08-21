<template>
  <div>
    <h1>Registrar Atendimento</h1>
    <form @submit.prevent="registrarAtendimento">
      <input v-model="paciente" placeholder="Identificação do Paciente" required />
      <input v-model="data" type="date" required />
      <input v-model="queixa" placeholder="Queixa Principal" required />
      <textarea v-model="historiaDoenca" placeholder="História da Doença Atual"></textarea>
      <textarea v-model="alergias" placeholder="Alergias"></textarea>
      <textarea v-model="historicoFamiliar" placeholder="Histórico Familiar"></textarea>
      <textarea v-model="prescricao" placeholder="Prescrição de Medicamentos"></textarea>
      <button type="submit">Registrar</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      paciente: '',
      data: '',
      queixa: '',
      historiaDoenca: '',
      alergias: '',
      historicoFamiliar: '',
      prescricao: '',
    };
  },
  methods: {
    registrarAtendimento() {
      const atendimento = {
        paciente: this.paciente,
        data: this.data,
        queixa: this.queixa,
        historiaDoenca: this.historiaDoenca,
        alergias: this.alergias,
        historicoFamiliar: this.historicoFamiliar,
        prescricao: this.prescricao,
      };
      axios.post('/api/atendimentos', atendimento)
        .then(() => {
          this.$router.push('/');
        });
    },
  },
};
</script>
