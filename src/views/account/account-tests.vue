<template>
	<div>
		<helper-spinner v-if="isLoading"/>
		<div v-else>
			<helper-message message="You have not taken any tests yet. Click the floating button below to go to the test page" v-if="tests.length === 0" />
			<div v-else>
				<test-card v-for="test in tests" :key="test['.key']" :test="test" />
				<div class="d-flex justify-content-end my-3" v-if="hasMore">
					<button class="btn-success" @click="fetchOlderTests">
						<i class="fas fa-spinner fa-spin mr-2" v-if="isOlderTestsLoading"></i>
						<span>Fetch More</span>
					</button>
				</div>
			</div>
		</div>
		<button class="floating-button"><router-link to="/tests/tutors"><i class="fas fa-sticky-note text-white"></i></router-link></button>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import { firestore } from '@/config/firebase'
	import HelperSpinner from '@/components/helpers/Spinner'
	import HelperMessage from '@/components/helpers/Message'
	import TestCard from '@/components/account/single/TestCard'
	export default {
		name: 'Tests',
		data: () => ({
			isLoading: true,
			isOlderTestsLoading: false,
			tests: [],
			paginationLimit: 24,
			hasMore: true
		}),
		components: {
			'helper-spinner': HelperSpinner,
			'helper-message': HelperMessage,
			'test-card': TestCard
		},
		async mounted(){
			await this.getTests()
			this.isLoading = false
		},
		computed: {
			...mapGetters(['getId'])
		},
		methods: {
			async getTests(){
				let docs = firestore.collection(`tests/tutors/tests`).where('user','==',this.getId).orderBy('dates.startedAt','desc')
					.limit(this.paginationLimit)
				let lastItem = this.tests[this.tests.length - 1]
				if(lastItem){
					docs = docs.where('dates.startedAt','<',lastItem.dates.createdAt)
				}
				docs = await docs.get()
				this.hasMore = docs.size >= this.paginationLimit
				docs.forEach(doc => this.tests.push({ '.key': doc.id, ...doc.data() }))
			},
			async fetchOlderTests(){
				this.isOlderTestsLoading = true
				await this.getTests()
				this.isOlderTestsLoading = false
			}
		}
	}
</script>