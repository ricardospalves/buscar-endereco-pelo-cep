<template>
  <div id="app" class="flex flex-col">
    <div class="flex flex-col min-h-screen">
      <router-view/>

      <Footer/>
    </div>
  </div>
</template>

<script>
import Footer from './components/Footer'

export default {
  components: {
    Footer
  }
}
</script>
