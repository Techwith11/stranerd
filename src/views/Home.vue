<template>
  <div class="home">
    <nav-bar />
    <cta />
    <why-us />
    <success />
    <courses />
    <stats />
    <students-says />
    <pricing />
    <foot-bar />
  </div>
</template>

<script>
 import NavBar from '@/components/Home/HomeNavbar'
 import CTA from '@/components/Home/HomeCTA'
 import WhyUs from '@/components/Home/HomeWhyUs'
 import Success from '@/components/Home/HomeSuccess'
 import Courses from '@/components/Home/HomeCourses'
 import Stats from '@/components/Home/HomeStats'
 import StudentsSay from '@/components/Home/HomeStudentsSay'
 import Pricing from '@/components/Home/HomePricing'
 import Footer from '@/components/Home/HomeFooter'

export default {
  name: 'Home',
  components: {
    'nav-bar': NavBar,
    'cta': CTA,
    'why-us': WhyUs,
    'success': Success,
    'courses': Courses,
    'stats': Stats,
    'students-says': StudentsSay,
    'pricing': Pricing,
    'foot-bar': Footer,
  }
}
</script>
