<template>
	<div>
		<div class="container" v-if="isLoggedIn">
			<div class="d-flex justify-content-end my-3">
				<button class="accent-button shadow-none">Ask Question</button>
			</div>
			<div>
				<p class="text-muted">Recent Questions</p>
				<div class="card my-2" v-for="i in 3" :key="i">
					<div class="card-body">
						<h5 class="card-title">Question Topic</h5>
						<p class="card-text">Question body in full length. This is a non truncated view of the question</p>
						<h6 class="card-subtitle mb-2 text-muted">Some meta data for the question which will definitely include tags</h6>
						<a href="#" class="card-link">See Answers</a>
					</div>
				</div>
				<div class="d-flex justify-content-end my-3">
					<button class="accent-button shadow-none">
						<router-link class="text-decoration-none text-white" to="/questions">See More</router-link>
					</button>
				</div>
			</div>
			<find-tutors />
			<recent-sessions />
		</div>
		<div v-else>
			<cta />
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
	import { mapGetters } from 'vuex'
	import CTA from '@/components/home/notLoggedIn/HomeCTA'
	import WhyUs from '@/components/home/notLoggedIn/HomeWhyUs'
	import Success from '@/components/home/notLoggedIn/HomeSuccess'
	import Courses from '@/components/home/notLoggedIn/HomeCourses'
	import Stats from '@/components/home/notLoggedIn/HomeStats'
	import StudentsSay from '@/components/home/notLoggedIn/HomeStudentsSay'
	import Pricing from '@/components/home/notLoggedIn/HomePricing'
	import FindTutors from '@/components/home/loggedIn/FindTutors'
	import RecentSessions from '@/components/home/loggedIn/RecentSessions'
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
			'find-tutors': FindTutors,
			'recent-sessions': RecentSessions,
		},
		computed: mapGetters(['isLoggedIn'])
	}
</script>
