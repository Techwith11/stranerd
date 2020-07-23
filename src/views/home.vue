<template>
	<Default>
		<div v-if="isLoggedIn" class="container-fluid">
			<div class="row">
				<div class="col-lg-5 d-none d-lg-block mb-3 pl-0">
					<show-ask-question />
				</div>
				<div class="col-lg-7 mb-3 px-0">
					<recent-posts />
				</div>
				<router-link class="d-lg-none floating-button text-decoration-none" to="/ask-a-question"><i class="fas fa-plus"></i></router-link>
			</div>
			<div class="py-3"></div>
			<div class="row">
				<div class="col-xl-6 px-0 mb-3">
					<recent-courses />
				</div>
				<div class="col-lg-6 col-xl-3 px-0 pl-md-2 mb-3">
					<recent-sessions />
				</div>
				<div class="col-lg-6 col-xl-3 px-0 pl-md-2 mb-3">
					<top-tutors />
					<subscribe-card v-if="!isSubscribed" />
				</div>
			</div>
		</div>
		<div v-else class="m-n3">
			<cta />
			<why-us />
			<ask-question />
			<what-makes-us-different />
			<students-says />
			<mckenwin />
			<pricing />
		</div>
	</Default>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex'
	import CTA from '@/components/home/notLoggedIn/HomeCTA'
	import WhyUs from '@/components/home/notLoggedIn/HomeWhyUs'
	import AskQuestion from '@/components/home/notLoggedIn/HomeAskQuestion'
	import StudentsSay from '@/components/home/notLoggedIn/HomeStudentsSay'
	import WhatMakesUsDifferent from '@/components/home/notLoggedIn/HomeWhatMakesUsDifferent'
	import Mckenwin from '@/components/home/notLoggedIn/HomeMckenwin'
	import Pricing from '@/components/home/notLoggedIn/HomePricing'
	import TopTutors from '@/components/home/loggedIn/TopTutors'
	import ShowAskQuestion from '@/components/home/loggedIn/AskQuestion'
	import RecentSessions from '@/components/home/loggedIn/RecentSessions'
	import RecentPosts from '@/components/home/loggedIn/RecentPosts'
	import RecentCourses from '@/components/home/loggedIn/RecentCourses'
	import SubscribeCard from '@/components/home/loggedIn/SubscribeCard'
	export default {
		name: 'Home',
		components: {
			'cta': CTA,
			'why-us': WhyUs,
			'ask-question': AskQuestion,
			'students-says': StudentsSay,
			'what-makes-us-different': WhatMakesUsDifferent,
			'mckenwin': Mckenwin,
			'pricing': Pricing,
			'top-tutors': TopTutors,
			'show-ask-question': ShowAskQuestion,
			'recent-posts': RecentPosts,
			'recent-courses': RecentCourses,
			'recent-sessions': RecentSessions,
			'subscribe-card': SubscribeCard,
		},
		computed: mapGetters(['isLoggedIn','getUser','questionsLeft','isSubscribed']),
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
