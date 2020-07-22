<template>
  <v-app>
    <v-app-bar
      app
      color="dark"
      dark
    >
      <div class="d-flex text-center">
         <h1>Charlie</h1>
      </div>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <Tabela/>
    </v-main>
  </v-app>
</template>

<script>
import Tabela from './components/Tabela';

export default {
  name: 'App',

  components: {
    Tabela,
  },

  data: () => ({
    //
  }),
};
</script>
