<template v-if="dadosCarregados">
  <div>
    <template>
      <h2 class="subtitle-1 titulo-form font-weight-medium">Adicione seu texto aqui</h2>
      <v-form
        ref="form"
        v-model="valid"
        @submit.prevent="salvarNovoTexto"
      >
        <div class="form-conteudo">
          <v-text-field
            v-model="texto.title"
            :rules="tituloRules"
            label="Título"
            required
          ></v-text-field>

          <v-text-field
            v-model="texto.body"
            :rules="descricaoRules"
            label="Descrição"
            required
          ></v-text-field>
          <div class="btns-form">
            <v-btn
              color="success"
              class="mr-4"
              :disabled="!valid"
              @click="salvarNovoTexto"
            >
              Salvar
            </v-btn>

            <v-btn
              color="error"
              class="mr-4"
              :disabled="!valid"
              @click="limparForm"
            >
              Limpar Formulário
            </v-btn>
          </div>
        </div>

      </v-form>
    </template>
    <v-divider
        class="mx-4"
    ></v-divider>
    <h2 class="subtitle-1 titulo-form font-weight-medium">Listagem de textos</h2>
    
    <v-simple-table 
      class="tabela"
    >
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Título</th>
            <th class="text-left">Descrição</th>
            <th class="text-left">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.id">
            <td>{{ item.title }}</td>
            <td>{{ item.body }}</td>
            <td>
              <v-icon
                small
                class="text-end"
                @click="atualizarTextos(item)"
              >
                mdi-pencil
              </v-icon>
              <v-icon
                small
                class="text-end"
                @click="removerTextos(item)"
              >
                mdi-delete
              </v-icon>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
  import Textos from '../services/textos';
  export default {
    name: 'Tabela',

    data: () => ({
      items: [],
      valid: true,
      tituloRules: [
        v => !!v || 'Insira um título',
      ],
      descricaoRules: [
        v => !!v || 'Insira uma descrição',
      ],
      dadosCarregados: false,
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
        }).catch( err => {
          console.log(err.response);
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

      atualizarTextos(texto){
        this.texto = texto
      },

      limparForm () {
        this.$refs.form.reset()
      },

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
.btns-form{
  margin-top: 16px;
}
.tabela{
  margin: 32px 32px !important;
}
</style>