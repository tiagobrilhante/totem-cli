<template>
  <!--container para eventos-->
  <v-container class="mt-3 pt-16" fill-height fluid>
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

    <!--Dialog para navegar pelo evento-->
    <v-dialog max-width="90%" v-model="dialogNavegaAno" scrollable>
      <v-card @contextmenu.prevent="disableRightClick" color="#7ca387">

        <!--Card Title (ANO)-->
        <v-card-title class="justify-center">
          <v-row>
            <v-col cols="1"></v-col>
            <v-col cols="10" class="text-center text-h1"><b>{{ selectedAnoEvento.ano }}</b></v-col>
            <v-col cols="1" class="text-right">
              <v-btn @click="dialogNavegaAno = false" color="grey lighten-1">X</v-btn>
            </v-col>
          </v-row>
        </v-card-title>

        <!--Card Text-->
        <v-card-text>
          <hr>

          <!-- Navegação  dentre eventos dentro do  ano-->
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

          <v-row class="mt-0">
            <!-- espaço para a imagem-->
            <v-col align-self="start" class="text-center"
                   v-if="eventoVisivel.imagem !== 'null' && eventoVisivel.imagem !== null ">

              <v-alert rounded="xl">

                <!--navegação entre imagens adicionais de um mesmo evento-->
                <v-row>
                  <v-col class="text-center">

                    <!-- btaaompara img padrao-->
                    <v-btn retain-focus-on-click v-if="!soTemUmaImagem" color="secondary" class="mb-4 mr-1"
                           @click="mostraImagemAdicional(eventoVisivel,'default')">1
                    </v-btn>

                    <!--imagens adicionais-->
                    <v-btn retain-focus-on-click color="secondary" class="mx-2 mb-4" :key="imgaddadd.id"
                           v-for="(imgaddadd, index) in eventoVisivel.imagens_adicionais"
                           @click="mostraImagemAdicional(imgaddadd, 'adicional')">
                      {{ index + 2 }}
                    </v-btn>
                  </v-col>
                </v-row>

                <v-img :height=totemConfigs.altura_detail :src="configSis.urlDownload + eventoVisivel.imagem"
                       :width=totemConfigs.largura_detail
                       class="rounded-xl ml-auto mr-auto"/>

                <!-- espaço para a fonte-->
                <v-alert v-if="eventoVisivel.fonteimagempcp !== '' && eventoVisivel.fonteimagempcp !== null"
                         color="rgb(0,0,0,0)" class="mt-2">fonte: {{ eventoVisivel.fonteimagempcp }}
                </v-alert>

                <v-alert v-if="!essaEImgEventoPcp" color="green lighten-3">
                  <h3>{{ explicacaoImgAddEvevntox }}</h3>
                </v-alert>

                <!--navegação entre imagens adicionais de um mesmo evento-->
                <v-row>
                  <v-col class="text-center">

                    <!-- btaaompara img padrao-->
                    <v-btn retain-focus-on-click v-if="!soTemUmaImagem" color="secondary" class="mt-4 mr-1"
                           @click="mostraImagemAdicional(eventoVisivel,'default')">1
                    </v-btn>

                    <!--imagens adicionais-->
                    <v-btn retain-focus-on-click color="secondary" class="mx-2 mt-4" :key="imgaddadd.id"
                           v-for="(imgaddadd, index) in eventoVisivel.imagens_adicionais"
                           @click="mostraImagemAdicional(imgaddadd, 'adicional')">
                      {{ index + 2 }}
                    </v-btn>
                  </v-col>
                </v-row>

              </v-alert>

            </v-col>

            <!-- espaço para titulo, fonte++ e legenda -->
            <v-col>

              <!--titulo e aumenta e di minui fonte-->
              <v-row>
                <v-col>
                  <v-alert rounded="xl" class="text-center text-h3">
                    <b><span class="font-preta"> {{ eventoVisivel.nome }} <span
                      v-if="eventoVisivel.dia || eventoVisivel.mes">(</span> <span
                      v-if="eventoVisivel.dia"> {{ eventoVisivel.dia }} de </span> <span
                      v-if="eventoVisivel.mes">  {{ converteNumEmMes(eventoVisivel.mes) }} </span>
                      <span v-if="eventoVisivel.dia || eventoVisivel.mes">)</span></span></b>
                  </v-alert>
                </v-col>

              </v-row>

              <br>

              <!--legenda, saiba mais e btn saiba mais-->
              <v-row>
                <v-col>
                  <v-alert color="grey lighten-2" rounded="xl"
                           v-if="eventoVisivel.legenda && eventoVisivel !== null">

                    <v-row>
                      <v-col class="text-right">
                        <v-btn @click="aumentaDimunuiFonte" color="#aeeb8a" small>{{ legendaBtnAumentaDiminui }}</v-btn>
                      </v-col>
                    </v-row>

                    <!-- texto da legenda -->
                    <v-row class="mb-1" v-if="!saibaMaisAreaVisibility">
                      <v-col :class=tamanhoTexto class="text-justify">

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

        <!-- Actions-->
        <v-card-actions class="pb-5">
          <v-spacer></v-spacer>
          <v-btn @click="dialogNavegaAno = false" color="grey lighten-1">Voltar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-container>

</template>
<script>import config from '../../http/config'

export default {

  components: {},
  data () {
    return {
      configSis: config,
      clicable: true,
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

  props: {
    totemConfigs: Object
  },

  computed: {},

  async mounted () {
    await this.getEventos()
  },
  methods: {

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
    },

    disableRightClick (event) {
      event.preventDefault() // Impede o comportamento padrão do clique com o botão direito
    }
  }
}
</script>
<style>
.font-preta {
  color: black !important;
}
</style>
