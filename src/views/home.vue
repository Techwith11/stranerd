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
			<what-makes-us-different />
			<students-says />
			<recent-courses />
			<mckenwin />
			<pricing />
		</div>
	</div>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex'
	import CTA from '@/components/home/notLoggedIn/HomeCTA'
	import WhyUs from '@/components/home/notLoggedIn/HomeWhyUs'
	import AskQuestion from '@/components/home/notLoggedIn/HomeAskQuestion'
	import StudentsSay from '@/components/home/notLoggedIn/HomeStudentsSay'
	import WhatMakesUsDifferent from '@/components/home/notLoggedIn/HomeWhatMakesUsDifferent'
	import RecentCourses from '@/components/home/notLoggedIn/HomeRecentCourses'
	import Mckenwin from '@/components/home/notLoggedIn/HomeMckenwin'
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
			'students-says': StudentsSay,
			'what-makes-us-different': WhatMakesUsDifferent,
			'recent-courses': RecentCourses,
			'mckenwin': Mckenwin,
			'pricing': Pricing,
			'top-tutors': TopTutors,
			'recent-posts': RecentPosts,
			'recent-sessions': RecentSessions,
		},
		computed: mapGetters(['isLoggedIn','getUser','questionsLeft']),
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
		},
		meta(){
			return {
				title: this.isLoggedIn ? `Stranerd Dashboard - ${this.getUser.bio && this.getUser.bio.name}` : 'Stranerd Home Page',
				meta: [
					{
						vmid: 'description',
						name: 'description',
						content: this.isLoggedIn ? this.getUser.bio && this.getUser.bio.bio : 'Welcome to the home of the top upcoming tutoring service worldwide. Feel free to access from our wide range of courses, tutors, notes, questions etc'
					},
					{
						vmid: 'keywords',
						name: 'keywords',
						content: ['stranerd','tutors','courses','questions','notes'].join(', ')
					}
				]
			}
		}
	}
</script>
