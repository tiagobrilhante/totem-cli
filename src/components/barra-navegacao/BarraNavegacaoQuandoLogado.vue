<template>

  <div>
    <!--Home-->
    <v-tooltip bottom color="primary">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="ma-1"
          plain
          to="/" v-bind="attrs"
          v-if="usuarioResetado"
          v-on="on"
        >
          <v-icon center>
            mdi-home
          </v-icon>
        </v-btn>
      </template>
      <span>Página Inicial</span>
    </v-tooltip>

    <!--Administração do sistema-->
    <v-menu
      offset-y
      open-on-hover
      rounded="b-xl"
      v-if="usuarioResetado"
    >
      <template v-if="usuarioLogado.acesso.tipo ==='Admin'" v-slot:activator="{ on, attrs }">
        <v-btn
          color="white"
          plain
          v-bind="attrs"
          v-on="on"
        >
          <v-icon class="mr-5" small>fa fa-cogs</v-icon>
          Administração do Sistema
        </v-btn>
      </template>
      <!--list-->
      <v-list>
        <!--Gerenciar Oms-->
        <v-list-item to="/basicparam">
          <v-icon class="mr-5" color="black">mdi-cogs</v-icon>
          <v-list-item-title>
            Parametros Basicos Inciais
          </v-list-item-title>
        </v-list-item>
        <!--Gerenciar Usuários-->
        <v-list-item to="/usuarios">
          <v-icon class="mr-5" color="black">fa fa-users</v-icon>
          <v-list-item-title>
            Gerenciar Usuários
          </v-list-item-title>
        </v-list-item>
      </v-list>

    </v-menu>

    <!--Gerenciamento de Dados-->
    <v-menu
      offset-y
      open-on-hover
      rounded="b-xl"
      v-if="usuarioResetado"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="white"
          plain
          v-bind="attrs"
          v-on="on"
        >
          <v-icon class="mr-5" small>mdi-database</v-icon>
          Gerenciamento de Dados
        </v-btn>
      </template>
      <v-list>
        <!--Gerenciar Reformados-->
        <v-list-item to="/reformados">
          <v-icon class="mr-5" color="black">mdi-account-alert-outline</v-icon>
          <v-list-item-title>
            Gerenciar Reformados
          </v-list-item-title>
        </v-list-item>

        <!--Gerenciar Padrinhos-->
        <v-list-item to="/padrinhos">
          <v-icon class="mr-5" color="black">mdi-account-supervisor-circle</v-icon>
          <v-list-item-title>
            Gerenciar Padrinhos
          </v-list-item-title>
        </v-list-item>

        <!--gerenciar contato-->
        <v-list-item to="/contatos">
          <v-icon class="mr-5" color="black">mdi-contact-phone-outline</v-icon>
          <v-list-item-title>
            Gerenciar Contato
          </v-list-item-title>
        </v-list-item>

        <!--Gerenciar data de inspeção-->
        <v-list-item to="/datainspecao">
          <v-icon class="mr-5" color="black">mdi-calendar-account-outline</v-icon>
          <v-list-item-title>
            Gerenciar data de inspeção
          </v-list-item-title>
        </v-list-item>

        <!--Gerenciar inspeção-->
        <v-list-item to="/inspecao">
          <v-icon class="mr-5" color="black">mdi-hospital-box-outline</v-icon>
          <v-list-item-title>
            Gerenciar Inspeção
          </v-list-item-title>
        </v-list-item>

        <!--Gerenciar corte de Pagamento-->
        <v-list-item to="/">
          <v-icon class="mr-5" color="black">mdi-cash-remove</v-icon>
          <v-list-item-title>
            Gerenciar corte de pagamento
          </v-list-item-title>
        </v-list-item>

        <!--Gerenciar retorno para OM-->
        <v-list-item to="/">
          <v-icon class="mr-5" color="black">mdi-map-marker-radius-outline</v-icon>
          <v-list-item-title>
            Gerenciar Retorno para OM
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

  </div>
</template>

<script>import {logoutMixin} from '@/mixins'
import {mapGetters} from 'vuex'

export default {
  mixins: [logoutMixin],
  computed: {

    ...mapGetters(['usuarioResetado', 'usuarioLogado'])

  },
  data: () => ({}),
  mounted () {
  }
}
</script>
