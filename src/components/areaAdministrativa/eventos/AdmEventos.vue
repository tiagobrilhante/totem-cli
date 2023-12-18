<template>
  <div>

    <!--espaço administrativo-->
    <v-container fluid>

      <v-row>

        <!--espaço-->
        <v-col cols="1"></v-col>

        <!--Espaço para o conteúdo de eventos-->
        <v-col>

          <!--Configurações de conteúdo-->
          <v-alert color="rgb(255,255,255,0.4)" rounded="xl">

            <!--Cabeçalho, btn add evento SFC-->
            <v-row class="mb-3">

              <!--Cabeçalho-->
              <v-col align-self="center">
                <h3>Configurações de Conteúdo ( Datas Históricas )</h3>
              </v-col>

              <!--add evento-->
              <v-col align-self="center" class="text-right">
                <v-btn @click="openDialogAdmCadastraEditaEvento('Cadastro', {})">Adicionar Evento
                </v-btn>
              </v-col>

            </v-row>

            <v-divider></v-divider>

            <!--DataTable-->
            <v-data-table
              :headers="headersEventos"
              :items="eventos"
              :search="searchEventos"
              class="elevation-21 mt-4"
              sort-by="ano"
            >

              <!--template do topo da tabela-->
              <template v-slot:top>
                <v-toolbar
                  flat
                >
                  <v-toolbar-title>Tabela de Eventos Cadastrados</v-toolbar-title>

                  <v-divider
                    class="mx-4"
                    inset
                    vertical
                  ></v-divider>

                  <v-spacer></v-spacer>

                  <!--Pesquisar-->
                  <v-text-field
                    append-icon="mdi-magnify"
                    hide-details
                    label="Pesquisar"
                    placeholder="Pesquisar"
                    single-line
                    v-model="searchEventos"
                  ></v-text-field>

                </v-toolbar>

              </template>

              <!--Template de datas -->
              <template v-slot:item.ano="{ item }">

                <span v-if="item.dia"> {{ item.dia }}/</span><span v-if="item.mes">{{ item.mes }}/</span><span
                v-if="item.ano">{{ item.ano }}</span>

              </template>

              <!--Template de legendas -->
              <template v-slot:item.legenda="{ item }">

                <span class="text-no-wrap warning" v-if="item.legenda === '' || item.legenda === null"> ---- SEM LEGENDA ----</span>
                <span
                  v-else class="text-justify" v-html="item.legenda"></span>

                <hr>
                SAIBA MAIS:

                <span class="text-no-wrap warning" v-if="item.saibamais === '' || item.saibamais === null"><br> ---- SEM SAIBA MAIS ----</span>
                <span
                  v-else class="text-justify" v-html="item.saibamais"><br></span>

              </template>

              <!--Template de imagens -->
              <template v-slot:item.imagem="{ item }">

                <span class="text-no-wrap warning" v-if="item.imagem === null"> ---- SEM IMAGEM ----</span> <span
                v-else><v-icon @click="showImg(item)">mdi-magnify</v-icon></span>

              </template>

              <!--Template de botões para editar, excluir -->
              <template v-slot:item.actions="{ item }">

                <!--editar-->
                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon
                      @click="openDialogAdmCadastraEditaEvento('Edição', item)"
                      class=""
                      small
                      v-bind="attrs"
                      v-on="on"
                    >
                      mdi-pen
                    </v-icon>
                  </template>
                  <span>Editar Evento</span>
                </v-tooltip>
                <!--Excluir-->
                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon
                      @click="deleteEvento(item)"
                      class=""
                      small
                      v-bind="attrs"
                      v-on="on"
                    >
                      mdi-delete
                    </v-icon>
                  </template>
                  <span>Excluir evento</span>
                </v-tooltip>

              </template>

            </v-data-table>

          </v-alert>

        </v-col>

        <!--espaço-->
        <v-col cols="1"></v-col>

      </v-row>

    </v-container>

    <!--Dialog para Conteúdos-->
    <v-dialog max-width="85%" v-model="dialogGeneric70" persistent>

      <!-- CADASTRO E EDIÇÃO-->
      <AdmCadastroEditaEvento
        :typeOfAction="selectTypeOfAction" :evento="selectedEvento"
        v-if="selectedTypeOfContent ==='AdmCadastraEditaEvento'" @ajustarVisibilidade="dialogGeneric70 = $event"
        @adjustSelectedTypeOfContent="selectedTypeOfContent = $event" @ajustaTipoContent="getEventos"
        @resetaEventoSelecionado="selectedEvento = $event"

      ></AdmCadastroEditaEvento>

      <!-- auxilio na animação de fechamento do dialog-->
      <v-card v-else>
        <v-card-title class="justify-center" primary-title>
          <h3 class="text-center"></h3>
        </v-card-title>
        <v-card-text>
          <v-alert>
          </v-alert>
        </v-card-text>
      </v-card>

    </v-dialog>

    <!--Dialog para mostrar a imagem de um evento   PRECISO MELHORAR PARA MOSTRAR TB AS IMAGENS ADICIONAIS-->
    <v-dialog max-width="70%" v-model="dialogShowImagemEvento">
      <v-card>
        <v-card-title>
          Visualização de Imagem
        </v-card-title>
        <v-card-text>
          <v-img :src="this.$configSis.urlDownload + imgEventoShow"
                 class="rounded-xl v-responsive ml-auto mr-auto"/>

          <v-alert color="grey lighten-2" class="mt-2">

            <span v-if="imgEventoFonteShow !== null || imgEventoFonteShow !== ''">{{ imgEventoFonteShow }}</span>
            <span v-if="imgEventoFonteShow === null || imgEventoFonteShow === ''"> Sem Fonte</span>

          </v-alert>
        </v-card-text>
        <v-card-actions class="pb-5">
          <v-spacer></v-spacer>
          <v-btn @click="dialogShowImagemEvento = false" color="grey lighten-1">Fechar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- REVISAR -->

    <!--Dialog para deletar evento-->
    <v-dialog max-width="800px" v-model="dialogDeleteEvento">
      <v-card>
        <v-card-title class="justify-center" primary-title>
          <v-icon
            class="mr-4">
            fa fa-exclamation-triangle
          </v-icon>
          Você tem certeza que quer deletar esse evento?
          <v-icon
            class="ml-4">
            fa fa-exclamation-triangle
          </v-icon>

        </v-card-title>
        <v-card-text>
          <div class="text-center">
            Essa ação é irreversível. Tenha certeza do que está fazendo.<br>
          </div>
        </v-card-text>
        <v-card-actions class="pb-5">
          <v-spacer></v-spacer>
          <v-btn @click="dialogDeleteEvento= false" color="grey lighten-1">Cancelar</v-btn>
          <span class="pl-5 pr-5"></span>
          <v-btn @click="deleteEventoConfirm" color="red lighten-1">Excluir</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </div>
