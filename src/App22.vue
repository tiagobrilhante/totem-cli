<template>
  <v-app :style="estilosDiv" class="bgApp" id="inspire">
    <vue-confirm-dialog></vue-confirm-dialog>
    <router-view/>
    {{$configSis}}
    <Footer/>
  </v-app>
</template>

<script>import Footer from './components/footer/Footer'

export default {
  components: {
    Footer
  },
  computed: {
    estilosDiv () {
      return {
        backgroundImage: `url(${this.$configSis.urlDownload}public/bg/bg.jpg)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundColor: '#cccccc',
        width: '100px',
        height: '100px'
        // Outros estilos aqui...
      }
    }
  }
}
</script>

<style>
  /*
  .bgApp {
    background-image: url('assets/img/temp1.jpg') !important;
    background-repeat: no-repeat !important;
    background-size: cover !important;
    background-color: #cccccc;
  }
  */
  .bgApp {
    width: 100%;
    height: 100%;
  }
</style>
