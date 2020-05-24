<template>
	<div>
		<helper-spinner v-if="isLoading"/>
		<div v-else>
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
			<button class="floating-button" @click="openCartModal" v-if="getCartLength"><i class="fas fa-shopping-basket"></i></button>
		</div>
	</div>
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
			notes: [],
			paginationLimit: 24,
			hasMore: true
		}),
		computed: mapGetters(['getCartLength']),
		methods: {
			...mapActions(['openCartModal']),
			async getNotes(){
				let docs = firestore.collection('notes').orderBy('dates.createdAt','desc')
					.limit(this.paginationLimit)
				let lastItem = this.notes[this.notes.length - 1]
				if(lastItem){
					docs = docs.where('dates.createdAt','<',lastItem.dates.createdAt)
				}
				docs = await docs.get()
				this.hasMore = docs.size >= this.paginationLimit
				docs.forEach(doc => this.notes.push({ '.key': doc.id, ...doc.data() }))
			},
			async fetchOlderNotes(){
				this.isOlderNotesLoading = true
				await this.getNotes()
				this.isOlderNotesLoading = false
			}
		},
		async mounted(){
			await this.getNotes()
			this.isLoading = false
		},
		components: {
			'note-card': NoteCard,
			'helper-spinner': HelperSpinner,
			'helper-message': HelperMessage
		},
	}
</script>