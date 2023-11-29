<template>

  <v-main>

    <!--app bar-->
    <v-app-bar
      @contextmenu.prevent="disableRightClick"
      app
      color="rgb(255,255,255,0.4)"
    >

      <v-row>
        <v-col align-self="center" cols="1">
          <v-btn @click="refreshPage" rounded>
            <v-icon>mdi-reload</v-icon>
          </v-btn>
        </v-col>
        <v-col class="text-center">
          <h1>{{ totemConfigs.nome_totem }} </h1>
        </v-col>
        <v-col align-self="center" cols="1">
          <AcessoAdmPanel/>
        </v-col>
      </v-row>

    </v-app-bar>

    <div @contextmenu.prevent="disableRightClick">
      <!--container para informações default-->
      <v-container fill-height fluid v-if="totemConfigs.tipo_totem !== 'data'">

        <!--caso nao haja itens-->
        <v-row v-if="qtdAssuntos === 0">
          <v-col>
            <v-alert class="text-center mt-16" type="warning">
              Não existe conteúdo cadastrado nesse totem.
            </v-alert>
          </v-col>
        </v-row>

        <!--area de navegação-->
        <v-row v-else>

          <!--espaçador com botão voltar-->
          <v-col align-self="center" class="text-center" cols="1">
            <v-btn elevation="21" color="#eb9234" @click="ajustaPagVoltar" v-if="assuntos.current_page > 1">Voltar
            </v-btn>
          </v-col>

          <!--linhas 1 e 2 de assuntos-->
          <v-col class="">

            <!--linha 1-->
            <v-row>

              <v-col :key="la1.id" align-self="center" cols="4" v-for="la1 in linha1assuntos" v-if="la1 !== undefined">
                <v-card
                  :hover=clicable
                  color="#7ca387"
                  @click="abreAssunto(la1.id)"
                  class="ml-3 mr-3"
                  elevation="21"
                  rounded="xl"
                >

                  <v-card-text class="text-center pa-2">
                    <v-img :height=totemConfigs.altura_index :src="configSis.urlDownload + la1.banner.imagem"
                           :width=totemConfigs.largura_index
                           class="rounded-xl ml-auto mr-auto"/>

                    <v-alert class="" color="rgb(0,0,0,0)"><h2>{{ la1.nome_assunto }}</h2></v-alert>
                  </v-card-text>
                </v-card>
              </v-col>

              <v-col :key="n" align-self="center" cols="4" v-for="n in countUndefined1">
              </v-col>

            </v-row>

            <!--linha 2-->
            <v-row>
              <v-col :key="la2.id" align-self="center" cols="4" v-for="la2 in linha2assuntos" v-if="la2 !== undefined">
                <v-card
                  :hover=clicable
                  @click="abreAssunto(la2.id)"
                  class="ml-3 mr-3"
                  elevation="21"
                  rounded="xl"
                  color="#7ca387"
                >
                  <v-card-text class="text-center pa-2">

                    <v-img :height=totemConfigs.altura_index :src="configSis.urlDownload + la2.banner.imagem"
                           :width=totemConfigs.largura_index
                           class="rounded-xl ml-auto mr-auto"/>

                    <v-alert class="" color="rgb(0,0,0,0)"><h2>{{ la2.nome_assunto }}</h2></v-alert>
                  </v-card-text>
                </v-card>
              </v-col>

              <v-col :key="n" align-self="center" cols="4" v-for="n in 3-countUndefined2"
                     v-if="linha2assuntos.length === 0">
                <v-alert :height=totemConfigs.altura_index :width=totemConfigs.largura_index
                         color="rgb(0,0,0,0)"></v-alert>
              </v-col>

            </v-row>

          </v-col>

          <!--espaçador com botão avançar-->
          <v-col align-self="center" class="text-center" cols="1">
            <v-btn elevation="21" color="#eb9234" @click="ajustaPagAvanca"
                   v-if="assuntos.current_page !== assuntos.last_page">Avançar
            </v-btn>
          </v-col>

          <!--pagination-->
          <v-container fluid v-if="assuntos.last_page > 1">

            <v-pagination
              :length="assuntos.last_page"
              @input="onPageChange"
              class="pl-5 pr-5 ml-5 mr-5"
              color="success"
              v-model="assuntos.current_page"
            ></v-pagination>

          </v-container>

        </v-row>

      </v-container>

      <!--container para eventos-->
      <v-container class="mt-3 pt-16" fill-height fluid v-else>
        <v-row class="">
          <v-col></v-col>
        </v-row>

        <!--caso não haja itens-->
        <v-row v-if="eventos.length === 0">
          <v-col>
            <v-alert class="text-center mt-16" type="warning">
              Não existe conteúdo cadastrado nesse totem.
            </v-alert>
          </v-col>
        </v-row>

        <!--caso tenha itens-->
        <v-row v-else class="mt-16">

          <!--espaçador + btn voltar-->
          <v-col align-self="center" class="text-center" cols="1">
            <v-btn color="#eb9234" @click="changeEventPage(pagAtualEvento - 1)" v-if="pagAtualEvento > 1">Voltar</v-btn>
          </v-col>

          <v-col align-self="center">

            <!--linha 1 de eventos-->
            <v-row class="mb-10">

              <v-col :key="le1.id" align-self="center" cols="3" v-for="le1 in linha1eventos">

                <v-card :hover="clicable"
                        @click="openAnoEventoLista(le1)"
                        color="#7ca387"
                        class="ml-3 mr-3 align-content-center"
                        elevation="21"
                        rounded="xl">
                  <br>

                  <v-img :height=totemConfigs.altura_index :src="configSis.urlDownload + le1.imagem"
                         :width=totemConfigs.largura_index
                         class="rounded-xl text-center ml-auto mr-auto"/>

                  <v-row>

                    <v-col class="text-center">

                      <h2>{{ le1.ano }}</h2>
                    </v-col>
                  </v-row>
                  <hr>
                  <v-card color="#7ca387" class="mt-2" elevation="21">
                    <v-row>
                      <v-col>
                        <ul>
                          <li :key="ev.id" v-for="ev in le1.eventos"><strong>{{ ev.nome }}</strong></li>
                        </ul>
                      </v-col>
                    </v-row>
                  </v-card>
                </v-card>

              </v-col>
            </v-row>

            <!--linha 2 de eventos-->
            <v-row>
              <v-col :key="le2.id" align-self="center" cols="3" v-for="le2 in linha2eventos" v-if="le2 !== undefined">

                <v-card :hover="clicable"
                        @click="openAnoEventoLista(le2)"
                        class="ml-3 mr-3"
                        color="#7ca387"
                        elevation="21"
                        rounded="xl">

                  <br>

                  <v-img :height=totemConfigs.altura_index :src="configSis.urlDownload + le2.imagem"
                         :width=totemConfigs.largura_index
                         class="rounded-xl text-center ml-auto mr-auto"/>

                  <v-row>

                    <v-col class="text-center">
                      <h2>{{ le2.ano }}</h2>
                    </v-col>
                  </v-row>
                  <hr>
                  <v-card color="#7ca387" class="mt-2" elevation="21">
                    <v-row>
                      <v-col>
                        <ul>
                          <li :key="ev2.id" v-for="ev2 in le2.eventos"><strong>{{ ev2.nome }}</strong></li>
                        </ul>
                      </v-col>
                    </v-row>
                  </v-card>
                </v-card>

              </v-col>
            </v-row>

          </v-col>

          <!--espaçador + btn avançar-->
          <v-col align-self="center" class="text-center" cols="1">
            <v-btn color="#eb9234" @click="changeEventPage(pagAtualEvento + 1)" v-if="temProxPag">Avançar</v-btn>
          </v-col>

        </v-row>

      </v-container>

      <!--Dialog para navegar pelo assunto-->
      <v-dialog max-width="90%" v-model="dialogNavegaAssunto" scrollable>
        <v-card color="#7ca387" @contextmenu.prevent="disableRightClick" v-if="!objetoVazio(selectedAssunto)">

          <!--titulo e botão fechar-->
          <v-card-title class="justify-center text-center">
            <v-row>
              <v-col cols="1"></v-col>
              <v-col cols="10"><h1>{{ selectedAssunto.nome_assunto }}</h1></v-col>
              <v-col cols="1">
                <v-btn @click="dialogNavegaAssunto = false" color="grey lighten-1">X</v-btn>
              </v-col>
            </v-row>

          </v-card-title>
          <v-card-text>

            <div ref="dialogContent">
              <hr>

              <!--navegar pelas imagens internas-->
              <v-container fluid>
                <v-row>
                  <v-col>
                    <v-btn :key="imgs.id" @click="changeSelectedImg(imgs.ordem)" class="mr-5" retain-focus-on-click
                           v-for="imgs in selectedAssunto.imagens">{{ imgs.ordem }}
                    </v-btn>
                  </v-col>
                </v-row>
              </v-container>

              <!-- Área de exibição de imagem e conteúdo-->
              <v-row class="mt-2">
                <v-col align-self="start" class="text-center mt-12">

                  <v-img :height=totemConfigs.altura_detail :src="configSis.urlDownload + selectedImg.imagem"
                         :width=totemConfigs.largura_detail
                         class="rounded-xl ml-auto mr-auto"/>
                </v-col>
                <v-col v-if="selectedImg.nome !=='' || selectedImg.legenda !== '' ">

                  <!-- Título da imagem e aumenta e diminui fonte-->
                  <v-row>
                    <v-col cols="10">
                      <h2 class="font-preta">{{ selectedImg.nome }}</h2>
                    </v-col>
                    <v-col cols="2" class="text-right">
                      <v-btn @click="aumentaDimunuiFonte" color="#aeeb8a" small>{{ legendaBtnAumentaDiminui }}</v-btn>
                    </v-col>
                  </v-row>

                  <br>

                  <!-- Area do conteúdo-->
                  <v-alert color="grey lighten-2" v-if="selectedImg.legenda !== ''">

                    <!-- texto da legenda -->
                    <v-row class="mb-1" v-if="!saibaMaisAreaVisibility">
                      <v-col :class=tamanhoTexto>
                        <span v-html="selectedImg.legenda"> </span>
                      </v-col>
                    </v-row>

                    <!-- texto do saiba mais -->
                    <v-row v-if="saibaMaisAreaVisibility">
                      <v-col>
                        <div :class="tamanhoTexto" v-html="selectedImg.saibamais"/>
                      </v-col>
                    </v-row>

                    <!-- botao saiba mais-->
                    <hr v-if="selectedImg.saibamais">
                    <v-row class="mt-1" v-if="selectedImg.saibamais">
                      <v-col class="text-right">
                        <v-btn @click="abreSaibaMais">{{ saibaMaisTextButton }}</v-btn>
                      </v-col>
                    </v-row>

                  </v-alert>
                </v-col>
              </v-row>

              <br><br>

              <!--navegar pelas imagens internas-->
              <v-container fluid>
                <v-row>
                  <v-col>
                    <v-btn :key="imgs.id" @click="changeSelectedImg(imgs.ordem)" class="mr-5" retain-focus-on-click
                           v-for="imgs in selectedAssunto.imagens">{{ imgs.ordem }}
                    </v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </div>

          </v-card-text>
          <v-card-actions class="pb-5">
            <v-spacer></v-spacer>
            <v-btn @click="dialogNavegaAssunto = false" color="grey lighten-1">Voltar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!--Dialog para navegar pelo evento-->
      <v-dialog max-width="90%" v-model="dialogNavegaAno" scrollable>
        <v-card @contextmenu.prevent="disableRightClick" color="#7ca387">
          <v-card-title class="justify-center">
            <v-row>
              <v-col cols="1"></v-col>
              <v-col cols="10" class="text-center text-h1"><b>{{ selectedAnoEvento.ano }}</b></v-col>
              <v-col cols="1" class="text-right">
                <v-btn @click="dialogNavegaAno = false" color="grey lighten-1">X</v-btn>
              </v-col>
            </v-row>
          </v-card-title>
          <v-card-text>
            <hr>

            <v-row class="mt-1"
                   v-if="Object.keys(selectedAnoEvento).length !== 0 && selectedAnoEvento.eventos.length > 1">
              <v-col>
                <v-btn :key="evento.id" @click="mostraEventoSelecionado(index)" class="mr-5 mb-3" color="primary"
                       v-for="(evento, index) in selectedAnoEvento.eventos"> {{
                    evento.nome
                  }}
                </v-btn>
              </v-col>
            </v-row>

            <v-row class="mt-2">
              <!-- espaço para a imagem-->
              <v-col align-self="start" class="text-center"
                     v-if="eventoVisivel.imagem !== 'null' && eventoVisivel.imagem !== null ">

                <v-row class="mb-4">
                  <v-col class="text-left">
                    <v-btn class="mx-2" v-if="!soTemUmaImagem"
                           @click="mostraImagemAdicional(eventoVisivel,'default')">1
                    </v-btn>
                    <v-btn class="mx-2" :key="imgaddadd.id"
                           v-for="(imgaddadd, index) in eventoVisivel.imagens_adicionais"
                           @click="mostraImagemAdicional(imgaddadd, 'adicional')">
                      {{ index + 2 }}
                    </v-btn>
                  </v-col>
                </v-row>

                <v-img :height=totemConfigs.altura_detail :src="configSis.urlDownload + eventoVisivel.imagem"
                       :width=totemConfigs.largura_detail
                       class="rounded-xl ml-auto mr-auto"/>
                <v-alert v-if="eventoVisivel.fonteimagempcp !== '' && eventoVisivel.fonteimagempcp !== null"
                         color="rgb(0,0,0,0)" class="mt-2">fonte: {{ eventoVisivel.fonteimagempcp }}
                </v-alert>

                <v-alert v-if="!essaEImgEventoPcp">
                  <h3>{{ explicacaoImgAddEvevntox }}</h3>
                </v-alert>

                <v-row class="mb-4">
                  <v-col class="text-left">
                    <v-btn class="mx-2" v-if="!soTemUmaImagem"
                           @click="mostraImagemAdicional(eventoVisivel,'default')">1
                    </v-btn>
                    <v-btn class="mx-2" :key="imgaddadd.id"
                           v-for="(imgaddadd, index) in eventoVisivel.imagens_adicionais"
                           @click="mostraImagemAdicional(imgaddadd, 'adicional')">
                      {{ index + 2 }}
                    </v-btn>
                  </v-col>
                </v-row>

              </v-col>

              <!-- espaço para titulo, fonte++ e legenda -->
              <v-col>

                <!--titulo e aumenta e di minui fonte-->
                <v-row>
                  <v-col cols="10">
                    <h1 class="font-preta"> {{ eventoVisivel.nome }} <span
                      v-if="eventoVisivel.dia || eventoVisivel.mes">(</span> <span
                      v-if="eventoVisivel.dia"> {{ eventoVisivel.dia }} de </span> <span
                      v-if="eventoVisivel.mes">  {{ converteNumEmMes(eventoVisivel.mes) }} </span>
                      <span v-if="eventoVisivel.dia || eventoVisivel.mes">)</span></h1>
                  </v-col>
                  <v-col cols="2" class="text-right">
                    <v-btn @click="aumentaDimunuiFonte" color="#aeeb8a" small>{{ legendaBtnAumentaDiminui }}</v-btn>
                  </v-col>
                </v-row>

                <br>

                <!--legenda, saiba mais e btn saiba mais-->
                <v-row>
                  <v-col>
                    <v-alert color="grey lighten-2"
                             v-if="eventoVisivel.legenda && eventoVisivel !== null">

                      <!-- texto da legenda -->
                      <v-row class="mb-1" v-if="!saibaMaisAreaVisibility">
                        <v-col :class=tamanhoTexto>

                          <div v-html="eventoVisivel.legenda">
                          </div>

                        </v-col>
                      </v-row>

                      <!-- texto do saiba mais -->
                      <v-row v-if="saibaMaisAreaVisibility">
                        <v-col class="text-justify">
                          <div :class="tamanhoTexto" v-html="eventoVisivel.saibamais">
                          </div>
                        </v-col>
                      </v-row>

                      <!-- botao saiba mais-->
                      <hr v-if="eventoVisivel.saibamais">
                      <v-row class="mt-1" v-if="eventoVisivel.saibamais">
                        <v-col class="text-right">
                          <v-btn @click="abreSaibaMais">{{ saibaMaisTextButton }}</v-btn>
                        </v-col>
                      </v-row>

                    </v-alert>
                  </v-col>
                </v-row>

              </v-col>
            </v-row>

          </v-card-text>
          <v-card-actions class="pb-5">
            <v-spacer></v-spacer>
            <v-btn @click="dialogNavegaAno = false" color="grey lighten-1">Voltar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

    </div>
  </v-main>

