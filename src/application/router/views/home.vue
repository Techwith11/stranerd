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
			<mckenwin />
			<students-says />
			<pricing />
		</div>
	</Default>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import CTA from '@/components/home/notLoggedIn/CTA.vue'
import WhyUs from '@/components/home/notLoggedIn/WhyUs.vue'
import AskQuestion from '@/components/home/notLoggedIn/AskQuestion.vue'
import StudentsSay from '@/components/home/notLoggedIn/StudentsSay.vue'
import WhatMakesUsDifferent from '@/components/home/notLoggedIn/WhatMakesUsDifferent.vue'
import Mckenwin from '@/components/home/notLoggedIn/Mckenwin.vue'
import Pricing from '@/components/home/notLoggedIn/Pricing.vue'
import ShowAskQuestion from '@/components/home/loggedIn/AskQuestion.vue'
import RecentPosts from '@/components/home/loggedIn/RecentPosts.vue'
import RecentCourses from '@/components/home/loggedIn/RecentCourses.vue'
import RecentSessions from '@/components/home/loggedIn/RecentSessions.vue'
import TopTutors from '@/components/home/loggedIn/TopTutors.vue'
import SubscribeCard from '@/components/home/loggedIn/SubscribeCard.vue'
import { useStore } from '@/usecases/store'
export default defineComponent({
	name: 'Home',
	components: {
		'cta': CTA,
		'why-us': WhyUs,
		'ask-question': AskQuestion,
		'what-makes-us-different': WhatMakesUsDifferent,
		'mckenwin': Mckenwin,
		'students-says': StudentsSay,
		'pricing': Pricing,
		'show-ask-question': ShowAskQuestion,
		'recent-posts': RecentPosts,
		'recent-courses': RecentCourses,
		'recent-sessions': RecentSessions,
		'top-tutors': TopTutors,
		'subscribe-card': SubscribeCard,
	},
	setup(){
		const { isLoggedIn, getUser, isSubscribed, questionsLeft } = useStore().auth
		return { isLoggedIn, getUser, isSubscribed, questionsLeft }
	},
	meta(){
		return {
			title: this.isLoggedIn ? `Stranerd Dashboard - ${(this.getUser as any).bio?.name ?? ''}` : 'Stranerd Home Page',
			meta: [
				{
					vmid: 'description',
					name: 'description',
					content: this.isLoggedIn ? ((this.getUser as any).bio?.bio ?? '') : 'Welcome to the home of the top upcoming tutoring service worldwide. Feel free to access from our wide range of courses, tutors, notes, questions etc'
				},
				{
					vmid: 'keywords',
					name: 'keywords',
					content: ['stranerd','tutors','courses','questions','notes'].join(', ')
				}
			]
		}
	}
})
</script>
