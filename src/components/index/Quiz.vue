<template>
  <v-main @contextmenu.prevent="disableRightClick">

    <!-- espaço destinado a mostrar as opções de quiz disponíveis-->
    <v-row v-for="quiz in quizzes" v-if="Object.keys(selectedQuiz).length === 0" :key="quiz.id">
      <v-col>
        <v-alert elevation="21" rounded="xl">
          <v-row>
            <v-col><span v-html="quiz.cabecalho"></span></v-col>
            <v-col cols="2">
              <v-btn block color="success" rounded x-large @click="pegaQuizEspecifico(quiz.id)">Iniciar o quiz!</v-btn>
            </v-col>
          </v-row>
        </v-alert>
      </v-col>
    </v-row>

    <!--- espaço para renderização do quiz propriamente dito-->
    <v-row v-if="Object.keys(selectedQuiz).length > 0">
      <v-col>
        <v-alert v-if="!scoreQuizWindow" elevation="21" rounded="xl">

          <!--cabecalho e cancelarquiz-->
          <v-row>
            <v-col></v-col>
            <v-col class="text-center"><h2>QUIZ</h2></v-col>
            <v-col class="text-right">
              <v-btn color="error" @click="cancelaQuiz">Cancelar Quiz</v-btn>
            </v-col>
          </v-row>

          <!-- perguntas e respostas-->
          <v-row v-for="myQuiz in selectedQuiz.perguntas" :key="myQuiz.id">

            <v-col>
              <!-- enunciado da pergunta-->
              <h2><b><span v-html="myQuiz.enunciado"></span></b></h2>

              <!-- respostas cadastradas-->
              <v-radio-group v-model="respostasEscolhidas[myQuiz.id]"
                             :rules="[v => !!v || 'Uma opção deve ser selecionada']">
                <v-radio
                  v-for="resposta in myQuiz.respostas"
                  :key="resposta.id" :label="resposta.resposta"
                  :value="resposta.id"
                  @change="removeMsgErro"
                ></v-radio>
              </v-radio-group>

            </v-col>

          </v-row>

          <!-- enviar e erro-->
          <v-row>
            <v-col cols="3">
              <v-btn block color="success" rounded x-large @click="enviaquiz">Enviar respostas</v-btn>
            </v-col>
            <v-col>
              <v-alert v-if="errorMsgQuiz !== ''" elevation="21" rounded="xl" type="error">
                {{ errorMsgQuiz }}
              </v-alert>
            </v-col>
          </v-row>

        </v-alert>

        <!-- exibe o score quando finaliza o quiz-->
        <v-alert v-if="scoreQuizWindow">

          <v-alert color="success" elevation="21">
            <v-row>
              <v-col class="text-center">
                <br>

                <h1> {{ msgRetornoQuiz }} </h1>

                <br>

              </v-col>
            </v-row>

          </v-alert>

          <!-- sumário-->
          <v-alert elevation="21">
            <h2>Sumário:</h2>
            <br><br>
            <v-row>
              <v-col>
                <h2>
                  <span v-if="numAcertos === 0">Você não acertou nenhuma questão.</span>
                  <span v-else-if="numAcertos === 1">Você acertou uma questão.</span>
                  <span v-else>Você acertou {{ numAcertos }} questões.</span>

                </h2>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <h2>Sua Pontuação foi: {{ scoreQuiz }} de {{ this.selectedQuiz.maxscore }} ({{ porcentagemComparada }}
                  %)</h2>
              </v-col>
            </v-row>
          </v-alert>

          <v-alert elevation="21">
            <v-row>
              <v-col><h2>Opções:</h2></v-col>
            </v-row>
            <br><br><br>
            <v-row>
              <v-col>
                <v-btn block color="secondary" rounded x-large @click="selectedQuiz={}">Voltar para a tela de seleção de
                  Quiz
                </v-btn>
              </v-col>
              <v-col>
                <v-btn block color="success" rounded x-large @click="resetQuiz">Tentar novamente</v-btn>
              </v-col>
            </v-row>

          </v-alert>
        </v-alert>

      </v-col>
    </v-row>

  </v-main>
