<template v-if="dadosCarregados">
  <div>
    <template>
      <v-form
        ref="form"
        @submit.prevent="salvarNovoTexto"
      >
          <v-text-field
            v-model="texto.title"
            label="Título"
            required
          ></v-text-field>

          <v-text-field
            v-model="texto.body"
            label="Descrição"
            required
          ></v-text-field>
          
          <v-btn
            color="success"
            class="mr-4"
            @click="salvarNovoTexto"
          >
            Salvar
          </v-btn>

      </v-form>
    </template>
    <v-spacer></v-spacer>

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
        label="Itens por página"
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
      ],
      texto: {
        title: '',
        body: ''
      }
    }),
    async mounted() {
      await Textos.listar().then( resposta => {
        this.items = resposta;
        this.dadosCarregados = true;
      })
    },
    methods: {
      salvarNovoTexto(){
        Textos.adicionar(this.texto).then( resposta => {
          let textoSalvo = resposta.data;
          localStorage.setItem('textoSalvo', textoSalvo);
          this.items = [
            textoSalvo,
            ...this.items
          ]
        })
      }
    }
  }
</script>