</template>

<script>import config from '../http/config'
import AcessoAdmPanel from '.././components/areaAdministrativa/AcessoAdmPanel'

export default {

  components: {
    AcessoAdmPanel
  },
  data () {
    return {
      configSis: config,
      clicable: true,
      usuario: {},
      totemConfigs: {},
      assuntos: [],
      qtdAssuntos: 0,
      linha1assuntos: [],
      linha2assuntos: [],
      countUndefined1: 0,
      countUndefined2: 0,
      dialogNavegaAssunto: false,
      selectedAssunto: {},
      selectedImg: {},
      // teste
      eventos: [],
      qtdEventos: 0,
      linha1eventos: [],
      linha2eventos: [],
      countUndefinedEE1: 0,
      countUndefinedEE2: 0,
      pagAtualEvento: 0,
      temProxPag: false,
      dialogNavegaAno: false,
      selectedAnoEvento: {},
      eventoVisivel: {},
      tamanhoTexto: 'text-h5',
      legendaBtnAumentaDiminui: 'A--',
      saibamaisevent: '',
      saibaMaisAreaVisibility: false,
      saibaMaisTextButton: 'SAIBA MAIS...',
      objPcpEventoParaImagemAdicional: {},
      essaEImgEventoPcp: true,
      explicacaoImgAddEvevntox: '',
      soTemUmaImagem: true
    }
  },
  watch: {},

  computed: {},

  async mounted () {
    await this.getConfigs()
  },
  methods: {

    async getConfigs () {
      try {
        this.$http.get('totemconfig')
          .then(response => {
            this.totemConfigs = Object.assign({}, response.data)
            if (this.totemConfigs.tipo_totem === 'data') {
              this.getEventos()
            } else {
              this.getAssuntos()
            }
          })
          .catch(erro => console.log(erro))
      } catch (e) {
        console.log(e)
      }
    },

    async getAssuntos () {
      this.linha1assuntos = []
      this.linha2assuntos = []
      try {
        this.$http.get('assunto/principal?page=' + this.assuntos.current_page)
          .then(response => {
            this.assuntos = response.data
            this.qtdAssuntos = this.assuntos.data.length
            if (this.assuntos.data.length !== 0 && this.assuntos.data.length <= 3 > 0) {
              for (let i = 0; i < 3; i++) {
                if (this.assuntos.data[i].imagens.length !== 0) {
                  this.linha1assuntos.push(this.assuntos.data[i])
                }
              }
              this.linha2assuntos = []
            } else {
              for (let i = 0; i < 3; i++) {
                this.linha1assuntos.push(this.assuntos.data[i])
              }
              for (let i = 3; i < 6; i++) {
                if (this.assuntos.data[i].imagens.length !== 0) {
                  this.linha2assuntos.push(this.assuntos.data[i])
                }
              }
            }
            let ajuste1 = 0
            let ajuste2 = 0
            for (let i = 0; i < this.linha1assuntos.length; i++) {
              if (this.linha1assuntos[i] === undefined) {
                ajuste1++
              }
            }
            for (let i = 0; i < this.linha2assuntos.length; i++) {
              if (this.linha2assuntos[i] === undefined) {
                ajuste2++
              }
            }
            this.countUndefined1 = ajuste1
            this.countUndefined2 = ajuste2
          })
          .catch(erro => console.log(erro))
      } catch (e) {
        console.log(e)
      }
    },

    async getEventos () {
      this.linha1eventos = []
      this.linha2eventos = []
      try {
        this.$http.get('evento/principal')
          .then(response => {
            this.eventos = response.data[0]
            this.pagAtualEvento = response.data[1]
            this.temProxPag = response.data[2]
            this.qtdEventos = this.eventos.length
            if (this.eventos.length !== 0 && this.eventos.length <= 3 > 0) {
              for (let i = 0; i < 4; i++) {
                if (this.eventos[i] !== undefined) {
                  this.linha1eventos.push(this.eventos[i])
                }
              }
              this.linha2eventos = []
            } else {
              for (let i = 0; i < 4; i++) {
                this.linha1eventos.push(this.eventos[i])
              }
              for (let i = 4; i < 8; i++) {
                if (this.eventos[i] !== undefined) {
                  this.linha2eventos.push(this.eventos[i])
                }
              }
            }
            let ajuste1 = 0
            let ajuste2 = 0
            for (let i = 0; i < this.linha1eventos.length; i++) {
              if (this.linha1eventos[i] === undefined) {
                ajuste1++
              }
            }
            for (let i = 0; i < this.linha2eventos.length; i++) {
              if (this.linha2eventos[i] === undefined) {
                ajuste2++
              }
            }
            this.countUndefinedEE1 = ajuste1
            this.countUndefinedEE2 = ajuste2
          })
          .catch(erro => console.log(erro))
      } catch (e) {
        console.log(e)
      }
    },

    onPageChange () {
      this.getAssuntos()
    },

    abreAssunto (assuntoId) {
      this.dialogNavegaAssunto = true
      this.tamanhoTexto = 'text-h5'
      this.legendaBtnAumentaDiminui = 'A--'
      this.saibamaisevent = ''
      this.saibaMaisAreaVisibility = false
      this.saibaMaisTextButton = 'SAIBA MAIS...'
      this.selectedAssunto = {}
      this.selectedImg = {}
      for (let i = 0; i < this.assuntos.data.length; i++) {
        if (this.assuntos.data[i].id === assuntoId) {
          this.selectedAssunto = this.assuntos.data[i]
          this.selectedImg = this.assuntos.data[i].imagens[0]
        }
      }
    },

    objetoVazio (obj) {
      for (let prop in obj) {
        if (obj.hasOwnProperty(prop)) return false
      }
      return true
    },

    changeSelectedImg (ordem) {
      this.saibamaisevent = ''
      this.saibaMaisAreaVisibility = false
      this.saibaMaisTextButton = 'SAIBA MAIS...'
      for (let i = 0; i < this.selectedAssunto.imagens.length; i++) {
        if (this.selectedAssunto.imagens[i].ordem === ordem) {
          this.selectedImg = this.selectedAssunto.imagens[i]
        }
      }
    },

    ajustaPagVoltar () {
      if (this.totemConfigs.tipo_totem !== 'data') {
        if (this.assuntos.current_page >= this.assuntos.last_page) {
          this.assuntos.current_page--
          this.onPageChange()
        }
      }
    },

    ajustaPagAvanca () {
      if (this.assuntos.current_page < this.assuntos.last_page) {
        this.assuntos.current_page++
        this.onPageChange()
      }
    },

    changeEventPage (pagina) {
      this.eventos = []
      this.linha1eventos = []
      this.linha2eventos = []
      try {
        this.$http.get('evento/principal/porpag/' + pagina)
          .then(response => {
            this.eventos = response.data[0]
            this.pagAtualEvento = response.data[1]
            this.temProxPag = response.data[2]
            this.qtdEventos = this.eventos.length
            if (this.eventos.length !== 0 && this.eventos.length <= 3 > 0) {
              for (let i = 0; i < 4; i++) {
                if (this.eventos[i] !== undefined) {
                  this.linha1eventos.push(this.eventos[i])
                }
              }
              this.linha2eventos = []
            } else {
              for (let i = 0; i < 4; i++) {
                this.linha1eventos.push(this.eventos[i])
              }
              for (let i = 4; i < 8; i++) {
                if (this.eventos[i] !== undefined) {
                  this.linha2eventos.push(this.eventos[i])
                }
              }
            }
            let ajuste1 = 0
            let ajuste2 = 0
            for (let i = 0; i < this.linha1eventos.length; i++) {
              if (this.linha1eventos[i] === undefined) {
                ajuste1++
              }
            }
            for (let i = 0; i < this.linha2eventos.length; i++) {
              if (this.linha2eventos[i] === undefined) {
                ajuste2++
              }
            }
            this.countUndefinedEE1 = ajuste1
            this.countUndefinedEE2 = ajuste2
          })
          .catch(erro => console.log(erro))
      } catch (e) {
        console.log(e)
      }
    },

    openAnoEventoLista (evento) {
      this.dialogNavegaAno = true
      this.selectedAnoEvento = evento
      this.mostraEventoSelecionado(0)
    },

    mostraEventoSelecionado (index) {
      this.tamanhoTexto = 'text-h5'
      this.legendaBtnAumentaDiminui = 'A--'
      this.saibamaisevent = ''
      this.saibaMaisAreaVisibility = false
      this.saibaMaisTextButton = 'SAIBA MAIS...'
      this.eventoVisivel = this.selectedAnoEvento.eventos[index]
      this.essaEImgEventoPcp = true
      this.objPcpEventoParaImagemAdicional = {}
      this.objPcpEventoParaImagemAdicional = this.eventoVisivel
      if (this.eventoVisivel.imagens_adicionais.length === 0) {
        this.soTemUmaImagem = true
      } else {
        this.soTemUmaImagem = false
      }
    },

    disableRightClick (event) {
      event.preventDefault() // Impede o comportamento padrão do clique com o botão direito
    },

    converteNumEmMes (num) {
      if (num === 1) {
        return 'Janeiro'
      } else if (num === 2) {
        return 'Fevereiro'
      } else if (num === 3) {
        return 'Março'
      } else if (num === 4) {
        return 'Abril'
      } else if (num === 5) {
        return 'Maio'
      } else if (num === 6) {
        return 'Junho'
      } else if (num === 7) {
        return 'Julho'
      } else if (num === 8) {
        return 'Agosto'
      } else if (num === 9) {
        return 'Setembro'
      } else if (num === 10) {
        return 'Outubro'
      } else if (num === 11) {
        return 'Novembro'
      } else {
        return 'Dezembro'
      }
    },

    refreshPage () {
      location.reload()
    },

    aumentaDimunuiFonte () {
      if (this.legendaBtnAumentaDiminui === 'A++') {
        this.tamanhoTexto = 'text-h5'
        this.legendaBtnAumentaDiminui = 'A--'
      } else {
        this.tamanhoTexto = ''
        this.legendaBtnAumentaDiminui = 'A++'
      }
    },

    abreSaibaMais () {
      if (this.saibaMaisAreaVisibility === false) {
        this.saibamaisevent = this.eventoVisivel.saibamais
        this.saibaMaisAreaVisibility = true
        this.saibaMaisTextButton = 'Ocultar informações adicionais.'
      } else {
        this.saibamaisevent = ''
        this.saibaMaisAreaVisibility = false
        this.saibaMaisTextButton = 'SAIBA MAIS...'
      }
    },

    mostraImagemAdicional (objeto, tipo) {
      // Cria uma cópia do objeto eventoVisivel
      const eventoVisivelCopia = Object.assign({}, this.eventoVisivel)

      // Modifica a imagem e a fonte da cópia
      if (tipo === 'default') {
        this.essaEImgEventoPcp = true
        eventoVisivelCopia.imagem = this.objPcpEventoParaImagemAdicional.imagem
        eventoVisivelCopia.fonteimagempcp = this.objPcpEventoParaImagemAdicional.fonteimagempcp
      } else {
        this.essaEImgEventoPcp = false
        eventoVisivelCopia.imagem = objeto.imagem
        eventoVisivelCopia.fonteimagempcp = objeto.fonte
        this.explicacaoImgAddEvevntox = objeto.descricao
      }

      // Altera o estado do componente com a cópia do objeto
      this.eventoVisivel = eventoVisivelCopia
    }
  }
}
</script>
<style>
.font-preta {
  color: black !important;
}
</style>
