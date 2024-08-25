<template>
  <div>
    <h1>Listagem de Atendimentos</h1>
    <ul>
      <li v-for="atendimento in atendimentos" :key="atendimento.id">
        {{ atendimento.paciente }} - {{ atendimento.data }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      atendimentos: [],
    };
  },
  mounted() {
    axios.get('/api/atendimentos')
      .then(response => {
        this.atendimentos = response.data;
      });
  },
};
</script>
