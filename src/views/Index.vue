<template>

  <v-main>

    <!--app bar / NOME DO TOTEM (posso isolar esse componente)-->
    <v-app-bar
      @contextmenu.prevent="disableRightClick"
      app
      color="rgb(255,255,255,0.4)"
    >

      <v-row>

        <!--botão para refresh da página-->
        <v-col align-self="center" cols="1">
          <v-btn @click="refreshPage" rounded>
            <v-icon>mdi-reload</v-icon>
          </v-btn>
        </v-col>

        <!--nome do totem-->
        <v-col class="text-center">
          <h1>{{ totemConfigs.nome_totem }} </h1>
        </v-col>

        <!-- ppopup de acesso administrativo-->
        <v-col align-self="center" cols="1">
          <AcessoAdmPanel/>
        </v-col>
      </v-row>

    </v-app-bar>

    <!--area de conteúdo-->
    <div @contextmenu.prevent="disableRightClick">

      <!-- conteúdo para Eventos-->
      <Evento :totemConfigs="totemConfigs" v-if="totemConfigs.tipo_totem === 'data'"></Evento>

      <!-- conteúdo para outros assuntos - CURIOSIDADES-->
      <Assunto :totemConfigs="totemConfigs" v-else></Assunto>

    </div>

  </v-main>

</template>

<script>import config from '../http/config'
import AcessoAdmPanel from '.././components/areaAdministrativa/AcessoAdmPanel'
import Assunto from '../components/index/Assunto'
import Evento from '../components/index/Evento'

export default {

  components: {
    AcessoAdmPanel,
    Assunto,
    Evento
  },
  data () {
    return {
      configSis: config,
      clicable: true,
      usuario: {},
      totemConfigs: {}
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
    }
  }
}
</script>
<style>
</style>
