<template>
  <v-main class="bgConfig">

    <!--App Bar Config Area-->
    <v-app-bar
      app
      color="#6b5252"
    >

      <v-toolbar-title>{{ configSis.nomeSis }}
        <v-chip class="ml-4" small> {{ configSis.labelSis }}</v-chip>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn @click="retornaTotem()">Sair</v-btn>

    </v-app-bar>

    <!--Espaço para cabeçalho , adm config e adm Usuário-->
    <v-container fluid>

      <v-row>

        <!--espaço-->
        <v-col cols="1"></v-col>

        <!--cabeçalho , btn adm config e btn adm user-->
        <v-col>

          <v-row>

            <!--btn admin config-->
            <v-col align-self="center" class="text-left" cols="3">

              <v-btn rounded @click="openDialogAdmConfig" class="pt-8 pb-8">Ajustar<br>Configurações
              </v-btn>

            </v-col>

            <!--Cabeçalho-->
            <v-col class="text-center pt-5" cols="6">
              <h1 class="textlConfig">Área Administrativa</h1>
            </v-col>

            <!--btn admin user-->
            <v-col align-self="center" class="text-right" cols="3">
              <v-btn rounded @click="openDialogAdmUser" class="pt-8 pb-8">Administração<br>Usuários</v-btn>
            </v-col>

          </v-row>

        </v-col>

        <!--Espaço-->
        <v-col cols="1"></v-col>

      </v-row>

    </v-container>

    <!-- administração de eventos-->
    <AdmEventos v-if="totemConfigs.tipo_totem ==='data'"></AdmEventos>
    <AdmAssuntos v-else></AdmAssuntos>

    <!--Dialog para chamada de administrações -->
    <v-dialog max-width="70%" v-model="dialogGeneric70">

      <AdmUser v-if="selectedTypeOfContent ==='AdmUser'" @ajustarVisibilidade="dialogGeneric70 = $event"
               @adjustSelectedTypeOfContent="selectedTypeOfContent = $event"/>

      <AdmConfig v-if="selectedTypeOfContent ==='AdmConfig'" @ajustarVisibilidade="dialogGeneric70 = $event"
                 @adjustSelectedTypeOfContent="selectedTypeOfContent = $event" @ajustaTipoContent="getConfigs"/>

    </v-dialog>

  </v-main>
</template>

<script>import {logoutMixin} from '@/mixins'
import {mapGetters} from 'vuex'
import config from '../http/config'
import AdmUser from '../components/areaAdministrativa/AdmUser'
import AdmConfig from '../components/areaAdministrativa/AdmConfig'
import AdmEventos from '../components/areaAdministrativa/eventos/AdmEventos'
import AdmAssuntos from '../components/areaAdministrativa/assuntos/AdmAssuntos'

export default {
  name: 'home',
  mixins: [logoutMixin],
  components: {AdmUser, AdmConfig, AdmEventos, AdmAssuntos},
  data: vm => ({
    configSis: config,
    dialogGeneric70: false,
    totemConfigs: {
      nome_totem: '',
      altura_index: '',
      largura_index: '',
      altura_detail: '',
      largura_detail: '',
      access_code: '',
      tipo_totem: ''
    },
    dialogAdmAssunto: false,
    selectedTypeOfContent: ''
  }),
  computed: {
    ...mapGetters(['usuarioLogado'])
  },
  watch: {
  },
  async mounted () {
    await this.getConfigs()
  },
  methods: {

    async getConfigs () {
      try {
        this.$http.get('totemconfig/plus')
          .then(response => {
            this.totemConfigs = Object.assign({}, response.data)
          })
          .catch(erro => console.log(erro))
      } catch (e) {
        console.log(e)
      }
    },

    retornaTotem () {
      this.$store.commit('DESLOGAR_USUARIO')
      this.$router.push({name: 'index'})
    },

    openDialogAdmUser () {
      this.dialogGeneric70 = true
      this.selectedTypeOfContent = 'AdmUser'
    },

    openDialogAdmConfig () {
      this.dialogGeneric70 = true
      this.selectedTypeOfContent = 'AdmConfig'
    }
  }
}
</script>

<style>

.bgConfig {
  background-color: #6b5252 !important;
}

.ajusteBtn {
  margin-top: -70px;
  margin-bottom: 10px;
}

.textlConfig {
  font-family: 'Impact', sans-serif;
  color: white;
}

.textoBranco {
  color: white;
}
</style>
