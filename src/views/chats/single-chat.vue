<template>
	<div>
		<div class="d-flex justify-content-center my-5 py-5" v-if="isLoading">
			<i class="fas fa-2x text-info fa-spinner fa-spin"></i>
		</div>
		<div v-else>
			<div v-if="doesNotExist" class="container">
				<p>No user with such id exists</p>
			</div>
			<div v-else>
				<single-chat-nav :user="user" />
				<div class="container py-3">
					<p class="text-center" v-if="chats.length < 1">No chats. Send a message now</p>
					<ul class="list-group position-relative" v-chat-scroll="{smooth: true, notSmoothOnInit: true, always: false}">
						<li class="d-block text-center small text-muted" v-if="!hasNoMore">
							<i class="fas text-info fa-spinner fa-spin" v-if="isOlderChatsLoading"></i>
							<span @click="fetchOlderMessages">Fetch Older</span>
						</li>
						<single-chat-message :chat="chat" v-for="chat in chats" :key="chat['.key']" />
						<single-chat-message :chat="chat" v-for="chat in newChats" :key="chat['.key']" />
					</ul>
					<single-chat-form />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import SingleChatNav from '@/components/chats/single/SingleChatNav'
	import SingleChatMessage from '@/components/chats/single/SingleChatMessage'
	import SingleChatForm from '@/components/chats/single/SingleChatForm'
	import { firestore } from '@/config/firebase'
	import { mapGetters } from 'vuex'
	export default {
		name: 'Chat',
		data: () => ({
			doesNotExist: false,
			user: {},
			chats: [],
			newChats: [],
			isLoading: true,
			isOlderChatsLoading: false,
			chatsListeners: null,
			paginationLimit: 10,
			hasNoMore: false
		}),
		computed: {
			...mapGetters(['getId']),
			getChatPath(){ return [this.$route.params.id, this.getId].sort().join('_') }
		},
		methods: {
			async getUser(){
				let doc = await firestore.collection('users').doc(this.$route.params.id).get()
				if(doc.exists){
					this.user = { '.key': doc.id, ...doc.data() }
				}else{
					this.doesNotExist = true
					this.isLoading = false
				}
			},
			async getChats(){
				let docs = firestore.doc('chats/singles').collection(this.getChatPath).orderBy('dates.sentAt','desc')
					.limit(this.paginationLimit)
				if(this.chats.length > 0){
					let lastItem = this.chats[0]
					docs = docs.where('dates.sentAt','<',lastItem.dates.sentAt)
				}
				docs = await docs.get()
				if(docs.size < this.paginationLimit){ this.hasNoMore = true }
				docs.forEach(doc => this.chats.unshift({ '.key': doc.id, ...doc.data() }))
			},
			setListener(){
				let lastItem = this.chats[this.chats.length - 1]
				this.chatsListeners = firestore.doc('chats/singles').collection(this.getChatPath).orderBy('dates.sentAt')
					.where('dates.sentAt','>',lastItem.dates.sentAt)
					.onSnapshot(snapshot => {
						this.newChats = []
						snapshot.docs.forEach(doc => this.newChats.push({ '.key': doc.id, ...doc.data() }))
					})
			},
			async fetchOlderMessages(){
				this.isOlderChatsLoading = true
				this.getChats()
				this.isOlderChatsLoading = false
			}
		},
		components: {
			'single-chat-nav': SingleChatNav,
			'single-chat-message': SingleChatMessage,
			'single-chat-form': SingleChatForm,
		},
		async mounted() {
			await this.getUser()
			await this.getChats()
			this.isLoading = false
			this.setListener()
		},
		beforeDestroy(){
			this.chatsListeners()
		}
	}
</script>

<style lang="scss" scoped>
	ul{
		max-height: 70vh;
		overflow: auto;
		-ms-overflow-style: none;
		&::-webkit-scrollbar{
			display: none;
		}
	}
</style>