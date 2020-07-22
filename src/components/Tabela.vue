<template v-if="dadosCarregados">
  <div>
    <template>
      <h2 class="subtitle-1 titulo-form font-weight-medium">Adicione seu texto aqui</h2>
      <v-form
        ref="form"
        @submit.prevent="salvarNovoTexto"
      >
        <div class="form-conteudo">
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
        </div>

      </v-form>
    </template>
    <v-divider
        class="mx-4"
    ></v-divider>
    <h2 class="subtitle-1 titulo-form font-weight-medium">Listagem de textos</h2>
    <v-data-table
      :headers="headers"
      :items="items"
      :page.sync="page"
      :items-per-page="itemsPerPage"
      hide-default-footer
      class="elevation-1 tabela"
      @page-count="pageCount = $event"
    >
      <template v-slot:items="props">
          <td class="text-xs-center" >{{ props.item.title }}</td>
          <td class="text-xs-center" >{{ props.item.body }}</td>
      </template>
        <template v-slot:item.actions="{ texto }">
          <v-icon
            small
            class="text-end"
            @click="atualizarTextos(texto)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            small
            class="text-end"
            @click="removerTextos(texto)"
          >
            mdi-delete
          </v-icon>
      </template>
    </v-data-table>
    <div class="text-center pb-5 tabela">
      <v-pagination v-model="page" :length="pageCount"></v-pagination>
      <v-text-field
        :value="itemsPerPage"
        label="Itens por página"
        class="pt-8"
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
        { text: 'Ações', value: 'actions', sortable: false },
      ],
      texto: {
        title: '',
        body: ''
      }
    }),
    mounted() {
      this.listarTextos();
    },
    methods: {

       listarTextos(){
          Textos.listar().then( resposta => {
          this.items = resposta;
          this.dadosCarregados = true;
        })
      },
      
      salvarNovoTexto(){
        Textos.adicionar(this.texto).then( resposta => {
          let textoSalvo = resposta.data;
          localStorage.setItem('textoSalvo', JSON.stringify(textoSalvo));
          this.items = [
            textoSalvo,
            ...this.items
          ]
        })
        
      },

      removerTextos(texto){
        Textos.deletar(texto).then( resposta => {
          this.items = [
            this.listarTextos(),
            ...this.items
          ]
          console.log(resposta);
        })
      },

      atualizarTextos(){
        Textos.editar(this.texto).then( resposta => {
          let textoSalvo = resposta.data;
          localStorage.setItem('textoSalvo', JSON.stringify(textoSalvo));
          this.items = [
            textoSalvo,
            ...this.items
          ]
        })
      }
    }
  }
</script>
<style>
.titulo-form{
  padding: 48px 0px 2px 32px;
}
.form-conteudo{
  margin: 16px 32px 32px !important;
}

.tabela{
  margin: 32px 32px !important;
}
</style>