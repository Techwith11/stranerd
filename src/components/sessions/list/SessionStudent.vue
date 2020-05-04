<template>
	<div class="container">
		<helper-spinner v-if="isLoading" />
		<div v-else>
			<helper-message message="No sessions attended yet." v-if="sessions.length === 0" />
			<div v-else>
				<session-card :session="session" v-for="session in sessions" :key="session['.key']" />
				<div class="text-center small my-3" v-if="!hasNoMore">
					<i class="fas fa-spin fa-spinner mr-2 text-info" v-if="isOlderSessionsLoading"></i>
					<span @click="isOlderSessionsLoading ? () => {} : fetchOlderSessions()">Fetch More</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import HelperSpinner from '@/components/helpers/Spinner'
	import HelperMessage from '@/components/helpers/Message'
	import SessionCard from '@/components/sessions/list/SessionCard'
	import { firestore } from '@/config/firebase'
	import { mapGetters } from 'vuex'
	export default {
		data: () => ({
			sessions: [],
			isLoading: true,
			paginationLimit: 20,
			hasNoMore: false,
			isOlderSessionsLoading: false
		}),
		computed: mapGetters(['getId']),
		components: {
			'helper-spinner': HelperSpinner,
			'helper-message': HelperMessage,
			'session-card': SessionCard
		},
		async mounted(){
			await this.getSessions()
			this.isLoading = false
		},
		methods: {
			async getSessions(){
				let lastItem = this.sessions[this.sessions.length - 1]
				let query = firestore.collection('sessions')
					.where('student','==', this.getId)
					.orderBy('dates.createdAt','desc')
					.limit(this.paginationLimit)
				if(lastItem){
					query = query.where('dates.createdAt','<',lastItem.dates.createdAt)
				}
				let docs = await query.get()
				if(docs.size < this.paginationLimit){ this.hasNoMore = true }
				docs.forEach(doc => this.sessions.push({ '.key': doc.id, ...doc.data() }))
			},
			async fetchOlderSessions(){
				this.isOlderSessionsLoading = true
				await this.getSessions()
				this.isOlderSessionsLoading = false
			}
		}
	}
</script>