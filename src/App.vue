<template>
  <div id="app">
    <app-nav-bar />
    <router-view/>
    <app-footer />
    <auth-modal v-if="isModalOpen"/>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Navbar from '@/components/app/Navbar'
  import Footer from '@/components/app/Footer'
  import AuthModal from '@/components/auth/AuthModal'

  export default {
    name: 'App',
    components: {
      'app-nav-bar': Navbar,
      'app-footer': Footer,
      'auth-modal': AuthModal,
    },
    computed: mapGetters(['isModalOpen'])
  }
</script>
