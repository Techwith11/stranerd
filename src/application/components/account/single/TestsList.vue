<template>
	<div>
		<page-loading v-if="isLoading"/>
		<div v-else>
			<helper-message message="You have not taken any tests yet." v-if="tests.length === 0" />
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
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { firestore } from '@application/config/firebase'
import TestCard from '@application/components/account/single/TestCard'
export default {
	data: () => ({
		isLoading: true,
		isOlderTestsLoading: false,
		tests: [],
		paginationLimit: 24,
		hasMore: true
	}),
	components: {
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
			try{
				let docs = firestore.collection('tests/tutors/tests').where('user','==',this.getId).orderBy('dates.startedAt','desc')
					.limit(this.paginationLimit)
				const lastItem = this.tests[this.tests.length - 1]
				if(lastItem){
					docs = docs.where('dates.startedAt','<',lastItem.dates.createdAt)
				}
				docs = await docs.get()
				this.hasMore = docs.size >= this.paginationLimit
				docs.forEach((doc) => this.tests.push({ '.key': doc.id, ...doc.data() }))
			}catch(error){ new window.Toast({ icon: 'error', title: 'Error fetching tests. Try refreshing the page' }) }
		},
		async fetchOlderTests(){
			this.isOlderTestsLoading = true
			await this.getTests()
			this.isOlderTestsLoading = false
		}
	}
}
</script>
