<template>
	<Default>
		<helper-spinner v-if="isLoading"/>
		<div v-else class="my-3">
			<helper-message message="No notes currently in the shop. Check again later" v-if="notes.length === 0" />
			<div class="container" v-else>
				<note-card v-for="note in notes" :key="note['.key']" :note="note" />
				<div class="d-flex justify-content-end my-3" v-if="hasMore">
					<button class="btn-success" @click="fetchOlderNotes">
						<i class="fas fa-spinner fa-spin mr-2" v-if="isOlderNotesLoading"></i>
						<span>Fetch More</span>
					</button>
				</div>
			</div>
			<button class="floating-button" @click="setCartModalOverview" v-if="getCartLength"><i class="fas fa-shopping-basket"></i></button>
		</div>
	</Default>
</template>

<script>
	import { firestore } from '@/config/firebase'
	import { mapActions, mapGetters } from 'vuex'
	import NoteCard from '@/components/shop/list/NoteCard'
	import HelperSpinner from '@/components/helpers/Spinner'
	import HelperMessage from '@/components/helpers/Message'
	export default {
		name: 'Shop',
		data: () => ({
			isLoading: true,
			isOlderNotesLoading: false,
			fetched: false,
			listener: () => {},
			notes: [],
			paginationLimit: 24,
			hasMore: true
		}),
		computed: mapGetters(['getCartLength']),
		methods: {
			...mapActions(['setCartModalOverview']),
			async getNotes(){
				try{
					let docs = firestore.collection('notes').orderBy('dates.createdAt','desc')
						.limit(this.paginationLimit)
					let lastItem = this.notes[this.notes.length - 1]
					if(lastItem){
						docs = docs.where('dates.createdAt','<',lastItem.dates.createdAt)
					}
					docs = await docs.get()
					this.hasMore = docs.size >= this.paginationLimit
					docs.forEach(doc => this.notes.push({ '.key': doc.id, ...doc.data() }))
				}catch(error){ new window.Toast({ icon: 'error', title: 'Error fetching notes. Try refreshing the page' }) }
			},
			async fetchOlderNotes(){
				this.isOlderNotesLoading = true
				await this.getNotes()
				this.isOlderNotesLoading = false
			},
			async setNotesListeners(){
				let lastItem = this.notes[this.notes.length - 1]
				let query = firestore.collection('notes').orderBy('dates.createdAt')
				if(lastItem){
					query = query.where('dates.createdAt','>',lastItem.dates.createdAt)
				}
				this.listener = query.onSnapshot(snapshot => {
					snapshot.docs.forEach(doc => {
						let index = this.notes.findIndex(r => r['.key'] === doc.id)
						if(index === -1){
							this.notes.unshift({ '.key': doc.id, ...doc.data() })
						}else{
							this.notes[index] = { '.key': doc.id, ...doc.data() }
						}
					})
				})
			}
		},
		async mounted(){
			await this.getNotes()
			this.fetched = true
			this.isLoading = false
			window.Fire.$on('NoteEdited', note => {
				let index = this.notes.findIndex(n => n['.key'] === note['.key'])
				this.notes[index] = note
				this.$forceUpdate()
			})
			window.Fire.$on('NoteDeleted', note => this.notes = this.notes.filter(n => n['.key'] !== note['.key']))
		},
		async activated(){
			if(this.fetched){
				await this.setNotesListeners()
			}
		},
		deactivated(){
			this.listener()
		},
		components: {
			'note-card': NoteCard,
			'helper-spinner': HelperSpinner,
			'helper-message': HelperMessage
		},
		meta(){
			return {
				title: 'Shop on Stranerd',
				meta: [
					{
						vmid: 'description',
						name: 'description',
						content: ''
					},
					{
						vmid: 'keywords',
						name: 'keywords',
						content: [].join(', ')
					}
				]
			}
		}
	}
</script>
