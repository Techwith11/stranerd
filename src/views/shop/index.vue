<template>
	<div class="container">
		<helper-spinner v-if="isLoading"/>
		<div v-else>
			<helper-message message="No notes currently in the shop. Check again later" v-if="notes.length === 0" />
			<div v-else>
				<div v-for="note in notes" :key="note['.key']">
					{{note}}
				</div>
				<div class="d-flex justify-content-end" v-if="hasMore">
					<button class="accent-button" @click="fetchOlderNotes">
						<i class="fas fa-spinner fa-spin mr-2" v-if="isOlderNotesLoading"></i>
						<span>Fetch More</span>
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { firestore } from '@/config/firebase'
	import HelperSpinner from '@/components/helpers/Spinner'
	import HelperMessage from '@/components/helpers/Message'
	export default {
		name: 'Shop',
		data: () => ({
			isLoading: true,
			isOlderNotesLoading: false,
			notes: [],
			paginationLimit: 50,
			hasMore: true
		}),
		methods: {
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
			'helper-spinner': HelperSpinner,
			'helper-message': HelperMessage
		},
	}
</script>