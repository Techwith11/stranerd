<template>
  <div id="app">
    <app-nav-bar />
    <router-view/>
    <app-footer />
  </div>
</template>

<script>
  import Navbar from '@/components/App/Navbar'
  import Footer from '@/components/App/Footer'

  export default {
    name: 'App',
    components: {
      'app-nav-bar': Navbar,
      'app-footer': Footer
    }
  }
</script>
