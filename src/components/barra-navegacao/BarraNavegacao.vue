<template>
  <div>

    <v-app-bar
      app
      color="red darken-3"
    >

      <template v-slot:extension>
        <v-tabs align-with-title>
          <BarraNavegacaoQuandoLogado v-if="usuarioEstaLogado"/>
        </v-tabs>
      </template>

      <v-toolbar-title>{{ configSis.nomeSis }}
        <v-chip small class="ml-4"> {{ configSis.labelSis }}</v-chip>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <BarraNavegacaoQuandoDeslogado v-if="!usuarioEstaLogado"/>

      <BarraNavegacaoUsuarioLogado v-if="usuarioEstaLogado"/>

    </v-app-bar>

  </div>
</template>

<script>import BarraNavegacaoQuandoLogado from './BarraNavegacaoQuandoLogado'
import BarraNavegacaoQuandoDeslogado from './BarraNavegacaoQuandoDeslogado'
import BarraNavegacaoUsuarioLogado from './BarraNavegacaoUsuarioLogado'
import config from '../../http/config'
import {mapGetters} from 'vuex'

export default {
  data: () => ({
    configSis: config
  }),

  components: {
    BarraNavegacaoQuandoLogado,
    BarraNavegacaoQuandoDeslogado,
    BarraNavegacaoUsuarioLogado
  },

  computed: {

    ...mapGetters(['usuarioEstaLogado', 'usuarioLogado'])

  }
}
</script>

<style>

</style>
