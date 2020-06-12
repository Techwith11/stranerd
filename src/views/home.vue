<template>
	<div>
		<div class="container" v-if="isLoggedIn">
			<recent-posts />
			<top-tutors />
			<recent-sessions />
			<button class="floating-button" @click="setPostModalNotify"><i class="fas fa-plus"></i></button>
		</div>
		<div v-else>
			<cta />
			<why-us />
			<ask-question />
			<what-we-do />
			<students-says />
			<what-makes-us-different />
			<recent-courses />
			<pricing />
		</div>
	</div>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex'
	import CTA from '@/components/home/notLoggedIn/HomeCTA'
	import WhyUs from '@/components/home/notLoggedIn/HomeWhyUs'
	import WhatWeDo from '@/components/home/notLoggedIn/HomeWhatWeDo'
	import AskQuestion from '@/components/home/notLoggedIn/HomeAskQuestion'
	import StudentsSay from '@/components/home/notLoggedIn/HomeStudentsSay'
	import WhatMakesUsDifferent from '@/components/home/notLoggedIn/HomeWhatMakesUsDifferent'
	import RecentCourses from '@/components/home/notLoggedIn/HomeRecentCourses'
	import Pricing from '@/components/home/notLoggedIn/HomePricing'
	import TopTutors from '@/components/home/loggedIn/TopTutors'
	import RecentSessions from '@/components/home/loggedIn/RecentSessions'
	import RecentPosts from '@/components/home/loggedIn/RecentPosts'
	export default {
		name: 'Home',
		components: {
			'cta': CTA,
			'why-us': WhyUs,
			'ask-question': AskQuestion,
			'what-we-do': WhatWeDo,
			'students-says': StudentsSay,
			'what-makes-us-different': WhatMakesUsDifferent,
			'recent-courses': RecentCourses,
			'pricing': Pricing,
			'top-tutors': TopTutors,
			'recent-posts': RecentPosts,
			'recent-sessions': RecentSessions,
		},
		computed: mapGetters(['isLoggedIn','questionsLeft']),
		methods: mapActions(['setPostModalNotify','setPostModalCreate']),
		mounted(){
			if(this.$route.query.createPost){
				if(this.questionsLeft){
					this.setPostModalCreate()
				}else{
					this.setPostModalNotify()
				}
				this.$router.push('/')
			}
		}
	}
</script>
