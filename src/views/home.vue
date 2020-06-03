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
			<ask-question />
			<why-us />
			<success />
			<courses />
			<stats />
			<students-says />
			<pricing />
		</div>
	</div>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex'
	import CTA from '@/components/home/notLoggedIn/HomeCTA'
	import AskQuestion from '@/components/home/notLoggedIn/AskQuestion'
	import WhyUs from '@/components/home/notLoggedIn/HomeWhyUs'
	import Success from '@/components/home/notLoggedIn/HomeSuccess'
	import Courses from '@/components/home/notLoggedIn/HomeCourses'
	import Stats from '@/components/home/notLoggedIn/HomeStats'
	import StudentsSay from '@/components/home/notLoggedIn/HomeStudentsSay'
	import Pricing from '@/components/home/notLoggedIn/HomePricing'
	import TopTutors from '@/components/home/loggedIn/TopTutors'
	import RecentSessions from '@/components/home/loggedIn/RecentSessions'
	import RecentPosts from '@/components/home/loggedIn/RecentPosts'
	export default {
		name: 'Home',
		components: {
			'cta': CTA,
			'ask-question': AskQuestion,
			'why-us': WhyUs,
			'success': Success,
			'courses': Courses,
			'stats': Stats,
			'students-says': StudentsSay,
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
