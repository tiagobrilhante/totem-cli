<template>
  <!--container para informações default-->
  <v-container fill-height fluid>

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

    <!--Dialog para navegar pelo assunto-->
    <v-dialog max-width="90%" v-model="dialogNavegaAssunto" scrollable>
      <v-card color="#7ca387" @contextmenu.prevent="disableRightClick" v-if="!objetoVazio(selectedAssunto)">

        <!--titulo e botão fechar-->
        <v-card-title class="justify-center text-center">
          <v-row>
            <v-col cols="1"></v-col>
            <v-col cols="10" class="text-h2"><b>{{ selectedAssunto.nome_assunto }}</b></v-col>
            <v-col cols="1">
              <v-btn @click="dialogNavegaAssunto = false" color="grey lighten-1">X</v-btn>
            </v-col>
          </v-row>

        </v-card-title>

        <!-- card Text-->
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

              <!--imagem e fonte-->
              <v-col align-self="start" class="text-center">

                <v-alert rounded="xl">

                  <v-img :height=totemConfigs.altura_detail :src="configSis.urlDownload + selectedImg.imagem"
                         :width=totemConfigs.largura_detail
                         class="rounded-xl ml-auto mr-auto"/>

                </v-alert>

                <v-alert v-if="selectedImg.fonte" rounded="xl"><b>Fonte: </b> {{ selectedImg.fonte }}</v-alert>
              </v-col>

              <!--Se tem nome (titulo da imagem) ou se tem legenda-->
              <v-col v-if="selectedImg.nome !=='' || selectedImg.legenda !== '' ">

                <!-- Título da imagem e aumenta e diminui fonte-->
                <v-row>
                  <v-col class="text-center">
                    <v-alert color="grey lighten-2" rounded="xl">
                      <span class="text-h3 font-preta">{{ selectedImg.nome }}</span>
                    </v-alert>

                  </v-col>

                </v-row>

                <!-- Area do conteúdo-->
                <v-alert rounded="xl" color="grey lighten-2" v-if="selectedImg.legenda !== ''" class="text-justify">

                  <v-row class="mt-2 mr-1">
                    <v-col class="text-right">
                      <v-btn @click="aumentaDimunuiFonte" color="#aeeb8a" small>{{ legendaBtnAumentaDiminui }}</v-btn>
                    </v-col>
                  </v-row>

                  <!-- texto da legenda -->
                  <v-row class="mb-1" v-if="!saibaMaisAreaVisibility">

                    <v-row class="ml-2 mr-2">
                      <v-col :class=tamanhoTexto>
                        <span v-html="selectedImg.legenda"> </span>
                      </v-col>
                    </v-row>
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

            <!--navegar pelas imagens internas-->
            <v-container fluid class="">
              <v-row no-gutters>
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

  </v-container>
</template>

<script>import config from '../../http/config'

export default {

  components: {},
  data () {
    return {
      configSis: config,
      clicable: true,
      usuario: {},
      assuntos: [],
      qtdAssuntos: 0,
      linha1assuntos: [],
      linha2assuntos: [],
      countUndefined1: 0,
      countUndefined2: 0,
      dialogNavegaAssunto: false,
      selectedAssunto: {},
      selectedImg: {},
      tamanhoTexto: 'text-h5',
      legendaBtnAumentaDiminui: 'A--',
      saibamais: '',
      saibaMaisAreaVisibility: false,
      saibaMaisTextButton: 'SAIBA MAIS...',
      essaEImgEventoPcp: true
    }
  },
  props: {
    totemConfigs: Object
  },
  watch: {},

  computed: {},

  async mounted () {
    await this.getAssuntos()
  },
  methods: {
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

    onPageChange () {
      this.getAssuntos()
    },

    abreAssunto (assuntoId) {
      this.dialogNavegaAssunto = true
      this.tamanhoTexto = 'text-h5'
      this.legendaBtnAumentaDiminui = 'A--'
      this.saibamais = ''
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
      this.saibamais = ''
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
        this.saibamais = this.selectedImg.saibamais
        this.saibaMaisAreaVisibility = true
        this.saibaMaisTextButton = 'Ocultar informações adicionais.'
      } else {
        this.saibamais = ''
        this.saibaMaisAreaVisibility = false
        this.saibaMaisTextButton = 'SAIBA MAIS...'
      }
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
