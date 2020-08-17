<template>
	<Default>
		<div v-if="isLoggedIn" class="container-fluid p-0 p-lg-3">
			<div class="d-flex flex-column flex-xl-row">
				<div class="d-none d-xl-block mb-3 mr-xl-1 col-xl-5 p-0">
					<show-ask-question />
				</div>
				<div class="mb-3 mr-xl-1 col-xl-7 p-0">
					<recent-posts />
				</div>
				<router-link class="d-xl-none floating-button text-white" to="/ask-a-question"><i class="fas fa-plus"></i></router-link>
			</div>
			<div class="py-3"></div>
			<div class="d-flex flex-column flex-lg-row">
				<div class="flex-grow-1 mb-3 mr-lg-1">
					<recent-sessions />
				</div>
				<div class="flex-grow-1 mb-3 mr-lg-1">
					<top-tutors />
					<subscribe-card v-if="!isSubscribed" />
				</div>
			</div>
			<div class="py-3"></div>
			<recent-courses class="mb-3" />
		</div>
		<div v-else class="">
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
import { mapGetters } from 'vuex'
import CTA from '@/components/home/notLoggedIn/HomeCTA'
import WhyUs from '@/components/home/notLoggedIn/HomeWhyUs'
import AskQuestion from '@/components/home/notLoggedIn/HomeAskQuestion'
import StudentsSay from '@/components/home/notLoggedIn/HomeStudentsSay'
import WhatMakesUsDifferent from '@/components/home/notLoggedIn/HomeWhatMakesUsDifferent'
import Mckenwin from '@/components/home/notLoggedIn/HomeMckenwin'
import Pricing from '@/components/home/notLoggedIn/HomePricing'
import ShowAskQuestion from '@/components/home/loggedIn/AskQuestion'
import RecentPosts from '@/components/home/loggedIn/RecentPosts'
import RecentCourses from '@/components/home/loggedIn/RecentCourses'
import RecentSessions from '@/components/home/loggedIn/RecentSessions'
import TopTutors from '@/components/home/loggedIn/TopTutors'
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
		'show-ask-question': ShowAskQuestion,
		'recent-posts': RecentPosts,
		'recent-courses': RecentCourses,
		'recent-sessions': RecentSessions,
		'top-tutors': TopTutors,
		'subscribe-card': SubscribeCard,
	},
	computed: mapGetters(['isLoggedIn','getUser','isSubscribed']),
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

<style lang="scss" scoped>
	.mw-40{ width: 40% !important; }
	.flex-grow-5{ flex-grow: 5; }
	.flex-grow-7{ flex-grow: 7; }
</style>
