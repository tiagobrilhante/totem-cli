<template>
  <v-app id="inspire" class="bgApp">
    <vue-confirm-dialog></vue-confirm-dialog>
    <router-view/>
    <Footer/>
  </v-app>
</template>

<script>import Footer from './components/footer/Footer'

export default {
  components: {
    Footer
  }
}
</script>

<style>
  .bgApp {
    background-image: url('assets/img/temp1.jpg') !important;
    background-repeat: no-repeat !important;
    background-size: cover !important;
    background-color: #cccccc;
  }
</style>
