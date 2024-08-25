<template>
  <div id="app">
    <nav>
      <router-link to="/">Listagem de Atendimentos</router-link>
      <router-link to="/registrar">Registrar Atendimento</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
});
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
}

nav {
  padding: 1rem;
}

nav a {
  margin: 0 15px;
  text-decoration: none;
  color: #42b983;
}

nav a.router-link-active {
  font-weight: bold;
  color: #35495e;
}
</style>
