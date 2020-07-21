<template>
	<Default>
		<helper-spinner v-if="isLoading" />
		<div class="container" v-else>
			<session-nav />
			<helper-message message="No sessions taught yet." v-if="sessions.length === 0" />
			<div v-else>
				<session-card :session="session" v-for="session in sessions" :key="session['.key']" />
				<div class="text-center small my-3" v-if="hasMore">
					<i class="fas fa-spin fa-spinner mr-2 text-info" v-if="isOlderSessionsLoading"></i>
					<span @click="isOlderSessionsLoading ? () => {} : fetchOlderSessions()">Fetch More</span>
				</div>
			</div>
		</div>
	</Default>
</template>

<script>
	import HelperSpinner from '@/components/helpers/Spinner'
	import HelperMessage from '@/components/helpers/Message'
	import SessionNav from '@/components/sessions/list/SessionNav'
	import SessionCard from '@/components/sessions/list/SessionCard'
	import { firestore } from '@/config/firebase'
	import { mapGetters } from 'vuex'
	export default {
		data: () => ({
			sessions: [],
			isLoading: true,
			fetched: false,
			listener: () => {},
			paginationLimit: 24,
			hasMore: true,
			isOlderSessionsLoading: false
		}),
		computed: mapGetters(['getId']),
		components: {
			'helper-spinner': HelperSpinner,
			'helper-message': HelperMessage,
			'session-card': SessionCard,
			'session-nav': SessionNav
		},
		async mounted(){
			await this.getSessions()
			this.fetched = true
			this.isLoading = false
		},
		async activated(){
			if(this.fetched){
				await this.setSessionsListeners()
			}
		},
		deactivated(){
			this.listener()
		},
		methods: {
			async getSessions(){
				try{
					let lastItem = this.sessions[this.sessions.length - 1]
					let query = firestore.collection('sessions')
						.where('tutor','==', this.getId)
						.orderBy('dates.createdAt','desc')
						.limit(this.paginationLimit)
					if(lastItem){
						query = query.where('dates.createdAt','<',lastItem.dates.createdAt)
					}
					let docs = await query.get()
					this.hasMore = docs.size >= this.paginationLimit
					docs.forEach(doc => this.sessions.push({ '.key': doc.id, ...doc.data() }))
				}catch(error){ new window.Toast({ icon: 'error', title: 'Error fetching sessions. Try refreshing the page' }) }
			},
			async fetchOlderSessions(){
				this.isOlderSessionsLoading = true
				await this.getSessions()
				this.isOlderSessionsLoading = false
			},
			async setSessionsListeners(){
				let lastItem = this.sessions[this.sessions.length - 1]
				let query = firestore.collection('sessions')
					.where('tutor','==', this.getId)
					.orderBy('dates.createdAt')
					.limit(this.paginationLimit)
				if(lastItem){
					query = query.where('dates.createdAt','>',lastItem.dates.createdAt)
				}
				this.listener = query.onSnapshot(snapshot => {
					snapshot.docs.forEach(doc => {
						let index = this.sessions.findIndex(r => r['.key'] === doc.id)
						if(index === -1){
							this.sessions.unshift({ '.key': doc.id, ...doc.data() })
						}else{
							this.sessions[index] = { '.key': doc.id, ...doc.data() }
						}
					})
				})
			}
		},
		meta(){
			return {
				title: 'Recent Sessions',
				meta: [
					{
						vmid: 'robots',
						name: 'robots',
						content: 'none'
					}
				]
			}
		}
	}
</script>
