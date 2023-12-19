<template>

  <v-footer
    app
    class="ma-0 pa-0"
    color="#424240"
  >

    <v-row no-gutters>
      <v-col class="text-center">
        <span
          class="caption">{{ configSis.nomeSis }} <v-btn @click="dialogVersoes = true" class="pa-0 ma-0" link plain
                                                         x-small>({{ configSis.versaoSis }})</v-btn> - Todos os direitos reservados / {{
            new Date().getFullYear()
          }} — <strong>Criado por: <v-btn
            @click="dialogProgramador = true" class="pa-0 ma-0" link plain
            x-small>{{ configSis.criador }}</v-btn></strong></span>
      </v-col>
    </v-row>

    <!--Dialog para ver detalhes de versão-->
    <v-dialog max-width="70%" v-model="dialogVersoes">

      <v-card>

        <v-card-title class="justify-center" primary-title>

          Detalhe de Versões

        </v-card-title>

        <v-card-text>

          <ul>

            <li class="mt-4"><b>Versão 2.1 r110 - 20/12/2023 (LATEST)</b>
              <ul>
                <li>Liberado o acesso ao histórico de alterações</li>
                <li>Correção de bugs</li>
                <li>Refatoração dos componentes, permitindo maior legibilidade para desenvolvedores</li>
                <li>Melhoria da interface gráfica</li>
                <li>Implementado o menu administrativo separado do conteúdo da landpage</li>
                <li>Agora o administrador pode alterar a própria senha</li>
              </ul>
            </li>

            <li class="mt-4">Versão 2.0 r071 - 18/12/2023
              <ul>
                <li>Agora é possível listar as fontes de imagens presentes em assuntos.</li>
                <li>Correção de bugs</li>
                <li>Refatoração dos componentes, permitindo maior legibilidade para desenvolvedores</li>
                <li>Melhoria da interface gráfica</li>
              </ul>
            </li>

            <li class="mt-4">Versão 1.2 r043 - 11/12/2023
              <ul>
                <li>Foi ajustado o tamanho dp título de um evento.</li>
                <li>Correção de bugs</li>
                <li>Saneamento de código</li>
                <li>Melhoria da interface gráfica</li>
              </ul>
            </li>

            <li class="mt-4">Versão 1.1 r035 - 28/11/2023
              <ul>
                <li>Agora é possivel editar o texto de Legenda e Saiba Mias com um editor RTF.</li>
                <li>Agora o dialog de consumo de informação começa com a letra maior</li>
                <li>O alinhamento das imagens está posicionado no topo dos dialog de exibição</li>
                <li>Correção de bugs</li>
                <li>Melhoria da interface gráfica</li>
              </ul>
            </li>

            <li class="mt-4">Versão 1.0 r022 - 01/11/2023
              <ul>
                <li>É disponibilizado ao público em 01 de novembro de 2023.</li>
              </ul>
            </li>

            <li class="mt-4">Versão 1.0 A r001 (alpha) - 24/07/2023
              <ul>
                <li>É iniciado o processo de desenvolvimento do {{ configSis.labelSis }} em 24 de julho de 2023.</li>
                <li>Utiliza Vue no front e Lumen no back.</li>
              </ul>
            </li>
          </ul>

        </v-card-text>

        <v-card-actions class="pb-5">

          <v-spacer></v-spacer>

          <v-btn
            @click="dialogVersoes = false"
            color="grey lighten-1">
            Fechar
          </v-btn>

        </v-card-actions>

      </v-card>

    </v-dialog>

    <!--Dialog para ver detalhes do programador-->
    <v-dialog max-width="800px" v-model="dialogProgramador">

      <v-card>

        <v-card-title class="justify-center" primary-title>

          Sobre o Programador

        </v-card-title>

        <v-card-text>
          <b></b>
          <br>
          <p>TC Cav Tiago da Silva <strong>Brilhante</strong></p>
          <p>O TC Brilhante é o chefe da Seção de Desenvolvimento de Sistemas da 12ª Região Militar</p>
          <p>Atua como desenvolvedor sênior Full-Stack com especialização desenvolvimento WEB.</p>
          <p>Trabalha com as seguintes linguagens:</p>
          <ul>
            <li>Java</li>
            <li>PHP</li>
            <li>JS</li>
            <li>Python</li>
          </ul>
          <br>

          <hr>

          <br>
          <p>Contato: tiagobrilhantemania@gmail.com</p>
        </v-card-text>

        <v-card-actions class="pb-5">

          <v-spacer></v-spacer>

          <v-btn
            @click="dialogProgramador = false"
            color="grey lighten-1">
            Fechar
          </v-btn>

        </v-card-actions>

      </v-card>

    </v-dialog>

  </v-footer>

</template>

<script>import config from '../../http/config'

export default {
  data: () => ({
    configSis: config,
    dialogVersoes: false,
    dialogProgramador: false
  }),
  computed: {},
  methods: {}
}
</script>

<style>
.thewhite {
  color: white;
}

</style>
