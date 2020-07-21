<template v-if="dadosCarregados">
  <div>
    <v-data-table
      :headers="headers"
      :items="items"
      :page.sync="page"
      :items-per-page="itemsPerPage"
      hide-default-footer
      class="elevation-1"
      @page-count="pageCount = $event"
    >
      <template v-slot:items="props">
          <td class="text-xs-center" >{{ props.item.title }}</td>
          <td class="text-xs-center" >{{ props.item.body }}</td>
      </template>
    </v-data-table>
    <div class="text-center pt-2">
      <v-pagination v-model="page" :length="pageCount"></v-pagination>
      <v-text-field
        :value="itemsPerPage"
        label="Items per page"
        type="number"
        min="-1"
        max="15"
        @input="itemsPerPage = parseInt($event, 10)"
      ></v-text-field>
    </div>
  </div>
</template>

<script>
  import Textos from '../services/textos';
  export default {
    name: 'Tabela',

    data: () => ({
      items: [],
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      dadosCarregados: false,
      headers: [
        { text: 'Título', value: 'title' },
        { text: 'Descrição', value: 'body' },
      ]
    }),
    async mounted() {
      await Textos.listar().then( response => {
        this.items = response;
        console.log(this.items);
        this.dadosCarregados = true;
      })
    }
  }
</script>