</template>

<script>import {logoutMixin} from '@/mixins'
import {mapGetters} from 'vuex'
import config from '../../../http/config'
import AdmUser from '../AdmUser'
import AdmConfig from '../AdmConfig'
import AdmCadastroEditaEvento from './AdmCadastroEditaEvento'

export default {
  name: 'home',
  mixins: [logoutMixin],
  components: {AdmUser, AdmConfig, AdmCadastroEditaEvento},
  data: vm => ({
    configSis: config,
    dialogGeneric70: false,
    eventos: [],
    headersEventos: [
      {
        text: 'Data',
        align: 'start',
        value: 'ano'
      },
      {
        text: 'Nome',
        align: 'start',
        value: 'nome'
      },
      {
        text: 'Legenda',
        value: 'legenda'
      },
      {
        text: 'Imagem',
        value: 'imagem',
        align: 'center',
        sortable: false
      },
      {
        text: 'Actions',
        value: 'actions',
        align: 'center',
        sortable: false
      }
    ],
    searchEventos: '',
    dialogShowImagemEvento: false,
    imgEventoShow: '',
    imgEventoFonteShow: '',
    dialogDeleteEvento: false,
    selectedEvento: {},
    dialogEditEvento: false,
    dialogDeleteImagemEvento: false,
    guardadorDeImg: null,
    momentoEditImg: false,
    optionsMes: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    optionsDia: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
    indexNewImgAdicionalEvento: 0,
    eventoNewImgAdicional: [],
    objetoEventoNewImgAdicional: [],
    dialogAddImagemAdicionalEvento: false,
    dialogDeleteImagemAdicionalEvento: false,
    imagemAdicionalParaDeletar: {},
    selectedTypeOfContent: '',
    selectTypeOfAction: ''
  }),
  computed: {
    ...mapGetters(['usuarioLogado'])
  },
  watch: {
    dialogDelete (val) {
      val || this.closeDelete()
    }
  },
  async mounted () {
    await this.getEventos()
  },
  methods: {

    async getEventos () {
      try {
        this.$http.get('eventos')
          .then(response => {
            this.eventos = response.data
          })
          .catch(erro => console.log(erro))
      } catch (e) {
        console.log(e)
      }
    },

    openDialogAdmCadastraEditaEvento (action, objeto) {
      this.dialogGeneric70 = true
      this.selectTypeOfAction = action
      this.selectedEvento = objeto
      if (action === 'Cadastro' || action === 'Edição') {
        this.selectedTypeOfContent = 'AdmCadastraEditaEvento'
      }
    },

    deleteEvento (item) {
      this.selectedEvento = item
      this.dialogDeleteEvento = true
    },

    deleteEventoConfirm () {
      this.$http.delete('eventos/' + this.selectedEvento.id)
        .then(() => {
          this.dialogDeleteEvento = false
          this.$toastr.s(
            'Evento removido com sucesso', 'Sucesso!'
          )
          this.getEventos()
        }, err => {
          console.log(err)
          this.$toastr.e(
            'Não foi possível remover o Evento', 'Erro!'
          )
        })
    },

    showImg (imagem) {
      this.imgEventoShow = ''
      this.imgEventoFonteShow = ''
      this.dialogShowImagemEvento = true
      this.imgEventoShow = imagem.imagem
      this.imgEventoFonteShow = imagem.fonteimagempcp
    }

  }
}
</script>

<style>
</style>
