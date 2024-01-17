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

          <v-alert color="cyan" class="text-justify">
            <p>O Sistema EBTotem, foi criado a pedido do Comando do CMA, para compor uma experiência visual interativa
              oferecida aos visitantes do espaço cultural Cap Mor Pedro Teixeira.</p>
            <p>Trata-se de um sistema que foi projetado para propiciar o consumo de conteúdo cultural, usando como base,
              uma TV e um frame infravermelho que capta a posição do dedo do usuário em relação a tela, simulando o
              mesmo comportamento de celulares e tablets.</p>
            <p>O conteúdo cultural é inserido pelos administradores cadastrados no sistema, e vários aspectos do totem,
              são configuráveis, podendo ser usado para disponibilizar qualquer tipo de conteúdo.</p>
            <p><b>Abaixo é possivel acompanhar o histórico de alterações das versões lançadas ao longo do tempo.</b></p>
          </v-alert>

          <ul>
            <li v-for="versao in versoes" :key="versao.id" class="mt-4">
              Versão: {{ versao.id }} r{{ versao.release }} - {{ versao.data }} <span v-if="versao.latest"> ( LATEST ) </span>
              <v-chip x-small class="ml-6" @click="toggleDetalhes(versao.id)" v-if="!versao.latest">Ver Detalhes</v-chip>
              <ul v-if="versao.detalhesVisiveis && !versao.latest">
                <li v-for="detalhe in versao.detalhes" :key="detalhe">{{ detalhe }}</li>
              </ul>

              <ul v-if="versao.latest">
                <li v-for="detalhe in versao.detalhes" :key="detalhe">{{ detalhe }}</li>
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
    dialogProgramador: false,
    qualIcone: 'mdi-arrow-down-thick',
    versoes: [
      {
        id: '2.2',
        release: '123',
        latest: true,
        data: '17/01/2024',
        detalhesVisiveis: false,
        detalhes: [
          'Agora é possível gerar backup de todo o conteúdo do Totem (Banco de Dados e arquivos)',
          'Foi remodelado o detalhamento de versões no footer',
          'Correção de bugs',
          'Saneamento de código'
        ]
      },
      {
        id: '2.1',
        release: '110',
        latest: false,
        data: '20/12/2023',
        detalhesVisiveis: false,
        detalhes: [
          'Liberado o acesso ao histórico de alterações',
          'Liberado o acesso para a área de estatísticas',
          'Correção de bugs',
          'Refatoração dos componentes, permitindo maior legibilidade para desenvolvedores',
          'Melhoria da interface gráfica',
          'Implementado o menu administrativo separado do conteúdo da landpage',
          'Agora o administrador pode alterar a própria senha'
        ]
      },
      {
        id: '2.0',
        release: '071',
        latest: false,
        data: '18/12/2023',
        detalhesVisiveis: false,
        detalhes: [
          'Agora é possível listar as fontes de imagens presentes em assuntos.',
          'Correção de bugs',
          'Refatoração dos componentes, permitindo maior legibilidade para desenvolvedores',
          'Melhoria da interface gráfica'
        ]
      },
      {
        id: '1.2',
        release: '043',
        latest: false,
        data: '11/12/2023',
        detalhesVisiveis: false,
        detalhes: [
          'Foi ajustado o tamanho do título de um evento.',
          'Correção de bugs',
          'Saneamento de código',
          'Melhoria da interface gráfica'
        ]
      },
      {
        id: '1.1',
        release: '035',
        latest: false,
        data: '28/11/2023',
        detalhesVisiveis: false,
        detalhes: [
          'Agora é possivel editar o texto de Legenda e Saiba Mias com um editor RTF.',
          'Agora o dialog de consumo de informação começa com a letra maior',
          'O alinhamento das imagens está posicionado no topo dos dialog de exibição',
          'Correção de bugs',
          'Melhoria da interface gráfica'
        ]
      },
      {
        id: '1.0',
        release: '022',
        latest: false,
        data: '01/11/2023',
        detalhesVisiveis: false,
        detalhes: [
          'É disponibilizado ao público em 01 de novembro de 2023.'
        ]
      },
      {
        id: '1.0 A',
        release: '001 (alpha)',
        latest: false,
        data: '24/07/2023',
        detalhesVisiveis: false,
        detalhes: [
          'É iniciado o processo de desenvolvimento do EBTotem em 24 de julho de 2023',
          'Utiliza Vue no front e Lumen no back'
        ]
      }
    ]
  }),
  computed: {},
  methods: {
    mostraDetalhesVersao (versao) {
      console.log(versao)
    },

    toggleDetalhes (id) {
      const versao = this.versoes.find(v => v.id === id)
      if (versao) {
        versao.detalhesVisiveis = !versao.detalhesVisiveis
      }
    }
  }
}
</script>

<style>
.thewhite {
  color: white;
}

</style>