</template>
<script>import config from '../../http/config'

export default {

  components: {},
  data () {
    return {
      configSis: config,
      quizzes: [],
      selectedQuiz: {},
      respostasEscolhidas: {},
      errorMsgQuiz: '',
      scoreQuizWindow: false,
      scoreQuiz: 0,
      numAcertos: 0,
      msgRetornoQuiz: '',
      porcentagemComparada: 0
    }
  },
  watch: {},

  computed: {},

  async mounted () {
    await this.getQuizzes()
  },
  methods: {

    async getQuizzes () {
      try {
        this.$http.get('admquiz/pegaquiz')
          .then(response => {
            this.quizzes = response.data
            this.selectedQuiz = {}
            this.scoreQuizWindow = false
          })
          .catch(erro => console.log(erro))
      } catch (e) {
        console.log(e)
      }
    },

    pegaQuizEspecifico (id) {
      try {
        this.$http.get('admquiz/pegaquizpcp/' + id)
          .then(response => {
            this.selectedQuiz = response.data
            this.scoreQuizWindow = false
          })
          .catch(erro => console.log(erro))
      } catch (e) {
        console.log(e)
      }
    },

    disableRightClick (event) {
      event.preventDefault() // Impede o comportamento padrão do clique com o botão direito
    },

    refreshPage () {
      location.reload()
    },

    cancelaQuiz () {
      this.selectedQuiz = {}
    },

    removeMsgErro () {
      this.errorMsgQuiz = ''
    },

    resetQuiz () {
      this.scoreQuizWindow = false
      this.respostasEscolhidas = {}
    },

    enviaquiz () {
      const totalPerguntas = this.selectedQuiz.perguntas.length
      const totalRespostas = Object.keys(this.respostasEscolhidas).length
      const todasRespondidas = totalPerguntas === totalRespostas &&
        Object.values(this.respostasEscolhidas).every(resposta => resposta != null)

      if (!todasRespondidas) {
        this.errorMsgQuiz = 'Responda a todas as perguntas!'
        return
      }
      try {
        this.$http.post('admquiz/enviarespostas/' + this.selectedQuiz.id, this.respostasEscolhidas)
          .then(response => {
            this.scoreQuizWindow = true
            this.scoreQuiz = response.data[1]
            this.numAcertos = response.data[0]

            /* Parâmetros
            variações de maxscore em %
            se for :
             menor que 30% - Sua pontuação foi baixa! Navegue pelo conteúdo para aprender mais!
            entre 31% e 60% - É um bom começo! Navegue pelo conteúdo para aprender mais!
            entre 61% e 85% - Muito bem! Navegue pelo conteúdo para aprender mais
            acima de 86 % - Parabéns! Sua pontuação foi ótima
             */

            const verificacaoPorcentagem = (this.scoreQuiz * 100) / this.selectedQuiz.maxscore

            if (verificacaoPorcentagem <= 30) {
              this.msgRetornoQuiz = 'Sua pontuação foi baixa! Navegue pelo conteúdo para aprender mais!'
            } else if (verificacaoPorcentagem > 30 && verificacaoPorcentagem <= 60) {
              this.msgRetornoQuiz = 'É um bom começo! Navegue pelo conteúdo para aprender mais!'
            } else if (verificacaoPorcentagem > 60 && verificacaoPorcentagem <= 85) {
              this.msgRetornoQuiz = 'Muito bem! Navegue pelo conteúdo para aprender mais!'
            } else if (verificacaoPorcentagem > 85) {
              this.msgRetornoQuiz = 'Parabéns! Sua pontuação foi ótima!'
            }

            this.porcentagemComparada = verificacaoPorcentagem
          })
          .catch(erro => console.log(erro))
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
<style scoped>
.toast-container {
  min-width: 350px !important; /* Ajuste para a largura desejada */
  max-width: 600px !important; /* Ajuste para a largura máxima desejada, se necessário */
}

.toast .toast-message {
  font-size: 60px !important; /* Ajuste para o tamanho da fonte desejado */
}
</style>
