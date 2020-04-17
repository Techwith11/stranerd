<template>
  <div>
    <cta />
    <why-us />
    <success />
    <courses />
    <stats />
    <students-says />
    <pricing />
  </div>
</template>

<script>
 import CTA from '@/components/home/HomeCTA'
 import WhyUs from '@/components/home/HomeWhyUs'
 import Success from '@/components/home/HomeSuccess'
 import Courses from '@/components/home/HomeCourses'
 import Stats from '@/components/home/HomeStats'
 import StudentsSay from '@/components/home/HomeStudentsSay'
 import Pricing from '@/components/home/HomePricing'
export default {
  name: 'Home',
  components: {
    'cta': CTA,
    'why-us': WhyUs,
    'success': Success,
    'courses': Courses,
    'stats': Stats,
    'students-says': StudentsSay,
    'pricing': Pricing,
  }
}
</script>
