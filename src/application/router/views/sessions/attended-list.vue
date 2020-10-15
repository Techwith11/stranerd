<template>
	<Default>
		<helper-spinner v-if="isLoading" />
		<div class="container" v-else>
			<session-nav />
			<div v-if="sessions.length === 0">
				<helper-message message="You haven’t attended any session yet."  />
				<button class="floating-button btn-success">
					<router-link to="/tutors" class="text-white"><i class="fas fa-plus"></i></router-link>
				</button>
			</div>
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
import SessionCard from '@application/components/sessions/list/SessionCard'
import SessionNav from '@application/components/sessions/list/SessionNav'
import { firestore } from '@application/config/firebase'
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
		'session-card': SessionCard,
		'session-nav': SessionNav
	},
	async mounted(){
		await this.getSessions()
		this.fetched = true
		await this.setSessionsListeners()
		this.isLoading = false
	},
	beforeDestroy(){
		this.listener()
	},
	methods: {
		async getSessions(){
			try{
				const lastItem = this.sessions[this.sessions.length - 1]
				let query = firestore.collection('sessions')
					.where('student','==', this.getId)
					.orderBy('dates.createdAt','desc')
					.limit(this.paginationLimit)
				if(lastItem){
					query = query.where('dates.createdAt','<',lastItem.dates.createdAt)
				}
				const docs = await query.get()
				this.hasMore = docs.size >= this.paginationLimit
				docs.forEach((doc) => this.sessions.push({ '.key': doc.id, ...doc.data() }))
			}catch(error){ new window.Toast({ icon: 'error', title: 'Error fetching sessions. Try refreshing the page' }) }
		},
		async fetchOlderSessions(){
			this.isOlderSessionsLoading = true
			await this.getSessions()
			this.isOlderSessionsLoading = false
		},
		async setSessionsListeners(){
			const lastItem = this.sessions[this.sessions.length - 1]
			let query = firestore.collection('sessions')
				.where('student','==', this.getId)
				.orderBy('dates.createdAt')
				.limit(this.paginationLimit)
			if(lastItem){
				query = query.where('dates.createdAt','>',lastItem.dates.createdAt)
			}
			this.listener = query.onSnapshot((snapshot) => {
				snapshot.docs.forEach((doc) => {
					const index = this.sessions.findIndex((r) => r['.key'] === doc.id)
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
