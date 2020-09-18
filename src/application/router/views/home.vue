<template>
	<Default>
		<div v-if="isLoggedIn">
			<banner>
				<div class="w-75 mx-auto">
					<h1>Strive For <span class="font-weight-bold">Progress</span> Not <span class="font-weight-bold">Perfection</span></h1>
					<post-search class="my-2" />
				</div>
			</banner>
			<div class="container-fluid p-0 p-lg-3 mt-4">
				<show-ask-question class="d-none d-lg-block mb-4" />
				<router-link class="d-lg-none floating-button text-white" to="/ask-a-question"><i class="fas fa-plus"></i></router-link>
				<div class="d-flex flex-column flex-lg-row">
					<div style="flex-grow: 2;">
						<recent-posts class="mb-4"  />
					</div>
					<div class="flex-grow-1 ml-lg-3">
						<recent-sessions class="mb-4" />
						<top-tutors class="mb-4" />
					</div>
				</div>
			</div>
		</div>
		<div v-else class="">
			<cta />
			<why-us />
			<ask-question />
			<what-makes-us-different />
			<mckenwin />
			<students-says />
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
import ShowAskQuestion from '@/components/home/loggedIn/AskQuestion.vue'
import RecentPosts from '@/components/home/loggedIn/RecentPosts.vue'
import RecentSessions from '@/components/home/loggedIn/RecentSessions.vue'
import TopTutors from '@/components/home/loggedIn/TopTutors.vue'
import SubscribeCard from '@/components/home/loggedIn/SubscribeCard.vue'
import { useStore } from '@/usecases/store'
import PostSearch from '@/components/helpers/search/PostSearch.vue'
export default defineComponent({
	name: 'Home',
	components: {
		'cta': CTA,
		'why-us': WhyUs,
		'ask-question': AskQuestion,
		'what-makes-us-different': WhatMakesUsDifferent,
		'mckenwin': Mckenwin,
		'students-says': StudentsSay,
		'show-ask-question': ShowAskQuestion,
		'recent-posts': RecentPosts,
		'recent-sessions': RecentSessions,
		'top-tutors': TopTutors,
		'subscribe-card': SubscribeCard,
		'post-search': PostSearch,
	},
	setup(){
		const { isLoggedIn, getUser, questionsLeft } = useStore().auth
		return { isLoggedIn, getUser, questionsLeft }
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
